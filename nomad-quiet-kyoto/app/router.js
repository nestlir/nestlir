export const ROUTES = Object.freeze({
  HOME: 'home',
  EXPLORE: 'explore',
  EAT: 'eat',
  TRIP: 'trip',
  PLACE: 'place',
  FOOD: 'food',
});

const VALID_TOP_LEVEL = new Set(Object.values(ROUTES));

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parseRoute(location = window.location) {
  const rawHash = typeof location.hash === 'string' ? location.hash : '';
  const hash = rawHash.replace(/^#/, '').replace(/^\//, '').trim();
  if (!hash) return { name: ROUTES.HOME, params: {} };

  const [path, queryString = ''] = hash.split('?');
  const segments = path.split('/').filter(Boolean).map(safeDecode);
  const params = Object.fromEntries(new URLSearchParams(queryString));
  const [name, id] = segments;

  if (name === ROUTES.PLACE && id) {
    return { name, params: { id, ...params } };
  }

  if (name === ROUTES.FOOD && id) {
    return { name, params: { id, ...params } };
  }

  if (VALID_TOP_LEVEL.has(name)) {
    return { name, params };
  }

  return { name: ROUTES.HOME, params: {} };
}

export function navigate(name, params = {}) {
  if (!VALID_TOP_LEVEL.has(name)) return false;

  const id = params.id ? `/${encodeURIComponent(String(params.id))}` : '';
  const queryEntries = Object.entries(params)
    .filter(([key]) => key !== 'id' && valueIsPresent(params[key]))
    .map(([key, value]) => [key, String(value)]);
  const query = new URLSearchParams(queryEntries).toString();
  const nextHash = `#${name}${id}${query ? `?${query}` : ''}`;

  if (window.location.hash === nextHash) {
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    return true;
  }

  window.location.hash = nextHash;
  return true;
}

function valueIsPresent(value) {
  return value !== null && value !== undefined && value !== '';
}

export function startRouter(onChange) {
  const handleChange = () => onChange(parseRoute());
  window.addEventListener('hashchange', handleChange);
  handleChange();
  return () => window.removeEventListener('hashchange', handleChange);
}
