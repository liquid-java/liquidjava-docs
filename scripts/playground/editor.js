import { EditorView, basicSetup } from 'codemirror';
import { java } from '@codemirror/lang-java';
import { setDiagnostics } from '@codemirror/lint';
import { examples } from './examples.mjs';

const root = document.querySelector('#lj-playground');
const example = document.querySelector('#lj-example');
const verify = document.querySelector('#lj-verify');
const stop = document.querySelector('#lj-stop');
const status = document.querySelector('#lj-status');
const results = document.querySelector('#lj-results');
const runtime = new URL(root.dataset.runtime, location.href);
let worker;
let loading = false;
let checking = false;
let source;
let timer;
const view = new EditorView({
  doc: examples.positive,
  extensions: [basicSetup, java(), EditorView.contentAttributes.of({ 'aria-label': 'Java source code' }),
    EditorView.updateListener.of(update => {
      if (update.docChanged) {
        queueMicrotask(() => view.dispatch(setDiagnostics(view.state, [])));
      }
      if (update.docChanged && !checking && !loading) {
        results.replaceChildren();
        message('Code changed. Verify to check it.');
      }
    })],
  parent: document.querySelector('#lj-editor')
});
function message(text, state = '') { status.textContent = text; status.dataset.state = state; }
function controls(busy) { verify.disabled = busy; stop.disabled = !busy; }
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
    const article = document.createElement('article'); article.className = 'lj-issue';
    const title = document.createElement('h3'); title.textContent = issue.title; article.append(title);
    if (issue.line && issue.line <= view.state.doc.lines) {
      const line = view.state.doc.line(issue.line);
      marks.push({ from: line.from, to: line.to, severity: issue.severity, message: `${issue.title}: ${issue.message}` });
      const jump = document.createElement('button'); jump.textContent = `Line ${issue.line}`;
      jump.onclick = () => { view.dispatch({ selection: { anchor: line.from }, scrollIntoView: true }); view.focus(); };
      article.append(jump);
    }
    for (const text of [issue.message, issue.hint, issue.counterexample]) {
      if (!text) continue;
      const paragraph = document.createElement('p'); paragraph.textContent = text; article.append(paragraph);
    }
    results.append(article);
  }
  view.dispatch(setDiagnostics(view.state, marks));
  const messages = { success: 'Passed verification.', warning: 'Verification finished with warnings.', error: 'Verification found errors.', failure: 'Verification could not complete. ' + (result.message || '') };
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
verify.onclick = run;
stop.onclick = () => { discard(); message('Verification stopped.'); };
function reset() {
  if (checking || loading) discard();
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: examples[example.value] } });
  view.dispatch(setDiagnostics(view.state, [])); results.replaceChildren(); message('Example ready. Select Verify to check it.');
}
example.onchange = reset;
document.querySelector('#lj-reset').onclick = reset;
root.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); run(); }
});
// Restrict the isolation worker to this page's directory; other docs stay unaffected.
if (!crossOriginIsolated) {
  verify.disabled = true;
  if (!('serviceWorker' in navigator) || !isSecureContext) {
    message('The playground requires HTTPS or localhost and service worker support.', 'failure');
  } else {
    message('Preparing the playground…');
    try {
      await navigator.serviceWorker.register(new URL('../isolation.js', runtime), { scope: new URL('../', runtime).pathname, updateViaCache: 'none' });
      await navigator.serviceWorker.ready;
      const key = 'liquidjava-playground-isolation';
      if (!sessionStorage.getItem(key)) { sessionStorage.setItem(key, 'reload'); location.reload(); }
      else { message('This browser could not enable the verifier. Try opening the playground in a current Chrome, Firefox or Safari browser.', 'failure'); }
    } catch { message('The playground could not prepare the verifier. Reload and try again.', 'failure'); }
  }
} else { verify.disabled = false; sessionStorage.removeItem('liquidjava-playground-isolation'); }
