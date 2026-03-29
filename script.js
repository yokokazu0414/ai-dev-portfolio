'use strict';

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

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
      card.classList.toggle('hidden', !show);
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

document.querySelectorAll('[data-modal]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.modal;
    const data = imgMap[key];
    if (!data) return;
    modalImg.src = data.src;
    modalImg.alt = data.alt;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
