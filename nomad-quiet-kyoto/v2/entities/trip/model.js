const STORAGE_KEY = 'nomad-v2-trip';
const DEFAULT_STATE = { places: ['fushimi', 'higashiyama', 'nishiki', 'gion'], food: [], saved: false };

export function createTripState(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE, places: [...DEFAULT_STATE.places], food: [] };

    const value = JSON.parse(raw);
    if (!value || !Array.isArray(value.places) || !Array.isArray(value.food) || typeof value.saved !== 'boolean') {
      return { ...DEFAULT_STATE, places: [...DEFAULT_STATE.places], food: [] };
    }

    return {
      places: value.places.filter((id) => typeof id === 'string'),
      food: value.food.filter((id) => typeof id === 'string'),
      saved: value.saved,
    };
  } catch {
    return { ...DEFAULT_STATE, places: [...DEFAULT_STATE.places], food: [] };
  }
}

export function togglePlace(state, id) {
  return {
    ...state,
    places: state.places.includes(id)
      ? state.places.filter((item) => item !== id)
      : [...state.places, id],
  };
}

export function toggleFood(state, id) {
  return {
    ...state,
    food: state.food.includes(id)
      ? state.food.filter((item) => item !== id)
      : [...state.food, id],
  };
}

export function toggleSaved(state) {
  return { ...state, saved: !state.saved };
}
