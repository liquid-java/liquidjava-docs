import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import z3 from 'z3-solver';
const { init } = z3;
import { createNatives } from './adapter.mjs';

const methods = JSON.parse(await readFile(new URL('../../playground/runtime/native-methods.json', import.meta.url)));

test('existing Java ABI checks bounds, evaluates models and passes counted arrays to WASM', async () => {
  const { Z3, em } = await init();
  const natives = createNatives(Z3, methods);
  const call = (name, ...args) => natives[`Java_com_microsoft_z3_Native_INTERNAL${name}`](null, ...args);
  const ctx = await call('mkContext', 0);
  try {
    const sort = await call('mkIntSort', ctx);
    const name = await call('mkStringSymbol', ctx, 'x');
    const x = await call('mkConst', ctx, name, sort);
    const zero = await call('mkInt', ctx, 0, sort);
    const two = await call('mkInt', ctx, 2, sort);
    const large = await call('mkInt64', ctx, 9007199254740993n, sort);
    assert.equal(await call('getNumeralString', ctx, large), '9007199254740993');
    const lower = await call('mkGt', ctx, x, zero);
    const upper = await call('mkLt', ctx, x, two);
    const bounds = await call('mkAnd', ctx, 2, new BigInt64Array([BigInt(lower), BigInt(upper)]));
    const solver = await call('mkSolver', ctx);
    await call('solverIncRef', ctx, solver);
    await call('solverAssert', ctx, solver, bounds);
    assert.equal(await call('solverCheck', ctx, solver), 1);
    const model = await call('solverGetModel', ctx, solver);
    const output = { value: 0 };
    assert.equal(await call('modelEval', ctx, model, x, true, output), true);
    assert.equal(await call('getNumeralString', ctx, output.value), '1');
    await call('solverAssert', ctx, solver, await call('mkLt', ctx, x, zero));
    assert.equal(await call('solverCheck', ctx, solver), -1);
    await call('solverDecRef', ctx, solver);
  } finally {
    await call('delContext', ctx);
    em.PThread.terminateAllThreads();
  }
});

test('an unknown solver result cannot become a successful verification', async () => {
  const natives = createNatives({ solver_check: async () => 0 }, methods);
  await assert.rejects(natives.Java_com_microsoft_z3_Native_INTERNALsolverCheck(null, 1, 2), /could not determine/);
});

test('unimplemented ABI operations fail explicitly', async () => {
  const natives = createNatives({}, methods);
  await assert.rejects(natives.Java_com_microsoft_z3_Native_INTERNALgetNumeralInt(null, 1, 2, { value: 0 }), /Unsupported Z3 output parameter/);
});
