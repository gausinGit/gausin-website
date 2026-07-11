/** Site page body i18n targets — keep in sync with js/i18n-page.js (site section) */

export const SITE_PAGES = [
  'index.html', 'about.html', 'services.html', 'products.html', 'industries.html',
  'contact.html', 'downloads.html', 'insights.html', 'career.html', 'news.html',
  'our-clients.html', 'technology.html', 'digital-solutions.html', 'privacy-policy.html',
  'terms-of-service.html', 'sitemap.html', '404.html',
];

export const SHELL_SEL =
  '.topbar,.navbar,.mobile-nav,.footer,#cookieBanner,#siteSearchOverlay,#gcFab,#gcWin,.gchat-root,#whatsappFloat,#pageTransition,#backToTop';

export function siteSlugFromFile(file) {
  if (file.startsWith('product-')) return file.replace(/^product-/, '').replace(/\.html$/, '');
  return file.replace(/\.html$/, '');
}

function inShell(el) {
  return !!(el && el.closest && el.closest(SHELL_SEL));
}

function cleanText(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('i,svg,.check-icon,.hero-badge-dot,.service-feat-dot,.tech-pill-icon').forEach((n) => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function isHtmlEl(el) {
  if (!el) return false;
  if (el.classList.contains('hero-title') || el.classList.contains('section-title')) return true;
  if (el.classList.contains('page-title')) return true;
  if (el.querySelector('span.gradient-text, strong, em, br, a')) return true;
  return el.innerHTML.includes('<span') || el.innerHTML.includes('<strong') || el.innerHTML.includes('<a');
}

function isSkippableText(raw) {
  if (!raw || raw.length < 2) return true;
  if (/^[\d\s./+\-%,:;()@#]+$/.test(raw) && raw.length < 24) return true;
  if (/^\+91/.test(raw)) return true;
  if (/^info@|^www\.|^https?:/.test(raw)) return true;
  return false;
}

function addItem(items, slug, key, el, mode = 'text') {
  if (!el || inShell(el)) return;
  const raw = mode === 'html' ? el.innerHTML.trim() : cleanText(el);
  if (isSkippableText(raw)) return;
  items.push({ key: `${slug}.${key}`, mode, text: raw });
}

function addAttrItem(items, slug, key, el, attr, mode) {
  if (!el || inShell(el)) return;
  const raw = (el.getAttribute(attr) || '').trim();
  if (isSkippableText(raw)) return;
  items.push({ key: `${slug}.${key}`, mode, text: raw });
}

export function collectSiteContentItems(doc, slug) {
  const items = [];
  const title = doc.querySelector('title');
  if (title && title.textContent.trim()) {
    items.push({ key: `${slug}._meta.title`, mode: 'text', text: title.textContent.trim() });
  }

  doc.querySelectorAll('.hero-badge').forEach((el, i) => addItem(items, slug, `hero.badge.${i}`, el));
  doc.querySelectorAll('.hero-title, .page-hero h1, h1.page-title').forEach((el, i) => {
    addItem(items, slug, `hero.title.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('.hero-desc, .hero-subtitle, .page-hero > p, .page-hero p').forEach((el, i) => {
    addItem(items, slug, `hero.desc.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('.hero-stat-label').forEach((el, i) => addItem(items, slug, `hero.stat.${i}`, el));

  doc.querySelectorAll('.section-label').forEach((el, i) => addItem(items, slug, `sec.label.${i}`, el));
  doc.querySelectorAll('.section-title').forEach((el, i) => {
    addItem(items, slug, `sec.title.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('.section-desc, .section-subtitle').forEach((el, i) => {
    addItem(items, slug, `sec.desc.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });

  doc.querySelectorAll('section h2:not(.section-title)').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `h2.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('section h3:not(.card-title)').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `h3.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });

  doc.querySelectorAll('section p:not(.card-desc):not(.section-desc):not(.hero-desc)').forEach((el, i) => {
    if (inShell(el) || el.closest('.card,.prod-card,.team-card,.news-card,.download-card')) return;
    addItem(items, slug, `p.${i}`, el, isHtmlEl(el) ? 'html' : 'text');
  });

  doc.querySelectorAll('.check-item').forEach((el, i) => addItem(items, slug, `check.${i}`, el));

  doc.querySelectorAll('.cta-section .fa-check-circle').forEach((icon, i) => {
    if (icon.parentElement) addItem(items, slug, `cta.check.${i}`, icon.parentElement);
  });

  doc.querySelectorAll('.card-title').forEach((el, i) => addItem(items, slug, `card.title.${i}`, el));
  doc.querySelectorAll('.card-desc').forEach((el, i) => addItem(items, slug, `card.desc.${i}`, el));
  doc.querySelectorAll('.card-link').forEach((el, i) => addItem(items, slug, `card.link.${i}`, el));
  doc.querySelectorAll('.fp-link').forEach((el, i) => addItem(items, slug, `fp.link.${i}`, el));

  doc.querySelectorAll('.prod-title').forEach((el, i) => addItem(items, slug, `prod.title.${i}`, el));
  doc.querySelectorAll('.prod-desc').forEach((el, i) => addItem(items, slug, `prod.desc.${i}`, el));
  doc.querySelectorAll('.prod-cat-badge').forEach((el, i) => addItem(items, slug, `prod.badge.${i}`, el));
  doc.querySelectorAll('.filter-label').forEach((el, i) => addItem(items, slug, `filter.label.${i}`, el));
  doc.querySelectorAll('.filter-btn').forEach((el, i) => addItem(items, slug, `filter.btn.${i}`, el));

  doc.querySelectorAll('.team-name').forEach((el, i) => addItem(items, slug, `team.name.${i}`, el));
  doc.querySelectorAll('.team-role').forEach((el, i) => addItem(items, slug, `team.role.${i}`, el));
  doc.querySelectorAll('.team-bio, .team-desc').forEach((el, i) => addItem(items, slug, `team.bio.${i}`, el));

  doc.querySelectorAll('.stat-label').forEach((el, i) => addItem(items, slug, `stat.label.${i}`, el));

  doc.querySelectorAll('.fp-cat').forEach((el, i) => addItem(items, slug, `fp.cat.${i}`, el));
  doc.querySelectorAll('.fp-title').forEach((el, i) => addItem(items, slug, `fp.title.${i}`, el));
  doc.querySelectorAll('.fp-desc').forEach((el, i) => addItem(items, slug, `fp.desc.${i}`, el));
  doc.querySelectorAll('.fp-tag').forEach((el, i) => addItem(items, slug, `fp.tag.${i}`, el));

  doc.querySelectorAll('.industry-card-title').forEach((el, i) => addItem(items, slug, `industry.title.${i}`, el));
  doc.querySelectorAll('.industry-card-desc').forEach((el, i) => addItem(items, slug, `industry.desc.${i}`, el));

  doc.querySelectorAll('.ind-name').forEach((el, i) => addItem(items, slug, `ind.name.${i}`, el));
  doc.querySelectorAll('.ind-desc').forEach((el, i) => addItem(items, slug, `ind.desc.${i}`, el));
  doc.querySelectorAll('.ind-tag').forEach((el, i) => addItem(items, slug, `ind.tag.${i}`, el));

  doc.querySelectorAll('.ind-card h3, .ind-title').forEach((el, i) => addItem(items, slug, `ind.cardTitle.${i}`, el));
  doc.querySelectorAll('.ind-card p').forEach((el, i) => addItem(items, slug, `ind.cardDesc.${i}`, el));

  doc.querySelectorAll('.ind-detail-title').forEach((el, i) => addItem(items, slug, `indDetail.title.${i}`, el));
  doc.querySelectorAll('.ind-detail-sub').forEach((el, i) => addItem(items, slug, `indDetail.sub.${i}`, el));
  doc.querySelectorAll('.ind-col-title').forEach((el, i) => addItem(items, slug, `indDetail.colTitle.${i}`, el));
  doc.querySelectorAll('.ind-detail-header div[style*="font-size:0.75rem"]').forEach((el, i) => addItem(items, slug, `indDetail.statLbl.${i}`, el));
  doc.querySelectorAll('.ind-detail-col div[style*="background:var(--blue-50)"] div[style*="font-weight:700"]').forEach((el, i) => addItem(items, slug, `indDetail.highlightTitle.${i}`, el));
  doc.querySelectorAll('.ind-detail-col div[style*="background:var(--blue-50)"] div[style*="line-height:1.65"]').forEach((el, i) => addItem(items, slug, `indDetail.highlightDesc.${i}`, el));
  doc.querySelectorAll('.ind-detail-col div[style*="line-height:1.75"][style*="text-align:justify"]').forEach((el, i) => addItem(items, slug, `indDetail.note.${i}`, el));

  doc.querySelectorAll('.tech-pill').forEach((el, i) => {
    const clone = el.cloneNode(true);
    clone.querySelectorAll('.tech-pill-icon,i,svg').forEach((n) => n.remove());
    const text = clone.textContent.replace(/\s+/g, ' ').trim();
    if (!isSkippableText(text)) items.push({ key: `${slug}.tech.pill.${i}`, mode: 'text', text });
  });

  doc.querySelectorAll('.client-name').forEach((el, i) => addItem(items, slug, `client.name.${i}`, el));

  doc.querySelectorAll('.glass div[style*="font-weight:700"], .glass div[style*="font-weight: 700"]').forEach((el, i) => {
    addItem(items, slug, `glass.title.${i}`, el);
  });
  doc.querySelectorAll('.glass div[style*="font-size:0.8125rem"]').forEach((el, i) => {
    addItem(items, slug, `glass.desc.${i}`, el);
  });

  doc.querySelectorAll('.more-ind-card div[style*="font-weight:700"], .more-ind-card div[style*="font-weight: 700"]').forEach((el, i) => {
    addItem(items, slug, `moreInd.title.${i}`, el);
  });
  doc.querySelectorAll('.more-ind-card div[style*="font-size:0.875rem"]').forEach((el, i) => {
    addItem(items, slug, `moreInd.desc.${i}`, el);
  });

  doc.querySelectorAll('.prod-spec-label').forEach((el, i) => addItem(items, slug, `prod.specLabel.${i}`, el));
  doc.querySelectorAll('.prod-spec-val').forEach((el, i) => addItem(items, slug, `prod.specVal.${i}`, el));
  doc.querySelectorAll('.prod-app').forEach((el, i) => addItem(items, slug, `prod.app.${i}`, el));

  doc.querySelectorAll('.page-hero-label').forEach((el, i) => addItem(items, slug, `hero.label.${i}`, el));
  doc.querySelectorAll('.breadcrumb-item').forEach((el, i) => addItem(items, slug, `crumb.${i}`, el));
  doc.querySelectorAll('.page-hero-sub').forEach((el, i) => addItem(items, slug, `hero.sub.${i}`, el));

  doc.querySelectorAll('.service-badge').forEach((el, i) => addItem(items, slug, `svc.badge.${i}`, el));
  doc.querySelectorAll('.service-title').forEach((el, i) => addItem(items, slug, `svc.title.${i}`, el));
  doc.querySelectorAll('.service-desc').forEach((el, i) => addItem(items, slug, `svc.desc.${i}`, el));
  doc.querySelectorAll('.service-feat').forEach((el, i) => addItem(items, slug, `svc.feat.${i}`, el));
  doc.querySelectorAll('.proc-content h4').forEach((el, i) => addItem(items, slug, `proc.title.${i}`, el));
  doc.querySelectorAll('.proc-content p').forEach((el, i) => addItem(items, slug, `proc.desc.${i}`, el));

  doc.querySelectorAll('.value-title').forEach((el, i) => addItem(items, slug, `value.title.${i}`, el));
  doc.querySelectorAll('.value-desc').forEach((el, i) => addItem(items, slug, `value.desc.${i}`, el));
  doc.querySelectorAll('.timeline-title').forEach((el, i) => addItem(items, slug, `timeline.title.${i}`, el));
  doc.querySelectorAll('.timeline-desc').forEach((el, i) => addItem(items, slug, `timeline.desc.${i}`, el));
  doc.querySelectorAll('.cert-name').forEach((el, i) => addItem(items, slug, `cert.name.${i}`, el));
  doc.querySelectorAll('.cert-desc').forEach((el, i) => addItem(items, slug, `cert.desc.${i}`, el));

  doc.querySelectorAll('.cap-label > span:first-child').forEach((el, i) => addItem(items, slug, `cap.label.${i}`, el));
  doc.querySelectorAll('.industry-exp-icon').forEach((icon, i) => {
    const title = icon.parentElement?.querySelector('div[style*="font-weight:600"]');
    if (title) addItem(items, slug, `exp.title.${i}`, title);
  });

  doc.querySelectorAll('.cat-name').forEach((el, i) => addItem(items, slug, `cat.name.${i}`, el));
  doc.querySelectorAll('.advantage-desc').forEach((el, i) => addItem(items, slug, `adv.desc.${i}`, el));
  doc.querySelectorAll('section h4').forEach((el, i) => {
    if (inShell(el) || el.closest('.proc-content')) return;
    addItem(items, slug, `h4.${i}`, el);
  });

  doc.querySelectorAll('.dl-stat-lbl').forEach((el, i) => addItem(items, slug, `dl.statLbl.${i}`, el));
  doc.querySelectorAll('.dl-tag').forEach((el, i) => addItem(items, slug, `dl.tag.${i}`, el));
  doc.querySelectorAll('.dl-cat-title').forEach((el, i) => addItem(items, slug, `dl.catTitle.${i}`, el));
  doc.querySelectorAll('.dl-card-title').forEach((el, i) => addItem(items, slug, `dl.cardTitle.${i}`, el));
  doc.querySelectorAll('.dl-card-desc').forEach((el, i) => addItem(items, slug, `dl.cardDesc.${i}`, el));
  doc.querySelectorAll('.dl-featured-badge').forEach((el, i) => addItem(items, slug, `dl.featBadge.${i}`, el));
  doc.querySelectorAll('.dl-featured-body h2').forEach((el, i) => addItem(items, slug, `dl.featTitle.${i}`, el));
  doc.querySelectorAll('.dl-featured-body > p').forEach((el, i) => addItem(items, slug, `dl.featDesc.${i}`, el));
  doc.querySelectorAll('.dl-cta h3').forEach((el, i) => addItem(items, slug, `dl.ctaTitle.${i}`, el));
  doc.querySelectorAll('.dl-cta p').forEach((el, i) => addItem(items, slug, `dl.ctaDesc.${i}`, el));

  doc.querySelectorAll('.ins-stat-label').forEach((el, i) => addItem(items, slug, `ins.statLbl.${i}`, el));
  doc.querySelectorAll('.ins-filter-btn').forEach((el, i) => addItem(items, slug, `ins.filter.${i}`, el));
  doc.querySelectorAll('.ins-cat').forEach((el, i) => addItem(items, slug, `ins.cat.${i}`, el));
  doc.querySelectorAll('.ins-title').forEach((el, i) => addItem(items, slug, `ins.title.${i}`, el));
  doc.querySelectorAll('.ins-excerpt').forEach((el, i) => addItem(items, slug, `ins.desc.${i}`, el));
  doc.querySelectorAll('.ins-link').forEach((el, i) => addItem(items, slug, `ins.link.${i}`, el));
  doc.querySelectorAll('.ins-tag').forEach((el, i) => addItem(items, slug, `ins.tag.${i}`, el));
  doc.querySelectorAll('.ins-section-header h3').forEach((el, i) => addItem(items, slug, `ins.secTitle.${i}`, el));

  doc.querySelectorAll('.job-title').forEach((el, i) => addItem(items, slug, `job.title.${i}`, el));
  doc.querySelectorAll('.job-desc').forEach((el, i) => addItem(items, slug, `job.desc.${i}`, el));
  doc.querySelectorAll('.job-qual').forEach((el, i) => addItem(items, slug, `job.qual.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.job-tag').forEach((el, i) => addItem(items, slug, `job.tag.${i}`, el));
  doc.querySelectorAll('.job-list li').forEach((el, i) => addItem(items, slug, `job.li.${i}`, el));
  doc.querySelectorAll('.job-note-desc').forEach((el, i) => addItem(items, slug, `job.note.${i}`, el));
  doc.querySelectorAll('.section-badge').forEach((el, i) => addItem(items, slug, `apply.badge.${i}`, el));
  doc.querySelectorAll('select.form-control option').forEach((el, i) => addItem(items, slug, `opt.${i}`, el));

  doc.querySelectorAll('.info-label').forEach((el, i) => addItem(items, slug, `info.label.${i}`, el));
  doc.querySelectorAll('.info-value').forEach((el, i) => addItem(items, slug, `info.value.${i}`, el));
  doc.querySelectorAll('.info-sub').forEach((el, i) => addItem(items, slug, `info.sub.${i}`, el));
  doc.querySelectorAll('.contact-social-heading').forEach((el, i) => addItem(items, slug, `social.heading.${i}`, el));
  doc.querySelectorAll('.connect-card-title').forEach((el, i) => addItem(items, slug, `connect.title.${i}`, el));
  doc.querySelectorAll('.connect-card-desc').forEach((el, i) => addItem(items, slug, `connect.desc.${i}`, el));
  doc.querySelectorAll('.loc-org-name').forEach((el, i) => addItem(items, slug, `loc.org.${i}`, el));
  doc.querySelectorAll('.loc-address').forEach((el, i) => addItem(items, slug, `loc.addr.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.loc-detail-text').forEach((el, i) => addItem(items, slug, `loc.detail.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.partner-region').forEach((el, i) => addItem(items, slug, `partner.region.${i}`, el));
  doc.querySelectorAll('.partner-office-badge').forEach((el, i) => addItem(items, slug, `partner.badge.${i}`, el));
  doc.querySelectorAll('.partner-name').forEach((el, i) => addItem(items, slug, `partner.name.${i}`, el));
  doc.querySelectorAll('.partner-badge').forEach((el, i) => addItem(items, slug, `partner.loc.${i}`, el));
  doc.querySelectorAll('.partner-address').forEach((el, i) => addItem(items, slug, `partner.addr.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.partner-rep').forEach((el, i) => addItem(items, slug, `partner.rep.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.partner-contact-title').forEach((el, i) => addItem(items, slug, `partner.contactTitle.${i}`, el));
  doc.querySelectorAll('.partner-note').forEach((el, i) => addItem(items, slug, `partner.note.${i}`, el));
  doc.querySelectorAll('.form-consent-label').forEach((el, i) => addItem(items, slug, `form.consent.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.form-security-note span').forEach((el, i) => addItem(items, slug, `form.secure.${i}`, el));
  doc.querySelectorAll('#inquiryForm optgroup[label]').forEach((el, i) => addAttrItem(items, slug, `optgrp.${i}`, el, 'label', 'optgroup'));
  doc.querySelectorAll('#inquiryForm input[placeholder], #inquiryForm textarea[placeholder]').forEach((el, i) => {
    addAttrItem(items, slug, `ph.${i}`, el, 'placeholder', 'placeholder');
  });
  doc.querySelectorAll('.accordion-title').forEach((el, i) => addItem(items, slug, `acc.q.${i}`, el));
  doc.querySelectorAll('.accordion-body p').forEach((el, i) => addItem(items, slug, `acc.a.${i}`, el));
  doc.querySelectorAll('.form-success-title').forEach((el, i) => addItem(items, slug, `form.okTitle.${i}`, el));
  doc.querySelectorAll('.form-success-desc').forEach((el, i) => addItem(items, slug, `form.okDesc.${i}`, el));
  doc.querySelectorAll('.form-error').forEach((el, i) => addItem(items, slug, `form.err.${i}`, el));
  doc.querySelectorAll('.map-open-btn').forEach((el, i) => addItem(items, slug, `map.btn.${i}`, el));

  doc.querySelectorAll('.tool-name').forEach((el, i) => addItem(items, slug, `tool.name.${i}`, el));
  doc.querySelectorAll('.tool-version').forEach((el, i) => addItem(items, slug, `tool.ver.${i}`, el));
  doc.querySelectorAll('.tool-desc').forEach((el, i) => addItem(items, slug, `tool.desc.${i}`, el));
  doc.querySelectorAll('.tool-tag').forEach((el, i) => addItem(items, slug, `tool.tag.${i}`, el));
  doc.querySelectorAll('.fab-title').forEach((el, i) => addItem(items, slug, `fab.title.${i}`, el));
  doc.querySelectorAll('.fab-desc').forEach((el, i) => addItem(items, slug, `fab.desc.${i}`, el));
  doc.querySelectorAll('.iot-metric-label').forEach((el, i) => addItem(items, slug, `iot.label.${i}`, el));

  doc.querySelectorAll('.inno-content h4').forEach((el, i) => addItem(items, slug, `inno.title.${i}`, el));
  doc.querySelectorAll('.inno-content p').forEach((el, i) => addItem(items, slug, `inno.desc.${i}`, el));
  doc.querySelectorAll('div[style*="linear-gradient(135deg,var(--blue-900)"] div[style*="justify-content:space-between"] span:first-child').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `mfg.label.${i}`, el);
  });
  doc.querySelectorAll('div[style*="letter-spacing:0.05em"][style*="text-transform:uppercase"]').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `mfg.matHeading.${i}`, el);
  });
  doc.querySelectorAll('div[style*="letter-spacing:0.05em"][style*="text-transform:uppercase"] + div > span').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `mfg.mat.${i}`, el);
  });

  doc.querySelectorAll('.tech-card-title').forEach((el, i) => addItem(items, slug, `ds.title.${i}`, el));
  doc.querySelectorAll('.tech-card-desc').forEach((el, i) => addItem(items, slug, `ds.desc.${i}`, el));

  doc.querySelectorAll('.news-cat').forEach((el, i) => addItem(items, slug, `news.cat.${i}`, el));
  doc.querySelectorAll('.news-link').forEach((el, i) => addItem(items, slug, `news.link.${i}`, el));
  doc.querySelectorAll('.news-cta h3').forEach((el, i) => addItem(items, slug, `news.ctaTitle.${i}`, el));
  doc.querySelectorAll('.news-cta p').forEach((el, i) => addItem(items, slug, `news.ctaDesc.${i}`, el));

  doc.querySelectorAll('.clients-stat-label').forEach((el, i) => addItem(items, slug, `cli.statLbl.${i}`, el));
  doc.querySelectorAll('.clients-intro').forEach((el, i) => addItem(items, slug, `cli.intro.${i}`, el));

  doc.querySelectorAll('.legal-chip-label').forEach((el, i) => addItem(items, slug, `legal.chipLbl.${i}`, el));
  doc.querySelectorAll('.legal-chip-val').forEach((el, i) => addItem(items, slug, `legal.chipVal.${i}`, el));
  doc.querySelectorAll('.legal-main > h2').forEach((el, i) => addItem(items, slug, `legal.h2.${i}`, el));
  doc.querySelectorAll('.legal-section h3').forEach((el, i) => addItem(items, slug, `legal.h3.${i}`, el));
  doc.querySelectorAll('.legal-section p').forEach((el, i) => addItem(items, slug, `legal.p.${i}`, el));
  doc.querySelectorAll('.legal-section li').forEach((el, i) => addItem(items, slug, `legal.li.${i}`, el));
  doc.querySelectorAll('.legal-note').forEach((el, i) => addItem(items, slug, `legal.note.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.legal-card-title').forEach((el, i) => addItem(items, slug, `legal.sideTitle.${i}`, el));
  doc.querySelectorAll('.legal-list a').forEach((el, i) => addItem(items, slug, `legal.nav.${i}`, el));

  doc.querySelectorAll('.sitemap-intro').forEach((el, i) => addItem(items, slug, `map.intro.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.sitemap-card h2').forEach((el, i) => addItem(items, slug, `map.group.${i}`, el));
  doc.querySelectorAll('.sitemap-links a').forEach((el, i) => addItem(items, slug, `map.link.${i}`, el));
  doc.querySelectorAll('.sitemap-note').forEach((el, i) => addItem(items, slug, `map.note.${i}`, el, isHtmlEl(el) ? 'html' : 'text'));

  doc.querySelectorAll('.error-title').forEach((el, i) => addItem(items, slug, `err.title.${i}`, el));
  doc.querySelectorAll('.error-desc').forEach((el, i) => addItem(items, slug, `err.desc.${i}`, el));
  doc.querySelectorAll('.quick-link').forEach((el, i) => addItem(items, slug, `err.quick.${i}`, el));

  doc.querySelectorAll('.download-card h3, .dl-card h3').forEach((el, i) => addItem(items, slug, `dl.title.${i}`, el));
  doc.querySelectorAll('.download-card p, .dl-card p').forEach((el, i) => addItem(items, slug, `dl.desc.${i}`, el));

  doc.querySelectorAll('.news-card h3, .news-title').forEach((el, i) => addItem(items, slug, `news.title.${i}`, el));
  doc.querySelectorAll('.news-card p, .news-excerpt').forEach((el, i) => addItem(items, slug, `news.desc.${i}`, el));

  doc.querySelectorAll('.faq-q, .faq-question').forEach((el, i) => addItem(items, slug, `faq.q.${i}`, el));
  doc.querySelectorAll('.faq-a, .faq-answer').forEach((el, i) => addItem(items, slug, `faq.a.${i}`, el));

  doc.querySelectorAll('section .btn, .hero-actions .btn, .cta-section .btn').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `btn.${i}`, el);
  });

  doc.querySelectorAll('section li').forEach((el, i) => {
    if (inShell(el) || el.closest('.footer,.navbar,.check-list')) return;
    if (el.querySelector('li')) return;
    addItem(items, slug, `li.${i}`, el);
  });

  doc.querySelectorAll('section table td, section table th').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `tbl.${i}`, el);
  });

  doc.querySelectorAll('section div[style*="font-weight:800"], section div[style*="font-weight: 800"]').forEach((el, i) => {
    if (inShell(el) || el.closest('.hero-stat-number,.card,.prod-card')) return;
    if (el.querySelector('div[style*="font-weight:800"]')) return;
    addItem(items, slug, `float.${i}`, el);
  });
  doc.querySelectorAll('section div[style*="font-size:0.8125rem"], section div[style*="font-size:0.7rem"]').forEach((el, i) => {
    if (inShell(el) || el.closest('.card,.prod-card,.hero-stat')) return;
    const t = cleanText(el);
    if (t.length > 3 && t.length < 60) addItem(items, slug, `float.sub.${i}`, el);
  });

  doc.querySelectorAll('.contact-info-text, .contact-card p, label.form-label').forEach((el, i) => {
    if (inShell(el)) return;
    addItem(items, slug, `form.${i}`, el);
  });

  doc.querySelectorAll('h2').forEach((el, i) => {
    if (inShell(el) || el.classList.contains('section-title')) return;
    if (el.textContent.trim() === 'Related Products') {
      addItem(items, slug, `related.title.${i}`, el);
    }
  });

  return items;
}

export function itemsToDict(items, slug) {
  const dict = {};
  const htmlKeys = [];
  items.forEach(({ key, text, mode }) => {
    const short = key.slice(slug.length + 1);
    dict[short] = text;
    if (mode === 'html') htmlKeys.push(short);
  });
  return { _htmlKeys: htmlKeys, ...dict };
}
