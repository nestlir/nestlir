import { PLACES } from '../entities/place/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderExplore(root, application, navigate) {
  root.replaceChildren();
  let selectedId = application.getState().places[0] || PLACES[0].id;

  const render = () => {
    const place = PLACES.find((item) => item.id === selectedId) || PLACES[0];
    const state = application.getState();
    const selected = state.places.includes(place.id);
    const summary = getTripSummary(state);

    root.innerHTML = `
      <section class="page-intro section-light"><div class="container section-grid"><p class="section-label">EXPLORE / KYOTO</p><div><h1>Find your<br><em>slow route.</em></h1><p class="lede">Select a place. Read its story. Add it to your day.</p></div></div></section>
      <section class="explore-shell section-light"><div class="container explore-grid">
        <div class="map-panel"><div class="map-canvas">
          ${PLACES.map((item, index) => `<button class="map-pin ${item.id === place.id ? 'active' : ''}" data-select="${item.id}" style="--x:${[67,53,42,61][index]}%;--y:${[28,55,72,46][index]}%" type="button"><span>0${index + 1}</span></button>`).join('')}
          <div class="map-route-line"></div><p class="map-note">A slower way of finding your way.</p>
        </div></div>
        <aside class="place-panel"><p class="section-label">${place.type}</p><div class="place-panel-image"><img src="${place.image}" alt="${place.name}"></div><p class="micro">${place.time} / ${place.area}</p><h2>${place.name}</h2><p>${place.description}</p><div class="meta-row"><span>${place.duration}</span><span>${place.price ? `¥${place.price.toLocaleString('en-US')}` : 'FREE'}</span><span>${place.distance} km</span></div><button class="text-link" type="button" data-toggle>${selected ? 'Remove from My Day −' : 'Add to My Day +'}</button><button class="text-link muted" type="button" data-open-place="${place.id}">Read place detail ↗</button></aside>
      </div></section>
      <section class="section-dark explore-summary"><div class="container summary-grid"><span>MY DAY</span><strong>${summary.stops}</strong><span>stops</span><strong>${summary.distance.toFixed(1)}</strong><span>km on foot</span><button class="text-link light" data-go="trip" type="button">Open My Trip ↗</button></div></section>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-select],[data-toggle],[data-go],[data-open-place]');
    if (!target) return;
    if (target.dataset.select) { selectedId = target.dataset.select; render(); return; }
    if (target.dataset.toggle !== undefined) { application.togglePlace(selectedId); return; }
    if (target.dataset.openPlace) { navigate(`place/${target.dataset.openPlace}`); return; }
    if (target.dataset.go) navigate(target.dataset.go);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
