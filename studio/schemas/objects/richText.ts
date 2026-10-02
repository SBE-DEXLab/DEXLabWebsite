import {defineArrayMember, defineField, defineType} from 'sanity'
import {PlayIcon} from '@sanity/icons/Play'

/** Rich text used for blog posts, FAQ answers and text sections. */
export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
        {title: 'Small heading', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Underline', value: 'underline'},
        ],
        annotations: [
          defineArrayMember({
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              defineField({
                name: 'href',
                type: 'url',
                title: 'URL',
                description: 'Full URL, a path like /workshops, or mailto:someone@maastrichtuniversity.nl',
                validation: (r) =>
                  r.required().uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', type: 'string', title: 'Alternative text', description: 'Describe the image for screen readers.'}),
        defineField({name: 'caption', type: 'string', title: 'Caption'}),
      ],
    }),
    defineArrayMember({
      name: 'embed',
      type: 'object',
      title: 'Video / embed',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'YouTube, Vimeo or video file URL',
          validation: (r) => r.required(),
        }),
        defineField({name: 'caption', type: 'string'}),
      ],
      preview: {select: {title: 'url', subtitle: 'caption'}},
    }),
  ],
})
