export function renderGallery(root, items, {onSelect} = {}) {
  root.replaceChildren();
  const fragment = document.createDocumentFragment();

  items.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `gallery-item${index === 0 ? ' is-active' : ''}`;
    button.setAttribute('aria-label', `Open image ${index + 1}`);
    button.innerHTML = `<img src="${item.src}" alt="${item.alt}" loading="${index === 0 ? 'eager' : 'lazy'}"><span>${String(index + 1).padStart(2,'0')}</span>`;
    button.addEventListener('click', () => {
      root.querySelectorAll('.gallery-item').forEach((node) => node.classList.remove('is-active'));
      button.classList.add('is-active');
      onSelect?.(item, index);
    });
    fragment.append(button);
  });

  root.append(fragment);
}
