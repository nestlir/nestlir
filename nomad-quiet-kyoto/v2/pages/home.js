import { renderArchive } from '../features/archive/ui.js';

export function renderHome(root, application) {
  root.replaceChildren();

  const shell = document.createElement('div');
  shell.className = 'page-shell';
  shell.innerHTML = `
    <header>
      <a class="wordmark" href="#top">NOMAD</a>
      <nav aria-label="Primary">
        <a href="#archive">Archive</a>
        <a href="#trip">My Trip <span class="count" id="count">0</span></a>
      </nav>
    </header>
    <section class="hero" id="top">
      <div class="hero-copy">
        <p class="eyebrow">A FIELD GUIDE TO QUIETER PLACES</p>
        <h1>KYOTO</h1>
        <p>The art of slowing down.</p>
        <a href="#archive">Explore the archive ↘</a>
      </div>
    </section>
    <div id="archive"></div>
    <section class="trip-preview" id="trip">
      <p class="eyebrow">MY TRIP</p>
      <h2>Leave room<br><em>for the in-between.</em></h2>
      <p class="trip-count"><strong id="tripCount">0</strong> saved places</p>
    </section>
  `;

  root.append(shell);

  const archiveRoot = shell.querySelector('#archive');
  if (!archiveRoot) throw new Error('Archive mount was not found');
  renderArchive(archiveRoot, application);

  const count = shell.querySelector('#count');
  const tripCount = shell.querySelector('#tripCount');

  const renderCount = (state) => {
    const value = state.places.length;
    if (count) count.textContent = String(value);
    if (tripCount) tripCount.textContent = String(value);
  };

  const unsubscribe = application.subscribe(renderCount);
  renderCount(application.getState());

  return unsubscribe;
}
