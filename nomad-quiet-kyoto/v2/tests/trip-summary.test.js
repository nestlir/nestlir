import assert from 'node:assert/strict';
import test from 'node:test';
import { places } from '../entities/place/model.js';
import { buildSummary } from '../shared/trip-summary.js';

test('trip summary calculates selected places', () => {
  const summary = buildSummary({
    places: ['fushimi', 'gion'],
    food: [],
    saved: false,
  }, places, []);

  assert.equal(summary.stopCount, 2);
  assert.equal(summary.placeCount, 2);
  assert.equal(summary.foodCount, 0);
  assert.equal(summary.distanceKm, 6.3);
  assert.equal(summary.spendYen, 0);
});

test('trip summary ignores unknown ids', () => {
  const summary = buildSummary({
    places: ['does-not-exist'],
    food: ['also-missing'],
    saved: false,
  }, places, []);

  assert.deepEqual(summary, {
    placeCount: 0,
    foodCount: 0,
    stopCount: 0,
    distanceKm: 0,
    spendYen: 0,
  });
});
