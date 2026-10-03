export function createNatives(Z3, methods) {
  const natives = { Java_com_microsoft_z3_Native_setInternalErrorHandler() {} };
  for (const { name, types, api } of methods) {
    natives[`Java_com_microsoft_z3_Native_${name}`] = async (_lib, ...args) => {
      const input = args.map((value, i) => types[i] === 'long' ? Number(value) : value);
      // numeric int64 arguments are values, whereas other longs are WASM pointers
      if (api === 'mk_int64' || api === 'mk_unsigned_int64') input[1] = BigInt(args[1]);
      if (api === 'model_eval') {
        const value = await Z3.model_eval(...input.slice(0, 4));
        if (value === null) return false;
        args[4].value = value;
        return true;
      }
      if (types.some(type => type.endsWith('Ptr'))) {
        throw new Error(`Unsupported Z3 output parameter: ${api}`);
      }
      // the JS binding derives array counts from the array itself
      for (let i = types.length - 1; i >= 1; i--) {
        if (types[i] === 'long[]' && types[i - 1] === 'int') {
          input[i] = Array.from(input[i], Number);
          input.splice(i - 1, 1);
        }
      }
      if (typeof Z3[api] !== 'function') throw new Error(`Unsupported Z3 operation: ${api}`);
      const result = await Z3[api](...input);
      // the desktop verifier treats unknown as success; the playground must not
      if ((api === 'solver_check' || api === 'solver_check_assumptions') && result === 0) {
        throw new Error('Z3 could not determine whether this refinement holds.');
      }
      return result;
    };
  }
  return natives;
}
