import {toHTML, escapeHTML, uriLooksSafe} from '@portabletext/to-html'
import {imageUrl, srcSet} from './image'
import {youtubeId, vimeoId, isExternal} from './utils'
import type {RichText} from './types'

/** Renders Portable Text (rich text from Sanity) to HTML. */
export function renderRichText(value?: RichText): string {
  if (!value?.length) return ''
  return toHTML(value as any, {
    onMissingComponent: false,
    components: {
      types: {
        image: ({value}) => {
          const src = imageUrl(value, {width: 960})
          if (!src) return ''
          const caption = value.caption ? `<figcaption>${escapeHTML(value.caption)}</figcaption>` : ''
          return `<figure class="rt-figure"><img src="${src}" srcset="${srcSet(value, 960)}" sizes="(min-width: 760px) 720px, 100vw" alt="${escapeHTML(value.alt || '')}" loading="lazy" decoding="async" />${caption}</figure>`
        },
        embed: ({value}) => {
          const url: string = value.url || ''
          const yt = youtubeId(url)
          const vm = vimeoId(url)
          const caption = value.caption ? `<figcaption>${escapeHTML(value.caption)}</figcaption>` : ''
          if (yt)
            return `<figure class="rt-figure"><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${yt}" title="${escapeHTML(value.caption || 'Video')}" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>${caption}</figure>`
          if (vm)
            return `<figure class="rt-figure"><div class="video-frame"><iframe src="https://player.vimeo.com/video/${vm}?dnt=1" title="${escapeHTML(value.caption || 'Video')}" loading="lazy" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>${caption}</figure>`
          if (/\.(mp4|webm)(\?|$)/.test(url) || url.includes('video.wixstatic.com'))
            return `<figure class="rt-figure"><video src="${escapeHTML(url)}" controls preload="metadata" playsinline></video>${caption}</figure>`
          return `<p><a href="${escapeHTML(url)}">${escapeHTML(value.caption || url)}</a></p>`
        },
      },
      marks: {
        link: ({children, value}) => {
          const href: string = value?.href || ''
          if (!uriLooksSafe(href)) return children
          const ext = isExternal(href) ? ' target="_blank" rel="noopener"' : ''
          return `<a href="${escapeHTML(href)}"${ext}>${children}</a>`
        },
      },
      hardBreak: () => '<br />',
    },
  })
}
