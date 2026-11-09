const { Notice, setIcon } = require('../../obsidian-api');
const { getText } = require('../../i18n');
const { generateWeather } = require('./WeatherGenerator');

function renderWeatherGenerator(containerEl, plugin, language) {
	const settings = plugin.settings.weather;
	const render = (weather) => {
		containerEl.empty();
		const intro = containerEl.createDiv({ cls: 'rpg-gen-intro' });
		intro.createDiv({ text: getText(language, 'weatherEyebrow'), cls: 'rpg-gen-eyebrow' });
		intro.createEl('h2', { text: getText(language, 'weatherTitle'), cls: 'rpg-gen-title' });
		intro.createEl('p', {
			text: getText(language, 'weatherSubtitle'),
			cls: 'rpg-gen-subtitle'
		});

		const card = containerEl.createDiv({ cls: 'rpg-bs-card rpg-gen-card rpg-weather-card' });
		const header = card.createDiv({ cls: 'rpg-gen-card-header' });
		const current = header.createDiv({ cls: 'rpg-weather-current' });
		const currentIcon = current.createSpan({ cls: 'rpg-weather-current-icon' });
		setIcon(currentIcon, weather.icon);
		current.createEl('h3', { text: weather.condition, cls: 'rpg-gen-name' });
		current.createDiv({ text: weather.temperature, cls: 'rpg-weather-temperature' });

		const details = card.createDiv({ cls: 'rpg-gen-details' });
		renderField(details, getText(language, 'weatherFeelsLike'), weather.temperatureFeel, 'thermometer');
		renderField(details, getText(language, 'weatherPrecipitation'), weather.precipitation, 'cloud-rain');
		renderField(details, getText(language, 'weatherWind'), weather.wind, 'wind');
		renderField(details, getText(language, 'weatherVisibility'), weather.visibility, 'eye');

		const travel = card.createDiv({ cls: 'rpg-gen-description' });
		renderLabel(travel, getText(language, 'weatherTravel'), 'map');
		travel.createDiv({ text: weather.travel, cls: 'rpg-gen-field-value' });

		if (settings.autoRefresh) {
			const refreshNotice = containerEl.createDiv({ cls: 'rpg-weather-refresh-notice' });
			const refreshIcon = refreshNotice.createSpan();
			setIcon(refreshIcon, 'timer');
			refreshNotice.createSpan({
				text: getText(language, 'weatherAutoRefreshNotice')
					.replace('{minutes}', String(settings.intervalMinutes))
			});
		}

		const actions = containerEl.createDiv({ cls: 'rpg-gen-actions' });
		const generateButton = actions.createEl('button', {
			text: getText(language, 'generateWeather'),
			cls: 'rpg-bs-btn rpg-gen-primary'
		});
		generateButton.onclick = () => render(generateWeather(Math.random, language, settings));

		const copyButton = actions.createEl('button', {
			text: getText(language, 'copyWeather'),
			cls: 'rpg-bs-btn rpg-gen-secondary'
		});
		copyButton.onclick = () => copyWeather(weather, language);
	};

	render(generateWeather(Math.random, language, settings));
	if (!settings.autoRefresh) return undefined;

	const interval = setInterval(
		() => render(generateWeather(Math.random, language, settings)),
		settings.intervalMinutes * 60 * 1000
	);
	return () => clearInterval(interval);
}

function renderField(parent, label, value, icon) {
	const field = parent.createDiv({ cls: 'rpg-gen-field' });
	renderLabel(field, label, icon);
	field.createDiv({ text: value, cls: 'rpg-gen-field-value' });
}

function renderLabel(parent, label, icon) {
	const labelEl = parent.createDiv({ cls: 'rpg-gen-field-label rpg-weather-field-label' });
	const iconEl = labelEl.createSpan({ cls: 'rpg-weather-field-icon' });
	setIcon(iconEl, icon);
	labelEl.createSpan({ text: label });
}

async function copyWeather(weather, language) {
	const text = [
		`${getText(language, 'weatherCondition')}: ${weather.condition}`,
		`${getText(language, 'weatherTemperature')}: ${weather.temperature}`,
		`${getText(language, 'weatherFeelsLike')}: ${weather.temperatureFeel}`,
		`${getText(language, 'weatherPrecipitation')}: ${weather.precipitation}`,
		`${getText(language, 'weatherWind')}: ${weather.wind}`,
		`${getText(language, 'weatherVisibility')}: ${weather.visibility}`,
		`${getText(language, 'weatherTravel')}: ${weather.travel}`
	].join('\n');

	try {
		await navigator.clipboard.writeText(text);
		new Notice(getText(language, 'copiedWeather'));
	} catch (error) {
		new Notice(`${getText(language, 'copyWeatherError')}: ${error.message}`);
	}
}

module.exports = { renderWeatherGenerator };
