const {
	APPEARANCES,
	CLOTHING,
	GENDERS,
	MANNERISMS,
	MOTIVATIONS,
	OCCUPATIONS,
	PORTUGUESE_GENDERS,
	PORTUGUESE_TEXT,
	SKIN_DETAILS,
	SPECIAL_TRAITS,
	SPEECH_STYLES,
	SPECIES,
	SPECIES_DETAILS
} = require('./data');
const { getText } = require('../../i18n');

function pick(items, random) {
	return items[Math.floor(random() * items.length)];
}

function getEnabledOptions(options, key, legacyKey, allOptions) {
	const selected = options[key];
	if (Array.isArray(selected)) {
		const validOptions = selected.filter((item) => allOptions.includes(item));
		return validOptions.length > 0 ? validOptions : allOptions;
	}

	const legacySelection = options[legacyKey];
	return allOptions.includes(legacySelection) ? [legacySelection] : allOptions;
}

function generateNpc(options = {}, random = Math.random, language = 'en') {
	const portuguese = language === 'pt';
	const localized = portuguese ? PORTUGUESE_TEXT : null;
	const speciesOptions = getEnabledOptions(options, 'enabledSpecies', 'species', SPECIES);
	const genderOptions = getEnabledOptions(options, 'enabledGenders', 'gender', GENDERS);
	const species = pick(speciesOptions, random);
	const details = SPECIES_DETAILS[species];
	const age = details.age[0] + Math.floor(random() * (details.age[1] - details.age[0] + 1));
	const name = `${pick(details.firstNames, random)} ${pick(details.lastNames, random)}`;
	const job = capitalizeFirst(pick(localized?.occupations || OCCUPATIONS, random), language);
	const skin = SKIN_DETAILS[species];
	const skinLooks = localized?.skinLooks[species] || skin.looks;
	const description = [
		`${getText(language, 'look')}: ${pick(skinLooks, random)}; ${pick(localized?.appearances || APPEARANCES, random)}`,
		`${getText(language, 'clothing')}: ${pick(localized?.clothing || CLOTHING, random)}`,
		`${getText(language, 'manner')}: ${portuguese ? '' : 'they '}${pick(localized?.mannerisms || MANNERISMS, random)}`,
		`${getText(language, 'voice')}: ${pick(localized?.speechStyles || SPEECH_STYLES, random)}`,
		`${getText(language, 'goal')}: ${pick(localized?.motivations || MOTIVATIONS, random)}`
	];
	const specialTrait = random() < 0.35
		? pick(localized?.specialTraits || SPECIAL_TRAITS, random)
		: null;
	if (specialTrait) {
		description.push(`${getText(language, 'trait')}: ${specialTrait}`);
	}

	return {
		age,
		description,
		gender: getGenderLabel(pick(genderOptions, random), language),
		job,
		name,
		species
	};
}

function capitalizeFirst(value, language) {
	const [first, ...rest] = value;
	return `${first.toLocaleUpperCase(language === 'pt' ? 'pt-PT' : 'en')}${rest.join('')}`;
}

function getGenderLabel(gender, language) {
	return language === 'pt' ? PORTUGUESE_GENDERS[gender] : gender;
}

module.exports = { generateNpc };
