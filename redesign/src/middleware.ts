import {defineMiddleware} from 'astro:middleware'

/**
 * "DEXLab" always in its brand colours: DEX blue, Lab orange. Runs over every page's HTML
 * and wraps each occurrence in text (never inside tags, attributes, the <title>, scripts or styles).
 */
const BRAND = /\bDEX(Lab|LAB)\b/g
const wrap = (s: string) => s.replace(BRAND, '<span class="brand-dex">DEX</span><span class="brand-lab">$1</span>')

export const onRequest = defineMiddleware(async (_ctx, next) => {
  const res = await next()
  if (!res.headers.get('content-type')?.includes('text/html')) return res
  const html = await res.text()
  let skip = false
  const out = html
    .split(/(<[^>]+>)/)
    .map((part) => {
      if (part.startsWith('<')) {
        if (/^<(script|style|title|textarea)\b/i.test(part)) skip = true
        else if (/^<\/(script|style|title|textarea)>/i.test(part)) skip = false
        return part
      }
      return skip ? part : wrap(part)
    })
    .join('')
  return new Response(out, {status: res.status, headers: res.headers})
})
