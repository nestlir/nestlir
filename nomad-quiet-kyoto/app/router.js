export const ROUTES = Object.freeze({
  HOME: 'home',
  EXPLORE: 'explore',
  EAT: 'eat',
  TRIP: 'trip',
  PLACE: 'place',
  FOOD: 'food',
});

export function parseRoute(location = window.location) {
  const hash = location.hash.replace(/^#/, '').replace(/^\//, '');
  if (!hash) return {name: ROUTES.HOME, params: {}};

  const [path, queryString = ''] = hash.split('?');
  const segments = path.split('/').filter(Boolean);
  const params = Object.fromEntries(new URLSearchParams(queryString));

  if (segments[0] === ROUTES.PLACE && segments[1]) {
    return {name: ROUTES.PLACE, params: {id: decodeURIComponent(segments[1]), ...params}};
  }

  if (segments[0] === ROUTES.FOOD && segments[1]) {
    return {name: ROUTES.FOOD, params: {id: decodeURIComponent(segments[1]), ...params}};
  }

  if (Object.values(ROUTES).includes(segments[0])) {
    return {name: segments[0], params};
  }

  return {name: ROUTES.HOME, params: {}};
}

export function navigate(name, params = {}) {
  const id = params.id ? `/${encodeURIComponent(params.id)}` : '';
  const queryEntries = Object.entries(params).filter(([key]) => key !== 'id');
  const query = new URLSearchParams(queryEntries).toString();
  window.location.hash = `#${name}${id}${query ? `?${query}` : ''}`;
}

export function startRouter(onChange) {
  const handleChange = () => onChange(parseRoute());
  window.addEventListener('hashchange', handleChange);
  handleChange();
  return () => window.removeEventListener('hashchange', handleChange);
}
