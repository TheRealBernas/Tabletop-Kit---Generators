const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const entryFile = path.join(root, 'main.js');
const entryContents = `const { Plugin } = require('obsidian');
const obsidianApiKey = Symbol.for('tabletop-kit-generators.obsidian-api');

module.exports = class TabletopKitGeneratorsLoader extends Plugin {
\tasync onload() {
\t\tconst pluginDirectory = this.manifest.dir || \`.obsidian/plugins/\${this.manifest.id}\`;
\t\tconst sourceEntry = this.app.vault.adapter.getFullPath(\`\${pluginDirectory}/src/main.js\`);
\t\tconst lastSeparator = Math.max(sourceEntry.lastIndexOf('/'), sourceEntry.lastIndexOf('\\\\'));
\t\tconst sourceDirectory = sourceEntry.slice(0, lastSeparator + 1);
\t\tif (require.cache) {
\t\t\tfor (const cachedModule of Object.keys(require.cache)) {
\t\t\t\tif (cachedModule.startsWith(sourceDirectory)) {
\t\t\t\t\tdelete require.cache[cachedModule];
\t\t\t\t}
\t\t\t}
\t\t}

\t\tglobalThis[obsidianApiKey] = require('obsidian');
\t\tlet SourcePlugin;
\t\ttry {
\t\t\tSourcePlugin = require(sourceEntry);
\t\t} finally {
\t\t\tdelete globalThis[obsidianApiKey];
\t\t}

\t\tObject.setPrototypeOf(this, SourcePlugin.prototype);
\t\tawait SourcePlugin.prototype.onload.call(this);
\t}
};
`;

if (process.argv.includes('--check')) {
	const currentEntry = fs.readFileSync(entryFile, 'utf8');
	if (currentEntry !== entryContents) {
		console.error('main.js must remain the small loader for the modular src/ tree.');
		process.exitCode = 1;
	}
} else {
	fs.writeFileSync(entryFile, entryContents);
}

function findJavaScriptFiles(directory) {
	return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const fullPath = path.join(directory, entry.name);
		return entry.isDirectory()
			? findJavaScriptFiles(fullPath)
			: entry.isFile() && entry.name.endsWith('.js') ? [fullPath] : [];
	});
}

const files = [entryFile, ...findJavaScriptFiles(path.join(root, 'src'))];
for (const file of files) {
	const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
	if (result.status !== 0) {
		process.stderr.write(result.stderr);
		process.exitCode = result.status || 1;
	}
}

if (!process.exitCode) {
	console.log(`Validated modular plugin entry and ${files.length - 1} source modules.`);
}
