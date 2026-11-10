import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const portfolio = resolve(root, 'portfolio');
const frontend = resolve(portfolio, 'frontend');

const failures = [];
const assert = (condition, message) => { if (!condition) failures.push(message); };
const read = (file) => readFileSync(file, 'utf8');
const check = (file) => {
  try { execFileSync('node', ['--check', file], { stdio: 'pipe' }); }
  catch (error) { failures.push(`JS syntax error in ${file}: ${error.stderr?.toString() || error.message}`); }
};

const fsHtml = read(resolve(portfolio, 'index.html'));
const feHtml = read(resolve(frontend, 'index.html'));
const i18n = read(resolve(portfolio, 'i18n.js'));
const requiredFiles = [
  'index.html','app.css','responsive.css','app.js','ui-controller.js','shared-ui.js','i18n.js','favicon.svg','favicon.png'
].map(name => resolve(portfolio, name)).concat([
  'index.html','styles.css','quality-fixes.css','script.js'
].map(name => resolve(frontend, name)));

for (const file of requiredFiles) assert(existsSync(file), `Missing file: ${file}`);
for (const file of [resolve(portfolio,'app.js'), resolve(portfolio,'ui-controller.js'), resolve(portfolio,'shared-ui.js'), resolve(portfolio,'i18n.js'), resolve(frontend,'script.js')]) {
  if (existsSync(file)) check(file);
}

for (const id of ['menuToggle','mobileNav','mobileClose','themeToggle','chaosToggle']) {
  assert(fsHtml.includes(`id="${id}"`), `Full-stack missing #${id}`);
  assert(feHtml.includes(`id="${id}"`), `Frontend missing #${id}`);
}
assert(/href="\.\/favicon\.svg(?:\?[^\"]*)?"/.test(fsHtml), 'Full-stack favicon link missing');
assert(/href="\.\.\/favicon\.svg(?:\?[^\"]*)?"/.test(feHtml), 'Frontend favicon link missing');
assert(/href="\.\/favicon\.png(?:\?[^\"]*)?"/.test(fsHtml), 'Full-stack PNG favicon fallback missing');
assert(/href="\.\.\/favicon\.png(?:\?[^\"]*)?"/.test(feHtml), 'Frontend PNG favicon fallback missing');
assert(fsHtml.includes('href="./frontend/"'), 'Full-stack → Frontend link missing');
assert(feHtml.includes('href="../"'), 'Frontend → Full-stack link missing');
assert(fsHtml.includes('./ui-controller.js'), 'Full-stack UI controller not loaded');
assert(fsHtml.includes('./shared-ui.js'), 'Full-stack shared UI not loaded');
assert(feHtml.includes('../ui-controller.js'), 'Frontend UI controller not loaded');
assert(feHtml.includes('../shared-ui.js'), 'Frontend shared UI not loaded');
assert(fsHtml.includes('./i18n.js'), 'Full-stack i18n not loaded');
assert(feHtml.includes('../i18n.js'), 'Frontend i18n not loaded');
assert(i18n.includes('en:') && i18n.includes('ja:') && i18n.includes('ru:'), 'i18n must include RU/EN/JA');
assert(i18n.includes('PortfolioI18n'), 'i18n API missing');
assert(!feHtml.includes('frontend-refactor.js'), 'Legacy Frontend controller still referenced');
assert(!feHtml.includes('src="./ui-controller.js"'), 'Frontend must not load a duplicate local UI controller');
assert(!fsHtml.includes('portfolio-ui.js'), 'Legacy duplicate UI runtime still referenced');

const keyedElements = [...feHtml.matchAll(/data-i18n(?:-html)?="([^"]+)"/g)].map((match) => match[1]);
for (const key of keyedElements) assert(i18n.includes(key.split('.')[0]), `i18n source does not mention ${key}`);


const fsApp = read(resolve(portfolio, 'app.js'));
const feApp = read(resolve(frontend, 'script.js'));
const shared = read(resolve(portfolio, 'shared-ui.js'));
const workflow = read(resolve(root, '.github/workflows/portfolio-pages.yml'));

assert(fsHtml.includes('role="dialog" aria-modal="true"'), 'Full-stack modal must expose dialog semantics');
assert(feHtml.includes('role="dialog" aria-modal="true"'), 'Frontend modal must expose dialog semantics');
assert(!fsApp.includes("$('#modalContent').innerHTML"), 'Full-stack modal must not interpolate dynamic HTML');
assert(!feApp.includes("$('#modalContent').innerHTML"), 'Frontend modal must not interpolate dynamic HTML');
assert(fsApp.includes("event.key !== 'Tab'") && feApp.includes("event.key !== 'Tab'"), 'Both modals must trap keyboard focus');
assert(fsApp.includes('lastProjectTrigger?.focus') && feApp.includes('lastProjectTrigger?.focus'), 'Both modals must restore focus to the trigger');
assert(!fsApp.includes("localStorage.getItem('portfolio-lang')") && !feApp.includes("localStorage.getItem('portfolio-lang')"), 'Language reads must be centralized in i18n.js');
assert(!fsApp.includes("localStorage.setItem('portfolio-lang'") && !feApp.includes("localStorage.setItem('portfolio-lang'"), 'Language writes must be centralized in i18n.js');
assert(i18n.includes('try { return localStorage.getItem(key)') && i18n.includes('try { localStorage.setItem(key, value)'), 'i18n storage wrapper must handle unavailable localStorage');
assert(feApp.includes('filter.dataset.filter') && !feApp.includes('data.index'), 'Frontend filters must use their data-filter value directly');
assert(shared.includes('prefers-reduced-motion'), 'Custom cursor must respect reduced motion');
assert(shared.includes('scheduleRender();') && !shared.includes('  render();'), 'Custom cursor animation must be event-driven');
assert(workflow.includes('  pull_request:'), 'Portfolio validation must run on pull requests');
assert(workflow.includes("if: github.event_name != 'pull_request' && github.ref == 'refs/heads/main'"), 'Pages deployment must be skipped on pull requests and non-main refs');
assert(workflow.includes('actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020'), 'setup-node must use a resolvable full-length commit SHA');
assert(!workflow.includes('49933ea5288caeca8642d1e84afbd3f7d6820024'), 'Invalid setup-node SHA must be removed');

console.log(`Portfolio smoke test: ${failures.length === 0 ? 'PASS' : 'FAIL'}`);
if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
