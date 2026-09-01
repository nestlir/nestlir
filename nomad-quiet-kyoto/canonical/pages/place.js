import { getPlace } from '../entities/place/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderPlaceDetail(root, application, id, navigate) {
  const place = getPlace(id);
  if (!place) {
    root.innerHTML = `<section class="not-found page-intro"><div class="container"><p class="section-label">404</p><h1>Place not found.</h1><button class="text-link" type="button" data-go="explore">Back to Explore ↗</button></div></section>`;
    const onMissingClick = (event) => { const target = event.target.closest('[data-go]'); if (target) navigate(target.dataset.go); };
    root.addEventListener('click', onMissingClick);
    return () => root.removeEventListener('click', onMissingClick);
  }

  const render = () => {
    const state = application.getState();
    const selected = state.places.includes(place.id);
    const related = getTripSummary(state).places.filter((item) => item.id !== place.id).slice(0, 2);
    root.innerHTML = `
      <section class="place-hero section-light"><div class="place-hero-image"><img src="${place.image}" alt="${place.name}"></div><div class="container place-hero-copy"><button class="back-link" type="button" data-go="explore">← Explore</button><p class="section-label">${place.type} / ${place.area}</p><h1>${place.name}</h1><p>${place.description}</p><div class="meta-row"><span>${place.time}</span><span>${place.duration}</span><span>${place.price ? `¥${place.price.toLocaleString('en-US')}` : 'FREE'}</span></div><button class="text-link" type="button" data-toggle>${selected ? 'Remove from My Day −' : 'Add to My Day +'}</button></div></section>
      <section class="place-story section-light"><div class="container two-column"><div><p class="section-label">THE SLOW DETAIL</p><h2>Stay a little<br><em>longer.</em></h2></div><div><p>Come early, move without a checklist and leave time for the spaces between the famous places. NOMAD treats a destination as a rhythm, not a queue.</p><button class="text-link" type="button" data-go="trip">See My Trip ↗</button></div></div></section>
      <section class="related section-light"><div class="container"><div class="section-grid"><p class="section-label">NEARBY</p><div><h2>Keep walking.</h2><div class="related-grid">${related.map((item) => `<button class="related-card" type="button" data-place="${item.id}"><img src="${item.image}" alt="${item.name}" loading="lazy"><strong>${item.name}</strong><span>${item.area}</span></button>`).join('')}</div></div></div></div></section>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-go],[data-toggle],[data-place]');
    if (!target) return;
    if (target.dataset.go) navigate(target.dataset.go);
    else if (target.dataset.toggle !== undefined) application.togglePlace(place.id);
    else navigate(`place/${target.dataset.place}`);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
