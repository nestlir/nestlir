import http from 'node:http';
import { PLACES } from '../../../entities/place/model.js';
import { FOODS } from '../../../entities/food/model.js';
import { PlaceRepository } from '../domain/place/place-repository.js';
import { FoodRepository } from '../domain/food/food-repository.js';
import { InMemoryTripRepository } from '../infrastructure/repositories/in-memory-trip-repository.js';
import { TripService } from '../application/trip/trip-service.js';

const placeRepository = new PlaceRepository(PLACES);
const foodRepository = new FoodRepository(FOODS);
const tripRepository = new InMemoryTripRepository([
  { id: 'demo', places: [], food: [], saved: false },
]);
const tripService = new TripService(placeRepository, foodRepository, tripRepository);

const json = (response, status, payload) => {
  response.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
  });
  response.end(JSON.stringify(payload));
};

const resultResponse = (response, result) => {
  if (result.ok) return json(response, 200, result.value);
  const status = result.error.code.endsWith('_NOT_FOUND') ? 404 : 400;
  return json(response, status, { error: result.error });
};

export function createServer() {
  return http.createServer((request, response) => {
    if (request.method === 'OPTIONS') return json(response, 204, {});

    const url = new URL(request.url || '/', 'http://localhost');
    const segments = url.pathname.split('/').filter(Boolean);

    if (request.method === 'GET' && url.pathname === '/api/health') {
      return json(response, 200, { ok: true, service: 'nomad-api' });
    }

    if (request.method === 'GET' && url.pathname === '/api/places') {
      return json(response, 200, placeRepository.list());
    }

    if (request.method === 'GET' && segments[0] === 'api' && segments[1] === 'places' && segments[2]) {
      const place = placeRepository.findById(decodeURIComponent(segments[2]));
      return place ? json(response, 200, place) : json(response, 404, { error: { code: 'PLACE_NOT_FOUND', message: 'Place not found' } });
    }

    if (request.method === 'GET' && url.pathname === '/api/foods') {
      return json(response, 200, foodRepository.list());
    }

    if (request.method === 'GET' && segments[0] === 'api' && segments[1] === 'foods' && segments[2]) {
      const food = foodRepository.findById(decodeURIComponent(segments[2]));
      return food ? json(response, 200, food) : json(response, 404, { error: { code: 'FOOD_NOT_FOUND', message: 'Food not found' } });
    }

    if (request.method === 'GET' && segments[0] === 'api' && segments[1] === 'trips' && segments[2]) {
      return resultResponse(response, tripService.getById(decodeURIComponent(segments[2])));
    }

    if (request.method === 'POST' && segments[0] === 'api' && segments[1] === 'trips' && segments[3] === 'places') {
      return resultResponse(response, tripService.togglePlace(decodeURIComponent(segments[2]), decodeURIComponent(segments[4])));
    }

    if (request.method === 'POST' && segments[0] === 'api' && segments[1] === 'trips' && segments[3] === 'food') {
      return resultResponse(response, tripService.toggleFood(decodeURIComponent(segments[2]), decodeURIComponent(segments[4])));
    }

    if (request.method === 'POST' && segments[0] === 'api' && segments[1] === 'trips' && segments[3] === 'saved') {
      return resultResponse(response, tripService.toggleSaved(decodeURIComponent(segments[2])));
    }

    return json(response, 404, { error: { code: 'NOT_FOUND', message: 'Route not found' } });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT || 8787);
  createServer().listen(port, () => {
    console.log(`NOMAD API listening on http://localhost:${port}`);
  });
}
