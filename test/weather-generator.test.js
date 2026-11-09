const test = require('node:test');
const assert = require('node:assert/strict');
const { generateWeather } = require('../src/generators/weather/WeatherGenerator');
const { WEATHER_PRESETS, WEATHER_TYPES } = require('../src/generators/weather/data');

test('generates a complete, internally coherent weather forecast', () => {
	const weather = generateWeather(() => 0);

	assert.equal(weather.condition, WEATHER_PRESETS[0].en.condition);
	for (const field of ['temperature', 'precipitation', 'wind', 'visibility', 'travel']) {
		assert.ok(weather[field].length > 0, `${field} should be included`);
	}
	assert.equal(weather.precipitation, 'None');
	assert.equal(weather.temperature, '20°C');
	assert.equal(weather.temperatureFeel, WEATHER_PRESETS[0].en.temperature);
	assert.equal(weather.icon, WEATHER_PRESETS[0].icon);
});

test('selects across all weather presets with the injected random source', () => {
	const weather = generateWeather(() => 0.999999);

	assert.equal(weather.condition, WEATHER_PRESETS.at(-1).en.condition);
});

test('generates the same weather details in European Portuguese', () => {
	const weather = generateWeather(() => 0.4, 'pt');
	const preset = WEATHER_PRESETS[Math.floor(0.4 * WEATHER_PRESETS.length)];

	assert.equal(weather.condition, preset.pt.condition);
	assert.equal(weather.temperatureFeel, preset.pt.temperature);
	assert.notEqual(weather.condition, preset.en.condition);
});

test('formats representative temperature in Fahrenheit when configured', () => {
	const weather = generateWeather(() => 0, 'en', { temperatureUnit: 'f' });

	assert.equal(weather.temperature, '68°F');
});

test('only generates weather matching enabled types', () => {
	for (const type of WEATHER_TYPES) {
		for (const random of [() => 0, () => 0.5, () => 0.999999]) {
			const weather = generateWeather(random, 'en', { enabledTypes: [type] });
			assert.ok(weather.types.includes(type), `${weather.condition} should match ${type}`);
		}
	}
});

test('every weather preset has complete English and Portuguese translations', () => {
	assert.ok(WEATHER_PRESETS.length >= 15);
	for (const preset of WEATHER_PRESETS) {
		assert.ok(preset.icon.length > 0);
		assert.ok(Number.isInteger(preset.temperatureC));
		assert.ok(preset.types.length > 0);
		assert.ok(preset.types.every((type) => WEATHER_TYPES.includes(type)));
		for (const language of ['en', 'pt']) {
			for (const field of ['condition', 'temperature', 'precipitation', 'wind', 'visibility', 'travel']) {
				assert.equal(typeof preset[language][field], 'string');
				assert.ok(preset[language][field].length > 0);
			}
		}
	}
});
