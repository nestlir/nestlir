import { findFood, findPlace } from './repository.js';
import { loadTripState, toggleFood, togglePlace } from './repository.js';

export const getItinerary = (trip) => [
  ...trip.places.map(findPlace).filter(Boolean),
  ...trip.food.map(findFood).filter(Boolean),
];

export const removePlaceFromTrip = (placeId) => {
  const next = togglePlace(loadTripState(), placeId);
  saveTripState(next);
  return next;
};

export const removeFoodFromTrip = (foodId) => {
  const next = toggleFood(loadTripState(), foodId);
  saveTripState(next);
  return next;
};
