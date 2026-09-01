const ROUTES = new Set(['home', 'archive', 'explore', 'eat', 'trip', 'place']);

export function normalizeRoute(hash = window.location.hash) {
  const [path, query = ''] = hash.replace(/^#/, '').split('?');
  const route = path || 'home';
  if (route === 'place') {
    const params = new URLSearchParams(query);
    return { name: 'place', id: params.get('id') || '' };
  }
  return { name: ROUTES.has(route) ? route : 'home' };
}

export function navigate(route, params = {}) {
  const search = route === 'place' && params.id ? `?id=${encodeURIComponent(params.id)}` : '';
  window.location.hash = `${route}${search}`;
}

export function createRouter(render) {
  const handleChange = () => render(normalizeRoute());
  window.addEventListener('hashchange', handleChange);
  handleChange();
  return () => window.removeEventListener('hashchange', handleChange);
}
