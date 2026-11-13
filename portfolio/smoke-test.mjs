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
const responsive = read(responsivePath);
const required = [
  'index.html','app.js','app.css','responsive.css','404.html','manifest.webmanifest',
  'favicon.svg','apple-touch-icon.svg','design-system/tokens.css','design-system/README.md',
  'design-system/art-direction.md','design-system/character-sheet.md','design-system/editorial-storyboard.md',
  'design-system/ui-kit.md','design-system/grid-responsive.md','design-system/interaction-motion.md',
  'design-system/accessibility-performance.md','design-system/asset-manifest.md',
  'assets/magazine/monogram.svg','assets/magazine/floral-ornament.svg','assets/magazine/paper-grain.svg',
  'assets/magazine/datavac.svg','assets/magazine/furniture-store.svg','assets/magazine/study-archive.svg',
  'assets/magazine/system-flow.svg','assets/magazine/icons/bookmark.svg','assets/magazine/icons/code.svg',
  'assets/magazine/icons/database.svg','assets/magazine/icons/envelope.svg','assets/magazine/icons/external.svg'
];
for (const file of required) assert(existsSync(resolve(portfolio,file)), `Missing file: ${file}`);
check(appPath);
assert((html.match(/class="magazine-page/g)||[]).length===8,'The magazine must contain exactly eight page articles');
for (const id of ['magazineBook','previousPage','nextPage','pageCounter','progressTrack','contactForm','readerAnnouncement']) assert(html.includes(`id="${id}"`),`Missing #${id}`);
assert(html.includes('og:image'),'Open Graph image is missing');
assert(html.includes('aria-label="Разделы журнала"'),'Section navigation needs an accessible label');
assert(app.includes('ArrowRight')&&app.includes('ArrowLeft'),'Keyboard page navigation is missing');
assert(app.includes('pointerdown')&&app.includes('pointerup'),'Swipe / drag navigation is missing');
assert(app.includes('prefers-reduced-motion')===false || css.includes('prefers-reduced-motion'),'Reduced motion support is missing');
assert(responsive.includes('@media(max-width:760px)'),'Mobile layout breakpoint is missing');
assert(responsive.includes('@media print'),'Print / PDF stylesheet is missing');
assert(app.includes('reportValidity')&&app.includes('mailto:nestlir@mail.ru'),'Contact form must validate and keep a mailto fallback');
assert(html.includes('DataVac')&&html.includes('Furniture Store'),'Confirmed projects are missing');
assert(html.includes('AI-assisted')||html.includes('AI-ASSISTED'),'AI-assisted project label is missing');
assert(html.includes('https://github.com/nestlir/web-larek-frontend'),'Study archive repo link is missing');
assert(!html.includes('Ledgerline')&&!html.includes('Fieldnote'),'Unconfirmed demo projects must not be shown');
if (failures.length) {
  console.error('Portfolio smoke test failed:');
  failures.forEach((failure) => console.error(' - '+failure));
  process.exitCode = 1;
} else {
  console.log('Portfolio smoke test passed.');
}
