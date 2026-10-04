import { build } from 'esbuild';
import { copyFile } from 'node:fs/promises';
const output = 'playground/runtime';
await build({ entryPoints: ['scripts/playground/worker.js'], bundle: true, format: 'iife', platform: 'browser', outfile: `${output}/worker.js` });
await build({ entryPoints: ['scripts/playground/editor.js'], bundle: true, format: 'esm', platform: 'browser', outfile: `${output}/editor.js` });
for (const file of ['z3-built.js', 'z3-built.wasm']) {
  await copyFile(`node_modules/z3-solver/build/${file}`, `${output}/${file}`);
}
