// Content for the redesign preview. Read at build time from the same Sanity dataset the
// current site uses; team, publications and projects match the Wix CMS one to one.
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = createClient({projectId: '56vhiq14', dataset: 'production', apiVersion: '2025-02-19', useCdn: true})
const builder = imageUrlBuilder(client)

export type Img = {asset?: {_ref: string}; hotspot?: unknown; crop?: unknown; alt?: string}
export const img = (source: Img | undefined, w: number, h?: number) => {
  if (!source?.asset) return ''
  let b = builder.image(source).width(w).auto('format').quality(80)
  if (h) b = b.height(h).fit('crop')
  return b.url()
}

export const getHome = () =>
  client.fetch(`*[_id == "page-home"][0]{
    "hero": sections[_type == "sectionHero"][0]{heading, subheading, image, buttons[]{label, href}},
    "cards": sections[_type == "sectionCards"][0]{heading, intro, items[]{title, text, "href": link.href}},
    "goal": sections[_type == "sectionText"][0]{"paras": body[_type == "block"]{"text": pt::text(@)}.text, buttons[]{label, href}},
    "news": sections[_type == "sectionCollection"][0]{heading}
  }`)

export const getPosts = (n = 3) =>
  client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...$n]{title, "slug": slug.current, publishedAt, excerpt, coverImage}`, {n})

export const getProjects = () =>
  client.fetch(`*[_type == "project" && hidden != true && !(_id in path("drafts.**"))] | order(order asc){title, category, status, period, partners, description, tags, team, link, cover}`)

export const getCore = () =>
  client.fetch(`*[_type == "person" && group == "core"] | order(order asc){name, role, photo}`)

export const NAV = [
  {label: 'About', href: 'https://www.sbe-dexlab.com/about'},
  {label: 'Meet the Team', href: 'https://www.sbe-dexlab.com/meet-the-team'},
  {label: 'Our Work', href: 'https://www.sbe-dexlab.com/our-work'},
  {label: 'Projects', href: 'https://sbe-dexlab.pages.dev/projects/'},
  {label: 'Workshops', href: 'https://www.sbe-dexlab.com/workshops'},
  {label: 'Publications', href: 'https://www.sbe-dexlab.com/publications'},
  {label: 'Blog', href: 'https://www.sbe-dexlab.com/blog'},
  {label: 'Visit Us', href: 'https://www.sbe-dexlab.com/visit-us'},
  {label: 'Contact', href: 'https://www.sbe-dexlab.com/contact'},
]
export const live = (path: string) => (path.startsWith('http') ? path : `https://www.sbe-dexlab.com${path}`)
