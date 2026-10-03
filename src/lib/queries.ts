import {query} from './sanity'
import type {Settings, Page, Post, PostCard, Category, Person, Workshop, Publication, Equipment, Faq} from './types'

// Shared projections. `image` resolves the asset URL so both Sanity and the local seed work.
const image = `{alt, caption, crop, hotspot, "url": asset->url, "ref": asset._ref, "dims": asset->metadata.dimensions}`
const richText = `[]{..., _type == "image" => ${image}, markDefs[]{...}}`
const link = `{label, href, style}`

const postCard = `{
  _id, title, "slug": slug.current, publishedAt, excerpt,
  "coverImage": coverImage${image},
  "categories": categories[]->{title, "slug": slug.current}
}`

const sections = `sections[]{
  ...,
  _type == "sectionHero" => {..., image${image}, buttons[]${link}},
  _type == "sectionText" => {..., image${image}, body${richText}, buttons[]${link}},
  _type == "sectionCards" => {..., items[]{..., image${image}, link${link}}},
  _type == "sectionGallery" => {..., images[]${image}},
  _type == "sectionCta" => {..., icon${image}, buttons[]${link}},
  _type == "sectionCollection" => {..., link${link}, "categorySlug": category->slug.current},
  _type == "sectionLocation" => {..., "videoUrl": video.asset->url, directions${richText}, directionsImage${image}}
}`

export const getSettings = () =>
  query<Settings>(`*[_id == "siteSettings"][0]{..., "ogImage": ogImage${image}}`)

export const getPage = (slug: string) =>
  query<Page | null>(`*[_type == "page" && slug.current == $slug][0]{_id, title, "slug": slug.current, seo{..., "image": image${image}}, ${sections}}`, {slug})

export const getPageSlugs = () =>
  query<string[]>(`*[_type == "page" && defined(slug.current) && slug.current != "home"].slug.current`)

export const getPosts = (limit = 1000, category?: string) =>
  query<PostCard[]>(
    `*[_type == "post" && defined(slug.current) && ($category == null || $category in categories[]->slug.current)]
      | order(publishedAt desc)[0...$limit]${postCard}`,
    {limit, category: category ?? null},
  )

export const getPost = (slug: string) =>
  query<Post | null>(
    `*[_type == "post" && slug.current == $slug][0]{
      ..., "slug": slug.current, "coverImage": coverImage${image}, body${richText},
      "categories": categories[]->{title, "slug": slug.current},
      "authors": authors[]->{name, role, "photo": photo${image}},
      seo{..., "image": image${image}},
      "related": *[_type == "post" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0]
        | order(publishedAt desc)[0...3]${postCard}
    }`,
    {slug},
  )

export const getCategories = () =>
  query<Category[]>(`*[_type == "category"] | order(order asc){title, "slug": slug.current, description, "count": count(*[_type == "post" && references(^._id)])}`)

export const getPeople = (groups: string[]) =>
  query<Person[]>(`*[_type == "person" && group in $groups] | order(order asc, name asc){_id, name, role, group, bio, linkedin, website, email, "photo": photo${image}}`, {groups})

export const getWorkshops = () =>
  query<Workshop[]>(`*[_type == "workshop"] | order(order asc){..., "slug": slug.current, "cardImage": cardImage${image}}`)

export const getWorkshop = (slug: string) =>
  query<Workshop | null>(
    `*[_type == "workshop" && slug.current == $slug][0]{
      ..., "slug": slug.current, "heroImage": heroImage${image}, "cardImage": cardImage${image},
      gallery[]${image}, technologies[]{..., image${image}}, body${richText}, seo{..., "image": image${image}},
      "others": *[_type == "workshop" && slug.current != $slug && externalOnly != true] | order(order asc){title, "slug": slug.current, summary, "cardImage": cardImage${image}}
    }`,
    {slug},
  )

export const getPublications = () =>
  query<Publication[]>(`*[_type == "publication"] | order(year desc, authors asc){_id, authors, year, title, venue, kind, url}`)

export const getEquipment = () =>
  query<Equipment[]>(`*[_type == "equipment"] | order(order asc){_id, name, category, quantity, description, "image": image${image}}`)

export const getFaqs = () => query<Faq[]>(`*[_type == "faq"] | order(order asc){_id, question, answer${richText}}`)
