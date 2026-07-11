import fs from 'fs';
import path from 'path';

const dir = path.resolve('D:/Gausin Data');
const files = fs.readdirSync(dir).filter((f) => f.startsWith('product-') && f.endsWith('.html'));
const products = {};
for (const f of files.sort()) {
  const h = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = h.match(/class="prod-title"[^>]*>([\s\S]*?)<\/h1>/);
  const title = m ? m[1].replace(/<br\s*\/?>/gi, ' ').replace(/\s+/g, ' ').trim() : '';
  const key = 'product.' + f.replace(/^product-/, '').replace(/\.html$/, '').replace(/-/g, '_');
  products[f] = { key, title };
}
console.log(JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(dir, 'scripts/products-map.json'), JSON.stringify(products, null, 2) + '\n');
