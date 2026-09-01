import { PLACES } from '../entities/place/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderHome(root, application, navigate) {
  root.replaceChildren();
  root.innerHTML = `
    <section class="hero" id="home">
      <div class="hero-photo" aria-hidden="true"></div>
      <div class="hero-shade" aria-hidden="true"></div>
      <div class="hero-content container">
        <p class="eyebrow">A FIELD GUIDE TO QUIETER PLACES</p>
        <h1>KYOTO</h1>
        <p class="hero-tagline">The art of slowing down.</p>
        <button class="text-link light" type="button" data-go="archive">Enter the archive <span>↘</span></button>
      </div>
    </section>

    <section class="archive section-light" id="archive">
      <div class="container section-grid">
        <p class="section-label">01 — ARCHIVE</p>
        <div>
          <h2>A city,<br><em>observed slowly.</em></h2>
          <p class="lede">Routes, rituals and places for days with nowhere else to be.</p>
        </div>
      </div>
      <div class="container archive-grid">
        ${PLACES.map((place, index) => `
          <article class="archive-card ${index % 2 ? 'is-offset' : ''}">
            <button type="button" class="image-frame" data-place="${place.id}" aria-label="Open ${place.name}">
              <img src="${place.image}" alt="${place.name}" loading="lazy">
            </button>
            <div class="caption">
              <span>0${index + 1}</span>
              <div><h3>${place.name}</h3><p>${place.type} / ${place.area} / ${place.time}</p></div>
              <button type="button" class="save-link" data-toggle-place="${place.id}"></button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="journal section-light" id="journal">
      <div class="container journal-grid">
        <div class="journal-photo"><img src="${PLACES[1].image}" alt="Kyoto morning street" loading="lazy"></div>
        <div class="journal-copy"><p class="section-label">02 — JOURNAL</p><p class="micro">07:03 / THE MORNING ROUTE</p><h2>Begin where<br><em>the city is quiet.</em></h2><p>Walk east before the shops open. Follow the river. Let the first train pass. Kyoto reveals itself in the spaces between destinations.</p><button class="text-link" type="button" data-go="explore">Build this route <span>↗</span></button></div>
      </div>
    </section>

    <section class="home-trip section-dark" id="home-trip">
      <div class="container home-trip-inner"><div><p class="section-label">03 — MY TRIP</p><h2>Leave room<br><em>for the in-between.</em></h2></div><div class="home-trip-stats" id="home-trip-stats"></div><button class="text-link light" type="button" data-go="trip">Open My Trip ↗</button></div>
    </section>
  `;

  const render = () => {
    const state = application.getState();
    const summary = getTripSummary(state);
    root.querySelector('#home-trip-stats').innerHTML = `<strong>${summary.stops}</strong><span>saved stops</span><strong>¥${summary.spend.toLocaleString('en-US')}</strong><span>planned spend</span>`;
    root.querySelectorAll('[data-toggle-place]').forEach((button) => {
      const id = button.dataset.togglePlace;
      const saved = state.places.includes(id);
      button.textContent = saved ? 'Saved' : 'Add';
      button.classList.toggle('is-saved', saved);
      button.setAttribute('aria-pressed', String(saved));
    });
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-go],[data-place],[data-toggle-place]');
    if (!target) return;
    if (target.dataset.go) navigate(target.dataset.go);
    else if (target.dataset.place) navigate(`place/${target.dataset.place}`);
    else application.togglePlace(target.dataset.togglePlace);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
