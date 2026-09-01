import { readTrip, writeTrip } from '../../shared/storage.js';
import { isKnownPlaceId } from '../place/model.js';

export const DEFAULT_STATE = Object.freeze({
  places: ['fushimi', 'higashiyama', 'nishiki', 'gion'],
  food: [],
  saved: false,
});

export function createTripState(storage) {
  return readTrip(storage);
}

export function persistTripState(storage, state) {
  writeTrip(storage, state);
}

export function togglePlace(state, id) {
  if (!isKnownPlaceId(id)) return state;
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
