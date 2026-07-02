/* One-off chatbot static QA — run: node scripts/chatbot-qa-test.js */
const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname, '../js/chatbot.js'), 'utf8');
const kbMatch = code.match(/const KB = (\[[\s\S]*?\n  \]);/);
if (!kbMatch) { console.error('KB not found'); process.exit(1); }
const KB = eval(kbMatch[1]);

const routesMatch = code.match(/const ROUTES = \{([\s\S]*?)\n    \};/);
const routeKeys = [...routesMatch[1].matchAll(/'([^']+)':/g)].map(m => m[1]);

function matchesKeyword(text, kw) {
  const k = kw.toLowerCase().trim();
  if (!k) return false;
  if (k.includes(' ')) return text.includes(k);
  const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?:^|[\\s,.!?;:\'"()\\[\\]\\-/])' + escaped + '(?:$|[\\s,.!?;:\'"()\\[\\]\\-/])').test(' ' + text + ' ');
}

function findEntry(input) {
  const t = input.toLowerCase().trim();
  if (!t) return null;
  let best = null;
  let bestLen = 0;
  for (const e of KB) {
    for (const kw of e.t) {
      if (!matchesKeyword(t, kw)) continue;
      if (kw.length > bestLen) {
        bestLen = kw.length;
        best = e;
      }
    }
  }
  return best;
}

const issues = [];
const warnings = [];

KB.forEach(e => {
  if (!e.id) issues.push('KB entry missing id');
  if (!e.t?.length) issues.push(`${e.id}: no triggers`);
  if (!e.r?.trim()) issues.push(`${e.id}: empty reply`);
  if (!e.q?.length) issues.push(`${e.id}: no chips`);
});

KB.forEach(e => {
  e.t.forEach(kw => {
    const found = findEntry(kw);
    if (!found) issues.push(`Trigger "${kw}" → no match`);
    else if (found.id !== e.id) issues.push(`Trigger "${kw}" → ${found.id} (expected ${e.id})`);
  });
});

const allChips = new Set(['Products', 'Services', 'Get a Quote', 'Contact Us']);
KB.forEach(e => e.q.forEach(c => allChips.add(c)));

allChips.forEach(chip => {
  if (!routeKeys.includes(chip)) {
    const entry = findEntry(chip.toLowerCase());
    if (!entry) issues.push(`Chip "${chip}" has no ROUTE and no KB keyword match`);
  }
});

const collisions = [
  ['energy audit', 'energy-audit'],
  ['tech ai software', 'tech-ai'],
  ['ISO quality certification', 'quality'],
  ['product price quote', 'quote'],
  ['milk ghee plant', 'dairy-food'],
  ['milk chilling centre', 'milk-processing'],
  ['bulk milk cooler', 'dairy-food'],
  ['automation PLC chemcad', 'technology'],
  ['I need evaporator quote price', 'quote'],
  ['machine learning AI', 'tech-ai'],
  ['where is your office meerut', 'contact'],
  ['mvr energy saving retrofit', 'energy-audit'],
  ['are you hiring', 'career'],
  ['good job excellent', 'thanks'],
  ['office phone email', 'contact'],
];

collisions.forEach(([input, expected]) => {
  const found = findEntry(input);
  if (!found) issues.push(`Collision: "${input}" → no match`);
  else if (found.id !== expected) warnings.push(`Collision: "${input}" → ${found.id} (expected ${expected})`);
});

// Products parity — categories on products.html filter buttons
const productsHtml = fs.readFileSync(path.join(__dirname, '../products.html'), 'utf8');
const filterCats = [...productsHtml.matchAll(/data-filter="([^"]+)"/g)].map(m => m[1]);
const uniqueFilters = [...new Set(filterCats)].filter(f => f !== 'all');

const kbCategories = {
  evaporators: 'evaporators',
  dryers: 'dryers',
  'heat-transfer': 'heat-exchangers',
  cleaning: 'cip',
  dairy: 'milk-processing',
  'milk-equipment': 'milk-equipment',
  'dairy-food-equipment': 'dairy-food',
  vessels: 'vessels',
  'waste-management': 'waste',
  'tech-ai': 'tech-ai',
};

uniqueFilters.forEach(f => {
  const kbId = kbCategories[f];
  if (!kbId) warnings.push(`products.html filter "${f}" has no mapped KB topic`);
  else if (!KB.find(e => e.id === kbId)) issues.push(`KB missing topic for filter "${f}"`);
});

// Contact parity
const contactHtml = fs.readFileSync(path.join(__dirname, '../contact.html'), 'utf8');
['9870840779', 'info@gausin.in', '250110', 'Pallavpuram'].forEach(s => {
  if (!code.includes(s)) issues.push(`chatbot missing contact detail: ${s}`);
  if (!contactHtml.includes(s) && s !== '9870840779') warnings.push(`contact.html may differ on: ${s}`);
});

console.log('=== GAUSIN CHATBOT STATIC QA ===');
console.log(`KB topics: ${KB.length}`);
console.log(`Triggers tested: ${KB.reduce((n, e) => n + e.t.length, 0)}`);
console.log(`ROUTES: ${routeKeys.length}`);
console.log(`KB chips: ${allChips.size}`);
console.log(`Product filters on site: ${uniqueFilters.join(', ')}`);
console.log('');
console.log(`ISSUES (${issues.length}):`);
issues.forEach(i => console.log('  [FAIL]', i));
console.log('');
console.log(`WARNINGS (${warnings.length}):`);
warnings.forEach(w => console.log('  [WARN]', w));
console.log('');
console.log(issues.length === 0 ? 'RESULT: PASS (no critical static failures)' : 'RESULT: FAIL');
