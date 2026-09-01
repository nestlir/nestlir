import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRoute, ROUTES } from '../../app/router.js';

const location = (hash) => ({ hash });

test('parseRoute resolves top-level routes', () => {
  assert.deepEqual(parseRoute(location('#explore')), { name: ROUTES.EXPLORE, params: {} });
  assert.deepEqual(parseRoute(location('#eat')), { name: ROUTES.EAT, params: {} });
});

test('parseRoute resolves detail ids and query params', () => {
  assert.deepEqual(parseRoute(location('#place/fushimi?from=map')), {
    name: ROUTES.PLACE,
    params: { id: 'fushimi', from: 'map' },
  });
});

test('parseRoute safely falls back for invalid routes', () => {
  assert.deepEqual(parseRoute(location('#does-not-exist')), { name: ROUTES.HOME, params: {} });
});
