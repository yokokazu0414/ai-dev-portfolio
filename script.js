'use strict';

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('open', isOpen);
  menuBtn.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});

// ===== NAV SCROLL SHADOW =====
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// ===== NAV ACTIVE HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-anchor');

// Pre-build Map for O(1) lookup instead of forEach on every intersection
const anchorMap = new Map(
  Array.from(navAnchors).map(a => [a.dataset.section, a])
);

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anchorMap.forEach(a => a.classList.remove('active'));
        const active = anchorMap.get(entry.target.id);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(section => navObserver.observe(section));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      if (show) {
        card.classList.remove('hidden');
        // Trigger reflow for animation
        requestAnimationFrame(() => card.classList.remove('fade-out'));
      } else {
        card.classList.add('fade-out');
        const onEnd = () => {
          card.classList.add('hidden');
          card.removeEventListener('transitionend', onEnd);
        };
        card.addEventListener('transitionend', onEnd, { once: true });
      }
    });
  });
});

// ===== MODAL =====
const overlay = document.getElementById('modalOverlay');
const modalImg = document.getElementById('modalImg');
const modalClose = document.getElementById('modalClose');

const imgMap = {
  esg:   { src: 'image/ESG-Analyzer.png',        alt: 'ESG Analyzer' },
  excel: { src: 'image/Excel-Matcher-Pro.png',    alt: 'Excel Matcher Pro' },
  puyo:  { src: 'image/Puyopuyo-neon.png',        alt: 'Puyopuyo Neon' },
  sns:   { src: 'image/SNS-Photo-Generator.png',  alt: 'SNS Photo Generator' },
};

const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';
let lastFocused = null;

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.modal;
    const data = imgMap[key];
    if (!data) return;
    modalImg.src = data.src;
    modalImg.alt = data.alt;
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  });
});

// Focus trap: keep Tab inside the modal while it is open
overlay.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = Array.from(overlay.querySelectorAll(FOCUSABLE));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  if (lastFocused) { lastFocused.focus(); lastFocused = null; }
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });
