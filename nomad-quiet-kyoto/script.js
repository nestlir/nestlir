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
const filters = document.querySelectorAll('.filter');
const archiveItems = document.querySelectorAll('.archive-item');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((button) => button.classList.remove('is-active'));
    filter.classList.add('is-active');

    const selectedType = filter.dataset.filter;
    archiveItems.forEach((item) => {
      const matches = selectedType === 'all' || item.dataset.type === selectedType;
      item.classList.toggle('is-hidden', !matches);
    });
  });
});

window.addEventListener(
  'scroll',
  () => {
    if (!heroMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    heroMedia.style.transform = `scale(${1.03 + progress * 0.025}) translateY(${progress * 2}%)`;
  },
  { passive: true }
);
