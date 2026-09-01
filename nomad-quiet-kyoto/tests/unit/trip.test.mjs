import test from 'node:test';
import assert from 'node:assert/strict';
import { PLACES } from '../../entities/place/model.js';
import { FOODS } from '../../entities/food/model.js';
import { createInitialTrip, toggleFood, togglePlace, toggleSaved } from '../../entities/trip/model.js';
import { getTripSummary } from '../../shared/lib/trip-summary.js';

test('initial trip has the default Kyoto route', () => {
  const trip = createInitialTrip();
  assert.deepEqual(trip.places, ['fushimi', 'higashiyama', 'nishiki', 'gion']);
  assert.deepEqual(trip.food, []);
  assert.equal(trip.saved, false);
});

test('place toggle is immutable and rejects unknown ids', () => {
  const initial = createInitialTrip();
  const removed = togglePlace(initial, 'gion', PLACES);
  const rejected = togglePlace(initial, 'unknown-place', PLACES);
  assert.notStrictEqual(removed, initial);
  assert.equal(removed.places.includes('gion'), false);
  assert.strictEqual(rejected, initial);
});

test('food toggle is immutable and rejects unknown ids', () => {
  const initial = createInitialTrip();
  const added = toggleFood(initial, 'matcha-shade', FOODS);
  const rejected = toggleFood(initial, 'unknown-food', FOODS);
  assert.equal(added.food.includes('matcha-shade'), true);
  assert.strictEqual(rejected, initial);
});

test('saved flag toggles immutably', () => {
  const initial = createInitialTrip();
  const next = toggleSaved(initial);
  assert.equal(next.saved, true);
  assert.equal(initial.saved, false);
});

test('summary derives distance and spend from selected entities', () => {
  const trip = {places: ['fushimi', 'gion'], food: ['matcha-shade'], saved: false};
  const summary = getTripSummary(trip);
  assert.equal(summary.stops, 3);
  assert.equal(summary.distance, 3.2 + 3.1);
  assert.equal(summary.spend, 1200);
});
