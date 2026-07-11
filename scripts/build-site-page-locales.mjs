/** Build locales for site pages only */
import { spawnSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { SITE_PAGES, siteSlugFromFile } from './lib/site-content-targets.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slugs = SITE_PAGES.map(siteSlugFromFile);

for (const slug of slugs) {
  console.log(`\n=== ${slug} ===`);
  spawnSync('node', ['scripts/build-product-page-locales.mjs', slug], {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
  });
}
console.log('\nSite pages done.');
