import assert from 'node:assert/strict';
import test from 'node:test';
import { createTripStore } from '../shared/trip-store.js';

function createMemoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, String(value)),
  };
}

test('trip store toggles a place and persists it', () => {
  const storage = createMemoryStorage();
  const store = createTripStore(storage);
  const before = store.getState().places.length;

  store.togglePlace('kamo');
  assert.equal(store.getState().places.length, before + 1);

  const secondStore = createTripStore(storage);
  assert.equal(secondStore.getState().places.includes('kamo'), true);
});

test('trip store toggles food', () => {
  const store = createTripStore(createMemoryStorage());
  store.toggleFood('matcha-shade');
  assert.deepEqual(store.getState().food, ['matcha-shade']);
  store.toggleFood('matcha-shade');
  assert.deepEqual(store.getState().food, []);
});

test('trip store notifies subscribers', () => {
  const store = createTripStore(createMemoryStorage());
  let calls = 0;
  const unsubscribe = store.subscribe(() => { calls += 1; });

  store.togglePlace('kamo');
  unsubscribe();
  store.togglePlace('fushimi');

  assert.equal(calls, 1);
});
