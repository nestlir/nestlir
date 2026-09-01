const menuButton=document.querySelector('#menuButton');
const appMenu=document.querySelector('#appMenu');
const setMenu=(open)=>{appMenu?.classList.toggle('open',open);appMenu?.setAttribute('aria-hidden',String(!open));menuButton?.setAttribute('aria-expanded',String(open))};
menuButton?.addEventListener('click',()=>setMenu(!appMenu.classList.contains('open')));
appMenu?.querySelectorAll('a').forEach((link)=>link.addEventListener('click',()=>setMenu(false)));

const storeKey='nomad-my-day';
const budgetKey='nomad-budget';
const readList=()=>{try{return JSON.parse(localStorage.getItem(storeKey)||'[]')}catch{return[]}};
const updateTripSummary=()=>{
 const stops=readList();
 const count=document.querySelector('#navCount');
 const tripStops=document.querySelector('#tripStops');
 const tripBudget=document.querySelector('#tripBudget');
 if(count) count.textContent=String(stops.length);
 if(tripStops) tripStops.textContent=String(stops.length);
 const budget=Number(localStorage.getItem(budgetKey)||0);
 if(tripBudget) tripBudget.textContent=`¥${budget.toLocaleString('en-US')}`;
};
updateTripSummary();
window.addEventListener('storage',updateTripSummary);

const places=[
 {id:'fushimi',name:'Fushimi Inari',time:'07:10'},
 {id:'higashiyama',name:'Higashiyama',time:'09:20'},
 {id:'nishiki',name:'Nishiki Market',time:'12:30'},
 {id:'gion',name:'Gion',time:'18:42'}
];
const list=readList();
const links=document.querySelectorAll('[data-place]');
links.forEach((link)=>{
 const id=link.dataset.place;
 const place=places.find((item)=>item.id===id);
 if(!place)return;
 link.addEventListener('click',()=>{
   const exists=readList().some((item)=>item.id===id);
   if(!exists){localStorage.setItem(storeKey,JSON.stringify([...readList(),place]));updateTripSummary()}
 });
});
