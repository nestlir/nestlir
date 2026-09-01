const ok = (value) => ({ ok: true, value });
const fail = (code, message) => ({ ok: false, error: { code, message } });

export class TripService {
  constructor(placeRepository, foodRepository, tripRepository) {
    this.placeRepository = placeRepository;
    this.foodRepository = foodRepository;
    this.tripRepository = tripRepository;
  }

  getById(id) {
    const trip = this.tripRepository.findById(id);
    return trip ? ok(trip) : fail('TRIP_NOT_FOUND', `Trip ${id} was not found`);
  }

  replace(tripId, nextState) {
    const trip = this.tripRepository.findById(tripId);
    if (!trip) return fail('TRIP_NOT_FOUND', `Trip ${tripId} was not found`);

    const places = Array.isArray(nextState?.places) ? nextState.places : [];
    const food = Array.isArray(nextState?.food) ? nextState.food : [];

    const unknownPlace = places.find((id) => !this.placeRepository.findById(id));
    if (unknownPlace) return fail('PLACE_NOT_FOUND', `Place ${unknownPlace} was not found`);

    const unknownFood = food.find((id) => !this.foodRepository.findById(id));
    if (unknownFood) return fail('FOOD_NOT_FOUND', `Food ${unknownFood} was not found`);

    return ok(this.tripRepository.save({
      ...trip,
      places: [...new Set(places)],
      food: [...new Set(food)],
      saved: Boolean(nextState?.saved),
    }));
  }

  togglePlace(tripId, placeId) {
    if (!this.placeRepository.findById(placeId)) {
      return fail('PLACE_NOT_FOUND', `Place ${placeId} was not found`);
    }

    const trip = this.tripRepository.findById(tripId);
    if (!trip) return fail('TRIP_NOT_FOUND', `Trip ${tripId} was not found`);

    const places = trip.places.includes(placeId)
      ? trip.places.filter((id) => id !== placeId)
      : [...trip.places, placeId];

    return ok(this.tripRepository.save({ ...trip, places }));
  }

  toggleFood(tripId, foodId) {
    if (!this.foodRepository.findById(foodId)) {
      return fail('FOOD_NOT_FOUND', `Food ${foodId} was not found`);
    }

    const trip = this.tripRepository.findById(tripId);
    if (!trip) return fail('TRIP_NOT_FOUND', `Trip ${tripId} was not found`);

    const food = trip.food.includes(foodId)
      ? trip.food.filter((id) => id !== foodId)
      : [...trip.food, foodId];

    return ok(this.tripRepository.save({ ...trip, food }));
  }

  toggleSaved(tripId) {
    const trip = this.tripRepository.findById(tripId);
    if (!trip) return fail('TRIP_NOT_FOUND', `Trip ${tripId} was not found`);
    return ok(this.tripRepository.save({ ...trip, saved: !trip.saved }));
  }
}
