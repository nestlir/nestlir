import type { Food, FoodId, Place, PlaceId, TripState } from './domain';

export const PLACES: readonly Place[] = [
  {
    id: 'fushimi' as PlaceId,
    type: 'walk',
    name: 'Fushimi Inari',
    area: 'Fushimi',
    time: '07:10',
    duration: '01h40m',
    price: 0,
    distance: 3.2,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=84',
    description: 'Begin beneath the vermilion gates before the city wakes.',
  },
  {
    id: 'higashiyama' as PlaceId,
    type: 'walk',
    name: 'Higashiyama',
    area: 'Higashiyama',
    time: '09:20',
    duration: '01h50m',
    price: 0,
    distance: 2.8,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=84',
    description: 'Quiet lanes, wooden facades and small courtyards above the old city.',
  },
  {
    id: 'nishiki' as PlaceId,
    type: 'food',
    name: 'Nishiki Market',
    area: 'Central Kyoto',
    time: '12:30',
    duration: '01h20m',
    price: 1800,
    distance: 2.1,
    image: 'https://images.unsplash.com/photo-1558180071-9f8e0f2e7b9a?auto=format&fit=crop&w=1200&q=84',
    description: 'A compact market for tasting, wandering and stopping often.',
  },
  {
    id: 'gion' as PlaceId,
    type: 'ritual',
    name: 'Gion',
    area: 'Gion',
    time: '18:42',
    duration: '01h40m',
    price: 0,
    distance: 3.1,
    image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=84',
    description: 'Arrive when the lanterns begin to carry the evening.',
  },
  {
    id: 'kamo' as PlaceId,
    type: 'food',
    name: 'Kamo Breakfast',
    area: 'Kamo River',
    time: '08:16',
    duration: '00h45m',
    price: 1400,
    distance: 1.4,
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=84',
    description: 'A slow breakfast beside the river before the city gets loud.',
  },
];

export const FOOD: readonly Food[] = [
  {
    id: 'kamo-breakfast' as FoodId,
    type: 'morning',
    name: 'Breakfast by the Kamo',
    place: 'Kamo River',
    price: 1400,
    duration: '00h45m',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=84',
    description: 'A simple breakfast to take slowly beside the river.',
  },
  {
    id: 'bowl-rain' as FoodId,
    type: 'dinner',
    name: 'A bowl after rain',
    place: 'Gion',
    price: 1800,
    duration: '00h50m',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=1200&q=84',
    description: 'Warm noodles and a quiet counter after a long walk.',
  },
  {
    id: 'matcha-shade' as FoodId,
    type: 'tea',
    name: 'Matcha, in the shade',
    place: 'Higashiyama',
    price: 1200,
    duration: '00h40m',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=84',
    description: 'Matcha and a small sweet in a garden-facing tea room.',
  },
  {
    id: 'nishiki-light' as FoodId,
    type: 'morning',
    name: 'Nishiki at first light',
    place: 'Nishiki Market',
    price: 1600,
    duration: '00h55m',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=84',
    description: 'Small bites and market stalls before the busiest hours.',
  },
  {
    id: 'long-table' as FoodId,
    type: 'dinner',
    name: 'A long table',
    place: 'Pontocho',
    price: 3200,
    duration: '01h30m',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=84',
    description: 'An unhurried evening meal close to the river.',
  },
];

export const DEFAULT_TRIP: TripState = {
  places: ['fushimi', 'higashiyama', 'nishiki', 'gion'] as PlaceId[],
  food: [],
  saved: false,
};

const STORAGE_KEY = 'nomad-kyoto-trip-v2';

export function readTripState(storage: Storage): TripState {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TRIP;
    const parsed: unknown = JSON.parse(raw);
    if (!isTripState(parsed)) return DEFAULT_TRIP;
    return parsed;
  } catch {
    return DEFAULT_TRIP;
  }
}

export function writeTripState(storage: Storage, state: TripState): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function findPlace(id: PlaceId): Place | undefined {
  return PLACES.find((place) => place.id === id);
}

export function findFood(id: FoodId): Food | undefined {
  return FOOD.find((item) => item.id === id);
}

function isTripState(value: unknown): value is TripState {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    Array.isArray(candidate.places) &&
    candidate.places.every((id) => typeof id === 'string') &&
    Array.isArray(candidate.food) &&
    candidate.food.every((id) => typeof id === 'string') &&
    typeof candidate.saved === 'boolean'
  );
}
