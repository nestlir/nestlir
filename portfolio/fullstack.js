const projects=[
{id:'storyos',name:'Story OS',kind:'AI / FULL-STACK',tags:['Python','Telegram','OpenAI'],scope:['bot UX','persistence','analytics','AI product'],layer:'APPLICATION',text:'AI-ассистент для структурирования миров, персонажей, событий и сюжетных линий.',repo:'https://github.com/nestlir/story-os-bot-1.0'},
{id:'multimodal',name:'Multimodal AI',kind:'AI / FULL-STACK',tags:['Python','React','Docker'],scope:['architecture','API gateway','services','AI integrations'],layer:'ARCHITECTURE',text:'Мультимодальное приложение для обработки текста, голоса и изображений через набор сервисов.',repo:'https://github.com/nestlir/multimodal-ai-app'},
{id:'larek',name:'Web Larek / Express',kind:'FULL-STACK',tags:['TypeScript','Express','REST'],scope:['client/server seam','API requests','data contracts','debugging'],layer:'INTEGRATION',text:'E-commerce система, где главный инженерный вопрос — надёжный путь от действия в UI к серверному ответу и обратно.',repo:'https://github.com/nestlir/web-larek-express'},
{id:'datavac',name:'DataVac',kind:'FRONTEND / API',tags:['Next.js','TypeScript','API'],scope:['API integration','forms','payments','PDF','E2E'],layer:'CLIENT',text:'Информационный продукт с каталогом, поиском, фильтрацией, API-интеграцией и сложными пользовательскими сценариями.',repo:'https://github.com/DataVac-masterskaya/data-vac-frontend'},
{id:'mesto',name:'Mesto',kind:'FRONTEND / API',tags:['React','REST API','CSS'],scope:['state','forms','REST API','component decomposition'],layer:'CLIENT',text:'Практический кейс по React state, controlled forms, REST API и декомпозиции интерфейса.',repo:'https://github.com/nestlir/mesto-project-ff'}
];

const grid=document.getElementById('fsProjectGrid');
const modal=document.getElementById('fsModal');
const modalContent=document.getElementById('fsModalContent');
const modalClose=document.getElementById('fsModalClose');

function render(filter='ALL'){
  const list=projects.filter(p=>filter==='ALL'||p.kind.includes(filter));
  grid.innerHTML=list.map((p,index)=>`<article class="fs-project-card"><div class="fs-project-art project-art-${(index%4)+1}"><span class="project-index">0${index+1}</span><span class="project-layer">${p.layer}</span><div class="project-wire"></div></div><div class="fs-project-content"><small>${p.kind}</small><h3>${p.name}</h3><p>${p.text}</p><div class="fs-project-role"><strong>MY OWNERSHIP</strong><ul>${p.scope.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="fs-project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><button class="fs-project-open" data-id="${p.id}">OPEN CASE ↗</button></div></article>`).join('');
  grid.querySelectorAll('.fs-project-open').forEach(btn=>btn.addEventListener('click',()=>open(btn.dataset.id)));
}

function open(id){
  const p=projects.find(x=>x.id===id); if(!p)return;
  modalContent.innerHTML=`<div class="fs-modal-media project-art-${projects.indexOf(p)%4+1}"><div class="modal-system-label">SYSTEM / ${p.layer}</div></div><div class="fs-modal-copy"><span class="fs-label">CASE / ${p.kind}</span><h2>${p.name}</h2><p class="fs-role"><strong>WHAT I OWNED</strong><br>${p.scope.join(' · ')}</p><p>${p.text}</p><div class="fs-modal-architecture"><span>CLIENT</span><i>→</i><span>API</span><i>→</i><span>SERVICE</span><i>→</i><span>DATA</span><i>→</i><span>SHIP</span></div><div class="fs-project-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><a class="fs-button fs-button-accent" href="${p.repo}" target="_blank" rel="noreferrer">Open repository ↗</a></div>`;
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
