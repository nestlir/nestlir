(() => {
  const cta = document.querySelector('[data-i18n="hero.cta"]');
  const languages = {
    ru: 'Смотреть проекты <span>↗</span>',
    en: 'View projects <span>↗</span>',
    ja: 'プロジェクトを見る <span>↗</span>'
  };
  const syncCta = () => {
    if (!cta) return;
    const lang = document.documentElement.lang || localStorage.getItem('portfolio-lang') || 'ru';
    cta.innerHTML = languages[lang] || languages.ru;
  };
  document.querySelectorAll('.lang').forEach(btn => btn.addEventListener('click', () => setTimeout(syncCta, 0)));
  syncCta();

  const menu = document.getElementById('mobileNav');
  const toggle = document.getElementById('menuToggle');
  const close = document.getElementById('mobileClose');
  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    if (menu) menu.setAttribute('aria-hidden', 'true');
  };
  if (close) close.addEventListener('click', closeMenu);
  if (menu) menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
})();
