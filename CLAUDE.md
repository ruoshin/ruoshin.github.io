# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site for Ruoshin Wang (Senior Front-end Engineer), deployed at https://ruoshin.github.io as a GitHub user-page. Primary use case: showcasing experience for job interviews.

## Commands

```sh
npm run dev        # http://localhost:4321 with HMR
npm run build      # static build → ./dist
npm run preview    # serve the production build locally
npm run check      # Biome lint + format check (read-only)
npm run check:fix  # Biome lint + format auto-fix
npm run lint       # Biome lint only
npm run format     # Biome format-write only
```

There is no test suite yet. Tailwind/Astro/TS errors still surface during `dev` and `build`.

**Biome scope**: configured in [biome.json](biome.json) to cover `src/**/*.{ts,tsx,js,jsx,json}` and the root config files. **`.astro` files are not linted/formatted by Biome** — Biome can't parse the frontmatter. Run `npm run check` before committing TS changes; for `.astro` files, rely on type-checking via `build`.

## Stack & key architectural choices

- **Astro 5** with `output: "static"` (default). All pages are pre-rendered at build time — no SSR.
- **React 19** is installed via `@astrojs/react` for future interactive islands, but **no React component is currently mounted**. The `_astro/client.*.js` chunk produced at build is unreferenced by `index.html` and ships zero JS to the page.
- **Tailwind CSS 4** via `@tailwindcss/vite` (NOT the legacy `@astrojs/tailwind` integration). There is **no `tailwind.config.js`** — all customization is CSS-first in [src/styles/global.css](src/styles/global.css) using `@theme { ... }`.
- **TypeScript strict** (`astro/tsconfigs/strict`) with `@/*` path alias mapped to `./src/*`. All cross-directory imports inside `src/` use the alias — relative `../` paths inside `src/` are a smell.
- **Branch is `master`, not `main`** — both for git and the deploy workflow trigger.

## Content-as-data pattern

Page content lives in typed TS modules under [src/data/](src/data/), separate from layout/presentation:

- [src/data/profile.ts](src/data/profile.ts) — name, title, bio, contact links
- [src/data/experience.ts](src/data/experience.ts) — work history, surfaced via the bonsai popup (one panel per entry)
- [src/data/projects.ts](src/data/projects.ts) — project showcases; each project's `experienceId` links it to an entry in `experience.ts` so it renders inline inside that role's popup
- [src/data/skills.ts](src/data/skills.ts) — grouped skill chips
- [src/data/bonsai-mapping.ts](src/data/bonsai-mapping.ts) — orbit positions/colors for the plants, plus `bonsaiTreeExperienceId` (which experience the central tree represents)

When asked to "update content" or "add a job/skill", edit these files — do not touch the components. Components in [src/components/](src/components/) iterate over these arrays and should remain content-agnostic.

## i18n

Bilingual site (`zh-Hant` default at `/`, `en` at `/en/`) configured via Astro's built-in i18n in [astro.config.ts](astro.config.ts) with `prefixDefaultLocale: false`. The locale list is defined once in [src/lib/i18n.ts](src/lib/i18n.ts) and imported by `astro.config.ts` — to add a new locale, edit `LOCALES` / `DEFAULT_LOCALE` there and add a `Locale` key to every `Localized<T>` value.

- All translatable strings live in [src/lib/i18n.ts](src/lib/i18n.ts) (UI strings) and as `Localized` fields inside [src/data/](src/data/) modules. The `Localized<T> = Record<Locale, T>` type means every translatable value is an object with `'zh-Hant'` and `'en'` keys — both must be present for the build to type-check.
- Components read locale via `getLocale(Astro.currentLocale)` and look up strings as `value[locale]` or `ui.someKey[locale]`. **Never hard-code Chinese or English strings inside components** — add a key to `ui` in `src/lib/i18n.ts` instead.
- The locale toggle is a plain `<a>` to the other locale's URL, computed by `localePath()` / `otherLocale()`. No JS state.
- The two pages [src/pages/index.astro](src/pages/index.astro) and [src/pages/en/index.astro](src/pages/en/index.astro) are intentionally near-identical wrappers — they only exist so Astro generates two routes. Component-level locale awareness handles the rest.
- When adding a new translatable string: add it to `src/lib/i18n.ts` `ui` (UI text) or to a `Localized` field in `src/data/` (content). Update both `'zh-Hant'` and `'en'` together.

## Animations & View Transitions

[src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) mounts Astro's `<ClientRouter />`, so language switches use SPA-style view transitions instead of full reloads.

Two animation primitives, both pure-CSS, defined in [src/styles/global.css](src/styles/global.css):

- **`.hero-stagger`** — applied to a parent; first 4 children fade-up with staggered delay. Runs once on load (CSS animation, not transition).
- **`.reveal`** — opt-in scroll reveal. Element starts hidden, gets `[data-revealed]` set by the IntersectionObserver script in `BaseLayout.astro` when scrolled into view. The script binds to `astro:page-load`, so it re-runs after every view transition. **Do not run animation setup in a regular `<script>` without listening to `astro:page-load`** — it won't fire after navigations.

Both animation systems no-op cleanly under `prefers-reduced-motion: reduce` (handled in `global.css`).

## Theming

Light/dark theme uses **CSS custom properties**, not Tailwind's `theme.colors`:

- Tokens (`--color-bg`, `--color-fg`, `--color-muted`, `--color-subtle`, `--color-border`, `--color-accent`, `--color-accent-hover`) are defined on `:root` and overridden under `.dark` in [src/styles/global.css](src/styles/global.css).
- In components, **always reference tokens via bracket syntax**: `bg-[var(--color-bg)]`, `text-[var(--color-fg)]`. Do **not** use raw Tailwind palette classes like `bg-zinc-900` for themeable colors — they break dark mode.
- Dark mode is enabled by toggling `.dark` on `<html>`. The variant is wired up in `global.css` via `@custom-variant dark (&:where(.dark, .dark *))`.
- Theme is persisted in `localStorage["theme"]`. An inline `<script is:inline>` in [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) reads it before paint to prevent FOUC. **Don't move that script** — it must run before the body renders.

## Page composition

The site is a single long-scroll page composed in [src/pages/index.astro](src/pages/index.astro). Section components (Hero, About, Skills, Contact) all wrap [src/components/Section.astro](src/components/Section.astro) for consistent label/title/body layout — Hero is the exception (custom layout for the headline).

Experience and project details are **not** a section — they live in [src/components/ExperiencePopup.astro](src/components/ExperiencePopup.astro), a native `<dialog>` mounted inside the Hero. Clicking a bonsai plant or the central tree (both in [src/components/bonsai/BonsaiScene.astro](src/components/bonsai/BonsaiScene.astro)) dispatches an `experience:open` CustomEvent with `{ id }`; the popup listens and shows the matching panel. Any new button can trigger the popup by adding `data-open-experience="<experienceId>"` — the popup script binds those automatically. To wire a new plant or expose a different "main" role on the tree, edit [src/data/bonsai-mapping.ts](src/data/bonsai-mapping.ts).

## Deployment

`.github/workflows/deploy.yml` runs on push to `master` (and `workflow_dispatch`), uses `withastro/action@v3` with Node 22, and publishes to GitHub Pages. The repo's **Settings → Pages → Source must be set to "GitHub Actions"** for the deploy step to succeed.

Because this is a `username.github.io` user-page (not a project page), the site lives at the domain root and `base` is `/` — the default. Do not add a `base` to `astro.config.ts`.
