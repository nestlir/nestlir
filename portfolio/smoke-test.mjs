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
const requiredFiles = [
  'index.html','app.css','responsive.css','app.js','ui-controller.js','shared-ui.js','favicon.svg'
].map(name => resolve(portfolio, name)).concat([
  'index.html','styles.css','quality-fixes.css','script.js'
].map(name => resolve(frontend, name)));

for (const file of requiredFiles) assert(existsSync(file), `Missing file: ${file}`);
for (const file of [resolve(portfolio,'app.js'), resolve(portfolio,'ui-controller.js'), resolve(portfolio,'shared-ui.js'), resolve(frontend,'script.js')]) {
  if (existsSync(file)) check(file);
}

for (const id of ['menuToggle','mobileNav','mobileClose','themeToggle','chaosToggle']) {
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
assert(!feHtml.includes('./ui-controller.js'), 'Frontend must not load a duplicate local UI controller');
assert(!fsHtml.includes('portfolio-ui.js'), 'Legacy duplicate UI runtime still referenced');

console.log(`Portfolio smoke test: ${failures.length === 0 ? 'PASS' : 'FAIL'}`);
if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
