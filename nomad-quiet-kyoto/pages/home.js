import { PLACES } from '../entities/place/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderHome(root, application, navigate) {
  root.replaceChildren();
  root.innerHTML = `
    <section class="hero">
      <div class="hero-photo" aria-hidden="true"></div>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-content container">
        <p class="eyebrow">A FIELD GUIDE TO QUIETER PLACES</p>
        <h1>KYOTO</h1>
        <p class="hero-deck">The art of slowing down.</p>
        <button class="text-link" type="button" data-route="explore">Enter the archive <span>↘</span></button>
      </div>
      <div class="hero-coordinates"><span>35.0116° N</span><span>135.7681° E</span><span>VOL. 01 / 2026</span></div>
    </section>
    <section class="archive section-light" id="archive">
      <div class="container section-grid"><p class="section-label">01 — ARCHIVE</p><div><h2>A city,<br><em>observed slowly.</em></h2><p class="lede">Routes, rituals, food and places for days with nowhere else to be.</p></div></div>
      <div class="container archive-grid">
        ${PLACES.slice(0,4).map((place,index)=>`<article class="archive-card"><button class="image-frame" type="button" data-place="${place.id}" aria-label="Open ${place.name}"><img src="${place.image}" alt="${place.name}" loading="lazy"></button><div class="caption"><span>0${index+1}</span><div><h3>${place.name}</h3><p>${place.type} / ${place.area} / ${place.time}</p></div><button class="save-link" type="button" data-toggle-place="${place.id}"></button></div></article>`).join('')}
      </div>
    </section>
    <section class="journal section-light"><div class="journal-media"><img src="${PLACES[1].image}" alt="Kyoto morning street" loading="lazy"></div><div class="journal-copy"><p class="section-label">02 — JOURNAL</p><p class="micro">07:03 / THE MORNING ROUTE</p><h2>Begin where<br><em>the city is quiet.</em></h2><p>Walk east before the shops open. Follow the river. Let the first train pass. Kyoto reveals itself in the spaces between destinations.</p><button class="text-link" type="button" data-route="explore">Build this route <span>↗</span></button></div></section>
    <section class="home-trip section-dark"><div class="container section-grid"><p class="section-label">03 — MY TRIP</p><div><h2>Leave room<br><em>for the in-between.</em></h2><div id="home-trip-stats"></div><button class="text-link light" type="button" data-route="trip">Open My Trip ↗</button></div></div></section>
  `;

  const render = () => {
    const state = application.getState();
    const summary = getTripSummary(state);
    const stats = root.querySelector('#home-trip-stats');
    if (stats) stats.innerHTML = `<div class="stat-line"><strong>${summary.stops}</strong><span>saved stops</span></div><div class="stat-line"><strong>¥${summary.spend.toLocaleString('en-US')}</strong><span>planned spend</span></div>`;
    root.querySelectorAll('[data-toggle-place]').forEach((button) => {
      const id = button.dataset.togglePlace;
      const saved = state.places.includes(id);
      button.textContent = saved ? 'Saved' : 'Add';
      button.setAttribute('aria-pressed', String(saved));
    });
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-route],[data-place],[data-toggle-place]');
    if (!target) return;
    if (target.dataset.route) navigate(target.dataset.route);
    else if (target.dataset.place) navigate('place', {id: target.dataset.place});
    else application.togglePlace(target.dataset.togglePlace);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
