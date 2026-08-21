const PROJECTS = [
  {name:'DataVac',type:'frontend product',tags:['Next.js','TypeScript','Tailwind'],image:'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85',text:{ru:'Информационный продукт с поиском, фильтрацией, API-интеграцией, каталогом вакцин, платежным сценарием и генерацией PDF.',en:'Information product with search, filtering, API integration, vaccine catalog, payments and PDF generation.',ja:'検索・フィルター・API連携・ワクチンカタログ・決済・PDF生成を備えた情報プロダクト。'},detail:{ru:'Командный frontend-проект: реальные API, mapper-логика, сложные таблицы, поиск, фильтры, CloudPayments, PDF и E2E.',en:'Team frontend project with real APIs, mapper logic, complex tables, search, filters, CloudPayments, PDF and E2E.',ja:'実API、mapperロジック、複雑なテーブル、検索、フィルター、CloudPayments、PDF、E2Eを扱うチーム開発。'},repo:'https://github.com/DataVac-masterskaya/data-vac-frontend'},
  {name:'Furniture Store',type:'frontend product',tags:['HTML','SCSS','JavaScript'],image:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85',text:{ru:'Премиальный мебельный шоурум с каталогом, фильтрами, заявкой покупателя и демо-кабинетом продавца.',en:'Premium furniture showroom with catalog, filters, lead form and a demo seller dashboard.',ja:'カタログ、フィルター、問い合わせフォーム、販売員向けデモ画面を備えた家具ショールーム。'},detail:{ru:'Самостоятельный product-style кейс с responsive UI, SEO, Schema.org, GitHub Pages и локальным MVP кабинета продавца.',en:'Independent product-style case with responsive UI, SEO, Schema.org, GitHub Pages and a local seller-dashboard MVP.',ja:'レスポンシブUI、SEO、Schema.org、GitHub Pages、販売員ダッシュボードMVPを含む個人プロジェクト。'},repo:'https://github.com/nestlir/Furniture_Store_Ru'},
  {name:'Story OS',type:'fullstack ai',tags:['Python','Telegram','OpenAI'],image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',text:{ru:'AI-ассистент для структурирования вымышленных миров, персонажей, событий и сюжетных линий.',en:'AI assistant for structuring fictional worlds, characters, events and storylines.',ja:'架空の世界、キャラクター、出来事、ストーリーを整理するAIアシスタント。'},detail:{ru:'Продуктовый AI-кейс: Telegram-first интерфейс, SQLite persistence, аналитический слой и дисциплина FACT / INFERENCE / SUGGESTION.',en:'Product AI case with Telegram-first UX, SQLite persistence, an analytics layer and FACT / INFERENCE / SUGGESTION discipline.',ja:'Telegram中心のUX、SQLite永続化、分析レイヤー、FACT / INFERENCE / SUGGESTIONの設計規律を持つAIプロダクト。'},repo:'https://github.com/nestlir/story-os-bot-1.0'},
  {name:'Multimodal AI',type:'fullstack ai',tags:['Python','React','Docker'],image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85',text:{ru:'Мультимодальное приложение для обработки текста, голоса и изображений через набор сервисов.',en:'Multimodal application for text, voice and image processing across multiple services.',ja:'複数サービスを通じてテキスト、音声、画像を処理するマルチモーダルアプリ。'},detail:{ru:'Архитектурный кейс с microservices, API gateway, Redis, Docker/Kubernetes и несколькими AI-провайдерами.',en:'Architecture case using microservices, an API gateway, Redis, Docker/Kubernetes and multiple AI providers.',ja:'マイクロサービス、API Gateway、Redis、Docker/Kubernetes、複数AIプロバイダーを使ったアーキテクチャケース。'},repo:'https://github.com/nestlir/multimodal-ai-app'},
  {name:'Stellar Burger',type:'frontend',tags:['React','Redux','API'],image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=85',text:{ru:'Приложение для заказа бургеров с авторизацией, конструктором и личным кабинетом.',en:'Burger ordering application with authentication, constructor and personal account.',ja:'認証、バーガーコンストラクター、個人アカウントを備えた注文アプリ。'},detail:{ru:'React application с глобальным состоянием, маршрутизацией, API и пользовательскими сценариями заказа.',en:'React application with global state, routing, API integration and ordering flows.',ja:'グローバル状態、ルーティング、API連携、注文フローを備えたReactアプリ。'},repo:'https://github.com/nestlir/stellar-burger'},
  {name:'Web Larek',type:'fullstack',tags:['TypeScript','Express','MongoDB'],image:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85',text:{ru:'E-commerce приложение с frontend, backend и административными сценариями.',en:'E-commerce application with frontend, backend and administrative flows.',ja:'フロントエンド、バックエンド、管理者フローを備えたE-commerceアプリ。'},detail:{ru:'Кейс, показывающий TypeScript frontend, API-взаимодействие и понимание full-stack границы приложения.',en:'Case demonstrating TypeScript frontend engineering, API communication and full-stack boundaries.',ja:'TypeScriptフロントエンド、API通信、フルスタック境界への理解を示すケース。'},repo:'https://github.com/nestlir/web-larek-frontend'},
  {name:'Mesto',type:'frontend',tags:['React','REST API','CSS'],image:'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=85',text:{ru:'Социальный интерфейс с профилем, карточками, лайками и модальными сценариями.',en:'Social interface with profile, cards, likes and modal flows.',ja:'プロフィール、カード、いいね、モーダル操作を備えたソーシャルUI。'},detail:{ru:'Практика React state, controlled forms, REST API и декомпозиции интерфейса.',en:'Practice with React state, controlled forms, REST API and interface decomposition.',ja:'React state、controlled forms、REST API、UI分解を実践したケース。'},repo:'https://github.com/nestlir/mesto-project-ff'},
  {name:'Blog Customizer',type:'frontend',tags:['React','TypeScript','Forms'],image:'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=85',text:{ru:'Конфигурируемый интерфейс статьи с настройкой визуальных параметров.',en:'Configurable article interface with adjustable visual parameters.',ja:'ビジュアルパラメータを変更できるカスタマイズ可能な記事UI。'},detail:{ru:'Кейс на state modeling, формы, reusable UI и управляемые настройки отображения.',en:'Case focused on state modeling, forms, reusable UI and controlled display settings.',ja:'state modeling、フォーム、再利用可能UI、表示設定を扱うケース。'},repo:'https://github.com/nestlir/blog-customizer'},
  {name:'Оно тебе надо',type:'frontend',tags:['HTML','CSS','Responsive'],image:'https://images.unsplash.com/photo-1455885666463-19c48e1a9a39?auto=format&fit=crop&w=1400&q=85',text:{ru:'Editorial landing page с акцентом на типографику, композицию и адаптивность.',en:'Editorial landing page focused on typography, composition and responsive layout.',ja:'タイポグラフィ、構成、レスポンシブレイアウトを重視したEditorial landing page。'},detail:{ru:'Frontend fundamentals: semantic HTML, Grid/Flexbox и pixel-accurate responsive layout.',en:'Frontend fundamentals: semantic HTML, Grid/Flexbox and pixel-accurate responsive layout.',ja:'semantic HTML、Grid/Flexbox、精密なレスポンシブレイアウトを実践。'},repo:'https://github.com/nestlir/ono-tebe-nado'}
];

const I18N = {
  ru: {more:'Подробнее ↗',open:'Открыть репозиторий ↗',selected:'Selected project'},
  en: {more:'View project ↗',open:'Open repository ↗',selected:'Selected project'},
  ja: {more:'詳細を見る ↗',open:'リポジトリを開く ↗',selected:'Selected project'}
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const getState = (key, fallback) => { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } };
const setState = (key, value) => { try { localStorage.setItem(key, value); } catch {} };

const state = {
  lang: getState('frontend-lang', 'ru'),
  theme: getState('frontend-theme', 'light'),
  chaos: getState('frontend-chaos', 'false') === 'true',
  filter: 'all'
};

const modal = $('#projectModal');
const grid = $('#projectGrid');
const mobileNav = $('#mobileNav');
const body = document.body;

function applyTheme() {
  const dark = state.theme === 'dark';
  body.classList.toggle('dark', dark);
  $('#themeToggle')?.setAttribute('aria-pressed', String(dark));
  $('#themeToggle')?.setAttribute('title', dark ? 'Switch to light theme' : 'Switch to dark theme');
}

function applyChaos() {
  body.classList.toggle('chaos-mode', state.chaos);
  const button = $('#chaosToggle');
  button?.setAttribute('aria-pressed', String(state.chaos));
  if (button) button.textContent = state.chaos ? 'TURN IT OFF ✦' : 'MAKE IT WEIRD ✦';
}

function setMenu(open) {
  body.classList.toggle('menu-open', open);
  mobileNav?.classList.toggle('is-open', open);
  $('#menuToggle')?.setAttribute('aria-expanded', String(open));
  mobileNav?.setAttribute('aria-hidden', String(!open));
}

function translatePage(lang) {
  state.lang = I18N[lang] ? lang : 'ru';
  setState('frontend-lang', state.lang);
  document.documentElement.lang = state.lang;
  $$('.lang').forEach(button => button.classList.toggle('active', button.dataset.lang === state.lang));

  const translations = window.FRONTEND_TRANSLATIONS?.[state.lang];
  if (translations) {
    $$('[data-i18n]').forEach(node => {
      const value = translations[node.dataset.i18n];
      if (value != null) node.textContent = value;
    });
    $$('[data-i18n-html]').forEach(node => {
      const value = translations[node.dataset.i18nHtml];
      if (value != null) node.innerHTML = value;
    });
  }
  renderProjects(state.filter);
}

function renderProjects(filter = 'all') {
  state.filter = filter;
  const items = filter === 'all' ? PROJECTS : PROJECTS.filter(project => project.type.includes(filter));
  grid.innerHTML = items.map(project => `<article class="project"><div><span class="project-num">${String(PROJECTS.indexOf(project) + 1).padStart(2, '0')}</span><h3>${project.name}</h3><div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div><p>${project.text[state.lang]}</p></div><button class="project-link" type="button" data-project="${PROJECTS.indexOf(project)}">${I18N[state.lang].more}</button></article>`).join('');
}

function openProject(index) {
  const project = PROJECTS[index];
  if (!project || !modal) return;
  $('#modalContent').innerHTML = `<div class="popup-image"><img src="${project.image}" alt="${project.name}"><span>SELECTED / ${project.name.toUpperCase()}</span></div><div class="popup-copy"><span class="eyebrow">${I18N[state.lang].selected}</span><h2>${project.name}</h2><div class="tags">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div><p>${project.detail[state.lang]}</p><div class="system-map"><span>UI</span><i>→</i><span>API</span><i>→</i><span>DATA</span><i>→</i><span>SHIP</span></div><a class="button" href="${project.repo}" target="_blank" rel="noreferrer">${I18N[state.lang].open}</a></div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

function closeProject() {
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
}

function updateProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${max > 0 ? Math.min(100, window.scrollY / max * 100) : 0}%`;
}

function bindEvents() {
  $$('.lang').forEach(button => button.addEventListener('click', () => translatePage(button.dataset.lang)));
  $$('.filter').forEach(button => button.addEventListener('click', () => { $$('.filter').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderProjects(button.dataset.filter); }));
  grid?.addEventListener('click', event => { const button = event.target.closest('[data-project]'); if (button) openProject(Number(button.dataset.project)); });
  $('#themeToggle')?.addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; setState('frontend-theme', state.theme); applyTheme(); });
  $('#chaosToggle')?.addEventListener('click', () => { state.chaos = !state.chaos; setState('frontend-chaos', String(state.chaos)); applyChaos(); });
  $('#menuToggle')?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  $('#mobileClose')?.addEventListener('click', () => setMenu(false));
  $$('.mobile-nav-links a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  $('.modal-backdrop', modal)?.addEventListener('click', closeProject);
  $('#modalClose')?.addEventListener('click', closeProject);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { setMenu(false); closeProject(); }
  });
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress);
}

function bindPointerEffects() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const dot = $('.cursor-dot');
  const glow = $('.cursor-glow');
  window.addEventListener('pointermove', event => {
    if (dot) { dot.style.left = `${event.clientX}px`; dot.style.top = `${event.clientY}px`; }
    if (glow) { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; }
  }, {passive:true});
  $$('.magnetic').forEach(element => {
    element.addEventListener('pointermove', event => {
      const rect = element.getBoundingClientRect();
      element.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * .12}px,${(event.clientY - rect.top - rect.height / 2) * .12}px)`;
    });
    element.addEventListener('pointerleave', () => { element.style.transform = ''; });
  });
  $$('.tilt').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 6;
      const y = ((event.clientY - rect.top) / rect.height - .5) * -6;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-6px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

function boot() {
  applyTheme();
  applyChaos();
  bindEvents();
  bindPointerEffects();
  renderProjects('all');
  updateProgress();
}

document.addEventListener('DOMContentLoaded', boot);
