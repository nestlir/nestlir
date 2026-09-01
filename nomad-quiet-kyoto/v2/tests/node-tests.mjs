import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_STATE,
  toggleFood,
  togglePlace,
  toggleSaved,
} from '../entities/trip/model.js';
import { places, isKnownPlaceId } from '../entities/place/model.js';
import { buildTripSummary } from '../shared/trip-summary.js';

const clone = (value) => JSON.parse(JSON.stringify(value));

test('default trip summary is stable', () => {
  const summary = buildTripSummary(DEFAULT_STATE);
  assert.deepEqual(summary, {
    stopCount: 4,
    distanceKm: 11.2,
    spendYen: 1800,
  });
});

test('place catalog has unique ids', () => {
  const ids = places.map((place) => place.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('unknown place ids are ignored', () => {
  const state = { places: [], food: [], saved: false };
  assert.equal(isKnownPlaceId('not-a-place'), false);
  assert.deepEqual(togglePlace(state, 'not-a-place'), state);
});

test('trip mutations are immutable', () => {
  const state = { places: [], food: [], saved: false };
  const nextPlace = togglePlace(state, 'gion');
  const nextFood = toggleFood(nextPlace, 'matcha-shade');
  const nextSaved = toggleSaved(nextFood);

  assert.deepEqual(state, { places: [], food: [], saved: false });
  assert.notStrictEqual(nextPlace, state);
  assert.notStrictEqual(nextFood, nextPlace);
  assert.notStrictEqual(nextSaved, nextFood);
});

test('summary does not mutate input', () => {
  const state = clone(DEFAULT_STATE);
  const before = clone(state);
  buildTripSummary(state);
  assert.deepEqual(state, before);
});

console.log('NOMAD contract tests loaded successfully.');
