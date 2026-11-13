(() => {
  'use strict';
  const book = document.getElementById('magazineBook');
  const pages = [...document.querySelectorAll('.magazine-page')];
  const counter = document.getElementById('pageCounter');
  const progress = [...document.querySelectorAll('[data-progress-page]')];
  const previous = document.getElementById('previousPage');
  const next = document.getElementById('nextPage');
  const announcement = document.getElementById('readerAnnouncement');
  const mobileQuery = window.matchMedia('(max-width: 760px)');
  let currentPage = 1;
  let language = 'ru';
  let startX = null;

  const dictionary = {
    ru: {
      'nav.cover':'Обложка','nav.stack':'Стек','nav.work':'Работы','nav.contact':'Контакты',
      'cover.description':'Fullstack-разработка на стыке интерфейсов, API, данных и внимательного продуктового мышления.',
      'cover.role':'РОЛЬ','cover.focus':'ФОКУС','cover.enter':'Листать журнал',
      'p2.section':'СОДЕРЖАНИЕ','p2.title':'В этом','p2.titleEm':'выпуске',
      'toc.stack':'Стек','toc.stackNote':'Инструменты и технологии','toc.dataVac':'Командный продукт · вклад во frontend','toc.furniture':'AI-assisted эксперимент','toc.study':'Учебный архив','toc.studyNote':'Практика и освоение инструментов','toc.approach':'Подход','toc.approachNote':'От интерфейса к поставке','toc.contact':'Контакты','toc.contactNote':'Профили и связь',
      'p2.noteLabel':'ОТ АВТОРА','p2.note':'Мне интересны стыки между слоями продукта: как интерфейс разговаривает с API, как данные становятся понятными, а техническое решение — предсказуемым для человека.',
      'p3.section':'ТЕХНОЛОГИИ И ПРАКТИКИ','p3.intro':'Инструменты и инженерные практики, которые помогают довести интерфейс до работающего продукта.',
      'stack.frontend':'интерфейсы','stack.backend':'сервисы и интеграции','stack.dataTitle':'Данные и доставка','stack.data':'хранение и инфраструктура','stack.qualityTitle':'Качество продукта','stack.quality':'проверка и устойчивость',
      'p3.note':'В работе также учитываю архитектуру, UX-сценарии, тестирование, безопасность, производительность и документацию. Это инженерные практики, а не заявление о владении каждым инструментом из больших AI-каталогов.',
      'label.team':'КОМАНДНЫЙ ПРОЕКТ','label.role':'РОЛЬ','label.scope':'МОЯ ЗОНА','label.context':'КОНТЕКСТ','label.contribution':'ЧТО МОЖНО ПОСМОТРЕТЬ','label.format':'ФОРМАТ РАБОТЫ','label.focus':'ФОКУС',
      'p4.subtitle':'Информационный продукт · модуль вакцинации','p4.role':'Frontend-задачи в команде','p4.scope':'Модуль вакцинации','p4.context':'Командный информационный продукт. В этой работе я участвовала в frontend-задачах внутри модуля вакцинации.',
      'p4.point1':'Реализацию интерфейсной части в пределах моей зоны ответственности.','p4.point2':'Работу с данными и состояниями конкретного модуля.','p4.point3':'Код командного frontend-репозитория.','p4.note':'Не приписываю себе остальные части продукта или работу команды целиком.',
      'p5.subtitle':'Эксперимент с продуктовым интерфейсом','p5.caption':'Иллюстрация: каталог и карточка товара','p5.context':'AI-assisted эксперимент: я задала требования, направление и структуру продукта, а ИИ использовался в процессе реализации.','p5.note':'Это самостоятельный эксперимент, не клиентский проект и не заявка на командную коммерческую разработку.',
      'link.repository':'Открыть репозиторий',
      'p6.section':'УЧЕБНЫЙ АРХИВ','p6.title':'Practice','p6.titleEm':'makes craft.','p6.intro':'Учебные задания — отдельная категория. Они показывают практику с инструментами и паттернами, а не коммерческий опыт.',
      'p7.section':'РАБОЧИЙ ПОДХОД','p7.title':'From interface','p7.titleEm':'to delivery.','p7.intro':'Мне важно понимать не только экран, но и путь данных, ограничения API, ошибки и то, как продукт ведёт себя после релиза.',
      'p7.oneTitle':'Разобраться','p7.oneText':'Контекст, пользователь, ограничения, данные.','p7.twoTitle':'Спроектировать','p7.twoText':'Сценарии, состояния, структуру интерфейса и API.','p7.threeTitle':'Проверить','p7.threeText':'Клавиатуру, маленький экран, ошибки и крайние случаи.','p7.fourTitle':'Доставить','p7.fourText':'Понятная сборка, репозиторий, документация, выкладка.','p7.qualityLabel':'КОНТРОЛЬ КАЧЕСТВА','p7.qualityText':'На каждом этапе проверяю доступность, адаптивность, безопасность данных, производительность и понятность изменений. AI-инструменты ускоряют рутину, но решения и финальная проверка остаются за разработчиком.',
      'p8.section':'КОРРЕСПОНДЕНЦИЯ','p8.title':'Давайте','p8.titleEm':'поговорим.','p8.intro':'Открыта к интересным командам, продуктовым задачам и сотрудничеству, где ценят ясность и внимательную реализацию.',
      'form.name':'Ваше имя','form.email':'Почта для ответа','form.message':'Сообщение','form.submit':'Подготовить письмо','form.hint':'Откроется ваше почтовое приложение — письмо можно проверить перед отправкой.',
      'reader.issue':'ВЫПУСК 01','reader.hint':'← → листать · перетащите страницу','reader.print':'Печать / PDF',
      'menu.open':'Открыть меню','menu.close':'Закрыть меню','fullscreen.enter':'Включить полноэкранный режим','fullscreen.exit':'Выйти из полноэкранного режима','page.previous':'Предыдущая страница','page.next':'Следующая страница','page.announce':'Страница'
    },
    en: {
      'nav.cover':'Cover','nav.stack':'Stack','nav.work':'Work','nav.contact':'Contact',
      'cover.description':'Full-stack product work across interfaces, APIs, data and thoughtful engineering decisions.',
      'cover.role':'ROLE','cover.focus':'FOCUS','cover.enter':'Read the issue',
      'p2.section':'CONTENTS','p2.title':'Inside this','p2.titleEm':'issue',
      'toc.stack':'Stack','toc.stackNote':'Tools and technologies','toc.dataVac':'Team product · frontend contribution','toc.furniture':'AI-assisted experiment','toc.study':'Study archive','toc.studyNote':'Practice and learning','toc.approach':'Approach','toc.approachNote':'From interface to delivery','toc.contact':'Contact','toc.contactNote':'Profiles and correspondence',
      'p2.noteLabel':'A NOTE FROM THE AUTHOR','p2.note':'I am interested in the seams between product layers: how an interface talks to an API, how data becomes understandable, and how technical decisions remain predictable for people.',
      'p3.section':'TECHNOLOGY & PRACTICE','p3.intro':'Tools and engineering practices that help turn an interface into a working product.',
      'stack.frontend':'interfaces','stack.backend':'services and integrations','stack.dataTitle':'Data and delivery','stack.data':'storage and infrastructure','stack.qualityTitle':'Product quality','stack.quality':'testing and resilience',
      'p3.note':'My process also considers architecture, UX journeys, testing, security, performance and documentation. These are engineering practices, not a claim of expertise in every tool listed in large AI catalogues.',
      'label.team':'TEAM PROJECT','label.role':'ROLE','label.scope':'MY SCOPE','label.context':'CONTEXT','label.contribution':'WHAT TO EXPLORE','label.format':'WORK FORMAT','label.focus':'FOCUS',
      'p4.subtitle':'Information product · vaccination module','p4.role':'Frontend work within the team','p4.scope':'Vaccination module','p4.context':'A team-built information product. My contribution was frontend work within the vaccination module.',
      'p4.point1':'Implementation of interface tasks within my scope.','p4.point2':'Data and UI states for the specific module.','p4.point3':'The team frontend repository.','p4.note':'I do not claim the rest of the product or the team’s work as my own.',
      'p5.subtitle':'Product interface experiment','p5.caption':'Illustration: catalogue and product detail','p5.context':'An AI-assisted experiment: I defined the brief, direction and product structure, with AI used during implementation.','p5.note':'This is an independent experiment, not a client engagement or a claim of team-based commercial delivery.',
      'link.repository':'Open repository',
      'p6.section':'STUDY ARCHIVE','p6.title':'Practice','p6.titleEm':'makes craft.','p6.intro':'Educational assignments are listed separately. They show practice with tools and patterns, not commercial experience.',
      'p7.section':'WORKING APPROACH','p7.title':'From interface','p7.titleEm':'to delivery.','p7.intro':'I care about more than the screen: data flow, API constraints, errors and how a product behaves after release.',
      'p7.oneTitle':'Understand','p7.oneText':'Context, user, constraints and data.','p7.twoTitle':'Design','p7.twoText':'Journeys, states, interface and API structure.','p7.threeTitle':'Verify','p7.threeText':'Keyboard, small screens, errors and edge cases.','p7.fourTitle':'Deliver','p7.fourText':'Clear build, repository, documentation and deployment.','p7.qualityLabel':'QUALITY GATES','p7.qualityText':'At each stage I consider accessibility, responsive behaviour, data security, performance and change clarity. AI tools can speed up routine work, but engineering decisions and final verification remain the developer’s responsibility.',
      'p8.section':'CORRESPONDENCE','p8.title':'Let’s','p8.titleEm':'talk.','p8.intro':'Open to thoughtful teams, product challenges and collaborations where clarity and careful implementation matter.',
      'form.name':'Your name','form.email':'Reply-to email','form.message':'Message','form.submit':'Prepare email','form.hint':'Your email application will open so you can review the message before sending.',
      'reader.issue':'ISSUE 01','reader.hint':'← → turn · swipe the page','reader.print':'Print / PDF',
      'menu.open':'Open menu','menu.close':'Close menu','fullscreen.enter':'Enter fullscreen','fullscreen.exit':'Exit fullscreen','page.previous':'Previous page','page.next':'Next page','page.announce':'Page'
    }
  };

  function safeGet(key,fallback){try{return localStorage.getItem(key)||fallback;}catch{return fallback;}}
  function safeSet(key,value){try{localStorage.setItem(key,value);}catch{}}
  function isMobile(){return mobileQuery.matches;}
  function normalizePage(page){
    const value=Math.max(1,Math.min(8,Number(page)||1));
    if(isMobile()||value===1||value===8)return value;
    return value%2===0?value:value-1;
  }
  function visiblePages(){
    if(currentPage===1||currentPage===8)return [currentPage];
    return isMobile()?[currentPage]:[currentPage,currentPage+1];
  }
  function pageLabel(){
    if(currentPage===1||currentPage===8||isMobile())return String(currentPage).padStart(2,'0')+' / 08';
    return String(currentPage).padStart(2,'0')+'–'+String(currentPage+1).padStart(2,'0')+' / 08';
  }
  function renderPage({announce=true}={}){
    const visible=visiblePages();
    book.className='magazine-book '+(currentPage===1?'is-cover':currentPage===8||isMobile()?'is-single':'is-spread');
    pages.forEach((page)=>{
      const active=visible.includes(Number(page.dataset.page));
      page.hidden=!active;
      page.inert=!active;
      page.setAttribute('aria-hidden',String(!active));
    });
    counter.textContent=pageLabel();
    previous.disabled=currentPage===1;
    next.disabled=currentPage===8;
    progress.forEach((button)=>{
      const n=Number(button.dataset.progressPage);
      const active=visible.includes(n);
      button.classList.toggle('is-current',n===currentPage);
      button.classList.toggle('is-visible',active);
      button.setAttribute('aria-current',active?'page':'false');
    });
    document.querySelectorAll('[data-go-page]').forEach((link)=>{
      const target=normalizePage(link.dataset.goPage);
      const active=visible.includes(target);
      link.classList.toggle('is-current',active);
      if(active)link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
    if(announce)announcement.textContent=(dictionary[language]['page.announce']||'Страница')+' '+pageLabel();
  }
  function setPage(page,{history=true,announce=true}={}){
    currentPage=normalizePage(page);
    renderPage({announce});
    if(history){
      const nextUrl='#page-'+currentPage;
      if(window.location.hash!==nextUrl)window.history.pushState({page:currentPage},'',nextUrl);
    }
  }
  function forward(){
    if(isMobile())setPage(currentPage+1);
    else if(currentPage===1)setPage(2);
    else if(currentPage===2)setPage(4);
    else if(currentPage===4)setPage(6);
    else if(currentPage===6)setPage(8);
  }
  function backward(){
    if(isMobile())setPage(currentPage-1);
    else if(currentPage===8)setPage(6);
    else if(currentPage===6)setPage(4);
    else if(currentPage===4)setPage(2);
    else if(currentPage===2)setPage(1);
  }
  function pageFromHash(){
    const match=window.location.hash.match(/^#page-(\d+)$/);
    return match?normalizePage(Number(match[1])):1;
  }

  document.querySelectorAll('[data-go-page]').forEach((link)=>link.addEventListener('click',(event)=>{
    event.preventDefault();
    const page=Number(link.dataset.goPage);
    setPage(page);
    closeMenu();
  }));
  progress.forEach((button)=>button.addEventListener('click',()=>setPage(Number(button.dataset.progressPage))));
  previous.addEventListener('click',backward);
  next.addEventListener('click',forward);
  window.addEventListener('popstate',()=>setPage(pageFromHash(),{history:false}));
  if(typeof mobileQuery.addEventListener==='function')mobileQuery.addEventListener('change',()=>setPage(currentPage,{history:false,announce:false}));
  else mobileQuery.addListener(()=>setPage(currentPage,{history:false,announce:false}));

  document.addEventListener('keydown',(event)=>{
    const target=event.target;
    if(target instanceof HTMLElement && (target.isContentEditable||['INPUT','TEXTAREA','SELECT'].includes(target.tagName)))return;
    if(event.altKey||event.ctrlKey||event.metaKey)return;
    if(event.key==='ArrowRight'){event.preventDefault();forward();}
    if(event.key==='ArrowLeft'){event.preventDefault();backward();}
    if(event.key==='Home'){event.preventDefault();setPage(1);}
    if(event.key==='End'){event.preventDefault();setPage(8);}
  });

  book.addEventListener('pointerdown',(event)=>{
    if(event.target.closest('a,button,input,textarea,select')){startX=null;return;}
    startX=event.clientX;
  });
  book.addEventListener('pointerup',(event)=>{
    if(startX===null)return;
    const delta=event.clientX-startX;
    startX=null;
    if(Math.abs(delta)>48){if(delta<0)forward();else backward();}
  });
  book.addEventListener('pointercancel',()=>{startX=null;});

  const languageButtons=[...document.querySelectorAll('[data-lang]')];
  function applyLanguage(nextLanguage){
    language=nextLanguage==='en'?'en':'ru';
    document.documentElement.lang=language;
    document.querySelectorAll('[data-i18n]').forEach((element)=>{
      const value=dictionary[language][element.dataset.i18n];
      if(value!==undefined)element.textContent=value;
    });
    languageButtons.forEach((button)=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)));
    previous.setAttribute('aria-label',dictionary[language]['page.previous']);
    next.setAttribute('aria-label',dictionary[language]['page.next']);
    if(menuButton)menuButton.setAttribute('aria-label',menuButton.getAttribute('aria-expanded')==='true'?dictionary[language]['menu.close']:dictionary[language]['menu.open']);
    updateFullscreenControl();
    document.title=language==='ru'?'NESTLIR — Portfolio Magazine · Выпуск 01':'NESTLIR — Portfolio Magazine · Issue 01';
    safeSet('nestlir-magazine-language',language);
  }
  languageButtons.forEach((button)=>button.addEventListener('click',()=>applyLanguage(button.dataset.lang)));

  const menuButton=document.getElementById('menuToggle');
  const mobileNav=document.getElementById('mobileNav');
  function openMenu(){
    menuButton.setAttribute('aria-expanded','true');
    menuButton.setAttribute('aria-label',dictionary[language]['menu.close']);
    mobileNav.hidden=false;
  }
  function closeMenu(){
    menuButton.setAttribute('aria-expanded','false');
    menuButton.setAttribute('aria-label',dictionary[language]['menu.open']);
    mobileNav.hidden=true;
  }
  menuButton.addEventListener('click',()=>menuButton.getAttribute('aria-expanded')==='true'?closeMenu():openMenu());
  mobileNav.querySelectorAll('a').forEach((link)=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',(event)=>{
    if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){
      closeMenu();
      menuButton.focus();
    }
  });

  const fullscreenButton=document.getElementById('fullscreenToggle');
  function updateFullscreenControl(){
    const active=Boolean(document.fullscreenElement);
    fullscreenButton.setAttribute('aria-pressed',String(active));
    fullscreenButton.setAttribute('aria-label',dictionary[language][active?'fullscreen.exit':'fullscreen.enter']);
    fullscreenButton.title=dictionary[language][active?'fullscreen.exit':'fullscreen.enter'];
  }
  document.addEventListener('fullscreenchange',updateFullscreenControl);
  fullscreenButton.addEventListener('click',async()=>{
    try{
      if(!document.fullscreenElement)await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    }catch(error){announcement.textContent=language==='ru'?'Полноэкранный режим недоступен в этом браузере.':'Fullscreen mode is unavailable in this browser.';}
    updateFullscreenControl();
  });
  document.getElementById('printButton').addEventListener('click',()=>window.print());

  const form=document.getElementById('contactForm');
  const status=document.getElementById('formStatus');
  form.addEventListener('submit',(event)=>{
    event.preventDefault();
    status.classList.remove('is-error','is-success');
    if(!form.reportValidity()){
      status.classList.add('is-error');
      status.textContent=language==='ru'?'Проверьте заполнение полей.':'Please check the required fields.';
      return;
    }
    const data=new FormData(form);
    const subject=encodeURIComponent(language==='ru'?'Сообщение по портфолио':'Portfolio enquiry');
    const body=encodeURIComponent(
      (language==='ru'?'Имя: ':'Name: ')+data.get('name')+'\n'+
      'Email: '+data.get('email')+'\n\n'+
      (language==='ru'?'Сообщение: ':'Message: ') +data.get('message')
    );
    status.classList.add('is-success');
    status.textContent=language==='ru'?'Откроется почтовое приложение. Проверьте черновик и отправьте письмо.':'Your email app will open. Review the draft and send it.';
    window.location.href='mailto:nestlir@mail.ru?subject='+subject+'&body='+body;
  });

  applyLanguage(safeGet('nestlir-magazine-language','ru'));
  setPage(pageFromHash(),{history:false,announce:false});
  closeMenu();
})();