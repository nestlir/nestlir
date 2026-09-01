import { places } from '../../entities/place/model.js';

export function renderArchive(root, store) {
  const section = document.createElement('section');
  section.className = 'archive';
  section.innerHTML = `
    <p class="eyebrow">01 — ARCHIVE</p>
    <h2>A city,<br><em>observed slowly.</em></h2>
    <div class="archive-list"></div>
  `;

  const list = section.querySelector('.archive-list');

  const render = () => {
    if (!list) return;
    const state = store.getState();
    list.innerHTML = '';

    places.forEach((place) => {
      const saved = state.places.includes(place.id);
      const button = document.createElement('button');
      button.className = `archive-item${saved ? ' is-saved' : ''}`;
      button.type = 'button';
      button.dataset.id = place.id;
      button.innerHTML = `
        <span>${place.name}</span>
        <small>${place.area} / ${place.time}</small>
        <b>${saved ? 'Saved' : 'Add'}</b>
      `;
      button.addEventListener('click', () => store.togglePlace(place.id));
      list.append(button);
    });
  };

  store.subscribe(render);
  render();
  root.append(section);
}
