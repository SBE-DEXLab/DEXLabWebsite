import {defineConfig} from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.sbe-dexlab.com',
  trailingSlash: 'ignore',
  vite: {plugins: [tailwindcss()]},
})
