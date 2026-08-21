(() => {
  'use strict';
  const body = document.body;
  const coarse = window.matchMedia('(pointer: coarse)');
  const cursor = document.getElementById('cursor') || document.querySelector('.cursor-dot');
  const glow = document.querySelector('.cursor-glow');
  if (!coarse.matches && (cursor || glow)) {
    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y;
    window.addEventListener('pointermove', (event) => { tx = event.clientX; ty = event.clientY; }, { passive: true });
    const render = () => {
      x += (tx - x) * 0.18; y += (ty - y) * 0.18;
      if (cursor) { cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; }
      if (glow) { glow.style.left = `${x}px`; glow.style.top = `${y}px`; }
      requestAnimationFrame(render);
    };
    render();
    const interactive = document.querySelectorAll('a,button,.magnetic,.project-link,.filter');
    interactive.forEach((el) => {
      el.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
    });
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (event) => {
        const rect = el.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
        const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.12;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuToggle?.setAttribute('aria-expanded', String(open));
    mobileNav?.setAttribute('aria-hidden', String(!open));
  };
  menuToggle?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  mobileClose?.addEventListener('click', () => setMenu(false));
  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
})();
