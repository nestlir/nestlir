import { PLACES } from '../entities/place/model.js';
import { FOODS } from '../entities/food/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderTrip(root, application, navigate) {
  root.replaceChildren();

  const render = () => {
    const state = application.getState();
    const summary = getTripSummary(state);
    const placeRows = state.places.map((id) => PLACES.find((item) => item.id === id)).filter(Boolean);
    const foodRows = state.food.map((id) => FOODS.find((item) => item.id === id)).filter(Boolean);

    root.innerHTML = `
      <section class="page-intro section-dark"><div class="container section-grid"><p class="section-label">04 — MY TRIP</p><div><h1>Three days,<br><em>at your own pace.</em></h1><p class="lede">A quiet itinerary assembled from places and food worth staying with a little longer.</p><button class="text-link light" type="button" data-save>${state.saved ? 'Trip saved ♥' : 'Save this trip ♡'}</button></div></div></section>
      <section class="trip-page section-dark"><div class="container trip-page-grid"><div class="trip-list"><div class="trip-toolbar"><span>DAY 01</span><span>${summary.stops} stops</span></div>${placeRows.map((place) => `<article><span>${place.time}</span><div><h2>${place.name}</h2><p>${place.area} / ${place.duration}</p></div><button type="button" data-remove-place="${place.id}" aria-label="Remove ${place.name}">×</button></article>`).join('')}${foodRows.map((item) => `<article><span>—</span><div><h2>${item.name}</h2><p>${item.place} / ${item.type}</p></div><button type="button" data-remove-food="${item.id}" aria-label="Remove ${item.name}">×</button>`).join('')}${summary.stops === 0 ? '<p class="empty-state">Your day is open. Explore Kyoto and add a place.</p>' : ''}</div><aside class="trip-summary"><div><strong>${summary.stops}</strong><span>stops</span></div><div><strong>${summary.distance.toFixed(1)}</strong><span>km on foot</span></div><div><strong>¥${summary.spend.toLocaleString('en-US')}</strong><span>planned spend</span></div><button class="text-link light" type="button" data-go="explore">Add a place ↗</button><button class="text-link light" type="button" data-go="eat">Add something to eat ↗</button></aside></div></section>
      <section class="weather-section section-light"><div class="container weather-grid"><div><p class="section-label">KYOTO / TODAY</p><h2>32°</h2><p>Mostly cloudy. The quietest walking window is early morning.</p></div><div><span>05:29</span><small>sunrise</small><span>18:24</span><small>sunset</small></div></div></section>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-save],[data-remove-place],[data-remove-food],[data-go]');
    if (!target) return;
    if (target.dataset.save !== undefined) application.toggleSaved();
    else if (target.dataset.removePlace) application.togglePlace(target.dataset.removePlace);
    else if (target.dataset.removeFood) application.toggleFood(target.dataset.removeFood);
    else if (target.dataset.go) navigate(target.dataset.go);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
