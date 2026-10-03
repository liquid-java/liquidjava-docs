import test from 'node:test';
import assert from 'node:assert/strict';
import { editorDiagnostic } from './diagnostics.mjs';

test('underline the reported expression without expanding into indentation or surrounding code', () => {
  const source = 'class Example {\n    int count = -5;\n}';
  const from = source.indexOf('-5');
  const diagnostic = editorDiagnostic({ from, to: from + 2, severity: 'error', title: 'Refinement Error', message: 'Invalid value' }, source.length);
  assert.equal(source.slice(diagnostic.from, diagnostic.to), '-5');
});

test('preserve multiline UTF-16 source ranges', () => {
  const source = '// 🧪\ncall(\n    value\n);';
  const from = source.indexOf('call');
  const to = source.indexOf(';');
  const diagnostic = editorDiagnostic({ from, to }, source.length);
  assert.equal(source.slice(diagnostic.from, diagnostic.to), 'call(\n    value\n)');
});

test('missing or invalid positions do not produce misleading underlines', () => {
  for (const issue of [{ line: 1 }, { from: -1, to: 2 }, { from: 1, to: 1 }, { from: 2, to: 1 }, { from: 0, to: 11 }]) {
    assert.equal(editorDiagnostic(issue, 10), null);
  }
});
