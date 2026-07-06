/* ============================================================
   GAUSIN INTERNATIONAL ENGINEERS PVT. LTD.
   Shared Components — Auto-inject Navbar, Footer, WhatsApp, Cookie
   ============================================================ */

'use strict';

(function injectFavicon() {
  if (document.querySelector('link[data-gausin-favicon]')) return;
  const head = document.head;
  if (!head) return;
  [
    { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
    { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/images/favicon-48x48.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
  ].forEach(({ rel, type, sizes, href }) => {
    const link = document.createElement('link');
    link.rel = rel;
    if (type) link.type = type;
    if (sizes) link.sizes = sizes;
    link.href = href;
    link.setAttribute('data-gausin-favicon', '1');
    head.appendChild(link);
  });
})();

const SEARCH_ICON_SVG = '<svg class="site-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><line x1="16.65" y1="16.65" x2="21" y2="21"></line></svg>';

/* ─── Social profile URLs ─────────────────────────────────── */
const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/gausin-international-engineers-pvt-ltd',
  x: 'https://x.com/Gausin_117',
  instagram: 'https://www.instagram.com/gausin_117/',
  youtube: 'https://www.youtube.com/@GausinInternationalEngineersPv',
  facebook: 'https://www.facebook.com/profile.php?id=61590538293790',
};

const PRODUCT_MOBILE_LINKS = [
  { href: 'products.html', label: 'All Products', icon: 'fa-border-all' },
  { href: 'products.html#evaporators', label: 'Evaporators', icon: 'fa-droplet' },
  { href: 'products.html#dryers', label: 'Dryers', icon: 'fa-wind' },
  { href: 'products.html#heat-exchangers', label: 'Heat Exchangers', icon: 'fa-temperature-high' },
  { href: 'products.html#cip', label: 'CIP Systems', icon: 'fa-recycle' },
  { href: 'products.html#milk-processing', label: 'Dairy Processing', icon: 'fa-flask' },
  { href: 'products.html#vessels', label: 'Pressure Vessels & Tanks', icon: 'fa-database' },
  { href: 'products.html#milk-equipment', label: 'Milk Equipment', icon: 'fa-jar' },
  { href: 'products.html#dairy-food-equipment', label: 'Dairy & Food Equipment', icon: 'fa-industry' },
  { href: 'products.html#waste-management', label: 'Waste Management', icon: 'fa-leaf' },
];

/* ─── Detect current page for active nav link ─────────────── */
const _page = (() => {
  const p = window.location.pathname.split('/').pop() || 'index.html';
  return p === '' ? 'index.html' : p;
})();

/* ─── Mega Menu Config ────────────────────────────────────── */
const CHEVRON_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';

const SECONDARY_MEGA_MENUS = [
  {
    pageHref: 'services.html',
    navLabel: 'Services',
    headerIcon: 'fa-screwdriver-wrench',
    headerTitle: 'Engineering Services',
    headerDesc: 'End-to-End Project Delivery',
    items: [
      { href: 'services.html#process-design',        icon: 'fa-drafting-compass',  title: 'Process Design',         desc: 'Simulation, P&ID, Equipment Sizing' },
      { href: 'services.html#detailed-engineering',  icon: 'fa-ruler-combined',    title: 'Detailed Engineering',   desc: '3D CAD, Piping, Instrumentation' },
      { href: 'services.html#turnkey-execution',     icon: 'fa-project-diagram',   title: 'Turnkey Execution',      desc: 'Planning, Commissioning, Handover' },
      { href: 'services.html#energy-optimization',   icon: 'fa-bolt',              title: 'Energy Optimization',    desc: 'MVR, Heat Recovery, Audits' },
      { href: 'services.html#automation-control',    icon: 'fa-robot',             title: 'Automation & Control',   desc: 'PLC/SCADA, IoT Integration' },
      { href: 'services.html#consultancy',           icon: 'fa-headset',           title: 'Technical Consultancy',  desc: 'Troubleshooting, De-Bottlenecking' },
    ],
  },
  {
    pageHref: 'industries.html',
    navLabel: 'Industries',
    headerIcon: 'fa-building',
    headerTitle: 'Industries We Serve',
    headerDesc: 'Sector-Specific Engineering Solutions',
    items: [
      { href: 'industries.html#dairy',    icon: 'fa-cow',          title: 'Dairy Industry',    desc: 'Dairy Processing, Evaporators' },
      { href: 'industries.html#pharma',   icon: 'fa-pills',        title: 'Pharmaceutical',    desc: 'GMP-Compliant Systems' },
      { href: 'industries.html#chemical', icon: 'fa-flask-vial',   title: 'Chemical Industry', desc: 'Process Plants, Reactors' },
      { href: 'industries.html#food',     icon: 'fa-utensils',     title: 'Food Processing',   desc: 'Hygienic Plant Solutions' },
      { href: 'industries.html',          icon: 'fa-wine-bottle',  title: 'Distillery',        desc: 'Evaporation, Dehydration' },
      { href: 'industries.html',          icon: 'fa-bolt-lightning',title: 'Energy & More',    desc: 'Paper, Textile, Energy Sectors' },
    ],
  },
  {
    pageHref: 'technology.html',
    navLabel: 'Technology',
    headerIcon: 'fa-microchip',
    headerTitle: 'Technology & Innovation',
    headerDesc: 'Advanced Tools and Manufacturing',
    items: [
      { href: 'technology.html#process-simulation', icon: 'fa-atom',             title: 'Process Simulation',    desc: 'CHEMCAD, Mass & Energy Balance' },
      { href: 'technology.html#process-simulation', icon: 'fa-fire-flame-curved',title: 'Thermal Design',        desc: 'HTRI Xchanger Suite' },
      { href: 'technology.html#process-simulation', icon: 'fa-pen-ruler',        title: 'CAD & 3D Design',       desc: 'AutoCAD, P&IDs, Plant Layout' },
      { href: 'technology.html#fabrication',        icon: 'fa-industry',         title: 'Fabrication Technology',desc: 'CNC, TIG/MIG Welding, NDT' },
      { href: 'technology.html#automation-iot',     icon: 'fa-sliders',          title: 'PLC/SCADA Automation',  desc: 'Control Panels, HMI Systems' },
      { href: 'technology.html#automation-iot',     icon: 'fa-satellite-dish',   title: 'IoT & Remote Monitoring',desc: 'Cloud Analytics, Diagnostics' },
    ],
  },
  {
    pageHref: 'tech-ai.html',
    navLabel: 'Digital Solutions',
    items: [
      { href: 'tech-ai.html#ai-solutions', icon: 'fa-brain', title: 'AI Solutions', desc: 'Machine Learning & AI Systems' },
      { href: 'tech-ai.html#web-development', icon: 'fa-code', title: 'Web Development', desc: 'Websites & Web Applications' },
      { href: 'tech-ai.html#mobile-apps', icon: 'fa-mobile-screen', title: 'Mobile App Development', desc: 'iOS & Android Applications' },
      { href: 'tech-ai.html#desktop-apps', icon: 'fa-desktop', title: 'Desktop Applications', desc: 'Cross-Platform Desktop Software' },
      { href: 'tech-ai.html#business-automation', icon: 'fa-gears', title: 'Business Process Automation', desc: 'Workflow & Process Automation' },
      { href: 'tech-ai.html#cloud', icon: 'fa-cloud', title: 'Cloud Solutions', desc: 'Cloud Deployment & Migration' },
      { href: 'tech-ai.html#custom-software', icon: 'fa-laptop-code', title: 'Custom Software Development', desc: 'Tailored Software Solutions' },
    ],
  },
];

function buildMegaMenuHtml(menu) {
  const items = menu.items.map((item) => `
    <a href="${item.href}" class="mega-menu-item">
      <div class="mega-menu-item-icon"><i class="fa-solid ${item.icon}"></i></div>
      <div><div class="mega-menu-item-title">${item.title}</div><div class="mega-menu-item-desc">${item.desc}</div></div>
    </a>
  `).join('');
  return `
    <div class="mega-menu">
      <div class="mega-menu-grid">${items}</div>
    </div>
  `;
}

function buildNavItemHtml(menu, currentPage) {
  return `
    <div class="nav-item">
      <a href="${menu.pageHref}" class="nav-link${currentPage === menu.pageHref ? ' active' : ''}">
        ${menu.navLabel}
        ${CHEVRON_SVG}
      </a>
      ${buildMegaMenuHtml(menu)}
    </div>
  `;
}

const OUR_CLIENTS_HREF = 'our-clients.html';
const OUR_CLIENTS_LABEL = 'Our Clients';

function buildSimpleNavItemHtml(href, label, currentPage) {
  return `
    <div class="nav-item">
      <a href="${href}" class="nav-link${currentPage === href ? ' active' : ''}">${label}</a>
    </div>
  `;
}

function buildSecondaryNavItems(currentPage) {
  return SECONDARY_MEGA_MENUS.map((menu) => {
    if (menu.pageHref === 'technology.html') {
      return buildSimpleNavItemHtml(OUR_CLIENTS_HREF, OUR_CLIENTS_LABEL, currentPage) + buildNavItemHtml(menu, currentPage);
    }
    return buildNavItemHtml(menu, currentPage);
  }).join('');
}

function injectMissingOurClientsNav() {
  if (document.querySelector(`.navbar-nav .nav-item > a.nav-link[href="${OUR_CLIENTS_HREF}"]`)) return;
  const techItem = document.querySelector('.navbar-nav .nav-item > a.nav-link[href="technology.html"]')?.closest('.nav-item');
  if (!techItem) return;
  techItem.insertAdjacentHTML('beforebegin', buildSimpleNavItemHtml(OUR_CLIENTS_HREF, OUR_CLIENTS_LABEL, _page));
}

function injectMissingOurClientsMobileLink() {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav || mobileNav.querySelector(`a[href="${OUR_CLIENTS_HREF}"]`)) return;
  const techLink = mobileNav.querySelector('a[href="technology.html"]');
  const color = _page === OUR_CLIENTS_HREF ? 'var(--blue-500)' : 'var(--gray-800)';
  const html = `<a href="${OUR_CLIENTS_HREF}" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${color};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">${OUR_CLIENTS_LABEL}</a>`;
  if (techLink) {
    techLink.insertAdjacentHTML('beforebegin', html);
    return;
  }
  injectMobileNavLink(OUR_CLIENTS_HREF, OUR_CLIENTS_LABEL);
}

function injectMissingSecondaryNavItems() {
  const contactItem = document.querySelector('.navbar-nav .nav-item > a.nav-link[href="contact.html"]')?.closest('.nav-item');
  if (!contactItem) return;
  SECONDARY_MEGA_MENUS.forEach((menu) => {
    if (document.querySelector(`.navbar-nav .nav-item > a.nav-link[href="${menu.pageHref}"]`)) return;
    contactItem.insertAdjacentHTML('beforebegin', buildNavItemHtml(menu, _page));
  });
}

function injectMobileNavLink(href, label) {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav || mobileNav.querySelector(`a[href="${href}"]`)) return;
  const contactLink = mobileNav.querySelector('a[href="contact.html"]');
  if (!contactLink) return;
  const color = _page === href ? 'var(--blue-500)' : 'var(--gray-800)';
  contactLink.insertAdjacentHTML('beforebegin', `<a href="${href}" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${color};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">${label}</a>`);
}

function injectMissingMobileNavLinks() {
  SECONDARY_MEGA_MENUS.forEach((menu) => {
    injectMobileNavLink(menu.pageHref, menu.navLabel);
  });
}

function injectSecondaryMegaMenus() {
  SECONDARY_MEGA_MENUS.forEach((menu) => {
    const link = document.querySelector(`.nav-item > a.nav-link[href="${menu.pageHref}"]`);
    if (!link) return;
    const navItem = link.closest('.nav-item');
    if (navItem.querySelector('.mega-menu')) return;
    if (!link.querySelector('svg')) {
      link.insertAdjacentHTML('beforeend', ' ' + CHEVRON_SVG);
    }
    navItem.insertAdjacentHTML('beforeend', buildMegaMenuHtml(menu));
  });
}

/* Always ensure Products mega menu has all 9 items — fixes pages where
   the hardcoded navbar only had 6 items */
function fixProductsMegaMenu() {
  const productsLink = document.querySelector('.navbar-nav .nav-item > a.nav-link[href="products.html"]');
  if (!productsLink) return;
  const navItem = productsLink.closest('.nav-item');
  if (!navItem) return;

  const existing = navItem.querySelector('.mega-menu');
  if (existing) existing.remove();

  navItem.insertAdjacentHTML('beforeend', `
    <div class="mega-menu">
      <div class="mega-menu-grid">
        <a href="products.html#evaporators" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-droplet"></i></div>
          <div><div class="mega-menu-item-title">Evaporators</div><div class="mega-menu-item-desc">Falling Film, Forced Circulation, Plate Type</div></div>
        </a>
        <a href="products.html#dryers" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-wind"></i></div>
          <div><div class="mega-menu-item-title">Dryers</div><div class="mega-menu-item-desc">Spray, Spin Flash, Fluidized Bed</div></div>
        </a>
        <a href="products.html#heat-exchangers" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-temperature-high"></i></div>
          <div><div class="mega-menu-item-title">Heat Exchangers</div><div class="mega-menu-item-desc">Shell & Tube, Plate Type</div></div>
        </a>
        <a href="products.html#cip" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-recycle"></i></div>
          <div><div class="mega-menu-item-title">CIP Systems</div><div class="mega-menu-item-desc">Clean-In-Place Automation</div></div>
        </a>
        <a href="products.html#milk-processing" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div>
          <div><div class="mega-menu-item-title">Dairy Processing</div><div class="mega-menu-item-desc">Pasteurizer, Deodorizer, Full Plant</div></div>
        </a>
        <a href="products.html#vessels" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-database"></i></div>
          <div><div class="mega-menu-item-title">Pressure Vessels & Tanks</div><div class="mega-menu-item-desc">SS Tanks, Pressure Vessels</div></div>
        </a>
        <a href="products.html#milk-equipment" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-jar"></i></div>
          <div><div class="mega-menu-item-title">Milk Equipment</div><div class="mega-menu-item-desc">Butter Churner, Ghee Kettle, Khoya</div></div>
        </a>
        <a href="products.html#dairy-food-equipment" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-industry"></i></div>
          <div><div class="mega-menu-item-title">Dairy & Food Equipment</div><div class="mega-menu-item-desc">Milk Can Conveyor, BMC, Crystallization Tank</div></div>
        </a>
        <a href="products.html#waste-management" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-leaf"></i></div>
          <div><div class="mega-menu-item-title">Waste Management</div><div class="mega-menu-item-desc">ETP/STP, Biogas, Scrubber, Incinerator</div></div>
        </a>
      </div>
    </div>
  `);
}

/* ─── Top Utility Bar ─────────────────────────────────────── */
const TOPBAR_LINKS = [
  { href: 'insights.html', label: 'Insights', icon: 'fa-lightbulb' },
  { href: 'career.html', label: 'Career', icon: 'fa-briefcase' },
  { href: 'downloads.html', label: 'Download', icon: 'fa-download' },
  { href: 'news.html', label: 'News', icon: 'fa-newspaper' },
];

const LANGUAGES = [
  { id: 'au', code: 'en', label: 'Australia', flag: '🇦🇺' },
  { id: 'at', code: 'de', label: 'Austria', flag: '🇦🇹' },
  { id: 'be', code: 'nl', label: 'Belgium', flag: '🇧🇪' },
  { id: 'br', code: 'pt', label: 'Brazil', flag: '🇧🇷' },
  { id: 'bg', code: 'bg', label: 'Bulgaria', flag: '🇧🇬' },
  { id: 'ca-en', code: 'en', label: 'Canada (English)', flag: '🇨🇦' },
  { id: 'ca-fr', code: 'fr', label: 'Canada (Français)', flag: '🇨🇦' },
  { id: 'cl', code: 'es', label: 'Chile', flag: '🇨🇱' },
  { id: 'cn', code: 'zh-CN', label: 'China Mainland', flag: '🇨🇳' },
  { id: 'co', code: 'es', label: 'Colombia', flag: '🇨🇴' },
  { id: 'cz', code: 'cs', label: 'Czech Republic', flag: '🇨🇿' },
  { id: 'fr', code: 'fr', label: 'France', flag: '🇫🇷' },
  { id: 'de', code: 'de', label: 'Germany', flag: '🇩🇪' },
  { id: 'gr', code: 'el', label: 'Greece', flag: '🇬🇷' },
  { id: 'hu', code: 'hu', label: 'Hungary', flag: '🇭🇺' },
  { id: 'in', code: 'hi', label: 'India', flag: '🇮🇳' },
  { id: 'id', code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { id: 'my', code: 'ms', label: 'Malaysia', flag: '🇲🇾' },
  { id: 'sg', code: 'en', label: 'Singapore', flag: '🇸🇬' },
  { id: 'it', code: 'it', label: 'Italy', flag: '🇮🇹' },
  { id: 'jp', code: 'ja', label: 'Japan', flag: '🇯🇵' },
  { id: 'kr', code: 'ko', label: 'Korea', flag: '🇰🇷' },
  { id: 'lv', code: 'lv', label: 'Latvia', flag: '🇱🇻' },
  { id: 'lt', code: 'lt', label: 'Lithuania', flag: '🇱🇹' },
  { id: 'me', code: 'ar', label: 'Middle East', flag: 'ME' },
  { id: 'nl', code: 'nl', label: 'Netherlands', flag: '🇳🇱' },
  { id: 'nz', code: 'en', label: 'New Zealand', flag: '🇳🇿' },
  { id: 'no', code: 'no', label: 'Norway', flag: '🇳🇴' },
  { id: 'pe', code: 'es', label: 'Peru', flag: '🇵🇪' },
  { id: 'pl', code: 'pl', label: 'Poland', flag: '🇵🇱' },
  { id: 'ro', code: 'ro', label: 'Romania', flag: '🇷🇴' },
  { id: 'rs', code: 'sr', label: 'Serbia', flag: '🇷🇸' },
  { id: 'sk', code: 'sk', label: 'Slovakia', flag: '🇸🇰' },
  { id: 'si', code: 'sl', label: 'Slovenia', flag: '🇸🇮' },
  { id: 'ea', code: 'sw', label: 'East Africa', flag: 'EA' },
  { id: 'na', code: 'ar', label: 'North Africa', flag: 'NA' },
  { id: 'za', code: 'en', label: 'South Africa', flag: 'ZA' },
  { id: 'wa', code: 'fr', label: 'West Africa', flag: 'WA' },
  { id: 'se', code: 'sv', label: 'Sweden', flag: '🇸🇪' },
  { id: 'ch', code: 'de', label: 'Switzerland', flag: '🇨🇭' },
  { id: 'tw', code: 'zh-TW', label: 'Taiwan, Region', flag: '🇹🇼' },
  { id: 'th', code: 'th', label: 'Thailand', flag: '🇹🇭' },
  { id: 'tr', code: 'tr', label: 'Türkiye', flag: '🇹🇷' },
  { id: 'ae', code: 'ar', label: 'United Arab Emirates', flag: '🇦🇪' },
  { id: 'gb', code: 'en', label: 'United Kingdom', flag: '🇬🇧' },
  { id: 'us', code: 'en', label: 'United States', flag: '🇺🇸' },
  { id: 'ua', code: 'uk', label: 'Ukraine', flag: '🇺🇦' },
];

function getLangCodeDisplay(code) {
  return (code || 'en').split('-')[0].toUpperCase();
}

function getLangRegionDisplay(entry) {
  if (!entry) return '';
  return (entry.id || '').split('-')[0].toUpperCase();
}

const LANG_FLAG_TEXT_ONLY = new Set(['me', 'ea', 'na', 'wa']);

function getLangFlagIso(entry) {
  if (!entry?.id) return '';
  const iso = entry.id.split('-')[0].toLowerCase();
  return LANG_FLAG_TEXT_ONLY.has(iso) ? '' : iso;
}

function renderLangFlagHtml(entry) {
  const iso = getLangFlagIso(entry);
  if (iso) return `<span class="lang-flag fi fi-${iso}" aria-hidden="true"></span>`;
  return `<span class="lang-flag lang-flag--text">${getLangRegionDisplay(entry)}</span>`;
}

function applyLangFlagEl(el, entry) {
  if (!el || !entry) return;
  const iso = getLangFlagIso(entry);
  if (iso) {
    el.className = `lang-flag fi fi-${iso}`;
    el.textContent = '';
    el.setAttribute('aria-hidden', 'true');
  } else {
    el.className = 'lang-flag lang-flag--text';
    el.removeAttribute('aria-hidden');
    el.textContent = getLangRegionDisplay(entry);
  }
}

function ensureFlagIcons() {
  if (document.getElementById('flag-icons-css')) return;
  const link = document.createElement('link');
  link.id = 'flag-icons-css';
  link.rel = 'stylesheet';
  link.href = 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css';
  document.head.appendChild(link);
}

function getActiveLangEntry() {
  const id = localStorage.getItem('gausin_lang_id');
  if (id) {
    const byId = LANGUAGES.find(l => l.id === id);
    if (byId) return byId;
  }
  const code = localStorage.getItem('gausin_lang') || 'en';
  return LANGUAGES.find(l => l.code === code) || LANGUAGES.find(l => l.id === 'gb') || LANGUAGES[0];
}

function setActiveLangEntry(entry) {
  localStorage.setItem('gausin_lang', entry.code);
  localStorage.setItem('gausin_lang_id', entry.id);
}

function syncLangSwitcherUi(entry) {
  if (!entry) return;
  const trigger = document.getElementById('langTrigger');
  if (trigger) {
    applyLangFlagEl(trigger.querySelector('.lang-flag'), entry);
    trigger.querySelector('.lang-code').textContent = getLangCodeDisplay(entry.code);
  }
  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.langId === entry.id);
  });
}

function getActiveLang() {
  return getActiveLangEntry().code;
}

function _isLangSwitcherNode(node) {
  return !!(node.parentElement && node.parentElement.closest('#langSwitcher,.mobile-lang-btns'));
}

function buildLangSwitcher() {
  const active = getActiveLangEntry();
  const items = LANGUAGES.map(l => `
    <button class="lang-option${l.id === active.id ? ' active' : ''}" data-lang-id="${l.id}" data-lang="${l.code}" type="button" role="option">
      ${renderLangFlagHtml(l)}
      <span class="lang-label">${l.label}</span>
    </button>
  `).join('');
  return `
    <div class="lang-switcher notranslate" id="langSwitcher" translate="no">
      <button class="lang-trigger" id="langTrigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="Select region or language">
        ${renderLangFlagHtml(active)}
        <span class="lang-code">${getLangCodeDisplay(active.code)}</span>
        <i class="fa-solid fa-chevron-down lang-chevron"></i>
      </button>
      <div class="lang-dropdown" id="langDropdown" role="listbox" aria-label="Select region or language">
        ${items}
      </div>
    </div>
  `;
}

function buildTopbarHtml() {
  const links = TOPBAR_LINKS.map((item) => `
    <a href="${item.href}" class="topbar-link${_page === item.href ? ' active' : ''}">
      <i class="fa-solid ${item.icon}"></i> ${item.label}
    </a>
  `).join('');
  return `
    <nav class="topbar" id="topbar" aria-label="Utility navigation">
      <div class="container">
        <div class="topbar-inner">
          <div class="topbar-links">${links}</div>
          ${buildLangSwitcher()}
        </div>
      </div>
    </nav>
  `;
}

function injectTopbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar || document.getElementById('topbar')) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = buildTopbarHtml();
  navbar.parentNode.insertBefore(wrapper.firstElementChild, navbar);
}

/* Topbar links + language live in the fixed topbar on all screen sizes — no duplicate mobile menu block. */
function injectTopbarMobileLinks() {}

/* ─── Navbar HTML ─────────────────────────────────────────── */
const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="index.html" class="navbar-logo navbar-logo--image"><img src="images/gausin-logo.png" alt="Gausin International Engineers Pvt. Ltd." class="logo-img" width="220" height="52"></a>

      <nav class="navbar-nav">
        <div class="nav-item">
          <a href="index.html" class="nav-link ${_page==='index.html'?'active':''}">Home</a>
        </div>
        <div class="nav-item">
          <a href="about.html" class="nav-link ${_page==='about.html'?'active':''}">About</a>
        </div>
        <div class="nav-item">
          <a href="products.html" class="nav-link ${_page==='products.html'?'active':''}">
            Products
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="mega-menu">
            <div class="mega-menu-grid">
              <a href="products.html#evaporators" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-droplet"></i></div>
                <div><div class="mega-menu-item-title">Evaporators</div><div class="mega-menu-item-desc">Falling Film, Forced Circulation, Plate Type</div></div>
              </a>
              <a href="products.html#dryers" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-wind"></i></div>
                <div><div class="mega-menu-item-title">Dryers</div><div class="mega-menu-item-desc">Spray, Spin Flash, Fluidized Bed</div></div>
              </a>
              <a href="products.html#heat-exchangers" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-temperature-high"></i></div>
                <div><div class="mega-menu-item-title">Heat Exchangers</div><div class="mega-menu-item-desc">Shell & Tube, Plate Type</div></div>
              </a>
              <a href="products.html#cip" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-recycle"></i></div>
                <div><div class="mega-menu-item-title">CIP Systems</div><div class="mega-menu-item-desc">Clean-In-Place Automation</div></div>
              </a>
              <a href="products.html#milk-processing" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div>
                <div><div class="mega-menu-item-title">Dairy Processing</div><div class="mega-menu-item-desc">Pasteurizer, Deodorizer, Full Plant</div></div>
              </a>
              <a href="products.html#vessels" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-database"></i></div>
                <div><div class="mega-menu-item-title">Pressure Vessels & Tanks</div><div class="mega-menu-item-desc">SS Tanks, Pressure Vessels</div></div>
              </a>
              <a href="products.html#milk-equipment" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-jar"></i></div>
                <div><div class="mega-menu-item-title">Milk Equipment</div><div class="mega-menu-item-desc">Butter Churner, Ghee Kettle, Khoya</div></div>
              </a>
              <a href="products.html#dairy-food-equipment" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-industry"></i></div>
                <div><div class="mega-menu-item-title">Dairy & Food Equipment</div><div class="mega-menu-item-desc">Milk Can Conveyor, BMC, Crystallization Tank</div></div>
              </a>
              <a href="products.html#waste-management" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-leaf"></i></div>
                <div><div class="mega-menu-item-title">Waste Management</div><div class="mega-menu-item-desc">ETP/STP, Biogas, Scrubber, Incinerator</div></div>
              </a>
            </div>
          </div>
        </div>
        ${buildSecondaryNavItems(_page)}
        <div class="nav-item">
          <a href="contact.html" class="nav-link ${_page==='contact.html'?'active':''}">Contact</a>
        </div>
      </nav>

      <div class="navbar-cta">
        <button type="button" class="site-search-btn" id="siteSearchBtn" aria-label="Search site" title="Search (Ctrl+K)">
          ${SEARCH_ICON_SVG}
        </button>
        <a href="contact.html" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-paper-plane"></i> Get a Quote
        </a>
      </div>

      <button class="navbar-toggle" id="navbarToggle" aria-label="Toggle menu">
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
      </button>
    </div>
  </div>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="index.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='index.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Home</a>
  <a href="about.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='about.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">About Us</a>
  <a href="products.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='products.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Products</a>
  <a href="services.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='services.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Services</a>
  <a href="industries.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='industries.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Industries</a>
  <a href="our-clients.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='our-clients.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Our Clients</a>
  <a href="technology.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='technology.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Technology</a>
  <a href="tech-ai.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='tech-ai.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Digital Solutions</a>
  <a href="contact.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='contact.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Contact</a>
  <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px;">
    <button type="button" class="btn btn-outline site-search-trigger" id="siteSearchBtnMobile" style="width:100%;justify-content:center;"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
    <a href="contact.html" class="btn btn-primary" style="width:100%;justify-content:center;"><i class="fa-solid fa-paper-plane"></i> Get a Quote</a>
    <a href="tel:+919870840779" class="btn btn-outline" style="width:100%;justify-content:center;"><i class="fa-solid fa-phone"></i> Call Us Now</a>
  </div>
</div>
`;

/* ─── Footer HTML (matches homepage) ──────────────────────── */
const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="navbar-logo footer-logo"><img src="images/gausin-logo.png" alt="" class="logo-img" width="110" height="52" aria-hidden="true"><div class="logo-text"><div class="logo-name">Gausin International</div><div class="logo-tagline">Engineers Pvt. Ltd.</div></div></a>
        <p class="footer-brand-desc">Engineering process excellence through advanced evaporation, drying, and industrial plant solutions. Serving dairy, pharma, chemical, and food industries with precision-engineered systems.</p>
        <div class="footer-social">
          <a href="${SOCIAL_LINKS.linkedin}" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="${SOCIAL_LINKS.x}" class="social-link" aria-label="X" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="${SOCIAL_LINKS.instagram}" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
          <a href="${SOCIAL_LINKS.youtube}" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>
          <a href="${SOCIAL_LINKS.facebook}" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
        </div>
      </div>

      <div>
        <div class="footer-title">Products</div>
        <div class="footer-links">
          <a href="products.html#evaporators" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Falling Film Evaporator</a>
          <a href="products.html#evaporators" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Forced Circulation Evaporator</a>
          <a href="products.html#dryers" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Spray Dryer (Nozzle/Disc)</a>
          <a href="product-closed-circuit-dryer.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Closed Circuit Dryer</a>
          <a href="products.html#cip" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>CIP Systems</a>
          <a href="products.html#milk-processing" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Dairy Processing Plant</a>
          <a href="products.html#heat-exchangers" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Heat Exchangers</a>
          <a href="products.html#vessels" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Pressure Vessels & Tanks</a>
          <a href="product-etp-stp-treatment-plants.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>ETP/STP Treatment Plants</a>
          <a href="product-biomass-solid-waste-treatment-plant.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Biomass Solid Waste Treatment Plant</a>
        </div>
      </div>

      <div>
        <div class="footer-title">Company</div>
        <div class="footer-links">
          <a href="about.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>About</a>
          <a href="products.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Products</a>
          <a href="services.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Services</a>
          <a href="industries.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Industries</a>
          <a href="our-clients.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Our Clients</a>
          <a href="technology.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Technology</a>
          <a href="tech-ai.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Digital Solutions</a>
          <a href="insights.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Insights</a>
          <a href="career.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Career</a>
          <a href="downloads.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Download</a>
          <a href="news.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>News</a>
          <a href="contact.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Contact</a>
        </div>
      </div>

      <div>
        <div class="footer-title">Contact Us</div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fa-solid fa-location-dot"></i></div>
          <div class="footer-contact-text">DH-249, Pallavpuram Phase-1, Roorkee Road, Meerut, Uttar Pradesh, India  -  250110</div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fa-solid fa-phone"></i></div>
          <div class="footer-contact-text"><a href="tel:+919870840779" style="color:inherit;transition:color 0.2s;" onmouseover="this.style.color='var(--blue-400)'" onmouseout="this.style.color='inherit'">+91 98708 40779</a></div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fa-solid fa-phone-volume"></i></div>
          <div class="footer-contact-text"><a href="tel:+911213504632" style="color:inherit;transition:color 0.2s;" onmouseover="this.style.color='var(--blue-400)'" onmouseout="this.style.color='inherit'">+91-121-3504632</a></div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fa-solid fa-envelope"></i></div>
          <div class="footer-contact-text"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gausin.in" target="_blank" rel="noopener" style="color:inherit;transition:color 0.2s;" onmouseover="this.style.color='var(--blue-400)'" onmouseout="this.style.color='inherit'">info@gausin.in</a></div>
        </div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fa-solid fa-globe"></i></div>
          <div class="footer-contact-text"><a href="https://www.gausin.in" style="color:inherit;transition:color 0.2s;" onmouseover="this.style.color='var(--blue-400)'" onmouseout="this.style.color='inherit'">www.gausin.in</a></div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <div>&copy; ${new Date().getFullYear()} Gausin International Engineers Pvt. Ltd. All rights reserved.</div>
        <div class="footer-credit">Designed &amp; Developed by Gausin International Engineers Pvt. Ltd.</div>
      </div>
      <div class="footer-bottom-links">
        <a href="privacy-policy.html" class="footer-bottom-link">Privacy Policy</a>
        <a href="terms-of-service.html" class="footer-bottom-link">Terms of Service</a>
        <a href="sitemap.html" class="footer-bottom-link">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
`;

function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (placeholder) {
    placeholder.outerHTML = FOOTER_HTML;
    return;
  }
  const existingFooter = document.querySelector('footer.footer');
  if (existingFooter) {
    existingFooter.outerHTML = FOOTER_HTML;
  }
}

/* ─── Floating Buttons HTML ───────────────────────────────── */
const FLOATING_HTML = `
<!-- WhatsApp Float -->
<a href="https://wa.me/919870840779?text=Hello%20Gausin%20International%20Engineers%2C%20I%20am%20interested%20in%20your%20industrial%20engineering%20products%20and%20services.%20Please%20provide%20more%20information."
   target="_blank" rel="noopener" class="whatsapp-float" id="whatsappFloat" aria-label="Chat on WhatsApp">
  <i class="fa-brands fa-whatsapp"></i>
  <span class="whatsapp-tooltip">Chat on WhatsApp</span>
</a>

<!-- Back To Top -->
<button id="backToTop" aria-label="Back to top">
  <i class="fa-solid fa-arrow-up"></i>
</button>

<!-- Page Transition Overlay -->
<div id="pageTransition" style="
  position:fixed;inset:0;background:var(--blue-900);
  z-index:9999;pointer-events:none;
  opacity:0;transition:opacity 0.3s ease;
"></div>
`;

/* ─── Cookie Consent HTML ─────────────────────────────────── */
const COOKIE_HTML = `
<div id="cookieBanner" style="
  position:fixed;bottom:0;left:0;right:0;z-index:3000;
  background:var(--gray-900);border-top:1px solid rgba(255,255,255,0.08);
  padding:20px 0;transform:translateY(100%);
  transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
">
  <div class="container">
    <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
      <div style="flex:1;min-width:280px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <i class="fa-solid fa-cookie-bite" style="color:var(--blue-400);font-size:1.125rem;"></i>
          <span style="font-size:0.9375rem;font-weight:700;color:white;font-family:'Montserrat',sans-serif;">We use cookies</span>
        </div>
        <p style="font-size:0.875rem;color:var(--gray-400);line-height:1.6;margin:0;">
          We use cookies to enhance your experience and analyze website traffic. By clicking "Accept All", you consent to our use of cookies.
          <a href="privacy-policy.html" style="color:var(--blue-400);text-decoration:underline;margin-left:4px;">Learn more</a>
        </p>
      </div>
      <div style="display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;">
        <button id="cookieReject" style="
          padding:10px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);
          background:transparent;color:var(--gray-400);font-size:0.875rem;font-weight:600;
          cursor:pointer;transition:all 0.2s;font-family:'Montserrat',sans-serif;
        " onmouseover="this.style.borderColor='rgba(255,255,255,0.4)';this.style.color='white'"
           onmouseout="this.style.borderColor='rgba(255,255,255,0.2)';this.style.color='var(--gray-400)'">
          Reject
        </button>
        <button id="cookieAccept" style="
          padding:10px 20px;border-radius:8px;
          background:linear-gradient(135deg,var(--blue-500),var(--blue-700));
          color:white;font-size:0.875rem;font-weight:600;
          cursor:pointer;transition:all 0.2s;
          border:none;font-family:'Montserrat',sans-serif;
          box-shadow:0 4px 12px rgba(11,94,215,0.3);
        " onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 6px 18px rgba(11,94,215,0.4)'"
           onmouseout="this.style.transform='';this.style.boxShadow='0 4px 12px rgba(11,94,215,0.3)'">
          <i class="fa-solid fa-check" style="margin-right:6px;"></i>Accept All
        </button>
      </div>
    </div>
  </div>
</div>
`;

/* ─── Site search button (for pages with inline navbar) ───── */
function injectSearchButtons() {
  const cta = document.querySelector('.navbar-cta');
  if (cta && !document.getElementById('siteSearchBtn')) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'site-search-btn';
    btn.id = 'siteSearchBtn';
    btn.setAttribute('aria-label', 'Search site');
    btn.title = 'Search (Ctrl+K)';
    btn.innerHTML = SEARCH_ICON_SVG;
    cta.insertBefore(btn, cta.firstChild);
  }

  const mobileNav = document.getElementById('mobileNav');
  if (mobileNav && !document.getElementById('siteSearchBtnMobile')) {
    const actions = mobileNav.querySelector('div[style*="margin-top"]');
    if (actions) {
      const mobileBtn = document.createElement('button');
      mobileBtn.type = 'button';
      mobileBtn.className = 'btn btn-outline site-search-trigger';
      mobileBtn.id = 'siteSearchBtnMobile';
      mobileBtn.style.cssText = 'width:100%;justify-content:center;';
      mobileBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> Search';
      actions.insertBefore(mobileBtn, actions.firstChild);
    }
  }

  const toggle = document.getElementById('navbarToggle');
  if (toggle) {
    let actionsWrap = toggle.closest('.navbar-mobile-actions');
    if (!actionsWrap) {
      actionsWrap = document.createElement('div');
      actionsWrap.className = 'navbar-mobile-actions';
      toggle.parentNode.insertBefore(actionsWrap, toggle);
      actionsWrap.appendChild(toggle);
    }

    if (!document.getElementById('siteSearchBtnHeader')) {
      const headerBtn = document.createElement('button');
      headerBtn.type = 'button';
      headerBtn.className = 'site-search-btn site-search-btn--header-mobile';
      headerBtn.id = 'siteSearchBtnHeader';
      headerBtn.setAttribute('aria-label', 'Search site');
      headerBtn.innerHTML = SEARCH_ICON_SVG;
      actionsWrap.insertBefore(headerBtn, toggle);
    }
  }

  if (typeof window.initSiteSearch === 'function') {
    window.initSiteSearch();
  }
}

function getMobileNavHtml() {
  const endTag = '</nav>';
  const idx = NAVBAR_HTML.lastIndexOf(endTag);
  if (idx === -1) return '';
  return NAVBAR_HTML.slice(idx + endTag.length).trim();
}

function injectMobileNavIfMissing() {
  if (document.getElementById('mobileNav') || !document.getElementById('navbarToggle')) return;
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const mobilePart = getMobileNavHtml();
  if (!mobilePart) return;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = mobilePart;
  const mobileNav = wrapper.firstElementChild;
  if (mobileNav) navbar.insertAdjacentElement('afterend', mobileNav);
}

function replaceMobileNavLinkWithAccordion(mobileNav, pageHref, label, links, className) {
  if (mobileNav.querySelector('.' + className)) return;

  const navLink = mobileNav.querySelector(
    `a[href="${pageHref}"].mobile-nav-link-plain, a[href="${pageHref}"].mobile-nav-link`
  );
  if (!navLink) return;

  const isActive = _page === pageHref;
  const subLinks = links.map((item) =>
    `<a href="${item.href}" class="mobile-sub-link"><i class="fa-solid ${item.icon}" style="width:18px;color:var(--blue-500);"></i> ${item.label}</a>`
  ).join('');

  const accordion = document.createElement('div');
  accordion.className = `mobile-nav-item ${className}`;
  accordion.innerHTML = `
    <button type="button" class="mobile-nav-link mobile-toggle">
      <span style="color:${isActive ? 'var(--blue-500)' : 'inherit'}">${label}</span>
      <i class="fa-solid fa-chevron-down toggle-arrow"></i>
    </button>
    <div class="mobile-sub-links">${subLinks}</div>
  `;
  navLink.replaceWith(accordion);
}

function injectMobileNavAccordions() {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav) return;

  replaceMobileNavLinkWithAccordion(
    mobileNav,
    'products.html',
    'Products',
    PRODUCT_MOBILE_LINKS,
    'mobile-nav-item--products'
  );

  SECONDARY_MEGA_MENUS.forEach((menu) => {
    const slug = menu.pageHref.replace('.html', '');
    const links = [
      { href: menu.pageHref, label: `All ${menu.navLabel}`, icon: menu.headerIcon || 'fa-border-all' },
      ...menu.items.map((item) => ({ href: item.href, label: item.title, icon: item.icon })),
    ];
    replaceMobileNavLinkWithAccordion(
      mobileNav,
      menu.pageHref,
      menu.navLabel,
      links,
      `mobile-nav-item--${slug}`
    );
  });
}

function fixSocialLinks() {
  document.querySelectorAll(
    'a.social-link[aria-label="LinkedIn"], a.contact-social-link[aria-label="LinkedIn"]'
  ).forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') {
      link.href = SOCIAL_LINKS.linkedin;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });
}

/* ─── Inject all components ───────────────────────────────── */
function injectComponents() {
  ensureFlagIcons();

  // Navbar (only if not already present from inline HTML)
  if (!document.getElementById('navbar')) {
    const navWrapper = document.createElement('div');
    navWrapper.innerHTML = NAVBAR_HTML;
    document.body.insertBefore(navWrapper.firstElementChild, document.body.firstChild);
    // Mobile nav
    const mobileWrapper = document.createElement('div');
    mobileWrapper.innerHTML = getMobileNavHtml();
    document.body.insertBefore(mobileWrapper.firstElementChild, document.body.children[1]);
  }

  injectMobileNavIfMissing();

  injectTopbar();
  injectFooter();

  // Floating buttons (skip backToTop if page already has one)
  const floatWrapper = document.createElement('div');
  floatWrapper.innerHTML = FLOATING_HTML;
  while (floatWrapper.firstChild) {
    const node = floatWrapper.firstChild;
    if (node.id === 'backToTop' && document.getElementById('backToTop')) {
      floatWrapper.removeChild(node);
      continue;
    }
    document.body.appendChild(node);
  }

  // Cookie banner
  const cookieWrapper = document.createElement('div');
  cookieWrapper.innerHTML = COOKIE_HTML;
  document.body.appendChild(cookieWrapper.firstElementChild);

  // Show cookie if not accepted
  setTimeout(() => {
    const banner = document.getElementById('cookieBanner');
    if (banner && !localStorage.getItem('gausin_cookie_consent')) {
      banner.style.transform = 'translateY(0)';
      document.body.classList.add('cookie-banner-visible');
    }
  }, 2000);

  injectTopbarMobileLinks();
  injectMissingSecondaryNavItems();
  injectMissingOurClientsNav();
  injectSecondaryMegaMenus();
  fixProductsMegaMenu();
  injectMissingMobileNavLinks();
  injectMissingOurClientsMobileLink();
  injectMobileNavAccordions();
  injectSearchButtons();
  fixSocialLinks();

  // Cookie buttons
  const hideCookieBanner = () => {
    document.getElementById('cookieBanner').style.transform = 'translateY(100%)';
    document.body.classList.remove('cookie-banner-visible');
  };
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('gausin_cookie_consent', 'accepted');
    hideCookieBanner();
  });
  document.getElementById('cookieReject')?.addEventListener('click', () => {
    localStorage.setItem('gausin_cookie_consent', 'rejected');
    hideCookieBanner();
  });

  window.bindBackToTop?.();
}

/* ─── WhatsApp Styles ─────────────────────────────────────── */
const WHATSAPP_STYLES = `
<style>
  .whatsapp-float {
    position: fixed;
    bottom: 88px;
    right: 28px;
    width: 56px;
    height: 56px;
    background: #25D366;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    color: white;
    box-shadow: 0 6px 24px rgba(37,211,102,0.45);
    z-index: 500;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    text-decoration: none;
  }
  .whatsapp-float:hover {
    transform: scale(1.15) translateY(-3px);
    box-shadow: 0 10px 32px rgba(37,211,102,0.55);
  }
  .whatsapp-float::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: rgba(37,211,102,0.2);
    animation: whatsapp-ring 2.5s ease-in-out infinite;
  }
  @keyframes whatsapp-ring {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.35); opacity: 0; }
  }
  .whatsapp-tooltip {
    position: absolute;
    right: 68px;
    background: #25D366;
    color: white;
    font-size: 0.8125rem;
    font-weight: 600;
    padding: 6px 12px;
    border-radius: 8px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transform: translateX(8px);
    transition: all 0.2s ease;
    font-family: 'Montserrat', sans-serif;
  }
  .whatsapp-tooltip::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border: 6px solid transparent;
    border-left-color: #25D366;
    border-right: none;
  }
  .whatsapp-float:hover .whatsapp-tooltip {
    opacity: 1;
    transform: translateX(0);
  }

  /* Stack back-to-top above WhatsApp + chatbot (all viewports) */
  #backToTop {
    bottom: 156px !important;
    z-index: 1003 !important;
  }
  body.cookie-banner-visible #backToTop {
    bottom: calc(170px + env(safe-area-inset-bottom, 0)) !important;
  }
  body.cookie-banner-visible .whatsapp-float {
    bottom: calc(110px + env(safe-area-inset-bottom, 0));
  }
  body.cookie-banner-visible .gchat-fab {
    bottom: calc(108px + env(safe-area-inset-bottom, 0)) !important;
  }

  /* Page Transition */
  body.page-loading * { pointer-events: none; }

  .mobile-topbar-links {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gray-200);
    max-width: 100%;
  }
  .mobile-topbar-link {
    flex: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 8px;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--gray-700);
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    min-width: 0;
    max-width: 100%;
  }
  .mobile-topbar-link.active {
    color: var(--blue-600);
    background: var(--blue-50);
    border-color: var(--blue-200);
  }

  @media (max-width: 768px) {
    .whatsapp-float { bottom: 96px; right: 16px; width: 50px; height: 50px; font-size: 1.5rem; }
    .whatsapp-tooltip { display: none; }
    #backToTop { right: 16px !important; width: 44px !important; height: 44px !important; }
    #cookieBanner { padding: 14px 0 !important; }
    #cookieBanner .container > div { gap: 12px !important; }
    #cookieBanner p { font-size: 0.8125rem !important; line-height: 1.5 !important; }
    #cookieBanner button { padding: 9px 16px !important; font-size: 0.8125rem !important; }
    body.cookie-banner-visible { padding-bottom: env(safe-area-inset-bottom, 0); }
    .gchat-fab { bottom: 22px !important; right: 16px !important; }
    body.cookie-banner-visible.gchat-open .gchat-win {
      --gchat-bottom: calc(108px + var(--gchat-fab-h, 54px) + var(--gchat-fab-gap, 12px) + env(safe-area-inset-bottom, 0));
    }
  }
</style>
`;

/* ─── Page Transition ─────────────────────────────────────── */
function initPageTransitions() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || href.startsWith('tel') ||
        href.startsWith('javascript') || link.target === '_blank') return;
    // Skip same-page links (e.g. products.html#section when already on products.html)
    const hrefBase = href.split('#')[0];
    if (hrefBase === currentPage || hrefBase === '') return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const overlay = document.getElementById('pageTransition');
      if (overlay) {
        overlay.style.opacity = '0.6';
        overlay.style.pointerEvents = 'all';
        setTimeout(() => { window.location.href = href; }, 200);
      } else {
        window.location.href = href;
      }
    });
  });

  // Fade in on load
  window.addEventListener('load', () => {
    const overlay = document.getElementById('pageTransition');
    if (overlay) {
      overlay.style.opacity = '0';
      setTimeout(() => { overlay.style.pointerEvents = 'none'; }, 350);
    }
  });

  // Fix bfcache (browser back button) — overlay stuck on back navigation
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      const overlay = document.getElementById('pageTransition');
      if (overlay) {
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
      }
    }
  });
}

/* ─── Inject styles ───────────────────────────────────────── */
document.head.insertAdjacentHTML('beforeend', WHATSAPP_STYLES);

/* ─── Custom Translation Engine ──────────────────────────────
   Uses translate.googleapis.com directly — no widget, no toolbar
   ─────────────────────────────────────────────────────────── */
const _TR = {
  cache:          {},
  originals:      [],
  blockOriginals: [],
  attrOriginals:  [],
  active:         'en',
  docMeta:        null,
};

/* Only skip language UI — chatbot, search, and page content all translate */
const _TR_SKIP = '#langSwitcher,.mobile-lang-btns,.notranslate,[translate="no"],#google_translate_element,.topbar-link i';

const _TR_BLOCK_SEL = [
  '.hero-desc', '.hero-badge', '.hero-stat-label',
  '.section-desc', '.section-subtitle',
  '.card-title', '.card-desc',
  '.industry-card-title', '.industry-card-desc',
  '.fp-title', '.fp-desc', '.footer-brand-desc', '.footer-title',
  '.logo-name', '.logo-tagline',
  '.mega-menu-item-title', '.mega-menu-item-desc',
  '.gchat-hd-name', '.gchat-hd-sub', '.gchat-foot', '.gc-chip', '.gc-divider',
  '.site-search-empty p', '.site-search-footer',
  '.site-search-result-title', '.site-search-result-meta',
].join(',');

/* Only block-translate plain text containers — skip if HTML children exist */
function _trCanBlockTranslate(el) {
  if (!el) return false;
  return el.children.length === 0;
}

function _trIsSkipped(el) {
  return !!(el && el.closest && el.closest(_TR_SKIP));
}

function _trIsBlockNode(node) {
  return !!(node.parentElement && node.parentElement.closest('[data-tr-block="1"]'));
}

/* Expand acronyms / proper nouns so Google returns fully localized text */
function _trPre(text) {
  if (!text) return text;
  return text
    .replace(/Gausin International Engineers/gi, 'Gausin international engineering company')
    .replace(/Gausin Assistant/gi, 'Gausin customer assistant')
    .replace(/Powered by Gausin AI/gi, 'Powered by Gausin artificial intelligence')
    .replace(/\bCIP Systems?\b/gi, 'clean-in-place systems')
    .replace(/\bCIP\b/g, 'clean-in-place')
    .replace(/\bZLD\b/g, 'zero liquid discharge')
    .replace(/\bHTST\b/g, 'high-temperature short-time pasteurization')
    .replace(/\bLTLT\b/g, 'low-temperature long-time pasteurization')
    .replace(/\bUHT\b/g, 'ultra-high-temperature processing')
    .replace(/\bMCC\b/g, 'milk chilling centre')
    .replace(/\bBMC\b/g, 'bulk milk cooler')
    .replace(/\bMEE\b/g, 'multiple-effect evaporator')
    .replace(/\bMVR\b/g, 'mechanical vapor recompression')
    .replace(/\bTVR\b/g, 'thermal vapor recompression')
    .replace(/\bFBD\b/g, 'fluidized bed dryer')
    .replace(/\bATFD\b/g, 'agitated thin-film dryer')
    .replace(/\bPHE\b/g, 'plate heat exchanger')
    .replace(/\bETP\b/g, 'effluent treatment plant')
    .replace(/\bSTP\b/g, 'sewage treatment plant')
    .replace(/\bPLC\b/g, 'programmable logic controller')
    .replace(/\bSCADA\b/g, 'supervisory control and data acquisition')
    .replace(/\bGMP\b/g, 'good manufacturing practice')
    .replace(/\bcGMP\b/g, 'current good manufacturing practice')
    .replace(/\bNDT\b/g, 'non-destructive testing')
    .replace(/\bIBR\b/g, 'Indian Boiler Regulations')
    .replace(/\bASME\b/g, 'American Society of Mechanical Engineers standards')
    .replace(/\bFSSAI\b/g, 'Food Safety and Standards Authority of India')
    .replace(/\bISO\b/g, 'International Organization for Standardization')
    .replace(/\bIoT\b/g, 'Internet of Things');
}

function _trPost(text) {
  return text;
}

function _trBlockText(el) {
  return el.textContent.trim();
}

function _trBlockElements(root) {
  const scope = root || document;
  const els = [];
  scope.querySelectorAll(_TR_BLOCK_SEL).forEach((el) => {
    if (_trIsSkipped(el)) return;
    if (!_trCanBlockTranslate(el)) return;
    els.push(el);
  });
  return els;
}

/* Collect translatable text nodes from the live page */
function _trNodes() {
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CODE', 'PRE', 'INPUT', 'TEXTAREA', 'SELECT', 'SVG']);
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p || SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      if (_trIsSkipped(p)) return NodeFilter.FILTER_REJECT;
      if (_trIsBlockNode(node)) return NodeFilter.FILTER_REJECT;
      const t = node.nodeValue.trim();
      if (!t || t.length < 2) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

/* Translate attributes (placeholder, aria-label, title) */
function _trAttrItems() {
  const items = [];
  document.querySelectorAll('[placeholder],[aria-label],[title]').forEach((el) => {
    if (_trIsSkipped(el)) return;
    ['placeholder', 'aria-label', 'title'].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (val && val.trim().length >= 2) items.push({ el, attr, text: val.trim() });
    });
  });
  return items;
}

function _trGoogleLang(code) {
  if (!code) return 'en';
  const c = code.toLowerCase();
  if (c.startsWith('zh')) return c.includes('tw') ? 'zh-TW' : 'zh-CN';
  return code;
}

/* Fetch one translation at a time — batched join/split was breaking 1:1 mapping */
async function _trFetchOne(text, lang) {
  const key = lang + '|' + text;
  if (_TR.cache[key]) return _TR.cache[key];
  try {
    const tl = _trGoogleLang(lang);
    const q = _trPre(text);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('translate failed');
    const dat = await res.json();
    const tr = _trPost((dat[0] || []).map((s) => s[0]).join('') || q);
    _TR.cache[key] = tr;
    return tr;
  } catch {
    _TR.cache[key] = text;
    return text;
  }
}

async function _trFetch(texts, lang) {
  const unique = [...new Set(texts.filter(Boolean))];
  const pending = unique.filter((t) => !_TR.cache[lang + '|' + t]);
  const CONCURRENCY = 6;
  for (let i = 0; i < pending.length; i += CONCURRENCY) {
    await Promise.all(pending.slice(i, i + CONCURRENCY).map((t) => _trFetchOne(t, lang)));
  }
}

function _trApplyTextNode(node, lang) {
  const raw = node.nodeValue;
  const trimmed = raw.trim();
  if (!trimmed) return;
  const tr = _TR.cache[lang + '|' + trimmed];
  if (!tr || tr === trimmed) return;
  _TR.originals.push({ node, orig: raw });
  const start = raw.indexOf(trimmed);
  node.nodeValue = raw.slice(0, start) + tr + raw.slice(start + trimmed.length);
}

function _trRestoreAll() {
  _TR.originals.forEach(({ node, orig }) => {
    if (node.isConnected) node.nodeValue = orig;
  });
  _TR.originals = [];
  _TR.blockOriginals.forEach(({ el, orig, mode }) => {
    if (!el.isConnected) return;
    if (mode === 'html') el.innerHTML = orig;
    else el.textContent = orig;
    el.removeAttribute('data-tr-block');
  });
  _TR.blockOriginals = [];
  _TR.attrOriginals.forEach(({ el, attr, orig }) => {
    if (el.isConnected) el.setAttribute(attr, orig);
  });
  _TR.attrOriginals = [];
  if (_TR.docMeta) {
    document.title = _TR.docMeta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && _TR.docMeta.desc) desc.setAttribute('content', _TR.docMeta.desc);
  }
}

function _trApplyBlocks(blockEls, lang) {
  blockEls.forEach((el) => {
    if (!_trCanBlockTranslate(el)) return;
    const raw = _trBlockText(el);
    if (!raw || raw.length < 2) return;
    const tr = _TR.cache[lang + '|' + raw];
    if (!tr || tr === raw) return;
    _TR.blockOriginals.push({
      el,
      orig: el.textContent,
      mode: 'text',
    });
    el.setAttribute('data-tr-block', '1');
    el.textContent = tr;
  });
}

function _trCollectFromRoot(root) {
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CODE', 'PRE', 'INPUT', 'TEXTAREA', 'SELECT', 'SVG']);
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p || SKIP_TAGS.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      if (_trIsSkipped(p)) return NodeFilter.FILTER_REJECT;
      if (_trIsBlockNode(node)) return NodeFilter.FILTER_REJECT;
      const t = node.nodeValue.trim();
      if (!t || t.length < 2) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

function _trAttrItemsIn(root) {
  const items = [];
  (root || document).querySelectorAll('[placeholder],[aria-label],[title]').forEach((el) => {
    if (_trIsSkipped(el)) return;
    ['placeholder', 'aria-label', 'title'].forEach((attr) => {
      const val = el.getAttribute(attr);
      if (val && val.trim().length >= 2) items.push({ el, attr, text: val.trim() });
    });
  });
  return items;
}

/* Indicator removed — translation runs silently */
function _trIndicator() {}

/* Main translate function */
async function _translatePageTo(lang) {
  _TR.originals = _TR.originals.filter(({ node }) => !_isLangSwitcherNode(node));

  _trRestoreAll();
  _TR.active = lang;
  localStorage.setItem('gausin_lang', lang);

  if (!_TR.docMeta) {
    _TR.docMeta = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    };
  }

  if (lang === 'en') {
    syncLangSwitcherUi(getActiveLangEntry());
    document.documentElement.lang = 'en';
    return;
  }

  _trIndicator(true);
  try {
    const blocks = _trBlockElements();
    const nodes = _trNodes().filter((n) => !_isLangSwitcherNode(n));
    const texts = blocks.map((el) => _trBlockText(el)).concat(nodes.map((n) => n.nodeValue.trim()));
    const attrs = _trAttrItems();

    await _trFetch(texts.concat(attrs.map((a) => a.text)), lang);

    _trApplyBlocks(blocks, lang);
    nodes.forEach((node) => _trApplyTextNode(node, lang));

    attrs.forEach(({ el, attr, text }) => {
      const tr = _TR.cache[lang + '|' + text];
      if (!tr || tr === text) return;
      _TR.attrOriginals.push({ el, attr, orig: el.getAttribute(attr) });
      el.setAttribute(attr, tr);
    });

    const trTitle = _TR.cache[lang + '|' + _TR.docMeta.title];
    if (trTitle && trTitle !== _TR.docMeta.title) document.title = trTitle;
    if (_TR.docMeta.desc) {
      const trDesc = _TR.cache[lang + '|' + _TR.docMeta.desc];
      const descEl = document.querySelector('meta[name="description"]');
      if (trDesc && descEl && trDesc !== _TR.docMeta.desc) descEl.setAttribute('content', trDesc);
    }

    document.documentElement.lang = _trGoogleLang(lang);
  } finally {
    _trIndicator(false);
    syncLangSwitcherUi(getActiveLangEntry());
  }
}

/* Translate newly injected content (chatbot messages, search results) */
async function gausinTranslateSubtree(root) {
  const lang = _TR.active;
  if (!root || !lang || lang === 'en') return;

  const blocks = _trBlockElements(root).filter((el) => !el.hasAttribute('data-tr-block'));
  const nodes = _trCollectFromRoot(root).filter((n) => !_isLangSwitcherNode(n));
  const attrs = _trAttrItemsIn(root);
  const texts = blocks.map((el) => _trBlockText(el))
    .concat(nodes.map((n) => n.nodeValue.trim()))
    .concat(attrs.map((a) => a.text))
    .filter((t) => t && t.length >= 2);

  if (!texts.length) return;

  await _trFetch(texts, lang);
  _trApplyBlocks(blocks, lang);
  nodes.forEach((node) => _trApplyTextNode(node, lang));
  attrs.forEach(({ el, attr, text }) => {
    const tr = _TR.cache[lang + '|' + text];
    if (!tr || tr === text) return;
    _TR.attrOriginals.push({ el, attr, orig: el.getAttribute(attr) });
    el.setAttribute(attr, tr);
  });
}

window.gausinTranslateSubtree = gausinTranslateSubtree;
window.gausinGetLang = () => _TR.active;

let _trApplyTimer = null;
function applyStoredLanguage() {
  if (_trApplyTimer) clearTimeout(_trApplyTimer);
  _trApplyTimer = setTimeout(() => {
    _trApplyTimer = null;
    const entry = getActiveLangEntry();
    syncLangSwitcherUi(entry);
    if (entry.code !== 'en') _translatePageTo(entry.code);
  }, 250);
}

/* Called by lang-switcher buttons */
function applyLangChange(entry) {
  setActiveLangEntry(entry);
  syncLangSwitcherUi(entry);
  return _translatePageTo(entry.code);
}

/* ─── Init on DOM ready ───────────────────────────────────── */
function initLangSwitcher() {
  const trigger  = document.getElementById('langTrigger');
  const dropdown = document.getElementById('langDropdown');
  const switcher = document.getElementById('langSwitcher');
  if (!trigger || !dropdown) return;

  /* Toggle dropdown */
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = switcher.classList.toggle('open');
    trigger.setAttribute('aria-expanded', isOpen);
  });

  /* Close on outside click */
  document.addEventListener('click', () => {
    switcher.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
  });

  /* Desktop language selection */
  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-option');
    if (!btn) return;
    e.stopPropagation();
    const entry = LANGUAGES.find(l => l.id === btn.dataset.langId);
    if (!entry) return;
    switcher.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    applyLangChange(entry);
  });

}

document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  initPageTransitions();
  initLangSwitcher();

  const entry = getActiveLangEntry();
  syncLangSwitcherUi(entry);

  /* Load site search + AI chatbot on all pages except admin */
  if (!window.location.pathname.includes('/admin/')) {
    const searchScript = document.createElement('script');
    searchScript.src = 'js/search.js';
    searchScript.defer = true;
    searchScript.onload = () => {
      injectSearchButtons();
      applyStoredLanguage();
    };
    document.body.appendChild(searchScript);

    const chatScript = document.createElement('script');
    chatScript.src = 'js/chatbot.js';
    chatScript.defer = true;
    chatScript.onload = () => applyStoredLanguage();
    document.body.appendChild(chatScript);
  }

  /* First pass after static DOM + injected navbar/footer */
  applyStoredLanguage();
});
