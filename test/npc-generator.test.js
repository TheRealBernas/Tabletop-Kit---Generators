const test = require('node:test');
const assert = require('node:assert/strict');
const { generateNpc } = require('../src/generators/npc/NpcGenerator');
const {
	GENDERS,
	OCCUPATIONS,
	PORTUGUESE_GENDERS,
	PORTUGUESE_TEXT,
	SKIN_DETAILS,
	SPECIES,
	SPECIES_DETAILS
} = require('../src/generators/npc/data');
const { getText } = require('../src/i18n');

test('generates a complete NPC with valid age and species', () => {
	const npc = generateNpc();
	const ageRange = SPECIES_DETAILS[npc.species].age;

	assert.ok(SPECIES.includes(npc.species));
	assert.ok(GENDERS.includes(npc.gender));
	assert.ok(Number.isInteger(npc.age));
	assert.ok(npc.age >= ageRange[0] && npc.age <= ageRange[1]);
	assert.ok(npc.name.length > 0);
	assert.ok(npc.job.length > 0);
	assert.ok(npc.description.length >= 5);
});

test('every species gets a skin color and visible texture in its Look prompt', () => {
	for (const species of SPECIES) {
		assert.ok(SKIN_DETAILS[species]?.looks.length > 0, `${species} needs skin descriptors`);
		const npc = generateNpc({ enabledSpecies: [species] }, () => 0);
		assert.match(npc.description[0], /^Look: .+;/);
		assert.match(npc.description[0], /(skin|scales)/);
	}
});

test('supports configured species and gender', () => {
	const npc = generateNpc({ species: 'Elf', gender: 'Agender' }, () => 0);

	assert.equal(npc.species, 'Elf');
	assert.equal(npc.gender, 'Agender');
	assert.equal(npc.age, SPECIES_DETAILS.Elf.age[0]);
	assert.equal(npc.job, 'A caravan guide');
});

test('only generates from selected races and genders', () => {
	const npc = generateNpc({
		enabledSpecies: ['Orc', 'Tiefling'],
		enabledGenders: ['Agender']
	}, () => 0.99);

	assert.equal(npc.species, 'Tiefling');
	assert.equal(npc.gender, 'Agender');
});

test('supports deterministic random generation', () => {
	const npc = generateNpc({}, () => 0);

	assert.equal(npc.species, 'Aasimar');
	assert.equal(npc.gender, 'Woman');
	assert.equal(npc.age, 18);
	assert.equal(npc.name, 'Aurelia Brightwell');
	assert.equal(npc.job, 'A caravan guide');
	assert.deepEqual(npc.description.slice(0, 6), [
		'Look: warm brown skin, smooth with a luminous sheen; bright, watchful eyes',
		'Clothing: a travel-worn coat with bright brass buttons',
		'Manner: they pause to consider every question',
		'Voice: a warm, unhurried cadence',
		'Goal: trying to repay an old debt',
		'Trait: they remember every face they have ever met'
	]);
});

test('NPC description includes practical roleplaying cues and optional special traits', () => {
	let callCount = 0;
	const random = () => {
		callCount += 1;
		return callCount === 12 ? 0.9 : 0;
	};
	const npc = generateNpc({}, random);

	assert.equal(npc.description.length, 5);
	assert.match(npc.description[0], /^Look: .+, .+;/);
	assert.match(npc.description[1], /^Clothing: /);
	assert.match(npc.description[2], /^Manner: /);
	assert.match(npc.description[3], /^Voice: /);
	assert.match(npc.description[4], /^Goal: /);
	assert.ok(npc.description.every((point) => point.length < 80));
});

test('Portuguese localization covers the NPC prompts and preserves D&D species names', () => {
	const npc = generateNpc({
		enabledSpecies: ['Dragonborn'],
		enabledGenders: ['Woman']
	}, () => 0, 'pt');

	assert.equal(npc.species, 'Dragonborn');
	assert.equal(npc.gender, PORTUGUESE_GENDERS.Woman);
	assert.equal(npc.job, 'Guia de caravanas');
	assert.match(npc.description[0], /^Aspeto: escamas/);
	assert.match(npc.description[1], /^Roupa: /);
	assert.match(npc.description[2], /^Comportamento: /);
	assert.match(npc.description[3], /^Voz: /);
	assert.match(npc.description[4], /^Objetivo: /);
	assert.equal(getText('pt', 'race'), 'Race');
});

test('Portuguese NPC data has matching prompt counts and descriptors for every species', () => {
	assert.equal(PORTUGUESE_TEXT.appearances.length, 12);
	assert.equal(PORTUGUESE_TEXT.clothing.length, 10);
	assert.equal(PORTUGUESE_TEXT.mannerisms.length, 12);
	assert.equal(PORTUGUESE_TEXT.speechStyles.length, 8);
	assert.equal(PORTUGUESE_TEXT.specialTraits.length, 10);
	assert.ok(OCCUPATIONS.length > 40);
	assert.equal(PORTUGUESE_TEXT.occupations.length, OCCUPATIONS.length);
	for (const language of ['en', 'pt']) {
		const occupations = language === 'pt' ? PORTUGUESE_TEXT.occupations : OCCUPATIONS;
		for (let occupationIndex = 0; occupationIndex < occupations.length; occupationIndex += 1) {
			let callIndex = 0;
			const random = () => {
				callIndex += 1;
				if (callIndex === 5) return (occupationIndex + 0.1) / occupations.length;
				return 0;
			};
			const npc = generateNpc({}, random, language);
			assert.equal(
				npc.job[0],
				npc.job[0].toLocaleUpperCase(language === 'pt' ? 'pt-PT' : 'en'),
				`Occupation "${npc.job}" should start with an uppercase letter`
			);
		}
	}
	assert.equal(PORTUGUESE_TEXT.motivations.length, 10);
	assert.deepEqual(Object.keys(PORTUGUESE_TEXT.skinLooks).sort(), [...SPECIES].sort());
	assert.deepEqual(Object.keys(PORTUGUESE_GENDERS).sort(), [...GENDERS].sort());
});
