const test = require('node:test');
const assert = require('node:assert/strict');
const {
	formatPrice,
	generateShop,
	INVENTORY_MAX,
	INVENTORY_MIN,
	normalizeShopSettings
} = require('../src/generators/shop/ShopGenerator');
const { SHOP_ITEMS, SHOP_TYPES } = require('../src/generators/shop/data');

test('generates a shop with a seller and stock matching the selected shop type', () => {
	for (const type of SHOP_TYPES) {
		const shop = generateShop(type, () => 0, 'en');

		assert.equal(shop.type, type);
		assert.ok(shop.typeName.length > 0);
		assert.ok(shop.shopkeeper.name.length > 0);
		assert.ok(!Object.hasOwn(shop.shopkeeper, 'job'));
		assert.ok(shop.shopkeeper.description.length >= 5);
		assert.ok(shop.inventory.length >= INVENTORY_MIN);
		assert.ok(shop.inventory.length <= INVENTORY_MAX);
		assert.ok(shop.inventory.every((item) => item.shops.includes(type)));
		assert.equal(new Set(shop.inventory.map((item) => item.name)).size, shop.inventory.length);
	}
});

test('assigns cheap, normal, and expensive prices around the SRD base price', () => {
	const shop = generateShop('general', () => 0);

	for (const item of shop.inventory) {
		assert.equal(item.prices.normal, item.price);
		assert.ok(item.prices.cheap <= item.prices.normal);
		assert.ok(item.prices.expensive >= item.prices.normal);
		assert.ok(item.quantity >= 1 && item.quantity <= 8);
	}
});

test('selects a random shop type and localizes the seller description', () => {
	const shop = generateShop('random', () => 0, 'pt');

	assert.equal(shop.type, SHOP_TYPES[0]);
	assert.ok(!Object.hasOwn(shop.shopkeeper, 'job'));
	assert.equal(shop.shopkeeper.description[0].split(':')[0], 'Aspeto');
});

test('supports a configured fixed inventory size', () => {
	const shop = generateShop('general', () => 0, 'en', { inventorySize: 9 });

	assert.equal(shop.inventory.length, 9);
});

test('preserves deterministic inventory selection after pre-grouping the catalogue', () => {
	let seed = 123456789;
	const random = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
	const shop = generateShop('alchemist', random, 'en', { inventorySize: 8 });

	assert.deepEqual(
		shop.inventory.map(({ name, quantity }) => [name, quantity]),
		[
			['Antitoxin (vial)', 8],
			['Oil (flask)', 3],
			['Vial', 3],
			['Candle', 5],
			['Healer’s kit', 2],
			['Herbalism kit', 3],
			['Alchemist’s supplies', 3],
			['Potion of climbing', 3]
		]
	);
	assert.deepEqual(
		[shop.shopkeeper.age, shop.shopkeeper.name, shop.shopkeeper.species],
		[88, 'Melech Vexley', 'Tiefling']
	);
});

test('normalizes shop settings and preserves supported defaults', () => {
	assert.deepEqual(normalizeShopSettings({ defaultShopType: 'alchemist', inventorySize: 10 }), {
		defaultShopType: 'alchemist',
		inventorySize: 10
	});
	assert.deepEqual(normalizeShopSettings({ defaultShopType: 'unknown', inventorySize: 100 }), {
		defaultShopType: 'random',
		inventorySize: 'random'
	});
});

test('formats prices using D&D coin denominations', () => {
	assert.equal(formatPrice(1), '1 cp');
	assert.equal(formatPrice(10), '1 sp');
	assert.equal(formatPrice(105), '1 gp 5 cp');
	assert.equal(formatPrice(253), '2 gp 5 sp 3 cp');
});

test('shop item data has valid prices and at least one valid shop type', () => {
	assert.ok(SHOP_ITEMS.length >= 80);
	assert.ok(SHOP_TYPES.length >= 14);
	for (const type of SHOP_TYPES) {
		assert.ok(
			SHOP_ITEMS.filter((item) => item.shops.includes(type)).length >= INVENTORY_MIN,
			`${type} should have enough distinct stock options`
		);
	}
	for (const item of SHOP_ITEMS) {
		assert.ok(item.name.length > 0);
		assert.ok(Number.isInteger(item.price) && item.price > 0);
		assert.ok(item.shops.length > 0);
		assert.ok(item.shops.every((type) => SHOP_TYPES.includes(type)));
	}
});
