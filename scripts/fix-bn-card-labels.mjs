/**
 * Localize short Bengali labels (tags, badges, pills, card chips) — remove English acronyms.
 * Run: node scripts/fix-bn-card-labels.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const TAG_KEY = /\.(tag|badge|pill|stat\.[0-9]+\.(val|lbl)|prod\.badge|prod\.specLabel|prod\.specVal|fp\.tag|ind\.tag|tech\.pill|filter\.btn|cat\.count|ins\.link|ins\.tag|map\.link|fp\.link|card\.link|btn\.|hero\.stat|mega\.|footer\.|product\.|prod\.title|prod\.app|glass\.title|overview\.adv\.[0-9]+\.title|related\.[0-9]+\.title|related\.[0-9]+\.desc|hero\.stat\.[0-9]+\.(val|label))/i;
const CARD_KEY = /^(fp\.(tag|title|desc)|industry\.(title|desc)|card\.(title|desc|link)|tech\.pill|ind\.tag|float\.sub|prod\.title|prod\.badge|ins\.tag|map\.link)/;

const REPL = [
  ['Biogas/CNG', 'বায়োগ্যাস / প্রাকৃতিক গ্যাস'],
  ['বায়োগ্যাস/সিএনজি', 'বায়োগ্যাস / প্রাকৃতিক গ্যাস'],
  ['ETP/STP ট্রিটমেন্ট প্ল্যান্ট', 'বর্জ্য/নিকাশ জল পরিশোধন'],
  ['ETP/STP ট্রিটমেন্ট প্ল্যান্ট', 'বর্জ্য/নিকাশ জল পরিশোধন'],
  ['ETP/STP', 'বর্জ্য/নিকাশ জল'],
  ['ইটিপি/এসটিপি', 'বর্জ্য/নিকাশ জল'],
  ['ETP ', 'বর্জ্য জল '],
  ['ASME Sec. VIII', 'চাপ পাত্র মান'],
  ['ASME Section VIII', 'চাপ পাত্র মান'],
  ['ASME VIII', 'চাপ পাত্র মান'],
  ['ASME/IBR', 'চাপ পাত্র মান'],
  ['ASME ', 'চাপ পাত্র মান '],
  ['IBR Approved', 'বয়লার নিয়ম অনুমোদিত'],
  ['IBR অনুমোদিত', 'বয়লার নিয়ম অনুমোদিত'],
  ['IBR ', 'বয়লার নিয়ম '],
  ['SS 304 / SS 316L / Ti / Hastelloy', 'অকরো ধাতু 304 / 316L / Ti / Hastelloy'],
  ['SS 304 / SS 316L / Ti', 'অকরো ধাতু 304 / 316L / Ti'],
  ['SS 304 / SS 316L / Duplex SS', 'অকরো ধাতু 304 / 316L / Duplex'],
  ['SS 304 / SS 316L /', 'অকরো ধাতু 304 / 316L /'],
  ['SS 304 / SS 316L', 'অকরো ধাতু 304 / 316L'],
  ['SS 316L/FRP/PP', 'অকরো ধাতু 316L / FRP / PP'],
  ['SS 316L/FRP/PP', 'অকরো ধাতু 316L / FRP / PP'],
  ['SS 316L ইনার', 'অকরো ধাতু 316L অভ্যন্তর'],
  ['SS 316L মিরর', 'অকরো ধাতু 316L আয়না'],
  ['SS 316L', 'অকরো ধাতু 316L'],
  ['SS 316L/', 'অকরো ধাতু 316L /'],
  ['SS ট্যাঙ্ক', 'অকরো ধাতু ট্যাঙ্ক'],
  ['CIP Capable', 'স্থানে পরিষ্কার'],
  ['CIP Systems', 'স্থানে পরিষ্কার ব্যবস্থা'],
  ['CIP সক্ষম', 'স্থানে পরিষ্কার'],
  ['CIP/SIP', 'স্থানে/বাষ্প পরিষ্কার'],
  ['CIP ', 'স্থানে পরিষ্কার '],
  ['সিআইপি ', 'স্থানে পরিষ্কার '],
  ['TEMA Standard', 'তাপ বিনিময় মান'],
  ['TEMA স্ট্যান্ডার্ড', 'তাপ বিনিময় মান'],
  ['TEMA/', 'তাপ বিনিময় মান/'],
  ['TEMA ', 'তাপ বিনিময় মান '],
  ['Turnkey ', 'সম্পূর্ণ সমাধান '],
  ['Turnkey', 'সম্পূর্ণ সমাধান'],
  ['টার্নকি', 'সম্পূর্ণ সমাধান'],
  ['Pasteurizer', 'পাস্তুরাইজার'],
  ['Nozzle Type', 'নজল প্রকার'],
  ['Rotary Disc', 'ঘূর্ণি ডিস্ক'],
  ['GMP Grade', 'স্বাস্থ্য মান গ্রেড'],
  ['GMP-Grade', 'স্বাস্থ্য মান গ্রেড'],
  ['GMP ', 'স্বাস্থ্য মান '],
  ['জিএমপি ', 'স্বাস্থ্য মান '],
  ['Mirror Polish', 'আয়না পালিশ'],
  ['মিরর পোলিশ', 'আয়না পালিশ'],
  ['Custom Design', 'অভিযোজিত নকশা'],
  ['কাস্টম ডিজাইন', 'অভিযোজিত নকশা'],
  ['CPCB Compliant', 'দূষণ নিয়ন্ত্রণ অনুগত'],
  ['CPCB অনুগত', 'দূষণ নিয়ন্ত্রণ অনুগত'],
  ['CPCB ', 'দূষণ নিয়ন্ত্রণ '],
  ['Kraft ', 'ক্রাফট '],
  ['API প্রসেসিং', 'ফার্মা উপাদান প্রক্রিয়াকরণ'],
  ['API ', 'ফার্মা উপাদান '],
  ['DWGS', 'পর্দা নির্মাণ'],
  ['ZLD সিস্টেম', 'শূন্য তরল নিষ্কাশন'],
  ['ZLD/', 'শূন্য তরল নিষ্কাশন/'],
  ['ZLD', 'শূন্য তরল নিষ্কাশন'],
  ['UHT প্রসেসিং', 'অতি উচ্চ তাপ প্রক্রিয়াকরণ'],
  ['UHT', 'অতি উচ্চ তাপ'],
  ['ইউএইচটি', 'অতি উচ্চ তাপ'],
  ['HTST / LTLT', 'উচ্চ/নিম্ন তাপ পাস্তুর'],
  ['HTST', 'উচ্চ তাপ স্বল্প সময়'],
  ['LTLT', 'নিম্ন তাপ দীর্ঘ সময়'],
  ['TVR', 'তাপীয় বাষ্প'],
  ['MVR', 'যান্ত্রিক বাষ্প'],
  ['টিভিআর', 'তাপীয় বাষ্প'],
  ['এমভিআর', 'যান্ত্রিক বাষ্প'],
  ['Thermo Vapor Recompressor (TVR)', 'তাপীয় বাষ্প পুনঃসংকোচন'],
  ['FSSAI', 'খাদ্য নিরাপত্তা'],
  ['WHO', 'বিশ্ব স্বাস্থ্য'],
  ['HACCP', 'খাদ্য নিরাপত্তা ব্যবস্থা'],
  ['PHE', 'প্লেট তাপ বিনিময়'],
  ['FBD', 'বাতাসে শুষ্ককরণ'],
  ['PLC/SCADA', 'প্রক্রিয়া নিয়ন্ত্রণ ব্যবস্থা'],
  ['IoT', 'ইন্টারনেট সংযুক্ত'],
  ['SS 304 / 316L', 'অকরো ধাতু 304 / 316L'],
  ['SS 304 কাঠামো', 'অকরো ধাতু 304 কাঠামো'],
  ['GMP উপলব্ধ', 'স্বাস্থ্য মান উপলব্ধ'],
  ['অটো CIP', 'অটো স্থানে পরিষ্কার'],
  ['এএসএমই/', 'চাপ পাত্র মান/'],
  ['এএসএমই', 'চাপ পাত্র মান'],
  ['আইবিআর', 'বয়লার নিয়ম'],
  ['সিপিসিবি', 'দূষণ নিয়ন্ত্রণ'],
  ['জিএমপি', 'স্বাস্থ্য মান'],
  ['সিআইপি/এসআইপি', 'স্থানে/বাষ্প পরিষ্কার'],
  ['সিআইপি', 'স্থানে পরিষ্কার'],
  ['জেডএলডি', 'শূন্য তরল নিষ্কাশন'],
  ['ইটিপি', 'বর্জ্য জল'],
  ['পিএইচই', 'প্লেট তাপ বিনিময়'],
  ['পিএলসি', 'প্রক্রিয়া নিয়ন্ত্রণ'],
  ['এইচএসিসিপি', 'খাদ্য নিরাপত্তা ব্যবস্থা'],
  ['WTP/UF/RO/', 'পানি পরিশোধন/'],
  ['WTP/UF/RO', 'পানি পরিশোধন'],
  [' (BMC)', ' (বাল্ক দুধ শীতলক)'],
  [' Silos', ' সাইলো'],
  ['ডিএক্স কুলিং', 'প্রত্যক্ষ শীতলকরণ'],
  ['এইচটিএসটি/এলটিএলটি', 'উচ্চ/নিম্ন তাপ পাস্তুর'],
  ['সিআইপি প্রস্তুত', 'স্থানে পরিষ্কার প্রস্তুত'],
  ['Thermo Vapor Recompressor', 'তাপীয় বাষ্প পুনঃসংকোচন'],
  ['Mechanical Vapor Recompression', 'যান্ত্রিক বাষ্প পুনঃসংকোচন'],
  ['NDT', 'অ-ধ্বংসাত্মক পরীক্ষা'],
  ['PED/', 'চাপ সরঞ্জাম নির্দেশিকা/'],
  ['3-A', 'স্বাস্থ্যকর ডিজাইন'],
  ['BIS', 'ভারতীয় মান'],
  ['CE', 'ইউরোপীয় মান'],
  ['FRP', 'ফাইবার প্লাস্টিক'],
  ['PP', 'পলিপ্রোপিলিন'],
  ['Ti', 'টাইটানিয়াম'],
  ['Duplex', 'দ্বৈত ধাতু'],
  ['Hastelloy', 'হ্যাস্টেলয়'],
  ['PLC', 'প্রক্রিয়া নিয়ন্ত্রণ'],
  ['SCADA', 'নিয়ন্ত্রণ ব্যবস্থা'],
  ['MCC', 'দুধ সংগ্রহ কেন্দ্র'],
  ['DX', 'প্রত্যক্ষ সম্প্রসারণ'],
  ['UF/RO', 'অলট্রা/রিভার্স অসমosis'],
  ['ATFD', 'পাতলা ফিল্ম শুষ্ককরণ'],
  ['এটিএফডি', 'পাতলা ফিল্ম শুষ্ককরণ'],
  ['CNG', 'প্রাকৃতিক গ্যাস'],
  ['সিএনজি', 'প্রাকৃতিক গ্যাস'],
  ['Clean-in-Place', 'স্থানে পরিষ্কার'],
  ['ক্লিন-ইন-প্লেস', 'স্থানে পরিষ্কার'],
  ['ETP/STP সমাধান', 'বর্জ্য/নিকাশ জল সমাধান'],
  ['টেমা', 'তাপ বিনিময় মান'],
  ['এসএস 304', 'অকরো ধাতু 304'],
  ['বিএমসি', 'বাল্ক দুধ শীতলক'],
];

const EXACT = {
  'fp.tag.0': 'তাপীয় বাষ্প',
  'fp.tag.1': 'যান্ত্রিক বাষ্প',
  'fp.tag.2': 'স্থানে পরিষ্কার',
  'fp.tag.3': 'নজল প্রকার',
  'fp.tag.4': 'ঘূর্ণি ডিস্ক',
  'fp.tag.5': 'স্বাস্থ্য মান গ্রেড',
  'fp.tag.6': 'পাস্তুরাইজার',
  'fp.tag.7': 'অতি উচ্চ তাপ',
  'fp.tag.8': 'সম্পূর্ণ সমাধান',
  'fp.tag.9': 'বর্জ্য/নিকাশ জল',
  'fp.tag.10': 'বায়োগ্যাস / প্রাকৃতিক গ্যাস',
  'fp.tag.11': 'দূষণ নিয়ন্ত্রণ অনুগত',
  'fp.tag.12': 'চাপ পাত্র মান',
  'fp.tag.13': 'বয়লার নিয়ম অনুমোদিত',
  'fp.tag.14': 'আয়না পালিশ',
  'fp.tag.15': 'তাপ বিনিময় মান',
  'fp.tag.16': 'অকরো ধাতু 316L',
  'fp.tag.17': 'অভিযোজিত নকশা',
  'fp.title.4': 'অকরো ধাতু ট্যাঙ্ক ও চাপ পাত্র',
  'ins.tag.0': 'তাপীয় বাষ্প',
  'ins.tag.1': 'তাপীয় সংকোচক',
  'ins.tag.2': 'বাষ্পীভবন',
  'ins.tag.7': 'সম্পূর্ণ সমাধান',
  'ins.tag.9': 'শূন্য তরল নিষ্কাশন',
  'ins.tag.12': 'দূষণ নিয়ন্ত্রণ',
  'ins.tag.14': 'স্থানে/বাষ্প পরিষ্কার',
  'ins.tag.15': 'স্বাস্থ্য মান',
  'ins.tag.24': 'প্লেট তাপ বিনিময়',
  'ins.tag.30': 'বর্জ্য জল',
  'ins.tag.31': 'শূন্য তরল নিষ্কাশন',
  'ins.tag.32': 'দূষণ নিয়ন্ত্রণ',
  'ins.tag.35': 'স্বাস্থ্য মান',
  'ins.tag.41': 'স্থানে পরিষ্কার',
  'ins.tag.43': 'খাদ্য নিরাপত্তা',
  'ins.tag.46': 'বয়লার নিয়ম',
  'ins.tag.47': 'চাপ পাত্র মান',
  'footer.etpStp': 'বর্জ্য/নিকাশ জল পরিশোধন',
  'product.etp_stp_treatment_plants': 'বর্জ্য/নিকাশ জল পরিশোধন',
  'product.pressure_vessels_asme_ibr': 'প্রেসার ভেসেল (চাপ পাত্র মান)',
  'mega.cip': 'স্থানে পরিষ্কার সিস্টেম',
  'mega.cipDesc': 'স্থানে পরিষ্কার অটোমেশন',
  'mega.vesselsDesc': 'অকরো ধাতু ট্যাঙ্ক, চাপ পাত্র',
  'mega.dairyFoodDesc': 'দুধ ক্যান কনভেয়ার, বাল্ক দুধ শীতলক, স্ফটিককরণ ট্যাঙ্ক',
  'mega.wasteManagementDesc': 'বর্জ্য/নিকাশ জল, বায়োগ্যাস, স্ক্রাবার, ইনসিনারেটর',
  'product.biogas_and_cng_plant': 'বায়োগ্যাস ও প্রাকৃতিক গ্যাস প্ল্যান্ট',
  'ins.link.8': 'বর্জ্য/নিকাশ জল সমাধান',
  'ins.link.11': 'স্থানে পরিষ্কার সিস্টেম দেখুন',
};

function shouldTouch(key) {
  if (/^(prod\.specVal|ins\.tag|ins\.link|hero\.stat|map\.link|product\.|footer\.|mega\.|ind\.tag|fp\.tag|fp\.title|prod\.title|prod\.badge|filter\.btn|related\.[0-9]+\.(title|desc))/.test(key)) return true;
  return TAG_KEY.test(key) || CARD_KEY.test(key);
}

function applyReplacements(value) {
  let out = value;
  for (const [from, to] of REPL) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

function patchObject(obj, rel, changed) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('_') || typeof value !== 'string') continue;
    let next = value;
    if (EXACT[key]) next = EXACT[key];
    else if (shouldTouch(key)) next = applyReplacements(value);
    if (next !== value) {
      obj[key] = next;
      changed.push(`${rel} → ${key}`);
    }
  }
}

function collectBnFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectBnFiles(full, out);
    else if (entry.name === 'bn.json') out.push(full);
  }
  return out;
}

const files = [
  path.join(ROOT, 'locales', 'bn.json'),
  ...collectBnFiles(path.join(ROOT, 'locales', 'pages')),
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
