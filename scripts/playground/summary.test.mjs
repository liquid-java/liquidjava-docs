import test from 'node:test';
import assert from 'node:assert/strict';
import { summarize } from './summary.mjs';

test('compact diagnostics expose only titles and messages, never full output', () => {
  assert.deepEqual(summarize({ status: 'error', diagnostics: [{ title: 'Type Error', message: 'Expected a positive value.', output: 'source and stack', severity: 'error' }] }), {
    status: 'error', diagnostics: [{ title: 'Type Error', message: 'Expected a positive value.' }]
  });
});

test('success, warnings and runtime failures remain distinct', () => {
  assert.equal(summarize({ status: 'success', diagnostics: [] }).diagnostics[0].title, 'Verification passed');
  assert.equal(summarize({ status: 'warning', diagnostics: [{ title: 'Warning', message: 'Check this.' }] }).status, 'warning');
  assert.deepEqual(summarize({ status: 'failure', message: 'Solver unavailable', details: 'stack' }), {
    status: 'failure', diagnostics: [{ title: 'Verification could not complete', message: 'Solver unavailable' }]
  });
});
