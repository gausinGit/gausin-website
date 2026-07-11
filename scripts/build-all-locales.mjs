/**
 * One-time / on-demand locale builder — translates en.json shell keys via Google API.
 * Run: node scripts/build-all-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = path.join(ROOT, 'locales');
const EN_PATH = path.join(LOCALES, 'en.json');

const ALL_LANGS = [
  'de', 'hi', 'fr', 'ar', 'es', 'pt', 'bg', 'cs', 'el', 'hu', 'id', 'it', 'ja', 'ko',
  'lt', 'lv', 'ms', 'nl', 'no', 'pl', 'ro', 'sk', 'sl', 'sr', 'sv', 'sw', 'th', 'tr', 'uk', 'zh-CN', 'zh-TW',
];

const DE_OVERRIDES = {
  'product.falling_film_evaporator': 'Fallfilmverdampfer',
  'product.rising_film_evaporator': 'Steigfilmverdampfer',
  'product.agitated_thin_film_dryer': 'Rühr-Dünnschichttrockner (ATFD)',
  'footer.fallingFilm': 'Fallfilmverdampfer',
  'mega.evaporatorsDesc': 'Fallfilm, Zwangsumlauf, Plattenbau',
};

function googleLang(code) {
  if (code.startsWith('zh')) return code.includes('TW') ? 'zh-TW' : 'zh-CN';
  return code;
}

async function translateText(text, lang) {
  const tl = googleLang(lang);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`translate failed ${lang}: ${text.slice(0, 40)}`);
  const dat = await res.json();
  return (dat[0] || []).map((s) => s[0]).join('') || text;
}

async function buildLang(lang, en) {
  const existingPath = path.join(LOCALES, `${lang}.json`);
  const existing = fs.existsSync(existingPath)
    ? JSON.parse(fs.readFileSync(existingPath, 'utf8'))
    : {};

  const out = { ...existing };
  const keys = Object.keys(en);
  const pending = keys.filter((k) => !out[k]);
  console.log(`${lang}: translating ${pending.length} keys...`);

  const CONC = 5;
  for (let i = 0; i < pending.length; i += CONC) {
    const batch = pending.slice(i, i + CONC);
    await Promise.all(batch.map(async (key) => {
      try {
        out[key] = await translateText(en[key], lang);
      } catch (e) {
        console.warn(`  skip ${lang}.${key}:`, e.message);
        out[key] = en[key];
      }
    }));
    await new Promise((r) => setTimeout(r, 120));
  }

  if (lang === 'de') Object.assign(out, DE_OVERRIDES);
  fs.writeFileSync(existingPath, JSON.stringify(out, null, 2) + '\n', 'utf8');
  console.log(`${lang}: wrote ${existingPath}`);
}

const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
for (const lang of ALL_LANGS) {
  await buildLang(lang, en);
}
console.log('Done.');
