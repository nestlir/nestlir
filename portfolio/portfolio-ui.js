(() => {
  'use strict';
  const body = document.body;
  const coarse = window.matchMedia('(pointer: coarse)');
  const cursor = document.getElementById('cursor') || document.querySelector('.cursor-dot');
  const glow = document.querySelector('.cursor-glow');

  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;
  const moveCursor = (event) => { tx = event.clientX; ty = event.clientY; };
  const renderCursor = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    if (cursor) { cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; }
    if (glow) { glow.style.left = `${x}px`; glow.style.top = `${y}px`; }
    requestAnimationFrame(renderCursor);
  };

  if (!coarse.matches) {
    window.addEventListener('pointermove', moveCursor, { passive: true });
    renderCursor();
    document.querySelectorAll('a,button,.magnetic,.project-link,.filter').forEach((el) => {
      el.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
    });
    document.querySelectorAll('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (event) => {
        const r = el.getBoundingClientRect();
        const dx = (event.clientX - (r.left + r.width / 2)) * 0.12;
        const dy = (event.clientY - (r.top + r.height / 2)) * 0.12;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }
})();
