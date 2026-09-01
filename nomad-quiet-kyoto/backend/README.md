# NOMAD API

Small HTTP API for the NOMAD Kyoto application.

## Architecture

```text
HTTP API
  ↓
Application services
  ↓
Domain repositories
  ↓
Infrastructure repositories
```

The current infrastructure uses an in-memory trip repository. This is intentional: the domain and application contracts are stable before introducing a database adapter.

## Run

```bash
npm start
```

Default address: `http://127.0.0.1:8787`

## Test

```bash
npm test
```

## Endpoints

```text
GET  /api/health
GET  /api/places
GET  /api/places/:id
GET  /api/foods
GET  /api/foods/:id
GET  /api/trips/:id
POST /api/trips/:id/places/:placeId
POST /api/trips/:id/food/:foodId
POST /api/trips/:id/saved
```

The API returns stable JSON contracts and uses explicit domain error codes such as `PLACE_NOT_FOUND`, `FOOD_NOT_FOUND`, and `TRIP_NOT_FOUND`.
