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
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
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
filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((button) => button.classList.remove('is-active'));
  filter.classList.add('is-active');
  const selectedType = filter.dataset.filter;
  archiveItems.forEach((item) => {
    const visible = selectedType === 'all' || item.dataset.type === selectedType;
    item.classList.toggle('is-hidden', !visible);
  });
}));

const defaultStops = [
  { id: 'fushimi', name: 'Fushimi Inari', time: '07:10', detail: 'shrine path', duration: 80, distance: 2.8 },
  { id: 'higashiyama', name: 'Higashiyama', time: '09:20', detail: 'quiet streets', duration: 120, distance: 2.1 },
  { id: 'nishiki', name: 'Nishiki Market', time: '12:30', detail: 'market lunch', duration: 90, distance: 1.9 },
  { id: 'gion', name: 'Gion', time: '18:42', detail: 'lantern hour', duration: 120, distance: 4.4 },
];

const libraryPlaces = {
  coffee: { id: 'coffee', name: 'Riverside coffee', time: '09:45', detail: 'Kamo / coffee break', duration: 45, distance: 0.8 },
  market: { id: 'market', name: 'Nishiki market', time: '12:30', detail: 'central Kyoto / lunch', duration: 90, distance: 1.9 },
  tea: { id: 'tea', name: 'Tea house', time: '14:05', detail: 'Higashiyama / tea', duration: 60, distance: 1.1 },
};

const routePlan = document.querySelector('#routePlan');
const routeTime = document.querySelector('#routeTime');
const routeCount = document.querySelector('#routeCount');
const routeDuration = document.querySelector('#routeDuration');
const routeDistance = document.querySelector('#routeDistance');
const tripStops = document.querySelector('#tripStops');
const tripDistance = document.querySelector('#tripDistance');

let itinerary = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('nomad-itinerary') || 'null');
    return Array.isArray(saved) && saved.length ? saved : defaultStops;
  } catch {
    return defaultStops;
  }
})();

function saveItinerary() {
  localStorage.setItem('nomad-itinerary', JSON.stringify(itinerary));
}

function renderItinerary() {
  if (!routePlan) return;
  routePlan.innerHTML = '';
  itinerary.forEach((stop, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `route-stop${index === 0 ? ' is-active' : ''}`;
    button.dataset.time = stop.time;
    button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><div><strong>${stop.name}</strong><small>${stop.time} / ${stop.detail}</small></div><em aria-hidden="true">×</em>`;
    button.addEventListener('click', () => {
      routePlan.querySelectorAll('.route-stop').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      if (routeTime) routeTime.textContent = stop.time;
    });
    button.querySelector('em')?.addEventListener('click', (event) => {
      event.stopPropagation();
      itinerary = itinerary.filter((item) => item.id !== stop.id);
      saveItinerary();
      renderItinerary();
    });
    routePlan.appendChild(button);
  });

  const totalDuration = itinerary.reduce((sum, stop) => sum + stop.duration, 0);
  const totalDistance = itinerary.reduce((sum, stop) => sum + stop.distance, 0);
  if (routeDuration) routeDuration.textContent = `${String(Math.floor(totalDuration / 60)).padStart(2, '0')}h ${String(totalDuration % 60).padStart(2, '0')}m`;
  if (routeDistance) routeDistance.textContent = `${totalDistance.toFixed(1)} km`;
  if (tripStops) tripStops.textContent = String(itinerary.length);
  if (tripDistance) tripDistance.textContent = `${totalDistance.toFixed(1)} km`;
  if (routeCount) routeCount.textContent = `${itinerary.length} ${itinerary.length === 1 ? 'stop' : 'stops'}`;
}

renderItinerary();

document.querySelectorAll('.library-stop').forEach((button) => {
  button.addEventListener('click', () => {
    const place = libraryPlaces[button.dataset.place];
    if (!place || itinerary.some((item) => item.id === place.id)) return;
    itinerary.push(place);
    saveItinerary();
    renderItinerary();
    button.classList.add('is-added');
    button.querySelector('span').textContent = '✓';
  });
});

const saveRoute = document.querySelector('#saveRoute');
saveRoute?.addEventListener('click', () => {
  const saved = saveRoute.classList.toggle('saved');
  const icon = saveRoute.querySelector('span');
  if (icon) icon.textContent = saved ? '♥' : '♡';
  saveRoute.childNodes[0].textContent = saved ? 'Route saved ' : 'Save route ';
  saveRoute.setAttribute('aria-pressed', String(saved));
  localStorage.setItem('nomad-route-saved', String(saved));
});

if (saveRoute && localStorage.getItem('nomad-route-saved') === 'true') {
  saveRoute.classList.add('saved');
  const icon = saveRoute.querySelector('span');
  if (icon) icon.textContent = '♥';
  saveRoute.childNodes[0].textContent = 'Route saved ';
  saveRoute.setAttribute('aria-pressed', 'true');
}
