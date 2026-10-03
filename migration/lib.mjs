// Helpers to author Sanity documents by hand, used by content.mjs and build-seed.mjs.
import crypto from 'node:crypto'

let keyCounter = 0
export const key = () => crypto.createHash('sha1').update(String(keyCounter++)).digest('hex').slice(0, 12)

const WIX = 'https://static.wixstatic.com/media/'

/** Image hosted on Wix (by media id), imported into Sanity on `sanity dataset import`. */
export const img = (id, alt = '', type = 'imageWithAlt', focusY) => ({
  _type: type,
  alt,
  _sanityAsset: `image@${/^(https?:)?\//.test(id) ? id : WIX + id}`,
  // Focal point, so banners crop around faces (editable in the Studio)
  ...(focusY !== undefined && {hotspot: {_type: 'sanity.imageHotspot', x: 0.5, y: focusY, width: 1, height: 1}}),
})
export const arrImg = (id, alt) => ({...img(id, alt), _key: key()})
export const file = (url) => ({_type: 'file', _sanityAsset: `file@${url}`})

export const ref = (id) => ({_type: 'reference', _ref: id})
export const arrRef = (id) => ({...ref(id), _key: key()})
export const slug = (s) => ({_type: 'slug', current: s})
export const link = (label, href, style = 'primary') => ({_type: 'link', _key: key(), label, href, style})

/**
 * Inline markdown subset to Portable Text spans: **bold**, *italic*, [text](href).
 */
function spans(text) {
  const markDefs = []
  const children = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\)/g
  let last = 0
  let m
  const push = (t, marks = []) => t && children.push({_type: 'span', _key: key(), text: t, marks})
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index))
    if (m[1]) push(m[1], ['strong'])
    else if (m[2]) push(m[2], ['em'])
    else {
      const k = key()
      markDefs.push({_type: 'link', _key: k, href: m[4]})
      push(m[3], [k])
    }
    last = re.lastIndex
  }
  push(text.slice(last))
  if (!children.length) push('')
  return {children, markDefs}
}

/**
 * Portable Text from simple markdown-ish lines.
 * "## " h2, "### " h3, "#### " h4, "> " quote, "- " bullet, "1. " numbered, else paragraph.
 */
export function pt(...lines) {
  return lines.flat().map((line) => {
    let style = 'normal'
    let listItem
    let text = line
    const h = /^(#{2,4}) (.*)$/.exec(line)
    if (h) {
      style = 'h' + h[1].length
      text = h[2]
    } else if (line.startsWith('> ')) {
      style = 'blockquote'
      text = line.slice(2)
    } else if (line.startsWith('- ')) {
      listItem = 'bullet'
      text = line.slice(2)
    } else if (/^\d+\. /.test(line)) {
      listItem = 'number'
      text = line.replace(/^\d+\. /, '')
    }
    const block = {_type: 'block', _key: key(), style, ...spans(text)}
    if (listItem) Object.assign(block, {listItem, level: 1})
    return block
  })
}

export const section = (type, fields) => ({_type: type, _key: key(), ...fields})
export const card = (title, text, extra = {}) => ({_type: 'card', _key: key(), title, text, ...extra})
export const kv = (value, label, text) => ({_type: 'keyValue', _key: key(), value, label, text})
