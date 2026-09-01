export type PlaceId = string & { readonly __brand: 'PlaceId' };
export type FoodId = string & { readonly __brand: 'FoodId' };

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
