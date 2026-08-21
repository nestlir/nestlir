const projects = [
  {name:'DataVac', type:'frontend product', tags:['Next.js','TypeScript','Tailwind'], text:'Информационный продукт с поиском, фильтрацией, API-интеграцией, каталогом вакцин, платежным сценарием и генерацией PDF.', repo:'https://github.com/DataVac-masterskaya/data-vac-frontend', detail:'Командный frontend-проект: работа с реальными API, mapper-логикой, сложными таблицами, поиском, фильтрами, CloudPayments, PDF и E2E.'},
  {name:'Furniture Store', type:'frontend product', tags:['HTML','SCSS','JavaScript'], text:'Премиальный мебельный шоурум с каталогом, фильтрами, заявкой покупателя и демо-кабинетом продавца.', repo:'https://github.com/nestlir/Furniture_Store_Ru', detail:'Самостоятельный product-style кейс с responsive UI, SEO, Schema.org, GitHub Pages и локальным MVP кабинета продавца.'},
  {name:'Story OS', type:'fullstack ai', tags:['Python','Telegram','OpenAI'], text:'AI-ассистент для структурирования вымышленных миров, персонажей, событий и сюжетных линий.', repo:'https://github.com/nestlir/story-os-bot-1.0', detail:'Продуктовый AI-кейс: Telegram-first интерфейс, SQLite persistence, аналитический слой и дисциплина FACT / INFERENCE / SUGGESTION.'},
  {name:'Multimodal AI', type:'fullstack ai', tags:['Python','React','Docker'], text:'Мультимодальное приложение для обработки текста, голоса и изображений через набор сервисов.', repo:'https://github.com/nestlir/multimodal-ai-app', detail:'Архитектурный кейс с microservices, API gateway, Redis, Docker/Kubernetes и несколькими AI-провайдерами.'},
  {name:'Stellar Burger', type:'frontend', tags:['React','Redux','API'], text:'Приложение для заказа бургеров с авторизацией, конструктором и личным кабинетом.', repo:'https://github.com/nestlir/stellar-burger', detail:'React application с глобальным состоянием, маршрутизацией, API и пользовательскими сценариями заказа.'},
  {name:'Web Larek', type:'fullstack', tags:['TypeScript','Express','MongoDB'], text:'E-commerce приложение с frontend, backend и административными сценариями.', repo:'https://github.com/nestlir/web-larek-frontend', detail:'Кейс, показывающий TypeScript frontend, API-взаимодействие и понимание full-stack границы приложения.'},
  {name:'Mesto', type:'frontend', tags:['React','REST API','CSS'], text:'Социальный интерфейс с профилем, карточками, лайками и модальными сценариями.', repo:'https://github.com/nestlir/mesto-project-ff', detail:'Практика React state, controlled forms, REST API и декомпозиции интерфейса.'},
  {name:'Blog Customizer', type:'frontend', tags:['React','TypeScript','Forms'], text:'Конфигурируемый интерфейс статьи с настройкой визуальных параметров.', repo:'https://github.com/nestlir/blog-customizer', detail:'Кейс на state modeling, формы, reusable UI и управляемые настройки отображения.'},
  {name:'Оно тебе надо', type:'frontend', tags:['HTML','CSS','Responsive'], text:'Editorial landing page с акцентом на типографику, композицию и адаптивность.', repo:'https://github.com/nestlir/ono-tebe-nado', detail:'Сильный кейс по frontend fundamentals: semantic HTML, Grid/Flexbox и pixel-accurate responsive layout.'}
];

const grid = document.getElementById('projectGrid');
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');

function render(filter='all') {
  const list = filter==='all' ? projects : projects.filter(p => p.type.includes(filter));
  grid.innerHTML = list.map((p,i)=>`<article class="project"><div><span class="project-num">${String(i+1).padStart(2,'0')}</span><h3>${p.name}</h3><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><p>${p.text}</p></div><button class="project-link" data-project="${projects.indexOf(p)}">Подробнее ↗</button></article>`).join('');
  grid.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>openProject(Number(btn.dataset.project))));
}
function openProject(index){
  const p=projects[index];
  modalContent.innerHTML=`<span class="eyebrow">Selected project</span><h2>${p.name}</h2><div class="tags">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div><p>${p.detail}</p><a class="button" href="${p.repo}" target="_blank" rel="noreferrer">Открыть репозиторий ↗</a>`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.querySelector('.modal-backdrop').addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
document.getElementById('themeToggle').addEventListener('click',()=>document.body.classList.toggle('dark'));
render();
