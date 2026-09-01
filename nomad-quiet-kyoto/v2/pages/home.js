import { renderArchive } from '../features/archive/ui.js';

export function renderHome(root, store) {
  root.innerHTML = '';
  const shell = document.createElement('div');
  shell.className = 'page-shell';
  shell.innerHTML = `<header><a class="wordmark" href="#top">NOMAD</a><nav><a href="#archive">Archive</a><a href="#trip">My Trip <span class="count" id="count"></span></a></nav></header><section class="hero" id="top"><div class="hero-copy"><p class="eyebrow">A FIELD GUIDE TO QUIETER PLACES</p><h1>KYOTO</h1><p>The art of slowing down.</p><a href="#archive">Explore the archive ↘</a></div></section><div id="archive"></div><section class="trip-preview" id="trip"><p class="eyebrow">MY TRIP</p><h2>Leave room<br><em>for the in-between.</em></h2><p class="trip-count"><strong id="tripCount">0</strong> saved places</p></section>`;
  root.append(shell);
  const archiveRoot = document.createElement('div');
  archiveRoot.id = 'archive-content';
  shell.append(archiveRoot);
  renderArchive(archiveRoot, store);

  const count = shell.querySelector('#count');
  const tripCount = shell.querySelector('#tripCount');
  const renderCount = () => {
    const value = store.getState().places.length;
    count.textContent = String(value);
    tripCount.textContent = String(value);
  };
  store.subscribe(renderCount);
  renderCount();
}
