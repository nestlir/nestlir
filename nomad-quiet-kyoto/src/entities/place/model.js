export const places = Object.freeze([
  Object.freeze({ id: 'fushimi', type: 'walk', name: 'Fushimi Inari', area: 'Fushimi', time: '07:10', duration: '01h40m', price: 0, distance: 3.2, image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1400&q=85', description: 'Begin beneath the vermilion gates before the city wakes.', story: 'Climb the lower torii slowly, then leave the busiest trail behind.' }),
  Object.freeze({ id: 'higashiyama', type: 'walk', name: 'Higashiyama', area: 'Higashiyama', time: '09:20', duration: '01h50m', price: 0, distance: 2.8, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85', description: 'Quiet lanes, wooden facades and small courtyards above the old city.', story: 'Take the side streets around the preserved wooden houses before noon.' }),
  Object.freeze({ id: 'nishiki', type: 'food', name: 'Nishiki Market', area: 'Central Kyoto', time: '12:30', duration: '01h20m', price: 1800, distance: 2.1, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85', description: 'A compact market for tasting, wandering and stopping often.', story: 'Go with an empty stomach and choose only what catches your eye.' }),
  Object.freeze({ id: 'gion', type: 'ritual', name: 'Gion', area: 'Gion', time: '18:42', duration: '01h40m', price: 0, distance: 3.1, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85', description: 'Arrive when the lanterns begin to carry the evening.', story: 'Stay long enough for the streets to change character with the light.' }),
  Object.freeze({ id: 'kamo', type: 'walk', name: 'Kamo River', area: 'Kamo', time: '08:16', duration: '00h50m', price: 0, distance: 1.4, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85', description: 'A river walk for coffee, birds and an unhurried start.', story: 'Follow the water before the city becomes loud.' }),
]);

export const PLACE_IDS = Object.freeze(new Set(places.map(({ id }) => id)));

export const findPlace = (id) => places.find((place) => place.id === id);
export const isKnownPlaceId = (id) => PLACE_IDS.has(id);
