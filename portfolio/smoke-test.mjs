import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const portfolio = resolve(root, 'portfolio');
const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const read = (file) => readFileSync(file, 'utf8');
const check = (file) => {
  try { execFileSync('node', ['--check', file], { stdio: 'pipe' }); }
  catch (error) { failures.push(`JS syntax error in ${file}: ${error.stderr?.toString() || error.message}`); }
};
const htmlPath = resolve(portfolio, 'index.html');
const appPath = resolve(portfolio, 'app.js');
const cssPath = resolve(portfolio, 'app.css');
const responsivePath = resolve(portfolio, 'responsive.css');
const html = read(htmlPath);
const app = read(appPath);
const css = read(cssPath);
const required = [htmlPath, appPath, cssPath, responsivePath, resolve(portfolio,'assets/atlas-map.svg')];
for (const file of required) assert(existsSync(file), `Missing file: ${file}`);
check(appPath);
for (const id of ['menuToggle','mobileNav','themeToggle','projectGrid','resultsCount']) assert(html.includes(`id="${id}"`), `Missing #${id}`);
for (const token of ['data-filter="all"','data-filter="team"','data-filter="assisted"','data-filter="study"']) assert(html.includes(token), `Missing filter ${token}`);
assert(html.includes('aria-live="polite"'), 'Project count must be announced');
assert(css.includes('prefers-reduced-motion'), 'Reduced-motion styles are missing');
assert(app.includes('textContent'), 'Project content must use textContent');
assert(app.includes('safeGet') && app.includes('safeSet'), 'Storage access must be guarded');
assert(app.includes('aria-pressed'), 'Interactive toggle states must be exposed');
assert(app.includes('noopener noreferrer'), 'External project links must be isolated');
assert(!app.includes('storyos') && !app.includes('multimodal'), 'Unverified archived projects must not be listed');
const legacy = resolve(portfolio,'frontend/index.html');
assert(existsSync(legacy), 'Unified frontend redirect is missing');
assert(read(legacy).includes('window.location.replace'), 'Legacy route must lead to the unified portfolio');
if (failures.length) {
  console.error('Portfolio smoke test failed:');
  failures.forEach((failure) => console.error(' - ' + failure));
  process.exitCode = 1;
} else {
  console.log('Portfolio smoke test passed.');
}
