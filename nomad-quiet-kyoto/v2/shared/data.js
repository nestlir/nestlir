import { places } from '../entities/place/model.js';

export { places };

export function getPlace(id) {
  return places.find((place) => place.id === id);
}
