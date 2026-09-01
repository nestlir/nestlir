import { findPlace } from './places.js';
import { findFood } from './food.js';

export const getTripPlaces = (trip) => trip.places.map(findPlace).filter(Boolean);
export const getTripFood = (trip) => trip.food.map(findFood).filter(Boolean);

export const getTripDistance = (trip) =>
  getTripPlaces(trip).reduce((total, place) => total + place.distance, 0);

export const getTripSpend = (trip) =>
  getTripPlaces(trip).reduce((total, place) => total + place.price, 0) +
  getTripFood(trip).reduce((total, item) => total + item.price, 0);

export const getTripFoodSpend = (trip) =>
  getTripFood(trip).reduce((total, item) => total + item.price, 0);

export const getTripPlaceSpend = (trip) =>
  getTripPlaces(trip).reduce((total, place) => total + place.price, 0);
