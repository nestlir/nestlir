import { findPlace } from '../../entities/place/model.js';
import { findFood } from '../../entities/food/model.js';

export function getTripSummary(state) {
  const places = state.places.map(findPlace).filter(Boolean);
  const food = state.food.map(findFood).filter(Boolean);

  return {
    places,
    food,
    stops: places.length + food.length,
    distance: places.reduce((sum, item) => sum + item.distance, 0),
    spend: places.reduce((sum, item) => sum + item.price, 0) + food.reduce((sum, item) => sum + item.price, 0),
  };
}
