const menuToggle = document.querySelector('#menuToggle');
const mobileNav = document.querySelector('#mobileNav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const heroMedia = document.querySelector('.hero-media');

window.addEventListener(
  'scroll',
  () => {
    if (!heroMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    heroMedia.style.transform = `scale(${1.03 + progress * 0.025}) translateY(${progress * 2}%)`;
  },
  { passive: true }
);
