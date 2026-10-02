/** Escapes text for use in HTML. */
export const escape = (s = '') =>
  s.replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]!)

/** Wraps every "DEXLab" in a heading with the brand colours (DEX blue, Lab orange). */
export const brandify = (s = '') =>
  escape(s).replace(/\bDEX(Lab|LAB)\b/g, '<span class="brand"><span class="brand-dex">DEX</span><span class="brand-lab">$1</span></span>')

export const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'}) : ''

export function youtubeId(url = ''): string | undefined {
  return /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/.exec(url)?.[1]
}

export function vimeoId(url = ''): string | undefined {
  return /vimeo\.com\/(?:video\/)?(\d+)/.exec(url)?.[1]
}

export const isExternal = (href = '') => /^https?:\/\//.test(href) && !href.includes('sbe-dexlab.com')

/** Plain text from Portable Text, for excerpts and reading time. */
export const toPlainText = (blocks: Array<Record<string, any>> = []) =>
  blocks
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c: {text: string}) => c.text).join(''))
    .join('\n\n')

export const readingTime = (blocks?: Array<Record<string, any>>) =>
  Math.max(1, Math.round(toPlainText(blocks).split(/\s+/).length / 220))
