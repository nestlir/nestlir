import { places } from '../entities/place/model.js';

export function buildTripSummary(state) {
  const selectedPlaces = state.places
    .map((id) => places.find((place) => place.id === id))
    .filter(Boolean);

  return {
    stopCount: selectedPlaces.length + state.food.length,
    distanceKm: selectedPlaces.reduce((total, place) => total + place.distance, 0),
    spendYen: selectedPlaces.reduce((total, place) => total + place.price, 0),
  };
}
