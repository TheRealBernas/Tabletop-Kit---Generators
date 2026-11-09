const { Notice, Setting } = require('../../obsidian-api');
const { GENDERS, SPECIES } = require('./data');
const { getText } = require('../../i18n');

function renderNpcSettings(containerEl, plugin, language) {
	containerEl.createEl('p', {
		text: getText(language, 'npcSettingsDescription'),
		cls: 'rpg-gen-settings-description'
	});

	containerEl.createEl('h4', { text: getText(language, 'availableRaces') });
	renderSelectionSettings(containerEl, plugin, SPECIES, 'enabledSpecies', 'race', language);

	containerEl.createEl('h4', { text: getText(language, 'availableGenders') });
	renderSelectionSettings(containerEl, plugin, GENDERS, 'enabledGenders', 'gender', language);
}

function renderSelectionSettings(containerEl, plugin, options, settingKey, label, language) {
	for (const option of options) {
		const setting = new Setting(containerEl)
			.setName(label === 'gender' ? getText(language, option.toLowerCase()) : option)
			.addToggle((toggle) => {
				toggle
					.setValue(plugin.settings.npc[settingKey].includes(option))
					.onChange(async (enabled) => {
						const selected = plugin.settings.npc[settingKey];
						if (!enabled && selected.length === 1 && selected.includes(option)) {
							toggle.setValue(true);
							new Notice(getText(language, label === 'race' ? 'atLeastOneRace' : 'atLeastOneGender'));
							return;
						}

						plugin.settings.npc[settingKey] = enabled
							? [...selected, option]
							: selected.filter((item) => item !== option);
						await plugin.saveSettings();
					});
			});
		setting.settingEl.addClass('rpg-gen-choice-setting');
	}
}

module.exports = { renderNpcSettings };
