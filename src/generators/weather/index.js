const { getText } = require('../../i18n');
const { renderWeatherGenerator } = require('./view');
const { renderWeatherSettings } = require('./settings');
const { WEATHER_TYPES } = require('./data');

function createWeatherGenerator(plugin) {
	const saved = plugin.settings.weather || {};
	const enabledTypes = Array.isArray(saved.enabledTypes)
		? saved.enabledTypes.filter((type) => WEATHER_TYPES.includes(type))
		: [...WEATHER_TYPES];
	plugin.settings.weather = {
		autoRefresh: saved.autoRefresh === true,
		enabledTypes: enabledTypes.length > 0 ? enabledTypes : [...WEATHER_TYPES],
		intervalMinutes: Number.isInteger(saved.intervalMinutes)
			&& saved.intervalMinutes >= 1
			&& saved.intervalMinutes <= 1440
			? saved.intervalMinutes
			: 5,
		temperatureUnit: saved.temperatureUnit === 'f' ? 'f' : 'c'
	};

	return {
		id: 'weather',
		name: 'Weather Generator',
		getName: (language) => getText(language, 'weatherGenerator'),
		render: (containerEl, language) => renderWeatherGenerator(containerEl, plugin, language),
		renderSettings: (containerEl, language) => renderWeatherSettings(containerEl, plugin, language)
	};
}

module.exports = { createWeatherGenerator };
