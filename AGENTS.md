# Agent notes for this repo

Scope: whole repository.

## Project overview

- This is a single-page site for a Google DevFest workshop log, focused on the Chrome DevTools MCP Server and built to be hosted on GitHub Pages.
- The page lives at the root as `index.html` and is built with Vite + Tailwind CSS + DaisyUI, using **Bun** as the package manager/runtime.
- The visual style is: clean, minimal, light theme, with a Google / DevFest / Material Design flavor.

## Tooling

- Preferred package manager/runtime: `bun` (not `npm` / `pnpm` / `yarn`).
  - Install: `bun install`
  - Dev server: `bun run dev`
  - Build: `bun run build`
- Bundler: Vite@7.
  - Config: `vite.config.mjs` (note the `base` path is set for GitHub Pages).
- Styling:
  - Tailwind CSS + DaisyUI are wired via `src/main.css`, `tailwind.config.cjs`, and `postcss.config.cjs`.
  - The main layout and custom look & feel are still defined in `index.html` via handcrafted CSS. Keep that style consistent (light, minimal, card-based).

## GitHub Pages & CI

- Deploys are done via GitHub Actions, workflow file: `.github/workflows/deploy.yml`.
- Workflow expectations:
  - Uses `oven-sh/setup-bun@v2` with a pinned `bun-version` (currently `1.2.19`).
  - Runs `bun install` then `bun run build`, and deploys the `dist/` folder to GitHub Pages.
- When changing build tooling or Bun version, update the workflow and verify at least one successful CI run.

## DevTools MCP usage

- This repo is frequently inspected and iterated on using the **Chrome DevTools MCP Server**:
  - Use DevTools MCP to open the local dev server (`http://localhost:5173/`) or built file URLs when possible.
  - Prefer making layout tweaks iteratively with DevTools first, then sync them back into `index.html` (or Tailwind/DaisyUI classes) once the change feels right.
- Do **not** add credentials, secrets, or any sensitive tokens to this repo when configuring MCP-related examples or docs.

## Code & content style

- Keep copy primarily in Simplified Chinese, with occasional English where it helps (e.g., API names, config keys).
- Tone: personal workshop log, not an official Google page.
- Avoid drastically increasing text density; favor short paragraphs and bullet lists.
- When adding new sections, try to:
  - Reuse existing section patterns (header + subtitle + grid/cards).
  - Keep mobile layout in mind (single-column on small screens).

## Git hygiene

- Prefer small, focused changes.
- Do not introduce new package managers (stick with Bun) or alternative build systems unless explicitly requested.

