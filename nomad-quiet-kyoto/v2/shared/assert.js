export function assert(condition, message) {
  if (!condition) throw new Error(message);
}

export function assertKnownId(collection, id, label = 'entity') {
  if (!collection.some((item) => item.id === id)) {
    throw new Error(`Unknown ${label} id: ${id}`);
  }
}
