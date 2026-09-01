import { findFood } from '../entities/food/model.js';

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

  const render = () => {
    const saved = application.getState().food.includes(food.id);
    root.innerHTML = `
      <section class="place-hero section-light"><div class="place-hero-image"><img src="${food.image}" alt="${food.name}"></div><div class="container place-hero-copy"><button class="back-link" type="button" data-route="eat">← Eat Kyoto</button><p class="section-label">${food.type} / ${food.place}</p><h1>${food.name}</h1><p>${food.description}</p><div class="meta-row"><span>${food.duration}</span><span>¥${food.price.toLocaleString('en-US')}</span></div><button class="text-link" type="button" data-toggle>${saved?'Remove from My Day −':'Add to My Day +'}</button><button class="text-link" type="button" data-route="trip">See My Trip ↗</button></div></section>
      <section class="place-story section-light"><div class="container section-grid"><p class="section-label">THE TABLE</p><div><h2>Eat without<br><em>hurrying.</em></h2><p class="lede">A meal is another kind of stop. Keep the pace light enough that the next street can still surprise you.</p></div></div></section>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-route],[data-toggle]');
    if (!target) return;
    if (target.dataset.route) navigate(target.dataset.route);
    else application.toggleFood(food.id);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
