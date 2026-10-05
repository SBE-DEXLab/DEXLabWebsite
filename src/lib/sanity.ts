/**
 * Content loading. With PUBLIC_SANITY_PROJECT_ID set, content comes from Sanity
 * at build time. Without it, the same GROQ queries run against content/seed.ndjson,
 * so the site builds and previews before Sanity is set up.
 *
 * Draft preview: with SANITY_PREVIEW_TOKEN (a read token, never committed) the build also
 * shows unpublished drafts, but only where a query asks for them (projects, and the pages
 * listed in SANITY_PREVIEW_PAGES), so other half-finished drafts stay out of the preview.
 */
import fs from 'node:fs'
import path from 'node:path'
import {createClient} from '@sanity/client'
import {parse, evaluate} from 'groq-js'

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string | undefined
export const dataset = (import.meta.env.PUBLIC_SANITY_DATASET as string | undefined) || 'production'
export const usingSanity = Boolean(projectId)

const client = usingSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2025-01-01',
      useCdn: false, // builds should always see freshly published content
      token: import.meta.env.SANITY_API_READ_TOKEN, // only needed for a private dataset
    })
  : null

const previewToken = import.meta.env.SANITY_PREVIEW_TOKEN as string | undefined
export const previewing = Boolean(client && previewToken)
export const previewPages = previewing
  ? ((import.meta.env.SANITY_PREVIEW_PAGES as string | undefined) || '').split(',').map((s) => s.trim()).filter(Boolean)
  : []
const previewClient = previewing
  ? createClient({projectId, dataset, apiVersion: '2025-02-19', useCdn: false, token: previewToken, perspective: 'drafts'})
  : null

let localDataset: unknown[] | null = null

/** Loads the seed file and turns `_sanityAsset` placeholders into asset references. */
function loadLocal(): unknown[] {
  if (localDataset) return localDataset
  const file = path.join(process.cwd(), 'content', 'seed.ndjson')
  const docs: Record<string, unknown>[] = fs
    .readFileSync(file, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l))
  const assets = new Map<string, Record<string, unknown>>()
  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) return v.map(walk)
    if (v && typeof v === 'object') {
      const o = v as Record<string, unknown>
      const out: Record<string, unknown> = {}
      for (const [k, val] of Object.entries(o)) if (k !== '_sanityAsset') out[k] = walk(val)
      if (typeof o._sanityAsset === 'string') {
        const [kind, url] = (o._sanityAsset as string).split(/@(.+)/)
        const id = `${kind}-local-${assets.size}`
        assets.set(id, {_id: id, _type: kind === 'image' ? 'sanity.imageAsset' : 'sanity.fileAsset', url})
        out.asset = {_type: 'reference', _ref: id}
      }
      return out
    }
    return v
  }
  const resolved = docs.map((d) => walk(d) as Record<string, unknown>)
  localDataset = [...resolved, ...assets.values()]
  return localDataset
}

export async function query<T>(groq: string, params: Record<string, unknown> = {}, opts: {drafts?: boolean} = {}): Promise<T> {
  if (opts.drafts && previewClient) return previewClient.fetch<T>(groq, params)
  if (client) return client.fetch<T>(groq, params)
  const tree = parse(groq, {params})
  const value = await evaluate(tree, {dataset: loadLocal(), params})
  return (await value.get()) as T
}
