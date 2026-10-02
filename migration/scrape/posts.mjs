import { chromium } from 'playwright';
import fs from 'fs';
const urls = fs.readFileSync('posts.txt','utf8').trim().split('\n');
fs.mkdirSync('out/pt',{recursive:true});
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const ctx = await b.newContext({viewport:{width:1440,height:900}});
async function one(url){
  const pg = await ctx.newPage();
  try{
  await pg.goto(url,{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
  for (let y=0;y<15000;y+=600){ await pg.evaluate(v=>window.scrollTo(0,v),y); await pg.waitForTimeout(100);} await pg.waitForTimeout(1000);
  const r = await pg.evaluate(()=>{
    let k=0; const key=()=>'k'+(k++).toString(36);
    const orig = s => { if(!s) return s; const m=s.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/); return m?m[1]:s; };
    const blocks=[];
    let cur=null;
    function newBlock(style='normal', listItem, level){ cur={_type:'block',_key:key(),style,markDefs:[],children:[]}; if(listItem){cur.listItem=listItem;cur.level=level||1;} blocks.push(cur); return cur; }
    function addText(t, marks){ if(!t) return; if(!cur) newBlock(); const last=cur.children[cur.children.length-1]; if(last && JSON.stringify(last.marks)===JSON.stringify(marks)) last.text+=t; else cur.children.push({_type:'span',_key:key(),text:t,marks:[...marks]}); }
    function inline(node, marks){
      for (const c of node.childNodes){
        if (c.nodeType===3){ addText(c.textContent.replace(/​/g,''), marks); continue; }
        if (c.nodeType!==1) continue;
        const t=c.tagName.toLowerCase(); const st=getComputedStyle(c);
        let m=[...marks];
        if (t==='br'){ addText('\n',marks); continue; }
        if (t==='a' && c.href){ const mk=key(); cur||newBlock(); cur.markDefs.push({_type:'link',_key:mk,href:c.href}); m.push(mk); }
        if (t==='strong'||t==='b'|| (parseInt(st.fontWeight)>=600 && !marks.includes('strong'))) { if(!m.includes('strong')) m.push('strong'); }
        if (t==='em'||t==='i'||st.fontStyle==='italic') { if(!m.includes('em')) m.push('em'); }
        if (t==='u') m.push('underline');
        if (t==='img') continue;
        inline(c,m);
      }
    }
    function finish(){ if(cur){ cur.children=cur.children.filter(s=>s.text.length); if(!cur.children.length || !cur.children.some(s=>s.text.trim())) blocks.splice(blocks.indexOf(cur),1); else { cur.children[0].text=cur.children[0].text.replace(/^\s+/,''); const l=cur.children[cur.children.length-1]; l.text=l.text.replace(/\s+$/,''); } } cur=null; }
    function walk(node){
      for (const c of node.children){
        const t=c.tagName.toLowerCase();
        const hook=c.getAttribute('data-hook')||'';
        if (/^h[1-6]$/.test(t)){ finish(); newBlock(t==='h1'?'h2':t); inline(c,[]); finish(); continue; }
        if (t==='p'){ finish(); newBlock('normal'); inline(c,[]); finish(); continue; }
        if (t==='blockquote'){ finish(); newBlock('blockquote'); inline(c,[]); finish(); continue; }
        if (t==='ul'||t==='ol'){ for (const li of c.querySelectorAll(':scope > li')){ finish(); newBlock('normal', t==='ul'?'bullet':'number',1); const ps=li.querySelectorAll('p'); if(ps.length){ ps.forEach((p,i)=>{ if(i) addText('\n',[]); inline(p,[]);}); } else inline(li,[]); finish(); } continue; }
        if (t==='figure' || hook.startsWith('figure-')){
          finish();
          const imgs=[...c.querySelectorAll('img')]; const cap=c.querySelector('figcaption')?.innerText.trim();
          const vid=c.querySelector('video'); const ifr=c.querySelector('iframe');
          if (ifr){ blocks.push({_type:'embed',_key:key(),url:ifr.src}); continue; }
          if (vid){ blocks.push({_type:'embed',_key:key(),url:vid.src||vid.querySelector('source')?.src}); continue; }
          const seen=new Set();
          for (const im of imgs){ const s=orig(im.currentSrc||im.src); if(!s||seen.has(s)||/blur_/.test(im.src)&&imgs.length>1&&false) continue; seen.add(s); blocks.push({_type:'image',_key:key(),_sanityAsset:'image@'+s,alt:im.alt||'',caption:cap||undefined}); }
          continue;
        }
        if (t==='iframe'){ finish(); blocks.push({_type:'embed',_key:key(),url:c.src}); continue; }
        if (t==='hr' || hook.includes('divider')) { finish(); continue; }
        walk(c);
      }
    }
    const root=document.querySelector('[data-hook="post-description"]');
    if(root) walk(root); finish();
    // dedupe images by url
    const seenI=new Set(); const out=blocks.filter(bk=>{ if(bk._type!=='image') return true; if(seenI.has(bk._sanityAsset)) return false; seenI.add(bk._sanityAsset); return true;});
    const ld=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>{try{return JSON.parse(s.textContent)}catch{return null}}).find(x=>x&&x['@type']==='BlogPosting')||{};
    const cats=[...document.querySelectorAll('[data-hook="post-footer"] a, [data-hook="post-footer"] li')].map(a=>a.href||a.querySelector('a')?.href).filter(h=>h&&h.includes('/categories/'));
    const embeds=[...root?.querySelectorAll('iframe')||[]].map(f=>f.src);
    return { title: document.querySelector('[data-hook="post-title"]')?.innerText.trim(), ld, cats:[...new Set(cats)], og: document.querySelector('meta[property="og:image"]')?.content, hero: orig(document.querySelector('[data-hook="post-hero-image"] img')?.src), body: out, embeds };
  });
  const slug = new URL(url).pathname.split('/').pop();
  fs.writeFileSync(`out/pt/${slug}.json`, JSON.stringify({url,slug,...r},null,1));
  console.log('ok',slug,r.body.length, r.cats.length, r.embeds.length);
  }catch(e){console.log('ERR',url,e.message)}
  await pg.close();
}
let i=0; await Promise.all(Array.from({length:4},async()=>{while(i<urls.length) await one(urls[i++]);}));
await b.close();
