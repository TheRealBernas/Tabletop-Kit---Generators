const { ItemView } = require('../obsidian-api');
const { getLanguage, getLanguageName, getText } = require('../i18n');

const VIEW_TYPE_GENERATORS = 'tabletop-kit-generators-view';

module.exports = {
	VIEW_TYPE_GENERATORS,
	GeneratorView: class GeneratorView extends ItemView {
		constructor(leaf, plugin, generators) {
			super(leaf);
			this.plugin = plugin;
			this.generators = generators;
			this.selectedGeneratorId = plugin.settings.activeGenerator || generators[0]?.id;
			this.language = this.getGeneratorLanguage(this.selectedGeneratorId);
		}

		getViewType() {
			return VIEW_TYPE_GENERATORS;
		}

		getDisplayText() {
			return getText(this.language, 'appTitle');
		}

		getIcon() {
			return 'dices';
		}

		async onOpen() {
			this.render();
		}

		async onClose() {
			this.generatorCleanup?.();
			this.generatorCleanup = undefined;
		}

		render() {
			const host = this.contentEl;
			host.empty();
			host.addClass('rpg-gen-host');

			const root = host.createDiv({ cls: 'rpg-gen-scroll-root' });
			const selector = root.createDiv({ cls: 'rpg-gen-selector' });
			const selectorHeader = selector.createDiv({ cls: 'rpg-gen-selector-header' });
			selectorHeader.createDiv({
				text: getText(this.language, 'yourToolkit'),
				cls: 'rpg-gen-eyebrow'
			});
			selectorHeader.createDiv({
				text: getText(this.language, 'generatorOptions'),
				cls: 'rpg-gen-selector-description'
			});
			const selectorControls = selector.createDiv({ cls: 'rpg-gen-selector-controls' });
			const generatorField = selectorControls.createDiv({ cls: 'rpg-gen-selector-field' });
			generatorField.createDiv({
				text: getText(this.language, 'generator'),
				cls: 'rpg-gen-selector-label'
			});
			const select = generatorField.createEl('select', {
				cls: 'dropdown rpg-gen-selector-dropdown',
				attr: { 'aria-label': getText(this.language, 'chooseGenerator') }
			});
			for (const generator of this.generators) {
				select.createEl('option', {
					text: generator.getName(this.language),
					value: generator.id
				});
			}
			select.value = this.selectedGeneratorId;
			select.onchange = () => {
				void this.selectGenerator(select.value);
			};

			const languageField = selectorControls.createDiv({ cls: 'rpg-gen-selector-field' });
			languageField.createDiv({
				text: getText(this.language, 'language'),
				cls: 'rpg-gen-selector-label'
			});
			const languageSelect = languageField.createEl('select', {
				cls: 'dropdown rpg-gen-selector-dropdown',
				attr: { 'aria-label': getText(this.language, 'language') }
			});
			for (const language of ['en', 'pt']) {
				languageSelect.createEl('option', {
					text: getLanguageName(language, this.language),
					value: language
				});
			}
			languageSelect.value = this.language;
			languageSelect.onchange = () => {
				void this.selectLanguage(languageSelect.value);
			};

			this.generatorContainer = root.createDiv({ cls: 'rpg-gen-panel' });
			this.renderSelectedGenerator();
		}

		async selectGenerator(generatorId) {
			this.selectedGeneratorId = generatorId;
			this.plugin.settings.activeGenerator = generatorId;
			this.language = this.getGeneratorLanguage(generatorId);
			await this.plugin.saveSettings();
			this.render();
		}

		async selectLanguage(language) {
			this.language = getLanguage(language);
			this.plugin.settings.generatorLanguages[this.selectedGeneratorId] = this.language;
			await this.plugin.saveSettings();
			this.render();
		}

		getGeneratorLanguage(generatorId) {
			const override = this.plugin.settings.generatorLanguages?.[generatorId];
			return getLanguage(override || this.plugin.settings.defaultLanguage);
		}

		refreshLanguage() {
			this.language = this.getGeneratorLanguage(this.selectedGeneratorId);
			this.render();
		}

		refreshGenerator() {
			this.render();
		}

		renderSelectedGenerator() {
			this.generatorCleanup?.();
			this.generatorCleanup = undefined;
			const generator = this.generators.find((item) => item.id === this.selectedGeneratorId)
				|| this.generators[0];
			if (!generator || !this.generatorContainer) return;

			this.generatorContainer.empty();
			this.generatorCleanup = generator.render(this.generatorContainer, this.language);
		}
	}
};
