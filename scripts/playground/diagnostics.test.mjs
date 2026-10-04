import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnosticHtml, editorDiagnostic } from './diagnostics.mjs';

test('omit leading CLI blank lines while preserving diagnostic spacing and colors', () => {
  const diagnostic = '\u001b[31mError\u001b[0m\n6 | code\n  | ^^^\n\nExample.java:6\n';
  assert.equal(diagnosticHtml('\n\n' + diagnostic), diagnosticHtml(diagnostic));
});

test('show the playground path, filename and line in diagnostic locations', () => {
  const output = '\u001b[31mError\u001b[0m\n\n/files/playground/Example.java:6\u001b[0m\n\n--> Refinement declared here:\n/files/playground/Example.java:5\u001b[0m\n';
  const expected = output.replaceAll('/files/playground/', '/playground/');
  assert.equal(diagnosticHtml(output), diagnosticHtml(expected));
  assert.equal(editorDiagnostic({ from: 0, to: 1, output }, 1).message,
    expected.replace(/\u001b\[[0-9;]*m/g, ''));
});

test('render CLI colors and bold with resets and escaped source text', () => {
  const html = diagnosticHtml('\u001b[1;31mRefinement Error\u001b[0m: <script>alert("x")</script>\n\u001b[38;5;208m^^^\u001b[0m\n');
  assert.match(html, /font-weight:bold/);
  assert.match(html, /ansi-red-fg/);
  assert.match(html, /color:rgb\(/);
  assert.match(html, /rgb\(255,135,0\)/);
  assert.match(html, /&lt;script&gt;/);
  assert.doesNotMatch(html, /<script>|\u001b/);
  assert.match(html, /<\/span>: &lt;script&gt;/);
  assert.equal(diagnosticHtml('plain output'), 'plain output');
});

test('remove terminal color codes from plain-text editor tooltips', () => {
  assert.equal(editorDiagnostic({ from: 0, to: 1, output: '\u001b[31mError\u001b[0m\n' }, 1).message, 'Error\n');
});

test('use the complete CLI diagnostic in editor tooltips without rewriting it', () => {
  const output = '\nRefinement Error: count¹ == -5 is not a subtype of count¹ > 0\n6 | int count = -5;\n  | ^^^^^^^^^^^^^^^\n --> hint\n\nExample.java:6\n';
  assert.equal(editorDiagnostic({ from: 0, to: 1, severity: 'error', output }, 1).message, output);
});

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
