const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const dialog = document.querySelector('#order-dialog');
const form = document.querySelector('#order-form');
const message = document.querySelector('#form-message');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));

document.querySelectorAll('.js-order').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
  });
});

dialog?.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  message.textContent = `Added ${data.get('qty')} × ${data.get('item')} — see you soon!`;
  window.setTimeout(() => dialog.close(), 1400);
});

const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.menu-card, .news-card, .kitchen-copy, .kitchen-image').forEach((element) => {
  element.classList.add('reveal');
  reveal.observe(element);
});