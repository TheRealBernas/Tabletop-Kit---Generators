const { Notice, Setting } = require('../../obsidian-api');
const { getText } = require('../../i18n');
const { WEATHER_TYPES } = require('./data');

function renderWeatherSettings(containerEl, plugin, language) {
	const settings = plugin.settings.weather;
	containerEl.createEl('p', {
		text: getText(language, 'weatherSettingsDescription'),
		cls: 'rpg-gen-settings-description'
	});

	new Setting(containerEl)
		.setName(getText(language, 'weatherTemperatureUnit'))
		.addDropdown((dropdown) => {
			dropdown
				.addOption('c', '°C')
				.addOption('f', '°F')
				.setValue(settings.temperatureUnit)
				.onChange(async (temperatureUnit) => {
					settings.temperatureUnit = temperatureUnit;
					await saveWeatherSettings(plugin);
				});
		});

	new Setting(containerEl)
		.setName(getText(language, 'weatherAutomaticChanges'))
		.setDesc(getText(language, 'weatherAutomaticChangesDescription'))
		.addToggle((toggle) => {
			toggle.setValue(settings.autoRefresh).onChange(async (autoRefresh) => {
				settings.autoRefresh = autoRefresh;
				await saveWeatherSettings(plugin);
			});
		});

	new Setting(containerEl)
		.setName(getText(language, 'weatherChangeInterval'))
		.setDesc(getText(language, 'weatherChangeIntervalDescription'))
		.addText((text) => {
			text.inputEl.type = 'number';
			text.inputEl.min = '1';
			text.inputEl.max = '1440';
			text.inputEl.step = '1';
			text.setValue(String(settings.intervalMinutes)).onChange(async (value) => {
				if (!/^\d+$/.test(value)) return;
				const intervalMinutes = Number(value);
				if (intervalMinutes < 1 || intervalMinutes > 1440) return;
				settings.intervalMinutes = intervalMinutes;
				await saveWeatherSettings(plugin);
			});
			text.inputEl.addEventListener('blur', () => {
				const value = text.inputEl.value;
				const intervalMinutes = Number(value);
				if (!/^\d+$/.test(value) || intervalMinutes < 1 || intervalMinutes > 1440) {
					text.setValue(String(settings.intervalMinutes));
					new Notice(getText(language, 'weatherInvalidInterval'));
				}
			});
		});

	containerEl.createEl('h4', { text: getText(language, 'weatherTypes') });
	containerEl.createEl('p', {
		text: getText(language, 'weatherTypesDescription'),
		cls: 'rpg-gen-settings-description'
	});
	for (const type of WEATHER_TYPES) {
		new Setting(containerEl)
			.setName(getText(language, `weatherType_${type}`))
			.addToggle((toggle) => {
				toggle.setValue(settings.enabledTypes.includes(type)).onChange(async (enabled) => {
					if (!enabled && settings.enabledTypes.length === 1) {
						toggle.setValue(true);
						new Notice(getText(language, 'atLeastOneWeatherType'));
						return;
					}

					settings.enabledTypes = enabled
						? [...settings.enabledTypes, type]
						: settings.enabledTypes.filter((item) => item !== type);
					await saveWeatherSettings(plugin);
				});
			});
	}
}

async function saveWeatherSettings(plugin) {
	await plugin.saveSettings();
	plugin.refreshGeneratorViews();
}

module.exports = { renderWeatherSettings };
