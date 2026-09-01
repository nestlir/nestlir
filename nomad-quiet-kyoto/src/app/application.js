import { DEFAULT_TRIP, toggleFood, togglePlace, toggleSaved } from '../entities/trip/model.js';
import { isKnownFoodId } from '../entities/food/model.js';
import { isKnownPlaceId } from '../entities/place/model.js';
import { createTripStorage, isTripState } from '../shared/storage/trip-storage.js';

export function createApplication(storage) {
  const persistence = createTripStorage(storage, DEFAULT_TRIP, isTripState);
  let state = persistence.read();
  const listeners = new Set();

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function commit(nextState) {
    if (Object.is(state, nextState)) return false;
    state = nextState;
    persistence.write(state);
    listeners.forEach((listener) => listener(state));
    return true;
  }

  return Object.freeze({
    getState: () => state,
    subscribe,
    togglePlace(id) {
      return isKnownPlaceId(id) && commit(togglePlace(state, id));
    },
    toggleFood(id) {
      return isKnownFoodId(id) && commit(toggleFood(state, id));
    },
    toggleSaved() {
      return commit(toggleSaved(state));
    },
  });
}
