const { generateNpc } = require('../npc/NpcGenerator');
const { getText } = require('../../i18n');
const { SHOP_ITEMS, SHOP_TYPES } = require('./data');

const INVENTORY_MIN = 6;
const INVENTORY_MAX = 12;
const SHOP_ITEMS_BY_TYPE = Object.fromEntries(SHOP_TYPES.map((type) => [type, []]));

for (const item of SHOP_ITEMS) {
	for (const type of item.shops) {
		SHOP_ITEMS_BY_TYPE[type].push(item);
	}
}

function generateShop(shopType = 'random', random = Math.random, language = 'en', settings = {}) {
	const selectedType = shopType === 'random'
		? pick(SHOP_TYPES, random)
		: SHOP_TYPES.includes(shopType) ? shopType : 'general';
	const candidates = SHOP_ITEMS_BY_TYPE[selectedType].slice();
	const configuredSize = settings.inventorySize;
	const itemCount = Math.min(
		candidates.length,
		Number.isInteger(configuredSize) && configuredSize >= INVENTORY_MIN && configuredSize <= INVENTORY_MAX
			? configuredSize
			: INVENTORY_MIN + Math.floor(random() * (INVENTORY_MAX - INVENTORY_MIN + 1))
	);
	const inventory = [];

	for (let index = 0; index < itemCount; index += 1) {
		const item = candidates.splice(Math.floor(random() * candidates.length), 1)[0];
		inventory.push({
			...item,
			quantity: 1 + Math.floor(random() * 8),
			prices: {
				cheap: Math.max(1, Math.round(item.price * 0.75)),
				normal: item.price,
				expensive: Math.max(1, Math.round(item.price * 1.5))
			}
		});
	}

	const npc = generateNpc({}, random, language);
	const { age, description, gender, name, species } = npc;
	const shopkeeper = { age, description, gender, name, species };

	return {
		inventory,
		shopkeeper,
		type: selectedType,
		typeName: getText(language, `shopType_${selectedType}`)
	};
}

function normalizeShopSettings(saved = {}) {
	if (!saved || typeof saved !== 'object' || Array.isArray(saved)) saved = {};
	return {
		defaultShopType: SHOP_TYPES.includes(saved.defaultShopType) ? saved.defaultShopType : 'random',
		inventorySize: saved.inventorySize === 'random'
			? 'random'
			: Number.isInteger(saved.inventorySize)
				&& saved.inventorySize >= INVENTORY_MIN
				&& saved.inventorySize <= INVENTORY_MAX
				? saved.inventorySize
				: 'random'
	};
}

function pick(items, random) {
	return items[Math.floor(random() * items.length)];
}

function formatPrice(copperPieces) {
	const gold = Math.floor(copperPieces / 100);
	const silver = Math.floor((copperPieces % 100) / 10);
	const copper = copperPieces % 10;
	return [
		gold ? `${gold} gp` : '',
		silver ? `${silver} sp` : '',
		copper || (!gold && !silver) ? `${copper} cp` : ''
	].filter(Boolean).join(' ');
}

module.exports = {
	INVENTORY_MAX,
	INVENTORY_MIN,
	formatPrice,
	generateShop,
	normalizeShopSettings
};
