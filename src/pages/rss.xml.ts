import rss from '@astrojs/rss'
import type {APIContext} from 'astro'
import {getPosts} from '../lib/queries'

export async function GET(context: APIContext) {
  const posts = await getPosts(50)
  return rss({
    title: 'DEXLab blog',
    description: 'News, interviews and experiments from the Digital Experience Lab at Maastricht University.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.title,
      pubDate: new Date(p.publishedAt),
      description: p.excerpt,
      link: `/post/${p.slug}`,
      categories: p.categories?.map((c) => c.title),
    })),
  })
}
