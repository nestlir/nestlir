import fs from 'node:fs';
import path from 'node:path';

export class JsonFileTripRepository {
  constructor(filePath, initialTrips = []) {
    this.filePath = filePath;
    this.initialTrips = initialTrips;
    this.ensureStore();
  }

  ensureStore() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      this.writeAll(this.initialTrips);
    }
  }

  readAll() {
    try {
      const raw = fs.readFileSync(this.filePath, 'utf8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : structuredClone(this.initialTrips);
    } catch {
      return structuredClone(this.initialTrips);
    }
  }

  writeAll(trips) {
    const tempPath = `${this.filePath}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(trips, null, 2), 'utf8');
    fs.renameSync(tempPath, this.filePath);
  }

  findById(id) {
    const trip = this.readAll().find((item) => item.id === id);
    return trip ? structuredClone(trip) : null;
  }

  save(trip) {
    const trips = this.readAll();
    const index = trips.findIndex((item) => item.id === trip.id);
    const next = structuredClone(trip);

    if (index >= 0) trips[index] = next;
    else trips.push(next);

    this.writeAll(trips);
    return structuredClone(next);
  }
}
