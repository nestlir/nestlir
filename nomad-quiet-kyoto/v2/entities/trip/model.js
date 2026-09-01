import { readTrip, writeTrip } from '../../shared/storage.js';

export { readTrip as createTripState } from '../../shared/storage.js';

export function persistTripState(storage, state) {
  writeTrip(storage, state);
}

export function togglePlace(state, id) {
  return state.places.includes(id)
    ? { ...state, places: state.places.filter((item) => item !== id) }
    : { ...state, places: [...state.places, id] };
}

export function toggleFood(state, id) {
  return state.food.includes(id)
    ? { ...state, food: state.food.filter((item) => item !== id) }
    : { ...state, food: [...state.food, id] };
}

export function toggleSaved(state) {
  return { ...state, saved: !state.saved };
}

export function loadTrip(storage) {
  return readTrip(storage);
}
