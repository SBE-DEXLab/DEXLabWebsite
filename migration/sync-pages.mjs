// Writes content/sync.ndjson with the site settings, pages and team members from the seed,
// for pushing layout and copy changes into an existing Sanity dataset:
//   npm run seed && node migration/sync-pages.mjs
//   cd studio && npx sanity dataset import ../content/sync.ndjson production --replace
// --replace overwrites these documents, so check first that nobody edited them in the Studio.
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const keep = (id) => id === 'siteSettings' || id.startsWith('page-') || id.startsWith('person-')
const lines = fs
  .readFileSync(path.join(root, 'content/seed.ndjson'), 'utf8')
  .split('\n')
  .filter(Boolean)
  .filter((l) => keep(JSON.parse(l)._id))
  // Icons in public/ are not online yet when this runs, so import them from disk.
  .map((l) => l.replace(/"image@(\/[^"]+)"/g, (_, p) => JSON.stringify(`image@file://${path.join(root, 'public', p)}`)))
fs.writeFileSync(path.join(root, 'content/sync.ndjson'), lines.join('\n') + '\n')
console.log(`content/sync.ndjson: ${lines.length} documents`)
