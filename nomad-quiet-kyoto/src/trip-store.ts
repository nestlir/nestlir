import type { FoodId, PlaceId, TripState } from './domain';
import { DEFAULT_TRIP, readTripState, writeTripState } from './repository';

export interface TripStore {
  getState(): TripState;
  togglePlace(id: PlaceId): TripState;
  toggleFood(id: FoodId): TripState;
  setSaved(saved: boolean): TripState;
}

export function createTripStore(storage: Storage): TripStore {
  let state = readTripState(storage);

  const persist = (): TripState => {
    writeTripState(storage, state);
    return state;
  };

  return {
    getState: () => state,
    togglePlace: (id) => {
      state = {
        ...state,
        places: state.places.includes(id)
          ? state.places.filter((value) => value !== id)
          : [...state.places, id],
      };
      return persist();
    },
    toggleFood: (id) => {
      state = {
        ...state,
        food: state.food.includes(id)
          ? state.food.filter((value) => value !== id)
          : [...state.food, id],
      };
      return persist();
    },
    setSaved: (saved) => {
      state = { ...state, saved };
      return persist();
    },
  };
}

export function createMemoryTripStore(): TripStore {
  let state = { ...DEFAULT_TRIP };
  return createTripStore({
    getItem: () => JSON.stringify(state),
    setItem: (_key, value) => {
      state = JSON.parse(value) as TripState;
    },
    removeItem: () => undefined,
    clear: () => undefined,
    key: () => null,
    length: 0,
  });
}
