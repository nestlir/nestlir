const STORAGE_KEY = 'nomad-canonical-trip';

export function createTripStorage(storage) {
  return Object.freeze({
    read() {
      try {
        return JSON.parse(storage.getItem(STORAGE_KEY) || 'null');
      } catch {
        return null;
      }
    },
    write(state) {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    clear() {
      storage.removeItem(STORAGE_KEY);
    },
  });
}
