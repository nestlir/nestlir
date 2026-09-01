import { findFood } from '../entities/food/model.js';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export function renderFoodDetail(root, application, id, navigate) {
  const food = findFood(id);
  root.replaceChildren();

  if (!food) {
    root.innerHTML = `<section class="not-found section-light"><div class="container"><p class="section-label">404</p><h1>Dish not found.</h1><button class="text-link" type="button" data-route="eat">Back to Eat ↗</button></div></section>`;
    const onMissing = (event) => {
      const target = event.target.closest('[data-route]');
      if (target) navigate(target.dataset.route);
    };
    root.addEventListener('click', onMissing);
    return () => root.removeEventListener('click', onMissing);
  }

  root.innerHTML = `
    <section class="place-hero section-light">
      <div class="container">
        <div class="place-hero-image image-surface"><img src="${escapeHtml(food.image)}" alt="${escapeHtml(food.name)}" loading="eager" decoding="async"></div>
        <div class="place-hero-copy">
          <button class="back-link" type="button" data-route="eat">← Eat Kyoto</button>
          <p class="section-label">${escapeHtml(food.type)} / ${escapeHtml(food.place)}</p>
          <h1>${escapeHtml(food.name)}</h1>
          <p>${escapeHtml(food.description)}</p>
          <div class="meta-row"><span>${escapeHtml(food.duration)}</span><span>¥${food.price.toLocaleString('en-US')}</span></div>
          <div class="place-hero-actions">
            <button class="text-link" type="button" data-toggle></button>
            <button class="text-link" type="button" data-route="trip">See My Trip ↗</button>
          </div>
        </div>
      </div>
    </section>
    <section class="place-story section-light"><div class="container section-grid"><p class="section-label">THE TABLE</p><div><h2>Eat without<br><em>hurrying.</em></h2><p class="lede">A meal is another kind of stop. Keep the pace light enough that the next street can still surprise you.</p></div></div></section>
  `;

  const saveButton = root.querySelector('[data-toggle]');
  const renderState = () => {
    const saved = application.getState().food.includes(food.id);
    saveButton.textContent = saved ? 'Remove from My Day −' : 'Add to My Day +';
    saveButton.setAttribute('aria-pressed', String(saved));
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-route],[data-toggle]');
    if (!target) return;
    if (target.dataset.route) navigate(target.dataset.route);
    else application.toggleFood(food.id);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(renderState);
  renderState();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
