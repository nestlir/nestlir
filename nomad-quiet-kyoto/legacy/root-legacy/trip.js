import { findPlace, findFood, getTripState, saveTrip, togglePlace, toggleFood, toggleSaved } from './data/index.js';
import { getTripDistance, getTripSpend, getTripFood } from './data/trip-summary.js';

const timeline = document.querySelector('#timeline');
const stopCount = document.querySelector('#stopCount');
const itineraryCount = document.querySelector('#itineraryCount');
const distanceValue = document.querySelector('#distanceValue');
const budgetValue = document.querySelector('#budgetValue');
const budgetList = document.querySelector('#budgetList');
const saveButton = document.querySelector('#saveTrip');

let trip = getTripState();

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
      <div><h3>${place.name}</h3><p>${place.area} / ${place.duration}</p></div>
      <button type="button" class="remove-stop" data-remove-place="${place.id}" aria-label="Remove ${place.name}">×</button>
    `;
    timeline.appendChild(item);
  });

  food.forEach((itemData) => {
    const item = document.createElement('article');
    item.className = 'timeline-item';
    item.dataset.id = itemData.id;
    item.innerHTML = `
      <span class="time">—</span>
      <div><h3>${itemData.name}</h3><p>${formatFoodType(itemData.type)} / ${itemData.place}</p></div>
      <button type="button" class="remove-stop" data-remove-food="${itemData.id}" aria-label="Remove ${itemData.name}">×</button>
    `;
    timeline.appendChild(item);
  });

  timeline.querySelectorAll('[data-remove-place]').forEach((button) => {
    button.addEventListener('click', () => {
      trip = togglePlace(trip, button.dataset.removePlace);
      saveTrip(trip);
      renderAll();
    });
  });

  timeline.querySelectorAll('[data-remove-food]').forEach((button) => {
    button.addEventListener('click', () => {
      trip = toggleFood(trip, button.dataset.removeFood);
      saveTrip(trip);
      renderAll();
    });
  });
}

function renderSummary() {
  const totalStops = trip.places.length + trip.food.length;
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
  budgetList.innerHTML = rows.map(([label, amount]) => `<div><span>${label}</span><strong>${formatCurrency(amount)}</strong></div>`).join('');
}

function renderSavedState() {
  if (!saveButton) return;
  saveButton.classList.toggle('saved', trip.saved);
  saveButton.setAttribute('aria-pressed', String(trip.saved));
  const label = saveButton.querySelector('[data-label]');
  const icon = saveButton.querySelector('[data-icon]');
  if (label) label.textContent = trip.saved ? 'Trip saved' : 'Save trip';
  if (icon) icon.textContent = trip.saved ? '♥' : '♡';
}

function renderAll() {
  renderItinerary();
  renderSummary();
  renderBudget();
  renderSavedState();
}

saveButton?.addEventListener('click', () => {
  trip = toggleSaved(trip);
  saveTrip(trip);
  renderSavedState();
});

renderAll();
