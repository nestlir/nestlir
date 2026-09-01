const places = {
  fushimi: { number:'01 / 04', type:'WALK', time:'07:10', title:'Fushimi Inari', description:'Begin before the crowds. Follow the vermilion gates upward until the city falls quiet behind you.', area:'Fushimi', duration:'01h 40m', image:'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1000&q=84' },
  higashiyama: { number:'02 / 04', type:'WALK', time:'09:20', title:'Higashiyama', description:'Stone lanes, wooden facades and small gardens. Take the long way between Kiyomizu-dera and Yasaka.', area:'Higashiyama', duration:'02h 10m', image:'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1000&q=84' },
  nishiki: { number:'03 / 04', type:'FOOD', time:'12:30', title:'Nishiki Market', description:'A narrow five-block corridor of Kyoto flavors. Arrive hungry and choose one thing you have never tried.', area:'Downtown', duration:'01h 20m', image:'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=84' },
  gion: { number:'04 / 04', type:'RITUAL', time:'18:42', title:'Gion', description:'Come for the lantern hour. Walk quietly, stay on public streets and let the evening unfold without a checklist.', area:'Gion', duration:'01h 35m', image:'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1000&q=84' }
};

const pins = document.querySelectorAll('.place-pin');
const fields = { number:'#placeNumber', type:'#placeType', time:'#placeTime', title:'#placeTitle', description:'#placeDescription', area:'#placeArea', duration:'#placeDuration', image:'#placeImage' };
const addPlace = document.querySelector('#addPlace');
const selectedState = document.querySelector('#selectedState');

let selected = 'fushimi';
const saved = new Set(JSON.parse(localStorage.getItem('nomad-saved-places') || '[]'));

function selectPlace(key) {
  const place = places[key];
  if (!place) return;
  selected = key;
  pins.forEach((pin) => pin.classList.toggle('is-active', pin.dataset.place === key));
  Object.entries(fields).forEach(([field, selector]) => {
    const node = document.querySelector(selector);
    if (!node) return;
    if (field === 'image') node.style.backgroundImage = `url('${place.image}')`;
    else node.textContent = place[field];
  });
  const isSaved = saved.has(key);
  addPlace.classList.toggle('is-added', isSaved);
  addPlace.querySelector('span').textContent = isSaved ? '✓' : '+';
  addPlace.firstChild.textContent = isSaved ? 'Added to My Day ' : 'Add to My Day ';
  selectedState.textContent = isSaved ? 'Saved to My Day' : 'Not saved';
}

pins.forEach((pin) => pin.addEventListener('click', () => selectPlace(pin.dataset.place)));

addPlace?.addEventListener('click', () => {
  if (saved.has(selected)) saved.delete(selected);
  else saved.add(selected);
  localStorage.setItem('nomad-saved-places', JSON.stringify([...saved]));
  selectPlace(selected);
});

selectPlace('fushimi');
