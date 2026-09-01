export const places = [
  { id: 'fushimi', type: 'walk', name: 'Fushimi Inari', area: 'Fushimi', time: '07:10', duration: '01h40m', price: 0, distance: 3.2, image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=84', description: 'Begin beneath the vermilion gates before the city wakes.' },
  { id: 'higashiyama', type: 'walk', name: 'Higashiyama', area: 'Higashiyama', time: '09:20', duration: '01h50m', price: 0, distance: 2.8, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=84', description: 'Quiet lanes, wooden facades and small courtyards above the old city.' },
  { id: 'nishiki', type: 'food', name: 'Nishiki Market', area: 'Central Kyoto', time: '12:30', duration: '01h20m', price: 1800, distance: 2.1, image: 'https://images.unsplash.com/photo-1558180071-9f8e0f2e7b9a?auto=format&fit=crop&w=1200&q=84', description: 'A compact market for tasting, wandering and stopping often.' },
  { id: 'gion', type: 'ritual', name: 'Gion', area: 'Gion', time: '18:42', duration: '01h40m', price: 0, distance: 3.1, image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1200&q=84', description: 'Arrive when the lanterns begin to carry the evening.' }
];

export const findPlace = (id) => places.find((place) => place.id === id);
