import assert from 'node:assert/strict';
import test from 'node:test';
import { places, isKnownPlaceId } from '../entities/place/model.js';
import { DEFAULT_STATE, togglePlace } from '../entities/trip/model.js';
import { buildTripSummary } from '../shared/trip-summary.js';

const memoryStorage = () => {
  const map = new Map();
  return {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, value),
  };
};

test('place entity exposes stable ids', () => {
  assert.equal(places.length, 4);
  assert.equal(isKnownPlaceId('fushimi'), true);
  assert.equal(isKnownPlaceId('unknown'), false);
});

test('trip domain rejects unknown places', () => {
  const next = togglePlace(DEFAULT_STATE, 'unknown-place');
  assert.deepEqual(next, DEFAULT_STATE);
});

test('trip summary derives default values without mutation', () => {
  const state = structuredClone(DEFAULT_STATE);
  const summary = buildTripSummary(state);
  assert.equal(summary.stopCount, 4);
  assert.equal(summary.distanceKm, 11.2);
  assert.equal(summary.spendYen, 1800);
  assert.deepEqual(state, DEFAULT_STATE);
});

test('storage round-trip can be exercised without a browser', async () => {
  const storage = memoryStorage();
  const { writeTrip, readTrip } = await import('../shared/storage.js');
  const state = { places: ['fushimi'], food: [], saved: true };
  writeTrip(storage, state);
  assert.deepEqual(readTrip(storage), state);
});
