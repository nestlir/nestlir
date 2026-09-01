import { places } from '../../shared/data.js';

export function renderArchive(root, store) {
  const section = document.createElement('section');
  section.className = 'archive';
  section.innerHTML = `<p class="eyebrow">01 — ARCHIVE</p><h2>A city,<br><em>observed slowly.</em></h2><div class="archive-list"></div>`;
  const list = section.querySelector('.archive-list');

  const render = () => {
    const state = store.getState();
    list.innerHTML = places
      .map((place) => {
        const saved = state.places.includes(place.id);
        return `<button class="archive-item ${saved ? 'is-saved' : ''}" data-id="${place.id}" type="button"><span>${place.name}</span><small>${place.area} / ${place.time}</small><b>${saved ? 'Saved' : 'Add'}</b></button>`;
      })
      .join('');

    list.querySelectorAll('[data-id]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        if (id) store.togglePlace(id);
      });
    });
  };

  store.subscribe(render);
  render();
  root.append(section);
}
