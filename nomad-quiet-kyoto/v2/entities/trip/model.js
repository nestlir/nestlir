const STORAGE_KEY = 'nomad-v2-trip';

export const DEFAULT_STATE = Object.freeze({
  places: ['fushimi', 'higashiyama', 'nishiki', 'gion'],
  food: [],
  saved: false,
});

export function createTripState(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefault();

    const value = JSON.parse(raw);
    if (!isTripState(value)) return cloneDefault();

    return {
      places: [...new Set(value.places)],
      food: [...new Set(value.food)],
      saved: value.saved,
    };
  } catch {
    return cloneDefault();
  }
}

export function persistTripState(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
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

function cloneDefault() {
  return {
    places: [...DEFAULT_STATE.places],
    food: [...DEFAULT_STATE.food],
    saved: DEFAULT_STATE.saved,
  };
}

function isTripState(value) {
  if (typeof value !== 'object' || value === null) return false;
  return (
    Array.isArray(value.places) &&
    value.places.every((id) => typeof id === 'string') &&
    Array.isArray(value.food) &&
    value.food.every((id) => typeof id === 'string') &&
    typeof value.saved === 'boolean'
  );
}
