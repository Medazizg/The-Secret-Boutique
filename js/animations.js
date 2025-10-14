// GSAP animations

window.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  // Intro fade
  gsap.from('.site-header', { y: -30, autoAlpha: 0, duration: 0.8, ease: 'power2.out' });

  // Hero text
  gsap.from('.hero .display, .hero .lead, .hero .btn', {
    y: 24,
    autoAlpha: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.08,
    delay: 0.15
  });

  // Cards reveal
  if (document.querySelector('.cards')) {
    gsap.from('.cards .card', {
      scrollTrigger: { trigger: '.cards', start: 'top 80%' },
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power2.out'
    });
  }

  // Grid Boxes reveal
  if (document.querySelector('.grid-4')) {
    gsap.from('.grid-4 .box', {
      scrollTrigger: { trigger: '.grid-4', start: 'top 80%' },
      y: 30,
      autoAlpha: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }

  // Overlay open/close micro-animations
  const overlay = document.getElementById('overlay');
  if (overlay) {
    const navLinks = overlay.querySelectorAll('.overlay__nav a');
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(overlay, { yPercent: -100 }, { yPercent: 0, duration: 0.6, ease: 'power3.out' })
      .from(navLinks, { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    // Hook into class changes
    const observer = new MutationObserver(() => {
      if (overlay.classList.contains('open')) {
        tl.play(0);
      } else {
        tl.reverse();
      }
    });
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }
});
