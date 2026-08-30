import fs from 'node:fs';
import path from 'node:path';

const manifest = path.resolve('src/entities/project/api/projects.generated.ts');

if (!fs.existsSync(manifest)) {
  console.error('Manifest not found:', manifest);
  process.exit(1);
}

const source = fs.readFileSync(manifest, 'utf8');
const slugs = [...source.matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);

if (duplicates.length) {
  console.error('Duplicate slugs:', [...new Set(duplicates)].join(', '));
  process.exit(1);
}

console.log('✓ Manifest valid:', slugs.length, 'unique projects');
