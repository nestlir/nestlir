import { createApplication } from './application.js';
import { renderShell } from './shell.js';

const root = document.querySelector('#app');

if (!root) throw new Error('NOMAD: #app root not found');

const application = createApplication(window.localStorage);
renderShell(root, application);
void application.sync();
