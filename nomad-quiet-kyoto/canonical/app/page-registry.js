import { renderHome } from '../pages/home.js';
import { renderExplore } from '../pages/explore.js';
import { renderEat } from '../pages/eat.js';
import { renderTrip } from '../pages/trip.js';
import { renderPlaceDetail } from '../pages/place.js';

export const PAGE_REGISTRY = Object.freeze({
  home: renderHome,
  explore: renderExplore,
  eat: renderEat,
  trip: renderTrip,
  place: renderPlaceDetail,
});
