import { places } from '../../entities/place/model.js';

export function renderArchive(root, store) {
  const section = document.createElement('section');
  section.className = 'archive';
  section.innerHTML = `<p class="eyebrow">01 — ARCHIVE</p><h2>A city,<br><em>observed slowly.</em></h2><div class="archive-list"></div>`;
  const list = section.querySelector('.archive-list');

  const render = () => {
    list.innerHTML = places.map((place) => `<button class="archive-item ${store.getState().places.includes(place.id) ? 'is-saved' : ''}" data-id="${place.id}"><span>${place.name}</span><small>${place.area} / ${place.time}</small><b>${store.getState().places.includes(place.id) ? 'Saved' : 'Add'}</b></button>`).join('');
    list.querySelectorAll('[data-id]').forEach((button) => button.addEventListener('click', () => store.togglePlace(button.dataset.id)));
  };

  store.subscribe(render);
  render();
  root.append(section);
}
