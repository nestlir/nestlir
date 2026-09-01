export const food = Object.freeze([
  Object.freeze({ id: 'kamo-breakfast', type: 'morning', name: 'Breakfast by the Kamo', place: 'Kamo River', price: 1400, duration: '00h45m', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=84', description: 'A simple breakfast to take slowly beside the river.' }),
  Object.freeze({ id: 'bowl-rain', type: 'dinner', name: 'A bowl after rain', place: 'Gion', price: 1800, duration: '00h50m', image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=1200&q=84', description: 'Warm noodles and a quiet counter after a long walk.' }),
  Object.freeze({ id: 'matcha-shade', type: 'tea', name: 'Matcha, in the shade', place: 'Higashiyama', price: 1200, duration: '00h40m', image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1200&q=84', description: 'Matcha and a small sweet in a garden-facing tea room.' }),
  Object.freeze({ id: 'nishiki-light', type: 'morning', name: 'Nishiki at first light', place: 'Nishiki Market', price: 1600, duration: '00h55m', image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=1200&q=84', description: 'Small bites and market stalls before the busiest hours.' }),
  Object.freeze({ id: 'long-table', type: 'dinner', name: 'A long table', place: 'Pontocho', price: 3200, duration: '01h30m', image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=84', description: 'An unhurried evening meal close to the river.' }),
]);

export const FOOD_IDS = Object.freeze(new Set(food.map((item) => item.id)));

export function findFood(id) {
  return food.find((item) => item.id === id);
}

export function isKnownFoodId(id) {
  return FOOD_IDS.has(id);
}
