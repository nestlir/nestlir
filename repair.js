(() => {
  // Keep decorative styling isolated from the main layout stylesheet.
  if (!document.querySelector('link[data-visual-system]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './visual-system.css';
    link.dataset.visualSystem = 'true';
    document.head.appendChild(link);
  }

  // Full-stack positioning: the portfolio should communicate product ownership
  // across interface, API, data and deployment — not frontend-only work.
  document.body.classList.add('fullstack-mode');
  const stackStrip = document.createElement('section');
  stackStrip.className = 'fullstack-strip';
  stackStrip.setAttribute('aria-label', 'Full-stack capabilities');
  stackStrip.innerHTML = `
    <div class="fullstack-strip-label"><span>FULL-STACK / 00</span><b>from pixel to production</b></div>
    <div class="fullstack-layers">
      <span><i>01</i> UI / UX</span><span><i>02</i> API</span><span><i>03</i> SERVER</span><span><i>04</i> DATA</span><span><i>05</i> AUTH</span><span><i>06</i> DEPLOY</span>
    </div>
  `;
  const about = document.querySelector('#about');
  if (about && !document.querySelector('.fullstack-strip')) about.after(stackStrip);

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

  // Add a full-stack identity block to the Hero without changing the original HTML.
  const heroCopy = document.querySelector('.hero-copy');
  if (heroCopy && !heroCopy.querySelector('.fullstack-kicker')) {
    const kicker = document.createElement('div');
    kicker.className = 'fullstack-kicker';
    kicker.innerHTML = '<span>FULL-STACK DEVELOPER</span><b>frontend → backend → data → deployment</b>';
    heroCopy.insertBefore(kicker, heroCopy.querySelector('.eyebrow'));
  }

  const heroMeta = document.querySelector('.hero-meta');
  if (heroMeta) {
    heroMeta.dataset.fullstackMeta = 'true';
    heroMeta.innerHTML = '<span>React / Next.js</span><span>TypeScript / Node.js</span><span>REST API / PostgreSQL</span><span>Docker / CI/CD</span>';
  }

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
  toggle?.addEventListener('click', () => document.body.classList.contains('menu-open') ? closeMenu() : openMenu());
  close?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  // Add lightweight visual markers without putting content or navigation behind them.
  document.querySelectorAll('.project').forEach((card, index) => {
    if (card.querySelector('.visual-sticker')) return;
    const marker = document.createElement('span');
    marker.className = 'visual-sticker visual-sticker--round';
    marker.textContent = `0${index + 1}`;
    marker.setAttribute('aria-hidden', 'true');
    card.appendChild(marker);
    marker.style.top = '150px';
    marker.style.right = '16px';
  });
})();
