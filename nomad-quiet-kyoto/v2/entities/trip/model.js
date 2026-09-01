const STORAGE_KEY = 'nomad-v2-trip';
const DEFAULT_STATE = { places: ['fushimi', 'higashiyama', 'nishiki', 'gion'], food: [], saved: false };

export function createTripStore(storage) {
  let state = read(storage);
  const listeners = new Set();

  const emit = () => listeners.forEach((listener) => listener(state));
  const persist = () => storage.setItem(STORAGE_KEY, JSON.stringify(state));

  return {
    getState: () => state,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    togglePlace(id) { state = { ...state, places: state.places.includes(id) ? state.places.filter((item) => item !== id) : [...state.places, id] }; persist(); emit(); },
    toggleFood(id) { state = { ...state, food: state.food.includes(id) ? state.food.filter((item) => item !== id) : [...state.food, id] }; persist(); emit(); },
    setSaved(saved) { state = { ...state, saved }; persist(); emit(); }
  };
}

function read(storage) {
  try {
    const value = JSON.parse(storage.getItem(STORAGE_KEY) || 'null');
    if (!value || !Array.isArray(value.places) || !Array.isArray(value.food) || typeof value.saved !== 'boolean') return DEFAULT_STATE;
    return value;
  } catch {
    return DEFAULT_STATE;
  }
}
