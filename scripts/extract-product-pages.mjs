/**
 * Extract English product page body strings → locales/pages/{slug}/en.json
 * Run: node scripts/extract-product-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseHTML } from 'linkedom';
import { collectPageContentItems, pageSlugFromFile } from './lib/page-content-targets.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = path.join(ROOT, 'locales', 'pages');

const files = fs.readdirSync(ROOT).filter((f) => f.startsWith('product-') && f.endsWith('.html'));
let total = 0;

for (const file of files) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const { document } = parseHTML(html);
  const slug = pageSlugFromFile(file);
  const items = collectPageContentItems(document, slug);
  const dict = {};
  const htmlKeys = [];
  items.forEach(({ key, text, mode }) => {
    const shortKey = key.slice(slug.length + 1);
    dict[shortKey] = text;
    if (mode === 'html') htmlKeys.push(shortKey);
  });

  const outDir = path.join(PAGES_DIR, slug);
  fs.mkdirSync(outDir, { recursive: true });
  const payload = { _htmlKeys: htmlKeys, ...dict };
  fs.writeFileSync(path.join(outDir, 'en.json'), JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`${file} → ${slug}: ${Object.keys(dict).length} strings`);
  total += Object.keys(dict).length;
}

console.log(`Done. ${files.length} pages, ${total} strings total.`);
