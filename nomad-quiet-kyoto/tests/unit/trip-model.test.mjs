import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialTrip, toggleFood, togglePlace, toggleSaved } from '../../entities/trip/model.js';
import { PLACES } from '../../entities/place/model.js';
import { FOODS } from '../../entities/food/model.js';

test('new trip starts empty', () => {
  assert.deepEqual(createInitialTrip(), { places: [], food: [], saved: false });
});

test('place and food toggles are reversible', () => {
  const empty = createInitialTrip();
  const withPlace = togglePlace(empty, 'fushimi', PLACES);
  assert.deepEqual(withPlace.places, ['fushimi']);
  assert.deepEqual(togglePlace(withPlace, 'fushimi', PLACES).places, []);

  const withFood = toggleFood(empty, 'matcha-shade', FOODS);
  assert.deepEqual(withFood.food, ['matcha-shade']);
  assert.deepEqual(toggleFood(withFood, 'matcha-shade', FOODS).food, []);
});

test('unknown ids do not mutate state and saved toggles', () => {
  const state = createInitialTrip();
  assert.equal(togglePlace(state, 'unknown', PLACES), state);
  assert.equal(toggleFood(state, 'unknown', FOODS), state);
  assert.equal(toggleSaved(state).saved, true);
});
