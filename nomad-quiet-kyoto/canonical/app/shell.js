import { renderHome } from '../pages/home.js';
import { renderExplore } from '../pages/explore.js';
import { renderEat } from '../pages/eat.js';
import { renderTrip } from '../pages/trip.js';
import { renderPlaceDetail } from '../pages/place.js';
import { ROUTES, navigate, startRouter } from './router.js';

export function renderShell(root, application) {
  root.replaceChildren();

  const app = document.createElement('div');
  app.className = 'site';
  app.innerHTML = `
    <header class="site-header">
      <a class="wordmark" href="#${ROUTES.HOME}" aria-label="NOMAD home">NOMAD</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#${ROUTES.ARCHIVE}">Archive</a>
        <a href="#${ROUTES.EXPLORE}">Explore</a>
        <a href="#${ROUTES.EAT}">Eat</a>
        <a href="#${ROUTES.TRIP}">My Trip <sup id="trip-count">0</sup></a>
      </nav>
      <button class="menu-button" id="menu-button" type="button" aria-expanded="false">Menu</button>
    </header>
    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      <a href="#${ROUTES.HOME}">Home</a>
      <a href="#${ROUTES.ARCHIVE}">Archive</a>
      <a href="#${ROUTES.EXPLORE}">Explore</a>
      <a href="#${ROUTES.EAT}">Eat</a>
      <a href="#${ROUTES.TRIP}">My Trip</a>
    </div>
    <main id="page-root"></main>
    <div id="modal-root"></div>
  `;

  root.append(app);

  const pageRoot = app.querySelector('#page-root');
  const tripCount = app.querySelector('#trip-count');
  const menuButton = app.querySelector('#menu-button');
  const mobileNav = app.querySelector('#mobile-nav');

  if (!pageRoot || !tripCount || !menuButton || !mobileNav) {
    throw new Error('NOMAD shell mount failed');
  }

  let cleanup = () => {};

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
  }

  function renderRoute(route) {
    cleanup();
    cleanup = () => {};

    switch (route.name) {
      case ROUTES.EXPLORE:
        cleanup = renderExplore(pageRoot, application, navigate);
        break;
      case ROUTES.EAT:
        cleanup = renderEat(pageRoot, application, navigate);
        break;
      case ROUTES.TRIP:
        cleanup = renderTrip(pageRoot, application, navigate);
        break;
      case ROUTES.PLACE:
        cleanup = renderPlaceDetail(pageRoot, application, route.params.id, navigate);
        break;
      case ROUTES.ARCHIVE:
      case ROUTES.HOME:
      default:
        cleanup = renderHome(pageRoot, application, navigate, route.name === ROUTES.ARCHIVE);
        break;
    }

    closeMobileNav();
  }

  function renderCount(state) {
    tripCount.textContent = String(state.places.length + state.food.length);
  }

  const unsubscribe = application.subscribe(renderCount);
  const stopRouter = startRouter(renderRoute);

  renderCount(application.getState());

  menuButton.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    mobileNav.setAttribute('aria-hidden', String(!open));
    menuButton.setAttribute('aria-expanded', String(open));
  });

  return () => {
    unsubscribe();
    stopRouter();
    cleanup();
    app.remove();
  };
}
