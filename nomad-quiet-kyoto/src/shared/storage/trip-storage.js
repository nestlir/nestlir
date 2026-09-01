const STORAGE_KEY = 'nomad-canonical-trip-v1';

const cloneDefault = (defaultTrip) => ({
  places: [...defaultTrip.places],
  food: [...defaultTrip.food],
  saved: defaultTrip.saved,
});

export function createTripStorage(storage, defaultTrip, isValid) {
  function read() {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefault(defaultTrip);
      const parsed = JSON.parse(raw);
      if (!isValid(parsed)) return cloneDefault(defaultTrip);
      return {
        places: [...new Set(parsed.places)],
        food: [...new Set(parsed.food)],
        saved: parsed.saved,
      };
    } catch {
      return cloneDefault(defaultTrip);
    }
  }

  function write(state) {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  return Object.freeze({ read, write });
}

export function isTripState(value) {
  if (!value || typeof value !== 'object') return false;
  return (
    Array.isArray(value.places) &&
    value.places.every((id) => typeof id === 'string') &&
    Array.isArray(value.food) &&
    value.food.every((id) => typeof id === 'string') &&
    typeof value.saved === 'boolean'
  );
}
