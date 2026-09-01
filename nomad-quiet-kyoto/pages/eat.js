import { FOODS } from '../entities/food/model.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderEat(root, application, navigate) {
  root.replaceChildren();
  let filter = 'all';

  const render = () => {
    const state = application.getState();
    const items = filter === 'all' ? FOODS : FOODS.filter((item) => item.type === filter);
    const summary = getTripSummary(state);
    root.innerHTML = `
      <section class="page-intro section-light"><div class="container section-grid"><p class="section-label">EAT / KYOTO</p><div><h1>Taste the city<br><em>without hurry.</em></h1><p class="lede">Breakfast by the river, tea in the shade, and bowls after rain.</p></div></div></section>
      <section class="food-page section-light"><div class="container food-toolbar"><div class="filters">${['all','morning','tea','dinner'].map((type)=>`<button class="filter ${filter===type?'is-active':''}" type="button" data-filter="${type}">${type}</button>`).join('')}</div><span>${summary.food.length} saved</span></div><div class="container food-grid">${items.map((item,index)=>`<article class="food-card"><button class="food-image" type="button" data-food-detail="${item.id}" aria-label="Open ${item.name}"><img src="${item.image}" alt="${item.name}" loading="lazy"></button><div class="food-caption"><span>0${index+1}</span><div><h2>${item.name}</h2><p>${item.place} / ${item.type} / ¥${item.price.toLocaleString('en-US')}</p></div><button class="save-link" type="button" data-toggle-food="${item.id}" aria-pressed="${state.food.includes(item.id)}">${state.food.includes(item.id)?'Saved':'Add'}</button></div></article>`).join('')}</div></section>
      <section class="food-footer section-dark"><div class="container food-footer-inner"><div><p class="section-label">MY DAY</p><h2>Keep one table<br><em>unplanned.</em></h2></div><div><strong>${summary.stops}</strong><span>total stops</span><strong>¥${summary.spend.toLocaleString('en-US')}</strong><span>planned spend</span></div><button class="text-link light" type="button" data-route="trip">Open My Trip ↗</button></div></section>
    `;
  };

  const onClick = (event) => {
    const target = event.target.closest('[data-filter],[data-toggle-food],[data-food-detail],[data-route]');
    if (!target) return;
    if (target.dataset.filter) { filter = target.dataset.filter; render(); }
    else if (target.dataset.toggleFood) application.toggleFood(target.dataset.toggleFood);
    else if (target.dataset.foodDetail) navigate('food',{id:target.dataset.foodDetail});
    else if (target.dataset.route) navigate(target.dataset.route);
  };

  root.addEventListener('click', onClick);
  const unsubscribe = application.subscribe(render);
  render();
  return () => { unsubscribe(); root.removeEventListener('click', onClick); };
}
