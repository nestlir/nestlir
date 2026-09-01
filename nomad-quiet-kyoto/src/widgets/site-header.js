import { navigate } from '../app/router.js';

export function renderHeader(root, application, route) {
  const summary = application.getState();
  const placesCount = summary.places.length;
  root.innerHTML = `
    <header class="site-header">
      <a class="wordmark" href="#home" data-route="home">NOMAD</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#archive" data-route="archive">Archive</a>
        <a href="#explore" data-route="explore">Explore</a>
        <a href="#eat" data-route="eat">Eat</a>
        <a href="#trip" data-route="trip">My Trip <sup>${placesCount}</sup></a>
      </nav>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button>
      <div class="mobile-menu" id="site-menu" hidden>
        <a href="#home" data-route="home">Home</a>
        <a href="#archive" data-route="archive">Archive</a>
        <a href="#explore" data-route="explore">Explore</a>
        <a href="#eat" data-route="eat">Eat</a>
        <a href="#trip" data-route="trip">My Trip (${placesCount})</a>
      </div>
    </header>
  `;

  root.querySelectorAll('[data-route]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigate(link.dataset.route);
    });
  });

  const toggle = root.querySelector('.menu-toggle');
  const menu = root.querySelector('#site-menu');
  toggle?.addEventListener('click', () => {
    const open = menu?.hasAttribute('hidden');
    if (open) menu?.removeAttribute('hidden'); else menu?.setAttribute('hidden', '');
    toggle?.setAttribute('aria-expanded', String(Boolean(open)));
  });
}
