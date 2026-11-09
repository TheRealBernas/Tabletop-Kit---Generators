const fs = require('node:fs/promises');
const path = require('node:path');
const esbuild = require('esbuild');

const root = path.resolve(__dirname, '..');
const releaseDirectory = path.join(root, 'release');

async function buildRelease() {
	await fs.mkdir(releaseDirectory, { recursive: true });

	await esbuild.build({
		entryPoints: [path.join(root, 'src', 'main.js')],
		bundle: true,
		platform: 'node',
		format: 'cjs',
		target: 'es2020',
		external: ['obsidian'],
		minify: true,
		legalComments: 'none',
		outfile: path.join(releaseDirectory, 'main.js')
	});

	await Promise.all(['manifest.json', 'styles.css'].map((file) =>
		fs.copyFile(path.join(root, file), path.join(releaseDirectory, file))
	));

	console.log(`Created self-contained Obsidian release files in ${releaseDirectory}`);
}

buildRelease().catch((error) => {
	console.error('Failed to build release files:', error);
	process.exitCode = 1;
});
