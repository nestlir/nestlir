import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(new URL('.', import.meta.url).pathname, '..');
const portfolio = resolve(root, 'portfolio');
const frontend = resolve(portfolio, 'frontend');

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const read = (file) => readFileSync(file, 'utf8');

const fsHtml = read(resolve(portfolio, 'index.html'));
const feHtml = read(resolve(frontend, 'index.html'));

for (const file of [
  resolve(portfolio, 'index.html'),
  resolve(portfolio, 'app.css'),
  resolve(portfolio, 'responsive.css'),
  resolve(portfolio, 'app.js'),
  resolve(portfolio, 'ui-controller.js'),
  resolve(portfolio, 'shared-ui.js'),
  resolve(portfolio, 'favicon.svg'),
  resolve(frontend, 'index.html'),
  resolve(frontend, 'styles.css'),
  resolve(frontend, 'quality-fixes.css'),
  resolve(frontend, 'script.js')
]) assert(existsSync(file), `Missing file: ${file}`);

const required = ['menuToggle','mobileNav','mobileClose','themeToggle','chaosToggle'];
for (const id of required) {
  assert(fsHtml.includes(`id="${id}"`), `Full-stack missing #${id}`);
  assert(feHtml.includes(`id="${id}"`), `Frontend missing #${id}`);
}

assert(fsHtml.includes('href="./favicon.svg"'), 'Full-stack favicon link missing');
assert(feHtml.includes('href="../favicon.svg"'), 'Frontend favicon link missing');
assert(fsHtml.includes('href="./frontend/"'), 'Full-stack → Frontend link missing');
assert(feHtml.includes('href="../"'), 'Frontend → Full-stack link missing');
assert(fsHtml.includes('./ui-controller.js'), 'Full-stack UI controller not loaded');
assert(fsHtml.includes('./shared-ui.js'), 'Full-stack shared UI not loaded');
assert(feHtml.includes('../ui-controller.js'), 'Frontend UI controller not loaded');
assert(feHtml.includes('../shared-ui.js'), 'Frontend shared UI not loaded');
assert(!feHtml.includes('frontend-refactor.js'), 'Legacy Frontend controller still referenced');
assert(!fsHtml.includes('portfolio-ui.js'), 'Legacy duplicate UI runtime still referenced');

console.log(`Smoke test passed: ${failures.length === 0 ? 'OK' : `${failures.length} failures`}`);
if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
