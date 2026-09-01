const STORAGE_KEY = 'nomad-v2-trip';

export const DEFAULT_TRIP = Object.freeze({
  places: ['fushimi', 'higashiyama', 'nishiki', 'gion'],
  food: [],
  saved: false,
});

export function readTrip(storage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return cloneDefault();
    const parsed = JSON.parse(raw);
    if (!isTrip(parsed)) return cloneDefault();
    return {
      places: [...new Set(parsed.places)],
      food: [...new Set(parsed.food)],
      saved: parsed.saved,
    };
  } catch {
    return cloneDefault();
  }
}

export function writeTrip(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function cloneDefault() {
  return {
    places: [...DEFAULT_TRIP.places],
    food: [],
    saved: false,
  };
}

function isTrip(value) {
  return Boolean(
    value &&
      typeof value === 'object' &&
      Array.isArray(value.places) &&
      value.places.every((id) => typeof id === 'string') &&
      Array.isArray(value.food) &&
      value.food.every((id) => typeof id === 'string') &&
      typeof value.saved === 'boolean',
  );
}
