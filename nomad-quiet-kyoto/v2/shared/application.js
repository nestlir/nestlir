import { food } from '../entities/food/model.js';
import { places, isKnownPlaceId } from '../entities/place/model.js';
import { createTripState, persistTripState, toggleFood, togglePlace, toggleSaved } from '../entities/trip/model.js';

export function createApplication(storage) {
  let state = createTripState(storage);
  const listeners = new Set();

  function notify() {
    for (const listener of listeners) listener(state);
  }

  function commit(nextState) {
    if (Object.is(nextState, state)) return false;
    state = nextState;
    persistTripState(storage, state);
    notify();
    return true;
  }

  return Object.freeze({
    getState: () => state,
    getPlaces: () => places,
    getFood: () => food,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    togglePlace(id) {
      if (!isKnownPlaceId(id)) return false;
      return commit(togglePlace(state, id));
    },
    toggleFood(id) {
      return commit(toggleFood(state, id));
    },
    toggleSaved() {
      return commit(toggleSaved(state));
    },
  });
}
