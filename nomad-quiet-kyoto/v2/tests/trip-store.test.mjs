import test from 'node:test';
import assert from 'node:assert/strict';
import { createTripStore } from '../shared/trip-store.js';
import { createMemoryStorage } from './fixtures/memory-storage.js';

test('store persists and restores the trip', () => {
  const storage = createMemoryStorage();
  const first = createTripStore(storage);

  first.togglePlace('fushimi');
  first.toggleFood('matcha-shade');
  first.toggleSaved();

  const second = createTripStore(storage);
  assert.equal(second.getState().places.includes('fushimi'), false);
  assert.equal(second.getState().food.includes('matcha-shade'), true);
  assert.equal(second.getState().saved, true);
});

test('unknown place does not mutate state', () => {
  const storage = createMemoryStorage();
  const store = createTripStore(storage);
  const before = store.getState();

  const changed = store.togglePlace('does-not-exist');

  assert.equal(changed, false);
  assert.deepEqual(store.getState(), before);
});

test('subscribe is notified only when state changes', () => {
  const storage = createMemoryStorage();
  const store = createTripStore(storage);
  let calls = 0;
  const unsubscribe = store.subscribe(() => {
    calls += 1;
  });

  store.togglePlace('gion');
  store.togglePlace('does-not-exist');
  store.toggleSaved();

  unsubscribe();
  store.toggleSaved();

  assert.equal(calls, 2);
});
