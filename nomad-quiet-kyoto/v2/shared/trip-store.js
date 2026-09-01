import {
  createTripState,
  persistTripState,
  toggleFood,
  togglePlace,
  toggleSaved,
} from '../entities/trip/model.js';

export function createTripStore(storage) {
  let state = createTripState(storage);
  const listeners = new Set();

  const emit = () => {
    listeners.forEach((listener) => listener(state));
  };

  const setState = (nextState) => {
    if (nextState === state) return false;
    state = nextState;
    persistTripState(storage, state);
    emit();
    return true;
  };

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    togglePlace(id) {
      return setState(togglePlace(state, id));
    },
    toggleFood(id) {
      return setState(toggleFood(state, id));
    },
    toggleSaved() {
      return setState(toggleSaved(state));
    },
  };
}
