/* Page body i18n — product + site pages (sync with scripts/lib/*-content-targets.mjs) */
'use strict';

const GAUSIN_SHELL_SEL =
  '.topbar,.navbar,.mobile-nav,.footer,#cookieBanner,#siteSearchOverlay,#gcFab,#gcWin,.gchat-root,#whatsappFloat,#pageTransition,#backToTop';

function gausinPageSlugFromFile(file) {
  if (file.startsWith('product-')) return file.replace(/^product-/, '').replace(/\.html$/, '');
  return file.replace(/\.html$/, '');
}

function gausinInShell(el) {
  return !!(el && el.closest && el.closest(GAUSIN_SHELL_SEL));
}

function gausinCleanText(el) {
  const clone = el.cloneNode(true);
  clone.querySelectorAll('i,svg,.check-icon,.hero-badge-dot,.service-feat-dot,.tech-pill-icon').forEach((n) => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function gausinIsHtmlEl(el) {
  if (!el) return false;
  if (el.classList.contains('hero-title') || el.classList.contains('section-title') || el.classList.contains('page-title')) return true;
  if (el.querySelector('span.gradient-text, strong, em, br, a')) return true;
  return el.innerHTML.includes('<span') || el.innerHTML.includes('<strong') || el.innerHTML.includes('<a');
}

function gausinCategoryBadgeText(el) {
  if (!el) return '';
  const clone = el.cloneNode(true);
  clone.querySelectorAll('i, svg').forEach((n) => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function gausinAddEl(out, slug, key, el, mode = 'text') {
  if (!el) return;
  if (gausinInShell(el)) return;
  if (mode === 'optgroup' || mode === 'placeholder') {
    const attr = mode === 'optgroup' ? 'label' : 'placeholder';
    const raw = (el.getAttribute(attr) || '').trim();
    if (!raw || raw.length < 2) return;
    if (mode === 'placeholder' && /^[\d\s./+\-%,:;()@#]+$/.test(raw) && raw.length < 24) return;
    if (mode === 'placeholder' && (/^\+91/.test(raw) || /^info@|^www\./.test(raw) || /^rajesh@/.test(raw))) return;
    out.push({ el, key: `${slug}.${key}`, mode });
    return;
  }
  const raw = mode === 'html' ? el.innerHTML.trim() : gausinCleanText(el);
  if (!raw || raw.length < 2) return;
  if (mode === 'text' && /^[\d\s./+\-%,:;()@#]+$/.test(raw) && raw.length < 24) return;
  if (mode === 'text' && (/^\+91/.test(raw) || /^info@|^www\./.test(raw))) return;
  out.push({ el, key: `${slug}.${key}`, mode });
}

function gausinCollectSitePageContentItemsFromDom(doc, slug) {
  const out = [];

  doc.querySelectorAll('.hero-badge').forEach((el, i) => gausinAddEl(out, slug, `hero.badge.${i}`, el));
  doc.querySelectorAll('.hero-title, .page-hero h1, h1.page-title').forEach((el, i) => {
    gausinAddEl(out, slug, `hero.title.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('.hero-desc, .hero-subtitle, .page-hero > p, .page-hero p').forEach((el, i) => {
    gausinAddEl(out, slug, `hero.desc.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('.hero-stat-label').forEach((el, i) => gausinAddEl(out, slug, `hero.stat.${i}`, el));

  doc.querySelectorAll('.section-label').forEach((el, i) => gausinAddEl(out, slug, `sec.label.${i}`, el));
  doc.querySelectorAll('.section-title').forEach((el, i) => {
    gausinAddEl(out, slug, `sec.title.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('.section-desc, .section-subtitle').forEach((el, i) => {
    gausinAddEl(out, slug, `sec.desc.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });

  doc.querySelectorAll('section h2:not(.section-title)').forEach((el, i) => {
    gausinAddEl(out, slug, `h2.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });
  doc.querySelectorAll('section h3:not(.card-title)').forEach((el, i) => {
    gausinAddEl(out, slug, `h3.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });

  doc.querySelectorAll('section p:not(.card-desc):not(.section-desc):not(.hero-desc)').forEach((el, i) => {
    if (el.closest('.card,.prod-card,.team-card,.news-card,.download-card')) return;
    gausinAddEl(out, slug, `p.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text');
  });

  doc.querySelectorAll('.check-item').forEach((el, i) => gausinAddEl(out, slug, `check.${i}`, el));

  doc.querySelectorAll('.cta-section .fa-check-circle').forEach((icon, i) => {
    if (icon.parentElement) gausinAddEl(out, slug, `cta.check.${i}`, icon.parentElement);
  });

  doc.querySelectorAll('.card-title').forEach((el, i) => gausinAddEl(out, slug, `card.title.${i}`, el));
  doc.querySelectorAll('.card-desc').forEach((el, i) => gausinAddEl(out, slug, `card.desc.${i}`, el));
  doc.querySelectorAll('.card-link').forEach((el, i) => gausinAddEl(out, slug, `card.link.${i}`, el));
  doc.querySelectorAll('.fp-link').forEach((el, i) => gausinAddEl(out, slug, `fp.link.${i}`, el));

  doc.querySelectorAll('.prod-title').forEach((el, i) => gausinAddEl(out, slug, `prod.title.${i}`, el));
  doc.querySelectorAll('.prod-desc').forEach((el, i) => gausinAddEl(out, slug, `prod.desc.${i}`, el));
  doc.querySelectorAll('.prod-cat-badge').forEach((el, i) => gausinAddEl(out, slug, `prod.badge.${i}`, el));
  doc.querySelectorAll('.filter-label').forEach((el, i) => gausinAddEl(out, slug, `filter.label.${i}`, el));
  doc.querySelectorAll('.filter-btn').forEach((el, i) => gausinAddEl(out, slug, `filter.btn.${i}`, el));

  doc.querySelectorAll('.team-name').forEach((el, i) => gausinAddEl(out, slug, `team.name.${i}`, el));
  doc.querySelectorAll('.team-role').forEach((el, i) => gausinAddEl(out, slug, `team.role.${i}`, el));
  doc.querySelectorAll('.team-bio, .team-desc').forEach((el, i) => gausinAddEl(out, slug, `team.bio.${i}`, el));

  doc.querySelectorAll('.stat-label').forEach((el, i) => gausinAddEl(out, slug, `stat.label.${i}`, el));

  doc.querySelectorAll('.fp-cat').forEach((el, i) => gausinAddEl(out, slug, `fp.cat.${i}`, el));
  doc.querySelectorAll('.fp-title').forEach((el, i) => gausinAddEl(out, slug, `fp.title.${i}`, el));
  doc.querySelectorAll('.fp-desc').forEach((el, i) => gausinAddEl(out, slug, `fp.desc.${i}`, el));
  doc.querySelectorAll('.fp-tag').forEach((el, i) => gausinAddEl(out, slug, `fp.tag.${i}`, el));

  doc.querySelectorAll('.industry-card-title').forEach((el, i) => gausinAddEl(out, slug, `industry.title.${i}`, el));
  doc.querySelectorAll('.industry-card-desc').forEach((el, i) => gausinAddEl(out, slug, `industry.desc.${i}`, el));

  doc.querySelectorAll('.ind-name').forEach((el, i) => gausinAddEl(out, slug, `ind.name.${i}`, el));
  doc.querySelectorAll('.ind-desc').forEach((el, i) => gausinAddEl(out, slug, `ind.desc.${i}`, el));
  doc.querySelectorAll('.ind-tag').forEach((el, i) => gausinAddEl(out, slug, `ind.tag.${i}`, el));

  doc.querySelectorAll('.ind-card h3, .ind-title').forEach((el, i) => gausinAddEl(out, slug, `ind.cardTitle.${i}`, el));
  doc.querySelectorAll('.ind-card p').forEach((el, i) => gausinAddEl(out, slug, `ind.cardDesc.${i}`, el));

  doc.querySelectorAll('.ind-detail-title').forEach((el, i) => gausinAddEl(out, slug, `indDetail.title.${i}`, el));
  doc.querySelectorAll('.ind-detail-sub').forEach((el, i) => gausinAddEl(out, slug, `indDetail.sub.${i}`, el));
  doc.querySelectorAll('.ind-col-title').forEach((el, i) => gausinAddEl(out, slug, `indDetail.colTitle.${i}`, el));
  doc.querySelectorAll('.ind-detail-header div[style*="font-size:0.75rem"]').forEach((el, i) => gausinAddEl(out, slug, `indDetail.statLbl.${i}`, el));
  doc.querySelectorAll('.ind-detail-col div[style*="background:var(--blue-50)"] div[style*="font-weight:700"]').forEach((el, i) => gausinAddEl(out, slug, `indDetail.highlightTitle.${i}`, el));
  doc.querySelectorAll('.ind-detail-col div[style*="background:var(--blue-50)"] div[style*="line-height:1.65"]').forEach((el, i) => gausinAddEl(out, slug, `indDetail.highlightDesc.${i}`, el));
  doc.querySelectorAll('.ind-detail-col div[style*="line-height:1.75"][style*="text-align:justify"]').forEach((el, i) => gausinAddEl(out, slug, `indDetail.note.${i}`, el));

  doc.querySelectorAll('.tech-pill').forEach((el, i) => gausinAddEl(out, slug, `tech.pill.${i}`, el));

  doc.querySelectorAll('.client-name').forEach((el, i) => gausinAddEl(out, slug, `client.name.${i}`, el));

  doc.querySelectorAll('.glass div[style*="font-weight:700"], .glass div[style*="font-weight: 700"]').forEach((el, i) => {
    gausinAddEl(out, slug, `glass.title.${i}`, el);
  });
  doc.querySelectorAll('.glass div[style*="font-size:0.8125rem"]').forEach((el, i) => {
    gausinAddEl(out, slug, `glass.desc.${i}`, el);
  });

  doc.querySelectorAll('.more-ind-card div[style*="font-weight:700"], .more-ind-card div[style*="font-weight: 700"]').forEach((el, i) => {
    gausinAddEl(out, slug, `moreInd.title.${i}`, el);
  });
  doc.querySelectorAll('.more-ind-card div[style*="font-size:0.875rem"]').forEach((el, i) => {
    gausinAddEl(out, slug, `moreInd.desc.${i}`, el);
  });

  doc.querySelectorAll('.prod-spec-label').forEach((el, i) => gausinAddEl(out, slug, `prod.specLabel.${i}`, el));
  doc.querySelectorAll('.prod-spec-val').forEach((el, i) => gausinAddEl(out, slug, `prod.specVal.${i}`, el));
  doc.querySelectorAll('.prod-app').forEach((el, i) => gausinAddEl(out, slug, `prod.app.${i}`, el));

  doc.querySelectorAll('.page-hero-label').forEach((el, i) => gausinAddEl(out, slug, `hero.label.${i}`, el));
  doc.querySelectorAll('.breadcrumb-item').forEach((el, i) => gausinAddEl(out, slug, `crumb.${i}`, el));
  doc.querySelectorAll('.page-hero-sub').forEach((el, i) => gausinAddEl(out, slug, `hero.sub.${i}`, el));

  doc.querySelectorAll('.service-badge').forEach((el, i) => gausinAddEl(out, slug, `svc.badge.${i}`, el));
  doc.querySelectorAll('.service-title').forEach((el, i) => gausinAddEl(out, slug, `svc.title.${i}`, el));
  doc.querySelectorAll('.service-desc').forEach((el, i) => gausinAddEl(out, slug, `svc.desc.${i}`, el));
  doc.querySelectorAll('.service-feat').forEach((el, i) => gausinAddEl(out, slug, `svc.feat.${i}`, el));
  doc.querySelectorAll('.proc-content h4').forEach((el, i) => gausinAddEl(out, slug, `proc.title.${i}`, el));
  doc.querySelectorAll('.proc-content p').forEach((el, i) => gausinAddEl(out, slug, `proc.desc.${i}`, el));

  doc.querySelectorAll('.value-title').forEach((el, i) => gausinAddEl(out, slug, `value.title.${i}`, el));
  doc.querySelectorAll('.value-desc').forEach((el, i) => gausinAddEl(out, slug, `value.desc.${i}`, el));
  doc.querySelectorAll('.timeline-title').forEach((el, i) => gausinAddEl(out, slug, `timeline.title.${i}`, el));
  doc.querySelectorAll('.timeline-desc').forEach((el, i) => gausinAddEl(out, slug, `timeline.desc.${i}`, el));
  doc.querySelectorAll('.cert-name').forEach((el, i) => gausinAddEl(out, slug, `cert.name.${i}`, el));
  doc.querySelectorAll('.cert-desc').forEach((el, i) => gausinAddEl(out, slug, `cert.desc.${i}`, el));

  doc.querySelectorAll('.cap-label > span:first-child').forEach((el, i) => gausinAddEl(out, slug, `cap.label.${i}`, el));
  doc.querySelectorAll('.industry-exp-icon').forEach((icon, i) => {
    const title = icon.parentElement?.querySelector('div[style*="font-weight:600"]');
    if (title) gausinAddEl(out, slug, `exp.title.${i}`, title);
  });

  doc.querySelectorAll('.cat-name').forEach((el, i) => gausinAddEl(out, slug, `cat.name.${i}`, el));
  doc.querySelectorAll('.cat-count').forEach((el, i) => gausinAddEl(out, slug, `cat.count.${i}`, el));
  doc.querySelectorAll('.advantage-desc').forEach((el, i) => gausinAddEl(out, slug, `adv.desc.${i}`, el));
  doc.querySelectorAll('section h4').forEach((el, i) => {
    if (el.closest('.proc-content')) return;
    gausinAddEl(out, slug, `h4.${i}`, el);
  });

  doc.querySelectorAll('.dl-stat-lbl').forEach((el, i) => gausinAddEl(out, slug, `dl.statLbl.${i}`, el));
  doc.querySelectorAll('.dl-tag').forEach((el, i) => gausinAddEl(out, slug, `dl.tag.${i}`, el));
  doc.querySelectorAll('.dl-cat-title').forEach((el, i) => gausinAddEl(out, slug, `dl.catTitle.${i}`, el));
  doc.querySelectorAll('.dl-card-title').forEach((el, i) => gausinAddEl(out, slug, `dl.cardTitle.${i}`, el));
  doc.querySelectorAll('.dl-card-desc').forEach((el, i) => gausinAddEl(out, slug, `dl.cardDesc.${i}`, el));
  doc.querySelectorAll('.dl-featured-badge').forEach((el, i) => gausinAddEl(out, slug, `dl.featBadge.${i}`, el));
  doc.querySelectorAll('.dl-featured-body h2').forEach((el, i) => gausinAddEl(out, slug, `dl.featTitle.${i}`, el));
  doc.querySelectorAll('.dl-featured-body > p').forEach((el, i) => gausinAddEl(out, slug, `dl.featDesc.${i}`, el));
  doc.querySelectorAll('.dl-cta h3').forEach((el, i) => gausinAddEl(out, slug, `dl.ctaTitle.${i}`, el));
  doc.querySelectorAll('.dl-cta p').forEach((el, i) => gausinAddEl(out, slug, `dl.ctaDesc.${i}`, el));

  doc.querySelectorAll('.ins-stat-label').forEach((el, i) => gausinAddEl(out, slug, `ins.statLbl.${i}`, el));
  doc.querySelectorAll('.ins-filter-btn').forEach((el, i) => gausinAddEl(out, slug, `ins.filter.${i}`, el));
  doc.querySelectorAll('.ins-cat').forEach((el, i) => gausinAddEl(out, slug, `ins.cat.${i}`, el));
  doc.querySelectorAll('.ins-title').forEach((el, i) => gausinAddEl(out, slug, `ins.title.${i}`, el));
  doc.querySelectorAll('.ins-excerpt').forEach((el, i) => gausinAddEl(out, slug, `ins.desc.${i}`, el));
  doc.querySelectorAll('.ins-link').forEach((el, i) => gausinAddEl(out, slug, `ins.link.${i}`, el));
  doc.querySelectorAll('.ins-tag').forEach((el, i) => gausinAddEl(out, slug, `ins.tag.${i}`, el));
  doc.querySelectorAll('.ins-section-header h3').forEach((el, i) => gausinAddEl(out, slug, `ins.secTitle.${i}`, el));

  doc.querySelectorAll('.job-title').forEach((el, i) => gausinAddEl(out, slug, `job.title.${i}`, el));
  doc.querySelectorAll('.job-desc').forEach((el, i) => gausinAddEl(out, slug, `job.desc.${i}`, el));
  doc.querySelectorAll('.job-qual').forEach((el, i) => gausinAddEl(out, slug, `job.qual.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.job-tag').forEach((el, i) => gausinAddEl(out, slug, `job.tag.${i}`, el));
  doc.querySelectorAll('.job-list li').forEach((el, i) => gausinAddEl(out, slug, `job.li.${i}`, el));
  doc.querySelectorAll('.job-note-desc').forEach((el, i) => gausinAddEl(out, slug, `job.note.${i}`, el));
  doc.querySelectorAll('.section-badge').forEach((el, i) => gausinAddEl(out, slug, `apply.badge.${i}`, el));
  doc.querySelectorAll('select.form-control option').forEach((el, i) => gausinAddEl(out, slug, `opt.${i}`, el));

  doc.querySelectorAll('.info-label').forEach((el, i) => gausinAddEl(out, slug, `info.label.${i}`, el));
  doc.querySelectorAll('.info-value').forEach((el, i) => gausinAddEl(out, slug, `info.value.${i}`, el));
  doc.querySelectorAll('.info-sub').forEach((el, i) => gausinAddEl(out, slug, `info.sub.${i}`, el));
  doc.querySelectorAll('.contact-social-heading').forEach((el, i) => gausinAddEl(out, slug, `social.heading.${i}`, el));
  doc.querySelectorAll('.connect-card-title').forEach((el, i) => gausinAddEl(out, slug, `connect.title.${i}`, el));
  doc.querySelectorAll('.connect-card-desc').forEach((el, i) => gausinAddEl(out, slug, `connect.desc.${i}`, el));
  doc.querySelectorAll('.loc-org-name').forEach((el, i) => gausinAddEl(out, slug, `loc.org.${i}`, el));
  doc.querySelectorAll('.loc-address').forEach((el, i) => gausinAddEl(out, slug, `loc.addr.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.loc-detail-text').forEach((el, i) => gausinAddEl(out, slug, `loc.detail.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.partner-region').forEach((el, i) => gausinAddEl(out, slug, `partner.region.${i}`, el));
  doc.querySelectorAll('.partner-office-badge').forEach((el, i) => gausinAddEl(out, slug, `partner.badge.${i}`, el));
  doc.querySelectorAll('.partner-name').forEach((el, i) => gausinAddEl(out, slug, `partner.name.${i}`, el));
  doc.querySelectorAll('.partner-badge').forEach((el, i) => gausinAddEl(out, slug, `partner.loc.${i}`, el));
  doc.querySelectorAll('.partner-address').forEach((el, i) => gausinAddEl(out, slug, `partner.addr.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.partner-rep').forEach((el, i) => gausinAddEl(out, slug, `partner.rep.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.partner-contact-title').forEach((el, i) => gausinAddEl(out, slug, `partner.contactTitle.${i}`, el));
  doc.querySelectorAll('.partner-note').forEach((el, i) => gausinAddEl(out, slug, `partner.note.${i}`, el));
  doc.querySelectorAll('.form-consent-label').forEach((el, i) => gausinAddEl(out, slug, `form.consent.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.form-security-note span').forEach((el, i) => gausinAddEl(out, slug, `form.secure.${i}`, el));
  doc.querySelectorAll('#inquiryForm optgroup[label]').forEach((el, i) => gausinAddEl(out, slug, `optgrp.${i}`, el, 'optgroup'));
  doc.querySelectorAll('#inquiryForm input[placeholder], #inquiryForm textarea[placeholder]').forEach((el, i) => {
    gausinAddEl(out, slug, `ph.${i}`, el, 'placeholder');
  });
  doc.querySelectorAll('.accordion-title').forEach((el, i) => gausinAddEl(out, slug, `acc.q.${i}`, el));
  doc.querySelectorAll('.accordion-body p').forEach((el, i) => gausinAddEl(out, slug, `acc.a.${i}`, el));
  doc.querySelectorAll('.form-success-title').forEach((el, i) => gausinAddEl(out, slug, `form.okTitle.${i}`, el));
  doc.querySelectorAll('.form-success-desc').forEach((el, i) => gausinAddEl(out, slug, `form.okDesc.${i}`, el));
  doc.querySelectorAll('.form-error').forEach((el, i) => gausinAddEl(out, slug, `form.err.${i}`, el));
  doc.querySelectorAll('.map-open-btn').forEach((el, i) => gausinAddEl(out, slug, `map.btn.${i}`, el));

  doc.querySelectorAll('.tool-name').forEach((el, i) => gausinAddEl(out, slug, `tool.name.${i}`, el));
  doc.querySelectorAll('.tool-version').forEach((el, i) => gausinAddEl(out, slug, `tool.ver.${i}`, el));
  doc.querySelectorAll('.tool-desc').forEach((el, i) => gausinAddEl(out, slug, `tool.desc.${i}`, el));
  doc.querySelectorAll('.tool-tag').forEach((el, i) => gausinAddEl(out, slug, `tool.tag.${i}`, el));
  doc.querySelectorAll('.fab-title').forEach((el, i) => gausinAddEl(out, slug, `fab.title.${i}`, el));
  doc.querySelectorAll('.fab-desc').forEach((el, i) => gausinAddEl(out, slug, `fab.desc.${i}`, el));
  doc.querySelectorAll('.iot-metric-label').forEach((el, i) => gausinAddEl(out, slug, `iot.label.${i}`, el));

  doc.querySelectorAll('.inno-content h4').forEach((el, i) => gausinAddEl(out, slug, `inno.title.${i}`, el));
  doc.querySelectorAll('.inno-content p').forEach((el, i) => gausinAddEl(out, slug, `inno.desc.${i}`, el));
  doc.querySelectorAll('div[style*="linear-gradient(135deg,var(--blue-900)"] div[style*="justify-content:space-between"] span:first-child').forEach((el, i) => {
    gausinAddEl(out, slug, `mfg.label.${i}`, el);
  });
  doc.querySelectorAll('div[style*="letter-spacing:0.05em"][style*="text-transform:uppercase"]').forEach((el, i) => {
    gausinAddEl(out, slug, `mfg.matHeading.${i}`, el);
  });
  doc.querySelectorAll('div[style*="letter-spacing:0.05em"][style*="text-transform:uppercase"] + div > span').forEach((el, i) => {
    gausinAddEl(out, slug, `mfg.mat.${i}`, el);
  });

  doc.querySelectorAll('.tech-card-title').forEach((el, i) => gausinAddEl(out, slug, `ds.title.${i}`, el));
  doc.querySelectorAll('.tech-card-desc').forEach((el, i) => gausinAddEl(out, slug, `ds.desc.${i}`, el));

  doc.querySelectorAll('.news-cat').forEach((el, i) => gausinAddEl(out, slug, `news.cat.${i}`, el));
  doc.querySelectorAll('.news-link').forEach((el, i) => gausinAddEl(out, slug, `news.link.${i}`, el));
  doc.querySelectorAll('.news-cta h3').forEach((el, i) => gausinAddEl(out, slug, `news.ctaTitle.${i}`, el));
  doc.querySelectorAll('.news-cta p').forEach((el, i) => gausinAddEl(out, slug, `news.ctaDesc.${i}`, el));

  doc.querySelectorAll('.clients-stat-label').forEach((el, i) => gausinAddEl(out, slug, `cli.statLbl.${i}`, el));
  doc.querySelectorAll('.clients-intro').forEach((el, i) => gausinAddEl(out, slug, `cli.intro.${i}`, el));

  doc.querySelectorAll('.legal-chip-label').forEach((el, i) => gausinAddEl(out, slug, `legal.chipLbl.${i}`, el));
  doc.querySelectorAll('.legal-chip-val').forEach((el, i) => gausinAddEl(out, slug, `legal.chipVal.${i}`, el));
  doc.querySelectorAll('.legal-main > h2').forEach((el, i) => gausinAddEl(out, slug, `legal.h2.${i}`, el));
  doc.querySelectorAll('.legal-section h3').forEach((el, i) => gausinAddEl(out, slug, `legal.h3.${i}`, el));
  doc.querySelectorAll('.legal-section p').forEach((el, i) => gausinAddEl(out, slug, `legal.p.${i}`, el));
  doc.querySelectorAll('.legal-section li').forEach((el, i) => gausinAddEl(out, slug, `legal.li.${i}`, el));
  doc.querySelectorAll('.legal-note').forEach((el, i) => gausinAddEl(out, slug, `legal.note.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.legal-card-title').forEach((el, i) => gausinAddEl(out, slug, `legal.sideTitle.${i}`, el));
  doc.querySelectorAll('.legal-list a').forEach((el, i) => gausinAddEl(out, slug, `legal.nav.${i}`, el));

  doc.querySelectorAll('.sitemap-intro').forEach((el, i) => gausinAddEl(out, slug, `map.intro.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));
  doc.querySelectorAll('.sitemap-card h2').forEach((el, i) => gausinAddEl(out, slug, `map.group.${i}`, el));
  doc.querySelectorAll('.sitemap-links a').forEach((el, i) => gausinAddEl(out, slug, `map.link.${i}`, el));
  doc.querySelectorAll('.sitemap-note').forEach((el, i) => gausinAddEl(out, slug, `map.note.${i}`, el, gausinIsHtmlEl(el) ? 'html' : 'text'));

  doc.querySelectorAll('.error-title').forEach((el, i) => gausinAddEl(out, slug, `err.title.${i}`, el));
  doc.querySelectorAll('.error-desc').forEach((el, i) => gausinAddEl(out, slug, `err.desc.${i}`, el));
  doc.querySelectorAll('.quick-link').forEach((el, i) => gausinAddEl(out, slug, `err.quick.${i}`, el));

  doc.querySelectorAll('.download-card h3, .dl-card h3').forEach((el, i) => gausinAddEl(out, slug, `dl.title.${i}`, el));
  doc.querySelectorAll('.download-card p, .dl-card p').forEach((el, i) => gausinAddEl(out, slug, `dl.desc.${i}`, el));

  doc.querySelectorAll('.news-card h3, .news-title').forEach((el, i) => gausinAddEl(out, slug, `news.title.${i}`, el));
  doc.querySelectorAll('.news-card p, .news-excerpt').forEach((el, i) => gausinAddEl(out, slug, `news.desc.${i}`, el));

  doc.querySelectorAll('.faq-q, .faq-question').forEach((el, i) => gausinAddEl(out, slug, `faq.q.${i}`, el));
  doc.querySelectorAll('.faq-a, .faq-answer').forEach((el, i) => gausinAddEl(out, slug, `faq.a.${i}`, el));

  doc.querySelectorAll('section .btn, .hero-actions .btn, .cta-section .btn').forEach((el, i) => {
    gausinAddEl(out, slug, `btn.${i}`, el);
  });

  doc.querySelectorAll('section li').forEach((el, i) => {
    if (el.closest('.check-list')) return;
    if (el.querySelector('li')) return;
    gausinAddEl(out, slug, `li.${i}`, el);
  });

  doc.querySelectorAll('section table td, section table th').forEach((el, i) => {
    gausinAddEl(out, slug, `tbl.${i}`, el);
  });

  doc.querySelectorAll('section div[style*="font-weight:800"], section div[style*="font-weight: 800"]').forEach((el, i) => {
    if (el.closest('.hero-stat-number,.card,.prod-card')) return;
    if (el.querySelector('div[style*="font-weight:800"]')) return;
    gausinAddEl(out, slug, `float.${i}`, el);
  });
  doc.querySelectorAll('section div[style*="font-size:0.8125rem"], section div[style*="font-size:0.7rem"]').forEach((el, i) => {
    if (el.closest('.card,.prod-card,.hero-stat')) return;
    const t = gausinCleanText(el);
    if (t.length > 3 && t.length < 60) gausinAddEl(out, slug, `float.sub.${i}`, el);
  });

  doc.querySelectorAll('.contact-info-text, .contact-card p, label.form-label').forEach((el, i) => {
    gausinAddEl(out, slug, `form.${i}`, el);
  });

  doc.querySelectorAll('h2').forEach((el, i) => {
    if (el.classList.contains('section-title')) return;
    if (el.textContent.trim() === 'Related Products') gausinAddEl(out, slug, `related.title.${i}`, el);
  });

  return out;
}

function gausinCollectProductPageItemsFromDom(doc, slug) {
  const out = [];
  const addEl = (el, key, mode = 'text') => gausinAddEl(out, slug, key, el, mode);

  addEl(doc.querySelector('.prod-tagline'), 'tagline', 'html');
  addEl(doc.querySelector('.prod-category-badge'), 'category');

  doc.querySelectorAll('.prod-breadcrumb a[href*="products.html#"]').forEach((el, i) => {
    addEl(el, `breadcrumb.cat.${i}`);
  });

  doc.querySelectorAll('.prod-qs').forEach((box, i) => {
    addEl(box.querySelector('.prod-qs-label'), `qs.${i}.label`);
  });

  doc.querySelectorAll('.prod-hero-img div[style*="font-size:0.875rem"]').forEach((el, i) => {
    addEl(el, `hero.stat.${i}.val`);
  });
  doc.querySelectorAll('.prod-hero-img div[style*="font-size:0.7rem"]').forEach((el, i) => {
    addEl(el, `hero.stat.${i}.label`);
  });

  doc.querySelectorAll('#tab-overview > p').forEach((el, i) => addEl(el, `overview.p${i}`, 'html'));
  doc.querySelectorAll('#tab-overview .adv-card').forEach((card, i) => {
    addEl(card.querySelector('.adv-title'), `overview.adv.${i}.title`);
    addEl(card.querySelector('.adv-desc'), `overview.adv.${i}.desc`);
  });

  doc.querySelectorAll('#tab-specifications .spec-table tr').forEach((tr, ri) => {
    tr.querySelectorAll('td').forEach((td, ci) => addEl(td, `spec.r${ri}.c${ci}`));
  });

  doc.querySelectorAll('#tab-applications > div > div').forEach((card, i) => {
    const divs = [...card.querySelectorAll('div')].filter((d) => d.textContent.trim() && !d.querySelector('i'));
    const title = divs.find((d) => (d.getAttribute('style') || '').includes('font-weight:700'));
    const desc = divs.find((d) => d !== title && d.textContent.length > 15);
    addEl(title, `applications.${i}.title`);
    addEl(desc, `applications.${i}.desc`);
  });

  doc.querySelectorAll('#tab-advantages .adv-card').forEach((card, i) => {
    addEl(card.querySelector('.adv-title'), `advantages.${i}.title`);
    addEl(card.querySelector('.adv-desc'), `advantages.${i}.desc`);
  });

  doc.querySelectorAll('#tab-how-it-works > div > div').forEach((row, i) => {
    const inner = row.querySelector('div:last-child');
    if (!inner) return;
    const kids = [...inner.children];
    addEl(kids[0], `how.${i}.title`);
    addEl(kids[1], `how.${i}.desc`);
  });

  addEl(doc.querySelector('.sidebar-title'), 'sidebar.title');
  addEl(doc.querySelector('.sidebar-sub'), 'sidebar.sub');
  doc.querySelectorAll('.sidebar-g-item').forEach((el, i) => addEl(el, `sidebar.guarantee.${i}`));

  doc.querySelectorAll('.prod-sidebar div').forEach((el) => {
    if ((el.textContent || '').trim().startsWith('Or call us')) addEl(el, 'sidebar.orCall');
  });

  doc.querySelectorAll('.prod-sidebar span[style*="color:var(--gray-600)"]').forEach((el, i) => {
    addEl(el, `sidebar.quick.${i}.label`);
  });

  doc.querySelectorAll('.related-title').forEach((el, i) => addEl(el, `related.${i}.title`));
  doc.querySelectorAll('.related-desc').forEach((el, i) => addEl(el, `related.${i}.desc`));

  doc.querySelectorAll('h2').forEach((el, i) => {
    if (el.textContent.trim() === 'Related Products') addEl(el, `related.title.${i}`, el);
  });

  return out;
}

function gausinCollectPageContentItemsFromDom(doc, slug) {
  if (doc.querySelector('.prod-layout')) return gausinCollectProductPageItemsFromDom(doc, slug);
  return gausinCollectSitePageContentItemsFromDom(doc, slug);
}

function gausinSetElContent(el, val, mode) {
  const isCat = el.classList.contains('prod-category-badge');
  const isBadge = el.classList.contains('hero-badge');
  const isCheck = el.classList.contains('check-item');
  const isBtn = el.classList.contains('btn');
  const isCardLink = el.classList.contains('card-link');

  if (isCat) {
    const icon = el.querySelector('i');
    el.textContent = '';
    if (icon) el.appendChild(icon.cloneNode(true));
    el.append(' ' + val);
    return;
  }
  if (isBadge) {
    const dot = el.querySelector('.hero-badge-dot');
    el.textContent = '';
    if (dot) el.appendChild(dot.cloneNode(true));
    el.append(' ' + val);
    return;
  }
  if (isCheck) {
    const icon = el.querySelector('.check-icon');
    el.textContent = '';
    if (icon) el.appendChild(icon.cloneNode(true));
    el.append(' ' + val);
    return;
  }
  if (el.classList.contains('service-feat')) {
    const dot = el.querySelector('.service-feat-dot');
    el.textContent = '';
    if (dot) el.appendChild(dot.cloneNode(true));
    el.append(' ' + val);
    return;
  }
  if (el.classList.contains('service-badge') || el.classList.contains('page-hero-label') || el.classList.contains('ind-col-title')) {
    const icon = el.querySelector('i,svg');
    el.textContent = '';
    if (icon) el.appendChild(icon.cloneNode(true));
    el.append(' ' + val);
    return;
  }
  if (el.querySelector('.fa-check-circle')) {
    const icon = el.querySelector('.fa-check-circle');
    el.textContent = '';
    if (icon) el.appendChild(icon.cloneNode(true));
    el.append(' ' + val);
    return;
  }
  if (isBtn) {
    const icon = el.querySelector('i,svg');
    el.textContent = '';
    if (icon) el.appendChild(icon.cloneNode(true));
    if (val) el.append(document.createTextNode(' ' + val));
    return;
  }
  if (isCardLink) {
    const icon = el.querySelector('i,svg');
    el.textContent = '';
    el.append(val + ' ');
    if (icon) el.appendChild(icon.cloneNode(true));
    return;
  }
  if (el.classList.contains('fp-link')) {
    const icon = el.querySelector('i,svg');
    el.textContent = '';
    el.append(val + ' ');
    if (icon) el.appendChild(icon.cloneNode(true));
    return;
  }
  if (el.classList.contains('ins-link') || el.classList.contains('news-link') || el.classList.contains('quick-link')) {
    const icon = el.querySelector('i,svg');
    el.textContent = '';
    el.append(val + ' ');
    if (icon) el.appendChild(icon.cloneNode(true));
    return;
  }
  if (el.classList.contains('tech-pill')) {
    const iconWrap = el.querySelector('.tech-pill-icon');
    el.textContent = '';
    if (iconWrap) el.appendChild(iconWrap.cloneNode(true));
    el.append(val);
    return;
  }
  if (el.classList.contains('partner-badge')) {
    const icon = el.querySelector('i,svg');
    el.textContent = '';
    if (icon) el.appendChild(icon.cloneNode(true));
    if (val) el.append(document.createTextNode(' ' + val.trim()));
    return;
  }
  if (mode === 'optgroup') {
    if (el.dataset.i18nPageOptgrpOrig == null) el.dataset.i18nPageOptgrpOrig = el.getAttribute('label') || '';
    el.setAttribute('label', val);
    return;
  }
  if (mode === 'placeholder') {
    if (el.dataset.i18nPagePhOrig == null) el.dataset.i18nPagePhOrig = el.getAttribute('placeholder') || '';
    el.setAttribute('placeholder', val);
    return;
  }
  if (mode === 'html') el.innerHTML = val;
  else el.textContent = val;
}

function gausinApplyPageContent(dict, slug) {
  gausinCollectPageContentItemsFromDom(document, slug).forEach(({ el, key, mode }) => {
    const isCat = el.classList.contains('prod-category-badge');
    const origKey = (mode === 'html' || isCat) ? 'i18nPageHtmlOrig'
      : mode === 'optgroup' ? 'i18nPageOptgrpOrig'
      : mode === 'placeholder' ? 'i18nPagePhOrig'
      : 'i18nPageOrig';
    if (el.dataset[origKey] == null) {
      if (mode === 'html' || isCat) el.dataset[origKey] = el.innerHTML;
      else if (mode === 'optgroup') el.dataset[origKey] = el.getAttribute('label') || '';
      else if (mode === 'placeholder') el.dataset[origKey] = el.getAttribute('placeholder') || '';
      else el.dataset[origKey] = el.textContent;
    }
    const val = dict[key];
    if (val == null || val === '') return;
    gausinSetElContent(el, val, mode);
  });

  const titleKey = `${slug}._meta.title`;
  if (dict[titleKey]) {
    if (document.documentElement.dataset.i18nDocTitleOrig == null) {
      document.documentElement.dataset.i18nDocTitleOrig = document.title;
    }
    document.title = dict[titleKey];
  }
}

function gausinRestorePageContent(slug) {
  gausinCollectPageContentItemsFromDom(document, slug).forEach(({ el, mode }) => {
    const isCat = el.classList.contains('prod-category-badge');
    const origKey = (mode === 'html' || isCat) ? 'i18nPageHtmlOrig'
      : mode === 'optgroup' ? 'i18nPageOptgrpOrig'
      : mode === 'placeholder' ? 'i18nPagePhOrig'
      : 'i18nPageOrig';
    if (el.dataset[origKey] == null) return;
    if (mode === 'html' || isCat) el.innerHTML = el.dataset[origKey];
    else if (mode === 'optgroup') el.setAttribute('label', el.dataset[origKey]);
    else if (mode === 'placeholder') el.setAttribute('placeholder', el.dataset[origKey]);
    else el.textContent = el.dataset[origKey];
  });
  if (document.documentElement.dataset.i18nDocTitleOrig != null) {
    document.title = document.documentElement.dataset.i18nDocTitleOrig;
  }
}

window.gausinPageSlugFromFile = gausinPageSlugFromFile;
window.gausinApplyPageContent = gausinApplyPageContent;
window.gausinRestorePageContent = gausinRestorePageContent;
