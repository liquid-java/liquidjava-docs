export function summarize(result) {
  if (result.status === 'failure') {
    return { status: 'failure', diagnostics: [{ title: 'Verification could not complete', message: result.message || 'Please try again.' }] };
  }
  const diagnostics = result.diagnostics.map(({ title, message }) => ({ title, message }));
  if (!diagnostics.length) diagnostics.push({ title: 'Verification passed', message: 'All refinements verified.' });
  return { status: result.status, diagnostics };
}
