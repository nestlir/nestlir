import { PLACES } from '../entities/place/model.js';
import { FOODS } from '../entities/food/model.js';
import {
  createInitialTrip,
  loadTrip,
  saveTrip,
  toggleFood,
  togglePlace,
  toggleSaved,
} from '../entities/trip/model.js';

export function createApplication(storage) {
  let state = loadTrip(storage, createInitialTrip(PLACES, FOODS));
  const listeners = new Set();

  function notify() {
    listeners.forEach((listener) => listener(state));
  }

  function commit(nextState) {
    if (nextState === state) return false;
    state = nextState;
    saveTrip(storage, state);
    notify();
    return true;
  }

  return Object.freeze({
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    togglePlace(id) {
      return commit(togglePlace(state, id, PLACES));
    },
    toggleFood(id) {
      return commit(toggleFood(state, id, FOODS));
    },
    toggleSaved() {
      return commit(toggleSaved(state));
    },
  });
}
