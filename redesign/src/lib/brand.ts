/** Gives "DEXLab" its brand colours wherever it appears in a heading. */
export const brandify = (s = '') =>
  s
    .replace(/[&<>]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'})[c]!)
    .replace(/DEXLab/g, '<span class="brand-dex">DEX</span><span class="brand-lab">Lab</span>')
