export function editorDiagnostic(issue, length) {
  const { from, to } = issue;
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to <= from || to > length) return null;
  return { from, to, severity: issue.severity, message: `${issue.title}: ${issue.message}` };
}
