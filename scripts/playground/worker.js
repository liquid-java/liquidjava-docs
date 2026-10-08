import { init } from 'z3-solver/build/low-level/index.js';
import { createNatives } from './adapter.mjs';

importScripts('https://cjrtnc.leaningtech.com/4.3/loader.js', './z3-built.js');
const status = message => postMessage({ type: 'status', message });
let runner;
let runnerJar;
let standardLibrary;
let busy = false;
async function initialize() {
  status('Loading the verifier…');
  const { Z3 } = await init(() => self.initZ3({ mainScriptUrlOrBlob: new URL('./z3-built.js', self.location.href).href, locateFile: file => new URL(file, self.location.href).href }));
  const response = await fetch('./native-methods.json');
  if (!response.ok) throw new Error('The verifier files could not be loaded.');
  Z3.global_param_set('timeout', '10000');
  const natives = createNatives(Z3, await response.json());
  await cheerpjInit({ version: 17, status: 'none', natives });
  const jar = new URL('./liquidjava.jar', self.location.href);
  const lib = await cheerpjRunLibrary('/app' + jar.pathname);
  runner = await lib.liquidjava.playground.BrowserRunner;
  runnerJar = '/app' + jar.pathname;
  standardLibrary = '/app' + new URL('./java-base.jar', self.location.href).pathname;
  postMessage({ type: 'ready' });
}
async function describe(error) {
  try { return String(error); } catch { return await error.toString(); }
}
self.onmessage = async event => {
  if (busy || event.data.type !== 'verify') return;
  busy = true;
  try {
    await ready;
    postMessage({ type: 'result', result: JSON.parse(await runner.verify(JSON.stringify(event.data.files), runnerJar, standardLibrary)) });
  } catch (error) {
    postMessage({ type: 'failure', message: await describe(error) });
  } finally { busy = false; }
};
const ready = initialize();
ready.catch(async error => postMessage({ type: 'failure', message: await describe(error) }));
