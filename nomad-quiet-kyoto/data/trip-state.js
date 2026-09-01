const STORAGE_KEY = 'nomad-kyoto-trip-v1';

const DEFAULT_TRIP = {
  places: ['fushimi', 'higashiyama', 'nishiki', 'gion'],
  food: [],
  saved: false,
};

export const createTripState = () => ({
  places: [...DEFAULT_TRIP.places],
  food: [...DEFAULT_TRIP.food],
  saved: DEFAULT_TRIP.saved,
});

export const getTripState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createTripState();
    const parsed = JSON.parse(raw);
    return {
      ...createTripState(),
      ...parsed,
      places: Array.isArray(parsed.places) ? parsed.places : [...DEFAULT_TRIP.places],
      food: Array.isArray(parsed.food) ? parsed.food : [],
    };
  } catch {
    return createTripState();
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

export const toggleSaved = (trip) => ({ ...trip, saved: !trip.saved });
