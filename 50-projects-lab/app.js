const folderNames = ['expanding-cards','progress-steps','rotating-nav-animation','hidden-search','blurry-loading','scroll-animation','split-landing-page','form-input-wave','sound-board','dad-jokes','event-keycodes','faq-collapse','random-choice-picker','animated-navigation','incrementing-counter','drink-water','movie-app','background-slider','theme-clock','button-ripple-effect','drag-n-drop','drawing-app','kinetic-loader','content-placeholder','sticky-navigation','double-vertical-slider','toast-notification','github-profiles','double-click-heart','auto-text-effect'];
const frontendProjects = [
  'Expanding Cards','Progress Steps','Rotating Navigation','Hidden Search','Blurry Loading','Scroll Animation','Split Landing Page','Form Wave','Sound Board','Dad Jokes','Event Keycodes','FAQ Collapse','Random Choice Picker','Animated Navigation','Incrementing Counter','Drink Water','Movie App','Background Slider','Theme Clock','Button Ripple Effect','Drag and Drop','Drawing App','Kinetic Loader','Content Placeholder','Sticky Navigation','Double Vertical Slider','Toast Notification','Github Profiles','Double Click Heart','Auto Text Effect'
].map((name, index) => ({ id: index + 1, name, folder: `${String(index + 1).padStart(2, '0')}-${folderNames[index]}`, kind: 'frontend' }));

const systems = [
  ['shell','Shell','Process creation, parsing and execution'],['hash-table','Hash Table','Hashing, buckets and collisions'],['tiny-database','Tiny Database','Storage pages and query flow'],['text-editor','Text Editor','Buffer and cursor model'],['tiny-compiler','Tiny Compiler','Lexer, parser, AST and bytecode'],['memory-allocator','Memory Allocator','Heap blocks and free list'],['virtual-machine','Virtual Machine','Fetch, decode and stack execution'],['http-server','HTTP Server','Socket, request and response lifecycle'],['tcp-chat-server','TCP Chat Server','Clients, sockets and broadcast'],['redis-clone','Redis Clone','RESP commands and persistence'],['chip8-emulator','CHIP-8 Emulator','CPU, memory, registers and display'],['tiny-raytracer','Tiny Raytracer','Rays, intersections and pixels'],['mini-kernel','Mini Kernel','Boot, entry point and kernel flow']
].map(([slug,name,description]) => ({ id: `sys-${slug}`, slug, name, description, kind: 'system' }));

const all = [...frontendProjects, ...systems];
const grid = document.querySelector('#grid');
const count = document.querySelector('#count');
const search = document.querySelector('#search');
let filter = 'All';

function createCard(project) {
  if (project.kind === 'system') return `<article class="card system-card"><div class="system-mark">C/C++</div><div class="card-body"><small>SYSTEMS LAB</small><h2>${project.name}</h2><p>${project.description}</p><div><button class="open" data-system="${project.slug}">Explore →</button><a href="./projects/c-cpp/${project.slug}/">Source →</a></div></div></article>`;
  return `<article class="card"><div class="thumb"><b>#${String(project.id).padStart(2,'0')}</b></div><div class="card-body"><small>FRONTEND LAB</small><h2>${project.name}</h2><div><a class="open" href="./projects/${project.folder}/index.html">Open project →</a></div></div></article>`;
}
function render() {
  const query = search.value.trim().toLowerCase();
  const list = all.filter(p => (filter === 'All' || filter === 'Frontend' && p.kind === 'frontend' || filter === 'Systems' && p.kind === 'system') && p.name.toLowerCase().includes(query));
  grid.innerHTML = list.map(createCard).join('');
  if (count) count.textContent = `${list.length} projects`;
  document.querySelectorAll('[data-system]').forEach(b => b.addEventListener('click', () => openSystem(b.dataset.system)));
}
function openSystem(slug) {
  const project = systems.find(p => p.slug === slug); if (!project) return;
  const flows = {shell:['Input','Parse','fork()','exec()','wait()'],'hash-table':['Key','Hash','Bucket','Lookup'],'tiny-database':['Query','Parser','Executor','B-tree','Page'],'text-editor':['Input','Buffer','Cursor','Render'],'tiny-compiler':['Source','Tokens','AST','Bytecode'],'memory-allocator':['Request','Heap','Block','Free list'],'virtual-machine':['Bytecode','Fetch','Decode','Stack'],'http-server':['Socket','Request','Route','Response'],'tcp-chat-server':['Client','select()','Broadcast','Clients'],'redis-clone':['Command','Parse','Store','Persist'],'chip8-emulator':['ROM','Fetch','Decode','Registers','Display'],'tiny-raytracer':['Ray','Intersection','Normal','Pixel'],'mini-kernel':['Boot','Entry','Memory','Scheduler']}[slug];
  const catalog = document.querySelector('#catalog'), app = document.querySelector('#app'); catalog.hidden = true;
  app.innerHTML = `<section class="demo wrap"><header><button id="back">← Lab</button><span>C/C++ SYSTEMS LAB</span><a target="_blank" href="./projects/c-cpp/${slug}/">Native source ↗</a></header><div class="demo-head"><small>INTERACTIVE ARCHITECTURE EXPLAINER</small><h1>${project.name}</h1><p>${project.description}. The browser demo explains the native execution model; it does not replace the C/C++ binary.</p></div><div class="stage"><div><div id="diagram" class="diagram" aria-live="polite"></div><button id="step">Advance one step</button><div id="state"></div></div></div></section>`;
  let current = 0; const diagram = document.querySelector('#diagram'), state = document.querySelector('#state');
  const draw = () => { diagram.textContent = flows.map((x,i) => i === current ? `▶ ${x}` : x).join('  →  '); state.textContent = `Stage ${current+1} / ${flows.length}: ${flows[current]}`; };
  draw(); document.querySelector('#step').addEventListener('click', () => { current = current < flows.length - 1 ? current + 1 : 0; draw(); });
  document.querySelector('#back').addEventListener('click', () => { app.innerHTML=''; catalog.hidden=false; });
}
if (search) search.addEventListener('input', render);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(x => x.classList.toggle('active', x === button)); render(); }));
render();
