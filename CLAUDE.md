# CLAUDE.md

Guidance for Claude (and humans) working on the DEXLab website.

## What this is

Astro static site (`src/`) + Sanity Studio (`studio/`, served at `/admin`) + Netlify hosting. Content lives in Sanity; the site fetches it at build time. Without `PUBLIC_SANITY_PROJECT_ID`, `src/lib/sanity.ts` runs the same GROQ queries against `content/seed.ndjson` with `groq-js`. Keep both paths working.

## Commands

```bash
npm run dev            # site at localhost:4321 (seed data unless .env is set)
npm run build          # site only
npm run build:all      # site + Studio into dist/ (what Netlify runs)
npx astro check        # type check, must report 0 errors
cd studio && npx sanity schema validate
npm run seed                    # regenerate content/seed.ndjson from migration/
```

Before opening a PR: `npx astro check`, `npm run build:all` and schema validation all pass.

## How content flows

1. Schema in `studio/schemas/` defines what editors can enter.
2. Query in `src/lib/queries.ts` fetches it (images go through the `image` projection so both Sanity and seed URLs work).
3. Types in `src/lib/types.ts`.
4. Component renders it.

### Adding a page section type

1. Add `defineType` in `studio/schemas/sections/index.ts` and include it in `sectionTypes`.
2. Add any image or link projections for it in the `sections` projection in `src/lib/queries.ts`.
3. Create `src/components/sections/YourSection.astro` and register it in `src/components/Sections.astro`.
4. Mention it in the sections table in `docs/ADMIN-GUIDE.md`.

### Adding a document type (e.g. events)

Schema in `studio/schemas/documents/`, register in `studio/schemas/index.ts`, add to `studio/structure.ts`, query in `queries.ts`, and either a route in `src/pages/` or a new `source` option in `sectionCollection` with a component in `src/components/collections/`.

## Conventions

- Design tokens are CSS custom properties in `src/styles/global.css` (navy `#071c3d`, DEX blue `#00a2db`, Lab orange `#e84e10`, peach `#fce8e0`). Use them; do not hardcode new colours.
- Headings pass through `brandify()` so "DEXLab" gets brand colours.
- Section backgrounds use the shared `tone` field (`default`, `muted`, `peach`, `blue`, `navy`).
- Images: use `<Img>` (`src/components/Img.astro`), always with width (and height when cropping).
- Rich text: `renderRichText()` in `src/lib/portableText.ts`.
- No tracking, no third-party cookies: YouTube via youtube-nocookie.com, maps via OpenStreetMap, fonts self-hosted via Fontsource.
- Forms are Netlify Forms (`data-netlify="true"`, honeypot field `company`, consent checkbox).
- Moved URLs get a 301 in `public/_redirects`.
- Content changes belong in Sanity, not in code. Only edit `migration/` to re-run the Wix migration.
