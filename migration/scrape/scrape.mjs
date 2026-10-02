import { chromium } from 'playwright';
import fs from 'fs';
const [,, listFile, outDir, shots] = process.argv;
const urls = fs.readFileSync(listFile,'utf8').trim().split('\n');
fs.mkdirSync(outDir,{recursive:true});
const browser = await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const ctx = await browser.newContext({ viewport:{width:1440,height:900} });
async function one(url){
  const page = await ctx.newPage();
  try {
  await page.goto(url,{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
  for (let y=0;y<30000;y+=700){ await page.evaluate(v=>window.scrollTo(0,v),y); await page.waitForTimeout(120); const h=await page.evaluate(()=>document.body.scrollHeight); if(y>h) break;}
  await page.waitForTimeout(800);
  const slug = (new URL(url).pathname.replace(/^\/|\/$/g,'').replace(/\//g,'__')) || 'home';
  if (shots==='1') await page.screenshot({path:`${outDir}/${slug}.png`, fullPage:true}).catch(()=>{});
  const data = await page.evaluate(() => {
    const root = document.querySelector('#PAGES_CONTAINER') || document.body;
    const out=[]; const seen=new Set();
    const els = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,img,iframe,a,blockquote,figcaption,pre');
    for (const el of els){
      const r = el.getBoundingClientRect(); if (r.width<2||r.height<2) continue;
      const top = r.top+window.scrollY, left=r.left;
      const tag = el.tagName.toLowerCase();
      if (tag==='img'){ const src=el.currentSrc||el.src; if(!src||seen.has(src)) continue; seen.add(src); out.push({tag,src,alt:el.alt,w:Math.round(r.width),h:Math.round(r.height),top,left}); continue; }
      if (tag==='iframe'){ out.push({tag,src:el.src,top,left}); continue; }
      if (tag==='a'){ const t=el.innerText.trim(); if(!t || el.closest('p,li,h1,h2,h3,h4,h5,h6')) continue; out.push({tag,text:t,href:el.href,top,left}); continue; }
      if (tag==='p' && el.closest('li')) continue;
      const t = el.innerText.trim(); if(!t) continue;
      const links=[...el.querySelectorAll('a')].map(a=>({text:a.innerText.trim(),href:a.href}));
      out.push({tag,text:t,links:links.length?links:undefined,top,left});
    }
    out.sort((a,b)=>Math.abs(a.top-b.top)>8? a.top-b.top : a.left-b.left);
    const meta = { title:document.title, description: document.querySelector('meta[name=description]')?.content, ogImage: document.querySelector('meta[property="og:image"]')?.content };
    const ld=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>s.textContent);
    return {meta, ld, items: out.map(({top,left,...r})=>({...r,y:Math.round(top),x:Math.round(left)}))};
  });
  fs.writeFileSync(`${outDir}/${slug}.json`, JSON.stringify({url,...data},null,1));
  console.log('ok',slug,data.items.length);
  } catch(e){ console.log('ERR',url,e.message); }
  await page.close();
}
const conc=4; let i=0;
await Promise.all(Array.from({length:conc},async()=>{ while(i<urls.length){ const u=urls[i++]; await one(u);} }));
await browser.close();
