/* ============================================================
   GAUSIN — Hybrid Static i18n
   JSON locale files; instant swap, no runtime Google API.
   ============================================================ */
'use strict';

const I18N_RTL = new Set(['ar', 'he']);
const I18N_CACHE = Object.create(null);
const I18N_PAGE_CACHE = Object.create(null);
let _i18nActive = 'en';

const PROD_TAB_KEYS = {
  overview: 'prod.tab.overview',
  specifications: 'prod.tab.specifications',
  applications: 'prod.tab.applications',
  advantages: 'prod.tab.advantages',
  'how-it-works': 'prod.tab.howItWorks',
};

const PROD_HEADING_KEYS = [
  ['.prod-tab-pane h2', {
    'Product Overview': 'prod.section.overview',
    'Technical Specifications': 'prod.section.technicalSpecs',
    'Applications': 'prod.section.applications',
    'Key Advantages': 'prod.section.advantages',
    'How It Works': 'prod.section.howItWorks',
  }],
  ['.prod-tab-pane h3', {
    'Process Parameters': 'prod.section.processParams',
    'Construction Details': 'prod.section.constructionDetails',
    'Instrumentation & Controls': 'prod.section.instrumentation',
  }],
  ['h2.section-title, .related-section h2, section h2', {
    'Related Products': 'prod.section.related',
  }],
];

function _i18nLangAttr(code) {
  if (!code || code === 'en') return 'en';
  if (code.startsWith('zh')) return code;
  return code.split('-')[0];
}

function _i18nPageFile() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function _i18nPageSlug() {
  const page = _i18nPageFile();
  if (page.endsWith('.html') && window.gausinPageSlugFromFile) {
    return window.gausinPageSlugFromFile(page);
  }
  return page.replace(/\.html$/, '');
}

function _i18nProductTitleKey() {
  const page = _i18nPageFile();
  if (!page.startsWith('product-') || !page.endsWith('.html')) return null;
  return 'product.' + page.slice(8, -5).replace(/-/g, '_');
}

function _i18nProductPageSlug() {
  return _i18nPageSlug();
}

async function gausinLoadPageLocale(code, pageFile) {
  const slug = _i18nPageSlug();
  const lang = code || 'en';
  const cacheKey = `${lang}:${slug}`;
  if (I18N_PAGE_CACHE[cacheKey]) return I18N_PAGE_CACHE[cacheKey];

  const loadFile = async (l) => {
    const res = await fetch(`locales/pages/${slug}/${l}.json`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`page locale ${slug}/${l} missing`);
    return res.json();
  };

  let payload = {};
  try {
    if (lang !== 'en') {
      try { payload = await loadFile(lang); } catch { payload = {}; }
    }
    if (lang === 'en' || !Object.keys(payload).length) {
      payload = await loadFile('en');
    } else {
      try {
        const enPayload = await loadFile('en');
        payload = { ...enPayload, ...payload };
      } catch { /* keep partial */ }
    }
  } catch {
    I18N_PAGE_CACHE[cacheKey] = {};
    return I18N_PAGE_CACHE[cacheKey];
  }

  const { _htmlKeys, ...rest } = payload;
  const prefixed = {};
  Object.keys(rest).forEach((k) => {
    prefixed[`${slug}.${k}`] = rest[k];
  });
  if (_htmlKeys) prefixed.__htmlKeys = _htmlKeys;

  I18N_PAGE_CACHE[cacheKey] = prefixed;
  return prefixed;
}

function _i18nResolve(dict, key, fallback) {
  if (dict && dict[key] != null && dict[key] !== '') return dict[key];
  if (I18N_CACHE.en && I18N_CACHE.en[key] != null) return I18N_CACHE.en[key];
  return fallback != null ? fallback : key;
}

async function gausinLoadLocale(code) {
  const lang = code || 'en';
  if (I18N_CACHE[lang]) return I18N_CACHE[lang];

  const loadFile = async (file) => {
    const res = await fetch(`locales/${file}.json`, { cache: 'default' });
    if (!res.ok) throw new Error(`locale ${file} missing`);
    return res.json();
  };

  if (!I18N_CACHE.en) I18N_CACHE.en = await loadFile('en');

  if (lang === 'en') return I18N_CACHE.en;

  try {
    const partial = await loadFile(lang);
    I18N_CACHE[lang] = { ...I18N_CACHE.en, ...partial };
  } catch {
    I18N_CACHE[lang] = I18N_CACHE.en;
  }
  return I18N_CACHE[lang];
}

function _i18nStoreOrig(el, prop) {
  const keys = {
    text: 'i18nOrig',
    aria: 'i18nAriaOrig',
    title: 'i18nTitleOrig',
    placeholder: 'i18nPlaceholderOrig',
  };
  const dataKey = keys[prop];
  if (!dataKey || el.dataset[dataKey] != null) return;
  if (prop === 'text') el.dataset[dataKey] = el.textContent;
  else if (prop === 'aria') el.dataset[dataKey] = el.getAttribute('aria-label') || '';
  else if (prop === 'title') el.dataset[dataKey] = el.getAttribute('title') || '';
  else if (prop === 'placeholder') el.dataset[dataKey] = el.getAttribute('placeholder') || '';
}

function _i18nTag(el, attr, key) {
  if (!el || el.hasAttribute(attr)) return;
  el.setAttribute(attr, key);
}

function gausinPatchDomForI18n() {
  document.querySelectorAll('.prod-tab[data-tab]').forEach((btn) => {
    const key = PROD_TAB_KEYS[btn.dataset.tab];
    if (key) _i18nTag(btn, 'data-i18n', key);
  });

  document.querySelectorAll('.prod-breadcrumb a[href="index.html"]').forEach((a) => {
    _i18nTag(a, 'data-i18n', 'nav.home');
  });
  document.querySelectorAll('.prod-breadcrumb a[href="products.html"]').forEach((a) => {
    _i18nTag(a, 'data-i18n', 'nav.products');
  });

  document.querySelectorAll('.related-title, a.related-link, .related-card a.btn').forEach((el) => {
    const t = el.textContent.trim();
    if (t === 'View Product') _i18nTag(el, 'data-i18n', 'prod.viewProduct');
  });

  document.querySelectorAll('.prod-sidebar button[type="submit"], .prod-inquiry button[type="submit"]').forEach((el) => {
    _i18nTag(el, 'data-i18n', 'prod.sendInquiry');
  });

  const formMap = [
    ['label[for*="name" i], .prod-form label:first-of-type', 'prod.form.fullName'],
    ['input[name="name"], input[placeholder="Your name"]', 'prod.form.placeholder.name', 'placeholder'],
    ['input[placeholder="Company name"]', 'prod.form.placeholder.company', 'placeholder'],
    ['input[placeholder="you@company.com"]', 'prod.form.placeholder.email', 'placeholder'],
    ['input[placeholder="+91 XXXXX XXXXX"]', 'prod.form.placeholder.phone', 'placeholder'],
    ['input[placeholder*="5,000"]', 'prod.form.placeholder.capacity', 'placeholder'],
    ['textarea[placeholder*="Product type"]', 'prod.form.placeholder.requirements', 'placeholder'],
  ];

  document.querySelectorAll('label').forEach((label) => {
    const t = label.textContent.trim();
    if (t.startsWith('Full Name')) _i18nTag(label, 'data-i18n', 'prod.form.fullName');
    else if (t.startsWith('Company')) _i18nTag(label, 'data-i18n', 'prod.form.company');
    else if (t.startsWith('Email')) _i18nTag(label, 'data-i18n', 'prod.form.email');
    else if (t.startsWith('Phone')) _i18nTag(label, 'data-i18n', 'prod.form.phone');
    else if (t.startsWith('Required Capacity')) _i18nTag(label, 'data-i18n', 'prod.form.capacity');
    else if (t.startsWith('Brief Requirements')) _i18nTag(label, 'data-i18n', 'prod.form.requirements');
  });

  formMap.forEach(([sel, key, kind]) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (kind === 'placeholder') _i18nTag(el, 'data-i18n-placeholder', key);
      else _i18nTag(el, 'data-i18n', key);
    });
  });

  PROD_HEADING_KEYS.forEach(([sel, map]) => {
    document.querySelectorAll(sel).forEach((el) => {
      const t = el.textContent.trim();
      if (map[t]) _i18nTag(el, 'data-i18n', map[t]);
    });
  });

  const searchOverlay = document.getElementById('siteSearchOverlay');
  if (searchOverlay && !searchOverlay.dataset.i18nPatched) {
    searchOverlay.dataset.i18nPatched = '1';
    const inp = searchOverlay.querySelector('#siteSearchInput');
    if (inp) _i18nTag(inp, 'data-i18n-placeholder', 'search.placeholder');
    searchOverlay.querySelectorAll('[aria-label="Close search"]').forEach((el) => {
      _i18nTag(el, 'data-i18n-aria', 'search.close');
    });
    searchOverlay.querySelectorAll('.site-search-empty p').forEach((p, i) => {
      _i18nTag(p, 'data-i18n', i === 0 ? 'search.emptyTitle' : 'search.emptyDesc');
    });
    searchOverlay.querySelectorAll('.site-search-footer span').forEach((span) => {
      if (span.textContent.includes('Search')) _i18nTag(span, 'data-i18n', 'search.footerHint');
    });
  }

  const gcFab = document.getElementById('gcFab');
  if (gcFab && !gcFab.dataset.i18nPatched) {
    gcFab.dataset.i18nPatched = '1';
    _i18nTag(gcFab, 'data-i18n-aria', 'chat.fabAria');
    const tip = gcFab.querySelector('.gchat-fab-tooltip');
    if (tip) _i18nTag(tip, 'data-i18n', 'chat.fab');
  }
  const gcWin = document.getElementById('gcWin');
  if (gcWin && !gcWin.dataset.i18nPatched) {
    gcWin.dataset.i18nPatched = '1';
    const name = gcWin.querySelector('.gchat-hd-name');
    const sub = gcWin.querySelector('.gchat-hd-sub');
    const inp = gcWin.querySelector('#gcInp');
    const send = gcWin.querySelector('#gcSend');
    const clr = gcWin.querySelector('#gcClear');
    const cls = gcWin.querySelector('#gcClose');
    if (name) _i18nTag(name, 'data-i18n', 'chat.name');
    if (sub) _i18nTag(sub, 'data-i18n', 'chat.sub');
    if (inp) _i18nTag(inp, 'data-i18n-placeholder', 'chat.placeholder');
    if (send) _i18nTag(send, 'data-i18n-aria', 'chat.send');
    if (clr) _i18nTag(clr, 'data-i18n-title', 'chat.clear');
    if (cls) _i18nTag(cls, 'data-i18n-aria', 'chat.close');
  }

  document.querySelectorAll('h2').forEach((el) => {
    if (el.textContent.trim() === 'Related Products') _i18nTag(el, 'data-i18n', 'prod.section.related');
  });

  const btt = document.getElementById('backToTop');
  if (btt && !btt.hasAttribute('data-i18n-aria')) {
    _i18nTag(btt, 'data-i18n-aria', 'aria.backToTop');
  }
}

function _i18nRestoreAll() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    if (el.dataset.i18nOrig != null) el.textContent = el.dataset.i18nOrig;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    if (el.dataset.i18nAriaOrig != null) el.setAttribute('aria-label', el.dataset.i18nAriaOrig);
  });
  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    if (el.dataset.i18nTitleOrig != null) {
      if (el.dataset.i18nTitleOrig) el.setAttribute('title', el.dataset.i18nTitleOrig);
      else el.removeAttribute('title');
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    if (el.dataset.i18nPlaceholderOrig != null) el.setAttribute('placeholder', el.dataset.i18nPlaceholderOrig);
  });
  document.querySelectorAll('.prod-title').forEach((el) => {
    if (el.dataset.gausinTitleOrig != null) el.innerHTML = el.dataset.gausinTitleOrig;
  });
  const slug = _i18nPageSlug();
  if (slug && window.gausinRestorePageContent) window.gausinRestorePageContent(slug);

  document.documentElement.lang = 'en';
  document.documentElement.removeAttribute('dir');
  _i18nActive = 'en';
}

function gausinApplyDict(dict) {
  gausinPatchDomForI18n();

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    _i18nStoreOrig(el, 'text');
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    el.textContent = _i18nResolve(dict, key, el.dataset.i18nOrig);
  });

  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    _i18nStoreOrig(el, 'aria');
    const key = el.getAttribute('data-i18n-aria');
    if (!key) return;
    el.setAttribute('aria-label', _i18nResolve(dict, key, el.dataset.i18nAriaOrig));
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    _i18nStoreOrig(el, 'title');
    const key = el.getAttribute('data-i18n-title');
    if (!key) return;
    const val = _i18nResolve(dict, key, el.dataset.i18nTitleOrig);
    if (val) el.setAttribute('title', val);
    else el.removeAttribute('title');
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    _i18nStoreOrig(el, 'placeholder');
    const key = el.getAttribute('data-i18n-placeholder');
    if (!key) return;
    el.setAttribute('placeholder', _i18nResolve(dict, key, el.dataset.i18nPlaceholderOrig));
  });

  const titleKey = _i18nProductTitleKey();
  if (titleKey) {
    document.querySelectorAll('.prod-title').forEach((el) => {
      if (!el.dataset.gausinTitleOrig) el.dataset.gausinTitleOrig = el.innerHTML;
      const val = _i18nResolve(dict, titleKey, el.textContent.replace(/\s+/g, ' ').trim());
      el.textContent = val;
    });
    document.querySelectorAll('.prod-breadcrumb .current').forEach((el) => {
      _i18nStoreOrig(el, 'text');
      el.textContent = _i18nResolve(dict, titleKey, el.dataset.i18nOrig);
    });
  }
}

async function gausinApplyI18n(code) {
  const lang = code || 'en';
  if (lang === 'en') {
    _i18nRestoreAll();
    return;
  }

  const dict = await gausinLoadLocale(lang);
  gausinApplyDict(dict);

  const slug = _i18nPageSlug();
  if (slug) {
    delete I18N_PAGE_CACHE[`${lang}:${slug}`];
    for (let i = 0; i < 80 && !window.gausinApplyPageContent; i++) {
      await new Promise((r) => setTimeout(r, 25));
    }
    if (window.gausinApplyPageContent) {
      try {
        const pageDict = await gausinLoadPageLocale(lang, _i18nPageFile());
        if (Object.keys(pageDict).length) window.gausinApplyPageContent(pageDict, slug);
      } catch { /* no page locale */ }
    }
  }

  document.documentElement.lang = _i18nLangAttr(lang);
  if (I18N_RTL.has(lang.split('-')[0])) document.documentElement.setAttribute('dir', 'rtl');
  else document.documentElement.removeAttribute('dir');
  _i18nActive = lang;
}

window.gausinApplyI18n = gausinApplyI18n;
window.gausinLoadLocale = gausinLoadLocale;
window.gausinLoadPageLocale = gausinLoadPageLocale;
window.gausinPatchDomForI18n = gausinPatchDomForI18n;
window.gausinGetLang = () => _i18nActive;
