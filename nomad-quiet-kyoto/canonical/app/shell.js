import { renderHome } from '../pages/home.js';
import { renderExplore } from '../pages/explore.js';
import { renderEat } from '../pages/eat.js';
import { renderTrip } from '../pages/trip.js';
import { renderPlaceDetail } from '../pages/place.js';

export function renderShell(root, application) {
  root.replaceChildren();

  const app = document.createElement('div');
  app.className = 'site';
  app.innerHTML = `
    <header class="site-header">
      <a class="wordmark" href="#home" aria-label="NOMAD home">NOMAD</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#archive" data-route>Archive</a>
        <a href="#explore" data-route>Explore</a>
        <a href="#eat" data-route>Eat</a>
        <a href="#trip" data-route>My Trip <sup id="trip-count">0</sup></a>
      </nav>
      <button class="menu-button" id="menu-button" type="button" aria-expanded="false">Menu</button>
    </header>
    <div class="mobile-nav" id="mobile-nav">
      <a href="#archive" data-route>Archive</a>
      <a href="#explore" data-route>Explore</a>
      <a href="#eat" data-route>Eat</a>
      <a href="#trip" data-route>My Trip</a>
    </div>
    <main id="page-root"></main>
    <div id="modal-root"></div>
  `;

  root.append(app);

  const pageRoot = app.querySelector('#page-root');
  const tripCount = app.querySelector('#trip-count');
  const menuButton = app.querySelector('#menu-button');
  const mobileNav = app.querySelector('#mobile-nav');

  let cleanup = () => {};

  const route = () => {
    cleanup();
    cleanup = () => {};
    const target = (window.location.hash || '#home').slice(1) || 'home';
    const [name, id] = target.split('/');

    if (name === 'place' && id) {
      cleanup = renderPlaceDetail(pageRoot, application, id, navigate);
      return;
    }
    if (name === 'explore') {
      cleanup = renderExplore(pageRoot, application, navigate);
      return;
    }
    if (name === 'eat') {
      cleanup = renderEat(pageRoot, application, navigate);
      return;
    }
    if (name === 'trip') {
      cleanup = renderTrip(pageRoot, application, navigate);
      return;
    }
    cleanup = renderHome(pageRoot, application, navigate);
  };

  function navigate(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function renderCount(state) {
    tripCount.textContent = String(state.places.length + state.food.length);
  }

  const unsubscribe = application.subscribe(renderCount);
  renderCount(application.getState());

  window.addEventListener('hashchange', route);
  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  route();

  return () => {
    unsubscribe();
    window.removeEventListener('hashchange', route);
    cleanup();
    app.remove();
  };
}
