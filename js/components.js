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
  { href: 'products.html', label: 'All Products', icon: 'fa-border-all', i18n: 'mobile.allProducts' },
  { href: 'products.html#evaporators', label: 'Evaporators', icon: 'fa-droplet', i18n: 'mega.evaporators' },
  { href: 'products.html#dryers', label: 'Dryers', icon: 'fa-wind', i18n: 'mega.dryers' },
  { href: 'products.html#heat-exchangers', label: 'Heat Exchangers', icon: 'fa-temperature-high', i18n: 'mega.heatExchangers' },
  { href: 'products.html#cip', label: 'CIP Systems', icon: 'fa-recycle', i18n: 'mega.cip' },
  { href: 'products.html#milk-processing', label: 'Dairy Processing', icon: 'fa-flask', i18n: 'mega.dairyProcessing' },
  { href: 'products.html#vessels', label: 'Pressure Vessels & Tanks', icon: 'fa-database', i18n: 'mega.vessels' },
  { href: 'products.html#milk-equipment', label: 'Milk Equipment', icon: 'fa-jar', i18n: 'mega.milkEquipment' },
  { href: 'products.html#dairy-food-equipment', label: 'Dairy & Food Equipment', icon: 'fa-industry', i18n: 'mega.dairyFood' },
  { href: 'products.html#waste-management', label: 'Waste Management', icon: 'fa-leaf', i18n: 'mega.wasteManagement' },
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
    navI18n: 'nav.services',
    mobileAllI18n: 'mobile.allServices',
    headerIcon: 'fa-screwdriver-wrench',
    headerTitle: 'Engineering Services',
    headerDesc: 'End-to-End Project Delivery',
    items: [
      { href: 'services.html#process-design',        icon: 'fa-drafting-compass',  title: 'Process Design',         desc: 'Simulation, P&ID, Equipment Sizing', titleI18n: 'mega.serv.processDesign', descI18n: 'mega.serv.processDesignDesc' },
      { href: 'services.html#detailed-engineering',  icon: 'fa-ruler-combined',    title: 'Detailed Engineering',   desc: '3D CAD, Piping, Instrumentation', titleI18n: 'mega.serv.detailedEngineering', descI18n: 'mega.serv.detailedEngineeringDesc' },
      { href: 'services.html#turnkey-execution',     icon: 'fa-project-diagram',   title: 'Turnkey Execution',      desc: 'Planning, Commissioning, Handover', titleI18n: 'mega.serv.turnkeyExecution', descI18n: 'mega.serv.turnkeyExecutionDesc' },
      { href: 'services.html#energy-optimization',   icon: 'fa-bolt',              title: 'Energy Optimization',    desc: 'MVR, Heat Recovery, Audits', titleI18n: 'mega.serv.energyOptimization', descI18n: 'mega.serv.energyOptimizationDesc' },
      { href: 'services.html#automation-control',    icon: 'fa-robot',             title: 'Automation & Control',   desc: 'PLC/SCADA, IoT Integration', titleI18n: 'mega.serv.automationControl', descI18n: 'mega.serv.automationControlDesc' },
      { href: 'services.html#consultancy',           icon: 'fa-headset',           title: 'Technical Consultancy',  desc: 'Troubleshooting, De-Bottlenecking', titleI18n: 'mega.serv.consultancy', descI18n: 'mega.serv.consultancyDesc' },
    ],
  },
  {
    pageHref: 'industries.html',
    navLabel: 'Industries',
    navI18n: 'nav.industries',
    mobileAllI18n: 'mobile.allIndustries',
    headerIcon: 'fa-building',
    headerTitle: 'Industries We Serve',
    headerDesc: 'Sector-Specific Engineering Solutions',
    items: [
      { href: 'industries.html#dairy',    icon: 'fa-cow',          title: 'Dairy Industry',    desc: 'Dairy Processing, Evaporators', titleI18n: 'mega.ind.dairy', descI18n: 'mega.ind.dairyDesc' },
      { href: 'industries.html#pharma',   icon: 'fa-pills',        title: 'Pharmaceutical',    desc: 'GMP-Compliant Systems', titleI18n: 'mega.ind.pharma', descI18n: 'mega.ind.pharmaDesc' },
      { href: 'industries.html#chemical', icon: 'fa-flask-vial',   title: 'Chemical Industry', desc: 'Process Plants, Reactors', titleI18n: 'mega.ind.chemical', descI18n: 'mega.ind.chemicalDesc' },
      { href: 'industries.html#food',     icon: 'fa-utensils',     title: 'Food Processing',   desc: 'Hygienic Plant Solutions', titleI18n: 'mega.ind.food', descI18n: 'mega.ind.foodDesc' },
      { href: 'industries.html',          icon: 'fa-wine-bottle',  title: 'Distillery',        desc: 'Evaporation, Dehydration', titleI18n: 'mega.ind.distillery', descI18n: 'mega.ind.distilleryDesc' },
      { href: 'industries.html',          icon: 'fa-bolt-lightning',title: 'Energy & More',    desc: 'Paper, Textile, Energy Sectors', titleI18n: 'mega.ind.energyMore', descI18n: 'mega.ind.energyMoreDesc' },
    ],
  },
  {
    pageHref: 'technology.html',
    navLabel: 'Technology',
    navI18n: 'nav.technology',
    mobileAllI18n: 'mobile.allTechnology',
    headerIcon: 'fa-microchip',
    headerTitle: 'Technology & Innovation',
    headerDesc: 'Advanced Tools and Manufacturing',
    items: [
      { href: 'technology.html#process-simulation', icon: 'fa-atom',             title: 'Process Simulation',    desc: 'CHEMCAD, Mass & Energy Balance', titleI18n: 'mega.tech.processSimulation', descI18n: 'mega.tech.processSimulationDesc' },
      { href: 'technology.html#process-simulation', icon: 'fa-fire-flame-curved',title: 'Thermal Design',        desc: 'HTRI Xchanger Suite', titleI18n: 'mega.tech.thermalDesign', descI18n: 'mega.tech.thermalDesignDesc' },
      { href: 'technology.html#process-simulation', icon: 'fa-pen-ruler',        title: 'CAD & 3D Design',       desc: 'AutoCAD, P&IDs, Plant Layout', titleI18n: 'mega.tech.cadDesign', descI18n: 'mega.tech.cadDesignDesc' },
      { href: 'technology.html#fabrication',        icon: 'fa-industry',         title: 'Fabrication Technology',desc: 'CNC, TIG/MIG Welding, NDT', titleI18n: 'mega.tech.fabrication', descI18n: 'mega.tech.fabricationDesc' },
      { href: 'technology.html#automation-iot',     icon: 'fa-sliders',          title: 'PLC/SCADA Automation',  desc: 'Control Panels, HMI Systems', titleI18n: 'mega.tech.plcScada', descI18n: 'mega.tech.plcScadaDesc' },
      { href: 'technology.html#automation-iot',     icon: 'fa-satellite-dish',   title: 'IoT & Remote Monitoring',desc: 'Cloud Analytics, Diagnostics', titleI18n: 'mega.tech.iotMonitoring', descI18n: 'mega.tech.iotMonitoringDesc' },
    ],
  },
];

function buildMegaMenuHtml(menu) {
  const items = menu.items.map((item) => `
    <a href="${item.href}" class="mega-menu-item">
      <div class="mega-menu-item-icon"><i class="fa-solid ${item.icon}"></i></div>
      <div><div class="mega-menu-item-title"${item.titleI18n ? ` data-i18n="${item.titleI18n}"` : ''}>${item.title}</div><div class="mega-menu-item-desc"${item.descI18n ? ` data-i18n="${item.descI18n}"` : ''}>${item.desc}</div></div>
    </a>
  `).join('');
  return `
    <div class="mega-menu">
      <div class="mega-menu-grid">${items}</div>
    </div>
  `;
}

function buildNavItemHtml(menu, currentPage) {
  const labelI18n = menu.navI18n ? ` data-i18n="${menu.navI18n}"` : '';
  return `
    <div class="nav-item">
      <a href="${menu.pageHref}" class="nav-link${currentPage === menu.pageHref ? ' active' : ''}">
        <span${labelI18n}>${menu.navLabel}</span>
        ${CHEVRON_SVG}
      </a>
      ${buildMegaMenuHtml(menu)}
    </div>
  `;
}

const OUR_CLIENTS_HREF = 'our-clients.html';
const OUR_CLIENTS_LABEL = 'Our Clients';

function buildSimpleNavItemHtml(href, label, currentPage, i18nKey) {
  const labelI18n = i18nKey ? ` data-i18n="${i18nKey}"` : '';
  return `
    <div class="nav-item">
      <a href="${href}" class="nav-link${currentPage === href ? ' active' : ''}"><span${labelI18n}>${label}</span></a>
    </div>
  `;
}

function buildSecondaryNavItems(currentPage) {
  return SECONDARY_MEGA_MENUS.map((menu) => {
    if (menu.pageHref === 'technology.html') {
      return buildSimpleNavItemHtml(OUR_CLIENTS_HREF, OUR_CLIENTS_LABEL, currentPage, 'nav.ourClients') + buildNavItemHtml(menu, currentPage);
    }
    return buildNavItemHtml(menu, currentPage);
  }).join('');
}

function injectMissingOurClientsNav() {
  if (document.querySelector(`.navbar-nav .nav-item > a.nav-link[href="${OUR_CLIENTS_HREF}"]`)) return;
  const techItem = document.querySelector('.navbar-nav .nav-item > a.nav-link[href="technology.html"]')?.closest('.nav-item');
  if (!techItem) return;
  techItem.insertAdjacentHTML('beforebegin', buildSimpleNavItemHtml(OUR_CLIENTS_HREF, OUR_CLIENTS_LABEL, _page, 'nav.ourClients'));
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

function buildProductsMegaMenuHtml() {
  return `
    <div class="mega-menu">
      <div class="mega-menu-grid">
        <a href="products.html#evaporators" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-droplet"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.evaporators">Evaporators</div><div class="mega-menu-item-desc" data-i18n="mega.evaporatorsDesc">Falling Film, Forced Circulation, Plate Type</div></div>
        </a>
        <a href="products.html#dryers" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-wind"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.dryers">Dryers</div><div class="mega-menu-item-desc" data-i18n="mega.dryersDesc">Spray, Spin Flash, Fluidized Bed</div></div>
        </a>
        <a href="products.html#heat-exchangers" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-temperature-high"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.heatExchangers">Heat Exchangers</div><div class="mega-menu-item-desc" data-i18n="mega.heatExchangersDesc">Shell & Tube, Plate Type</div></div>
        </a>
        <a href="products.html#cip" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-recycle"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.cip">CIP Systems</div><div class="mega-menu-item-desc" data-i18n="mega.cipDesc">Clean-In-Place Automation</div></div>
        </a>
        <a href="products.html#milk-processing" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.dairyProcessing">Dairy Processing</div><div class="mega-menu-item-desc" data-i18n="mega.dairyProcessingDesc">Pasteurizer, Deodorizer, Full Plant</div></div>
        </a>
        <a href="products.html#vessels" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-database"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.vessels">Pressure Vessels & Tanks</div><div class="mega-menu-item-desc" data-i18n="mega.vesselsDesc">SS Tanks, Pressure Vessels</div></div>
        </a>
        <a href="products.html#milk-equipment" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-jar"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.milkEquipment">Milk Equipment</div><div class="mega-menu-item-desc" data-i18n="mega.milkEquipmentDesc">Butter Churner, Ghee Kettle, Khoya</div></div>
        </a>
        <a href="products.html#dairy-food-equipment" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-industry"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.dairyFood">Dairy & Food Equipment</div><div class="mega-menu-item-desc" data-i18n="mega.dairyFoodDesc">Milk Can Conveyor, BMC, Crystallization Tank</div></div>
        </a>
        <a href="products.html#waste-management" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-leaf"></i></div>
          <div><div class="mega-menu-item-title" data-i18n="mega.wasteManagement">Waste Management</div><div class="mega-menu-item-desc" data-i18n="mega.wasteManagementDesc">ETP/STP, Biogas, Scrubber, Incinerator</div></div>
        </a>
      </div>
    </div>
  `;
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

  navItem.insertAdjacentHTML('beforeend', buildProductsMegaMenuHtml());
}

/* ─── Top Utility Bar ─────────────────────────────────────── */
const TOPBAR_LINKS = [
  { href: 'digital-solutions.html', label: 'Digital Solutions', icon: 'fa-microchip', i18n: 'nav.digitalSolutions' },
  { href: 'insights.html', label: 'Insights', icon: 'fa-lightbulb', i18n: 'topbar.insights' },
  { href: 'career.html', label: 'Career', icon: 'fa-briefcase', i18n: 'topbar.career' },
  { href: 'downloads.html', label: 'Download', icon: 'fa-download', i18n: 'topbar.download' },
  { href: 'news.html', label: 'News', icon: 'fa-newspaper', i18n: 'topbar.news' },
];

const LANG_CONTINENT_ORDER = [
  { key: 'asia', label: 'Asia', i18n: 'lang.continent.asia' },
  { key: 'europe', label: 'Europe', i18n: 'lang.continent.europe' },
  { key: 'north-america', label: 'North America', i18n: 'lang.continent.northAmerica' },
  { key: 'south-america', label: 'South America', i18n: 'lang.continent.southAmerica' },
  { key: 'africa-middle-east', label: 'Africa & Middle East', i18n: 'lang.continent.africaMiddleEast' },
  { key: 'oceania', label: 'Oceania', i18n: 'lang.continent.oceania' },
];

const LANGUAGES = [
  { id: 'au', code: 'en', label: 'Australia', flag: '🇦🇺', continent: 'oceania' },
  { id: 'at', code: 'de', label: 'Austria', flag: '🇦🇹', continent: 'europe' },
  { id: 'af', code: 'ps', label: 'Afghanistan', flag: '🇦🇫', continent: 'asia' },
  { id: 'bd', code: 'bn', label: 'Bangladesh', flag: '🇧🇩', continent: 'asia' },
  { id: 'az', code: 'az', label: 'Azerbaijan', flag: '🇦🇿', continent: 'asia' },
  { id: 'be', code: 'nl', label: 'Belgium', flag: '🇧🇪', continent: 'europe' },
  { id: 'br', code: 'pt', label: 'Brazil', flag: '🇧🇷', continent: 'south-america' },
  { id: 'bg', code: 'bg', label: 'Bulgaria', flag: '🇧🇬', continent: 'europe' },
  { id: 'ca-en', code: 'en', label: 'Canada (English)', flag: '🇨🇦', continent: 'north-america' },
  { id: 'ca-fr', code: 'fr', label: 'Canada (Français)', flag: '🇨🇦', continent: 'north-america' },
  { id: 'cl', code: 'es', label: 'Chile', flag: '🇨🇱', continent: 'south-america' },
  { id: 'cn', code: 'zh-CN', label: 'China Mainland', flag: '🇨🇳', continent: 'asia' },
  { id: 'co', code: 'es', label: 'Colombia', flag: '🇨🇴', continent: 'south-america' },
  { id: 'cz', code: 'cs', label: 'Czech Republic', flag: '🇨🇿', continent: 'europe' },
  { id: 'fr', code: 'fr', label: 'France', flag: '🇫🇷', continent: 'europe' },
  { id: 'de', code: 'de', label: 'Germany', flag: '🇩🇪', continent: 'europe' },
  { id: 'gr', code: 'el', label: 'Greece', flag: '🇬🇷', continent: 'europe' },
  { id: 'hu', code: 'hu', label: 'Hungary', flag: '🇭🇺', continent: 'europe' },
  { id: 'in', code: 'hi', label: 'India', flag: '🇮🇳', continent: 'asia' },
  { id: 'id', code: 'id', label: 'Indonesia', flag: '🇮🇩', continent: 'asia' },
  { id: 'il', code: 'he', label: 'Israel', flag: '🇮🇱', continent: 'africa-middle-east' },
  { id: 'ir', code: 'fa', label: 'Iran', flag: '🇮🇷', continent: 'africa-middle-east' },
  { id: 'my', code: 'ms', label: 'Malaysia', flag: '🇲🇾', continent: 'asia' },
  { id: 'mx', code: 'es', label: 'Mexico', flag: '🇲🇽', continent: 'north-america' },
  { id: 'sg', code: 'en', label: 'Singapore', flag: '🇸🇬', continent: 'asia' },
  { id: 'lk', code: 'si', label: 'Sri Lanka', flag: '🇱🇰', continent: 'asia' },
  { id: 'it', code: 'it', label: 'Italy', flag: '🇮🇹', continent: 'europe' },
  { id: 'jp', code: 'ja', label: 'Japan', flag: '🇯🇵', continent: 'asia' },
  { id: 'ke', code: 'sw', label: 'Kenya', flag: '🇰🇪', continent: 'africa-middle-east' },
  { id: 'kr', code: 'ko', label: 'Korea', flag: '🇰🇷', continent: 'asia' },
  { id: 'lv', code: 'lv', label: 'Latvia', flag: '🇱🇻', continent: 'europe' },
  { id: 'lt', code: 'lt', label: 'Lithuania', flag: '🇱🇹', continent: 'europe' },
  { id: 'me', code: 'ar', label: 'Middle East', flag: 'ME', continent: 'africa-middle-east' },
  { id: 'qa', code: 'ar', label: 'Qatar', flag: '🇶🇦', continent: 'africa-middle-east' },
  { id: 'nl', code: 'nl', label: 'Netherlands', flag: '🇳🇱', continent: 'europe' },
  { id: 'nz', code: 'en', label: 'New Zealand', flag: '🇳🇿', continent: 'oceania' },
  { id: 'ng', code: 'en', label: 'Nigeria', flag: '🇳🇬', continent: 'africa-middle-east' },
  { id: 'no', code: 'no', label: 'Norway', flag: '🇳🇴', continent: 'europe' },
  { id: 'pe', code: 'es', label: 'Peru', flag: '🇵🇪', continent: 'south-america' },
  { id: 'pl', code: 'pl', label: 'Poland', flag: '🇵🇱', continent: 'europe' },
  { id: 'ro', code: 'ro', label: 'Romania', flag: '🇷🇴', continent: 'europe' },
  { id: 'rs', code: 'sr', label: 'Serbia', flag: '🇷🇸', continent: 'europe' },
  { id: 'sa', code: 'ar', label: 'Saudi Arabia', flag: '🇸🇦', continent: 'africa-middle-east' },
  { id: 'sk', code: 'sk', label: 'Slovakia', flag: '🇸🇰', continent: 'europe' },
  { id: 'si', code: 'sl', label: 'Slovenia', flag: '🇸🇮', continent: 'europe' },
  { id: 'esp', code: 'es', label: 'Spain', flag: '🇪🇸', continent: 'europe' },
  { id: 'ea', code: 'sw', label: 'East Africa', flag: 'EA', continent: 'africa-middle-east' },
  { id: 'eg', code: 'ar', label: 'Egypt', flag: '🇪🇬', continent: 'africa-middle-east' },
  { id: 'na', code: 'ar', label: 'North Africa', flag: 'NA', continent: 'africa-middle-east' },
  { id: 'za', code: 'en', label: 'South Africa', flag: 'ZA', continent: 'africa-middle-east' },
  { id: 'wa', code: 'fr', label: 'West Africa', flag: 'WA', continent: 'africa-middle-east' },
  { id: 'se', code: 'sv', label: 'Sweden', flag: '🇸🇪', continent: 'europe' },
  { id: 'ch', code: 'de', label: 'Switzerland', flag: '🇨🇭', continent: 'europe' },
  { id: 'tw', code: 'zh-TW', label: 'Taiwan, Region', flag: '🇹🇼', continent: 'asia' },
  { id: 'th', code: 'th', label: 'Thailand', flag: '🇹🇭', continent: 'asia' },
  { id: 'tr', code: 'tr', label: 'Türkiye', flag: '🇹🇷', continent: 'asia' },
  { id: 'ae', code: 'ar', label: 'United Arab Emirates', flag: '🇦🇪', continent: 'africa-middle-east' },
  { id: 'gb', code: 'en', label: 'United Kingdom', flag: '🇬🇧', continent: 'europe' },
  { id: 'us', code: 'en', label: 'United States', flag: '🇺🇸', continent: 'north-america' },
  { id: 'ua', code: 'uk', label: 'Ukraine', flag: '🇺🇦', continent: 'europe' },
  { id: 'vn', code: 'vi', label: 'Vietnam', flag: '🇻🇳', continent: 'asia' },
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

const LANG_CODE_ALIASES = {
  en: ['english'],
  hi: ['hindi', 'हिन्दी', 'हिंदी'],
  de: ['german', 'deutsch'],
  fr: ['french', 'français', 'francais'],
  es: ['spanish', 'español', 'espanol'],
  pt: ['portuguese', 'português', 'portugues'],
  ar: ['arabic', 'العربية'],
  he: ['hebrew', 'עברית'],
  ja: ['japanese'],
  ko: ['korean'],
  'zh-CN': ['chinese', 'mandarin', 'simplified'],
  'zh-TW': ['chinese', 'taiwan', 'traditional'],
  it: ['italian', 'italiano'],
  nl: ['dutch', 'nederlands'],
  pl: ['polish', 'polski'],
  tr: ['turkish', 'turkey', 'türkçe', 'turkiye'],
  uk: ['ukrainian'],
  th: ['thai'],
  id: ['indonesian'],
  ms: ['malay'],
  az: ['azerbaijani'],
  ps: ['pashto', 'pashtun'],
  fa: ['persian', 'farsi', 'dari'],
  si: ['sinhala', 'sinhalese'],
  bg: ['bulgarian'],
  cs: ['czech'],
  el: ['greek'],
  hu: ['hungarian'],
  lv: ['latvian'],
  lt: ['lithuanian'],
  no: ['norwegian'],
  ro: ['romanian'],
  sr: ['serbian'],
  sk: ['slovak'],
  sl: ['slovenian'],
  sv: ['swedish'],
  sw: ['swahili'],
};

const LANG_REGION_ALIASES = {
  in: ['india', 'bharat', 'भारत', 'hindi', 'हिन्दी', 'हिंदी', 'hindustan', 'हिन्दुस्तान'],
  az: ['azerbaijan', 'baku'],
  af: ['afghanistan', 'afganistan', 'kabul', 'pashto'],
  lk: ['sri lanka', 'shri lanka', 'sinhala', 'colombo', 'lanka'],
  ir: ['iran', 'persian', 'farsi', 'tehran'],
  qa: ['qatar', 'quatar', 'doha'],
  cn: ['china', 'chinese', 'mandarin', '中国'],
  jp: ['japan', 'japanese', 'nippon'],
  kr: ['korea', 'korean', 'south korea'],
  tw: ['taiwan', 'taipei'],
  tr: ['turkey', 'turkiye', 'istanbul'],
  ae: ['uae', 'dubai', 'emirates', 'arab emirates'],
  gb: ['uk', 'united kingdom', 'britain', 'england'],
  us: ['usa', 'america', 'united states'],
  de: ['germany', 'deutschland'],
  fr: ['france', 'french'],
  il: ['israel', 'israeli'],
  sa: ['saudi', 'arabia'],
};

function normalizeLangSearchQuery(query) {
  return (query || '').trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '');
}

function getLangSearchHaystack(lang) {
  const continent = LANG_CONTINENT_ORDER.find((c) => c.key === lang.continent)?.label || '';
  const aliases = LANG_CODE_ALIASES[lang.code] || [];
  const regionAliases = LANG_REGION_ALIASES[lang.id] || [];
  return [
    lang.label,
    lang.code,
    lang.id,
    getLangCodeDisplay(lang.code),
    getLangRegionDisplay(lang),
    continent,
    ...aliases,
    ...regionAliases,
  ].join(' ').toLowerCase();
}

function buildLangOptionHtml(lang, activeId) {
  return `
    <button class="lang-option${lang.id === activeId ? ' active' : ''}" data-lang-id="${lang.id}" data-lang="${lang.code}" type="button" role="option">
      ${renderLangFlagHtml(lang)}
      <span class="lang-label">${lang.label}</span>
    </button>
  `;
}

function buildLangSwitcherGroupsHtml(activeId) {
  return LANG_CONTINENT_ORDER.map(({ key, label, i18n }) => {
    const langs = LANGUAGES.filter((l) => l.continent === key);
    if (!langs.length) return '';
    const options = langs.map((l) => buildLangOptionHtml(l, activeId)).join('');
    return `
      <div class="lang-group" role="group" aria-label="${label}">
        <div class="lang-group-title"${i18n ? ` data-i18n="${i18n}"` : ''}>${label}</div>
        ${options}
      </div>
    `;
  }).join('');
}

function buildLangDropdownInnerHtml(activeId) {
  return `
    <div class="lang-search-wrap">
      <i class="fa-solid fa-magnifying-glass lang-search-icon" aria-hidden="true"></i>
      <input type="search" class="lang-search-input" id="langSearchInput" autocomplete="off" spellcheck="false" data-i18n-placeholder="lang.searchPlaceholder" placeholder="Search language or region…" aria-controls="langDropdownList" />
    </div>
    <div class="lang-dropdown-body" id="langDropdownList" role="listbox" aria-label="Select region or language">
      ${buildLangSwitcherGroupsHtml(activeId)}
    </div>
    <div class="lang-search-empty" id="langSearchEmpty" hidden data-i18n="lang.searchEmpty">No matching languages</div>
  `;
}

function buildLangSwitcher() {
  const active = getActiveLangEntry();
  return `
    <div class="lang-switcher notranslate" id="langSwitcher" translate="no">
      <button class="lang-trigger" id="langTrigger" type="button" aria-haspopup="listbox" aria-expanded="false" data-i18n-aria="aria.langSelect" aria-label="Select region or language">
        ${renderLangFlagHtml(active)}
        <span class="lang-code">${getLangCodeDisplay(active.code)}</span>
        <i class="fa-solid fa-chevron-down lang-chevron"></i>
      </button>
      <div class="lang-dropdown" id="langDropdown">
        ${buildLangDropdownInnerHtml(active.id)}
      </div>
    </div>
  `;
}

function buildTopbarHtml() {
  const links = TOPBAR_LINKS.map((item) => `
    <a href="${item.href}" class="topbar-link${_page === item.href ? ' active' : ''}">
      <i class="fa-solid ${item.icon}"></i> <span data-i18n="${item.i18n}">${item.label}</span>
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
  if (!navbar) return;
  if (!document.getElementById('topbar')) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = buildTopbarHtml();
    navbar.parentNode.insertBefore(wrapper.firstElementChild, navbar);
  } else {
    syncTopbarLinks();
    upgradeLangSwitcherIfNeeded();
  }
}

function upgradeLangSwitcherIfNeeded() {
  const dropdown = document.getElementById('langDropdown');
  if (!dropdown || document.getElementById('langSearchInput')) return;
  dropdown.innerHTML = buildLangDropdownInnerHtml(getActiveLangEntry().id);
}

function syncTopbarLinks() {
  const container = document.querySelector('.topbar-links');
  if (!container) return;
  TOPBAR_LINKS.forEach((item) => {
    if (container.querySelector(`a[href="${item.href}"]`)) return;
    const html = `
      <a href="${item.href}" class="topbar-link${_page === item.href ? ' active' : ''}">
        <i class="fa-solid ${item.icon}"></i> <span data-i18n="${item.i18n}">${item.label}</span>
      </a>
    `;
    if (item.href === 'digital-solutions.html') container.insertAdjacentHTML('afterbegin', html);
    else container.insertAdjacentHTML('beforeend', html);
  });
}

function removeDigitalSolutionsFromNav() {
  document.querySelectorAll('.navbar-nav .nav-item > a.nav-link[href="digital-solutions.html"]').forEach((link) => {
    link.closest('.nav-item')?.remove();
  });
  document.querySelectorAll('#mobileNav > a[href="digital-solutions.html"]').forEach((link) => link.remove());
  document.querySelectorAll('#mobileNav .mobile-nav-item--digital-solutions').forEach((el) => el.remove());
}

function buildMobileTopbarLinksHtml() {
  const links = TOPBAR_LINKS.map((item) => `
    <a href="${item.href}" class="mobile-topbar-link${_page === item.href ? ' active' : ''}">
      <i class="fa-solid ${item.icon}"></i>
      <span data-i18n="${item.i18n}">${item.label}</span>
    </a>
  `).join('');
  return `<div class="mobile-topbar-links" aria-label="Quick links">${links}</div>`;
}

function injectTopbarMobileLinks() {
  const nav = document.getElementById('mobileNav');
  if (!nav || nav.querySelector('.mobile-topbar-links')) return;
  nav.insertAdjacentHTML('afterbegin', buildMobileTopbarLinksHtml());
}

/* ─── Navbar HTML ─────────────────────────────────────────── */
const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="index.html" class="navbar-logo navbar-logo--image"><img src="images/gausin-logo.png" alt="Gausin International Engineers Pvt. Ltd." class="logo-img" width="220" height="52"></a>

      <nav class="navbar-nav">
        <div class="nav-item">
          <a href="index.html" class="nav-link ${_page==='index.html'?'active':''}" data-i18n="nav.home">Home</a>
        </div>
        <div class="nav-item">
          <a href="about.html" class="nav-link ${_page==='about.html'?'active':''}" data-i18n="nav.about">About</a>
        </div>
        <div class="nav-item">
          <a href="products.html" class="nav-link ${_page==='products.html'?'active':''}">
            <span data-i18n="nav.products">Products</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="mega-menu">
            <div class="mega-menu-grid">
              <a href="products.html#evaporators" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-droplet"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.evaporators">Evaporators</div><div class="mega-menu-item-desc" data-i18n="mega.evaporatorsDesc">Falling Film, Forced Circulation, Plate Type</div></div>
              </a>
              <a href="products.html#dryers" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-wind"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.dryers">Dryers</div><div class="mega-menu-item-desc" data-i18n="mega.dryersDesc">Spray, Spin Flash, Fluidized Bed</div></div>
              </a>
              <a href="products.html#heat-exchangers" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-temperature-high"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.heatExchangers">Heat Exchangers</div><div class="mega-menu-item-desc" data-i18n="mega.heatExchangersDesc">Shell & Tube, Plate Type</div></div>
              </a>
              <a href="products.html#cip" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-recycle"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.cip">CIP Systems</div><div class="mega-menu-item-desc" data-i18n="mega.cipDesc">Clean-In-Place Automation</div></div>
              </a>
              <a href="products.html#milk-processing" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.dairyProcessing">Dairy Processing</div><div class="mega-menu-item-desc" data-i18n="mega.dairyProcessingDesc">Pasteurizer, Deodorizer, Full Plant</div></div>
              </a>
              <a href="products.html#vessels" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-database"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.vessels">Pressure Vessels & Tanks</div><div class="mega-menu-item-desc" data-i18n="mega.vesselsDesc">SS Tanks, Pressure Vessels</div></div>
              </a>
              <a href="products.html#milk-equipment" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-jar"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.milkEquipment">Milk Equipment</div><div class="mega-menu-item-desc" data-i18n="mega.milkEquipmentDesc">Butter Churner, Ghee Kettle, Khoya</div></div>
              </a>
              <a href="products.html#dairy-food-equipment" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-industry"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.dairyFood">Dairy & Food Equipment</div><div class="mega-menu-item-desc" data-i18n="mega.dairyFoodDesc">Milk Can Conveyor, BMC, Crystallization Tank</div></div>
              </a>
              <a href="products.html#waste-management" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-leaf"></i></div>
                <div><div class="mega-menu-item-title" data-i18n="mega.wasteManagement">Waste Management</div><div class="mega-menu-item-desc" data-i18n="mega.wasteManagementDesc">ETP/STP, Biogas, Scrubber, Incinerator</div></div>
              </a>
            </div>
          </div>
        </div>
        ${buildSecondaryNavItems(_page)}
        <div class="nav-item">
          <a href="contact.html" class="nav-link ${_page==='contact.html'?'active':''}" data-i18n="nav.contact">Contact</a>
        </div>
      </nav>

      <div class="navbar-cta">
        <button type="button" class="site-search-btn" id="siteSearchBtn" data-i18n-aria="aria.searchSite" aria-label="Search site" title="Search (Ctrl+K)">
          ${SEARCH_ICON_SVG}
        </button>
        <a href="contact.html" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-paper-plane"></i> <span data-i18n="cta.quote">Get a Quote</span>
        </a>
      </div>

      <button class="navbar-toggle" id="navbarToggle" data-i18n-aria="aria.toggleMenu" aria-label="Toggle menu">
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
        <span class="toggle-bar"></span>
      </button>
    </div>
  </div>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="index.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='index.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.home">Home</span></a>
  <a href="about.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='about.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.aboutMobile">About Us</span></a>
  <a href="products.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='products.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.products">Products</span></a>
  <a href="services.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='services.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.services">Services</span></a>
  <a href="industries.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='industries.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.industries">Industries</span></a>
  <a href="our-clients.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='our-clients.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.ourClients">Our Clients</span></a>
  <a href="technology.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='technology.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.technology">Technology</span></a>
  <a href="contact.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='contact.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;"><span data-i18n="nav.contact">Contact</span></a>
  <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px;">
    <a href="contact.html" class="btn btn-primary" style="width:100%;justify-content:center;"><i class="fa-solid fa-paper-plane"></i> <span data-i18n="cta.quote">Get a Quote</span></a>
    <a href="tel:+919870840779" class="btn btn-outline" style="width:100%;justify-content:center;"><i class="fa-solid fa-phone"></i> <span data-i18n="cta.callUs">Call Us Now</span></a>
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
        <p class="footer-brand-desc" data-i18n="footer.brandDesc">Engineering process excellence through advanced evaporation, drying, and industrial plant solutions. Serving dairy, pharma, chemical, and food industries with precision-engineered systems.</p>
        <div class="footer-social">
          <a href="${SOCIAL_LINKS.linkedin}" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="${SOCIAL_LINKS.x}" class="social-link" aria-label="X" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="${SOCIAL_LINKS.instagram}" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-instagram"></i></a>
          <a href="${SOCIAL_LINKS.youtube}" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-youtube"></i></a>
          <a href="${SOCIAL_LINKS.facebook}" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook-f"></i></a>
        </div>
      </div>

      <div>
        <div class="footer-title" data-i18n="footer.products">Products</div>
        <div class="footer-links">
          <a href="products.html#evaporators" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.fallingFilm">Falling Film Evaporator</span></a>
          <a href="products.html#evaporators" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.forcedCirculation">Forced Circulation Evaporator</span></a>
          <a href="products.html#dryers" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.sprayDryer">Spray Dryer (Nozzle/Disc)</span></a>
          <a href="product-closed-circuit-dryer.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.closedCircuitDryer">Closed Circuit Dryer</span></a>
          <a href="products.html#cip" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.cipSystems">CIP Systems</span></a>
          <a href="products.html#milk-processing" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.dairyPlant">Dairy Processing Plant</span></a>
          <a href="products.html#heat-exchangers" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.heatExchangers">Heat Exchangers</span></a>
          <a href="products.html#vessels" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.pressureVessels">Pressure Vessels & Tanks</span></a>
          <a href="product-etp-stp-treatment-plants.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.etpStp">ETP/STP Treatment Plants</span></a>
          <a href="product-biomass-solid-waste-treatment-plant.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="footer.biomassWaste">Biomass Solid Waste Treatment Plant</span></a>
        </div>
      </div>

      <div>
        <div class="footer-title" data-i18n="footer.company">Company</div>
        <div class="footer-links">
          <a href="about.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.about">About</span></a>
          <a href="products.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.products">Products</span></a>
          <a href="services.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.services">Services</span></a>
          <a href="industries.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.industries">Industries</span></a>
          <a href="our-clients.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.ourClients">Our Clients</span></a>
          <a href="technology.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.technology">Technology</span></a>
          <a href="digital-solutions.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.digitalSolutions">Digital Solutions</span></a>
          <a href="insights.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="topbar.insights">Insights</span></a>
          <a href="career.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="topbar.career">Career</span></a>
          <a href="downloads.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="topbar.download">Download</span></a>
          <a href="news.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="topbar.news">News</span></a>
          <a href="contact.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i><span data-i18n="nav.contact">Contact</span></a>
        </div>
      </div>

      <div>
        <div class="footer-title" data-i18n="footer.contactUs">Contact Us</div>
        <div class="footer-contact-item">
          <div class="footer-contact-icon"><i class="fa-solid fa-location-dot"></i></div>
          <div class="footer-contact-text" data-i18n="footer.address">DH-249, Pallavpuram Phase-1, Roorkee Road, Meerut, Uttar Pradesh, India - 250110</div>
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
        <div>&copy; ${new Date().getFullYear()} Gausin International Engineers Pvt. Ltd. <span data-i18n="footer.rights">All rights reserved.</span></div>
        <div class="footer-credit" data-i18n="footer.credit">Designed &amp; Developed by Gausin International Engineers Pvt. Ltd.</div>
      </div>
      <div class="footer-bottom-links">
        <a href="privacy-policy.html" class="footer-bottom-link" data-i18n="footer.privacy">Privacy Policy</a>
        <a href="terms-of-service.html" class="footer-bottom-link" data-i18n="footer.terms">Terms of Service</a>
        <a href="sitemap.html" class="footer-bottom-link" data-i18n="footer.sitemap">Sitemap</a>
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
   target="_blank" rel="noopener" class="whatsapp-float" id="whatsappFloat" data-i18n-aria="aria.whatsapp" aria-label="Chat on WhatsApp">
  <i class="fa-brands fa-whatsapp"></i>
  <span class="whatsapp-tooltip" data-i18n="float.whatsapp">Chat on WhatsApp</span>
</a>

<!-- Back To Top -->
<button id="backToTop" data-i18n-aria="aria.backToTop" aria-label="Back to top">
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
          <span style="font-size:0.9375rem;font-weight:700;color:white;font-family:'Montserrat',sans-serif;" data-i18n="cookie.title">We use cookies</span>
        </div>
        <p style="font-size:0.875rem;color:var(--gray-400);line-height:1.6;margin:0;">
          <span data-i18n="cookie.body">We use cookies to enhance your experience and analyze website traffic. By clicking "Accept All", you consent to our use of cookies.</span>
          <a href="privacy-policy.html" style="color:var(--blue-400);text-decoration:underline;margin-left:4px;" data-i18n="cookie.learnMore">Learn more</a>
        </p>
      </div>
      <div style="display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap;">
        <button id="cookieReject" style="
          padding:10px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.2);
          background:transparent;color:var(--gray-400);font-size:0.875rem;font-weight:600;
          cursor:pointer;transition:all 0.2s;font-family:'Montserrat',sans-serif;
        " onmouseover="this.style.borderColor='rgba(255,255,255,0.4)';this.style.color='white'"
           onmouseout="this.style.borderColor='rgba(255,255,255,0.2)';this.style.color='var(--gray-400)'" data-i18n="cookie.reject">
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
          <i class="fa-solid fa-check" style="margin-right:6px;"></i><span data-i18n="cookie.accept">Accept All</span>
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
  if (mobileNav) {
    mobileNav.querySelector('#siteSearchBtnMobile')?.remove();
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

function replaceMobileNavLinkWithAccordion(mobileNav, pageHref, label, links, className, labelI18n) {
  if (mobileNav.querySelector('.' + className)) return;

  const navLink = mobileNav.querySelector(
    `a[href="${pageHref}"].mobile-nav-link-plain, a[href="${pageHref}"].mobile-nav-link`
  );
  if (!navLink) return;

  const isActive = _page === pageHref;
  const subLinks = links.map((item) =>
    `<a href="${item.href}" class="mobile-sub-link"><i class="fa-solid ${item.icon}" style="width:18px;color:var(--blue-500);"></i>${item.i18n ? `<span data-i18n="${item.i18n}">${item.label}</span>` : ` ${item.label}`}</a>`
  ).join('');

  const accordion = document.createElement('div');
  accordion.className = `mobile-nav-item ${className}`;
  accordion.innerHTML = `
    <button type="button" class="mobile-nav-link mobile-toggle">
      <span style="color:${isActive ? 'var(--blue-500)' : 'inherit'}"${labelI18n ? ` data-i18n="${labelI18n}"` : ''}>${label}</span>
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
    'mobile-nav-item--products',
    'nav.products'
  );

  SECONDARY_MEGA_MENUS.forEach((menu) => {
    const slug = menu.pageHref.replace('.html', '');
    const links = [
      { href: menu.pageHref, label: `All ${menu.navLabel}`, icon: menu.headerIcon || 'fa-border-all', i18n: menu.mobileAllI18n },
      ...menu.items.map((item) => ({ href: item.href, label: item.title, icon: item.icon, i18n: item.titleI18n })),
    ];
    replaceMobileNavLinkWithAccordion(
      mobileNav,
      menu.pageHref,
      menu.navLabel,
      links,
      `mobile-nav-item--${slug}`,
      menu.navI18n
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
function upgradeInlineShell() {
  const nav = document.getElementById('navbar');
  if (!nav || nav.dataset.gausinShellV2) return;
  if (nav.querySelector('[data-i18n]')) {
    nav.dataset.gausinShellV2 = '1';
    return;
  }

  const tmp = document.createElement('div');
  tmp.innerHTML = NAVBAR_HTML;
  const newNav = tmp.firstElementChild;
  nav.replaceWith(newNav);

  const oldMobile = document.getElementById('mobileNav');
  if (oldMobile) oldMobile.remove();

  const tmpMobile = document.createElement('div');
  tmpMobile.innerHTML = getMobileNavHtml();
  newNav.insertAdjacentElement('afterend', tmpMobile.firstElementChild);

  newNav.dataset.gausinShellV2 = '1';
  injectMissingSecondaryNavItems();
  injectMissingOurClientsNav();
  injectSecondaryMegaMenus();
  fixProductsMegaMenu();
  injectMobileNavIfMissing();
  injectMissingMobileNavLinks();
  injectMissingOurClientsMobileLink();
  injectMobileNavAccordions();
  injectSearchButtons();
}

function injectComponents() {
  ensureFlagIcons();

  if (!document.getElementById('navbar')) {
    const navWrapper = document.createElement('div');
    navWrapper.innerHTML = NAVBAR_HTML;
    document.body.insertBefore(navWrapper.firstElementChild, document.body.firstChild);
    const mobileWrapper = document.createElement('div');
    mobileWrapper.innerHTML = getMobileNavHtml();
    document.body.insertBefore(mobileWrapper.firstElementChild, document.body.children[1]);
  } else {
    upgradeInlineShell();
  }

  injectMobileNavIfMissing();

  injectTopbar();
  removeDigitalSolutionsFromNav();
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

  const btt = document.getElementById('backToTop');
  if (btt && !btt.hasAttribute('data-i18n-aria')) {
    btt.setAttribute('data-i18n-aria', 'aria.backToTop');
  }

  const entry = getActiveLangEntry();
  if (entry.code !== 'en') {
    whenI18nReady(() => applyLangChange(entry));
  }
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

// ═══ LEGACY: Google Translate engine (DISABLED — replaced by js/i18n.js) ═══
if (false) {
const _TR = {
  cache:          {},
  originals:      [],
  blockOriginals: [],
  attrOriginals:  [],
  active:         'en',
  docMeta:        null,
};

/* Only skip language UI + navbar CTA + product H1 (whole-title German terms) */
const _TR_SKIP = '#langSwitcher,.mobile-lang-btns,.notranslate,[translate="no"],#google_translate_element,.topbar-link i,.navbar-cta .btn-primary,.mobile-nav a.btn-primary[href*="contact"],.mobile-nav a.btn-primary[href="#inquiry"],.prod-title';

/* German product H1 — avoids “Fallender Film” (cinema) for liquid-film equipment */
const PRODUCT_TITLE_DE = {
  'Falling Film Evaporator': 'Fallfilmverdampfer',
  'Rising Film Evaporator': 'Steigfilmverdampfer',
  'Agitated Thin Film Dryer (ATFD)': 'Rühr-Dünnschichttrockner (ATFD)',
};

function _prodTitleKey(el) {
  return el.textContent.replace(/\s+/g, ' ').trim();
}

async function syncProductTitles(lang) {
  const titles = document.querySelectorAll('.prod-title');
  if (!titles.length) return;
  for (const el of titles) {
    if (!el.dataset.gausinTitleOrig) el.dataset.gausinTitleOrig = el.innerHTML;
    if (lang === 'en') {
      el.innerHTML = el.dataset.gausinTitleOrig;
      continue;
    }
    const key = _prodTitleKey(el);
    if (lang === 'de' && PRODUCT_TITLE_DE[key]) {
      el.textContent = PRODUCT_TITLE_DE[key];
      continue;
    }
    const tr = await _trFetchOne(key, lang);
    el.textContent = tr;
  }
}

/* Short navbar CTA labels — avoids cut-off when auto-translate returns long text */
const NAVBAR_CTA_LABELS = {
  en: 'Get a Quote',
  de: 'Angebot',
  fr: 'Devis',
  es: 'Cotización',
  pt: 'Orçamento',
  it: 'Preventivo',
  nl: 'Offerte',
  cs: 'Nabídka',
  pl: 'Wycena',
  hi: 'कोटेशन',
  'zh-CN': '获取报价',
  ja: '見積もり',
  ko: '견적',
  ar: 'عرض سعر',
  el: 'Προσφορά',
  hu: 'Ajánlat',
  bg: 'Оферта',
  ms: 'Sebut Harga',
  id: 'Penawaran',
  lv: 'Piedāvājums',
  az: 'Təklif',
  he: 'הצעת מחיר',
  ps: 'کوټ',
  fa: 'پیشنهاد',
  si: 'කෝට්',
  vi: 'Báo giá',
  bn: 'কোট',
};

const NAVBAR_CTA_TITLES = {
  de: 'Holen Sie sich ein Angebot',
  fr: 'Demander un devis',
  es: 'Solicitar cotización',
  pt: 'Solicitar orçamento',
  it: 'Richiedi preventivo',
  nl: 'Offerte aanvragen',
};

function _navbarCtaLinks() {
  return document.querySelectorAll(
    '.navbar-cta a.btn-primary[href*="contact"], .navbar-cta a.btn-primary[href="#inquiry"], ' +
    '.mobile-nav a.btn-primary[href*="contact"], .mobile-nav a.btn-primary[href="#inquiry"]'
  );
}

function syncNavbarCtaLabels(lang) {
  const code = lang || 'en';
  const label = NAVBAR_CTA_LABELS[code] ?? (code === 'en' ? 'Get a Quote' : null);
  if (!label) return;

  _navbarCtaLinks().forEach((link) => {
    const icon = link.querySelector('i');
    link.textContent = '';
    if (icon) link.appendChild(icon);
    link.appendChild(document.createTextNode(' ' + label));
    const title = NAVBAR_CTA_TITLES[code];
    if (title) link.setAttribute('title', title);
    else link.removeAttribute('title');
  });
}

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
    .replace(/\bAgitated Thin Film Dryer \(ATFD\)\b/gi, '⟦G:ATFD⟧')
    .replace(/\bAgitated Thin Film Dryer\b/gi, '⟦G:ATFD⟧')
    .replace(/\bFalling Film Evaporator\b/gi, '⟦G:FFEV⟧')
    .replace(/\bRising Film Evaporator\b/gi, '⟦G:RFEV⟧')
    .replace(/\bFalling Film\b/gi, '⟦G:FF⟧')
    .replace(/\bRising Film\b/gi, '⟦G:RF⟧')
    .replace(/\bThin Film\b/gi, '⟦G:TF⟧')
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
  if (!text) return text;
  if (_TR.active !== 'de') return text;
  return text
    .replace(/⟦G:FFEV⟧/g, 'Fallfilmverdampfer')
    .replace(/⟦G:RFEV⟧/g, 'Steigfilmverdampfer')
    .replace(/⟦G:ATFD⟧/g, 'Rühr-Dünnschichttrockner (ATFD)')
    .replace(/⟦G:FF⟧/g, 'Fallfilm')
    .replace(/⟦G:RF⟧/g, 'Steigfilm')
    .replace(/⟦G:TF⟧/g, 'Dünnschicht')
    .replace(/\bFallender Film[\s-]*Verdampfer\b/gi, 'Fallfilmverdampfer')
    .replace(/\bSteigender Film[\s-]*Verdampfer\b/gi, 'Steigfilmverdampfer')
    .replace(/\bFallender Film\b/gi, 'Fallfilm')
    .replace(/\bSteigender Film\b/gi, 'Steigfilm')
    .replace(/\bDünner Film\b/gi, 'Dünnschicht');
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
    syncNavbarCtaLabels('en');
    await syncProductTitles('en');
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
    syncNavbarCtaLabels(lang);
    await syncProductTitles(lang);
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
} // END LEGACY Google Translate

/* ─── Hybrid Static i18n (Phase 1) ─────────────────────────── */
const GAUSIN_I18N_ASSET_V = '20260712f';
(function preloadGausinI18n() {
  if (document.querySelector('script[data-gausin-i18n]')) return;
  const page = document.createElement('script');
  page.src = `js/i18n-page.js?v=${GAUSIN_I18N_ASSET_V}`;
  page.defer = true;
  page.setAttribute('data-gausin-i18n-page', '1');
  page.addEventListener('load', () => {
    const lang = localStorage.getItem('gausin_lang');
    if (lang && lang !== 'en' && window.gausinApplyI18n) window.gausinApplyI18n(lang);
  }, { once: true });
  document.head.appendChild(page);
  const s = document.createElement('script');
  s.src = `js/i18n.js?v=${GAUSIN_I18N_ASSET_V}`;
  s.defer = true;
  s.setAttribute('data-gausin-i18n', '1');
  document.head.appendChild(s);
})();

function whenI18nReady(cb) {
  const ready = () => typeof window.gausinApplyI18n === 'function' && typeof window.gausinApplyPageContent === 'function';
  if (ready()) {
    cb();
    return;
  }
  let attempts = 0;
  const tick = () => {
    if (ready()) {
      cb();
      return;
    }
    attempts += 1;
    if (attempts > 80) {
      cb();
      return;
    }
    setTimeout(tick, 25);
  };
  document.querySelector('script[data-gausin-i18n-page]')?.addEventListener('load', tick, { once: true });
  document.querySelector('script[data-gausin-i18n]')?.addEventListener('load', tick, { once: true });
  tick();
}

/* Legacy stub — search/chatbot may still reference this name */
window.gausinTranslateSubtree = function _legacyTranslateStub() {};

let _trApplyTimer = null;
function applyStoredLanguage() {
  if (_trApplyTimer) clearTimeout(_trApplyTimer);
  _trApplyTimer = setTimeout(async () => {
    _trApplyTimer = null;
    const entry = getActiveLangEntry();
    syncLangSwitcherUi(entry);
    if (window.gausinApplyI18n) await window.gausinApplyI18n(entry.code);
    syncNavbarCtaLabels(entry.code);
  }, 250);
}

/* Called by lang-switcher buttons */
function applyLangChange(entry) {
  setActiveLangEntry(entry);
  syncLangSwitcherUi(entry);
  if (window.gausinApplyI18n) {
    return window.gausinApplyI18n(entry.code).then(() => syncNavbarCtaLabels(entry.code));
  }
  syncNavbarCtaLabels(entry.code);
  return Promise.resolve();
}

/* ─── Init on DOM ready ───────────────────────────────────── */
function resetLangSearch() {
  const searchInput = document.getElementById('langSearchInput');
  const emptyEl = document.getElementById('langSearchEmpty');
  if (searchInput) searchInput.value = '';
  dropdownQueryAllLangOptions().forEach((opt) => {
    opt.hidden = false;
    opt.classList.remove('lang-option--hidden');
  });
  dropdownQueryAllLangGroups().forEach((group) => {
    group.hidden = false;
    group.classList.remove('lang-group--hidden');
  });
  if (emptyEl) emptyEl.hidden = true;
}

function dropdownQueryAllLangOptions() {
  return document.querySelectorAll('#langDropdownList .lang-option');
}

function dropdownQueryAllLangGroups() {
  return document.querySelectorAll('#langDropdownList .lang-group');
}

function filterLangDropdown(query) {
  const q = normalizeLangSearchQuery(query);
  const emptyEl = document.getElementById('langSearchEmpty');
  let visibleCount = 0;

  dropdownQueryAllLangOptions().forEach((opt) => {
    const entry = LANGUAGES.find((l) => l.id === opt.dataset.langId);
    const hay = entry ? normalizeLangSearchQuery(getLangSearchHaystack(entry)) : '';
    const match = !q || hay.includes(q);
    opt.hidden = !match;
    opt.classList.toggle('lang-option--hidden', !match);
    if (match) visibleCount += 1;
  });

  dropdownQueryAllLangGroups().forEach((group) => {
    const hasVisible = group.querySelector('.lang-option:not(.lang-option--hidden):not([hidden])');
    group.hidden = !hasVisible;
    group.classList.toggle('lang-group--hidden', !hasVisible);
  });

  if (emptyEl) emptyEl.hidden = visibleCount > 0 || !q;
}

function closeLangSwitcher() {
  const switcher = document.getElementById('langSwitcher');
  const trigger = document.getElementById('langTrigger');
  if (!switcher || !trigger) return;
  switcher.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
  resetLangSearch();
}

let _langSwitcherUiBound = false;

function initLangSwitcher() {
  upgradeLangSwitcherIfNeeded();

  const trigger  = document.getElementById('langTrigger');
  const dropdown = document.getElementById('langDropdown');
  const switcher = document.getElementById('langSwitcher');
  if (!trigger || !dropdown || !switcher) return;

  if (_langSwitcherUiBound) return;
  _langSwitcherUiBound = true;

  /* Toggle dropdown */
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = switcher.classList.toggle('open');
    trigger.setAttribute('aria-expanded', isOpen);
    if (isOpen) {
      setTimeout(() => document.getElementById('langSearchInput')?.focus(), 0);
    } else {
      resetLangSearch();
    }
  });

  /* Close only when clicking outside the switcher */
  document.addEventListener('click', (e) => {
    if (!switcher.classList.contains('open')) return;
    if (switcher.contains(e.target)) return;
    closeLangSwitcher();
  });

  /* Keep dropdown open while interacting inside it */
  dropdown.addEventListener('mousedown', (e) => e.stopPropagation());

  /* Filter as user types — delegated so upgraded markup still works */
  document.addEventListener('input', (e) => {
    if (e.target?.id === 'langSearchInput') filterLangDropdown(e.target.value);
  });

  document.addEventListener('keydown', (e) => {
    if (e.target?.id !== 'langSearchInput') return;
    e.stopPropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLangSwitcher();
      trigger.focus();
    }
  });

  /* Language selection */
  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-option');
    if (!btn || btn.hidden || btn.classList.contains('lang-option--hidden')) return;
    e.stopPropagation();
    const entry = LANGUAGES.find(l => l.id === btn.dataset.langId);
    if (!entry) return;
    closeLangSwitcher();
    applyLangChange(entry);
  });

}

document.addEventListener('DOMContentLoaded', () => {
  whenI18nReady(() => {
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
});
