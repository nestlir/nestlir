(() => {
  'use strict';
  const body = document.body;
  const html = document.documentElement;
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const chaosToggle = document.getElementById('chaosToggle');
  const progress = document.getElementById('progress') || document.getElementById('scrollProgress');

  const store = {
    get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    mobileNav?.classList.toggle('is-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    mobileNav?.setAttribute('aria-hidden', String(!open));
  };

  const setTheme = (theme) => {
    const dark = theme === 'dark';
    body.classList.toggle('dark', dark);
    html.style.colorScheme = dark ? 'dark' : 'light';
    themeToggle?.setAttribute('aria-pressed', String(dark));
    themeToggle?.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const setChaos = (enabled) => {
    body.classList.toggle('chaos-mode', enabled);
    html.dataset.chaos = enabled ? 'on' : 'off';
    const language = store.get('portfolio-lang', 'ru');
    chaosToggle?.setAttribute('aria-pressed', String(enabled));
    if (chaosToggle) chaosToggle.textContent = enabled ? 'TURN IT OFF ✦' : 'MAKE IT WEIRD ✦';
    window.PortfolioI18n?.applyLanguage(language);
  };

  setMenu(false);
  setTheme(store.get('portfolio-theme', 'light'));
  setChaos(store.get('portfolio-chaos', 'false') === 'true');

  menuToggle?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  mobileClose?.addEventListener('click', () => setMenu(false));
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  themeToggle?.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    store.set('portfolio-theme', next);
    setTheme(next);
  });

  chaosToggle?.addEventListener('click', () => {
    const next = !body.classList.contains('chaos-mode');
    store.set('portfolio-chaos', String(next));
    setChaos(next);
  });

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  window.PortfolioUI = Object.freeze({ setMenu, setTheme, setChaos });
})();
