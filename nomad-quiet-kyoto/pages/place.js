import { findPlace } from '../entities/place/model.js';

export function renderPlace(root, application, id, navigate) {
  const place = findPlace(id);
  root.replaceChildren();

  if (!place) {
    root.innerHTML = `<section class="not-found section-light"><div class="container"><p class="section-label">404</p><h1>Place not found.</h1><button class="text-link" type="button" data-route="explore">Back to Explore ↗</button></div></section>`;
    const onMissing = (event) => {
      const target = event.target.closest('[data-route]');
      if (target) navigate(target.dataset.route);
    };
    root.addEventListener('click', onMissing);
    return () => root.removeEventListener('click', onMissing);
  }

  const render = () => {
    const saved = application.getState().places.includes(place.id);
    root.innerHTML = `
      <section class="place-hero section-light"><div class="place-hero-image"><img src="${place.image}" alt="${place.name}"></div><div class="container place-hero-copy"><button class="back-link" type="button" data-route="explore">← Explore</button><p class="section-label">${place.type} / ${place.area}</p><h1>${place.name}</h1><p>${place.description}</p><div class="meta-row"><span>${place.time}</span><span>${place.duration}</span><span>${place.price?`¥${place.price.toLocaleString('en-US')}`:'FREE'}</span></div><button class="text-link" type="button" data-toggle>${saved?'Remove from My Day −':'Add to My Day +'}</button><button class="text-link" type="button" data-route="trip">See My Trip ↗</button></div></section>
      <section class="place-story section-light"><div class="container section-grid"><p class="section-label">THE SLOW DETAIL</p><div><h2>Stay a little<br><em>longer.</em></h2><p class="lede">Come early, move without a checklist and leave time for the spaces between the famous places. NOMAD treats a destination as a rhythm, not a queue.</p></div></div></section>
      <section class="place-actions section-dark"><div class="container section-grid"><p class="section-label">NEXT</p><div><h2>Keep<br><em>walking.</em></h2><button class="text-link light" type="button" data-route="explore">Choose another place ↗</button></div></div></section>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-route],[data-toggle]');
    if (!target) return;
    if (target.dataset.route) navigate(target.dataset.route);
    else application.togglePlace(place.id);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
