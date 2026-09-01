import { getTripSummary } from '../shared/lib/trip-summary.js';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export function renderTrip(root, application, navigate) {
  root.replaceChildren();
  root.innerHTML = `
    <section class="page-intro section-dark">
      <div class="container section-grid">
        <p class="section-label">04 — MY TRIP</p>
        <div>
          <h1>Keep the day<br><em>light.</em></h1>
          <p class="lede">A quiet itinerary assembled from places and food worth staying with a little longer.</p>
          <button class="text-link light" type="button" data-save data-save-label></button>
        </div>
      </div>
    </section>
    <section class="trip-page section-dark">
      <div class="container trip-page-grid">
        <div class="trip-list">
          <div class="trip-toolbar"><span>DAY 01</span><span data-trip-count>0 stops</span></div>
          <div data-trip-list></div>
        </div>
        <aside class="trip-summary" data-trip-summary></aside>
      </div>
    </section>
    <section class="weather-section section-light">
      <div class="container weather-grid">
        <div>
          <p class="section-label">KYOTO / TODAY</p>
          <h2>32°</h2>
          <p>Mostly cloudy. Early morning remains the quietest walking window.</p>
        </div>
        <div>
          <span>05:29</span><small>sunrise</small>
          <span>18:24</span><small>sunset</small>
        </div>
      </div>
    </section>
  `;

  const saveButton = root.querySelector('[data-save]');
  const countNode = root.querySelector('[data-trip-count]');
  const listNode = root.querySelector('[data-trip-list]');
  const summaryNode = root.querySelector('[data-trip-summary]');

  const render = () => {
    const state = application.getState();
    const summary = getTripSummary(state);

    saveButton.textContent = state.saved ? 'Trip saved ♥' : 'Save this trip ♡';
    saveButton.setAttribute('aria-pressed', String(state.saved));
    countNode.textContent = `${summary.stops} ${summary.stops === 1 ? 'stop' : 'stops'}`;

    const placeRows = summary.places.map((place) => `
      <article>
        <span>${escapeHtml(place.time)}</span>
        <div><h2>${escapeHtml(place.name)}</h2><p>${escapeHtml(place.area)} / ${escapeHtml(place.duration)}</p></div>
        <button type="button" data-remove-place="${escapeHtml(place.id)}" aria-label="Remove ${escapeHtml(place.name)}">×</button>
      </article>
    `);

    const foodRows = summary.food.map((item) => `
      <article>
        <span>—</span>
        <div><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.place)} / ${escapeHtml(item.type)}</p></div>
        <button type="button" data-remove-food="${escapeHtml(item.id)}" aria-label="Remove ${escapeHtml(item.name)}">×</button>
      </article>
    `);

    listNode.innerHTML = [...placeRows, ...foodRows].join('') || `
      <div class="empty-state">
        <p>Your day is still open.</p>
        <p>Choose a place from Explore or something to eat from Eat.</p>
        <div class="empty-actions">
          <button class="text-link light" type="button" data-route="explore">Explore Kyoto ↗</button>
          <button class="text-link light" type="button" data-route="eat">Explore food ↗</button>
        </div>
      </div>
    `;

    summaryNode.innerHTML = `
      <div><strong>${summary.stops}</strong><span>stops</span></div>
      <div><strong>${summary.distance.toFixed(1)}</strong><span>km on foot</span></div>
      <div><strong>¥${summary.spend.toLocaleString('en-US')}</strong><span>planned spend</span></div>
      <button class="text-link light" type="button" data-route="explore">Add a place ↗</button>
      <button class="text-link light" type="button" data-route="eat">Add something to eat ↗</button>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-save],[data-remove-place],[data-remove-food],[data-route]');
    if (!target) return;

    if (target.dataset.save !== undefined) application.toggleSaved();
    else if (target.dataset.removePlace) application.togglePlace(target.dataset.removePlace);
    else if (target.dataset.removeFood) application.toggleFood(target.dataset.removeFood);
    else if (target.dataset.route) navigate(target.dataset.route);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();

  return () => {
    unsubscribe();
    root.removeEventListener('click', onClick);
  };
}
