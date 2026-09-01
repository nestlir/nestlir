export const runtimeConfig = Object.freeze({
  apiBaseUrl: globalThis.__NOMAD_API_BASE_URL__ || '/api',
  tripId: globalThis.__NOMAD_TRIP_ID__ || 'demo',
});
