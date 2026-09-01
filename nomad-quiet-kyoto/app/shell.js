import { navigate, startRouter } from './router.js';
import { getPageRenderer } from './page-registry.js';
import { getTripSummary } from '../shared/lib/trip-summary.js';

export function renderShell(root, application) {
  root.replaceChildren();

  const shell = document.createElement('div');
  shell.className = 'site-shell';
  shell.innerHTML = `
    <header class="site-header">
      <a class="wordmark" href="#home" aria-label="NOMAD home">NOMAD</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#home">Home</a>
        <a href="#explore">Explore</a>
        <a href="#eat">Eat</a>
        <a href="#trip">My Trip <sup id="trip-count">0</sup></a>
      </nav>
      <button class="menu-button" type="button" id="menu-button" aria-expanded="false" aria-controls="mobile-navigation">Menu</button>
    </header>
    <nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden>
      <a href="#home">Home</a>
      <a href="#explore">Explore</a>
      <a href="#eat">Eat</a>
      <a href="#trip">My Trip</a>
    </nav>
    <main id="page-root"></main>
  `;

  root.append(shell);

  const pageRoot = shell.querySelector('#page-root');
  const tripCount = shell.querySelector('#trip-count');
  const menuButton = shell.querySelector('#menu-button');
  const mobileNavigation = shell.querySelector('#mobile-navigation');

  let pageCleanup = () => {};

  const renderRoute = (route) => {
    pageCleanup();
    pageCleanup = () => {};
    pageRoot.replaceChildren();

    const renderer = getPageRenderer(route.name);
    pageCleanup = renderer(pageRoot, application, navigate, route.params) ?? (() => {});
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const renderCount = (state) => {
    const summary = getTripSummary(state);
    if (tripCount) tripCount.textContent = String(summary.stops);
  };

  const unsubscribe = application.subscribe(renderCount);
  renderCount(application.getState());

  const stopRouter = startRouter(renderRoute);

  const toggleMenu = () => {
    const open = mobileNavigation.hidden;
    mobileNavigation.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
  };

  const closeMenu = () => {
    mobileNavigation.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
  };

  menuButton.addEventListener('click', toggleMenu);
  mobileNavigation.addEventListener('click', closeMenu);

  return () => {
    unsubscribe();
    stopRouter();
    pageCleanup();
    menuButton.removeEventListener('click', toggleMenu);
    mobileNavigation.removeEventListener('click', closeMenu);
    shell.remove();
  };
}
