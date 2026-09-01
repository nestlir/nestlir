import fs from 'node:fs';
import path from 'node:path';

const required = [
  'README.md',
  'docs/architecture.md',
  'docs/adr/001-single-canonical-runtime.md',
];

const missing = required.filter((file) => !fs.existsSync(path.resolve(file)));

if (missing.length) {
  console.error(`Missing documentation files:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log('NOMAD documentation contract is valid.');
