const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const vm = require('node:vm');

test('root plugin loader resolves and starts the modular source entry by absolute path', async () => {
	const originalLoad = Module._load;
	const pluginApi = createObsidianMock();
	const pluginRoot = path.resolve(__dirname, '..');
	const sourceEntry = path.join(pluginRoot, 'src', 'main.js');
	const adapter = {
		getFullPath(pluginPath) {
			assert.equal(pluginPath, '.obsidian/plugins/tabletop-kit-generators/src/main.js');
			return sourceEntry;
		}
	};

	Module._load = function loadWithObsidianMock(request, parent, isMain) {
		if (request === 'obsidian') {
			assert.ok(!parent?.filename.includes(`${path.sep}src${path.sep}`), 'source modules must use the injected API');
			return pluginApi;
		}
		return originalLoad.call(this, request, parent, isMain);
	};

	try {
		const pluginClass = require('../main');
		const plugin = new pluginClass();
		plugin.app = { vault: { adapter }, workspace: { getLeavesOfType: () => [] } };
		plugin.manifest = {
			dir: '.obsidian/plugins/tabletop-kit-generators',
			id: 'tabletop-kit-generators'
		};
		Object.assign(plugin, createPluginMethods());
		await plugin.onload();
		await plugin.onload();

		assert.ok(plugin.generators);
		assert.deepEqual(plugin.generators.map((generator) => generator.id), ['npc', 'weather', 'shop']);
		assert.ok(plugin.generatorSettingsTab);

		const openInTab = plugin.commands.find((command) => command.id === 'open-generators-in-new-tab');
		assert.ok(openInTab, 'the command to open another instance should be registered');
		let createdLeaf;
		let revealedLeaf;
		plugin.app.workspace.getLeaf = (type) => {
			assert.equal(type, 'tab');
			createdLeaf = {
				setViewState: async (state) => {
					assert.deepEqual(state, {
						type: 'tabletop-kit-generators-view',
						active: true
					});
				}
			};
			return createdLeaf;
		};
		plugin.app.workspace.revealLeaf = (leaf) => {
			revealedLeaf = leaf;
		};

		await openInTab.callback();
		assert.equal(revealedLeaf, createdLeaf);
	} finally {
		Module._load = originalLoad;
	}
});

test('root plugin loader works when the runtime does not expose require.cache', async () => {
	const pluginRoot = path.resolve(__dirname, '..');
	const loaderSource = fs.readFileSync(path.join(pluginRoot, 'main.js'), 'utf8');
	const sourceEntry = path.join(pluginRoot, 'src', 'main.js');
	const runtimeGlobal = {};
	class Plugin {}
	class SourcePlugin extends Plugin {
		async onload() {
			this.sourceLoaded = true;
		}
	}

	const runtimeRequire = (request) => {
		if (request === 'obsidian') return { Plugin };
		if (request === sourceEntry) {
			assert.ok(runtimeGlobal[Symbol.for('tabletop-kit-generators.obsidian-api')]);
			return SourcePlugin;
		}
		throw new Error(`Unexpected module request: ${request}`);
	};
	runtimeRequire.cache = undefined;

	const loaderModule = { exports: {} };
	vm.runInNewContext(loaderSource, {
		globalThis: runtimeGlobal,
		module: loaderModule,
		require: runtimeRequire
	});

	const plugin = new loaderModule.exports();
	plugin.manifest = { id: 'tabletop-kit-generators' };
	plugin.app = {
		vault: {
			adapter: {
				getFullPath: () => sourceEntry
			}
		}
	};

	await plugin.onload();
	assert.equal(plugin.sourceLoaded, true);
	assert.equal(runtimeGlobal[Symbol.for('tabletop-kit-generators.obsidian-api')], undefined);
});

function createObsidianMock() {
	return {
		ItemView: class {},
		Plugin: class {},
		PluginSettingTab: class {
			constructor(app, plugin) {
				this.app = app;
				this.plugin = plugin;
				this.containerEl = {};
			}
		},
		Setting: class {},
		Notice: class {},
		setIcon() {}
	};
}

function createPluginMethods() {
	return {
		loadData: async () => ({}),
		registerView() {},
		addRibbonIcon() {},
		addCommand(command) {
			this.commands ||= [];
			this.commands.push(command);
		},
		addSettingTab() {},
		saveData: async () => {}
	};
}
