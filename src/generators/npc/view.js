const { Notice } = require('../../obsidian-api');
const { generateNpc } = require('./NpcGenerator');
const { getText } = require('../../i18n');

function renderNpcGenerator(containerEl, plugin, language) {
	const render = (npc) => {
		containerEl.empty();
		const intro = containerEl.createDiv({ cls: 'rpg-gen-intro' });
		intro.createDiv({ text: getText(language, 'npcEyebrow'), cls: 'rpg-gen-eyebrow' });
		intro.createEl('h2', { text: getText(language, 'npcTitle'), cls: 'rpg-gen-title' });
		intro.createEl('p', {
			text: getText(language, 'npcSubtitle'),
			cls: 'rpg-gen-subtitle'
		});

		const card = containerEl.createDiv({ cls: 'rpg-bs-card rpg-gen-card' });
		const header = card.createDiv({ cls: 'rpg-gen-card-header' });
		const identity = header.createDiv({ cls: 'rpg-npc-identity' });
		identity.createEl('h3', { text: npc.name, cls: 'rpg-gen-name' });
		identity.createDiv({ text: npc.species.toUpperCase(), cls: 'rpg-gen-species' });

		const details = card.createDiv({ cls: 'rpg-gen-details' });
		renderField(details, getText(language, 'age'), `${npc.age} ${getText(language, 'yearsOld')}`);
		renderField(details, getText(language, 'gender'), npc.gender);
		renderField(details, getText(language, 'race'), npc.species);
		renderField(details, getText(language, 'job'), npc.job);

		const description = card.createDiv({ cls: 'rpg-gen-description' });
		description.createDiv({ text: getText(language, 'description'), cls: 'rpg-gen-field-label' });
		const descriptionList = description.createEl('ul', { cls: 'rpg-gen-description-list' });
		for (const point of npc.description) {
			const separator = point.indexOf(':');
			const item = descriptionList.createEl('li');
			if (separator === -1) {
				item.setText(point);
				continue;
			}

			item.createEl('strong', { text: point.slice(0, separator + 1) });
			item.createSpan({ text: ` ${point.slice(separator + 1).trimStart()}` });
		}

		const actions = containerEl.createDiv({ cls: 'rpg-gen-actions' });
		const generateButton = actions.createEl('button', {
			text: getText(language, 'generateNpc'),
			cls: 'rpg-bs-btn rpg-gen-primary'
		});
		generateButton.onclick = () => render(generateNpc(plugin.settings.npc, Math.random, language));

		const copyButton = actions.createEl('button', {
			text: getText(language, 'copyNpc'),
			cls: 'rpg-bs-btn rpg-gen-secondary'
		});
		copyButton.onclick = () => copyNpc(npc, language);
	};

	render(generateNpc(plugin.settings.npc, Math.random, language));
}

function renderField(parent, label, value) {
	const field = parent.createDiv({ cls: 'rpg-gen-field' });
	field.createDiv({ text: label, cls: 'rpg-gen-field-label' });
	field.createDiv({ text: value, cls: 'rpg-gen-field-value' });
}

async function copyNpc(npc, language) {
	const text = [
		`${getText(language, 'name')}: ${npc.name}`,
		`${getText(language, 'race')}: ${npc.species}`,
		`${getText(language, 'age')}: ${npc.age} ${getText(language, 'yearsOld')}`,
		`${getText(language, 'gender')}: ${npc.gender}`,
		`${getText(language, 'job')}: ${npc.job}`,
		`${getText(language, 'description')}:`,
		...npc.description.map((point) => `- ${point}`)
	].join('\n');

	try {
		await navigator.clipboard.writeText(text);
		new Notice(getText(language, 'copiedNpc'));
	} catch (error) {
		new Notice(`${getText(language, 'copyNpcError')}: ${error.message}`);
	}
}

module.exports = { renderNpcGenerator };
