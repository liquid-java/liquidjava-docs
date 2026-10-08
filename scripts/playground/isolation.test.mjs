import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../../playground/isolation.js', import.meta.url), 'utf8');

test('root isolation leaves neighboring Pages projects unchanged', async () => {
  const listeners = {};
  runInNewContext(source, {
    self: { location: new URL('https://example.com/isolation.js'), addEventListener: (type, listener) => { listeners[type] = listener; } },
    URL, Headers, Response, fetch: async () => new Response('body')
  });
  const response = async (path, mode = 'navigate') => {
    let pending;
    listeners.fetch({ request: { url: new URL(path, 'https://example.com').href, mode }, respondWith: value => { pending = value; } });
    return pending;
  };
  assert.equal((await response('/')).headers.get('Cross-Origin-Embedder-Policy'), 'require-corp');
  assert.equal((await response('/states')).headers.get('Cross-Origin-Opener-Policy'), 'same-origin');
  assert.equal((await response('/verifier/worker.js', 'same-origin')).headers.get('Cross-Origin-Embedder-Policy'), 'require-corp');
  assert.equal(await response('/liquidjava-docs/'), undefined);
  assert.equal(await response('/liquidjava-docs/annotations/'), undefined);
  assert.equal(await response('https://other.example/'), undefined);
});
