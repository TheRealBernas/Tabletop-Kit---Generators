const { PluginSettingTab, Setting } = require('../obsidian-api');
const { getLanguageName, getText } = require('../i18n');

module.exports = {
	GeneratorSettingsTab: class GeneratorSettingsTab extends PluginSettingTab {
		constructor(app, plugin, generators) {
			super(app, plugin);
			this.generators = generators;
		}

		display() {
			const { containerEl } = this;
			containerEl.empty();
			const language = this.plugin.settings.defaultLanguage;
			containerEl.createEl('h2', { text: getText(language, 'settingsTitle') });

			const general = containerEl.createEl('details', {
				cls: 'rpg-gen-settings-section',
				attr: { open: '' }
			});
			general.createEl('summary', {
				text: getText(language, 'generalSettings'),
				cls: 'rpg-gen-settings-summary'
			});
			const generalContent = general.createDiv({ cls: 'rpg-gen-settings-content' });
			new Setting(generalContent)
				.setName(getText(language, 'defaultLanguage'))
				.setDesc(getText(language, 'defaultLanguageDescription'))
				.addDropdown((dropdown) => {
					for (const option of ['en', 'pt']) {
						dropdown.addOption(option, getLanguageName(option, language));
					}
					dropdown
						.setValue(language)
						.onChange((value) => this.plugin.setDefaultLanguage(value));
				});

			for (const generator of this.generators) {
				const section = containerEl.createEl('details', {
					cls: 'rpg-gen-settings-section'
				});
				section.createEl('summary', {
					text: generator.getName(language),
					cls: 'rpg-gen-settings-summary'
				});
				const content = section.createDiv({
					cls: 'rpg-gen-settings-content'
				});
				generator.renderSettings(content, language);
			}
		}
	}
};
