import { PLACES } from '../entities/place/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

const MAP_POSITIONS = Object.freeze({
  fushimi: { x: 67, y: 28 },
  higashiyama: { x: 53, y: 55 },
  nishiki: { x: 42, y: 72 },
  gion: { x: 61, y: 46 },
});

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export function renderExplore(root, application, navigate) {
  root.replaceChildren();
  let selectedId = application.getState().places[0] || PLACES[0].id;

  root.innerHTML = `
    <section class="page-intro section-light">
      <div class="container section-grid">
        <p class="section-label">EXPLORE / KYOTO</p>
        <div>
          <h1>Find your<br><em>slow route.</em></h1>
          <p class="lede">Select a place from the map, read its story, and add it to your day.</p>
        </div>
      </div>
    </section>
    <section class="explore-shell section-light">
      <div class="container explore-grid">
        <div class="map-panel">
          <div class="map-canvas" data-map>
            ${PLACES.slice(0, 4).map((item, index) => {
              const position = MAP_POSITIONS[item.id] || { x: 50, y: 50 };
              return `<button class="map-pin" type="button" data-select="${escapeHtml(item.id)}" style="--x:${position.x}%;--y:${position.y}%;" aria-label="Select ${escapeHtml(item.name)}"><span>0${index + 1}</span></button>`;
            }).join('')}
            <div class="map-route-line" aria-hidden="true"></div>
            <p class="map-note">A slower way of finding your way.</p>
          </div>
        </div>
        <aside class="place-panel" data-place-panel aria-live="polite"></aside>
      </div>
    </section>
    <section class="section-dark explore-summary">
      <div class="container summary-grid" data-summary></div>
    </section>
  `;

  const placePanel = root.querySelector('[data-place-panel]');
  const summaryPanel = root.querySelector('[data-summary]');
  const pins = [...root.querySelectorAll('[data-select]')];

  const renderPlace = () => {
    const state = application.getState();
    const place = PLACES.find((item) => item.id === selectedId) || PLACES[0];
    const saved = state.places.includes(place.id);
    const position = MAP_POSITIONS[place.id] || { x: 50, y: 50 };

    pins.forEach((pin) => {
      pin.classList.toggle('active', pin.dataset.select === place.id);
      pin.setAttribute('aria-pressed', String(pin.dataset.select === place.id));
    });

    placePanel.innerHTML = `
      <p class="section-label">${escapeHtml(place.type)}</p>
      <div class="place-panel-image">
        <img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" loading="eager" decoding="async">
      </div>
      <p class="micro">${escapeHtml(place.time)} / ${escapeHtml(place.area)}</p>
      <h2>${escapeHtml(place.name)}</h2>
      <p>${escapeHtml(place.description)}</p>
      <div class="meta-row">
        <span>${escapeHtml(place.duration)}</span>
        <span>${place.price ? `¥${place.price.toLocaleString('en-US')}` : 'FREE'}</span>
        <span>${escapeHtml(place.distance)} km</span>
      </div>
      <div class="place-actions">
        <button class="text-link" type="button" data-toggle>${saved ? 'Remove from My Day −' : 'Add to My Day +'}</button>
        <button class="text-link" type="button" data-place-detail="${escapeHtml(place.id)}">Read place detail ↗</button>
      </div>
    `;

    const summary = getTripSummary(state);
    summaryPanel.innerHTML = `
      <span>MY DAY</span>
      <strong>${summary.stops}</strong>
      <span>stops</span>
      <strong>${summary.distance.toFixed(1)}</strong>
      <span>km on foot</span>
      <button class="text-link light" type="button" data-route="trip">Open My Trip ↗</button>
    `;

    return position;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-select],[data-toggle],[data-place-detail],[data-route]');
    if (!target) return;

    if (target.dataset.select) {
      selectedId = target.dataset.select;
      renderPlace();
      return;
    }

    if (target.dataset.toggle !== undefined) {
      application.togglePlace(selectedId);
      return;
    }

    if (target.dataset.placeDetail) {
      navigate('place', { id: target.dataset.placeDetail });
      return;
    }

    if (target.dataset.route) navigate(target.dataset.route);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(renderPlace);
  renderPlace();

  return () => {
    unsubscribe();
    root.removeEventListener('click', onClick);
  };
}
