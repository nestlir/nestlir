import { findPlace, PLACES } from '../entities/place/model.js';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const getRelatedPlaces = (place) => PLACES.filter((item) => item.id !== place.id).slice(0, 2);

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

  const relatedPlaces = getRelatedPlaces(place);

  root.innerHTML = `
    <section class="place-hero section-light">
      <div class="container">
        <div class="place-hero-image image-surface">
          <img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}" loading="eager" decoding="async">
        </div>
        <div class="place-hero-copy">
          <button class="back-link" type="button" data-route="explore">← Explore</button>
          <p class="section-label">${escapeHtml(place.type)} / ${escapeHtml(place.area)}</p>
          <h1>${escapeHtml(place.name)}</h1>
          <p>${escapeHtml(place.description)}</p>
          <div class="meta-row">
            <span>${escapeHtml(place.time)}</span>
            <span>${escapeHtml(place.duration)}</span>
            <span>${place.price ? `¥${place.price.toLocaleString('en-US')}` : 'FREE'}</span>
          </div>
          <div class="place-hero-actions">
            <button class="text-link" type="button" data-toggle data-toggle-label></button>
            <button class="text-link" type="button" data-route="trip">See My Trip ↗</button>
          </div>
        </div>
      </div>
    </section>

    <section class="place-story section-light">
      <div class="container section-grid">
        <p class="section-label">THE SLOW DETAIL</p>
        <div>
          <h2>Stay a little<br><em>longer.</em></h2>
          <p class="lede">Come early, move without a checklist and leave time for the spaces between the famous places. NOMAD treats a destination as a rhythm, not a queue.</p>
        </div>
      </div>
    </section>

    <section class="place-gallery section-light">
      <div class="container place-gallery-grid">
        <figure class="gallery-frame gallery-frame--primary image-surface">
          <img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)} — detail" loading="lazy" decoding="async">
        </figure>
        <figure class="gallery-frame gallery-frame--secondary image-surface">
          <img src="${escapeHtml(relatedPlaces[0]?.image || place.image)}" alt="Kyoto atmosphere near ${escapeHtml(place.name)}" loading="lazy" decoding="async">
        </figure>
        <figcaption class="gallery-note">Two views. One slower rhythm.</figcaption>
      </div>
    </section>

    <section class="related section-light">
      <div class="container">
        <div class="section-grid">
          <p class="section-label">RELATED</p>
          <div><h2>Keep<br><em>walking.</em></h2></div>
        </div>
        <div class="related-grid">
          ${relatedPlaces.map((item) => `<button class="related-card" type="button" data-place="${escapeHtml(item.id)}"><img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.area)} / ${escapeHtml(item.time)}</span></button>`).join('')}
        </div>
      </div>
    </section>
  `;

  const saveButton = root.querySelector('[data-toggle]');

  const renderState = () => {
    const saved = application.getState().places.includes(place.id);
    if (saveButton) {
      saveButton.textContent = saved ? 'Remove from My Day −' : 'Add to My Day +';
      saveButton.setAttribute('aria-pressed', String(saved));
    }
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-route],[data-toggle],[data-place]');
    if (!target) return;
    if (target.dataset.route) {
      navigate(target.dataset.route);
      return;
    }
    if (target.dataset.toggle !== undefined) {
      application.togglePlace(place.id);
      return;
    }
    if (target.dataset.place) navigate('place', { id: target.dataset.place });
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(renderState);
  renderState();

  return () => {
    unsubscribe();
    root.removeEventListener('click', onClick);
  };
}
