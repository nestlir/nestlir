import test from 'node:test';
import assert from 'node:assert/strict';

const requiredModules = [
  '../app/application.js',
  '../app/shell.js',
  '../app/router.js',
  '../entities/place/model.js',
  '../entities/food/model.js',
  '../entities/trip/model.js',
  '../features/gallery/ui.js',
  '../features/archive/ui.js',
  '../features/map/ui.js',
  '../features/food-explorer/ui.js',
  '../features/itinerary/ui.js',
  '../widgets/site-header.js',
  '../shared/storage/trip-storage.js',
  '../shared/lib/trip-summary.js',
];

test('canonical module graph can be imported', async () => {
  for (const modulePath of requiredModules) {
    await import(modulePath);
  }
  assert.ok(true);
});
