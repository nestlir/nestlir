import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const projectsDir = resolve(root, 'projects');
const output = resolve(root, 'qa-report.json');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const interactionPatterns = [
  ['click', /addEventListener\s*\(\s*['"]click|onclick\s*=/i],
  ['input', /addEventListener\s*\(\s*['"]input|oninput\s*=/i],
  ['change', /addEventListener\s*\(\s*['"]change|onchange\s*=/i],
  ['submit', /addEventListener\s*\(\s*['"]submit|onsubmit\s*=/i],
  ['keyboard', /addEventListener\s*\(\s*['"](keydown|keyup|keypress)|on(keydown|keyup|keypress)\s*=/i],
  ['drag', /addEventListener\s*\(\s*['"](dragstart|dragover|drop)|on(drop|dragstart|dragover)\s*=/i],
  ['pointer', /addEventListener\s*\(\s*['"](pointerdown|pointerup|mouseenter|mouseleave)|on(mouseenter|mouseleave)\s*=/i]
];

const folders = readdirSync(projectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'c-cpp')
  .map((entry) => entry.name)
  .sort();

const results = [];
const groups = new Map();

for (const folder of folders) {
  const base = resolve(projectsDir, folder);
  const paths = { html: resolve(base, 'index.html'), css: resolve(base, 'style.css'), js: resolve(base, 'script.js') };
  const result = {
    folder,
    passed: true,
    files: { indexHtml: existsSync(paths.html), styleCss: existsSync(paths.css), scriptJs: existsSync(paths.js) },
    duplicate: false,
    fakeDemo: false,
    externalApi: false,
    interaction: { detected: false, events: [] },
    reasons: []
  };

  if (!result.files.indexHtml) {
    result.passed = false;
    result.reasons.push('missing index.html');
    results.push(result);
    continue;
  }

  const html = readFileSync(paths.html, 'utf8');
  const css = result.files.styleCss ? readFileSync(paths.css, 'utf8') : '';
  const js = result.files.scriptJs ? readFileSync(paths.js, 'utf8') : '';
  const all = [html, css, js].join('\n');

  if (!result.files.styleCss && !/<style\b/i.test(html)) {
    result.passed = false;
    result.reasons.push('missing style.css or inline style');
  }
  if (!result.files.scriptJs && !/<script\b[^>]*>/i.test(html)) {
    result.passed = false;
    result.reasons.push('missing script.js or inline script');
  }

  result.interaction.events = interactionPatterns.filter(([, pattern]) => pattern.test(all)).map(([name]) => name);
  result.interaction.detected = result.interaction.events.length > 0;
  if (!result.interaction.detected) {
    result.passed = false;
    result.reasons.push('no detectable user interaction handler');
  }

  const frames = [...all.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]).filter((url) => /^https?:\/\//i.test(url));
  if (frames.length) {
    result.fakeDemo = true;
    result.passed = false;
    result.reasons.push('external iframe demo dependency');
  }

  const fetches = [...all.matchAll(/\bfetch\s*\(/g)];
  if (fetches.length || /\b(XMLHttpRequest|axios|EventSource)\b/.test(all)) {
    result.externalApi = true;
    result.reasons.push('network/API code detected');
  }

  const normalized = all
    .replace(/\s+/g, ' ')
    .replace(/\/\*[^]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .trim();
  const digest = hash(normalized);
  groups.set(digest, [...(groups.get(digest) || []), folder]);

  results.push(result);
}

const duplicateGroups = [];
for (const [digest, projects] of groups) {
  if (projects.length < 2) continue;
  duplicateGroups.push({ hash: digest, projects });
  for (const folder of projects) {
    const result = results.find((item) => item.folder === folder);
    result.duplicate = true;
    result.passed = false;
    result.reasons.push(`duplicate implementation shared by: ${projects.join(', ')}`);
  }
}

const totals = {
  projects: results.length,
  passed: results.filter((item) => item.passed).length,
  failed: results.filter((item) => !item.passed).length,
  duplicates: results.filter((item) => item.duplicate).length,
  fakeDemos: results.filter((item) => item.fakeDemo).length,
  externalApis: results.filter((item) => item.externalApi).length,
  noInteraction: results.filter((item) => !item.interaction.detected).length
};

const report = { generatedAt: new Date().toISOString(), totals, projects: results, duplicateGroups };
writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(totals, null, 2));
if (totals.failed) process.exitCode = 1;