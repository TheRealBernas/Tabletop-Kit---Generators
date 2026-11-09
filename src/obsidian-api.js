const obsidianApi = globalThis[Symbol.for('tabletop-kit-generators.obsidian-api')];

module.exports = obsidianApi || require('obsidian');
