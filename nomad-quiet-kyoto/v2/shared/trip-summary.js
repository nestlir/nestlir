import { places } from '../entities/place/model.js';

export function buildTripSummary(state) {
  const selected = state.places
    .map((id) => places.find((place) => place.id === id))
    .filter(Boolean);

  return {
    stopCount: state.places.length + state.food.length,
    distanceKm: selected.reduce((total, place) => total + place.distance, 0),
    spendYen: selected.reduce((total, place) => total + place.price, 0),
  };
}
