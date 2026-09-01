const places = [
  { id: 'fushimi', type: 'Walk', name: 'Fushimi Inari', area: 'Fushimi', time: '07:10', duration: '01h40m', price: 0, distance: 3.2, image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1400&q=85', description: 'Begin beneath the vermilion gates before the city wakes.' },
  { id: 'higashiyama', type: 'Walk', name: 'Higashiyama', area: 'Higashiyama', time: '09:20', duration: '01h50m', price: 0, distance: 2.8, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85', description: 'Quiet lanes, wooden facades and small courtyards above the old city.' },
  { id: 'nishiki', type: 'Food', name: 'Nishiki Market', area: 'Central Kyoto', time: '12:30', duration: '01h20m', price: 1800, distance: 2.1, image: 'https://images.unsplash.com/photo-1558180071-9f8e0f2e7b9a?auto=format&fit=crop&w=1400&q=85', description: 'A compact market for tasting, wandering and stopping often.' },
  { id: 'gion', type: 'Ritual', name: 'Gion', area: 'Gion', time: '18:42', duration: '01h40m', price: 0, distance: 3.1, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85', description: 'Arrive when the lanterns begin to carry the evening.' }
];

const foods = [
  { id: 'kamo-breakfast', type: 'Morning', name: 'Breakfast by the Kamo', place: 'Kamo River', price: 1400, duration: '00h45m', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85', description: 'A simple breakfast to take slowly beside the river.' },
  { id: 'bowl-rain', type: 'Dinner', name: 'A bowl after rain', place: 'Gion', price: 1800, duration: '00h50m', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=1200&q=85', description: 'Warm noodles and a quiet counter after a long walk.' },
  { id: 'matcha-shade', type: 'Tea', name: 'Matcha, in the shade', place: 'Higashiyama', price: 1200, duration: '00h40m', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=85', description: 'Matcha and a small sweet in a garden-facing tea room.' }
];

const STORAGE_KEY = 'nomad-v3-trip';
const defaults = { places: ['fushimi', 'higashiyama', 'nishiki', 'gion'], food: [], saved: false };
let state = loadState();
let selectedPlaceId = state.places[0] || places[0].id;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const app = document.querySelector('#app');

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!parsed || !Array.isArray(parsed.places) || !Array.isArray(parsed.food) || typeof parsed.saved !== 'boolean') return cloneDefaults();
    return {
      places: [...new Set(parsed.places)].filter((id) => places.some((item) => item.id === id)),
      food: [...new Set(parsed.food)].filter((id) => foods.some((item) => item.id === id)),
      saved: parsed.saved
    };
  } catch {
    return cloneDefaults();
  }
}

function cloneDefaults() {
  return { places: [...defaults.places], food: [], saved: false };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getPlace(id) { return places.find((item) => item.id === id); }
function getFood(id) { return foods.find((item) => item.id === id); }

function togglePlace(id) {
  if (!getPlace(id)) return;
  const exists = state.places.includes(id);
  state.places = exists ? state.places.filter((item) => item !== id) : [...state.places, id];
  selectedPlaceId = id;
  saveState();
  render();
}

function toggleFood(id) {
  if (!getFood(id)) return;
  state.food = state.food.includes(id) ? state.food.filter((item) => item !== id) : [...state.food, id];
  saveState();
  render();
}

function summary() {
  const selectedPlaces = state.places.map(getPlace).filter(Boolean);
  const selectedFood = state.food.map(getFood).filter(Boolean);
  return {
    stops: selectedPlaces.length + selectedFood.length,
    distance: selectedPlaces.reduce((sum, item) => sum + item.distance, 0),
    spend: selectedPlaces.reduce((sum, item) => sum + item.price, 0) + selectedFood.reduce((sum, item) => sum + item.price, 0)
  };
}

function render() {
  const s = summary();
  app.innerHTML = `
    <header class="header">
      <a class="logo" href="#top">NOMAD</a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#archive">Archive</a>
        <a href="#explore">Explore</a>
        <a href="#eat">Eat</a>
        <a href="#trip">My Trip <sup>${s.stops}</sup></a>
      </nav>
      <button class="menu-button" id="menuButton" type="button" aria-expanded="false">Menu</button>
    </header>

    <main>
      <section class="hero" id="top">
        <div class="hero-image"></div><div class="hero-overlay"></div>
        <div class="hero-copy">
          <p class="eyebrow">A FIELD GUIDE TO QUIETER PLACES</p>
          <h1>KYOTO</h1>
          <p>The art of slowing down.</p>
          <a class="hero-link" href="#archive">Enter the archive <span>↘</span></a>
        </div>
        <div class="hero-meta"><span>35.0116° N</span><span>135.7681° E</span><span>VOL. 01 / 2026</span></div>
      </section>

      <section class="archive" id="archive">
        <div class="section-head"><span>01 — ARCHIVE</span><div><h2>A city,<br><em>observed slowly.</em></h2><p>Routes, rituals and places for days with nowhere else to be.</p></div></div>
        <div class="archive-grid">
          ${places.map((place, index) => `
            <article class="archive-card ${index % 2 ? 'offset' : ''}">
              <button class="archive-image-button" type="button" data-open-place="${place.id}" aria-label="Open ${place.name}">
                <img src="${place.image}" alt="${place.name}" loading="lazy">
              </button>
              <div class="caption"><span>0${index + 1}</span><div><h3>${place.name}</h3><p>${place.type} / ${place.area} / ${place.time}</p></div><button class="save-button" type="button" data-toggle-place="${place.id}" aria-pressed="${state.places.includes(place.id)}">${state.places.includes(place.id) ? 'Saved' : 'Add'}</button></div>
            </article>`).join('')}
        </div>
      </section>

      <section class="explore" id="explore">
        <div class="map-area">
          <div class="section-head map-head"><span>02 — EXPLORE</span><div><h2>Find your<br><em>slow route.</em></h2><p>Choose a place from the map and keep it in your day.</p></div></div>
          <div class="map-canvas">
            <div class="map-route"></div>
            ${places.map((place, index) => `<button class="pin ${selectedPlaceId === place.id ? 'active' : ''}" style="--x:${[67,53,42,61][index]}%;--y:${[28,55,72,46][index]}%" type="button" data-select-place="${place.id}" aria-label="Select ${place.name}"><span>0${index + 1}</span></button>`).join('')}
            <p class="map-note">Not a navigation map.<br>A slower way of finding your way.</p>
          </div>
        </div>
        <aside class="place-detail" id="placeDetail"></aside>
      </section>

      <section class="eat" id="eat">
        <div class="eat-copy"><span>03 — EAT KYOTO</span><h2>Taste the city<br><em>without hurry.</em></h2><p>Small breakfasts, quiet tea rooms and bowls after rain.</p></div>
        <div class="food-list">${foods.map((item) => `<button class="food-row ${state.food.includes(item.id) ? 'active' : ''}" type="button" data-toggle-food="${item.id}"><span>${item.type}</span><div><strong>${item.name}</strong><small>${item.place} / ¥${item.price.toLocaleString('en-US')}</small></div><b>${state.food.includes(item.id) ? 'Saved' : 'Add'}</b></button>`).join('')}</div>
      </section>

      <section class="trip" id="trip">
        <div class="trip-head"><span>04 — MY TRIP</span><div><h2>Leave room<br><em>for the in-between.</em></h2><button id="saveTrip" class="line-button inverse" type="button">${state.saved ? 'Trip saved ♥' : 'Save trip ♡'}</button></div><div class="weather"><span>KYOTO / TODAY</span><strong>32°</strong><small>Mostly cloudy</small></div></div>
        <div class="trip-grid"><div class="itinerary"><div class="day-head"><span>DAY 01</span><strong>${s.stops} stops</strong></div>${state.places.map((id) => { const p = getPlace(id); return p ? `<article><span>${p.time}</span><div><h3>${p.name}</h3><p>${p.area} / ${p.duration}</p></div><button type="button" data-toggle-place="${p.id}" aria-label="Remove ${p.name}">×</button></article>` : ''; }).join('')}${state.food.map((id) => { const f = getFood(id); return f ? `<article><span>—</span><div><h3>${f.name}</h3><p>${f.type} / ${f.place}</p></div><button type="button" data-toggle-food="${f.id}" aria-label="Remove ${f.name}">×</button>` : ''; }).join('')}</div><div class="summary"><div><strong>${s.distance.toFixed(1)}</strong><span>km on foot</span></div><div><strong>¥${s.spend.toLocaleString('en-US')}</strong><span>planned spend</span></div><div><strong>${s.stops}</strong><span>total stops</span></div></div></div>
      </section>
    </main>
    <div class="drawer" id="drawer" aria-hidden="true"><button class="drawer-close" id="drawerClose" type="button">Close ×</button><div class="drawer-image" id="drawerImage"></div><div class="drawer-copy"><span id="drawerType"></span><h2 id="drawerName"></h2><p id="drawerText"></p><button class="line-button" id="drawerAction" type="button"></button></div></div>
  `;
  wire();
  renderPlaceDetail(selectedPlaceId);
}

function renderPlaceDetail(id) {
  const p = getPlace(id) || places[0];
  selectedPlaceId = p.id;
  const panel = document.querySelector('#placeDetail');
  if (!panel) return;
  panel.innerHTML = `<span class="panel-kicker">SELECTED PLACE</span><div class="detail-image" style="background-image:url('${p.image}')"></div><span class="panel-type">${p.type}</span><h3>${p.name}</h3><p>${p.description}</p><div class="detail-meta"><span>${p.time}</span><span>${p.area}</span><span>${p.duration}</span></div><button class="line-button inverse" type="button" data-toggle-place="${p.id}">${state.places.includes(p.id) ? 'Remove from My Day −' : 'Add to My Day +'}</button>`;
  const pinButtons = document.querySelectorAll('[data-select-place]');
  pinButtons.forEach((pin) => pin.classList.toggle('active', pin.dataset.selectPlace === p.id));
}

function openDrawer(id) {
  const p = getPlace(id); if (!p) return;
  const drawer = document.querySelector('#drawer');
  document.querySelector('#drawerImage').style.backgroundImage = `url('${p.image}')`;
  document.querySelector('#drawerType').textContent = p.type;
  document.querySelector('#drawerName').textContent = p.name;
  document.querySelector('#drawerText').textContent = p.description;
  const action = document.querySelector('#drawerAction');
  action.textContent = state.places.includes(p.id) ? 'Remove from My Day −' : 'Add to My Day +';
  action.onclick = () => { togglePlace(p.id); closeDrawer(); };
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  const drawer = document.querySelector('#drawer');
  drawer?.classList.remove('open');
  drawer?.setAttribute('aria-hidden', 'true');
}

function wire() {
  document.querySelectorAll('[data-toggle-place]').forEach((button) => button.addEventListener('click', () => togglePlace(button.dataset.togglePlace)));
  document.querySelectorAll('[data-toggle-food]').forEach((button) => button.addEventListener('click', () => toggleFood(button.dataset.toggleFood)));
  document.querySelectorAll('[data-select-place]').forEach((button) => button.addEventListener('click', () => { selectedPlaceId = button.dataset.selectPlace; renderPlaceDetail(selectedPlaceId); }));
  document.querySelectorAll('[data-open-place]').forEach((button) => button.addEventListener('click', () => openDrawer(button.dataset.openPlace)));
  document.querySelector('#saveTrip')?.addEventListener('click', () => { state.saved = !state.saved; saveState(); render(); });
  document.querySelector('#drawerClose')?.addEventListener('click', closeDrawer);
  document.querySelector('#menuButton')?.addEventListener('click', () => {
    const nav = document.querySelector('.desktop-nav');
    const open = nav?.classList.toggle('open');
    document.querySelector('#menuButton')?.setAttribute('aria-expanded', String(Boolean(open)));
  });
  document.querySelectorAll('.desktop-nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.desktop-nav')?.classList.remove('open')));
}

if (!reduceMotion) {
  window.addEventListener('scroll', () => {
    const photo = document.querySelector('.hero-image');
    if (photo) photo.style.transform = `scale(1.03) translateY(${Math.min(window.scrollY / 180, 2)}%)`;
  }, { passive: true });
}

render();
