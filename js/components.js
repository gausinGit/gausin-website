/* ============================================================
   GAUSIN INTERNATIONAL ENGINEERS PVT. LTD.
   Shared Components — Auto-inject Navbar, Footer, WhatsApp, Cookie
   ============================================================ */

'use strict';

/* ─── Social profile URLs ─────────────────────────────────── */
const SOCIAL_LINKS = {
  x: 'https://x.com/Gausin_117',
  instagram: 'https://www.instagram.com/gaurav67165/',
  youtube: 'https://www.youtube.com/@GausinInternationalEngineersPv',
  facebook: 'https://www.facebook.com/profile.php?id=61590538293790',
};

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
    headerDesc: 'End-to-end project delivery',
    items: [
      { href: 'services.html#process-design',        icon: 'fa-drafting-compass',  title: 'Process Design',         desc: 'Simulation, P&ID, Equipment Sizing' },
      { href: 'services.html#detailed-engineering',  icon: 'fa-ruler-combined',    title: 'Detailed Engineering',   desc: '3D CAD, Piping, Instrumentation' },
      { href: 'services.html#turnkey-execution',     icon: 'fa-project-diagram',   title: 'Turnkey Execution',      desc: 'Planning, Commissioning, Handover' },
      { href: 'services.html#energy-optimization',   icon: 'fa-bolt',              title: 'Energy Optimization',    desc: 'MVR, Heat Recovery, Audits' },
      { href: 'services.html#automation-control',    icon: 'fa-robot',             title: 'Automation & Control',   desc: 'PLC/SCADA, IoT Integration' },
      { href: 'services.html#consultancy',           icon: 'fa-headset',           title: 'Technical Consultancy',  desc: 'Troubleshooting, De-bottlenecking' },
    ],
  },
  {
    pageHref: 'industries.html',
    navLabel: 'Industries',
    headerIcon: 'fa-building',
    headerTitle: 'Industries We Serve',
    headerDesc: 'Sector-specific engineering solutions',
    items: [
      { href: 'industries.html#dairy',    icon: 'fa-cow',          title: 'Dairy Industry',    desc: 'Milk processing, evaporators' },
      { href: 'industries.html#pharma',   icon: 'fa-pills',        title: 'Pharmaceutical',    desc: 'GMP-compliant systems' },
      { href: 'industries.html#chemical', icon: 'fa-flask-vial',   title: 'Chemical Industry', desc: 'Process plants, reactors' },
      { href: 'industries.html#food',     icon: 'fa-utensils',     title: 'Food Processing',   desc: 'Hygienic plant solutions' },
      { href: 'industries.html',          icon: 'fa-wine-bottle',  title: 'Distillery',        desc: 'Evaporation, dehydration' },
      { href: 'industries.html',          icon: 'fa-bolt-lightning',title: 'Energy & More',    desc: 'Paper, Textile, Energy sectors' },
    ],
  },
  {
    pageHref: 'technology.html',
    navLabel: 'Technology',
    headerIcon: 'fa-microchip',
    headerTitle: 'Technology & Innovation',
    headerDesc: 'Advanced tools and manufacturing',
    items: [
      { href: 'technology.html#process-simulation', icon: 'fa-atom',             title: 'Process Simulation',    desc: 'CHEMCAD, Mass & Energy Balance' },
      { href: 'technology.html#process-simulation', icon: 'fa-fire-flame-curved',title: 'Thermal Design',        desc: 'HTRI Xchanger Suite' },
      { href: 'technology.html#process-simulation', icon: 'fa-pen-ruler',        title: 'CAD & 3D Design',       desc: 'AutoCAD, P&IDs, Plant Layout' },
      { href: 'technology.html#fabrication',        icon: 'fa-industry',         title: 'Fabrication Technology',desc: 'CNC, TIG/MIG Welding, NDT' },
      { href: 'technology.html#automation-iot',     icon: 'fa-sliders',          title: 'PLC/SCADA Automation',  desc: 'Control panels, HMI systems' },
      { href: 'technology.html#automation-iot',     icon: 'fa-satellite-dish',   title: 'IoT & Remote Monitoring',desc: 'Cloud analytics, diagnostics' },
    ],
  },
  {
    pageHref: 'tech-ai.html',
    navLabel: 'Tech & AI',
    items: [
      { href: 'tech-ai.html#web-development', icon: 'fa-code', title: 'Web Development', desc: 'Websites & web applications' },
      { href: 'tech-ai.html#mobile-apps', icon: 'fa-mobile-screen', title: 'Mobile App Development', desc: 'iOS & Android applications' },
      { href: 'tech-ai.html#desktop-apps', icon: 'fa-desktop', title: 'Desktop Applications', desc: 'Cross-platform desktop software' },
      { href: 'tech-ai.html#ai-ml', icon: 'fa-brain', title: 'AI/ML Solutions', desc: 'Machine learning & AI systems' },
      { href: 'tech-ai.html#automation', icon: 'fa-gears', title: 'Business Automation', desc: 'Workflow & process automation' },
      { href: 'tech-ai.html#cloud', icon: 'fa-cloud', title: 'Cloud Solutions', desc: 'Cloud deployment & migration' },
      { href: 'tech-ai.html#custom-software', icon: 'fa-laptop-code', title: 'Custom Software Development', desc: 'Tailored software solutions' },
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

function buildSecondaryNavItems(currentPage) {
  return SECONDARY_MEGA_MENUS.map((menu) => buildNavItemHtml(menu, currentPage)).join('');
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
          <div><div class="mega-menu-item-title">CIP Systems</div><div class="mega-menu-item-desc">Clean-in-Place automation</div></div>
        </a>
        <a href="products.html#milk-processing" class="mega-menu-item">
          <div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div>
          <div><div class="mega-menu-item-title">Milk Processing</div><div class="mega-menu-item-desc">Pasteurizer, Deodorizer, Full Plant</div></div>
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
          <div><div class="mega-menu-item-title">Dairy & Food Equipments</div><div class="mega-menu-item-desc">Milk Can Conveyor, BMC, Crystallization Tank</div></div>
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
  { href: 'career.html', label: 'Career', icon: 'fa-briefcase' },
  { href: 'downloads.html', label: 'Download', icon: 'fa-download' },
  { href: 'news.html', label: 'News', icon: 'fa-newspaper' },
];

const LANGUAGES = [
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी',   flag: '🇮🇳' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'es', label: 'Español',  flag: '🇪🇸' },
];

function getActiveLang() {
  return localStorage.getItem('gausin_lang') || 'en';
}

function buildLangSwitcher() {
  const active = LANGUAGES.find(l => l.code === getActiveLang()) || LANGUAGES[0];
  const items = LANGUAGES.map(l => `
    <button class="lang-option${l.code === active.code ? ' active' : ''}" data-lang="${l.code}" type="button">
      <span class="lang-flag">${l.flag}</span>
      <span class="lang-label">${l.label}</span>
    </button>
  `).join('');
  return `
    <div class="lang-switcher" id="langSwitcher">
      <button class="lang-trigger" id="langTrigger" type="button" aria-haspopup="true" aria-expanded="false">
        <span class="lang-flag">${active.flag}</span>
        <span class="lang-code">${active.code.toUpperCase()}</span>
        <i class="fa-solid fa-chevron-down lang-chevron"></i>
      </button>
      <div class="lang-dropdown" id="langDropdown" role="listbox" aria-label="Select language">
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

function injectTopbarMobileLinks() {
  const mobileNav = document.getElementById('mobileNav');
  if (!mobileNav || mobileNav.querySelector('.mobile-topbar-links')) return;
  const links = TOPBAR_LINKS.map((item) => `
    <a href="${item.href}" class="mobile-topbar-link${_page === item.href ? ' active' : ''}">
      <i class="fa-solid ${item.icon}"></i> ${item.label}
    </a>
  `).join('');
  const activeLang = LANGUAGES.find(l => l.code === getActiveLang()) || LANGUAGES[0];
  const mobileLangBtns = LANGUAGES.map(l => `
    <button class="mobile-lang-btn${l.code === activeLang.code ? ' active' : ''}" data-lang="${l.code}" type="button">
      <span>${l.flag}</span> ${l.label}
    </button>
  `).join('');
  mobileNav.insertAdjacentHTML('afterbegin', `
    <div class="mobile-topbar-links">${links}</div>
    <div class="mobile-lang-row">
      <span class="mobile-lang-row-label"><i class="fa-solid fa-globe"></i> Language</span>
      <div class="mobile-lang-btns">${mobileLangBtns}</div>
    </div>
  `);
}

/* ─── Navbar HTML ─────────────────────────────────────────── */
const NAVBAR_HTML = `
<nav class="navbar" id="navbar">
  <div class="container">
    <div class="navbar-inner">
      <a href="index.html" class="navbar-logo footer-logo"><img src="images/gausin-logo.png" alt="" class="logo-img" width="110" height="52" aria-hidden="true"><div class="logo-text"><div class="logo-name">Gausin International</div><div class="logo-tagline">Engineers Pvt. Ltd.</div></div></a>

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
                <div><div class="mega-menu-item-title">CIP Systems</div><div class="mega-menu-item-desc">Clean-in-Place automation</div></div>
              </a>
              <a href="products.html#milk-processing" class="mega-menu-item">
                <div class="mega-menu-item-icon"><i class="fa-solid fa-flask"></i></div>
                <div><div class="mega-menu-item-title">Milk Processing</div><div class="mega-menu-item-desc">Pasteurizer, Deodorizer, Full Plant</div></div>
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
                <div><div class="mega-menu-item-title">Dairy & Food Equipments</div><div class="mega-menu-item-desc">Milk Can Conveyor, BMC, Crystallization Tank</div></div>
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
  <a href="technology.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='technology.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Technology</a>
  <a href="tech-ai.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='tech-ai.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Tech & AI</a>
  <a href="contact.html" class="mobile-nav-link-plain" style="display:flex;justify-content:space-between;padding:16px 0;font-weight:600;color:${_page==='contact.html'?'var(--blue-500)':'var(--gray-800)'};border-bottom:1px solid var(--gray-100);font-family:'Montserrat',sans-serif;">Contact</a>
  <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px;">
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
          <a href="#" class="social-link" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
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
          <a href="products.html#milk-processing" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Milk Processing Plant</a>
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
          <a href="technology.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Technology</a>
          <a href="tech-ai.html" class="footer-link"><i class="fa-solid fa-chevron-right" style="font-size:0.625rem;color:var(--blue-500);"></i>Tech & AI</a>
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
        <a href="sitemap.xml" class="footer-bottom-link">Sitemap</a>
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
  <span class="whatsapp-tooltip">Chat with us!</span>
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
          <a href="#" style="color:var(--blue-400);text-decoration:underline;margin-left:4px;">Learn more</a>
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

/* ─── Inject all components ───────────────────────────────── */
function injectComponents() {
  // Navbar (only if not already present from inline HTML)
  if (!document.getElementById('navbar')) {
    const navWrapper = document.createElement('div');
    navWrapper.innerHTML = NAVBAR_HTML;
    document.body.insertBefore(navWrapper.firstElementChild, document.body.firstChild);
    // Mobile nav
    const mobileWrapper = document.createElement('div');
    mobileWrapper.innerHTML = NAVBAR_HTML.split('</nav>')[1];
    document.body.insertBefore(mobileWrapper.firstElementChild, document.body.children[1]);
  }

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
    }
  }, 2000);

  injectTopbarMobileLinks();
  injectMissingSecondaryNavItems();
  injectSecondaryMegaMenus();
  fixProductsMegaMenu();
  injectMobileNavLink('tech-ai.html', 'Tech & AI');

  // Cookie buttons
  document.getElementById('cookieAccept')?.addEventListener('click', () => {
    localStorage.setItem('gausin_cookie_consent', 'accepted');
    document.getElementById('cookieBanner').style.transform = 'translateY(100%)';
  });
  document.getElementById('cookieReject')?.addEventListener('click', () => {
    localStorage.setItem('gausin_cookie_consent', 'rejected');
    document.getElementById('cookieBanner').style.transform = 'translateY(100%)';
  });
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

  /* Page Transition */
  body.page-loading * { pointer-events: none; }

  /* Announcement bar */
  .announce-bar {
    background: linear-gradient(135deg, var(--blue-700), var(--blue-500));
    color: white;
    text-align: center;
    padding: 10px 40px 10px 16px;
    font-size: 0.8125rem;
    font-weight: 600;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;
    max-width: 100%;
    overflow: hidden;
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 0.02em;
  }
  body.has-announce-bar .topbar {
    top: var(--announce-bar-height, 40px);
  }
  body.has-announce-bar .navbar {
    top: calc(var(--announce-bar-height, 40px) + var(--topbar-height));
  }
  body.has-announce-bar {
    --navbar-offset: calc(var(--announce-bar-height, 40px) + var(--topbar-height));
  }

  .mobile-topbar-links {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gray-200);
  }
  .mobile-topbar-link {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 8px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--gray-700);
    background: var(--gray-50);
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .mobile-topbar-link.active {
    color: var(--blue-600);
    background: var(--blue-50);
    border-color: var(--blue-200);
  }
  .announce-bar a { color: var(--blue-200); text-decoration: underline; margin: 0 4px; }
  .announce-bar .announce-close {
    position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    background: none; border: none; color: rgba(255,255,255,0.7);
    cursor: pointer; font-size: 1rem; transition: color 0.2s;
  }
  .announce-bar .announce-close:hover { color: white; }

  @media (max-width: 768px) {
    .whatsapp-float { bottom: 84px; right: 20px; width: 50px; height: 50px; font-size: 1.5rem; }
    .whatsapp-tooltip { display: none; }
  }
</style>
`;

/* ─── Announcement Bar ────────────────────────────────────── */
function injectAnnounceBar() {
  if (localStorage.getItem('gausin_announce_closed')) return;
  const bar = document.createElement('div');
  bar.className = 'announce-bar';
  bar.innerHTML = `
    <i class="fa-solid fa-industry" style="margin-right:6px;"></i>
    Gausin International Engineers — 20+ Years of Industrial Engineering Excellence |
    <a href="contact.html">Get a Free Consultation</a> |
    <a href="tel:+919870840779">Call: +91 98708 40779</a>
    <button class="announce-close" id="announceClose" aria-label="Close">✕</button>
  `;
  document.body.insertBefore(bar, document.body.firstChild);
  const setAnnounceOffset = () => {
    const h = bar.offsetHeight;
    document.body.classList.add('has-announce-bar');
    document.documentElement.style.setProperty('--announce-bar-height', h + 'px');
  };
  setAnnounceOffset();
  window.addEventListener('resize', setAnnounceOffset);
  document.getElementById('announceClose')?.addEventListener('click', () => {
    bar.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(-100%)';
    document.body.classList.remove('has-announce-bar');
    document.documentElement.style.removeProperty('--announce-bar-height');
    setTimeout(() => { bar.remove(); localStorage.setItem('gausin_announce_closed', '1'); }, 280);
  });
}

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
  cache:     {},   // 'lang|text' → translated
  originals: [],   // [{ node, orig }] for restore
  active:    'en',
};

/* Collect translatable text nodes from the live page */
function _trNodes() {
  const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','IFRAME','CODE','PRE','INPUT','TEXTAREA','SELECT']);
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const p = node.parentElement;
      if (!p || SKIP.has(p.tagName)) return NodeFilter.FILTER_REJECT;
      /* Skip chatbot, topbar meta elements, hidden elements */
      if (p.closest('#gchatWindow,#gchatToggle,#google_translate_element,.topbar-link i'))
        return NodeFilter.FILTER_REJECT;
      if (!node.nodeValue.trim() || node.nodeValue.trim().length < 2)
        return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

/* Fetch translations for an array of texts (batched with \n) */
async function _trFetch(texts, lang) {
  const uncached = [...new Set(texts)].filter(t => !_TR.cache[lang + '|' + t]);
  if (!uncached.length) return;

  const BATCH = 40;
  for (let i = 0; i < uncached.length; i += BATCH) {
    const batch = uncached.slice(i, i + BATCH);
    try {
      const q   = encodeURIComponent(batch.join('\n'));
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${q}`;
      const res = await fetch(url);
      const dat = await res.json();
      const translated = dat[0].map(s => s[0]).join('').split('\n');
      batch.forEach((orig, j) => {
        _TR.cache[lang + '|' + orig] = translated[j] || orig;
      });
    } catch (_) {
      batch.forEach(t => { _TR.cache[lang + '|' + t] = t; });
    }
  }
}

/* Indicator removed — translation runs silently */
function _trIndicator() {}

/* Main translate function */
async function _translatePageTo(lang) {
  /* Always restore originals first */
  _TR.originals.forEach(({ node, orig }) => { node.nodeValue = orig; });
  _TR.originals = [];
  _TR.active = lang;
  localStorage.setItem('gausin_lang', lang);

  if (lang === 'en') return;

  _trIndicator(true);
  try {
    const nodes = _trNodes();
    const texts  = nodes.map(n => n.nodeValue.trim());

    await _trFetch(texts, lang);

    nodes.forEach((node, i) => {
      const orig = texts[i];
      const tr   = _TR.cache[lang + '|' + orig];
      if (tr && tr !== orig) {
        _TR.originals.push({ node, orig: node.nodeValue });
        node.nodeValue = node.nodeValue.replace(orig, tr);
      }
    });
  } finally {
    _trIndicator(false);
  }
}

/* Called by lang-switcher buttons */
function applyLangChange(code) {
  _translatePageTo(code);
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
    const code = btn.dataset.lang;
    const lang  = LANGUAGES.find(l => l.code === code);
    trigger.querySelector('.lang-flag').textContent = lang.flag;
    trigger.querySelector('.lang-code').textContent = code.toUpperCase();
    dropdown.querySelectorAll('.lang-option').forEach(b => b.classList.toggle('active', b.dataset.lang === code));
    switcher.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    applyLangChange(code);
  });

  /* Mobile language buttons */
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.mobile-lang-btn');
    if (!btn) return;
    const code = btn.dataset.lang;
    document.querySelectorAll('.mobile-lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === code));
    applyLangChange(code);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  injectAnnounceBar();
  injectComponents();
  initPageTransitions();
  initLangSwitcher();

  /* Load AI chatbot on all pages except admin */
  if (!window.location.pathname.includes('/admin/')) {
    const s = document.createElement('script');
    s.src = 'js/chatbot.js';
    s.defer = true;
    document.body.appendChild(s);
  }
});
