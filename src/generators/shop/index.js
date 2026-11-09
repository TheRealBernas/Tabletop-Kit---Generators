const { getText } = require('../../i18n');
const { renderShopGenerator } = require('./view');
const { renderShopSettings } = require('./settings');
const { normalizeShopSettings } = require('./ShopGenerator');

function createShopGenerator(plugin) {
	plugin.settings.shop = normalizeShopSettings(plugin.settings.shop);

	return {
		id: 'shop',
		name: 'Shop Generator',
		getName: (language) => getText(language, 'shopGenerator'),
		render: (containerEl, language) => renderShopGenerator(containerEl, plugin, language),
		renderSettings: (containerEl, language) => renderShopSettings(containerEl, plugin, language)
	};
}

module.exports = { createShopGenerator };
