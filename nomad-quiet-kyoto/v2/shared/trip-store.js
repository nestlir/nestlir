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
    state = nextState;
    persistTripState(storage, state);
    emit();
  };

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
