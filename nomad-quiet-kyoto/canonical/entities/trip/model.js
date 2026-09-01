export const createInitialTrip = (places, food) => ({
  places: places.slice(0, 4).map((item) => item.id),
  food: [],
  saved: false,
});

export const sanitizeTrip = (state, places, food) => {
  const placeIds = new Set(places.map((item) => item.id));
  const foodIds = new Set(food.map((item) => item.id));

  return {
    places: [...new Set((state?.places || []).filter((id) => placeIds.has(id)))],
    food: [...new Set((state?.food || []).filter((id) => foodIds.has(id)))],
    saved: state?.saved === true,
  };
};

export const loadTrip = (storage, fallback, places, food) => {
  try {
    const raw = storage.getItem('nomad-canonical-trip');
    if (!raw) return fallback;
    return sanitizeTrip(JSON.parse(raw), places, food);
  } catch {
    return fallback;
  }
};

export const saveTrip = (storage, state) => {
  storage.setItem('nomad-canonical-trip', JSON.stringify(state));
};

export const togglePlace = (state, id, places) => {
  if (!places.some((item) => item.id === id)) return state;
  return state.places.includes(id)
    ? { ...state, places: state.places.filter((item) => item !== id) }
    : { ...state, places: [...state.places, id] };
};

export const toggleFood = (state, id, food) => {
  if (!food.some((item) => item.id === id)) return state;
  return state.food.includes(id)
    ? { ...state, food: state.food.filter((item) => item !== id) }
    : { ...state, food: [...state.food, id] };
};

export const toggleSaved = (state) => ({ ...state, saved: !state.saved });
