import { places, food, getTripState, togglePlace, toggleFood } from './data/index.js';

const itinerary = document.querySelector('#itinerary');
const stopCount = document.querySelector('#stopCount');
const foodCount = document.querySelector('#foodCount');
const distance = document.querySelector('#distance');
const spend = document.querySelector('#spend');

const state = getTripState();
const placeById = Object.fromEntries(places.map((place) => [place.id, place]));
const foodById = Object.fromEntries(food.map((item) => [item.id, item]));

function render() {
  const selectedPlaces = state.places.map((id) => placeById[id]).filter(Boolean);
  const selectedFood = state.food.map((id) => foodById[id]).filter(Boolean);
  const items = [
    ...selectedPlaces.map((item) => ({ ...item, kind: 'place' })),
    ...selectedFood.map((item) => ({ ...item, kind: 'food' })),
  ];

  itinerary.innerHTML = items.length
    ? items.map((item, index) => `
      <article class="itinerary-item">
        <div class="item-index">${String(index + 1).padStart(2, '0')}</div>
        <div>
          <p class="item-type">${item.kind === 'place' ? item.category : 'food'}</p>
          <h3>${item.name}</h3>
          <p class="item-meta">${item.time} / ${item.area}</p>
        </div>
        <button type="button" class="remove" data-kind="${item.kind}" data-id="${item.id}" aria-label="Remove ${item.name}">×</button>
      </article>
    `).join('')
    : '<div class="empty">Your route is still open.<br>Choose a place from Explore or a meal from Eat Kyoto.</div>';

  const totalDistance = selectedPlaces.reduce((sum, place) => sum + Number(place.distance || 0), 0);
  const totalSpend = [...selectedPlaces, ...selectedFood].reduce((sum, item) => sum + Number(item.price || 0), 0);

  stopCount.textContent = selectedPlaces.length;
  foodCount.textContent = selectedFood.length;
  distance.textContent = `${totalDistance.toFixed(1)} km`;
  spend.textContent = `¥${totalSpend.toLocaleString('en-US')}`;
}

itinerary?.addEventListener('click', (event) => {
  const button = event.target.closest('.remove');
  if (!button) return;

  if (button.dataset.kind === 'place') togglePlace(state, button.dataset.id);
  else toggleFood(state, button.dataset.id);

  render();
});

render();
