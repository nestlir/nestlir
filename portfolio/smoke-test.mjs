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
assert(html.includes('<span data-i18n="hero.cta">'), 'Hero CTA translation must target a text-only wrapper');
assert(html.includes('<span data-i18n="work.title">'), 'Archive heading translation must target a text-only wrapper');
assert(html.includes('<span aria-hidden="true">↘</span>'), 'Hero CTA decorative arrow must remain separate from translated text');
assert(html.includes('<span class="heading-period" aria-hidden="true">.</span>'), 'Archive heading punctuation must remain separate from translated text');
assert(app.includes("mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click',() => setMenu(false)))"), 'Mobile nav links must use the shared close handler');
assert(!read(resolve(portfolio, 'README.md')).includes('No remote photography or font dependency.'), 'README must not claim fonts have no remote dependency');
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
