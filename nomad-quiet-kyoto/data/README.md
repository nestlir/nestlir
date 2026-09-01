# NOMAD data layer

Shared client-side data for the Kyoto prototype.

- `places.js` — destination/place entities.
- `food.js` — food entries.
- `trip-state.js` — persisted itinerary state and pure state transitions.

The intended dependency direction is:

`pages/features → data → browser storage`

UI modules should consume these entities instead of duplicating place or food records.
