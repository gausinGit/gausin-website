/** Shared selectors — keep in sync with js/i18n-page.js */

export function pageSlugFromFile(file) {
  return file.replace(/^product-/, '').replace(/\.html$/, '');
}

function categoryBadgeText(el) {
  if (!el) return '';
  const clone = el.cloneNode(true);
  clone.querySelectorAll('i, svg').forEach((n) => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function addText(items, slug, key, el, mode = 'text') {
  if (!el) return;
  let raw;
  if (key === 'category') raw = categoryBadgeText(el);
  else raw = mode === 'html' ? el.innerHTML.trim() : el.textContent.replace(/\s+/g, ' ').trim();
  if (!raw || raw.length < 2) return;
  items.push({ key: `${slug}.${key}`, mode, text: raw });
}

export function collectPageContentItems(doc, slug) {
  const items = [];

  addText(items, slug, 'tagline', doc.querySelector('.prod-tagline'), 'html');
  addText(items, slug, 'category', doc.querySelector('.prod-category-badge'));

  doc.querySelectorAll('.prod-breadcrumb a[href*="products.html#"]').forEach((el, i) => {
    addText(items, slug, `breadcrumb.cat.${i}`, el);
  });

  doc.querySelectorAll('.prod-qs').forEach((box, i) => {
    addText(items, slug, `qs.${i}.label`, box.querySelector('.prod-qs-label'));
  });

  doc.querySelectorAll('.prod-hero-img div[style*="font-size:0.875rem"]').forEach((el, i) => {
    addText(items, slug, `hero.stat.${i}.val`, el);
  });
  doc.querySelectorAll('.prod-hero-img div[style*="font-size:0.7rem"]').forEach((el, i) => {
    addText(items, slug, `hero.stat.${i}.label`, el);
  });

  doc.querySelectorAll('#tab-overview > p').forEach((el, i) => addText(items, slug, `overview.p${i}`, el, 'html'));

  doc.querySelectorAll('#tab-overview .adv-card').forEach((card, i) => {
    addText(items, slug, `overview.adv.${i}.title`, card.querySelector('.adv-title'));
    addText(items, slug, `overview.adv.${i}.desc`, card.querySelector('.adv-desc'));
  });

  doc.querySelectorAll('#tab-specifications .spec-table tr').forEach((tr, ri) => {
    tr.querySelectorAll('td').forEach((td, ci) => addText(items, slug, `spec.r${ri}.c${ci}`, td));
  });

  doc.querySelectorAll('#tab-applications > div > div').forEach((card, i) => {
    const divs = [...card.querySelectorAll('div')].filter((d) => d.textContent.trim() && !d.querySelector('i'));
    const title = divs.find((d) => (d.getAttribute('style') || '').includes('font-weight:700'));
    const desc = divs.find((d) => d !== title && d.textContent.length > 15);
    addText(items, slug, `applications.${i}.title`, title);
    addText(items, slug, `applications.${i}.desc`, desc);
  });

  doc.querySelectorAll('#tab-advantages .adv-card').forEach((card, i) => {
    addText(items, slug, `advantages.${i}.title`, card.querySelector('.adv-title'));
    addText(items, slug, `advantages.${i}.desc`, card.querySelector('.adv-desc'));
  });

  doc.querySelectorAll('#tab-how-it-works > div > div').forEach((row, i) => {
    const inner = row.querySelector('div:last-child');
    if (!inner) return;
    const kids = [...inner.children];
    addText(items, slug, `how.${i}.title`, kids[0]);
    addText(items, slug, `how.${i}.desc`, kids[1]);
  });

  addText(items, slug, 'sidebar.title', doc.querySelector('.sidebar-title'));
  addText(items, slug, 'sidebar.sub', doc.querySelector('.sidebar-sub'));
  doc.querySelectorAll('.sidebar-g-item').forEach((el, i) => addText(items, slug, `sidebar.guarantee.${i}`, el));

  doc.querySelectorAll('.prod-sidebar div').forEach((el) => {
    if ((el.textContent || '').trim().startsWith('Or call us')) addText(items, slug, 'sidebar.orCall', el);
  });

  doc.querySelectorAll('.prod-sidebar span[style*="color:var(--gray-600)"]').forEach((el, i) => {
    addText(items, slug, `sidebar.quick.${i}.label`, el);
  });

  doc.querySelectorAll('.related-title').forEach((el, i) => addText(items, slug, `related.${i}.title`, el));
  doc.querySelectorAll('.related-desc').forEach((el, i) => addText(items, slug, `related.${i}.desc`, el));

  return items;
}
