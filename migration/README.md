# Wix migration

How the content of the old Wix site ended up in `content/seed.ndjson`.

1. `scrape/scrape.mjs` and `scrape/posts.mjs` rendered every page and blog post of www.sbe-dexlab.com in a headless browser (Playwright) and extracted text, images and links. Blog posts were converted straight to Portable Text; the result is in `wix-export/posts/`.
2. Pages, team, workshops, equipment and FAQ were structured by hand in `content.mjs`. Copy is kept as on the old site, with typos fixed and Wix placeholder text removed.
3. Publications were parsed from the old list (`wix-export/publications.txt`) into authors, year, title and venue. DOIs were looked up on Crossref and only kept on an exact title match (`wix-export/publication-dois.json`).
4. `build-seed.mjs` combines everything into `content/seed.ndjson`.

Images reference the Wix originals as `_sanityAsset: "image@https://static.wixstatic.com/..."`. `sanity dataset import` downloads them into Sanity, so the new site stops depending on Wix once imported.

Wix stock photos (from the Wix media library, not uploaded by DEXLab) were deliberately not migrated, because their licence only covers use on Wix sites.

After the import into Sanity, Sanity is the source of truth; this folder is only kept for reference.
