import { ROUTES } from './router.js';
import { renderHome } from '../pages/home.js';
import { renderExplore } from '../pages/explore.js';
import { renderEat } from '../pages/eat.js';
import { renderTrip } from '../pages/trip.js';
import { renderPlace } from '../pages/place.js';
import { renderFoodDetail } from '../pages/food-detail.js';

export const PAGE_RENDERERS = Object.freeze({
  [ROUTES.HOME]: (root, application, navigate) => renderHome(root, application, navigate),
  [ROUTES.EXPLORE]: (root, application, navigate) => renderExplore(root, application, navigate),
  [ROUTES.EAT]: (root, application, navigate) => renderEat(root, application, navigate),
  [ROUTES.TRIP]: (root, application, navigate) => renderTrip(root, application, navigate),
  [ROUTES.PLACE]: (root, application, navigate, params = {}) => renderPlace(root, application, params.id, navigate),
  [ROUTES.FOOD]: (root, application, navigate, params = {}) => renderFoodDetail(root, application, params.id, navigate),
});

export function getPageRenderer(routeName) {
  return PAGE_RENDERERS[routeName] ?? PAGE_RENDERERS[ROUTES.HOME];
}
