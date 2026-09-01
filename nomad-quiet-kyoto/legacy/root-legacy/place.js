const ADD_KEY = 'nomad-my-day';
const place = { id: 'fushimi-inari', name: 'Fushimi Inari', time: '07:10' };

const button = document.querySelector('#addPlace');
const status = document.querySelector('#actionStatus');
const panel = document.querySelector('.action-panel');

function loadRoute() {
  try {
    return JSON.parse(localStorage.getItem(ADD_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRoute(route) {
  localStorage.setItem(ADD_KEY, JSON.stringify(route));
}

function render() {
  const route = loadRoute();
  const saved = route.some((item) => item.id === place.id);
  button.querySelector('span').textContent = saved ? '−' : '+';
  button.firstChild.textContent = saved ? 'Remove from My Day ' : 'Add to My Day ';
  status.textContent = saved ? 'Included in your Kyoto route.' : 'Not yet in your route.';
  panel.classList.toggle('is-saved', saved);
}

button?.addEventListener('click', () => {
  const route = loadRoute();
  const exists = route.some((item) => item.id === place.id);
  const next = exists ? route.filter((item) => item.id !== place.id) : [...route, place];
  saveRoute(next);
  render();
});

render();
