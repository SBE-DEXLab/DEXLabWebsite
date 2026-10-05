import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {TagIcon} from '@sanity/icons/Tag'
import {UserIcon} from '@sanity/icons/User'
import {PresentationIcon} from '@sanity/icons/Presentation'
import {BookIcon} from '@sanity/icons/Book'
import {RocketIcon} from '@sanity/icons/Rocket'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {ProjectsIcon} from '@sanity/icons/Projects'
import {sectionsField} from '../sections'

const slugField = (source = 'title') =>
  defineField({
    name: 'slug',
    type: 'slug',
    description: 'The web address. Changing it breaks existing links to this page.',
    options: {source, maxLength: 96},
    validation: (r) => r.required(),
  })

const orderField = defineField({
  name: 'order',
  type: 'number',
  description: 'Lower numbers are shown first.',
  initialValue: 100,
})

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'Search & sharing'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required(), group: 'content'}),
    defineField({
      ...slugField(),
      group: 'content',
      description: 'The web address, e.g. "about" becomes /about. The home page must use "home".',
    }),
    defineField({...sectionsField, group: 'content'}),
    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare: ({title, slug}) => ({title, subtitle: slug === 'home' ? '/' : `/${slug}`}),
  },
})

export const category = defineType({
  name: 'category',
  title: 'Blog category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    slugField(),
    defineField({name: 'description', type: 'text', rows: 2}),
    orderField,
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
})

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'meta', title: 'Details'},
    {name: 'seo', title: 'Search & sharing'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required(), group: 'content'}),
    defineField({...slugField(), group: 'meta'}),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({name: 'coverImage', type: 'imageWithAlt', group: 'content'}),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for cards and Google. Leave empty to use the first paragraph.',
      group: 'content',
    }),
    defineField({name: 'body', type: 'richText', group: 'content'}),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'category'}]})],
      group: 'meta',
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'person'}]})],
      group: 'meta',
    }),
    defineField({
      name: 'authorName',
      type: 'string',
      title: 'Author (free text)',
      description: 'Use when the author is not in the team list.',
      group: 'meta',
    }),
    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  orderings: [{title: 'Newest first', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]}],
  preview: {
    select: {title: 'title', date: 'publishedAt', media: 'coverImage'},
    prepare: ({title, date, media}) => ({title, subtitle: date ? new Date(date).toLocaleDateString('en-GB') : 'No date', media}),
  },
})

export const person = defineType({
  name: 'person',
  title: 'Team member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', type: 'string', description: 'e.g. DEXLab Director, PhD Candidate'}),
    defineField({
      name: 'group',
      type: 'string',
      options: {
        list: [
          {title: 'Core team', value: 'core'},
          {title: 'Intern', value: 'intern'},
          {title: 'Affiliated Researcher', value: 'associate'},
          {title: 'Alumni (former interns and managers)', value: 'alumni'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'period',
      type: 'string',
      description: 'For alumni: the academic year they started, e.g. 2023/24. The list is grouped by it, newest first.',
      hidden: ({document}) => document?.group !== 'alumni',
    }),
    defineField({
      name: 'introPost',
      title: 'Introduction blog post',
      type: 'reference',
      to: [{type: 'post'}],
      description: 'For alumni: the "Meet our new ..." post their name links to',
      hidden: ({document}) => document?.group !== 'alumni',
    }),
    defineField({name: 'photo', type: 'imageWithAlt', description: 'Portrait photo, ideally 3:4.'}),
    defineField({name: 'bio', type: 'text', rows: 4, description: 'Shown when hovering over the portrait on the team page'}),
    defineField({name: 'linkedin', type: 'url', title: 'LinkedIn URL'}),
    defineField({name: 'website', type: 'url', title: 'Website or UM profile URL'}),
    defineField({name: 'email', type: 'string'}),
    orderField,
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  icon: PresentationIcon,
  groups: [
    {name: 'card', title: 'Overview card', default: true},
    {name: 'page', title: 'Workshop page'},
    {name: 'seo', title: 'Search & sharing'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required(), group: 'card'}),
    defineField({...slugField(), group: 'card'}),
    defineField({name: 'summary', type: 'text', rows: 3, description: 'Shown on the workshop overview card.', group: 'card'}),
    defineField({name: 'cardImage', type: 'imageWithAlt', group: 'card'}),
    defineField({
      name: 'externalOnly',
      type: 'boolean',
      title: 'Card only (no page)',
      description: 'For example "Custom workshop": the card links straight to email.',
      initialValue: false,
      group: 'card',
    }),
    orderField,
    defineField({name: 'heroImage', type: 'imageWithAlt', group: 'page'}),
    defineField({name: 'intro', type: 'text', rows: 4, group: 'page'}),
    defineField({name: 'gallery', type: 'array', of: [{type: 'imageWithAlt'}], options: {layout: 'grid'}, group: 'page'}),
    defineField({
      name: 'facts',
      title: 'Highlights',
      type: 'array',
      of: [{type: 'keyValue'}],
      description: 'e.g. "3 hours", "Up to 35 people", with an optional explanation.',
      group: 'page',
    }),
    defineField({
      name: 'technologies',
      type: 'array',
      group: 'page',
      of: [
        defineArrayMember({
          name: 'technology',
          type: 'object',
          fields: [
            defineField({name: 'short', type: 'string', title: 'Abbreviation', description: 'e.g. VR'}),
            defineField({name: 'name', type: 'string', description: 'e.g. Virtual Reality'}),
            defineField({name: 'image', type: 'imageWithAlt'}),
          ],
          preview: {select: {title: 'name', subtitle: 'short', media: 'image'}},
        }),
      ],
    }),
    defineField({name: 'outcomesHeading', type: 'string', initialValue: 'What does the workshop hold for you?', group: 'page'}),
    defineField({name: 'outcomes', type: 'array', of: [{type: 'string'}], description: 'Bullet list', group: 'page'}),
    defineField({name: 'body', type: 'richText', group: 'page'}),
    defineField({
      name: 'contactSubject',
      type: 'string',
      description: 'Subject line used for the "Contact us" button.',
      group: 'page',
    }),
    defineField({name: 'seo', type: 'seo', group: 'seo'}),
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'cardImage'}},
})

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({name: 'authors', type: 'string', description: 'As in the citation, e.g. "Heller, J., Hilken, T., & Mahr, D."', validation: (r) => r.required()}),
    defineField({name: 'year', type: 'number', validation: (r) => r.required().min(1990).max(2100)}),
    defineField({name: 'title', type: 'text', rows: 2, validation: (r) => r.required()}),
    defineField({name: 'venue', type: 'string', title: 'Journal / book / venue', description: 'Including volume and pages.'}),
    defineField({
      name: 'kind',
      type: 'string',
      options: {
        list: [
          {title: 'Journal article', value: 'article'},
          {title: 'Book chapter', value: 'chapter'},
          {title: 'Conference paper', value: 'conference'},
          {title: 'Thesis', value: 'thesis'},
          {title: 'Report / other', value: 'other'},
        ],
      },
      initialValue: 'article',
    }),
    defineField({name: 'url', type: 'url', title: 'Link (DOI or publisher page)'}),
  ],
  orderings: [{title: 'Newest first', name: 'yearDesc', by: [{field: 'year', direction: 'desc'}, {field: 'authors', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', authors: 'authors', year: 'year'},
    prepare: ({title, authors, year}) => ({title, subtitle: `${year} · ${authors}`}),
  },
})

export const equipment = defineType({
  name: 'equipment',
  title: 'Equipment',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({name: 'name', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Immersive technology', value: 'immersive'},
          {title: 'Robotics', value: 'robotics'},
          {title: 'Mobile & computing', value: 'mobile'},
          {title: 'Biometrics', value: 'biometric'},
          {title: 'Other', value: 'other'},
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'quantity', type: 'number'}),
    defineField({name: 'image', type: 'imageWithAlt'}),
    defineField({name: 'description', type: 'text', rows: 3}),
    orderField,
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', quantity: 'quantity', category: 'category', media: 'image'},
    prepare: ({title, quantity, category, media}) => ({title, subtitle: `${category}${quantity ? ` · x${quantity}` : ''}`, media}),
  },
})

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'question', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'answer', type: 'richText'}),
    orderField,
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'question'}},
})

const projectCategories = [
  {title: 'Research', value: 'research'},
  {title: 'PhD project', value: 'phd'},
  {title: 'Education', value: 'education'},
  {title: 'Network', value: 'network'},
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      type: 'string',
      options: {list: projectCategories, layout: 'radio', direction: 'horizontal'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Current', value: 'current'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'current',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'period',
      type: 'string',
      description: 'Shown after the status, e.g. "2025-2028" or "since 2024". Leave empty when unsure.',
    }),
    defineField({name: 'partners', type: 'string', description: 'Partner line on the card. Leave empty when there are none.'}),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      description: '2 to 3 sentences, ideally opening with the question or problem.',
    }),
    defineField({name: 'tags', type: 'array', of: [{type: 'string'}], options: {layout: 'tags'}, description: '2 to 4 short topics.'}),
    defineField({name: 'team', type: 'array', of: [{type: 'string'}], description: 'Names, in the order they should appear.'}),
    defineField({name: 'link', type: 'url', title: 'Learn more link', description: 'The project page. Without a link the card has no button.'}),
    defineField({name: 'cover', type: 'imageWithAlt', description: 'Landscape photo. No identifiable experiment participants.'}),
    defineField({
      name: 'coverColor',
      type: 'string',
      title: 'Colour block (without a photo)',
      options: {
        list: [
          {title: 'Deep Blue', value: 'navy'},
          {title: 'Dark Azure', value: 'azure'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'navy',
      hidden: ({document}) => Boolean((document?.cover as {asset?: unknown} | undefined)?.asset),
    }),
    defineField({
      name: 'hidden',
      type: 'boolean',
      title: 'Hide from the website',
      description: 'For projects whose details are not confirmed yet.',
      initialValue: false,
    }),
    defineField({
      name: 'notes',
      type: 'text',
      rows: 3,
      title: 'Internal notes',
      description: 'For editors only, never shown on the website. E.g. what still needs checking.',
    }),
    orderField,
  ],
  orderings: [{title: 'Order', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'title', category: 'category', status: 'status', hidden: 'hidden', media: 'cover'},
    prepare: ({title, category, status, hidden, media}) => ({
      title,
      subtitle: [projectCategories.find((c) => c.value === category)?.title, status, hidden && 'hidden'].filter(Boolean).join(' · '),
      media,
    }),
  },
})
