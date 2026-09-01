import { getPlace } from '../../entities/place/model.js';
import { getFood } from '../../entities/food/model.js';

export function getTripSummary(state) {
  const places = state.places.map(getPlace).filter(Boolean);
  const food = state.food.map(getFood).filter(Boolean);

  return {
    places,
    food,
    stops: places.length + food.length,
    distance: places.reduce((total, place) => total + place.distance, 0),
    spend:
      places.reduce((total, place) => total + place.price, 0) +
      food.reduce((total, item) => total + item.price, 0),
  };
}
