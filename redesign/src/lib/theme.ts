/**
 * Three looks for one site. Every component asks `look(theme, surface)` for its class
 * strings, so the same content renders as A (Night Lab), B (Light Shader) or C (Terminal).
 */
export type Theme = 'a' | 'b' | 'c'
export type Surface = 'base' | 'alt' | 'deep'
export const THEMES: Theme[] = ['a', 'b', 'c']
export const THEME_NAMES: Record<Theme, string> = {a: 'Night Lab', b: 'Light Shader', c: 'Terminal'}

/** Maps the section `tone` field from the CMS to a surface. */
export const surfaceFor = (tone?: string): Surface =>
  tone === 'muted' || tone === 'peach' ? 'alt' : tone === 'navy' || tone === 'blue' ? 'deep' : 'base'

export const isDark = (t: Theme, s: Surface) => t === 'c' || (t === 'a' && s !== 'alt') || (t === 'b' && s === 'deep')

export function look(t: Theme, s: Surface = 'base') {
  const dark = isDark(t, s)
  const muted = dark ? 'text-white/70' : 'text-navy/75'
  const faint = dark ? 'text-white/50' : 'text-navy/55'
  const bg = {
    a: {base: 'bg-night text-white', alt: 'bg-paper text-navy', deep: 'bg-night-2 text-white'},
    b: {base: 'bg-white page-base text-navy', alt: 'bg-paper text-navy', deep: 'bg-navy text-white'},
    c: {base: 'bg-[#070b14] text-white', alt: 'bg-[#0a1120] text-white term-grid', deep: 'bg-[#0c1528] text-white'},
  }[t][s]
  const heading = {
    a: 'display',
    b: 'display tracking-[-0.03em]',
    c: 'font-mono font-bold tracking-[-0.04em] leading-[1.05]',
  }[t]
  const card = {
    a: dark ? 'rounded-[1.75rem] bg-night-2 ring-1 ring-white/10' : 'rounded-[1.75rem] bg-white ring-1 ring-navy/10',
    b: dark ? 'rounded-[2rem] bg-white/5 ring-1 ring-white/15' : 'rounded-[2rem] bg-white ring-1 ring-line shadow-[0_20px_50px_-30px_rgb(0,28,61,0.25)]',
    c: 'rounded-md bg-[#0b1324] ring-1 ring-dex/25',
  }[t]
  const cardHover = {
    a: 'transition hover:-translate-y-1 hover:ring-dex/60',
    b: 'transition hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(0,28,61,0.4)]',
    c: 'transition hover:ring-lab/70 hover:bg-[#0e1830]',
  }[t]
  const btn = {
    a: dark ? 'rounded-full bg-white text-navy hover:bg-dex hover:text-white' : 'rounded-full bg-navy text-white hover:bg-lab',
    b: dark ? 'rounded-full bg-white text-navy hover:bg-dex hover:text-white keep-light' : 'btn-b rounded-full bg-navy text-white hover:bg-dex-dark',
    c: 'rounded-md bg-lab text-white hover:bg-white hover:text-navy',
  }[t]
  const btn2 = {
    a: dark ? 'rounded-full ring-1 ring-white/30 text-white hover:bg-white/10' : 'rounded-full ring-1 ring-navy/30 text-navy hover:bg-navy/5',
    b: dark ? 'rounded-full ring-1 ring-white/40 text-white hover:bg-white/10' : 'rounded-full ring-1 ring-navy/20 text-navy hover:bg-navy/5',
    c: 'rounded-md ring-1 ring-dex/50 text-dex hover:bg-dex/10',
  }[t]
  return {
    t,
    dark,
    bg,
    heading,
    muted,
    faint,
    card,
    cardHover,
    btnBase: 'inline-flex items-center gap-3 px-7 py-4 text-sm font-bold transition',
    btn,
    btn2,
    link: dark ? 'text-dex hover:text-white' : 'text-dex-dark hover:text-navy',
    chip: {
      a: dark ? 'rounded-full bg-white/10 px-3 py-1 text-xs font-bold' : 'rounded-full bg-navy/5 px-3 py-1 text-xs font-bold',
      b: dark ? 'rounded-full bg-white/10 px-3 py-1 text-xs font-bold' : 'rounded-full bg-dex/10 px-3 py-1 text-xs font-bold text-navy',
      c: 'rounded bg-dex/10 px-2 py-0.5 font-mono text-xs text-dex ring-1 ring-dex/30',
    }[t],
    line: dark ? 'border-white/10' : 'border-line',
    prose: `prose-${t} ${dark ? 'prose-dark' : 'prose-light'}`,
    radiusImg: {a: 'rounded-[1.75rem]', b: 'rounded-[2rem]', c: 'rounded-md'}[t],
    font: t === 'c' ? 'font-mono' : 'font-display',
  }
}

/** Internal links stay inside the chosen version: "/about" becomes "/a/about". */
export const L = (t: Theme, href = '') => {
  if (!href || /^(https?:|mailto:|tel:|#)/.test(href)) return href
  if (href === '/') return `/${t}/`
  return `/${t}${href.startsWith('/') ? '' : '/'}${href}`
}
export const rewriteLinks = (t: Theme, html: string) => html.replace(/href="\/(?!\/)/g, `href="/${t}/`)

export const kicker = (t: Theme, text: string) => (t === 'c' ? `// ${text.toLowerCase().replace(/\s+/g, '_')}` : text)
