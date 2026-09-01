export class PlaceRepository {
  constructor(places) {
    this.places = places;
  }

  list() {
    return [...this.places];
  }

  findById(id) {
    return this.places.find((place) => place.id === id) ?? null;
  }
}
