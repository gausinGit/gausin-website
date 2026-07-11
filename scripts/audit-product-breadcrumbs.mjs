import fs from 'fs';

const map = {
  evaporators: ['Evaporators'],
  dryers: ['Dryers'],
  'milk-processing': ['Dairy Processing Plants'],
  'milk-equipment': ['Milk Equipment', 'Milk Processing Equipment'],
  'dairy-food-equipment': ['Dairy & Food Plant Equipment', 'Dairy & Food Plant Equipments'],
  'waste-management': ['Waste Management'],
  'heat-exchangers': ['Heat Exchangers'],
  cip: ['CIP & Cleaning Systems'],
  vessels: ['Pressure Vessels & Storage Tanks'],
};

const files = fs.readdirSync('.').filter((f) => f.startsWith('product-') && f.endsWith('.html'));
const issues = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const m = html.match(
    /products\.html#([^"']+)">([^<]+)<\/a>[\s\S]*?prod-category-badge[^>]*>(?:[\s\S]*?<i[^>]*><\/i>\s*)?([^<\n]+)/
  );
  if (!m) {
    issues.push(`${file}: breadcrumb block not found`);
    continue;
  }
  const hash = m[1];
  const crumb = m[2].trim();
  const badge = m[3].trim();
  const expected = map[hash];

  if (crumb !== badge) issues.push(`${file}: crumb != badge (${crumb} vs ${badge})`);
  else if (expected && !expected.includes(crumb)) {
    issues.push(`${file}: hash=${hash} crumb=${crumb} expected one of ${expected.join(' | ')}`);
  }
}

if (issues.length) {
  console.log(issues.join('\n'));
  process.exit(1);
}
console.log(`All ${files.length} product pages OK`);
