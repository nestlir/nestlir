(() => {
  'use strict';

  const DICTIONARY = {
    ru: {
      frontend: { nav:['Обо мне','Проекты','Навыки','Опыт','Контакты'], mode:'FULL-STACK', menu:'MENU / 01', menuLinks:['Обо мне','Проекты','Навыки','Опыт','Контакты','Full-stack портфолио'], chaos:'MAKE IT WEIRD ✦', chaosOff:'TURN IT OFF ✦', theme:'Переключить тему', filters:['Все','Frontend','Product','Full-stack','AI'] },
      fullstack: { nav:['Обо мне','Стек','Проекты','Инженерия','Опыт','Контакты'], mode:'FRONTEND', menu:'MENU / 01', menuLinks:['Обо мне','Стек','Проекты','Инженерия','Опыт','Контакты','Frontend портфолио'], chaos:'MAKE IT WEIRD ✦', chaosOff:'TURN IT OFF ✦', theme:'Переключить тему', filters:['Все','Frontend','Full-stack','AI'] }
    },
    en: {
      frontend: { nav:['About','Projects','Skills','Experience','Contact'], mode:'FULL-STACK', menu:'MENU / 01', menuLinks:['About','Projects','Skills','Experience','Contact','Full-stack portfolio'], chaos:'MAKE IT WEIRD ✦', chaosOff:'TURN IT OFF ✦', theme:'Toggle theme', filters:['All','Frontend','Product','Full-stack','AI'] },
      fullstack: { nav:['About','Stack','Projects','Engineering','Experience','Contact'], mode:'FRONTEND', menu:'MENU / 01', menuLinks:['About','Stack','Projects','Engineering','Experience','Contact','Frontend portfolio'], chaos:'MAKE IT WEIRD ✦', chaosOff:'TURN IT OFF ✦', theme:'Toggle theme', filters:['All','Frontend','Full-stack','AI'] }
    },
    ja: {
      frontend: { nav:['概要','プロジェクト','スキル','経験','連絡先'], mode:'FULL-STACK', menu:'MENU / 01', menuLinks:['概要','プロジェクト','スキル','経験','連絡先','Full-stack ポートフォリオ'], chaos:'MAKE IT WEIRD ✦', chaosOff:'TURN IT OFF ✦', theme:'テーマ切替', filters:['すべて','Frontend','Product','Full-stack','AI'] },
      fullstack: { nav:['概要','スタック','プロジェクト','エンジニアリング','経験','連絡先'], mode:'FRONTEND', menu:'MENU / 01', menuLinks:['概要','スタック','プロジェクト','エンジニアリング','経験','連絡先','Frontend ポートフォリオ'], chaos:'MAKE IT WEIRD ✦', chaosOff:'TURN IT OFF ✦', theme:'テーマ切替', filters:['すべて','Frontend','Full-stack','AI'] }
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mode = document.body.classList.contains('fullstack-page') ? 'fullstack' : 'frontend';
  const store = { get(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }, set(key, value) { try { localStorage.setItem(key, value); } catch {} } };

  const applyLanguage = (lang) => {
    const safeLang = DICTIONARY[lang] ? lang : 'ru';
    const copy = DICTIONARY[safeLang][mode];
    document.documentElement.lang = safeLang;
    $$('.lang').forEach((button) => button.classList.toggle('active', button.dataset.lang === safeLang));
    $$('.nav a').forEach((link, i) => { if (copy.nav[i]) link.textContent = copy.nav[i]; });
    $$('.mobile-nav-links a, .mobile-nav nav a').forEach((link, i) => { const label = link.querySelector('b'); if (label && copy.menuLinks[i]) label.textContent = copy.menuLinks[i]; });
    const menuTitle = $('.mobile-nav-head strong, .mobile-head b'); if (menuTitle) menuTitle.textContent = copy.menu;
    const switchTitle = $('.fullstack-switch strong'); if (switchTitle) switchTitle.textContent = copy.mode;
    const chaos = $('#chaosToggle'); if (chaos) chaos.textContent = document.body.classList.contains('chaos-mode') ? copy.chaosOff : copy.chaos;
    const theme = $('#themeToggle'); theme?.setAttribute('aria-label', copy.theme);

    $$('.filter').forEach((button, i) => { if (copy.filters[i]) button.textContent = copy.filters[i]; });
    if (window.setPortfolioLanguage) window.setPortfolioLanguage(safeLang);
    window.dispatchEvent(new CustomEvent('portfolio:language', { detail: safeLang }));
    store.set('portfolio-lang', safeLang);
  };

  $$('.lang').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  applyLanguage(store.get('portfolio-lang', 'ru'));
  window.PortfolioI18n = Object.freeze({ applyLanguage });
})();
