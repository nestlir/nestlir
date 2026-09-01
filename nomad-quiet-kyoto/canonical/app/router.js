export const ROUTES = Object.freeze({
  HOME: 'home',
  ARCHIVE: 'archive',
  EXPLORE: 'explore',
  EAT: 'eat',
  TRIP: 'trip',
  PLACE: 'place',
});

export function getRoute(location = window.location) {
  const hash = location.hash.replace(/^#/, '');
  if (!hash) return { name: ROUTES.HOME, params: {} };

  const [rawPath, rawQuery = ''] = hash.split('?');
  const path = rawPath.replace(/^\//, '') || ROUTES.HOME;
  const params = Object.fromEntries(new URLSearchParams(rawQuery));

  if (path.startsWith('place/')) {
    return { name: ROUTES.PLACE, params: { ...params, id: path.slice('place/'.length) } };
  }

  return Object.values(ROUTES).includes(path)
    ? { name: path, params }
    : { name: ROUTES.HOME, params: {} };
}

export function navigate(name, params = {}) {
  const query = new URLSearchParams(params).toString();
  const path = name === ROUTES.PLACE && params.id
    ? `place/${encodeURIComponent(params.id)}`
    : name;
  window.location.hash = query && name !== ROUTES.PLACE ? `${path}?${query}` : path;
}

export function startRouter(onRouteChange) {
  const handle = () => onRouteChange(getRoute());
  window.addEventListener('hashchange', handle);
  handle();
  return () => window.removeEventListener('hashchange', handle);
}
