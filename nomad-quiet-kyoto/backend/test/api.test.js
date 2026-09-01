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
  const body = await response.json();
  return { status: response.status, body };
}

test('GET /api/health returns healthy response', async () => {
  const result = await request('/api/health');
  assert.equal(result.status, 200);
  assert.deepEqual(result.body, { ok: true, service: 'nomad-api' });
});

test('GET /api/places returns place collection', async () => {
  const result = await request('/api/places');
  assert.equal(result.status, 200);
  assert.ok(Array.isArray(result.body));
  assert.ok(result.body.some((item) => item.id === 'fushimi'));
});

test('GET /api/foods returns food collection', async () => {
  const result = await request('/api/foods');
  assert.equal(result.status, 200);
  assert.ok(Array.isArray(result.body));
  assert.ok(result.body.some((item) => item.id === 'matcha-shade'));
});

test('Trip can toggle a valid place and food', async () => {
  const place = await request('/api/trips/demo/places/fushimi', { method: 'POST' });
  assert.equal(place.status, 200);
  assert.ok(place.body.places.includes('fushimi'));

  const food = await request('/api/trips/demo/food/matcha-shade', { method: 'POST' });
  assert.equal(food.status, 200);
  assert.ok(food.body.food.includes('matcha-shade'));
});

test('Trip rejects unknown entities', async () => {
  const result = await request('/api/trips/demo/places/not-a-place', { method: 'POST' });
  assert.equal(result.status, 404);
  assert.equal(result.body.error.code, 'PLACE_NOT_FOUND');
});

test('Trip rejects unknown trip id', async () => {
  const result = await request('/api/trips/not-found/places/fushimi', { method: 'POST' });
  assert.equal(result.status, 404);
  assert.equal(result.body.error.code, 'TRIP_NOT_FOUND');
});
