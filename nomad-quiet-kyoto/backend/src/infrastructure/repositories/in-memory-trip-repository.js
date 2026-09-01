export class InMemoryTripRepository {
  constructor(initialTrips = []) {
    this.trips = new Map(initialTrips.map((trip) => [trip.id, structuredClone(trip)]));
  }

  findById(id) {
    const trip = this.trips.get(id);
    return trip ? structuredClone(trip) : null;
  }

  save(trip) {
    const next = structuredClone(trip);
    this.trips.set(next.id, next);
    return structuredClone(next);
  }
}
