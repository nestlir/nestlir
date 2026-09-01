import { renderHome } from './pages/home.js';
import { createApplication } from './shared/application.js';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('NOMAD app root was not found');
}

const application = createApplication(window.localStorage);
const dispose = renderHome(root, application);

window.addEventListener('beforeunload', dispose, { once: true });
