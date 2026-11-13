import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../dist/assets/', import.meta.url);
const files = await readdir(root);
const budgets = { '.js': 250 * 1024, '.css': 80 * 1024 };
const totals = { '.js': 0, '.css': 0 };

for (const file of files) {
  const extension = file.slice(file.lastIndexOf('.'));
  if (!(extension in budgets)) continue;
  const size = (await stat(join(root.pathname, file))).size;
  totals[extension] += size;
  console.log(file + ': ' + (size / 1024).toFixed(1) + ' KB');
}

let failed = false;
for (const [extension, budget] of Object.entries(budgets)) {
  const total = totals[extension];
  console.log('Total ' + extension + ': ' + (total / 1024).toFixed(1) + ' KB / ' + (budget / 1024) + ' KB');
  if (total > budget) {
    console.error('Total ' + extension + ' exceeds its bundle budget');
    failed = true;
  }
}
if (failed) process.exit(1);
