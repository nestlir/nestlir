import { findPlace } from './data/places.js';
import { findFood } from './data/food.js';
import { loadTrip, saveTrip, togglePlace, toggleFood } from './data/trip-state.js';
import { getTripDistance, getTripSpend, getTripFood } from './data/trip-summary.js';

const timeline = document.querySelector('#timeline');
const stopCount = document.querySelector('#stopCount');
const itineraryCount = document.querySelector('#itineraryCount');
const distanceValue = document.querySelector('#distanceValue');
const budgetValue = document.querySelector('#budgetValue');
const budgetList = document.querySelector('#budgetList');

let trip = loadTrip();

const formatCurrency = (value) => `¥${value.toLocaleString('en-US')}`;

const formatFoodType = (type) => type.charAt(0).toUpperCase() + type.slice(1);

function renderItinerary() {
  if (!timeline) return;
  const places = trip.places.map(findPlace).filter(Boolean);
  const food = trip.food.map(findFood).filter(Boolean);
  timeline.innerHTML = '';

  places.forEach((place) => {
    const item = document.createElement('article');
    item.className = 'timeline-item';
    item.dataset.id = place.id;
    item.innerHTML = `
      <span class="time">${place.time}</span>
      <div>
        <h3>${place.name}</h3>
        <p>${place.area} / ${place.duration}</p>
      </div>
      <button type="button" class="remove-stop" data-remove="${place.id}" aria-label="Remove ${place.name}">×</button>
    `;
    timeline.appendChild(item);
  });

  food.forEach((itemData) => {
    const item = document.createElement('article');
    item.className = 'timeline-item';
    item.dataset.id = itemData.id;
    item.innerHTML = `
      <span class="time">—</span>
      <div>
        <h3>${itemData.name}</h3>
        <p>${formatFoodType(itemData.type)} / ${itemData.place}</p>
      </div>
      <button type="button" class="remove-stop" data-food-remove="${itemData.id}" aria-label="Remove ${itemData.name}">×</button>
    `;
    timeline.appendChild(item);
  });

  timeline.querySelectorAll('[data-remove]').forEach((button) => {
    button.addEventListener('click', () => removePlace(button.dataset.remove));
  });

  timeline.querySelectorAll('[data-food-remove]').forEach((button) => {
    button.addEventListener('click', () => removeFood(button.dataset.foodRemove));
  });
}

function renderSummary() {
  const places = trip.places.map(findPlace).filter(Boolean);
  const food = getTripFood(trip);
  const totalStops = places.length + food.length;

  if (stopCount) stopCount.textContent = String(totalStops);
  if (itineraryCount) itineraryCount.textContent = `${totalStops} ${totalStops === 1 ? 'stop' : 'stops'}`;
  if (distanceValue) distanceValue.textContent = getTripDistance(trip).toFixed(1);
  if (budgetValue) budgetValue.textContent = formatCurrency(getTripSpend(trip));
}

function renderBudget() {
  if (!budgetList) return;
  const places = trip.places.map(findPlace).filter(Boolean);
  const food = getTripFood(trip);
  const rows = [
    ['Places', places.reduce((sum, place) => sum + place.price, 0)],
    ['Food', food.reduce((sum, item) => sum + item.price, 0)],
  ];

  budgetList.innerHTML = rows.map(([label, amount]) => `
    <div><span>${label}</span><strong>${formatCurrency(amount)}</strong></div>
  `).join('');
}

function removePlace(id) {
  if (trip.places.length <= 1) return;
  trip = togglePlace(trip, id);
  saveTrip(trip);
  renderAll();
}

function removeFood(id) {
  trip = toggleFood(trip, id);
  saveTrip(trip);
  renderAll();
}

function renderAll() {
  renderItinerary();
  renderSummary();
  renderBudget();
}

renderAll();
