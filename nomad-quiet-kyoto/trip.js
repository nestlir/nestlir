const STORAGE_KEY = 'nomad-my-day';

const timeline = document.querySelector('#timeline');
const stopCount = document.querySelector('#stopCount');
const distanceValue = document.querySelector('#distanceValue');
const budgetValue = document.querySelector('#budgetValue');

const defaults = ['fushimi', 'higashiyama', 'nishiki', 'gion'];
const distances = { fushimi: 2.8, higashiyama: 2.1, nishiki: 1.7, gion: 4.6 };
const budgets = { fushimi: 0, higashiyama: 800, nishiki: 3500, gion: 0 };

function readStops() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : defaults;
  } catch {
    return defaults;
  }
}

function writeStops(stops) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stops));
}

function updateSummary(stops) {
  if (stopCount) stopCount.textContent = String(stops.length);
  if (distanceValue) {
    distanceValue.textContent = stops.reduce((sum, id) => sum + (distances[id] || 0), 0).toFixed(1);
  }
  if (budgetValue) {
    const total = stops.reduce((sum, id) => sum + (budgets[id] || 0), 0);
    budgetValue.textContent = `¥${total.toLocaleString('en-US')}`;
  }
}

function renderStops(stops) {
  timeline?.querySelectorAll('.timeline-item').forEach((item) => {
    item.hidden = !stops.includes(item.dataset.id);
  });
  updateSummary(stops);
}

let stops = readStops();
renderStops(stops);


timeline?.querySelectorAll('.remove-stop').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.remove;
    if (!id || stops.length <= 1) return;

    const item = button.closest('.timeline-item');
    item?.classList.add('removing');

    window.setTimeout(() => {
      stops = stops.filter((stop) => stop !== id);
      writeStops(stops);
      renderStops(stops);
    }, 260);
  });
});
