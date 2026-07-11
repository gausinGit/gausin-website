/**
 * Runtime audit: apply Hindi and find remaining English in body.
 * Run with site served: node scripts/audit-i18n-runtime.mjs
 */
const BASE = process.env.BASE || 'http://localhost:8765';
const LANG = 'hi';

const PAGES = [
  'index.html', 'about.html', 'services.html', 'products.html', 'industries.html',
  'contact.html', 'downloads.html', 'insights.html', 'career.html', 'news.html',
  'our-clients.html', 'technology.html', 'digital-solutions.html', 'privacy-policy.html', 'terms-of-service.html',
  'product-falling-film-evaporator.html', 'product-spray-dryer.html', 'product-complete-milk-processing-plant.html',
];

const SHELL = '.topbar,.navbar,.mobile-nav,.footer,#siteSearchOverlay,#gcFab,#gcWin,.cookie-banner';

const EN = /\b(the|and|for|with|our|your|engineer|product|service|contact|about|industry|plant|system|equipment|processing|solution|design|manufacturing|experience|advanced|complete|explore|learn|view|request|download|privacy|terms)\b/i;

async function auditPage(page) {
  const res = await fetch(`${BASE}/${page}`);
  const html = await res.text();
  const { JSDOM } = await import('jsdom').catch(() => ({ JSDOM: null }));
  if (!JSDOM) {
    console.error('Install jsdom for runtime audit or use browser');
    process.exit(1);
  }
  const dom = new JSDOM(html, { url: `${BASE}/${page}`, runScripts: 'outside-only' });
  return { page, note: 'static only' };
}

// Use linkedom + manual locale apply simulation
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseHTML } from 'linkedom';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const hi = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales/hi.json'), 'utf8'));

function shellEnglishAfterHi(doc) {
  const issues = { shell: [], body: [] };
  doc.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const expected = hi[key];
    if (expected && el.textContent.trim() === el.textContent.trim()) {
      const cur = el.textContent.trim();
      if (cur && EN.test(cur) && !/[\\u0900-\\u097F]/.test(cur)) {
        issues.shell.push(`${key}: "${cur.slice(0, 50)}"`);
      }
    }
  });
  return issues;
}

console.log('Static audit — pages without body i18n will show English after shell translate only.\n');

for (const page of PAGES) {
  const res = await fetch(`${BASE}/${page}`);
  if (!res.ok) { console.log(`${page}: HTTP ${res.status}`); continue; }
  const html = await res.text();
  const { document } = parseHTML(html);
  const clone = document.body.cloneNode(true);
  clone.querySelectorAll(SHELL).forEach((el) => el.remove());
  clone.querySelectorAll('script,style,noscript').forEach((el) => el.remove());
  const texts = [];
  const walk = (n) => {
    if (n.nodeType === 3) {
      const t = n.textContent.replace(/\s+/g, ' ').trim();
      if (t.length > 15 && EN.test(t)) texts.push(t.slice(0, 90));
    } else if (n.nodeType === 1) [...n.childNodes].forEach(walk);
  };
  walk(clone);
  const unique = [...new Set(texts)];
  const isProduct = page.startsWith('product-');
  const status = isProduct ? '(product — runtime hi page JSON)' : '(NO body i18n)';
  console.log(`\n${page} ${status}`);
  if (!isProduct && unique.length) {
    console.log(`  Body English samples: ${unique.length}`);
    unique.slice(0, 2).forEach((t) => console.log(`    • ${t}`));
  }
}

console.log('\n--- Shell keys missing in hi.json ---');
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales/en.json'), 'utf8'));
const missing = Object.keys(en).filter((k) => !hi[k]);
console.log(missing.length ? missing.join(', ') : 'none');
