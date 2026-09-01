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

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

if (reducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  revealItems.forEach((item) => revealObserver.observe(item));
}

const heroMedia = document.querySelector('.hero-media');
if (heroMedia && !reducedMotion.matches) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      heroMedia.style.transform = `scale(${1.03 + progress * 0.025}) translateY(${progress * 2}%)`;
      ticking = false;
    });
  }, { passive: true });
}

const filters = document.querySelectorAll('.filter');
const archiveItems = document.querySelectorAll('.archive-item');
filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((button) => button.classList.remove('is-active'));
    filter.classList.add('is-active');
    const selectedType = filter.dataset.filter;
    archiveItems.forEach((item) => {
      const visible = selectedType === 'all' || item.dataset.type === selectedType;
      item.classList.toggle('is-hidden', !visible);
    });
  });
});

const routeStops = document.querySelectorAll('.route-stop');
const routeTime = document.querySelector('#routeTime');
const routeIndex = document.querySelector('.route-side > span:last-child');
routeStops.forEach((stop, index) => {
  stop.addEventListener('click', () => {
    routeStops.forEach((item) => item.classList.remove('is-active'));
    stop.classList.add('is-active');
    if (routeTime) routeTime.textContent = stop.dataset.time || '';
    if (routeIndex) routeIndex.textContent = `${String(index + 1).padStart(2, '0')} / ${String(routeStops.length).padStart(2, '0')}`;
  });
});

const saveRoute = document.querySelector('#saveRoute');
saveRoute?.addEventListener('click', () => {
  const saved = saveRoute.classList.toggle('saved');
  saveRoute.querySelector('span').textContent = saved ? '♥' : '♡';
  saveRoute.firstChild.textContent = saved ? 'Route saved ' : 'Save route ';
});
