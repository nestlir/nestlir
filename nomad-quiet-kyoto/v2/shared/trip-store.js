import { createTripState, togglePlace, toggleFood, toggleSaved } from '../entities/trip/model.js';

export function createTripStore(storage) {
  let state = createTripState(storage);
  const listeners = new Set();

  function emit() {
    listeners.forEach((listener) => listener(state));
  }

  function setState(nextState) {
    state = nextState;
    storage.setItem('nomad-trip-v2', JSON.stringify(state));
    emit();
  }

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    togglePlace(id) {
      setState(togglePlace(state, id));
    },
    toggleFood(id) {
      setState(toggleFood(state, id));
    },
    toggleSaved() {
      setState(toggleSaved(state));
    },
  };
}
