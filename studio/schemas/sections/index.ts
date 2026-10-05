import {defineArrayMember, defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {ImageIcon} from '@sanity/icons/Image'
import {ThLargeIcon} from '@sanity/icons/ThLarge'
import {BarChartIcon} from '@sanity/icons/BarChart'
import {TagsIcon} from '@sanity/icons/Tags'
import {CommentIcon} from '@sanity/icons/Comment'
import {ImagesIcon} from '@sanity/icons/Images'
import {PlayIcon} from '@sanity/icons/Play'
import {BulbOutlineIcon} from '@sanity/icons/BulbOutline'
import {DatabaseIcon} from '@sanity/icons/Database'
import {EnvelopeIcon} from '@sanity/icons/Envelope'
import {PinIcon} from '@sanity/icons/Pin'

/**
 * Page builder sections. Every page is a list of these blocks, so admins can
 * rearrange, add or remove parts of a page without touching code.
 * Each type here has a matching component in src/components/sections.
 */

const heading = defineField({
  name: 'heading',
  type: 'string',
  description: 'The word "DEXLab" is automatically shown in the brand colours.',
})
const intro = defineField({name: 'intro', type: 'text', rows: 3})
const anchor = defineField({
  name: 'anchor',
  type: 'string',
  description: 'Optional id so you can link straight to this section, e.g. /about#services',
  validation: (r) => r.regex(/^[a-z0-9-]+$/, {name: 'lowercase letters, numbers and dashes'}),
})
const tone = defineField({
  name: 'tone',
  type: 'string',
  title: 'Background',
  options: {
    list: [
      {title: 'White', value: 'default'},
      {title: 'Light grey', value: 'muted'},
      {title: 'Peach', value: 'peach'},
      {title: 'DEX blue', value: 'blue'},
      {title: 'Navy', value: 'navy'},
    ],
  },
  initialValue: 'default',
})

export const sectionHero = defineType({
  name: 'sectionHero',
  title: 'Hero / page header',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({...heading, validation: (r) => r.required()}),
    defineField({name: 'eyebrow', type: 'string', description: 'Small label above the heading'}),
    defineField({name: 'subheading', type: 'text', rows: 4}),
    defineField({name: 'image', type: 'imageWithAlt', description: 'Wide photo shown behind or above the header'}),
    defineField({
      name: 'layout',
      type: 'string',
      options: {
        list: [
          {title: 'Text centred, wide photo below (landing page, group photos)', value: 'stacked'},
          {title: 'Text left, photo right', value: 'split'},
          {title: 'Photo with text overlay', value: 'overlay'},
          {title: 'Photo banner, text below', value: 'banner'},
          {title: 'Text only', value: 'plain'},
        ],
      },
      initialValue: 'banner',
    }),
    defineField({name: 'buttons', type: 'array', of: [{type: 'link'}]}),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare: ({title, media}) => ({title, subtitle: 'Hero', media}),
  },
})

export const sectionText = defineType({
  name: 'sectionText',
  title: 'Text (with optional image)',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    anchor,
    heading,
    defineField({name: 'body', type: 'richText'}),
    defineField({name: 'image', type: 'imageWithAlt'}),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: {list: ['right', 'left'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'right',
      hidden: ({parent}) => !parent?.image,
    }),
    defineField({name: 'video', type: 'url', title: 'Video (YouTube URL)', description: 'Shown instead of the image.'}),
    defineField({name: 'buttons', type: 'array', of: [{type: 'link'}]}),
    tone,
    defineField({name: 'centered', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {title: 'heading', media: 'image'},
    prepare: ({title, media}) => ({title: title || 'Text', subtitle: 'Text', media}),
  },
})

export const sectionCards = defineType({
  name: 'sectionCards',
  title: 'Cards / features grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    anchor,
    heading,
    intro,
    defineField({
      name: 'style',
      type: 'string',
      options: {
        list: [
          {title: 'Icon cards', value: 'icon'},
          {title: 'Photo cards', value: 'photo'},
          {title: 'Icon rows (icon left, text right)', value: 'steps'},
          {title: 'Text panel with photo, one per row', value: 'rows'},
          {title: 'Small icon tiles (e.g. sectors)', value: 'tiles'},
        ],
      },
      initialValue: 'icon',
    }),
    defineField({name: 'columns', type: 'number', options: {list: [2, 3, 4, 6]}, initialValue: 3}),
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'card',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'text', type: 'text', rows: 4}),
            defineField({name: 'image', type: 'imageWithAlt', description: 'Icon or photo'}),
            defineField({name: 'link', type: 'link'}),
          ],
          preview: {select: {title: 'title', subtitle: 'text', media: 'image'}},
        }),
      ],
    }),
    tone,
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare: ({title, items}) => ({title: title || 'Cards', subtitle: `Cards (${items?.length || 0})`}),
  },
})

export const sectionStats = defineType({
  name: 'sectionStats',
  title: 'Key figures',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    heading,
    defineField({name: 'caption', type: 'string', description: 'e.g. "Years 2022 - 2025"'}),
    defineField({name: 'items', type: 'array', of: [{type: 'keyValue'}]}),
    tone,
  ],
  preview: {select: {title: 'heading', subtitle: 'caption'}, prepare: (s) => ({title: s.title || 'Key figures', subtitle: s.subtitle})},
})

export const sectionPills = defineType({
  name: 'sectionPills',
  title: 'Tag list',
  type: 'object',
  icon: TagsIcon,
  fields: [heading, intro, defineField({name: 'items', type: 'array', of: [{type: 'string'}]}), tone],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Tag list', subtitle: 'Tag list'})},
})

export const sectionQuotes = defineType({
  name: 'sectionQuotes',
  title: 'Testimonials',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'quote',
          type: 'object',
          fields: [
            defineField({name: 'quote', type: 'text', rows: 4, validation: (r) => r.required()}),
            defineField({name: 'source', type: 'string'}),
          ],
          preview: {select: {title: 'quote', subtitle: 'source'}},
        }),
      ],
    }),
  ],
  preview: {select: {items: 'items'}, prepare: ({items}) => ({title: 'Testimonials', subtitle: `${items?.length || 0} quotes`})},
})

export const sectionGallery = defineType({
  name: 'sectionGallery',
  title: 'Photo strip',
  type: 'object',
  icon: ImagesIcon,
  fields: [heading, defineField({name: 'images', type: 'array', of: [{type: 'imageWithAlt'}], options: {layout: 'grid'}})],
  preview: {select: {title: 'heading', media: 'images.0'}, prepare: ({title, media}) => ({title: title || 'Photo strip', media})},
})

export const sectionVideos = defineType({
  name: 'sectionVideos',
  title: 'Videos',
  type: 'object',
  icon: PlayIcon,
  fields: [
    anchor,
    heading,
    intro,
    defineField({
      name: 'items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'video',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'url', type: 'url', title: 'YouTube URL', validation: (r) => r.required()}),
          ],
        }),
      ],
    }),
    tone,
  ],
  preview: {select: {title: 'heading', items: 'items'}, prepare: ({title, items}) => ({title: title || 'Videos', subtitle: `${items?.length || 0} videos`})},
})

export const sectionCta = defineType({
  name: 'sectionCta',
  title: 'Call to action',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({name: 'icon', type: 'imageWithAlt', description: 'Optional small icon above the heading'}),
    heading,
    intro,
    defineField({name: 'buttons', type: 'array', of: [{type: 'link'}]}),
    tone,
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Call to action', subtitle: 'Call to action'})},
})

export const sectionCollection = defineType({
  name: 'sectionCollection',
  title: 'List from the database',
  description: 'Shows team members, blog posts, workshops, projects, publications, equipment or FAQs.',
  type: 'object',
  icon: DatabaseIcon,
  fields: [
    anchor,
    heading,
    intro,
    defineField({
      name: 'source',
      type: 'string',
      options: {
        list: [
          {title: 'Latest blog posts', value: 'posts'},
          {title: 'Team members', value: 'team'},
          {title: 'Workshops', value: 'workshops'},
          {title: 'Publications', value: 'publications'},
          {title: 'Projects', value: 'projects'},
          {title: 'Equipment', value: 'equipment'},
          {title: 'FAQ', value: 'faq'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'limit',
      type: 'number',
      description: 'Maximum number of items. Leave empty to show all.',
      hidden: ({parent}) => !['posts', 'workshops', 'faq'].includes(parent?.source),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Only show posts from this category.',
      hidden: ({parent}) => parent?.source !== 'posts',
    }),
    defineField({
      name: 'groups',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Core team', value: 'core'},
          {title: 'Interns', value: 'intern'},
          {title: 'Associates', value: 'associate'},
          {title: 'Alumni', value: 'alumni'},
        ],
      },
      description: 'Which groups to show, in this order.',
      hidden: ({parent}) => parent?.source !== 'team',
    }),
    defineField({name: 'link', type: 'link', description: 'Optional "see all" link under the list.'}),
    tone,
  ],
  preview: {
    select: {title: 'heading', source: 'source'},
    prepare: ({title, source}) => ({title: title || 'List', subtitle: `List: ${source}`}),
  },
})

export const sectionContact = defineType({
  name: 'sectionContact',
  title: 'Contact form',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    heading,
    intro,
    defineField({
      name: 'showDepartment',
      type: 'boolean',
      title: 'Ask for SBE department and position',
      initialValue: true,
    }),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Contact form', subtitle: 'Contact form'})},
})

export const sectionLocation = defineType({
  name: 'sectionLocation',
  title: 'Location & directions',
  type: 'object',
  icon: PinIcon,
  fields: [
    heading,
    intro,
    defineField({name: 'video', type: 'file', title: 'Route video', options: {accept: 'video/*'}}),
    defineField({name: 'directions', type: 'richText'}),
    defineField({name: 'directionsImage', type: 'imageWithAlt', title: 'Campus map'}),
    defineField({
      name: 'mapQuery',
      type: 'string',
      title: 'Map location',
      description: 'Address shown on the map',
      initialValue: 'Tapijnkazerne 11, 6211 ME Maastricht',
    }),
  ],
  preview: {select: {title: 'heading'}, prepare: ({title}) => ({title: title || 'Location', subtitle: 'Location & directions'})},
})

export const sectionTypes = [
  sectionHero,
  sectionText,
  sectionCards,
  sectionStats,
  sectionPills,
  sectionQuotes,
  sectionGallery,
  sectionVideos,
  sectionCta,
  sectionCollection,
  sectionContact,
  sectionLocation,
]

export const sectionsField = defineField({
  name: 'sections',
  title: 'Page sections',
  type: 'array',
  of: sectionTypes.map((t) => ({type: t.name})),
  options: {
    insertMenu: {
      views: [{name: 'list'}],
    },
  },
})
