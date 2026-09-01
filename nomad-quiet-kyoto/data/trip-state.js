const STORAGE_KEY = 'nomad-kyoto-trip-v1';
const DEFAULT_TRIP = { places: ['fushimi', 'higashiyama', 'nishiki', 'gion'], food: [], saved: false };

export const loadTrip = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_TRIP, ...JSON.parse(raw) } : { ...DEFAULT_TRIP };
  } catch {
    return { ...DEFAULT_TRIP };
  }
};

export const saveTrip = (trip) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trip));
};

export const togglePlace = (trip, placeId) => ({
  ...trip,
  places: trip.places.includes(placeId)
    ? trip.places.filter((id) => id !== placeId)
    : [...trip.places, placeId],
});

export const toggleFood = (trip, foodId) => ({
  ...trip,
  food: trip.food.includes(foodId)
    ? trip.food.filter((id) => id !== foodId)
    : [...trip.food, foodId],
});

export const setSaved = (trip, saved) => ({ ...trip, saved });
