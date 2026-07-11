/**
 * Extract English site page body strings → locales/pages/{slug}/en.json
 * Run: node scripts/extract-site-pages.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseHTML } from 'linkedom';
import { SITE_PAGES, collectSiteContentItems, itemsToDict, siteSlugFromFile } from './lib/site-content-targets.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_DIR = path.join(ROOT, 'locales', 'pages');

let total = 0;
for (const file of SITE_PAGES) {
  const fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) {
    console.warn(`Skip missing ${file}`);
    continue;
  }
  const html = fs.readFileSync(fp, 'utf8');
  const { document } = parseHTML(html);
  const slug = siteSlugFromFile(file);
  const items = collectSiteContentItems(document, slug);
  const payload = itemsToDict(items, slug);
  const outDir = path.join(PAGES_DIR, slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'en.json'), JSON.stringify(payload, null, 2) + '\n', 'utf8');
  const n = Object.keys(payload).filter((k) => k !== '_htmlKeys').length;
  console.log(`${file} → ${slug}: ${n} strings`);
  total += n;
}
console.log(`Done. ${SITE_PAGES.length} pages, ${total} strings.`);
