(() => {
  'use strict';
  const projects = [
    { id:'datavac', type:'team', number:'01', title:'DataVac', field:'TEAM PROJECT', tags:['Frontend','Vaccination'], repo:'https://github.com/DataVac-masterskaya/data-vac-frontend', ru:{summary:'Командный информационный продукт. Мой вклад — frontend-задачи в модуле вакцинации.', note:'Остальные части продукта и командные технологии не приписываю себе.'}, en:{summary:'Team information product. My contribution was frontend work in the vaccination module.', note:'Other product areas and team technologies are not presented as my individual work.'} },
    { id:'furniture', type:'assisted', number:'02', title:'Furniture Store', field:'AI-ASSISTED', tags:['Product brief','AI-assisted'], repo:'https://github.com/nestlir/Furniture_Store_Ru', ru:{summary:'Эксперимент с мебельным магазином, созданный с помощью ИИ по моим требованиям и направлениям.', note:'Отдельно показываю постановку задачи и AI-assisted формат работы.'}, en:{summary:'An AI-assisted furniture store experiment shaped by my requirements and creative direction.', note:'The project brief and AI-assisted nature of the work are stated clearly.'} },
    { id:'larek', type:'study', number:'03', title:'Web Larek', field:'STUDY PROJECT', tags:['TypeScript','E-commerce'], repo:'https://github.com/nestlir/web-larek-frontend', ru:{summary:'Учебный проект по заданию: интерфейс интернет-магазина и работа с каталогом.'}, en:{summary:'Educational assignment: an online shop interface and product catalog.'} },
    { id:'burger', type:'study', number:'04', title:'Stellar Burger', field:'STUDY PROJECT', tags:['React','Redux'], repo:'https://github.com/nestlir/stellar-burger', ru:{summary:'Учебный проект по заданию: интерфейс сборки заказа и каталог ингредиентов.'}, en:{summary:'Educational assignment: an order builder interface and ingredient catalog.'} },
    { id:'mesto', type:'study', number:'05', title:'Mesto', field:'STUDY PROJECT', tags:['React','Forms'], repo:'https://github.com/nestlir/mesto-project-ff', ru:{summary:'Учебный проект по заданию: профиль и коллекция карточек с пользовательскими действиями.'}, en:{summary:'Educational assignment: a profile and card collection with user interactions.'} },
    { id:'blog', type:'study', number:'06', title:'Blog Customizer', field:'STUDY PROJECT', tags:['React','TypeScript'], repo:'https://github.com/nestlir/blog-customizer', ru:{summary:'Учебный проект по заданию: интерфейс статьи с настраиваемыми параметрами оформления.'}, en:{summary:'Educational assignment: an article interface with configurable display settings.'} },
    { id:'ono', type:'study', number:'07', title:'Оно тебе надо', field:'STUDY PROJECT', tags:['HTML','CSS'], repo:'https://github.com/nestlir/ono-tebe-nado', ru:{summary:'Учебный проект по заданию: адаптивная редакционная страница и типографическая композиция.'}, en:{summary:'Educational assignment: a responsive editorial page and typographic composition.'} }
  ];
  const dictionary = {
    ru: {
      'nav.work':'Работы','nav.approach':'Подход','nav.about':'Обо мне','nav.contact':'Контакт',
      'hero.eyebrow':'НЕЗАВИСИМАЯ РАЗРАБОТЧИЦА · МОСКВА','hero.title':'Цифровые<br>вещи с <em>человеческим</em><br>масштабом.','hero.intro':'Я Анастасия. Собираю ясные интерфейсы и продумываю детали, которые помогают людям уверенно двигаться по продукту.','hero.cta':'Смотреть избранное','hero.mail':'Написать мне ↗','hero.note':'Заметки о работе с интерфейсами и продуктами',
      'work.label':'ИЗБРАННЫЕ РАБОТЫ','work.title':'Полевой архив','work.intro':'Небольшая подборка проектов. Роль и контекст указаны прямо — чтобы было понятно, что именно стоит за каждой работой.',
      'filter.all':'Все','filter.team':'Командный проект','filter.assisted':'С помощью ИИ','filter.study':'Учебные',
      'approach.label':'РАБОЧИЕ ПРИНЦИПЫ','approach.title':'Хороший интерфейс<br>сначала <em>понятен.</em>','approach.one.title':'Слушать контекст','approach.one.text':'Разобраться в задаче, людях и ограничениях до выбора решения.','approach.two.title':'Упростить путь','approach.two.text':'Убрать лишние шаги, назвать вещи привычными словами, показать следующий ход.','approach.three.title':'Проверить детали','approach.three.text':'Продумать состояния, клавиатурную навигацию и поведение на маленьком экране.',
      'about.label':'НЕМНОГО ОБО МНЕ','about.title':'Внимание к людям.<br>Любопытство к системам.','about.text':'Мне близка frontend-разработка на стыке визуальной культуры и инженерного мышления. В командной работе я предпочитаю ясно обозначать свою зону ответственности и показывать, чему научилась на практике.','about.note':'Каждый проект — точка на карте. Важен и маршрут, и то, что он помог понять.',
      'contact.title':'Есть задача?<br><em>Давайте обсудим.</em>','contact.text':'Открыта к интересным командам и осмысленным цифровым продуктам.','footer.note':'Сделано внимательно','footer.top':'Наверх ↑','card.open':'Открыть репозиторий ↗','card.note':'Вклад описан отдельно от контекста проекта.','results':'ПРОЕКТОВ'
    },
    en: {
      'nav.work':'Work','nav.approach':'Approach','nav.about':'About','nav.contact':'Contact',
      'hero.eyebrow':'INDEPENDENT DEVELOPER · MOSCOW','hero.title':'Digital<br>things with a <em>human</em><br>scale.','hero.intro':'I’m Anastasia. I build clear interfaces and sweat the details that help people move through a product with confidence.','hero.cta':'Explore selected work','hero.mail':'Get in touch ↗','hero.note':'Field notes on interfaces and products',
      'work.label':'SELECTED WORK','work.title':'Field archive','work.intro':'A small selection of projects. Role and context are stated plainly, so you can see what each piece represents.',
      'filter.all':'All','filter.team':'Team project','filter.assisted':'AI-assisted','filter.study':'Study projects',
      'approach.label':'WORKING PRINCIPLES','approach.title':'A good interface<br>is first <em>understood.</em>','approach.one.title':'Listen to context','approach.one.text':'Understand the task, people and constraints before choosing a solution.','approach.two.title':'Make the path clear','approach.two.text':'Remove extra steps, use familiar words and make the next move visible.','approach.three.title':'Check the details','approach.three.text':'Think through states, keyboard navigation and small-screen behaviour.',
      'about.label':'A LITTLE ABOUT ME','about.title':'Care for people.<br>Curiosity about systems.','about.text':'I’m drawn to frontend work where visual culture meets engineering. In team settings, I prefer to state my own responsibilities clearly and show what I have learned through practice.','about.note':'Each project is a point on the map. The route matters, as does what it helps us understand.',
      'contact.title':'Have a challenge?<br><em>Let’s talk.</em>','contact.text':'Open to thoughtful teams and meaningful digital products.','footer.note':'Made with care','footer.top':'Back to top ↑','card.open':'View repository ↗','card.note':'My contribution is distinct from the project context.','results':'PROJECTS'
    }
  };
  const projectGrid = document.getElementById('projectGrid');
  const resultsCount = document.getElementById('resultsCount');
  let language = 'ru';
  let filter = 'all';
  const text = (key) => dictionary[language][key] || dictionary.ru[key] || key;
  const safeGet = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const safeSet = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  function make(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (value !== undefined) el.textContent = value;
    return el;
  }
  function renderProjects() {
    const visible = projects.filter((project) => filter === 'all' || project.type === filter);
    projectGrid.replaceChildren();
    visible.forEach((project) => {
      const card = make('article', 'project-card');
      card.dataset.kind = project.type;
      const visual = make('div', 'project-visual art-' + project.number);
      visual.setAttribute('aria-hidden', 'true');
      visual.append(make('span', 'visual-coordinate', project.number + ' / NESTLIR'));
      visual.append(make('span', 'visual-glyph', project.number === '01' ? '⌁' : project.number === '02' ? '◌' : '✳'));
      visual.append(make('span', 'visual-caption', project.title.toUpperCase()));
      const content = make('div', 'project-copy');
      const meta = make('div', 'project-meta');
      meta.append(make('span', 'project-field', language === 'ru' ? ({team:'КОМАНДНЫЙ ПРОЕКТ',assisted:'AI-ASSISTED',study:'УЧЕБНЫЙ ПРОЕКТ'}[project.type]) : project.field));
      meta.append(make('span', 'project-number', project.number));
      const title = make('h3', '', project.title);
      const summary = make('p', 'project-summary', project[language].summary);
      const tags = make('ul', 'tag-list');
      project.tags.forEach((tag) => tags.append(make('li', '', tag)));
      const note = project[language].note ? make('p','contribution-note',project[language].note) : make('p','contribution-note',text('card.note'));
      const link = make('a', 'project-link', text('card.open'));
      link.href = project.repo; link.target = '_blank'; link.rel = 'noopener noreferrer';
      content.append(meta,title,summary,tags,note,link);
      card.append(visual,content); projectGrid.append(card);
    });
    resultsCount.textContent = String(visible.length).padStart(2,'0') + ' ' + text('results');
  }
  function applyLanguage(next) {
    language = next === 'en' ? 'en' : 'ru';
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n-html]').forEach((el) => { const value = dictionary[language][el.dataset.i18nHtml]; if (value !== undefined) el.innerHTML = value; });
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dictionary[language][el.dataset.i18n];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = dictionary[language][el.dataset.i18nHtml];
      if (value !== undefined) el.innerHTML = value;
    });
    document.querySelectorAll('[data-lang]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    applyFilter(filter);
    renderProjects();
    safeSet('portfolio-language', language);
  }
  function applyFilter(next) {
    filter = next;
    document.querySelectorAll('[data-filter]').forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle('is-active',active);
      button.setAttribute('aria-pressed',String(active));
    });
    renderProjects();
  }
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  document.querySelectorAll('[data-lang]').forEach((button) => button.addEventListener('click', () => applyLanguage(button.dataset.lang)));
  const savedLanguage = safeGet('portfolio-language','ru');
  applyLanguage(savedLanguage);
  const themeToggle = document.getElementById('themeToggle');
  const setTheme = (dark) => {
    document.body.classList.toggle('dark',dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-pressed',String(dark));
    themeToggle.setAttribute('aria-label',dark ? (language === 'ru' ? 'Включить светлую тему' : 'Switch to light theme') : (language === 'ru' ? 'Включить тёмную тему' : 'Switch to dark theme'));
  };
  setTheme(safeGet('portfolio-theme','light') === 'dark');
  themeToggle.addEventListener('click',() => {
    const dark = !document.body.classList.contains('dark');
    setTheme(dark); safeSet('portfolio-theme',dark ? 'dark' : 'light');
  });
  const menuButton = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  function setMenu(open) {
    menuButton.setAttribute('aria-expanded',String(open));
    menuButton.setAttribute('aria-label',open ? (language === 'ru' ? 'Закрыть меню' : 'Close menu') : (language === 'ru' ? 'Открыть меню' : 'Open menu'));
    mobileNav.hidden = !open;
    document.body.classList.toggle('menu-open',open);
    if (open) mobileNav.querySelector('a').focus();
    else menuButton.focus();
  }
  menuButton.addEventListener('click',() => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click',() => { mobileNav.hidden = true; menuButton.setAttribute('aria-expanded','false'); document.body.classList.remove('menu-open'); }));
  document.addEventListener('keydown',(event) => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') setMenu(false); });
})();