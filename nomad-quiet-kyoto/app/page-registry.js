import { ROUTES } from './router.js';
import { renderHome } from '../pages/home.js';
import { renderExplore } from '../pages/explore.js';
import { renderEat } from '../pages/eat.js';
import { renderTrip } from '../pages/trip.js';
import { renderPlace } from '../pages/place.js';
import { renderFoodDetail } from '../pages/food-detail.js';

export const PAGE_RENDERERS = Object.freeze({
  [ROUTES.HOME]: renderHome,
  [ROUTES.EXPLORE]: renderExplore,
  [ROUTES.EAT]: renderEat,
  [ROUTES.TRIP]: renderTrip,
  [ROUTES.PLACE]: renderPlace,
  [ROUTES.FOOD]: renderFoodDetail,
});

export function getPageRenderer(routeName) {
  return PAGE_RENDERERS[routeName] ?? PAGE_RENDERERS[ROUTES.HOME];
}
