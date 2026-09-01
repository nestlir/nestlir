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
import { apiClient } from '../shared/api/api-client.js';

const DEFAULT_TRIP_ID = 'demo';

export function createApplication(storage, { remote = true, tripId = DEFAULT_TRIP_ID } = {}) {
  let state = loadTrip(storage, createInitialTrip(PLACES, FOODS));
  let syncing = false;
  const listeners = new Set();

  const notify = () => listeners.forEach((listener) => listener(state));

  const commitLocal = (nextState) => {
    if (nextState === state) return false;
    state = nextState;
    saveTrip(storage, state);
    notify();
    return true;
  };

  const sync = async () => {
    if (!remote || syncing) return;
    syncing = true;
    try {
      const remoteState = await apiClient.getTrip(tripId);
      if (remoteState && Array.isArray(remoteState.places) && Array.isArray(remoteState.food)) {
        state = { ...state, ...remoteState };
        saveTrip(storage, state);
        notify();
      }
    } catch {
      // Remote API is optional for static/offline hosting.
    } finally {
      syncing = false;
    }
  };

  const mutateRemote = async (action) => {
    if (!remote) return;
    try {
      const remoteState = await action();
      if (remoteState && Array.isArray(remoteState.places) && Array.isArray(remoteState.food)) {
        state = { ...state, ...remoteState };
        saveTrip(storage, state);
        notify();
      }
    } catch {
      // Keep the optimistic local state if the API is unavailable.
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
      if (changed) void mutateRemote(() => apiClient.togglePlace(tripId, id));
      return changed;
    },
    toggleFood(id) {
      const changed = commitLocal(toggleFood(state, id, FOODS));
      if (changed) void mutateRemote(() => apiClient.toggleFood(tripId, id));
      return changed;
    },
    toggleSaved() {
      const changed = commitLocal(toggleSaved(state));
      if (changed) void mutateRemote(() => apiClient.toggleSaved(tripId));
      return changed;
    },
    sync,
  });
}
