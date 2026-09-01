import { isKnownFoodId } from '../food/model.js';
import { isKnownPlaceId } from '../place/model.js';

export const DEFAULT_TRIP = Object.freeze({
  places: Object.freeze(['fushimi', 'higashiyama', 'nishiki', 'gion']),
  food: Object.freeze([]),
  saved: false,
});

export function togglePlace(state, id) {
  if (!isKnownPlaceId(id)) return state;
  return state.places.includes(id)
    ? { ...state, places: state.places.filter((item) => item !== id) }
    : { ...state, places: [...state.places, id] };
}

export function toggleFood(state, id) {
  if (!isKnownFoodId(id)) return state;
  return state.food.includes(id)
    ? { ...state, food: state.food.filter((item) => item !== id) }
    : { ...state, food: [...state.food, id] };
}

export function toggleSaved(state) {
  return { ...state, saved: !state.saved };
}
