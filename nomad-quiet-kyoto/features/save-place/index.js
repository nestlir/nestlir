export function bindSavePlace(root, application) {
  const onClick = (event) => {
    const button = event.target.closest('[data-toggle-place]');
    if (!button) return;
    application.togglePlace(button.dataset.togglePlace);
  };
  root.addEventListener('click', onClick);
  return () => root.removeEventListener('click', onClick);
}
