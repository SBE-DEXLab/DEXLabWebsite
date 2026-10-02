import {defineArrayMember, defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'navigation', title: 'Menu'},
    {name: 'footer', title: 'Footer & contact'},
  ],
  fields: [
    defineField({name: 'title', type: 'string', initialValue: 'DEXLab', group: 'general'}),
    defineField({name: 'description', type: 'text', rows: 3, description: 'Default description for Google and social media.', group: 'general'}),
    defineField({name: 'ogImage', type: 'image', title: 'Default sharing image', group: 'general'}),
    defineField({
      name: 'announcement',
      type: 'object',
      title: 'Announcement bar',
      description: 'A short message shown at the top of every page, e.g. an upcoming event.',
      group: 'general',
      fields: [
        defineField({name: 'enabled', type: 'boolean', initialValue: false}),
        defineField({name: 'text', type: 'string'}),
        defineField({name: 'link', type: 'string', description: 'Optional path or URL'}),
      ],
    }),
    defineField({
      name: 'navigation',
      type: 'array',
      title: 'Main menu',
      group: 'navigation',
      of: [
        defineArrayMember({
          name: 'navItem',
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'href', type: 'string', validation: (r) => r.required()}),
            defineField({
              name: 'children',
              title: 'Submenu',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'navChild',
                  type: 'object',
                  fields: [
                    defineField({name: 'label', type: 'string', validation: (r) => r.required()}),
                    defineField({name: 'href', type: 'string', validation: (r) => r.required()}),
                  ],
                  preview: {select: {title: 'label', subtitle: 'href'}},
                }),
              ],
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
    }),
    defineField({name: 'email', type: 'string', initialValue: 'sbe-dexlab@maastrichtuniversity.nl', group: 'footer'}),
    defineField({name: 'address', type: 'text', rows: 3, group: 'footer'}),
    defineField({
      name: 'socials',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          name: 'social',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {list: ['linkedin', 'instagram', 'youtube', 'x', 'bluesky', 'mastodon']},
            }),
            defineField({name: 'url', type: 'url'}),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'newsletter',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({name: 'enabled', type: 'boolean', initialValue: true}),
        defineField({name: 'heading', type: 'string', initialValue: 'Join the DEXLab mailing list'}),
        defineField({name: 'text', type: 'string'}),
      ],
    }),
    defineField({name: 'footerNote', type: 'string', description: 'e.g. photo credits', group: 'footer'}),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
