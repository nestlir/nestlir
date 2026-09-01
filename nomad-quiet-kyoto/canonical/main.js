import { createApplication } from './app/application.js';
import { renderShell } from './app/shell.js';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('NOMAD: #app root not found');
}

const application = createApplication(window.localStorage);
renderShell(root, application);
