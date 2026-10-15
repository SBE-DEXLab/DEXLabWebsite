/** Content for the redesign: always the live Sanity dataset (public reads, no token). */
import {createClient} from '@sanity/client'

export const projectId = '56vhiq14'
export const dataset = 'production'
const client = createClient({projectId, dataset, apiVersion: '2025-01-01', useCdn: false})
export const previewPages: string[] = []

export async function query<T>(groq: string, params: Record<string, unknown> = {}, _opts: {drafts?: boolean} = {}): Promise<T> {
  return client.fetch<T>(groq, params)
}
