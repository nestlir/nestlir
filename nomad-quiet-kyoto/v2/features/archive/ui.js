import { places } from '../../entities/place/model.js';

export function renderArchive(root, application) {
  if (!root) throw new Error('Archive root was not found');

  const section = document.createElement('section');
  section.className = 'archive';
  section.innerHTML = `
    <p class="eyebrow">01 — ARCHIVE</p>
    <h2>A city,<br><em>observed slowly.</em></h2>
    <div class="archive-list" role="list"></div>
  `;

  const list = section.querySelector('.archive-list');
  if (!list) throw new Error('Archive list mount was not found');

  function render(state) {
    const fragment = document.createDocumentFragment();

    for (const place of places) {
      const saved = state.places.includes(place.id);
      const item = document.createElement('button');
      item.type = 'button';
      item.className = `archive-item${saved ? ' is-saved' : ''}`;
      item.dataset.id = place.id;
      item.setAttribute('aria-pressed', String(saved));
      item.innerHTML = `
        <span>${place.name}</span>
        <small>${place.area} / ${place.time}</small>
        <b>${saved ? 'Saved' : 'Add'}</b>
      `;
      item.addEventListener('click', () => application.togglePlace(place.id));
      fragment.append(item);
    }

    list.replaceChildren(fragment);
  }

  const unsubscribe = application.subscribe(render);
  render(application.getState());
  root.replaceChildren(section);

  return unsubscribe;
}
