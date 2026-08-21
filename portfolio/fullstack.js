const projects=[
  {id:'datavac',name:'DataVac',kind:'frontend',image:'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85',tags:['Next.js','TypeScript','API'],scope:['UI architecture','API integration','forms','payments','PDF','E2E'],text:'Информационный продукт с каталогом, поиском, фильтрацией и API-интеграцией.',repo:'https://github.com/DataVac-masterskaya/data-vac-frontend'},
  {id:'mesto',name:'Mesto',kind:'frontend',image:'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1400&q=85',tags:['React','REST API','CSS'],scope:['React state','controlled forms','REST API','UI decomposition'],text:'Практика React state, controlled forms, REST API и декомпозиции интерфейса.',repo:'https://github.com/nestlir/mesto-project-ff'},
  {id:'storyos',name:'Story OS',kind:'ai fullstack',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',tags:['Python','Telegram','OpenAI'],scope:['AI product','bot flows','persistence','analytics'],text:'AI-ассистент для структурирования миров, персонажей и сюжетных линий.',repo:'https://github.com/nestlir/story-os-bot-1.0'},
  {id:'multimodal',name:'Multimodal AI',kind:'ai fullstack',image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85',tags:['Python','React','Docker'],scope:['architecture','API gateway','services','AI integrations'],text:'Мультимодальное приложение для текста, голоса и изображений.',repo:'https://github.com/nestlir/multimodal-ai-app'},
  {id:'larek',name:'Web Larek / Express',kind:'fullstack',image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',tags:['Node.js','Express','REST'],scope:['client/server seam','API requests','data contracts','debugging'],text:'Учебная full-stack система, где основная инженерная задача — надёжный путь от UI-действия к серверному ответу.',repo:'https://github.com/nestlir/web-larek-express'},
  {id:'burger',name:'Stellar Burger',kind:'frontend',image:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=85',tags:['React','Redux','API'],scope:['React UI','state','routing','API'],text:'Приложение для заказа бургеров с авторизацией и личным кабинетом.',repo:'https://github.com/nestlir/stellar-burger'}
];

const grid=document.getElementById('fsProjectGrid');
const modal=document.getElementById('fsModal');
const modalContent=document.getElementById('fsModalContent');
const modalClose=document.getElementById('fsModalClose');

function render(filter='all'){
  const list=projects.filter(p=>filter==='all'||p.kind.includes(filter));
  grid.innerHTML=list.map(p=>`<article class="fs-project-card"><div class="fs-project-art" style="background-image:url('${p.image}')"></div><div class="fs-project-content"><small>${p.kind.toUpperCase()}</small><h3>${p.name}</h3><p>${p.text}</p><div class="fs-project-role"><strong>MY SCOPE</strong><ul>${p.scope.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="fs-project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><button class="fs-project-open" data-id="${p.id}">OPEN CASE ↗</button></div></article>`).join('');
  grid.querySelectorAll('.fs-project-open').forEach(btn=>btn.addEventListener('click',()=>open(btn.dataset.id)));
}

function open(id){
  const p=projects.find(x=>x.id===id); if(!p)return;
  modalContent.innerHTML=`<div class="fs-modal-media" style="background-image:url('${p.image}')"></div><div class="fs-modal-copy"><span class="fs-label">SELECTED WORK / ${p.kind.toUpperCase()}</span><h2>${p.name}</h2><p class="fs-role"><strong>WHAT I OWNED</strong><br>${p.scope.join(' · ')}</p><p>${p.text}</p><div class="fs-modal-map"><span>CLIENT</span><i>→</i><span>API</span><i>→</i><span>SERVICE</span><i>→</i><span>DATA</span><i>→</i><span>SHIP</span></div><div class="fs-project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="fs-button fs-button-accent" href="${p.repo}" target="_blank" rel="noreferrer">Open repository ↗</a></div>`;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}

document.querySelectorAll('.fs-filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.fs-filters button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
modalClose.addEventListener('click',close);modal.querySelector('.fs-modal-bg').addEventListener('click',close);

document.addEventListener('keydown',e=>{if(e.key==='Escape'){close();closeMenu()}});
const menu=document.getElementById('fsMobile');const menuBtn=document.getElementById('fsMenuBtn');const menuClose=document.getElementById('fsMenuClose');
function openMenu(){menu.classList.add('open');menu.setAttribute('aria-hidden','false');menuBtn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden'}
function closeMenu(){menu.classList.remove('open');menu.setAttribute('aria-hidden','true');menuBtn.setAttribute('aria-expanded','false');if(!modal.classList.contains('open'))document.body.style.overflow=''}
menuBtn.addEventListener('click',openMenu);menuClose.addEventListener('click',closeMenu);menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));

let targetX=0,targetY=0,currentX=0,currentY=0;const cursor=document.getElementById('fsCursor');
window.addEventListener('pointermove',e=>{targetX=e.clientX;targetY=e.clientY},{passive:true});
function animateCursor(){currentX+=(targetX-currentX)*.2;currentY+=(targetY-currentY)*.2;if(cursor){cursor.style.left=currentX+'px';cursor.style.top=currentY+'px'}requestAnimationFrame(animateCursor)}
if(cursor&&window.matchMedia('(pointer:fine)').matches)animateCursor();

document.querySelectorAll('a,button').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'))});

const sections=[...document.querySelectorAll('main section[id]')];const links=[...document.querySelectorAll('.fs-nav a')];
const activeObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;links.forEach(link=>link.classList.toggle('is-active',link.hash===`#${entry.target.id}`))})},{rootMargin:'-40% 0px -52% 0px'});sections.forEach(section=>activeObserver.observe(section));

render();