import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const destination = process.argv[2];
if (!destination) throw new Error('Usage: node scripts/playground/export.mjs SITE_DIRECTORY');
const root = fileURLToPath(new URL('../../', import.meta.url));
const runtime = resolve(destination, 'verifier');
await mkdir(runtime, { recursive: true });
for (const file of ['worker.js', 'liquidjava.jar', 'java-base.jar', 'native-methods.json', 'z3-built.js', 'z3-built.wasm']) {
  await copyFile(resolve(root, 'playground/runtime', file), resolve(runtime, file));
}
for (const file of ['client.mjs', 'summary.mjs']) {
  await copyFile(new URL(file, import.meta.url), resolve(runtime, file));
}
await copyFile(resolve(root, 'playground/isolation.js'), resolve(destination, 'isolation.js'));
