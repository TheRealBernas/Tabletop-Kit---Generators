const { Plugin } = require('obsidian');
const obsidianApiKey = Symbol.for('tabletop-kit-generators.obsidian-api');

module.exports = class TabletopKitGeneratorsLoader extends Plugin {
	async onload() {
		const pluginDirectory = this.manifest.dir || `.obsidian/plugins/${this.manifest.id}`;
		const sourceEntry = this.app.vault.adapter.getFullPath(`${pluginDirectory}/src/main.js`);
		const lastSeparator = Math.max(sourceEntry.lastIndexOf('/'), sourceEntry.lastIndexOf('\\'));
		const sourceDirectory = sourceEntry.slice(0, lastSeparator + 1);
		if (require.cache) {
			for (const cachedModule of Object.keys(require.cache)) {
				if (cachedModule.startsWith(sourceDirectory)) {
					delete require.cache[cachedModule];
				}
			}
		}

		globalThis[obsidianApiKey] = require('obsidian');
		let SourcePlugin;
		try {
			SourcePlugin = require(sourceEntry);
		} finally {
			delete globalThis[obsidianApiKey];
		}

		Object.setPrototypeOf(this, SourcePlugin.prototype);
		await SourcePlugin.prototype.onload.call(this);
	}
};
