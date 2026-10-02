// Values come from studio/.env (see .env.example) or the Netlify build environment.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '56vhiq14'
export const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
export const siteUrl = (process.env.SANITY_STUDIO_SITE_URL || 'https://www.sbe-dexlab.com').replace(/\/$/, '')
