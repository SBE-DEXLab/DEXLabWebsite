import {createImageUrlBuilder} from '@sanity/image-url'
import {projectId, dataset} from './sanity'
import type {Img} from './types'

const builder = projectId ? createImageUrlBuilder({projectId, dataset}) : null

interface Opts {
  width: number
  height?: number
  /** Crop to fill width x height (default) or fit inside. */
  fit?: 'crop' | 'max'
}

/** A resized image URL for Sanity CDN images, or Wix media while running on the seed data. */
export function imageUrl(img: Img | undefined, {width, height, fit = 'crop'}: Opts): string | undefined {
  if (!img?.url) return undefined
  if (builder && img.ref && img.url.includes('cdn.sanity.io')) {
    // Without an editor-set focal point, crops keep the upper third, where faces usually are.
    const hotspot = img.hotspot ?? {x: 0.5, y: 0.33, width: 1, height: 1}
    let b = builder.image({asset: {_ref: img.ref}, crop: img.crop, hotspot}).width(width).auto('format').quality(80)
    if (height) b = b.height(height).fit(fit === 'crop' ? 'crop' : 'max')
    return b.url()
  }
  if (img.url.includes('static.wixstatic.com/media/')) {
    const name = img.url.split('/').pop()
    return height
      ? `${img.url}/v1/${fit === 'crop' ? 'fill' : 'fit'}/w_${width},h_${height},al_c,q_80,enc_auto/${name}`
      : `${img.url}/v1/fit/w_${width},h_${width * 4},q_80,enc_auto/${name}`
  }
  return img.url
}

/** srcset for responsive images, keeping the aspect ratio of `width x height`. */
export function srcSet(img: Img | undefined, width: number, height?: number, fit: Opts['fit'] = 'crop'): string | undefined {
  if (!img?.url) return undefined
  return [0.5, 1, 1.5, 2]
    .map((f) => {
      const w = Math.round(width * f)
      const h = height ? Math.round(height * f) : undefined
      return `${imageUrl(img, {width: w, height: h, fit})} ${w}w`
    })
    .join(', ')
}
