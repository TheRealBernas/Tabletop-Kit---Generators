const { WEATHER_PRESETS, WEATHER_TYPES } = require('./data');
const { getLanguage } = require('../../i18n');

function generateWeather(random = Math.random, language = 'en', settings = {}) {
	const selectedTypes = Array.isArray(settings.enabledTypes)
		? settings.enabledTypes.filter((type) => WEATHER_TYPES.includes(type))
		: WEATHER_TYPES;
	const allowedTypes = selectedTypes.length > 0 ? selectedTypes : WEATHER_TYPES;
	const availablePresets = WEATHER_PRESETS.filter((preset) =>
		preset.types.some((type) => allowedTypes.includes(type))
	);
	const preset = availablePresets[Math.floor(random() * availablePresets.length)];
	const unit = settings.temperatureUnit === 'f' ? 'F' : 'C';
	const temperature = unit === 'F'
		? Math.round((preset.temperatureC * 9) / 5 + 32)
		: preset.temperatureC;

	return {
		...preset[getLanguage(language)],
		icon: preset.icon,
		temperature: `${temperature}°${unit}`,
		temperatureFeel: preset[getLanguage(language)].temperature,
		types: preset.types
	};
}

module.exports = { generateWeather };
