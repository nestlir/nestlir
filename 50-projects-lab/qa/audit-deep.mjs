import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const projectsDir = resolve(root, 'projects');
const runtime = resolve(root, 'project-runtime.js');
const output = resolve(root, 'qa-report.json');

const folders = readdirSync(projectsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && entry.name !== 'c-cpp')
  .map((entry) => entry.name)
  .sort();

const results = [];
const runtimeText = existsSync(runtime) ? readFileSync(runtime, 'utf8') : '';

for (const folder of folders) {
  const htmlPath = resolve(projectsDir, folder, 'index.html');
  const html = existsSync(htmlPath) ? readFileSync(htmlPath, 'utf8') : '';
  const id = folder.slice(0, 2);
  const result = { folder, passed: true, localRuntime: false, externalIframe: false, reasons: [] };

  if (!html) {
    result.passed = false;
    result.reasons.push('missing index.html');
  }

  result.localRuntime = html.includes('../../project-runtime.js');
  if (!result.localRuntime) {
    result.passed = false;
    result.reasons.push('missing shared local runtime');
  }

  result.externalIframe = /<iframe[^>]+src=["']https?:\/\//i.test(html);
  if (result.externalIframe) {
    result.passed = false;
    result.reasons.push('external iframe dependency');
  }

  const marker = "id:'" + id + "'";
  if (!runtimeText.includes(marker) && !runtimeText.includes("['" + id + "'")) {
    result.passed = false;
    result.reasons.push('project missing from runtime registry');
  }

  results.push(result);
}

const totals = {
  projects: results.length,
  passed: results.filter((x) => x.passed).length,
  failed: results.filter((x) => !x.passed).length,
  externalIframes: results.filter((x) => x.externalIframe).length
};

writeFileSync(output, JSON.stringify({ totals, projects: results }, null, 2) + '\n');
console.log(JSON.stringify(totals, null, 2));
if (totals.failed) process.exitCode = 1;