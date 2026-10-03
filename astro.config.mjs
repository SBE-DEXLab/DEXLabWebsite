// @ts-check
import {defineConfig} from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: process.env.SITE_URL || 'https://www.sbe-dexlab.com',
  trailingSlash: 'ignore',
  build: {format: 'directory'},
  // Video thumbnails are fetched at build time and served from our own domain (see YouTube.astro)
  image: {domains: ['i.ytimg.com']},
  integrations: [
    sitemap({
      filter: (page) => !/\/(thanks|404|admin)\/?$/.test(page),
    }),
  ],
})
