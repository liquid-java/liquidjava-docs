export function editorDiagnostic(issue, length) {
  const { from, to } = issue;
  if (!Number.isInteger(from) || !Number.isInteger(to) || from < 0 || to <= from || to > length) return null;
  return { from, to, severity: issue.severity, message: issue.output?.replace(/\u001b\[[0-9;]*m/g, '') };
}
import { AnsiUp } from 'ansi_up';

export function diagnosticHtml(output) {
  const ansi = new AnsiUp();
  ansi.use_classes = true;
  return ansi.ansi_to_html(output);
}
