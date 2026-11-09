const { Plugin } = require('./obsidian-api');
const { createGenerators } = require('./generators');
const { GeneratorView, VIEW_TYPE_GENERATORS } = require('./views/GeneratorView');
const { GeneratorSettingsTab } = require('./settings/GeneratorSettingsTab');
const { getLanguage, getText } = require('./i18n');

module.exports = class TabletopKitGeneratorsPlugin extends Plugin {
		async onload() {
			this.settings = (await this.loadData()) || {};
			this.settings.defaultLanguage = getLanguage(this.settings.defaultLanguage);
			if (!this.settings.generatorLanguages || typeof this.settings.generatorLanguages !== 'object' || Array.isArray(this.settings.generatorLanguages)) {
				this.settings.generatorLanguages = {};
			}
			this.generators = createGenerators(this);

			this.registerView(
				VIEW_TYPE_GENERATORS,
				(leaf) => new GeneratorView(leaf, this, this.generators)
			);

			this.addRibbonIcon('dices', getText(this.settings.defaultLanguage, 'appTitle'), () => {
				this.openGenerators();
			});

			this.addCommand({
				id: 'open-generators',
				name: this.settings.defaultLanguage === 'pt' ? 'Abrir geradores' : 'Open generators',
				callback: () => this.openGenerators()
			});

			this.addCommand({
				id: 'open-generators-in-new-tab',
				name: this.settings.defaultLanguage === 'pt'
					? 'Abrir outra instância dos geradores num separador'
					: 'Open another Generators view in new tab',
				callback: () => this.openGeneratorsInNewTab()
			});

			this.addCommand({
				id: 'open-npc-generator',
				name: this.settings.defaultLanguage === 'pt' ? 'Abrir gerador de NPC' : 'Open NPC generator',
				callback: () => this.openGenerators('npc')
			});

			this.addCommand({
				id: 'open-shop-generator-in-tab',
				name: this.settings.defaultLanguage === 'pt'
					? 'Abrir gerador de lojas num separador'
					: 'Open Shop Generator in main tab',
				callback: () => this.openGenerators('shop', true)
			});

			this.generatorSettingsTab = new GeneratorSettingsTab(this.app, this, this.generators);
			this.addSettingTab(this.generatorSettingsTab);
		}

		async saveSettings() {
			await this.saveData(this.settings);
		}

		async setDefaultLanguage(language) {
			this.settings.defaultLanguage = getLanguage(language);
			await this.saveSettings();
			this.refreshGeneratorViews(true);
			this.generatorSettingsTab?.display();
		}

		refreshGeneratorViews(refreshLanguage = false) {
			for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_GENERATORS)) {
				if (refreshLanguage) leaf.view?.refreshLanguage();
				else leaf.view?.refreshGenerator();
			}
		}

		async openGenerators(generatorId, openInMainTab = false) {
			if (generatorId) {
				this.settings.activeGenerator = generatorId;
				await this.saveSettings();
			}

			const { workspace } = this.app;
			const leaves = openInMainTab ? [] : workspace.getLeavesOfType(VIEW_TYPE_GENERATORS);
			let leaf = leaves[0];

			if (!leaf) {
				leaf = openInMainTab
					? workspace.getLeaf('tab')
					: workspace.getRightLeaf(false) || workspace.getLeaf('tab');
				await leaf.setViewState({ type: VIEW_TYPE_GENERATORS, active: true });
			}

			if (generatorId) {
				leaf.view?.selectGenerator(generatorId);
			}

			workspace.revealLeaf(leaf);
		}

		async openGeneratorsInNewTab() {
			const { workspace } = this.app;
			const leaf = workspace.getLeaf('tab');
			await leaf.setViewState({ type: VIEW_TYPE_GENERATORS, active: true });
			workspace.revealLeaf(leaf);
		}
	};
