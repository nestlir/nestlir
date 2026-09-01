import { PLACES } from '../entities/place/model.js';
import { FOODS } from '../entities/food/model.js';
import { createInitialTrip, loadTrip, saveTrip, toggleFood, togglePlace, toggleSaved } from '../entities/trip/model.js';
import { apiClient } from '../shared/api/api-client.js';

const DEFAULT_TRIP_ID = 'demo';
const hasSelections = (trip) => trip.places.length > 0 || trip.food.length > 0 || trip.saved;
const snapshotTrip = (trip) => ({ places: [...trip.places], food: [...trip.food], saved: trip.saved });

export function createApplication(storage, { remote = true, tripId = DEFAULT_TRIP_ID } = {}) {
  let state = loadTrip(storage, createInitialTrip());
  let syncing = false;
  let syncQueue = Promise.resolve();
  const listeners = new Set();

  const notify = () => listeners.forEach((listener) => listener(state));

  const commitLocal = (nextState) => {
    if (nextState === state) return false;
    state = nextState;
    saveTrip(storage, state);
    notify();
    return true;
  };

  const enqueuePush = (nextState = state) => {
    if (!remote) return Promise.resolve();
    const snapshot = snapshotTrip(nextState);
    syncQueue = syncQueue
      .catch(() => undefined)
      .then(() => apiClient.replaceTrip(tripId, snapshot))
      .catch(() => undefined);
    return syncQueue;
  };

  const sync = async () => {
    if (!remote || syncing) return;
    syncing = true;
    try {
      const remoteState = await apiClient.getTrip(tripId);
      if (!hasSelections(state) && remoteState && Array.isArray(remoteState.places) && Array.isArray(remoteState.food)) {
        state = { ...state, ...remoteState };
        saveTrip(storage, state);
        notify();
      } else if (hasSelections(state)) {
        await enqueuePush(state);
      }
    } catch {
      // Remote API is optional for static/offline hosting.
    } finally {
      syncing = false;
    }
  };

  return Object.freeze({
    getState: () => state,
    isSyncing: () => syncing,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    togglePlace(id) {
      const changed = commitLocal(togglePlace(state, id, PLACES));
      if (changed) void enqueuePush(state);
      return changed;
    },
    toggleFood(id) {
      const changed = commitLocal(toggleFood(state, id, FOODS));
      if (changed) void enqueuePush(state);
      return changed;
    },
    toggleSaved() {
      const changed = commitLocal(toggleSaved(state));
      if (changed) void enqueuePush(state);
      return changed;
    },
    sync,
  });
}
