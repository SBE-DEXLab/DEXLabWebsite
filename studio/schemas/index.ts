import {richText} from './objects/richText'
import {link, imageWithAlt, seo, keyValue} from './objects/common'
import {sectionTypes} from './sections'
import {page, post, category, person, workshop, publication, equipment, faq} from './documents/content'
import {siteSettings} from './documents/siteSettings'

export const singletonTypes = new Set(['siteSettings'])

export const schemaTypes = [
  // documents
  siteSettings,
  page,
  post,
  category,
  person,
  workshop,
  publication,
  equipment,
  faq,
  // objects
  richText,
  link,
  imageWithAlt,
  seo,
  keyValue,
  ...sectionTypes,
]
