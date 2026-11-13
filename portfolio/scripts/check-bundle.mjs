import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../dist/assets/', import.meta.url);
const files = await readdir(root);
const limits = { '.js': 250 * 1024, '.css': 80 * 1024 };
let failed = false;
for (const file of files) {
  const extension = file.slice(file.lastIndexOf('.'));
  if (!(extension in limits)) continue;
  const size = (await stat(join(root.pathname, file))).size;
  console.log(file + ': ' + (size / 1024).toFixed(1) + ' KB');
  if (size > limits[extension]) {
    console.error(file + ' exceeds the ' + limits[extension] / 1024 + ' KB budget');
    failed = true;
  }
}
if (failed) process.exit(1);
