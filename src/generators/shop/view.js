const { getText } = require('../../i18n');
const { formatPrice, generateShop } = require('./ShopGenerator');
const { SHOP_TYPES } = require('./data');

function renderShopGenerator(containerEl, plugin, language) {
	let selectedType = plugin.settings.shop.defaultShopType;
	let shop;
	let selectedItemName = null;
	let sort = { key: 'normal', direction: 'asc' };
	const generateCurrentShop = () =>
		generateShop(selectedType, Math.random, language, plugin.settings.shop);

	const render = () => {
		containerEl.empty();
		const intro = containerEl.createDiv({ cls: 'rpg-gen-intro' });
		intro.createDiv({ text: getText(language, 'shopEyebrow'), cls: 'rpg-gen-eyebrow' });
		intro.createEl('h2', { text: getText(language, 'shopTitle'), cls: 'rpg-gen-title' });
		intro.createEl('p', { text: getText(language, 'shopSubtitle'), cls: 'rpg-gen-subtitle' });

		const controls = containerEl.createDiv({ cls: 'rpg-shop-controls' });
		const typeField = controls.createDiv({ cls: 'rpg-gen-selector-field' });
		typeField.createDiv({ text: getText(language, 'shopType'), cls: 'rpg-gen-selector-label' });
		const typeSelect = typeField.createEl('select', {
			cls: 'dropdown rpg-gen-selector-dropdown',
			attr: { 'aria-label': getText(language, 'shopType') }
		});
		typeSelect.createEl('option', {
			text: getText(language, 'randomShop'),
			value: 'random'
		});
		for (const type of SHOP_TYPES) {
			typeSelect.createEl('option', {
				text: getText(language, `shopType_${type}`),
				value: type
			});
		}
		typeSelect.value = selectedType;
		typeSelect.onchange = () => {
			selectedType = typeSelect.value;
			shop = generateCurrentShop();
			selectedItemName = null;
			sort = { key: 'normal', direction: 'asc' };
			render();
		};

		const card = containerEl.createDiv({ cls: 'rpg-bs-card rpg-gen-card rpg-shop-card' });
		const header = card.createDiv({ cls: 'rpg-gen-card-header' });
		header.createEl('h3', { text: shop.typeName, cls: 'rpg-gen-name' });

		const keeper = card.createDiv({ cls: 'rpg-shopkeeper' });
		keeper.createDiv({ text: getText(language, 'shopkeeper'), cls: 'rpg-gen-field-label' });
		const keeperHeading = keeper.createDiv({ cls: 'rpg-shopkeeper-heading' });
		const keeperIdentity = keeperHeading.createDiv({ cls: 'rpg-shopkeeper-identity' });
		keeperIdentity.createEl('strong', {
			text: shop.shopkeeper.name,
			cls: 'rpg-shopkeeper-name'
		});
		keeperIdentity.createSpan({
			text: `| ${shop.shopkeeper.species} | ${shop.shopkeeper.age} ${getText(language, 'yearsOld')}`,
			cls: 'rpg-shopkeeper-meta'
		});
		const rerollButton = keeperHeading.createEl('button', {
			cls: 'rpg-shop-reroll',
			attr: {
				type: 'button',
				'aria-label': getText(language, 'rerollShop'),
				title: getText(language, 'rerollShop')
			}
		});
		const rerollIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		rerollIcon.setAttribute('viewBox', '0 0 32 32');
		rerollIcon.setAttribute('aria-hidden', 'true');
		rerollIcon.setAttribute('focusable', 'false');
		const addSvgPath = (pathData, className) => {
			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', pathData);
			if (className) path.setAttribute('class', className);
			rerollIcon.appendChild(path);
		};
		addSvgPath('M8 5a12 12 0 0 1 18.5 6', 'rpg-shop-reroll-arrow');
		addSvgPath('M23 5l4 6-7 1', 'rpg-shop-reroll-arrowhead');
		addSvgPath('M24 27a12 12 0 0 1-18.5-6', 'rpg-shop-reroll-arrow');
		addSvgPath('M9 27l-4-6 7-1', 'rpg-shop-reroll-arrowhead');
		const dieFace = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		dieFace.setAttribute('x', '10');
		dieFace.setAttribute('y', '10');
		dieFace.setAttribute('width', '12');
		dieFace.setAttribute('height', '12');
		dieFace.setAttribute('rx', '2');
		dieFace.setAttribute('class', 'rpg-shop-reroll-die');
		rerollIcon.appendChild(dieFace);
		for (const [cx, cy] of [[13, 13], [19, 13], [16, 16], [13, 19], [19, 19]]) {
			const pip = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			pip.setAttribute('cx', String(cx));
			pip.setAttribute('cy', String(cy));
			pip.setAttribute('r', '1');
			pip.setAttribute('class', 'rpg-shop-reroll-pip');
			rerollIcon.appendChild(pip);
		}
		rerollButton.appendChild(rerollIcon);
		rerollButton.onclick = () => {
			shop = generateCurrentShop();
			selectedItemName = null;
			sort = { key: 'normal', direction: 'asc' };
			render();
		};
		const keeperDescription = keeper.createEl('ul', { cls: 'rpg-gen-description-list rpg-shopkeeper-description' });
		for (const point of shop.shopkeeper.description) {
			const separator = point.indexOf(':');
			const item = keeperDescription.createEl('li');
			if (separator < 0) {
				item.setText(point);
			} else {
				item.createEl('strong', { text: point.slice(0, separator + 1) });
				item.createSpan({ text: ` ${point.slice(separator + 1).trimStart()}` });
			}
		}

		const tableContainer = card.createDiv({ cls: 'rpg-shop-table-wrap' });
		const table = tableContainer.createEl('table', { cls: 'rpg-shop-table' });
		const head = table.createEl('thead').createEl('tr');
		const columns = [
			{ key: 'name', label: getText(language, 'shopItem'), numeric: false },
			{ key: 'quantity', label: getText(language, 'shopStock'), numeric: true },
			{ key: 'cheap', label: getText(language, 'shopCheap'), numeric: true },
			{ key: 'normal', label: getText(language, 'shopNormal'), numeric: true },
			{ key: 'expensive', label: getText(language, 'shopExpensive'), numeric: true }
		];
		for (const column of columns) {
			const th = head.createEl('th', { attr: { scope: 'col' } });
			const button = th.createEl('button', {
				text: `${column.label}${sort.key === column.key ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ''}`,
				cls: 'rpg-shop-sort-button',
				attr: { 'aria-label': `${getText(language, 'sortBy')} ${column.label}` }
			});
			button.onclick = () => {
				sort = {
					key: column.key,
					direction: sort.key === column.key && sort.direction === 'asc' ? 'desc' : 'asc'
				};
				render();
			};
			if (column.numeric) th.addClass('rpg-shop-number-cell');
		}

		const rows = [...shop.inventory].sort((a, b) => {
			const aValue = sort.key === 'name' ? a.name.toLocaleLowerCase() : sort.key === 'quantity' ? a.quantity : a.prices[sort.key];
			const bValue = sort.key === 'name' ? b.name.toLocaleLowerCase() : sort.key === 'quantity' ? b.quantity : b.prices[sort.key];
			const result = typeof aValue === 'string'
				? aValue.localeCompare(bValue)
				: aValue - bValue;
			return result * (sort.direction === 'asc' ? 1 : -1);
		});
		const body = table.createEl('tbody');
		for (const item of rows) {
			const row = body.createEl('tr', {
				cls: selectedItemName === item.name ? 'rpg-shop-row-selected' : '',
				attr: {
					tabindex: '0',
					'aria-selected': String(selectedItemName === item.name)
				}
			});
			row.createEl('th', { text: item.name, attr: { scope: 'row' } });
			row.createEl('td', { text: String(item.quantity), cls: 'rpg-shop-number-cell' });
			for (const priceKey of ['cheap', 'normal', 'expensive']) {
				row.createEl('td', {
					text: formatPrice(item.prices[priceKey]),
					cls: 'rpg-shop-number-cell'
				});
			}
			const toggleSelection = () => {
				selectedItemName = selectedItemName === item.name ? null : item.name;
				for (const tableRow of body.querySelectorAll('tr')) {
					const isSelected = tableRow === row && selectedItemName === item.name;
					tableRow.classList.toggle('rpg-shop-row-selected', isSelected);
					tableRow.setAttribute('aria-selected', String(isSelected));
				}
			};
			row.onclick = toggleSelection;
			row.onkeydown = (event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					toggleSelection();
				}
			};
		}

		containerEl.createEl('p', {
			text: getText(language, 'shopPriceNote'),
			cls: 'rpg-gen-settings-description'
		});
		containerEl.createEl('p', {
			text: getText(language, 'shopSrdAttribution'),
			cls: 'rpg-shop-attribution'
		});

	};

	shop = generateCurrentShop();
	render();
}

module.exports = { renderShopGenerator };
