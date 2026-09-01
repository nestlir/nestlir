const dishes = [
  { id:'morning',type:'breakfast',label:'Morning',name:'Breakfast by the Kamo',place:'Kamo River / 08:16',price:'¥ 900',time:'45 min',copy:'A quiet table, warm rice and the first light over the river. Start here before Kyoto wakes.',image:'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=84'},
  { id:'ramen',type:'dinner',label:'Dinner',name:'A bowl after rain',place:'Pontocho / 19:20',price:'¥ 1,400',time:'1 h',copy:'Step inside when the rain begins. This is the kind of dinner that needs no plan beyond the next warm bowl.',image:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=84'},
  { id:'tea',type:'tea',label:'Tea',name:'Matcha, in the shade',place:'Higashiyama / 15:40',price:'¥ 1,200',time:'1 h',copy:'Take the long way uphill, then sit with matcha and a view of the garden. Nothing on the schedule for an hour.',image:'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=84'},
  { id:'market',type:'breakfast',label:'Morning',name:'Nishiki at first light',place:'Nishiki Market / 09:10',price:'¥ 1,100',time:'50 min',copy:'Go before the busiest hour. Pick one thing you have never tasted and keep walking.',image:'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1200&q=84'},
  { id:'kaiseki',type:'dinner',label:'Dinner',name:'A long table',place:'Gion / 20:10',price:'¥ 8,000+',time:'2 h',copy:'Seasonal plates, deliberate pacing and a room that rewards staying until the last course.',image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=84'}
];

const list = document.querySelector('#foodList');
const detailImage = document.querySelector('#detailImage');
const detailType = document.querySelector('#detailType');
const detailName = document.querySelector('#detailName');
const detailPlace = document.querySelector('#detailPlace');
const detailCopy = document.querySelector('#detailCopy');
const detailPrice = document.querySelector('#detailPrice');
const detailTime = document.querySelector('#detailTime');
const addFood = document.querySelector('#addFood');
const searchInput = document.querySelector('#searchInput');
const form = document.querySelector('#foodSearch');
let selected = dishes[0];
let activeFilter = 'all';

const saved = new Set(JSON.parse(localStorage.getItem('nomad-food') || '[]'));

function renderList() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = dishes.filter((dish) => {
    const matchesFilter = activeFilter === 'all' || dish.type === activeFilter;
    const matchesQuery = !query || `${dish.name} ${dish.place} ${dish.label}`.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });
  list.innerHTML = filtered.map((dish, index) => `<button class="food-item ${dish.id === selected.id ? 'is-active' : ''}" data-id="${dish.id}" type="button"><span class="food-index">${String(index + 1).padStart(2,'0')}</span><div><strong>${dish.name}</strong><small>${dish.label} / ${dish.place}</small></div><span class="arrow">↗</span></button>`).join('') || '<p style="padding:24px 0;color:var(--muted)">No quiet finds here yet.</p>';
  list.querySelectorAll('.food-item').forEach((item) => item.addEventListener('click', () => selectDish(item.dataset.id)));
}

function selectDish(id) {
  selected = dishes.find((dish) => dish.id === id) || dishes[0];
  detailImage.style.backgroundImage = `url("${selected.image}")`;
  detailType.textContent = selected.label;
  detailName.textContent = selected.name;
  detailPlace.textContent = selected.place;
  detailCopy.textContent = selected.copy;
  detailPrice.textContent = selected.price;
  detailTime.textContent = selected.time;
  const isSaved = saved.has(selected.id);
  addFood.classList.toggle('saved', isSaved);
  addFood.innerHTML = isSaved ? 'Added to My Day <span>♥</span>' : 'Add to My Day <span>+</span>';
  renderList();
}

form.addEventListener('submit', (event) => { event.preventDefault(); renderList(); });
searchInput.addEventListener('input', renderList);
document.querySelectorAll('.food-filter').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.food-filter').forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  activeFilter = button.dataset.filter;
  renderList();
}));

addFood.addEventListener('click', () => {
  if (saved.has(selected.id)) saved.delete(selected.id); else saved.add(selected.id);
  localStorage.setItem('nomad-food', JSON.stringify([...saved]));
  selectDish(selected.id);
});

selectDish(selected.id);
