import { FOODS } from '../entities/food/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

export function renderEat(root, application, navigate) {
  root.replaceChildren();
  let filter = 'all';

  root.innerHTML = `
    <section class="page-intro section-light">
      <div class="container section-grid">
        <p class="section-label">EAT / KYOTO</p>
        <div>
          <h1>Taste the city<br><em>without hurry.</em></h1>
          <p class="lede">Breakfast by the river, tea in the shade, and bowls after rain.</p>
        </div>
      </div>
    </section>
    <section class="food-page section-light">
      <div class="container food-toolbar">
        <div class="filters">
          ${['all', 'morning', 'tea', 'dinner'].map((type) => `<button class="filter" type="button" data-filter="${type}">${type}</button>`).join('')}
        </div>
        <span data-food-saved>0 saved</span>
      </div>
      <div class="container food-grid" data-food-grid></div>
    </section>
    <section class="food-footer section-dark">
      <div class="container food-footer-inner" data-food-summary></div>
    </section>
  `;

  const grid = root.querySelector('[data-food-grid]');
  const savedLabel = root.querySelector('[data-food-saved]');
  const summaryRoot = root.querySelector('[data-food-summary]');
  const filters = [...root.querySelectorAll('[data-filter]')];

  const render = () => {
    const state = application.getState();
    const items = filter === 'all' ? FOODS : FOODS.filter((item) => item.type === filter);
    const summary = getTripSummary(state);

    filters.forEach((button) => {
      button.classList.toggle('is-active', button.dataset.filter === filter);
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });

    savedLabel.textContent = `${summary.food.length} ${summary.food.length === 1 ? 'saved' : 'saved'}`;
    grid.innerHTML = items.map((item, index) => {
      const saved = state.food.includes(item.id);
      return `
        <article class="food-card">
          <button class="food-image" type="button" data-food-detail="${escapeHtml(item.id)}" aria-label="Open ${escapeHtml(item.name)}">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy" decoding="async">
          </button>
          <div class="food-caption">
            <span>0${index + 1}</span>
            <div>
              <h2>${escapeHtml(item.name)}</h2>
              <p>${escapeHtml(item.place)} / ${escapeHtml(item.type)} / ¥${item.price.toLocaleString('en-US')}</p>
            </div>
            <button class="save-link" type="button" data-toggle-food="${escapeHtml(item.id)}" aria-pressed="${String(saved)}">${saved ? 'Saved' : 'Add'}</button>
          </div>
        </article>
      `;
    }).join('');

    if (!items.length) {
      grid.innerHTML = '<p class="empty-state">No quiet finds here yet.</p>';
    }

    summaryRoot.innerHTML = `
      <div>
        <p class="section-label">MY DAY</p>
        <h2>Keep one table<br><em>unplanned.</em></h2>
      </div>
      <div class="food-summary-stats">
        <strong>${summary.stops}</strong><span>total stops</span>
        <strong>¥${summary.spend.toLocaleString('en-US')}</strong><span>planned spend</span>
      </div>
      <button class="text-link light" type="button" data-route="trip">Open My Trip ↗</button>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-filter],[data-toggle-food],[data-food-detail],[data-route]');
    if (!target) return;

    if (target.dataset.filter) {
      filter = target.dataset.filter;
      render();
      return;
    }

    if (target.dataset.toggleFood) {
      application.toggleFood(target.dataset.toggleFood);
      return;
    }

    if (target.dataset.foodDetail) {
      navigate('food', { id: target.dataset.foodDetail });
      return;
    }

    if (target.dataset.route) navigate(target.dataset.route);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();

  return () => {
    unsubscribe();
    root.removeEventListener('click', onClick);
  };
}
