export function createSiteHeader(application, navigate) {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <a class="wordmark" href="#home">NOMAD</a>
    <nav class="site-nav" aria-label="Primary navigation">
      <a href="#archive">Archive</a>
      <a href="#explore">Explore</a>
      <a href="#eat">Eat</a>
      <a href="#trip">My Trip <sup id="header-trip-count">0</sup></a>
    </nav>
    <button class="menu-button" id="header-menu" type="button" aria-expanded="false">Menu</button>
  `;
  const button = header.querySelector('#header-menu');
  const nav = header.querySelector('.site-nav');
  const count = header.querySelector('#header-trip-count');

  const render = (state) => {
    count.textContent = String(state.places.length + state.food.length);
  };

  const unsubscribe = application.subscribe(render);
  render(application.getState());
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('mobile-open');
    button.setAttribute('aria-expanded', String(open));
  });

  header.addEventListener('click', (event) => {
    const link = event.target.closest('[href^="#"]');
    if (!link) return;
    event.preventDefault();
    navigate(link.getAttribute('href'));
  });

  return { element: header, cleanup: unsubscribe };
}
