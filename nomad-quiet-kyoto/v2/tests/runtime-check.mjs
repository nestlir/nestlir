const checks = [
  '../entities/place/model.js',
  '../entities/trip/model.js',
  '../shared/storage.js',
  '../shared/trip-store.js',
  '../shared/trip-summary.js',
  '../shared/data.js',
  '../features/archive/ui.js',
  '../pages/home.js',
];

for (const modulePath of checks) {
  await import(new URL(modulePath, import.meta.url));
  console.log(`✓ ${modulePath}`);
}

console.log(`Runtime import check passed: ${checks.length} modules.`);
