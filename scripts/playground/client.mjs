import { summarize } from './summary.mjs';

// Called before editors are mounted so the first isolation reload cannot lose edits.
export async function prepareVerifier() {
  const key = 'liquidjava-isolation:' + new URL('../', import.meta.url).pathname;
  if (globalThis.crossOriginIsolated) {
    sessionStorage.removeItem(key);
    return;
  }
  if (!globalThis.isSecureContext || !navigator.serviceWorker) {
    throw new Error('Verification requires HTTPS and a browser with cross-origin isolation support.');
  }
  if (sessionStorage.getItem(key)) {
    throw new Error('This browser could not enable verification. Try a current Chrome, Firefox or Safari browser.');
  }
  const script = new URL('../isolation.js', import.meta.url);
  await navigator.serviceWorker.register(script, {
    scope: new URL('../', import.meta.url).pathname, updateViaCache: 'none'
  });
  await new Promise((resolve, reject) => {
    const finish = error => {
      clearTimeout(timer);
      navigator.serviceWorker.removeEventListener('controllerchange', controlled);
      if (error) reject(error); else resolve();
    };
    const controlled = () => {
      if (navigator.serviceWorker.controller?.scriptURL === script.href) finish();
    };
    const timer = setTimeout(() => finish(new Error('The browser could not prepare verification. Reload and try again.')), 15000);
    navigator.serviceWorker.addEventListener('controllerchange', controlled);
    controlled();
  });
  sessionStorage.setItem(key, 'reload');
  location.reload();
  await new Promise(() => {});
}

export class BrowserVerifier {
  worker;
  pending;
  timer;

  cancel() {
    clearTimeout(this.timer);
    this.worker?.terminate();
    this.worker = undefined;
    this.pending?.reject(new DOMException('Verification stopped.', 'AbortError'));
    this.pending = undefined;
  }

  verify(files, onStatus = () => {}) {
    if (this.pending) throw new Error('Verification is already running.');
    if (!globalThis.crossOriginIsolated || typeof SharedArrayBuffer === 'undefined') {
      return Promise.reject(new Error('This browser cannot start the verifier. Reload the page and try again.'));
    }
    return new Promise((resolve, reject) => {
      this.pending = { resolve, reject };
      const fail = message => {
        this.pending?.reject(new Error(message));
        this.pending = undefined;
        this.cancel();
      };
      const send = () => {
        clearTimeout(this.timer);
        onStatus('Verifying…');
        this.timer = setTimeout(() => fail('Verification timed out. Simplify the example and try again.'), 60000);
        this.worker.postMessage({ type: 'verify', files });
      };
      if (this.worker) { send(); return; }
      onStatus('Downloading and starting the verifier. This may take a moment…');
      this.timer = setTimeout(() => fail('The verifier took too long to load. Check your connection and try again.'), 120000);
      try { this.worker = new Worker(new URL('./worker.js', import.meta.url)); }
      catch { fail('The verifier could not start. Reload the page and try again.'); return; }
      const current = this.worker;
      current.onerror = () => {
        if (this.worker === current) fail('The verifier could not start. Reload the page and try again.');
      };
      current.onmessage = ({ data }) => {
        if (this.worker !== current) return;
        if (data.type === 'status') onStatus(data.message);
        if (data.type === 'ready') send();
        if (data.type === 'failure') fail(data.message);
        if (data.type === 'result') {
          clearTimeout(this.timer);
          this.pending.resolve(summarize(data.result));
          this.pending = undefined;
          if (data.result.status === 'failure') this.cancel();
        }
      };
    });
  }
}
