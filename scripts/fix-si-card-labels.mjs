/**
 * Localize short user-visible Sinhala labels (tags, badges, pills, card chips).
 * Run: node scripts/fix-si-card-labels.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TAG_KEY = /\.(tag|badge|pill|stat\.[0-9]+\.(val|lbl)|prod\.badge|prod\.specLabel|fp\.tag|ind\.tag|tech\.pill|filter\.btn|cat\.count|ins\.link|ins\.tag|map\.link|fp\.link|card\.link|btn\.|hero\.stat|mega\.|footer\.|product\.)/i;
const CARD_KEY = /^(fp\.(tag|title|desc)|industry\.(title|desc)|card\.(title|desc|link)|tech\.pill|ind\.tag|float\.sub)/;

const REPLACEMENTS = [
  ['CIP පද්\u200dධති', 'ස්ථානයේ පිරිසිදු කිරීම'],
  ['CIP/SIP', 'ස්ථානයේ/වායු පිරිසිදු කිරීම'],
  ['CIP', 'ස්ථානයේ පිරිසිදු කිරීම'],
  ['GMP පද්\u200dධති', 'සෞඛ්\u200dය ප්\u200dරමිති පද්\u200dධති'],
  ['GMP ශ්\u200dරේණිය', 'සෞඛ්\u200dය ප්\u200dරමිති ශ්\u200dරේණිය'],
  ['GMP-අනුකූල', 'සෞඛ්\u200dය ප්\u200dරමිති අනුකූල'],
  ['GMP (', 'සෞඛ්\u200dය ප්\u200dරමිති ('],
  ['Kraft ක්\u200dරියාවලිය', 'ක්\u200dරාෆ්ට් ක්\u200dරියාවලිය'],
  ['Kraft ', 'ක්\u200dරාෆ්ට් '],
  ['අපවහන ETP', 'අපද්\u200dරව්\u200dය ජල පිරිපහදු'],
  ['ZLD පද්\u200dධති', 'ශූන්\u200dය ද්\u200dරවක නිස්සරණ'],
  ['ZLD /', 'ශූන්\u200dය ද්\u200dරවක නිස්සරණ /'],
  ['ZLD', 'ශූන්\u200dය ද්\u200dරවක නිස්සරණ'],
  ['Turnkey ', 'පිරිවැටුම් '],
  ['Turnkey', 'පිරිවැටුම්'],
  ['CPCB Compliant', 'අපද්\u200dරව්\u200dය පාලන අනුකූල'],
  ['CPCB අනුකූල', 'අපද්\u200dරව්\u200dය පාලන අනුකූල'],
  ['CPCB', 'අපද්\u200dරව්\u200dය පාලන'],
  ['IBR Approved', 'බොයිලර් රෙගුලාසි අනුමත'],
  ['IBR අනුමත', 'බොයිලර් රෙගුලාසි අනුමත'],
  ['IBR vs ASME', 'බොයිලර් රෙගුලාසි vs ASME'],
  ['IBR', 'බොයිලර් රෙගුලාසි'],
  ['TEMA Standard', 'තාප හුවමාරු සම්මතය'],
  ['TEMA සම්මතය', 'තාප හුවමාරු සම්මතය'],
  ['ETP/STP විසඳුම්', 'අපද්\u200dරව්\u200dය/මල ජල විසඳුම්'],
  ['ETP/STP ප්\u200dරතිකාරාගාර', 'අපද්\u200dරව්\u200dය/මල ජල පිරිපහදු'],
  ['ETP/STP පිරිපහදු', 'අපද්\u200dරව්\u200dය/මල ජල පිරිපහදු'],
  ['ETP/STP', 'අපද්\u200dරව්\u200dය/මල ජල'],
  ['ETP වාෂ්පකාරක', 'අපද්\u200dරව්\u200dය ජල වාෂ්පක'],
  ['ජීව වායු සහ CNG', 'ජීව වායු සහ ස්වභාවික වායු'],
  ['ජීව වායුව/CNG', 'ජීව වායු / ස්වභාවික වායු'],
  ['Biogas/CNG', 'ජීව වායු / ස්වභාවික වායු'],
  ['ASME Sec. VIII', 'ASME VIII ප්\u200dරමිතිය'],
  ['ASME VIII', 'පීඩන යාත්\u200dරා ප්\u200dරමිතිය'],
  ['SS 304 / SS 316L / Ti / Hastelloy', 'නිරක්\u200dෂණ වාන 304 / 316L / Ti / Hastelloy'],
  ['SS 304 / SS 316L / Ti', 'නිරක්\u200dෂණ වාන 304 / 316L / Ti'],
  ['SS 304 / SS 316L / Duplex SS', 'නිරක්\u200dෂණ වාන 304 / 316L / Duplex'],
  ['SS 304 / SS 316L /', 'නිරක්\u200dෂණ වාන 304 / 316L /'],
  ['SS 304 / SS 316L', 'නිරක්\u200dෂණ වාන 304 / 316L'],
  ['SS 316L අභ්\u200dයන්තරය', 'නිරක්\u200dෂණ වාන 316L අභ්\u200dයන්තරය'],
  ['SS 316L දර්පණය', 'නිරක්\u200dෂණ වාන 316L දර්පණය'],
  ['SS 316L', 'නිරක්\u200dෂණ වාන 316L'],
  ['SS 316L / FRP / PP', 'නිරක්\u200dෂණ වාන 316L / FRP / PP'],
  ['SS ටැංකි', 'නිරක්\u200dෂණ වාන ටැංකි'],
  ['CIP හැකියාව', 'ස්ථානයේ පිරිසිදු කිරීම'],
  ['TEMA Standard', 'TEMA සම්මතය'],
  ['Turnkey', 'පිරිවැටුම්'],
  ['හැරවුම් යතුර', 'පිරිවැටුම්'],
  ['Pasteurizer', 'පැස්ටරයිසර්'],
  ['පැස්චරයිසර්', 'පැස්ටරයිසර්'],
  ['Nozzle Type', 'තුණ්\u200dඩ වර්ගය'],
  ['Rotary Disc', 'රොටරි තැටිය'],
  ['GMP Grade', 'GMP ශ්\u200dරේණිය'],
  ['Mirror Polish', 'දර්පණ පෝලන්ත'],
  ['Custom Design', 'අභිරුචි නිර්මාණය'],
  ['CPCB Compliant', 'CPCB අනුකූල'],
  ['Kraft ක්\u200dරියාවලිය', 'ක්\u200dරාෆ්ට් ක්\u200dරියාවලිය'],
  ['API සැකසුම්', 'ඖෂධීය අතරතුර සැකසුම්'],
  ['DWGS', 'ස්\u200dක්\u200dරීන්වී'],
  ['ZLD පද්\u200dධති', 'ශූන්\u200dය ද්\u200dරවක නිස්සරණ'],
  ['UHT', 'අධි උෂ්\u200dණ'],
];

const EXACT = {
  'fp.tag.0': 'තාප වාෂ්ප',
  'fp.tag.1': 'යාන්ත්\u200dරික වාෂ්ප',
  'fp.tag.2': 'ස්ථානයේ පිරිසිදු කිරීම',
  'fp.tag.9': 'අපද්\u200dරව්\u200dය/මල ජල',
  'fp.tag.10': 'ජීව වායු / ස්වභාවික වායු',
  'fp.tag.12': 'පීඩන යාත්\u200dරා ප්\u200dරමිතිය',
  'fp.tag.16': 'නිරක්\u200dෂණ වාන 316L',
  'fp.title.4': 'නිරක්\u200dෂණ වාන ටැංකි සහ පීඩන යාත්\u200dරා',
};

function shouldTouch(key) {
  return TAG_KEY.test(key) || CARD_KEY.test(key);
}

function applyReplacements(value) {
  let out = value;
  for (const [from, to] of REPLACEMENTS) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

function patchObject(obj, rel, changed) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('_') || typeof value !== 'string') continue;
    const fullKey = `${rel}:${key}`;
    let next = value;
    if (EXACT[key]) next = EXACT[key];
    else if (shouldTouch(key)) next = applyReplacements(value);
    if (next !== value) {
      obj[key] = next;
      changed.push(`${rel} → ${key}`);
    }
  }
}

function collectSiFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectSiFiles(full, out);
    else if (entry.name === 'si.json') out.push(full);
  }
  return out;
}

const files = [
  path.join(ROOT, 'locales', 'si.json'),
  ...collectSiFiles(path.join(ROOT, 'locales', 'pages')),
];

let total = 0;
for (const file of files) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const changed = [];
  patchObject(data, rel, changed);
  if (changed.length) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
    total += changed.length;
    console.log(`${rel}: ${changed.length} keys`);
  }
}

console.log(`Done. Updated ${total} keys.`);
