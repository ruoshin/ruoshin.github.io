# ruoshin.github.io

Personal portfolio for Ruoshin Wang — Senior Front-end Engineer.

Live: https://ruoshin.github.io

## Stack

- [Astro 5](https://astro.build/) — content-first static site framework
- [React 19](https://react.dev/) — for future interactive islands
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling
- TypeScript (strict)
- Deployed to GitHub Pages via GitHub Actions

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the production build
```

## Editing content

Content lives as plain TypeScript modules so it's easy to edit without
touching components:

- [src/data/profile.ts](src/data/profile.ts) — name, title, bio, contact
- [src/data/experience.ts](src/data/experience.ts) — work history timeline
- [src/data/skills.ts](src/data/skills.ts) — skill groups and chips

## Project layout

```
src/
  components/   sections and shared UI
  data/         content sources
  layouts/      page shells
  pages/        Astro routes
  styles/       global styles & design tokens
public/         static assets served as-is
```

## Deployment

Pushes to `master` trigger
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds
the site and publishes it to GitHub Pages. Make sure **Settings → Pages →
Source** is set to **GitHub Actions** for the repo.
