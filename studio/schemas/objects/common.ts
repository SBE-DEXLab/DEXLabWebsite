import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Button / link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'A path like /workshops, a full URL, or mailto:sbe-dexlab@maastrichtuniversity.nl',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'style',
      type: 'string',
      options: {list: ['primary', 'secondary'], layout: 'radio', direction: 'horizontal'},
      initialValue: 'primary',
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'href'}},
})

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Describe the image for screen readers and search engines.',
    }),
  ],
})

export const seo = defineType({
  name: 'seo',
  title: 'Search & sharing',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({name: 'title', type: 'string', description: 'Overrides the page title in Google and on social media.'}),
    defineField({name: 'description', type: 'text', rows: 3, validation: (r) => r.max(200)}),
    defineField({name: 'image', type: 'image', description: 'Image shown when the page is shared (1200 x 630).'}),
  ],
})

/** Small labelled item, used for workshop facts and stats. */
export const keyValue = defineType({
  name: 'keyValue',
  title: 'Item',
  type: 'object',
  fields: [
    defineField({name: 'value', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', type: 'string'}),
    defineField({name: 'text', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})
