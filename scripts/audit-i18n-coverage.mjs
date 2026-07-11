/**
 * Audit untranslated English on public pages (shell-only i18n scope).
 * Run: node scripts/audit-i18n-coverage.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseHTML } from 'linkedom';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP = new Set(['admin', '404', 'ps-lh-', 'brochure', 'sitemap', 'scripts/']);

const SHELL_SELECTORS = [
  '.topbar', '.navbar', '.mobile-nav', '.footer', '.cookie-banner',
  '#langSwitcher', '#siteSearchOverlay', '#gcFab', '#gcWin', '.gchat',
];

const EN_WORD = /\b(the|and|for|with|our|your|engineer|product|service|contact|about|industry|plant|system|equipment|processing|solution|quality|design|manufacturing|experience|global|leading|advanced|complete|range|offer|provide|specializ)\b/i;

function isPublicPage(file) {
  if (!file.endsWith('.html')) return false;
  if (file.startsWith('product-')) return true;
  return !['admin/', 'scripts/'].some((p) => file.includes(p))
    && !['404.html', 'ps-lh-mobile.html', 'ps-lh-desktop.html', 'brochure.html'].includes(file);
}

function mainTextEnglish(doc) {
  const clone = doc.body.cloneNode(true);
  SHELL_SELECTORS.forEach((sel) => {
    clone.querySelectorAll(sel).forEach((el) => el.remove());
  });
  clone.querySelectorAll('script, style, noscript, svg').forEach((el) => el.remove());

  const texts = [];
  const walk = (el) => {
    if (el.nodeType === 3) {
      const t = el.textContent.replace(/\s+/g, ' ').trim();
      if (t.length > 12 && EN_WORD.test(t)) texts.push(t.slice(0, 120));
      return;
    }
    if (el.nodeType === 1) {
      const tag = el.tagName.toLowerCase();
      if (['script', 'style', 'noscript'].includes(tag)) return;
      [...el.childNodes].forEach(walk);
    }
  };
  walk(clone);
  return [...new Set(texts)].slice(0, 8);
};

const files = fs.readdirSync(ROOT).filter(isPublicPage);
const shellOnly = [];
const productPages = [];

for (const file of files.sort()) {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const { document } = parseHTML(html);
  const samples = mainTextEnglish(document);
  if (!samples.length) continue;
  if (file.startsWith('product-')) productPages.push({ file, samples });
  else shellOnly.push({ file, count: samples.length, samples });
}

console.log('=== SHELL PAGES — body still English (no page-i18n) ===');
shellOnly.sort((a, b) => b.count - a.count).forEach(({ file, count, samples }) => {
  console.log(`\n${file} (${count} samples)`);
  samples.slice(0, 3).forEach((s) => console.log(`  • ${s}`));
});

console.log('\n=== PRODUCT PAGES — body English in HTML source (runtime i18n applies) ===');
console.log(`${productPages.length} pages — expected English in source; check runtime with hi.json page locales`);

console.log('\n=== SUMMARY ===');
console.log(`Shell pages with English body: ${shellOnly.length}`);
console.log(`Product pages: ${productPages.length} (Phase 3 page JSON)`);
