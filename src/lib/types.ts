// Shapes returned by the queries in queries.ts.
export interface Img {
  url?: string
  ref?: string
  alt?: string
  caption?: string
  crop?: {top: number; bottom: number; left: number; right: number}
  hotspot?: {x: number; y: number; width: number; height: number}
  dims?: {width: number; height: number}
}
export interface Link {
  label: string
  href: string
  style?: 'primary' | 'secondary'
}
export type RichText = Array<Record<string, any>>

export interface NavItem {
  _key: string
  label: string
  href: string
  children?: {_key: string; label: string; href: string}[]
}
export interface Settings {
  title: string
  description?: string
  ogImage?: Img
  announcement?: {enabled?: boolean; text?: string; link?: string}
  navigation?: NavItem[]
  email?: string
  address?: string
  socials?: {_key: string; platform: string; url: string}[]
  newsletter?: {enabled?: boolean; heading?: string; text?: string}
  footerNote?: string
}
export interface Seo {
  title?: string
  description?: string
  image?: Img
}
export interface Section {
  _type: string
  _key: string
  [key: string]: any
}
export interface Page {
  _id: string
  title: string
  slug: string
  seo?: Seo
  sections?: Section[]
}
export interface Category {
  title: string
  slug: string
  description?: string
  count?: number
}
export interface PostCard {
  _id: string
  title: string
  slug: string
  publishedAt: string
  excerpt?: string
  coverImage?: Img
  categories?: Category[]
}
export interface Post extends PostCard {
  body?: RichText
  authors?: {name: string; role?: string; photo?: Img}[]
  authorName?: string
  seo?: Seo
  related?: PostCard[]
}
export interface Person {
  _id: string
  name: string
  role?: string
  group: 'core' | 'intern' | 'associate' | 'alumni'
  bio?: string
  period?: string
  introPost?: string
  linkedin?: string
  website?: string
  email?: string
  photo?: Img
}
export interface Workshop {
  _id: string
  title: string
  slug: string
  summary?: string
  cardImage?: Img
  heroImage?: Img
  externalOnly?: boolean
  intro?: string
  gallery?: Img[]
  facts?: {_key: string; value: string; label?: string; text?: string}[]
  technologies?: {_key: string; short?: string; name?: string; image?: Img}[]
  outcomesHeading?: string
  outcomes?: string[]
  body?: RichText
  contactSubject?: string
  seo?: Seo
  others?: Workshop[]
}
export interface Publication {
  _id: string
  authors: string
  year: number
  title: string
  venue?: string
  kind?: string
  url?: string
}
export interface Equipment {
  _id: string
  name: string
  category: string
  quantity?: number
  description?: string
  image?: Img
}
export interface Faq {
  _id: string
  question: string
  answer?: RichText
}
