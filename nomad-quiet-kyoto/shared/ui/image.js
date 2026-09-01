export function createImage({src, alt, loading = 'lazy', className = ''}) {
  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.loading = loading;
  image.className = className;
  image.addEventListener('error', () => {
    image.classList.add('is-broken');
    image.removeAttribute('src');
    image.setAttribute('aria-label', `${alt}. Image unavailable.`);
  }, {once: true});
  return image;
}
