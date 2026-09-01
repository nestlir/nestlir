export type Brand<T, Name extends string> = T & { readonly __brand: Name };

export type PlaceId = Brand<string, 'PlaceId'>;
export type FoodId = Brand<string, 'FoodId'>;

export type PlaceType = 'walk' | 'ritual' | 'food';
export type FoodType = 'morning' | 'tea' | 'dinner';

export interface Place {
  readonly id: PlaceId;
  readonly type: PlaceType;
  readonly name: string;
  readonly area: string;
  readonly time: string;
  readonly duration: string;
  readonly price: number;
  readonly distance: number;
  readonly image: string;
  readonly description: string;
}

export interface Food {
  readonly id: FoodId;
  readonly type: FoodType;
  readonly name: string;
  readonly place: string;
  readonly price: number;
  readonly duration: string;
  readonly image: string;
  readonly description: string;
}

export interface TripState {
  readonly places: readonly PlaceId[];
  readonly food: readonly FoodId[];
  readonly saved: boolean;
}

export interface TripSummary {
  readonly placeCount: number;
  readonly foodCount: number;
  readonly stopCount: number;
  readonly distanceKm: number;
  readonly spendYen: number;
}

export const asPlaceId = (value: string): PlaceId => value as PlaceId;
export const asFoodId = (value: string): FoodId => value as FoodId;
