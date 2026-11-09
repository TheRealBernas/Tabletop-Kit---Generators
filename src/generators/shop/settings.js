const { Setting } = require('../../obsidian-api');
const { getText } = require('../../i18n');
const { INVENTORY_MAX, INVENTORY_MIN } = require('./ShopGenerator');
const { SHOP_TYPES } = require('./data');

function renderShopSettings(containerEl, plugin, language) {
	containerEl.createEl('p', {
		text: getText(language, 'shopSettingsDescription'),
		cls: 'rpg-gen-settings-description'
	});

	new Setting(containerEl)
		.setName(getText(language, 'shopDefaultType'))
		.setDesc(getText(language, 'shopDefaultTypeDescription'))
		.addDropdown((dropdown) => {
			dropdown.addOption('random', getText(language, 'randomShop'));
			for (const type of SHOP_TYPES) {
				dropdown.addOption(type, getText(language, `shopType_${type}`));
			}
			dropdown
				.setValue(plugin.settings.shop.defaultShopType)
				.onChange(async (defaultShopType) => {
					plugin.settings.shop.defaultShopType = defaultShopType;
					await saveShopSettings(plugin);
				});
		});

	new Setting(containerEl)
		.setName(getText(language, 'shopInventorySize'))
		.setDesc(getText(language, 'shopInventorySizeDescription'))
		.addDropdown((dropdown) => {
			dropdown.addOption('random', getText(language, 'shopInventoryRandomSize'));
			for (let size = INVENTORY_MIN; size <= INVENTORY_MAX; size += 1) {
				dropdown.addOption(String(size), getText(language, 'shopInventoryFixedSize').replace('{count}', String(size)));
			}
			dropdown
				.setValue(String(plugin.settings.shop.inventorySize))
				.onChange(async (value) => {
					plugin.settings.shop.inventorySize = value === 'random' ? 'random' : Number(value);
					await saveShopSettings(plugin);
				});
		});

	containerEl.createEl('p', {
		text: getText(language, 'shopSrdAttribution'),
		cls: 'rpg-shop-attribution'
	});
}

async function saveShopSettings(plugin) {
	await plugin.saveSettings();
	plugin.refreshGeneratorViews();
}

module.exports = { renderShopSettings };
