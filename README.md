# DEXLab website

The website of the Digital Experience Lab (DEXLab), Maastricht University School of Business and Economics. It replaces the Wix site at www.sbe-dexlab.com.

- **Website:** [Astro](https://astro.build), a static site that is fast, secure and cheap to host.
- **Content editing:** [Sanity](https://www.sanity.io). Admins log in at **`/admin`** and edit everything there: pages, blog posts, team, workshops, publications, equipment, FAQ and site settings.
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com) (free). A small Cloudflare function (`functions/api/form.ts`) handles the contact and newsletter forms and stores submissions in a Cloudflare D1 database in the EU. The site moved here from Netlify in October 2026, after Netlify's free build allowance ran out.

Publishing: `npm run build:all && npx wrangler pages deploy --branch main` builds with the current Sanity content and puts it live. (The setup notes below describe the original Netlify setup and are kept for reference.)

Editors: read **[docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md)**. You never need to touch the code.

## Project structure

```
src/                  the website (Astro)
  pages/              routes: /, /[slug], /workshops/[slug], /blog, /post/[slug], /rss.xml
  components/         header, footer, cards, and one component per page section
  lib/                Sanity queries, image URLs, rich text rendering
studio/               Sanity Studio (the admin interface), served at /admin
  schemas/            the content model: what admins can edit
content/seed.ndjson   all content migrated from Wix (import file + local fallback)
migration/            scripts and raw export used to migrate from Wix
public/               logos, favicon, and _redirects (old Wix URLs → new URLs)
```

Every page is a list of **sections** (hero, text, cards, key figures, testimonials, videos, call to action, contact form, map, and "list from the database"). Admins build and rearrange pages from these blocks. Each section type has a schema in `studio/schemas/sections` and a component in `src/components/sections`.

## Running it locally

Requires Node 22.12 or newer.

```bash
npm install
npm run dev          # website on http://localhost:4321
npm run studio       # Sanity Studio on http://localhost:3333/admin (needs studio/.env)
npm run build:all    # production build: website + Studio in dist/
```

Without Sanity credentials, the site builds from `content/seed.ndjson`: the same GROQ queries run locally through `groq-js`. That means you can work on the design without a Sanity account, and the site can be previewed before the switch.

## One-time setup (about 30 minutes)

1. **Create the Sanity project.** Sign in at [sanity.io/manage](https://www.sanity.io/manage) with a UM or team account and create a project called "DEXLab" with a public `production` dataset. Note the project ID.
2. **Import the content.**
   ```bash
   cp studio/.env.example studio/.env   # fill in SANITY_STUDIO_PROJECT_ID
   cd studio
   npx sanity login
   npm run import                       # uploads all pages, posts, and images from Wix
   ```
   The import downloads every image (and the route video) from Wix into Sanity, so the new site no longer depends on Wix.
3. **Allow the website to use the Studio.** In sanity.io/manage → API → CORS origins, add `https://www.sbe-dexlab.com`, your Netlify URL (`https://<site>.netlify.app`) and `http://localhost:3333`, each **with credentials allowed**.
4. **Create the Netlify site** from this GitHub repository. Build settings come from `netlify.toml`. Add these environment variables:
   | Variable | Value |
   |---|---|
   | `PUBLIC_SANITY_PROJECT_ID` | your project ID |
   | `PUBLIC_SANITY_DATASET` | `production` |
   | `SANITY_STUDIO_PROJECT_ID` | your project ID |
   | `SANITY_STUDIO_DATASET` | `production` |
5. **Rebuild on publish.** In Netlify → Site configuration → Build hooks, create a hook called "Sanity publish". In sanity.io/manage → API → Webhooks, add a webhook that POSTs to that URL on create, update and delete.
6. **Forms.** In Netlify → Forms, enable form detection, then add an email notification for the `contact` form to `sbe-dexlab@maastrichtuniversity.nl`. Newsletter sign-ups land in the `newsletter` form and can be exported as CSV (or connected to Brevo or Mailchimp later).
7. **Invite admins.** In sanity.io/manage → Members, invite each admin by email. They log in at `https://www.sbe-dexlab.com/admin`.
8. **Switch the domain.** In Netlify → Domain management, add `www.sbe-dexlab.com` and `sbe-dexlab.com`, then change the DNS records where the domain is registered. Cancel Wix only after the new site is live.

## Moved URLs

Most URLs stay identical (`/about`, `/post/...`, `/blog/categories/...`). The ones that changed have 301 redirects in `public/_redirects`, for example `/genai-workshop` → `/workshops/dexplore-genai`.

## Working on the site with Claude

See [CLAUDE.md](CLAUDE.md). Typical requests: "add a section type for partner logos", "show the alumni on the team page", "add an events calendar". Claude opens a pull request; Netlify builds a preview link for it, and nothing goes live until the PR is merged.
