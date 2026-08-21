(() => {
  'use strict';
  const body = document.body;
  const modal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const chaosToggle = document.getElementById('chaosToggle');
  const progress = document.getElementById('scrollProgress');
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
  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));

  themeToggle?.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    storage.set('portfolio-theme', next);
    storage.set('frontend-theme', next);
    setTheme(next);
  });

  chaosToggle?.addEventListener('click', () => {
    const enabled = !body.classList.contains('chaos-mode');
    storage.set('portfolio-chaos', String(enabled));
    storage.set('frontend-chaos', String(enabled));
    setChaos(enabled);
  });

  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.classList.remove('modal-open');
  };
  modal?.querySelector('.modal-backdrop')?.addEventListener('click', closeModal);
  document.getElementById('modalClose')?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setMenu(false);
    closeModal();
  });

  window.closePortfolioModal = closeModal;
  window.showPortfolioModal = (html) => {
    if (!modal || !modalContent) return;
    closeModal();
    modalContent.innerHTML = html;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.classList.add('modal-open');
  };

  const coarse = window.matchMedia('(pointer: coarse)');
  if (!coarse.matches) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
})();
