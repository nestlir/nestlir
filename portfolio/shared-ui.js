(() => {
  'use strict';
  const body = document.body;
  const coarse = window.matchMedia('(pointer: coarse)');
  const cursor = document.getElementById('cursor') || document.querySelector('.cursor-dot');
  const glow = document.querySelector('.cursor-glow');

  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (coarse.matches || motionPreference.matches || (!cursor && !glow)) return;

  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let tx = x;
  let ty = y;

  let frame = 0;
  let running = false;

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
    if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
      frame = requestAnimationFrame(render);
    } else {
      running = false;
    }
  };

  const scheduleRender = () => {
    if (!running && !document.hidden) {
      running = true;
      frame = requestAnimationFrame(render);
    }
  };

  window.addEventListener('pointermove', (event) => {
    tx = event.clientX;
    ty = event.clientY;
    scheduleRender();
  }, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
      running = false;
    } else {
      scheduleRender();
    }
  });

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
