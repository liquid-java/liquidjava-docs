import { EditorView } from '@codemirror/view';
import { setDiagnostics } from '@codemirror/lint';
import { examples } from './examples.mjs';
import { diagnosticHtml, editorDiagnostic } from './diagnostics.mjs';
import { editorJava, editorTheme } from './editor-theme.mjs';
import { editorSetup } from './editor-setup.mjs';
import { navigateTo } from './editor-navigation.mjs';

const root = document.querySelector('#lj-playground');
const example = document.querySelector('#lj-example');
const verify = document.querySelector('#lj-verify');
const status = document.querySelector('#lj-status');
const output = document.querySelector('.lj-output');
const results = document.querySelector('#lj-results');
const runtime = new URL(root.dataset.runtime, location.href);
let worker;
let loading = false;
let checking = false;
let source;
let timer;
const view = new EditorView({
  doc: examples.positive,
  extensions: [editorSetup, editorJava, editorTheme, EditorView.contentAttributes.of({ 'aria-label': 'Java source code' }),
    EditorView.updateListener.of(update => {
      if (update.docChanged) {
        queueMicrotask(() => view.dispatch(setDiagnostics(view.state, [])));
      }
      if (update.docChanged && !checking && !loading) {
        results.replaceChildren();
        message('');
      }
    })],
  parent: document.querySelector('#lj-editor')
});
function message(text, state = '') {
  output.hidden = !text;
  status.textContent = text;
  status.dataset.state = state;
  status.classList.toggle('sr-only', state === 'error');
}
function controls(busy) {
  verify.textContent = busy ? 'Stop' : 'Verify';
  verify.dataset.state = busy ? 'busy' : 'idle';
}
function finish() { clearTimeout(timer); checking = loading = false; controls(false); }
function discard() { worker?.terminate(); worker = undefined; finish(); }
function failure(text) { discard(); message(text, 'failure'); }
function render(result) {
  finish();
  if (source !== view.state.doc.toString()) { message('Code changed during verification. Verify again.'); return; }
  results.replaceChildren();
  const issues = result.diagnostics || [];
  const marks = [];
  for (const issue of issues) {
    const mark = editorDiagnostic(issue, view.state.doc.length);
    if (mark) marks.push(mark);
  }
  if (issues.length || result.details) {
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.innerHTML = diagnosticHtml(issues.map(issue => issue.output).join('\n') + (result.details || ''));
    for (const link of code.querySelectorAll('a[data-line]')) {
      const lineNumber = Number(link.dataset.line);
      if (lineNumber < 1 || lineNumber > view.state.doc.lines) continue;
      link.onclick = event => {
        event.preventDefault();
        const issue = issues.find(issue => issue.line === lineNumber);
        const mark = issue && editorDiagnostic(issue, view.state.doc.length);
        const line = view.state.doc.line(lineNumber);
        const anchor = mark?.from ?? line.from + line.text.search(/\S|$/);
        navigateTo(view, anchor);
      };
    }
    pre.append(code);
    results.append(pre);
  }
  view.dispatch(setDiagnostics(view.state, marks));
  const messages = { success: 'Correct! Passed Verification.', warning: 'Verification finished with warnings.', error: 'Verification found errors.', failure: 'Verification could not complete. ' + (result.message || '') };
  message(messages[result.status] || 'Verification could not complete.', result.status);
  if (result.status === 'failure') discard();
}
function send() {
  loading = false; checking = true;
  clearTimeout(timer);
  message('Verifying…');
  timer = setTimeout(() => failure('Verification timed out. Simplify the example and try again.'), 30000);
  worker.postMessage({ type: 'verify', source });
}
async function run() {
  if (checking || loading) return;
  if (!crossOriginIsolated || typeof SharedArrayBuffer === 'undefined') {
    message('This browser cannot start the verifier. Open the playground directly in a browser with cross-origin isolation support.', 'failure'); return;
  }
  source = view.state.doc.toString();
  results.replaceChildren(); view.dispatch(setDiagnostics(view.state, []));
  controls(true);
  if (worker) { send(); return; }
  loading = true;
  message('Downloading and starting the verifier. This may take a moment…');
  timer = setTimeout(() => failure('The verifier took too long to load. Check your connection and try again.'), 120000);
  try { worker = new Worker(new URL('worker.js', runtime)); }
  catch { failure('The verifier could not start. Reload the page and try again.'); return; }
  const currentWorker = worker;
  worker.onerror = () => { if (worker === currentWorker) failure('The verifier could not start. Reload the page and try again.'); };
  worker.onmessage = event => {
    if (worker !== currentWorker) return;
    const data = event.data;
    if (data.type === 'status') message(data.message);
    if (data.type === 'ready') send();
    if (data.type === 'result') render(data.result);
    if (data.type === 'failure') failure('Verification could not complete. ' + data.message);
  };
}
verify.onclick = () => {
  if (checking || loading) { discard(); message('Verification stopped.'); }
  else run();
};
function reset() {
  if (checking || loading) discard();
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: examples[example.value] } });
  view.dispatch(setDiagnostics(view.state, [])); results.replaceChildren(); message('');
}
example.onchange = reset;
document.querySelector('#lj-reset').onclick = reset;
// Restrict the isolation worker to this page's directory; other docs stay unaffected.
if (!crossOriginIsolated) {
  verify.disabled = true;
  if (!('serviceWorker' in navigator) || !isSecureContext) {
    message('The LiquidJava playground is not supported in this browser.', 'failure');
  } else {
    try {
      await navigator.serviceWorker.register(new URL('../isolation.js', runtime), { scope: new URL('../', runtime).pathname, updateViaCache: 'none' });
      await navigator.serviceWorker.ready;
      const key = 'liquidjava-playground-isolation';
      if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key, 'reload'); location.reload(); }
      else { message('This browser could not enable the verifier. Try opening the playground in a current Chrome, Firefox or Safari browser.', 'failure'); }
    } catch { message('The playground could not prepare the verifier. Reload and try again.', 'failure'); }
  }
} else { verify.disabled = false; sessionStorage.removeItem('liquidjava-playground-isolation'); }
