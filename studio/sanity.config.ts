import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, singletonTypes} from './schemas'
import {structure} from './structure'
import {projectId, dataset, siteUrl} from './env'

export default defineConfig({
  name: 'dexlab',
  title: 'DEXLab Website',
  projectId,
  dataset,
  basePath: '/admin',

  plugins: [structureTool({structure}), visionTool({title: 'Query (developers)'})],

  schema: {
    types: schemaTypes,
    // Singletons cannot be created from the "new document" menu
    templates: (templates) => [
      ...templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
      {
        id: 'person-in-group',
        title: 'Team member in group',
        schemaType: 'person',
        parameters: [{name: 'group', type: 'string'}],
        value: (params: {group: string}) => ({group: params.group}),
      },
    ],
  },

  document: {
    // Singletons cannot be duplicated or deleted
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
    productionUrl: async (prev, {document}) => {
      const slug = (document as {slug?: {current?: string}}).slug?.current
      switch (document._type) {
        case 'page':
          return slug === 'home' ? siteUrl : `${siteUrl}/${slug}`
        case 'post':
          return `${siteUrl}/post/${slug}`
        case 'workshop':
          return `${siteUrl}/workshops/${slug}`
        default:
          return prev
      }
    },
  },
})
