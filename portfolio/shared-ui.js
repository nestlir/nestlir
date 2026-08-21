(() => {
  'use strict';
  const body = document.body;
  const coarse = window.matchMedia('(pointer: coarse)');
  const cursor = document.getElementById('cursor') || document.querySelector('.cursor-dot');
  const glow = document.querySelector('.cursor-glow');

  if (coarse.matches || (!cursor && !glow)) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  window.addEventListener('pointermove', (event) => {
    tx = event.clientX;
    ty = event.clientY;
  }, { passive: true });

  const render = () => {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    if (cursor) {
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
    }
    if (glow) {
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    }
    requestAnimationFrame(render);
  };
  render();

  document.querySelectorAll('a,button,.magnetic,.project-link,.filter').forEach((el) => {
    el.addEventListener('pointerenter', () => body.classList.add('cursor-hover'));
    el.addEventListener('pointerleave', () => body.classList.remove('cursor-hover'));
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const dx = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
      const dy = (event.clientY - (rect.top + rect.height / 2)) * 0.12;
      el.style.translate = `${dx}px ${dy}px`;
    });
    el.addEventListener('pointerleave', () => { el.style.translate = ''; });
  });
})();
