const STORAGE_KEY = 'nomad-trip-v1';

export function readTrip(storage, fallback) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return cloneTrip(fallback);
    const parsed = JSON.parse(raw);
    if (!isTripShape(parsed)) return cloneTrip(fallback);
    return {
      places: [...new Set(parsed.places)],
      food: [...new Set(parsed.food)],
      saved: parsed.saved,
    };
  } catch {
    return cloneTrip(fallback);
  }
}

export function writeTrip(storage, state) {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function isTripShape(value) {
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

function cloneTrip(trip) {
  return {
    places: [...trip.places],
    food: [...trip.food],
    saved: trip.saved,
  };
}
