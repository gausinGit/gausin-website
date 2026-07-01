/* ============================================================
   GAUSIN INTERNATIONAL — Site Search
   Client-side search across pages, products & services
   ============================================================ */

'use strict';

const SEARCH_INDEX = [
  /* Pages */
  { title: 'Home', url: 'index.html', category: 'Pages', keywords: 'homepage gausin international engineers' },
  { title: 'About Us', url: 'about.html', category: 'Pages', keywords: 'company history team mission vision' },
  { title: 'Products', url: 'products.html', category: 'Pages', keywords: 'catalog equipment machinery plant' },
  { title: 'Services', url: 'services.html', category: 'Pages', keywords: 'engineering design turnkey consultancy' },
  { title: 'Industries', url: 'industries.html', category: 'Pages', keywords: 'dairy pharma chemical food distillery' },
  { title: 'Technology', url: 'technology.html', category: 'Pages', keywords: 'simulation cad fabrication automation iot' },
  { title: 'Tech & AI', url: 'tech-ai.html', category: 'Pages', keywords: 'software web mobile ai ml cloud automation' },
  { title: 'Contact Us', url: 'contact.html', category: 'Pages', keywords: 'inquiry quote email phone address' },
  { title: 'Careers', url: 'career.html', category: 'Pages', keywords: 'jobs hiring recruitment apply resume' },
  { title: 'News', url: 'news.html', category: 'Pages', keywords: 'updates announcements press' },
  { title: 'Insights', url: 'insights.html', category: 'Pages', keywords: 'blog articles knowledge' },
  { title: 'Downloads', url: 'downloads.html', category: 'Pages', keywords: 'brochure datasheet catalog pdf' },
  { title: 'Brochure', url: 'brochure.html', category: 'Pages', keywords: 'company brochure pdf download' },

  /* Evaporators */
  { title: 'Falling Film Evaporator', url: 'product-falling-film-evaporator.html', category: 'Evaporators', keywords: 'multi effect heat sensitive dairy juice' },
  { title: 'Forced Circulation Evaporator', url: 'product-forced-circulation-evaporator.html', category: 'Evaporators', keywords: 'viscous scaling crystallizing' },
  { title: 'Rising Film Evaporator', url: 'product-rising-film-evaporator.html', category: 'Evaporators', keywords: 'vertical tubes low viscosity' },
  { title: 'Plate Type Evaporator', url: 'product-plate-type-evaporator.html', category: 'Evaporators', keywords: 'plate compact efficient' },
  { title: 'Batch Evaporator (Vacuum Pan)', url: 'product-batch-evaporator-vacuum-pan.html', category: 'Evaporators', keywords: 'vacuum pan batch khoya' },

  /* Dryers */
  { title: 'Spray Dryer (Nozzle / Rotary Disc)', url: 'product-spray-dryer.html', category: 'Dryers', keywords: 'powder nozzle disc atomizer' },
  { title: 'Fluidized Bed Dryer (FBD)', url: 'product-fluidized-bed-dryer.html', category: 'Dryers', keywords: 'granules particles fluid bed' },
  { title: 'Closed Circuit Dryer', url: 'product-closed-circuit-dryer.html', category: 'Dryers', keywords: 'solvent recovery inert gas' },
  { title: 'Agitated Thin Film Dryer (ATFD)', url: 'product-agitated-thin-film-dryer.html', category: 'Dryers', keywords: 'viscous high boiling ATFD' },
  { title: 'Spin Flash Dryer', url: 'product-spin-flash-dryer.html', category: 'Dryers', keywords: 'paste filter cake flash' },

  /* Milk Processing */
  { title: 'Complete Milk Processing Plant', url: 'product-complete-milk-processing-plant.html', category: 'Dairy Processing', keywords: 'dairy plant turnkey milk line' },
  { title: 'Milk Chilling Plant', url: 'product-milk-chilling-plant.html', category: 'Dairy Processing', keywords: 'chiller cooling bulk milk' },
  { title: 'Milk Pasteurizer (HTST / LTLT)', url: 'product-milk-pasteurizer-htst-ltlt.html', category: 'Dairy Processing', keywords: 'HTST LTLT pasteurization' },
  { title: 'Milk Deodorizer', url: 'product-milk-deodorizer.html', category: 'Dairy Processing', keywords: 'vacuum deodorization off flavor' },
  { title: 'Butter Processing Unit', url: 'product-butter-processing-unit.html', category: 'Dairy Equipment', keywords: 'butter making continuous' },
  { title: 'Ghee Making Plant', url: 'product-ghee-making-plant.html', category: 'Dairy Equipment', keywords: 'ghee clarification batch' },
  { title: 'Butter Churner', url: 'product-butter-churner.html', category: 'Dairy Equipment', keywords: 'churn butter dairy' },
  { title: 'Ghee Kettle', url: 'product-ghee-kettle.html', category: 'Dairy Equipment', keywords: 'ghee kettle clarifier' },
  { title: 'Khoya Making Machine', url: 'product-khoya-making-machine.html', category: 'Dairy Equipment', keywords: 'khoya mawa evaporator' },
  { title: 'Milk Can Conveyor', url: 'product-milk-can-conveyor.html', category: 'Dairy Equipment', keywords: 'can handling conveyor dairy' },
  { title: 'Bulk Milk Cooler (BMC)', url: 'product-bulk-milk-cooler.html', category: 'Dairy Equipment', keywords: 'BMC cooling tank bulk' },
  { title: 'Crystallization Tank', url: 'product-crystallization-tank.html', category: 'Dairy Equipment', keywords: 'crystallizer tank sugar' },

  /* Waste Management */
  { title: 'ETP/STP Treatment Plants', url: 'product-etp-stp-treatment-plants.html', category: 'Waste Management', keywords: 'effluent sewage wastewater treatment' },
  { title: 'Biomass Solid Waste Treatment Plant', url: 'product-biomass-solid-waste-treatment-plant.html', category: 'Waste Management', keywords: 'biomass solid waste' },
  { title: 'Biogas and CNG Plant', url: 'product-biogas-and-cng-plant.html', category: 'Waste Management', keywords: 'biogas cng anaerobic digestor' },
  { title: 'WTP/UF/RO/Softener Plants', url: 'product-wtp-uf-ro-softener-plants.html', category: 'Waste Management', keywords: 'water treatment RO UF softener' },
  { title: 'Scrubber Systems', url: 'product-scrubber-systems.html', category: 'Waste Management', keywords: 'air pollution scrubber gas' },
  { title: 'Incinerator System', url: 'product-incinerator-system.html', category: 'Waste Management', keywords: 'incinerator waste disposal' },

  /* Heat Exchangers & CIP */
  { title: 'Shell & Tube Heat Exchanger', url: 'product-shell-tube-heat-exchanger.html', category: 'Heat Exchangers', keywords: 'shell tube condenser heater' },
  { title: 'Plate Heat Exchanger (PHE)', url: 'product-plate-heat-exchanger-phe.html', category: 'Heat Exchangers', keywords: 'plate PHE gasket brazed' },
  { title: 'Automated CIP System', url: 'product-automated-cip-system.html', category: 'CIP Systems', keywords: 'clean in place sanitization' },

  /* Vessels */
  { title: 'Pressure Vessels (ASME / IBR)', url: 'product-pressure-vessels-asme-ibr.html', category: 'Pressure Vessels', keywords: 'ASME IBR reactor tank' },
  { title: 'Stainless Steel Storage Silos', url: 'product-stainless-steel-storage-silos.html', category: 'Pressure Vessels', keywords: 'silo storage tank SS' },

  /* Services */
  { title: 'Process Design', url: 'services.html#process-design', category: 'Services', keywords: 'simulation PID equipment sizing' },
  { title: 'Detailed Engineering', url: 'services.html#detailed-engineering', category: 'Services', keywords: '3D CAD piping instrumentation' },
  { title: 'Turnkey Execution', url: 'services.html#turnkey-execution', category: 'Services', keywords: 'planning commissioning handover EPC' },
  { title: 'Energy Optimization', url: 'services.html#energy-optimization', category: 'Services', keywords: 'MVR heat recovery audit' },
  { title: 'Automation & Control', url: 'services.html#automation-control', category: 'Services', keywords: 'PLC SCADA IoT integration' },
  { title: 'Technical Consultancy', url: 'services.html#consultancy', category: 'Services', keywords: 'troubleshooting debottlenecking' },

  /* Industries */
  { title: 'Dairy Industry', url: 'industries.html#dairy', category: 'Industries', keywords: 'milk processing evaporators dairy' },
  { title: 'Pharmaceutical Industry', url: 'industries.html#pharma', category: 'Industries', keywords: 'GMP pharma API formulation' },
  { title: 'Chemical Industry', url: 'industries.html#chemical', category: 'Industries', keywords: 'process plants reactors chemical' },
  { title: 'Food Processing Industry', url: 'industries.html#food', category: 'Industries', keywords: 'hygienic food beverage' },

  /* Tech & AI */
  { title: 'Web Development', url: 'tech-ai.html#web-development', category: 'Tech & AI', keywords: 'website web application' },
  { title: 'Mobile App Development', url: 'tech-ai.html#mobile-apps', category: 'Tech & AI', keywords: 'iOS Android mobile app' },
  { title: 'AI/ML Solutions', url: 'tech-ai.html#ai-ml', category: 'Tech & AI', keywords: 'machine learning artificial intelligence' },
  { title: 'Cloud Solutions', url: 'tech-ai.html#cloud', category: 'Tech & AI', keywords: 'cloud deployment migration AWS' },
];

const CATEGORY_ICONS = {
  Pages: 'fa-house',
  Evaporators: 'fa-droplet',
  Dryers: 'fa-wind',
  'Dairy Processing': 'fa-cow',
  'Dairy Equipment': 'fa-cow',
  'Waste Management': 'fa-leaf',
  'Heat Exchangers': 'fa-fire-flame-curved',
  'CIP Systems': 'fa-spray-can-sparkles',
  'Pressure Vessels': 'fa-database',
  Services: 'fa-screwdriver-wrench',
  Industries: 'fa-building',
  'Tech & AI': 'fa-microchip',
};

let activeIndex = -1;
let currentResults = [];

function normalize(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
}

function scoreItem(item, tokens) {
  const title = normalize(item.title);
  const category = normalize(item.category);
  const keywords = normalize(item.keywords || '');
  const full = `${title} ${category} ${keywords}`;
  let score = 0;

  tokens.forEach((token) => {
    if (!token) return;
    if (title.startsWith(token)) score += 100;
    else if (title.includes(token)) score += 60;
    if (category.includes(token)) score += 20;
    if (keywords.includes(token)) score += 15;
    if (full.includes(token)) score += 5;
  });

  return score;
}

function runSearch(query, limit = 12) {
  const trimmed = query.trim();
  if (!trimmed) return SEARCH_INDEX.slice(0, 10);

  const tokens = normalize(trimmed).split(/\s+/).filter(Boolean);
  return SEARCH_INDEX
    .map((item) => ({ item, score: scoreItem(item, tokens) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
    .slice(0, limit)
    .map(({ item }) => item);
}

function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const tokens = normalize(query).split(/\s+/).filter(Boolean);
  let result = text;
  tokens.forEach((token) => {
    const re = new RegExp(`(${token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(re, '<mark>$1</mark>');
  });
  return result;
}

function getModalElements() {
  return {
    overlay: document.getElementById('siteSearchOverlay'),
    input: document.getElementById('siteSearchInput'),
    results: document.getElementById('siteSearchResults'),
    empty: document.getElementById('siteSearchEmpty'),
  };
}

function renderResults(query) {
  const { results, empty } = getModalElements();
  if (!results) return;

  currentResults = runSearch(query);
  activeIndex = currentResults.length ? 0 : -1;

  if (!currentResults.length) {
    results.innerHTML = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  results.innerHTML = currentResults.map((item, i) => {
    const icon = CATEGORY_ICONS[item.category] || 'fa-file-lines';
    return `
      <a href="${item.url}" class="site-search-result${i === activeIndex ? ' is-active' : ''}" data-index="${i}">
        <span class="site-search-result-icon"><i class="fa-solid ${icon}"></i></span>
        <span class="site-search-result-body">
          <span class="site-search-result-title">${highlightMatch(item.title, query)}</span>
          <span class="site-search-result-meta">${item.category}</span>
        </span>
        <span class="site-search-result-arrow"><i class="fa-solid fa-arrow-right"></i></span>
      </a>
    `;
  }).join('');
}

function setActiveIndex(index) {
  const { results } = getModalElements();
  if (!results) return;

  const links = results.querySelectorAll('.site-search-result');
  if (!links.length) {
    activeIndex = -1;
    return;
  }

  activeIndex = Math.max(0, Math.min(index, links.length - 1));
  links.forEach((link, i) => link.classList.toggle('is-active', i === activeIndex));
  links[activeIndex]?.scrollIntoView({ block: 'nearest' });
}

function openSearch() {
  const { overlay, input } = getModalElements();
  if (!overlay) return;

  overlay.hidden = false;
  overlay.style.pointerEvents = 'auto';
  document.body.classList.add('site-search-open');
  requestAnimationFrame(() => {
    overlay.classList.add('is-visible');
    input?.focus();
    input?.select();
  });
  renderResults(input?.value || '');
}

function closeSearch() {
  const { overlay, input } = getModalElements();
  if (!overlay) return;

  overlay.classList.remove('is-visible');
  overlay.style.pointerEvents = 'none';
  document.body.classList.remove('site-search-open');
  setTimeout(() => {
    overlay.hidden = true;
    if (input) input.value = '';
    activeIndex = -1;
    currentResults = [];
  }, 200);
}

function createSearchModal() {
  if (document.getElementById('siteSearchOverlay')) return;

  const overlay = document.createElement('div');
  overlay.id = 'siteSearchOverlay';
  overlay.className = 'site-search-overlay';
  overlay.hidden = true;
  overlay.style.pointerEvents = 'none';
  overlay.innerHTML = `
    <div class="site-search-backdrop" data-close-search></div>
    <div class="site-search-dialog" role="dialog" aria-modal="true" aria-labelledby="siteSearchTitle">
      <div class="site-search-header">
        <label class="site-search-input-wrap" for="siteSearchInput">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="search" id="siteSearchInput" class="site-search-input" placeholder="Search products, services, pages..." autocomplete="off" spellcheck="false">
        </label>
        <button type="button" class="site-search-close" data-close-search aria-label="Close search">
          <span class="site-search-kbd">Esc</span>
        </button>
      </div>
      <div class="site-search-body">
        <div id="siteSearchResults" class="site-search-results"></div>
        <div id="siteSearchEmpty" class="site-search-empty" hidden>
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>No results found. Try different keywords.</p>
        </div>
      </div>
      <div class="site-search-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
        <span><kbd>Enter</kbd> Open</span>
        <span><kbd>Ctrl</kbd><kbd>K</kbd> Search</span>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector('[data-close-search]')?.addEventListener('click', closeSearch);

  const input = overlay.querySelector('#siteSearchInput');
  input?.addEventListener('input', (e) => renderResults(e.target.value));
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(activeIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(activeIndex - 1);
    } else if (e.key === 'Enter' && activeIndex >= 0 && currentResults[activeIndex]) {
      e.preventDefault();
      window.location.href = currentResults[activeIndex].url;
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeSearch();
    }
  });
}

function bindSearchTriggers() {
  document.querySelectorAll('#siteSearchBtn, #siteSearchBtnMobile, #siteSearchBtnHeader, .site-search-trigger').forEach((btn) => {
    if (btn.dataset.searchBound) return;
    btn.dataset.searchBound = '1';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
      document.getElementById('mobileNav')?.classList.remove('open');
      document.getElementById('navbarToggle')?.classList.remove('open');
    });
  });
}

let searchInitialized = false;

function initSiteSearch() {
  if (searchInitialized || window.location.pathname.includes('/admin/')) return;
  searchInitialized = true;

  createSearchModal();
  bindSearchTriggers();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const { overlay } = getModalElements();
      if (overlay && !overlay.hidden) closeSearch();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const { overlay } = getModalElements();
      overlay?.hidden ? openSearch() : closeSearch();
    }
  });
}

window.initSiteSearch = initSiteSearch;
window.openSiteSearch = openSearch;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSiteSearch);
} else {
  initSiteSearch();
}
