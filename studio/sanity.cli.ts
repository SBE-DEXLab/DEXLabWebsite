import {defineCliConfig} from 'sanity/cli'
import {projectId, dataset} from './env'

export default defineCliConfig({
  api: {projectId, dataset},
  // The Studio is served from /admin on the website (see netlify.toml and public/_redirects)
  project: {basePath: '/admin'},
  // Used by `npm run deploy` to host the Studio at https://dexlab.sanity.studio as a fallback to /admin
  studioHost: 'dexlab',
})
