# Tabletop Kit - Generators

Tabletop Kit - Generators is an Obsidian plugin for creating useful tabletop
RPG material without leaving your vault. Generate NPCs, weather conditions, and
shop inventories on demand, right from the plugin's sidebar view.

## Features

- **NPC Generator:** Create a character with a name, species, age, gender, job,
  personality, mannerisms, voice, and appearance details. Configure which
  species and genders can appear, and copy a generated NPC into your notes.
- **Weather Generator:** Generate a weather condition with temperature,
  precipitation, wind, visibility, and travel information. Choose temperature
  units and enabled weather types, optionally refresh results automatically,
  and copy the result into your notes.
- **Shop Generator:** Generate a shop with a randomly created shopkeeper and
  inventory. Choose a shop type and inventory size; items include stock and
  cheap, normal, and expensive prices.
- **English and Portuguese:** Use either language and select a language for
  individual generators.
- **Works offline:** Generation runs locally and makes no network requests.

Open the generators from the sidebar or use the plugin's commands. The NPC,
weather, and shop settings can be adjusted from Obsidian's plugin settings.

## Collaboration

This project is authored, directed, and maintained by Bernardo Oliveira.
It was developed with assistance from an AI assistant using Copilot SDK in
VS Code. Bernardo led the work, set the product direction, and validated the
decisions and changes. The AI assistant contributed implementation, review,
and documentation support under Bernardo's direction. The assistant is
acknowledged as a contributing tool, not as a copyright holder.

The plugin source is split by responsibility under `src/`. The root `main.js`
is a development loader for the modular source tree. Release builds bundle the
modules into a standalone `main.js`, so installed users do not need a `src/`
folder.

## Source layout

- `src/main.js` registers the plugin and its Obsidian entry points.
- `src/views/GeneratorView.js` hosts the generator dropdown and selected tool.
- `src/generators/index.js` registers available generators.
- `src/generators/npc/` contains the NPC generator, data, view, and settings.
- `src/generators/weather/` contains the Weather generator, data, view, and settings.
- `src/generators/shop/` contains the Shop generator, data, view, and settings.
- `src/settings/` contains the shared plugin settings tab.

Add a generator in its own folder and register it in `src/generators/index.js`.
It will then appear in the sidebar's generator dropdown.

## Build and tests

Run `npm install` once. Use `npm run build` to validate the development loader,
and `npm run build:release` to create the self-contained files in `release/`.
Attach `release/main.js`, `release/manifest.json`, and `release/styles.css` to
GitHub releases. The `src/` tree stays modular in the repository and is bundled
only for distribution. `npm test` builds the release output and runs the tests;
`npm run check` validates JavaScript syntax and the development loader.

NPC settings let you choose the races and genders used by random generation.
The Shop settings configure the default shop type and inventory size. Weather
settings configure temperature units, automatic refresh, and enabled weather
types.

## License

The MIT license in [`LICENSE`](./LICENSE) applies to the project's original
material and identifies Bernardo Oliveira as its copyright claimant. It does
not cover SRD-derived material, which remains under CC BY 4.0; see
[`THIRD-PARTY-NOTICES.md`](./THIRD-PARTY-NOTICES.md).
