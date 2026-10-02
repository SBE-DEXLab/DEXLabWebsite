// Builds content/seed.ndjson from the Wix export and hand-migrated content.
// The file is (1) imported into Sanity with `npm run import --workspace studio`
// and (2) used by the website as a local fallback when Sanity is not configured.
//
//   node migration/build-seed.mjs
import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {key, slug, ref, img} from './lib.mjs'
import * as content from './content.mjs'

const root = path.dirname(fileURLToPath(import.meta.url))
const out = path.join(root, '..', 'content', 'seed.ndjson')
const docs = []

docs.push(content.siteSettings, ...content.categories, ...content.people, ...content.equipment, ...content.faqs, ...content.workshops, ...content.pages)

// ------------------------------------------------------------ publications
const dois = JSON.parse(fs.readFileSync(path.join(root, 'wix-export', 'publication-dois.json'), 'utf8'))
const venueFixes = {
  'Robotic versus human coaches for active aging: An automated social presence perspective':
    'International Journal of Social Robotics, 12(4), 867-882.',
  'Value-by-Proxy: Engaging Stakeholders in AI Service Interactions': 'Journal of Product Innovation Management, 1-50.',
}
const seen = new Set()
for (const line of fs.readFileSync(path.join(root, 'wix-export', 'publications.txt'), 'utf8').split('\n')) {
  const m = /^(.*?)\s*\((\d{4})\)\.?\s*(.*)$/.exec(line.trim())
  if (!m) continue
  const [, authors, year, rest] = m
  // Split title and venue at the first full stop, ignoring abbreviations like "vs."
  const cut = rest.search(/(?<!\bvs|\be\.g|\bpp)\. /)
  const title = (cut === -1 ? rest.replace(/\.$/, '') : rest.slice(0, cut)).trim()
  let venue = cut === -1 ? '' : rest.slice(cut + 2).trim()
  venue = venueFixes[title] ?? venue
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
  if (seen.has(id)) continue
  seen.add(id)
  const v = venue.toLowerCase()
  const kind = /thesis|dissertation/.test(title.toLowerCase() + v)
    ? 'thesis'
    : /^in |handbook|research handbook/.test(v)
      ? 'chapter'
      : /conference|proceedings|anzmac/.test(v)
        ? 'conference'
        : /netspar/.test(v) || !venue
          ? 'other'
          : 'article'
  docs.push({
    _id: `publication-${id}`,
    _type: 'publication',
    authors: authors.trim(),
    year: Number(year),
    title,
    venue,
    kind,
    ...(dois[title] && {url: `https://doi.org/${dois[title]}`}),
  })
}

// ------------------------------------------------------------ blog posts
const postDir = path.join(root, 'wix-export', 'posts')
for (const f of fs.readdirSync(postDir).sort()) {
  const p = JSON.parse(fs.readFileSync(path.join(postDir, f), 'utf8'))
  // ASCII-only slugs (the old site had one with "ș"); public/_redirects keeps the old URL working.
  p.slug = decodeURIComponent(p.slug).normalize('NFD').replace(/[^\x00-\x7f]/g, '')
  const body = cleanBody(p.body)
  const cover = p.og?.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/)?.[1]
  const authorName = p.ld?.author?.name
  const authorRef = content.authorMap[authorName]
  docs.push({
    _id: `post-${p.slug}`.slice(0, 120),
    _type: 'post',
    title: p.title || p.ld.headline,
    slug: slug(p.slug),
    publishedAt: p.ld.datePublished,
    excerpt: p.ld.description?.replace(/\s+/g, ' ').slice(0, 300).replace(/\s\S*$/, '') + '...',
    ...(cover && {coverImage: img(cover, p.title)}),
    body,
    categories: p.cats.map((c) => ({...ref(`category-${c.split('/').pop()}`), _key: key()})),
    ...(authorRef ? {authors: [{...ref(authorRef), _key: key()}]} : {}),
    ...(!authorRef && authorName && !['augmented-research', 'sbe-dexlab'].includes(authorName) ? {authorName} : {}),
  })
}

/** Tidy Portable Text scraped from Wix. */
function cleanBody(blocks) {
  const out = []
  for (const b of blocks) {
    if (b._type === 'image') {
      out.push({...b, _type: 'image', caption: b.caption || undefined})
      continue
    }
    if (b._type !== 'block') {
      out.push(b)
      continue
    }
    const text = b.children.map((c) => c.text).join('')
    if (!text.trim()) continue
    // Short paragraphs that are entirely bold were used as headings on Wix.
    if (
      b.style === 'normal' &&
      !b.listItem &&
      text.length < 110 &&
      b.children.every((c) => c.marks.includes('strong') || !c.text.trim())
    ) {
      out.push({
        ...b,
        style: 'h3',
        children: b.children.map((c) => ({...c, marks: c.marks.filter((m) => m !== 'strong')})),
      })
      continue
    }
    out.push(b)
  }
  return out
}

fs.mkdirSync(path.dirname(out), {recursive: true})
fs.writeFileSync(out, docs.map((d) => JSON.stringify(d, (k, v) => (v === null ? undefined : v))).join('\n') + '\n')
const counts = docs.reduce((a, d) => ((a[d._type] = (a[d._type] || 0) + 1), a), {})
console.log(`Wrote ${docs.length} documents to ${path.relative(process.cwd(), out)}`, counts)
