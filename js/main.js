// Main interactions

const overlay = document.getElementById('overlay');
const openBtns = document.querySelectorAll('[data-overlay-open]');
const closeBtn = document.querySelector('[data-overlay-close]');

openBtns.forEach(btn => btn.addEventListener('click', () => overlay.classList.add('open')));
closeBtn?.addEventListener('click', () => overlay.classList.remove('open'));
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('open');
});

document.querySelectorAll('.overlay__nav a').forEach(a => a.addEventListener('click', () => overlay.classList.remove('open')));

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      overlay.classList.remove('open');
    }
  });
});

// Active navigation highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Highlight home when at top
  if (scrollY < 300) {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === 'index.html') {
        link.classList.add('active');
      }
    });
  }
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Footer year
const yearEl = document.querySelector('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Swiper init (tour page only)
window.addEventListener('DOMContentLoaded', () => {
  if (typeof Swiper !== 'undefined') {
    const el = document.querySelector('.gallery-swiper');
    if (el) {
      // eslint-disable-next-line no-undef
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 12,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        breakpoints: {
          700: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    }
  }
});

// Fake form submit
const form = document.getElementById('availabilityForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  alert(`Demo only. We would contact: ${data.name || 'Guest'} at ${data.email || 'email'} — Thank you!`);
  form.reset();
});
