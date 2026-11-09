const { createNpcGenerator } = require('./npc');
const { createWeatherGenerator } = require('./weather');
const { createShopGenerator } = require('./shop');

function createGenerators(plugin) {
	return [createNpcGenerator(plugin), createWeatherGenerator(plugin), createShopGenerator(plugin)];
}

module.exports = { createGenerators };
