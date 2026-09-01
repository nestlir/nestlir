import { renderHome } from './pages/home.js';
import { createTripStore } from './shared/trip-store.js';

const root = document.querySelector('#app');
const store = createTripStore(window.localStorage);

renderHome(root, store);
