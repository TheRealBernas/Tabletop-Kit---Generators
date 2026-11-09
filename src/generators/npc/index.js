const { renderNpcGenerator } = require('./view');
const { renderNpcSettings } = require('./settings');
const { GENDERS, SPECIES } = require('./data');
const { getText } = require('../../i18n');

function createNpcGenerator(plugin) {
	const savedSettings = plugin.settings.npc || {};
	const enabledSpecies = normalizeSelection(savedSettings.enabledSpecies, savedSettings.species, SPECIES);
	const enabledGenders = normalizeSelection(savedSettings.enabledGenders, savedSettings.gender, GENDERS);
	plugin.settings.npc = { enabledSpecies, enabledGenders };

	return {
		id: 'npc',
		name: 'NPC Generator',
		getName: (language) => getText(language, 'npcGenerator'),
		render: (containerEl, language) => renderNpcGenerator(containerEl, plugin, language),
		renderSettings: (containerEl, language) => renderNpcSettings(containerEl, plugin, language)
	};
}

function normalizeSelection(savedSelection, legacySelection, availableOptions) {
	if (Array.isArray(savedSelection)) {
		const validSelection = savedSelection.filter((item) => availableOptions.includes(item));
		if (validSelection.length > 0) return validSelection;
	}

	if (availableOptions.includes(legacySelection)) return [legacySelection];
	return [...availableOptions];
}

module.exports = { createNpcGenerator };
