import type { Food, Place, TripState } from './domain';

export interface TripSummary {
  readonly places: readonly Place[];
  readonly food: readonly Food[];
  readonly stops: number;
  readonly distance: number;
  readonly spend: number;
}

export function buildTripSummary(
  trip: TripState,
  places: readonly Place[],
  food: readonly Food[],
): TripSummary {
  const selectedPlaces = places.filter((place) => trip.places.includes(place.id));
  const selectedFood = food.filter((item) => trip.food.includes(item.id));

  return {
    places: selectedPlaces,
    food: selectedFood,
    stops: selectedPlaces.length + selectedFood.length,
    distance: selectedPlaces.reduce((total, place) => total + place.distance, 0),
    spend:
      selectedPlaces.reduce((total, place) => total + place.price, 0) +
      selectedFood.reduce((total, item) => total + item.price, 0),
  };
}
