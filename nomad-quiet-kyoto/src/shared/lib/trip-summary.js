import { findFood } from '../../entities/food/model.js';
import { findPlace } from '../../entities/place/model.js';

export function getSelectedPlaces(state) {
  return state.places.map(findPlace).filter(Boolean);
}

export function getSelectedFood(state) {
  return state.food.map(findFood).filter(Boolean);
}

export function getTripSummary(state) {
  const places = getSelectedPlaces(state);
  const food = getSelectedFood(state);
  return {
    places,
    food,
    stops: places.length + food.length,
    distanceKm: places.reduce((sum, place) => sum + place.distance, 0),
    spendYen:
      places.reduce((sum, place) => sum + place.price, 0) +
      food.reduce((sum, item) => sum + item.price, 0),
  };
}
