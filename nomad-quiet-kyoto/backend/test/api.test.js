import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../src/api/server.js';

let server;
let baseUrl;

test.before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
});

async function request(path, options) {
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  return { status: response.status, body: text ? JSON.parse(text) : null };
}

test('GET /api/health returns healthy response', async () => {
  const result = await request('/api/health');
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { ok: true, service: 'nomad-api' });
});

test('GET collections return canonical entities', async () => {
  const places = await request('/api/places');
  const foods = await request('/api/foods');
  assert.equal(places.status, 200);
  assert.equal(foods.status, 200);
  assert.ok(places.body.some((item) => item.id === 'fushimi'));
  assert.ok(foods.body.some((item) => item.id === 'matcha-shade'));
});

test('PUT /api/trips/:id synchronizes the full trip state', async () => {
  const result = await request('/api/trips/demo', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ places: ['fushimi', 'gion'], food: ['matcha-shade'], saved: true }),
  });
  assert.equal(result.status, 200);
  assert.deepEqual(result.body.places, ['fushimi', 'gion']);
  assert.deepEqual(result.body.food, ['matcha-shade']);
  assert.equal(result.body.saved, true);
});

test('Trip mutations preserve a valid server state', async () => {
  const place = await request('/api/trips/demo/places/fushimi', { method: 'POST' });
  assert.equal(place.status, 200);
  assert.equal(place.body.places.includes('fushimi'), false);

  const food = await request('/api/trips/demo/food/matcha-shade', { method: 'POST' });
  assert.equal(food.status, 200);
  assert.equal(food.body.food.includes('matcha-shade'), false);
});

test('Trip rejects unknown entities and malformed input', async () => {
  const unknown = await request('/api/trips/demo/places/not-a-place', { method: 'POST' });
  assert.equal(unknown.status, 404);
  assert.equal(unknown.body.error.code, 'PLACE_NOT_FOUND');

  const invalidJson = await request('/api/trips/demo', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: '{',
  });
  assert.equal(invalidJson.status, 400);
  assert.equal(invalidJson.body.error.code, 'INVALID_JSON');
});

test('OPTIONS returns a valid empty CORS response', async () => {
  const result = await request('/api/trips/demo', { method: 'OPTIONS' });
  assert.equal(result.status, 204);
  assert.equal(result.body, null);
});
