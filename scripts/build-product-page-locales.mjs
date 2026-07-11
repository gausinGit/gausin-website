/**
 * Translate product page JSON files to all locale languages.
 * Run: node scripts/build-product-page-locales.mjs [slug] [lang]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES_ROOT = path.join(ROOT, 'locales', 'pages');

const ALL_LANGS = [
  'de', 'hi', 'fr', 'ar', 'es', 'pt', 'bg', 'cs', 'el', 'hu', 'id', 'it', 'ja', 'ko',
  'lt', 'lv', 'ms', 'nl', 'no', 'pl', 'ro', 'sk', 'sl', 'sr', 'sv', 'sw', 'th', 'tr', 'uk', 'zh-CN', 'zh-TW',
];

const DE_TERM_FIXES = [
  [/Fallender Film/gi, 'Fallfilm'],
  [/fallender Film/gi, 'Fallfilm'],
  [/Steigender Film/gi, 'Steigfilm'],
  [/steigender Film/gi, 'Steigfilm'],
  [/Falling Film/gi, 'Fallfilm'],
  [/Rising Film/gi, 'Steigfilm'],
  [/Thin Film/gi, 'Dünnschicht'],
  [/thin film/gi, 'Dünnschicht'],
];

const BATCH_SIZE = 20;
const LANG_PARALLEL = 4;
const PAGE_PARALLEL = 2;
const RETRIES = 3;

function googleLang(code) {
  if (code.startsWith('zh')) return code.includes('TW') ? 'zh-TW' : 'zh-CN';
  return code;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translateBatch(texts, lang) {
  if (!texts.length) return [];
  const CONC = 6;
  const out = new Array(texts.length);
  for (let i = 0; i < texts.length; i += CONC) {
    const slice = texts.slice(i, i + CONC);
    const part = await Promise.all(slice.map(async (text) => {
      if (!text || !text.trim()) return text;
      for (let attempt = 1; attempt <= RETRIES; attempt++) {
        try {
          const [val] = await translateBatchSingle([text], lang);
          return val || text;
        } catch (e) {
          if (attempt === RETRIES) return text;
          await sleep(300 * attempt);
        }
      }
      return text;
    }));
    part.forEach((val, j) => { out[i + j] = val; });
    await sleep(50);
  }
  return out;
}

async function translateBatchSingle(texts, lang) {
  if (!texts.length) return [];
  const tl = googleLang(lang);
  const params = new URLSearchParams({ client: 'gtx', sl: 'en', tl, dt: 't' });
  texts.forEach((t) => params.append('q', (t || '').slice(0, 4500)));
  const res = await fetch(`https://translate.googleapis.com/translate_a/single?${params}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const dat = await res.json();
  const segs = dat[0] || [];
  return texts.map((_, i) => (segs[i] && segs[i][0]) ? segs[i][0] : texts[i]);
}

async function translateText(text, lang) {
  if (!text || !text.trim()) return text;
  const [out] = await translateBatchSingle([text], lang);
  return out || text;
}

function applyDeFixes(text) {
  let out = text;
  DE_TERM_FIXES.forEach(([re, rep]) => { out = out.replace(re, rep); });
  return out;
}

async function translateHtml(html, lang) {
  const tags = [];
  const stripped = html.replace(/<[^>]+>/g, (m) => {
    const id = tags.length;
    tags.push(m);
    return `⟦${id}⟧`;
  });
  const translated = await translateText(stripped, lang);
  return translated.replace(/⟦(\d+)⟧/g, (_, idx) => tags[Number(idx)] || '');
}

async function buildPageLang(slug, lang, enPayload) {
  const { _htmlKeys = [], ...en } = enPayload;
  const htmlSet = new Set(_htmlKeys);
  const outPath = path.join(PAGES_ROOT, slug, `${lang}.json`);
  const existing = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : {};
  const out = { _htmlKeys, ...existing };
  delete out._htmlKeys;
  out._htmlKeys = _htmlKeys;

  const pending = Object.keys(en).filter((k) => {
    if (k === '_htmlKeys') return false;
    if (k.startsWith('_') && k !== '_meta.title') return false;
    return out[k] == null || out[k] === en[k];
  });
  if (!pending.length) return 0;

  console.log(`  ${slug}/${lang}: ${pending.length} keys`);

  const plain = pending.filter((k) => !htmlSet.has(k));
  const htmlKeys = pending.filter((k) => htmlSet.has(k));

  for (let i = 0; i < plain.length; i += BATCH_SIZE) {
    const batchKeys = plain.slice(i, i + BATCH_SIZE);
    const batchTexts = batchKeys.map((k) => en[k]);
    try {
      const translated = await translateBatch(batchTexts, lang);
      batchKeys.forEach((key, j) => {
        let val = translated[j] || en[key];
        if (lang === 'de') val = applyDeFixes(val);
        out[key] = val;
      });
    } catch (e) {
      console.warn(`    batch fail ${slug}/${lang} plain@${i}:`, e.message);
      for (const key of batchKeys) {
        try {
          let val = await translateText(en[key], lang);
          if (lang === 'de') val = applyDeFixes(val);
          out[key] = val;
        } catch {
          out[key] = en[key];
        }
      }
    }
    await sleep(60);
  }

  for (const key of htmlKeys) {
    try {
      let val = await translateHtml(en[key], lang);
      if (lang === 'de') val = applyDeFixes(val);
      out[key] = val;
    } catch (e) {
      console.warn(`    skip html ${key}:`, e.message);
      out[key] = en[key];
    }
    await sleep(40);
  }

  fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
  return pending.length;
}

async function buildPage(slug) {
  const enPath = path.join(PAGES_ROOT, slug, 'en.json');
  if (!fs.existsSync(enPath)) {
    console.warn(`Skip ${slug}: no en.json`);
    return;
  }
  const enPayload = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  console.log(`Building ${slug}...`);
  for (let i = 0; i < ALL_LANGS.length; i += LANG_PARALLEL) {
    const chunk = ALL_LANGS.slice(i, i + LANG_PARALLEL);
    await Promise.all(chunk.map((lang) => buildPageLang(slug, lang, enPayload)));
  }
}

const slugArg = process.argv[2];
const langArg = process.argv[3];

if (langArg) {
  const slug = slugArg;
  const enPath = path.join(PAGES_ROOT, slug, 'en.json');
  const enPayload = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  await buildPageLang(slug, langArg, enPayload);
} else {
  const slugs = slugArg
    ? [slugArg]
    : fs.readdirSync(PAGES_ROOT).filter((d) => fs.statSync(path.join(PAGES_ROOT, d)).isDirectory());

  for (let i = 0; i < slugs.length; i += PAGE_PARALLEL) {
    const chunk = slugs.slice(i, i + PAGE_PARALLEL);
    await Promise.all(chunk.map((slug) => buildPage(slug)));
  }
}

console.log('Done.');
