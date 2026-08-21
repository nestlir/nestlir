(() => {
  // Keep decorative styling isolated from the main layout stylesheet.
  if (!document.querySelector('link[data-visual-system]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './visual-system.css';
    link.dataset.visualSystem = 'true';
    document.head.appendChild(link);
  }

  // Hero CTA translations contain real markup; use innerHTML intentionally here.
  const cta = document.querySelector('[data-i18n-html="hero.cta"]');
  const ctaLabels = {
    ru: 'Смотреть проекты <span>↗</span>',
    en: 'View projects <span>↗</span>',
    ja: 'プロジェクトを見る <span>↗</span>'
  };
  const syncCta = () => {
    if (!cta) return;
    const lang = document.documentElement.lang || localStorage.getItem('portfolio-lang') || 'ru';
    cta.innerHTML = ctaLabels[lang] || ctaLabels.ru;
  };

  document.querySelectorAll('.lang').forEach(button => {
    button.addEventListener('click', () => setTimeout(syncCta, 0));
  });
  syncCta();

  // Mobile navigation: one source of truth for open/close state.
  const menu = document.getElementById('mobileNav');
  const toggle = document.getElementById('menuToggle');
  const close = document.getElementById('mobileClose');

  const closeMenu = () => {
    document.body.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-hidden', 'true');
  };

  const openMenu = () => {
    document.body.classList.add('menu-open');
    toggle?.setAttribute('aria-expanded', 'true');
    menu?.setAttribute('aria-hidden', 'false');
  };

  toggle?.addEventListener('click', () => {
    document.body.classList.contains('menu-open') ? closeMenu() : openMenu();
  });
  close?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  // Add lightweight visual markers without putting content or navigation behind them.
  document.querySelectorAll('.project').forEach((card, index) => {
    const marker = document.createElement('span');
    marker.className = 'visual-sticker visual-sticker--round';
    marker.textContent = `0${index + 1}`;
    marker.setAttribute('aria-hidden', 'true');
    card.appendChild(marker);
    marker.style.top = '150px';
    marker.style.right = '16px';
  });
})();
