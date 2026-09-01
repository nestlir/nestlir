import { places, food } from './data/index.js';

export function readTripSelection() {
  try {
    const raw = localStorage.getItem('nomad-kyoto-trip');
    const parsed = raw ? JSON.parse(raw) : { places: [], food: [] };
    return {
      places: Array.isArray(parsed.places) ? parsed.places : [],
      food: Array.isArray(parsed.food) ? parsed.food : [],
    };
  } catch {
    return { places: [], food: [] };
  }
}

export function getSelectedEntities(selection) {
  const placeMap = new Map(places.map((item) => [item.id, item]));
  const foodMap = new Map(food.map((item) => [item.id, item]));
  return {
    places: selection.places.map((id) => placeMap.get(id)).filter(Boolean),
    food: selection.food.map((id) => foodMap.get(id)).filter(Boolean),
  };
}
