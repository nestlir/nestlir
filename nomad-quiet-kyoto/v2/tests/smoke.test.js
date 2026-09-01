import test from 'node:test';
import assert from 'node:assert/strict';
import { buildTripSummary } from '../shared/trip-summary.js';
import { DEFAULT_STATE, togglePlace, toggleFood, toggleSaved } from '../entities/trip/model.js';

test('trip summary uses selected places', () => {
  const summary = buildTripSummary(DEFAULT_STATE);
  assert.equal(summary.stopCount, 4);
  assert.equal(summary.distanceKm, 11.2);
  assert.equal(summary.spendYen, 1800);
});

test('trip mutations are immutable', () => {
  const state = { places: [], food: [], saved: false };
  const withPlace = togglePlace(state, 'gion');
  const withFood = toggleFood(withPlace, 'matcha-shade');
  const saved = toggleSaved(withFood);

  assert.deepEqual(state, { places: [], food: [], saved: false });
  assert.deepEqual(withPlace.places, ['gion']);
  assert.deepEqual(withFood.food, ['matcha-shade']);
  assert.equal(saved.saved, true);
});
