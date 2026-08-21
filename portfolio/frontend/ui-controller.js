(() => {
  'use strict';
  const body = document.body;
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const chaosToggle = document.getElementById('chaosToggle');
  const storage = {
    get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    mobileNav?.setAttribute('aria-hidden', String(!open));
  };

  const setTheme = (theme) => {
    const dark = theme === 'dark';
    body.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    themeToggle?.setAttribute('aria-pressed', String(dark));
    themeToggle?.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
  };

  const setChaos = (enabled) => {
    body.classList.toggle('chaos-mode', enabled);
    document.documentElement.dataset.chaos = enabled ? 'on' : 'off';
    chaosToggle?.setAttribute('aria-pressed', String(enabled));
    if (chaosToggle) chaosToggle.textContent = enabled ? 'TURN IT OFF ✦' : 'MAKE IT WEIRD ✦';
  };

  setMenu(false);
  setTheme(storage.get('portfolio-theme', storage.get('frontend-theme', 'light')));
  setChaos(storage.get('portfolio-chaos', storage.get('frontend-chaos', 'false')) === 'true');

  menuToggle?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  mobileClose?.addEventListener('click', () => setMenu(false));
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  themeToggle?.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    storage.set('portfolio-theme', next);
    storage.set('frontend-theme', next);
    setTheme(next);
  });

  chaosToggle?.addEventListener('click', () => {
    const next = !body.classList.contains('chaos-mode');
    storage.set('portfolio-chaos', String(next));
    storage.set('frontend-chaos', String(next));
    setChaos(next);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
})();
