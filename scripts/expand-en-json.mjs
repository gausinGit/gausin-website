import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const enPath = path.join(ROOT, 'locales', 'en.json');
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'products-map.json'), 'utf8'));
for (const { key, title } of Object.values(products)) {
  en[key] = title;
}

Object.assign(en, {
  'prod.tab.overview': 'Overview',
  'prod.tab.specifications': 'Specifications',
  'prod.tab.applications': 'Applications',
  'prod.tab.advantages': 'Advantages',
  'prod.tab.howItWorks': 'How It Works',
  'prod.section.overview': 'Product Overview',
  'prod.section.technicalSpecs': 'Technical Specifications',
  'prod.section.processParams': 'Process Parameters',
  'prod.section.constructionDetails': 'Construction Details',
  'prod.section.instrumentation': 'Instrumentation & Controls',
  'prod.section.applications': 'Applications',
  'prod.section.advantages': 'Key Advantages',
  'prod.section.howItWorks': 'How It Works',
  'prod.section.related': 'Related Products',
  'prod.viewProduct': 'View Product',
  'prod.sendInquiry': 'Send Inquiry',
  'prod.form.fullName': 'Full Name *',
  'prod.form.company': 'Company *',
  'prod.form.email': 'Email *',
  'prod.form.phone': 'Phone *',
  'prod.form.capacity': 'Required Capacity (L/hr)',
  'prod.form.requirements': 'Brief Requirements',
  'prod.form.placeholder.name': 'Your name',
  'prod.form.placeholder.company': 'Company name',
  'prod.form.placeholder.email': 'you@company.com',
  'prod.form.placeholder.phone': '+91 XXXXX XXXXX',
  'prod.form.placeholder.capacity': 'e.g., 5,000 L/hr',
  'prod.form.placeholder.requirements': 'Product type, feed concentration, target concentration, number of effects...',
  'search.placeholder': 'Search products, services, pages...',
  'search.close': 'Close search',
  'search.emptyTitle': 'No results found',
  'search.emptyDesc': 'Try a different keyword or browse our products.',
  'search.footerHint': 'Search',
  'chat.fab': 'Ask our Assistant',
  'chat.fabAria': 'Ask our Assistant',
  'chat.name': 'Gausin Assistant',
  'chat.sub': 'Online — typically replies instantly',
  'chat.clear': 'Clear chat',
  'chat.close': 'Close',
  'chat.placeholder': 'Type your message…',
  'chat.send': 'Send',
  'mega.milkProcessing': 'Milk Processing',
  'mega.dairyFoodEquipments': 'Dairy & Food Equipments',
});

fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + '\n', 'utf8');
console.log('en.json keys:', Object.keys(en).length);
