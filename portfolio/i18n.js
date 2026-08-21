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

  const FRONTEND_COPY = {
    ru: {
      'hero.title':'Анастасия<br><em>Frontend Developer</em>',
      'hero.text':'Собираю интерфейсы, которые хочется рассматривать. Превращаю данные, идеи и сложные сценарии в живые digital-продукты.',
      'hero.cta':'Смотреть проекты', 'about.title':'Разрабатываю интерфейсы, которыми <em>приятно пользоваться.</em>',
      'about.p1':'Мой основной фокус — frontend-разработка на React и TypeScript. Но я люблю смотреть шире кода: на историю пользователя, атмосферу продукта, визуальный ритм и то, что остаётся в памяти после взаимодействия.',
      'about.p2':'Поэтому в моих проектах рядом существуют API, компоненты, анимации, Figma, AI, странные идеи и аккуратная инженерия.',
      'projects.title':'Проекты', 'projects.text':'Продуктовые интерфейсы, AI, full-stack эксперименты и frontend-кейсы — без скучных презентаций.',
      'manifesto.title':'Это то,<br>как продукт<br><em>разговаривает.</em>', 'manifesto.text':'Я люблю интерфейсы с характером — но характер никогда не должен мешать пользователю.',
      'manifesto.side':'Текстуры, сладкие акценты, мемы, аниме-настроение и pop-culture — не ради шума, а чтобы создавать эмоциональную память.',
      'skills.title':'Что у меня в арсенале', 'experience.title':'От интерфейса<br>до <em>продукта.</em>', 'contact.title':'Есть идея?<br><em>Давайте сделаем.</em>',
      'contact.text':'Открыта к frontend, product и full-stack задачам, где можно приносить пользу, экспериментировать и расти вместе с командой.', 'contact.email':'Написать мне ↗'
    },
    en: {
      'hero.title':'Anastasia<br><em>Frontend Developer</em>', 'hero.text':'I build interfaces worth exploring. I turn data, ideas and complex flows into living digital products.', 'hero.cta':'View projects',
      'about.title':'I build interfaces that feel <em>good to use.</em>', 'about.p1':'My focus is frontend development with React and TypeScript. I also look beyond code: user stories, product atmosphere, visual rhythm and what stays after an interaction.', 'about.p2':'That is why my projects bring together APIs, components, motion, Figma, AI, strange ideas and careful engineering.',
      'projects.title':'Projects', 'projects.text':'Product interfaces, AI, full-stack experiments and frontend cases without the boring presentation.',
      'manifesto.title':'It is how<br>a product<br><em>speaks.</em>', 'manifesto.text':'I like interfaces with character, but character should never get in the user\'s way.', 'manifesto.side':'Textures, sweet accents, memes, anime mood and pop culture are here to create emotional memory, not noise.',
      'skills.title':'What I bring', 'experience.title':'From interface<br>to <em>product.</em>', 'contact.title':'Have an idea?<br><em>Let\'s make it.</em>', 'contact.text':'Open to frontend, product and full-stack work where I can contribute, experiment and grow with a team.', 'contact.email':'Write to me ↗'
    },
    ja: {
      'hero.title':'アナスタシア<br><em>Frontend Developer</em>', 'hero.text':'見ていたくなるインターフェースを作ります。データ、アイデア、複雑なフローを生きたデジタルプロダクトへ変えます。', 'hero.cta':'プロジェクトを見る',
      'about.title':'使うことが <em>心地よい</em> インターフェースを作ります。', 'about.p1':'ReactとTypeScriptによるフロントエンド開発が中心です。コードだけでなく、ユーザーストーリー、プロダクトの空気、視覚のリズムまで考えます。', 'about.p2':'だからプロジェクトにはAPI、コンポーネント、モーション、Figma、AI、遊び心、丁寧なエンジニアリングがあります。',
      'projects.title':'プロジェクト', 'projects.text':'プロダクトUI、AI、フルスタック実験、フロントエンドのケースを紹介します。',
      'manifesto.title':'プロダクトが<br><em>語る</em><br>方法です。', 'manifesto.text':'個性のあるUIが好きですが、個性がユーザーの邪魔になってはいけません。', 'manifesto.side':'テクスチャ、甘いアクセント、ミーム、アニメのムードは、ノイズではなく感情の記憶を作るために使います。',
      'skills.title':'できること', 'experience.title':'インターフェース<br>から <em>プロダクトへ。</em>', 'contact.title':'アイデアがありますか？<br><em>一緒に作りましょう。</em>', 'contact.text':'Frontend、Product、Full-stackの仕事で、チームに貢献しながら成長していきたいです。', 'contact.email':'メールを送る ↗'
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
    const chaos = $('#chaosToggle');
    if (chaos) {
      const enabled = document.body.classList.contains('chaos-mode') || document.body.classList.contains('chaos');
      chaos.textContent = enabled ? (mode === 'fullstack' ? 'RESET CHAOS ✦' : copy.chaosOff) : copy.chaos;
    }
    const theme = $('#themeToggle'); theme?.setAttribute('aria-label', copy.theme);
    $$('.filter').forEach((button, i) => { if (copy.filters[i]) button.textContent = copy.filters[i]; });
    if (mode === 'frontend') {
      const pageCopy = FRONTEND_COPY[safeLang];
      $$('[data-i18n], [data-i18n-html]').forEach((element) => {
        const value = pageCopy[element.dataset.i18n || element.dataset.i18nHtml];
        if (value === undefined) return;
        if (element.hasAttribute('data-i18n-html')) element.innerHTML = value;
        else element.textContent = value;
      });
    }
    window.setPortfolioLanguage?.(safeLang);
    window.setFullstackLanguage?.(safeLang);
    store.set('portfolio-lang', safeLang);
  };

  $$('.lang').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  applyLanguage(store.get('portfolio-lang', 'ru'));
  window.PortfolioI18n = Object.freeze({ applyLanguage });
})();
