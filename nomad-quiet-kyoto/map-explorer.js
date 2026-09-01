const places = {
  fushimi: {
    index: '01 / 04', type: 'WALK', time: '07:10', title: 'Fushimi<br><em>Inari</em>',
    image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=84',
    description: 'Begin beneath a thousand vermilion gates, before the city has fully woken.',
    area: 'Fushimi / South Kyoto', duration: '01h 40m'
  },
  higashiyama: {
    index: '02 / 04', type: 'WALK', time: '09:20', title: 'Higashi<em>yama</em>',
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=84',
    description: 'Take the old lanes uphill while the shutters are still closed and the stone is cool.',
    area: 'Higashiyama / East Kyoto', duration: '01h 30m'
  },
  nishiki: {
    index: '03 / 04', type: 'FOOD', time: '12:30', title: 'Nishiki<br><em>Market</em>',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=84',
    description: 'A narrow arcade of knives, pickles, tea and small lunches made for wandering.',
    area: 'Nakagyo / Central Kyoto', duration: '01h 15m'
  },
  gion: {
    index: '04 / 04', type: 'RITUAL', time: '18:42', title: 'Gion<br><em>at dusk</em>',
    image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=84',
    description: 'Stay until the paper lanterns appear. The streets change character after the light falls.',
    area: 'Gion / East Kyoto', duration: '01h 20m'
  }
};

const pins = document.querySelectorAll('.map-pin');
const fields = {
  index: document.querySelector('#placeIndex'),
  type: document.querySelector('#placeType'),
  time: document.querySelector('#placeTime'),
  title: document.querySelector('#placeTitle'),
  image: document.querySelector('#placeImage'),
  description: document.querySelector('#placeDescription'),
  area: document.querySelector('#placeArea'),
  duration: document.querySelector('#placeDuration'),
  add: document.querySelector('#addPlace')
};

let activePlace = 'fushimi';

function getSavedPlaces() {
  try {
    return JSON.parse(localStorage.getItem('nomad-my-day') || '[]');
  } catch {
    return [];
  }
}

function setSavedPlaces(value) {
  localStorage.setItem('nomad-my-day', JSON.stringify(value));
}

function renderPlace(key) {
  const place = places[key];
  if (!place) return;
  activePlace = key;
  pins.forEach((pin) => pin.classList.toggle('is-active', pin.dataset.place === key));
  fields.index.textContent = place.index;
  fields.type.textContent = place.type;
  fields.time.textContent = place.time;
  fields.title.innerHTML = place.title;
  fields.image.style.backgroundImage = `url("${place.image}")`;
  fields.image.setAttribute('aria-label', fields.title.textContent);
  fields.description.textContent = place.description;
  fields.area.textContent = place.area;
  fields.duration.textContent = place.duration;
  const saved = getSavedPlaces().includes(key);
  fields.add.classList.toggle('is-added', saved);
  fields.add.setAttribute('aria-pressed', String(saved));
  fields.add.innerHTML = saved ? 'Remove from My Day <span>−</span>' : 'Add to My Day <span>+</span>';
}

pins.forEach((pin) => pin.addEventListener('click', () => renderPlace(pin.dataset.place)));

fields.add?.addEventListener('click', () => {
  const saved = getSavedPlaces();
  const index = saved.indexOf(activePlace);
  if (index >= 0) saved.splice(index, 1);
  else saved.push(activePlace);
  setSavedPlaces(saved);
  renderPlace(activePlace);
});

renderPlace('fushimi');
