const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...(options.headers || {}),
    },
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(payload?.error?.message || `Request failed with ${response.status}`);
    error.code = payload?.error?.code || 'API_REQUEST_FAILED';
    error.status = response.status;
    throw error;
  }

  return payload;
}

export const apiClient = Object.freeze({
  getPlaces: () => request('/places'),
  getPlace: (id) => request(`/places/${encodeURIComponent(id)}`),
  getFoods: () => request('/foods'),
  getFood: (id) => request(`/foods/${encodeURIComponent(id)}`),
  getTrip: (id = 'demo') => request(`/trips/${encodeURIComponent(id)}`),
  togglePlace: (tripId, placeId) => request(`/trips/${encodeURIComponent(tripId)}/places/${encodeURIComponent(placeId)}`, { method: 'POST' }),
  toggleFood: (tripId, foodId) => request(`/trips/${encodeURIComponent(tripId)}/food/${encodeURIComponent(foodId)}`, { method: 'POST' }),
  toggleSaved: (tripId) => request(`/trips/${encodeURIComponent(tripId)}/saved`, { method: 'POST' }),
});
