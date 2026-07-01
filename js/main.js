/* ============================================================
   GAUSIN INTERNATIONAL ENGINEERS PVT. LTD.
   Main JavaScript — Interactive & Animation Logic
   ============================================================ */

'use strict';

/* ── Navbar ──────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbarToggle');

function getMobileNav() {
  return document.getElementById('mobileNav');
}

function closeMobileNav() {
  navbarToggle?.classList.remove('open');
  getMobileNav()?.classList.remove('open');
  document.body.style.overflow = '';
}

// Scroll state
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
});

// Mobile toggle (mobileNav may be injected after this script by components.js)
navbarToggle?.addEventListener('click', () => {
  const mobileNav = getMobileNav();
  navbarToggle.classList.toggle('open');
  mobileNav?.classList.toggle('open');
  document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
});

// Mobile sub-menu toggles (delegated — works for dynamically injected accordions)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.mobile-toggle');
  if (!btn || !btn.closest('#mobileNav')) return;
  e.preventDefault();
  const parent = btn.closest('.mobile-nav-item');
  const sub = parent?.querySelector('.mobile-sub-links');
  const icon = btn.querySelector('.toggle-arrow');
  sub?.classList.toggle('open');
  if (icon) icon.style.transform = sub?.classList.contains('open') ? 'rotate(180deg)' : '';
});

// Close mobile nav on link click
document.addEventListener('click', (e) => {
  const link = e.target.closest('.mobile-sub-link, .mobile-nav-link-plain');
  if (!link || !link.closest('#mobileNav')) return;
  closeMobileNav();
});

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── Animated Counter ────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;
    if (current < target) requestAnimationFrame(update);
  };

  requestAnimationFrame(update);
}

/* ── Intersection Observer ───────────────────────────────── */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

// AOS-like animations
const aoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
      aoObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => aoObserver.observe(el));

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-section, .hero-stats').forEach(el => counterObserver.observe(el));

/* ── Smooth Scroll ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-height'), 10) + 20;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    }
  });
});

/* ── Accordion ───────────────────────────────────────────── */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const isOpen = item.classList.contains('open');

    // Close siblings
    item.closest('.accordion')?.querySelectorAll('.accordion-item.open').forEach(open => {
      if (open !== item) open.classList.remove('open');
    });

    item.classList.toggle('open', !isOpen);
  });
});

/* ── Tabs ────────────────────────────────────────────────── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    const parent = btn.closest('.tabs-wrapper');
    if (!parent) return;

    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    parent.querySelector(`[data-tab-pane="${target}"]`)?.classList.add('active');
  });
});

/* ── Product Filter ──────────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    const wrapper = btn.closest('.filter-wrapper');
    const filterBar = btn.closest('.filter-bar');

    if (filterBar) {
      filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    } else {
      btn.closest('.filter-wrapper')?.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');

    const items = wrapper
      ? wrapper.querySelectorAll('.filterable')
      : document.querySelectorAll('.filterable');

    items.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = '';
        item.style.animation = 'scaleIn 0.3s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });

    document.querySelectorAll('.product-cat-section').forEach(section => {
      if (filter === 'all') {
        section.style.display = '';
        return;
      }
      const cards = section.querySelectorAll('.filterable');
      const anyVisible = [...cards].some(c => c.style.display !== 'none');
      section.style.display = anyVisible ? '' : 'none';
    });
  });
});

/* ── API base URL — change this to your deployed backend URL ─────────────── */
const GAUSIN_API = window.GAUSIN_API_URL || 'http://localhost:5000';

/* ── Form helpers ────────────────────────────────────────────────────────── */
function validateForm(form) {
  let valid = true;
  form.querySelectorAll('[required]').forEach(input => {
    const val = input.value.trim();
    const group = input.closest('.form-group');
    const error = group?.querySelector('.form-error');
    if (!val) {
      valid = false;
      input.style.borderColor = '#EF4444';
      if (error) error.style.display = 'block';
    } else {
      input.style.borderColor = '#10B981';
      if (error) error.style.display = 'none';
    }
    if (input.type === 'email' && val) {
      const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailReg.test(val)) {
        valid = false;
        input.style.borderColor = '#EF4444';
        if (error) { error.textContent = 'Enter a valid email'; error.style.display = 'block'; }
      }
    }
  });
  return valid;
}

function setSubmitState(btn, loading) {
  if (!btn) return;
  if (loading) {
    btn._origText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
    btn.disabled = true;
  } else {
    btn.innerHTML = btn._origText || 'Submit';
    btn.disabled = false;
  }
}

function showFormSuccess(form, btn, msg) {
  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + msg;
    btn.style.background = 'linear-gradient(135deg,#10B981,#059669)';
    btn.disabled = true;
  }
  // Show a visible success banner below the form
  let banner = form.querySelector('.form-success-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.className = 'form-success-banner';
    banner.style.cssText = 'background:linear-gradient(135deg,#D1FAE5,#A7F3D0);border:1.5px solid #10B981;color:#065F46;border-radius:10px;padding:12px 16px;margin-top:12px;font-size:0.9rem;font-weight:600;text-align:center;';
    form.appendChild(banner);
  }
  banner.innerHTML = '<i class="fa-solid fa-circle-check" style="color:#10B981;margin-right:6px;"></i>' + msg + ' We\'ll get back to you soon.';
  banner.style.display = 'block';
  setTimeout(() => {
    if (btn) { btn.innerHTML = btn._origText || 'Submit'; btn.style.background = ''; btn.disabled = false; }
    banner.style.display = 'none';
    form.reset();
    form.querySelectorAll('input,textarea').forEach(i => i.style.borderColor = '');
  }, 8000);
}

function showFormError(form, btn, msg) {
  if (btn) setSubmitState(btn, false);
  let errEl = form.querySelector('.form-api-error');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.className = 'form-api-error';
    errEl.style.cssText = 'color:#EF4444;font-size:0.875rem;margin-top:10px;text-align:center;';
    form.appendChild(errEl);
  }
  errEl.textContent = msg;
  setTimeout(() => errEl.remove(), 6000);
}

/* ── Contact page form ───────────────────────────────────────────────────── */
const contactForm = document.getElementById('inquiryForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(contactForm)) return;
    const btn = contactForm.querySelector('[type="submit"]');
    setSubmitState(btn, true);
    try {
      const data = {
        firstName: contactForm.querySelector('#firstName')?.value.trim(),
        lastName:  contactForm.querySelector('#lastName')?.value.trim(),
        email:     contactForm.querySelector('#email')?.value.trim(),
        phone:     contactForm.querySelector('#phone')?.value.trim(),
        company:   contactForm.querySelector('#company')?.value.trim(),
        industry:  contactForm.querySelector('#industry')?.value.trim(),
        product:   contactForm.querySelector('#product')?.value.trim(),
        capacity:  contactForm.querySelector('#capacity')?.value.trim(),
        message:   contactForm.querySelector('#message')?.value.trim(),
      };
      const res = await fetch(`${GAUSIN_API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) {
        showFormSuccess(contactForm, btn, 'Inquiry Sent!');
        const formSuccess = document.getElementById('formSuccess');
        if (formSuccess) {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
          document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        showFormError(contactForm, btn, json.message || 'Submission failed. Please try again.');
      }
    } catch {
      showFormError(contactForm, btn, 'Network error. Please check your connection.');
    }
  });
  contactForm.querySelectorAll('input,textarea').forEach(i => {
    i.addEventListener('input', () => { if (i.value.trim()) i.style.borderColor = '#10B981'; });
  });
}

/* ── Product sidebar "Get a Quote" forms ─────────────────────────────────── */
document.querySelectorAll('form.sidebar-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;
    const btn = form.querySelector('[type="submit"]');
    setSubmitState(btn, true);
    try {
      // Detect product name from page <h1> or <title>
      const productName = document.querySelector('h1.product-title, .product-hero h1, h1')?.textContent.trim()
        || document.title.split('|')[0].trim();
      const data = {
        product:  productName,
        name:     form.querySelector('#sb-name')?.value.trim(),
        company:  form.querySelector('#sb-company')?.value.trim(),
        email:    form.querySelector('#sb-email')?.value.trim(),
        phone:    form.querySelector('#sb-phone')?.value.trim(),
        capacity: form.querySelector('#sb-cap')?.value.trim(),
        message:  form.querySelector('#sb-msg')?.value.trim(),
      };
      const res = await fetch(`${GAUSIN_API}/api/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.success) showFormSuccess(form, btn, 'Quote Requested!');
      else showFormError(form, btn, json.message || 'Submission failed. Please try again.');
    } catch {
      showFormError(form, btn, 'Network error. Please check your connection.');
    }
  });
  form.querySelectorAll('input,textarea').forEach(i => {
    i.addEventListener('input', () => { if (i.value.trim()) i.style.borderColor = '#10B981'; });
  });
});

/* ── Career application form ─────────────────────────────────────────────── */
const careerForm = document.getElementById('careerApplicationForm');
if (careerForm) {
  careerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(careerForm)) return;
    const btn = careerForm.querySelector('[type="submit"]');
    setSubmitState(btn, true);
    try {
      const fd = new FormData(careerForm);
      const res = await fetch(`${GAUSIN_API}/api/career`, {
        method: 'POST',
        body: fd, // multipart for file upload
      });
      const json = await res.json();
      if (json.success) showFormSuccess(careerForm, btn, 'Application Submitted!');
      else showFormError(careerForm, btn, json.message || 'Submission failed. Please try again.');
    } catch {
      showFormError(careerForm, btn, 'Network error. Please check your connection.');
    }
  });
}

/* ── Hero Typewriter Effect ──────────────────────────────── */
const typewriterEl = document.querySelector('[data-typewriter]');
if (typewriterEl) {
  const words = typewriterEl.getAttribute('data-typewriter').split('|');
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const current = words[wordIndex];
    const speed = isDeleting ? 50 : 100;

    typewriterEl.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(type, speed);
  };

  setTimeout(type, 1000);
}

/* Hero background stays fixed — no parallax (avoids jitter with fixed navbar) */

/* ── Number Formatting ───────────────────────────────────── */
function formatNumber(n) {
  if (n >= 1000) return Math.floor(n / 1000) + 'K';
  return n.toString();
}

/* ── Back to Top ─────────────────────────────────────────── */
const backTopBtn = document.getElementById('backToTop');
if (backTopBtn) {
  window.addEventListener('scroll', () => {
    backTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
    backTopBtn.style.pointerEvents = window.scrollY > 400 ? 'all' : 'none';
  });

  backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ── Loading Animation ───────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 500);
  }
  document.body.classList.add('loaded');
});

/* ── Cursor Glow Effect (Desktop) ───────────────────────── */
if (window.matchMedia('(hover: hover)').matches) {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(11,94,215,0.04) 0%, transparent 70%);
    pointer-events: none; z-index: 9998; transform: translate(-50%, -50%);
    transition: left 0.1s ease, top 0.1s ease; left: -200px; top: -200px;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

/* ── Image Lazy Loading ──────────────────────────────────── */
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

/* ── Video Autoplay (Muted) ──────────────────────────────── */
document.querySelectorAll('video[data-autoplay]').forEach(video => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) { video.play(); } else { video.pause(); }
  }, { threshold: 0.5 });
  observer.observe(video);
});
