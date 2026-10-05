import test from 'node:test';
import assert from 'node:assert/strict';
import { BrowserVerifier } from './client.mjs';

class Worker {
  static instances = [];
  constructor() { Worker.instances.push(this); }
  postMessage(data) { this.sent = data; }
  terminate() { this.terminated = true; }
  emit(data) { this.onmessage({ data }); }
}

test('reuse a ready worker with new files and compact results', async t => {
  globalThis.Worker = Worker;
  globalThis.crossOriginIsolated = true;
  t.after(() => { delete globalThis.Worker; delete globalThis.crossOriginIsolated; });
  const client = new BrowserVerifier();
  const first = client.verify({ 'A.java': 'class A {}' });
  const worker = Worker.instances.at(-1);
  worker.emit({ type: 'ready' });
  assert.equal(worker.sent.files['A.java'], 'class A {}');
  worker.emit({ type: 'result', result: { status: 'success', diagnostics: [] } });
  assert.equal((await first).status, 'success');
  const second = client.verify({ 'B.java': 'class B {}' });
  assert.deepEqual(worker.sent.files, { 'B.java': 'class B {}' });
  worker.emit({ type: 'result', result: { status: 'error', diagnostics: [{ title: 'Error', message: 'Bad value', output: 'full output' }] } });
  assert.deepEqual((await second).diagnostics, [{ title: 'Error', message: 'Bad value' }]);
  client.cancel();
});

test('cancellation terminates workers and late results cannot settle a later request', async t => {
  globalThis.Worker = Worker;
  globalThis.crossOriginIsolated = true;
  t.after(() => { delete globalThis.Worker; delete globalThis.crossOriginIsolated; });
  const client = new BrowserVerifier();
  const first = client.verify({ 'A.java': '' });
  const old = Worker.instances.at(-1);
  const cancelled = assert.rejects(first, { name: 'AbortError' });
  client.cancel();
  await cancelled;
  assert.ok(old.terminated);
  const next = client.verify({ 'B.java': '' });
  const current = Worker.instances.at(-1);
  old.emit({ type: 'result', result: { status: 'success', diagnostics: [] } });
  assert.ok(client.pending);
  current.emit({ type: 'ready' });
  current.emit({ type: 'failure', message: 'Solver unavailable' });
  await assert.rejects(next, /Solver unavailable/);
  assert.ok(current.terminated);
});
