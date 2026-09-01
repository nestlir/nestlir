import { isKnownPlaceId } from '../place/model.js';
import { isKnownFoodId } from '../food/model.js';
import { readTrip, writeTrip } from '../../shared/storage/trip-storage.js';

export function createInitialTrip() {
  return {
    places: ['fushimi','higashiyama','nishiki','gion'],
    food: [],
    saved: false,
  };
}

export function loadTrip(storage, fallback = createInitialTrip()) {
  const state = readTrip(storage, fallback);
  return {
    places: state.places.filter(isKnownPlaceId),
    food: state.food.filter(isKnownFoodId),
    saved: state.saved,
  };
}

export function saveTrip(storage, state) {
  writeTrip(storage, state);
}

export function togglePlace(state, id, places) {
  if (!places.some((place) => place.id === id)) return state;
  return state.places.includes(id)
    ? {...state, places: state.places.filter((value) => value !== id)}
    : {...state, places: [...state.places, id]};
}

export function toggleFood(state, id, foods) {
  if (!foods.some((item) => item.id === id)) return state;
  return state.food.includes(id)
    ? {...state, food: state.food.filter((value) => value !== id)}
    : {...state, food: [...state.food, id]};
}

export function toggleSaved(state) {
  return {...state, saved: !state.saved};
}
