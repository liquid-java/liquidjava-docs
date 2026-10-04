package liquidjava.playground;

import com.google.gson.Gson;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;
import liquidjava.diagnostics.Diagnostics;
import liquidjava.diagnostics.LJDiagnostic;
import liquidjava.processor.RefinementProcessor;
import liquidjava.processor.context.ContextHistory;
import org.eclipse.jdt.core.compiler.CategorizedProblem;
import spoon.Launcher;
import spoon.compiler.builder.AdvancedOptions;
import spoon.compiler.builder.ClasspathOptions;
import spoon.compiler.builder.ComplianceOptions;
import spoon.compiler.builder.JDTBuilder;
import spoon.compiler.builder.JDTBuilderImpl;
import spoon.compiler.builder.SourceOptions;
import spoon.processing.ProcessingManager;
import spoon.reflect.factory.Factory;
import spoon.reflect.cu.SourcePosition;
import spoon.reflect.cu.position.CompoundSourcePosition;
import spoon.support.QueueProcessingManager;
import spoon.support.compiler.jdt.JDTBasedSpoonCompiler;

public final class BrowserRunner {
    public static String verify(String source, String jar, String javaBase) {
        Map<String, Object> result = new LinkedHashMap<>();
        ArrayList<Map<String, Object>> issues = new ArrayList<>();
        try {
            Path dir = Path.of("/files/playground");
            Files.createDirectories(dir);
            Path input = dir.resolve("Example.java");
            Files.writeString(input, source);
            Diagnostics.getInstance().clear();
            ContextHistory.getInstance().clearHistory();
            Launcher launcher = new Launcher();
            launcher.addInputResource(input.toString());
            launcher.getEnvironment().setNoClasspath(true);
            launcher.getEnvironment().setComplianceLevel(8);
            launcher.getEnvironment().setSourceClasspath(new String[] {jar});
            JDTBuilder builder = new JDTBuilderImpl()
                .classpathOptions(new ClasspathOptions().classpath(jar).bootclasspath(javaBase))
                .complianceOptions(new ComplianceOptions().compliance(8))
                .advancedOptions(new AdvancedOptions().preserveUnusedVars().continueExecution().enableJavadoc())
                .sources(new SourceOptions().sources(input.toString()));
            JDTBasedSpoonCompiler compiler = (JDTBasedSpoonCompiler) launcher.getModelBuilder();
            boolean built = compiler.build(builder);
            for (CategorizedProblem problem : compiler.getProblems()) {
                if (!problem.isError()) continue;
                Map<String, Object> issue = new LinkedHashMap<>();
                issue.put("severity", "error");
                issue.put("output", problem.toString());
                issue.put("line", problem.getSourceLineNumber());
                issue.put("from", problem.getSourceStart());
                issue.put("to", problem.getSourceEnd() + 1);
                issues.add(issue);
            }
            if (issues.isEmpty()) {
                if (!built) throw new IllegalArgumentException("Java source could not be parsed");
                Factory factory = launcher.getFactory();
                ProcessingManager manager = new QueueProcessingManager(factory);
                manager.addProcessor(new RefinementProcessor(factory));
                manager.process(factory.Package().getRootPackage());
            }
            Diagnostics diagnostics = Diagnostics.getInstance();
            for (LJDiagnostic warning : diagnostics.getWarnings()) issues.add(issue(warning, "warning"));
            for (LJDiagnostic error : diagnostics.getErrors()) issues.add(issue(error, "error"));
            result.put("status", !issues.isEmpty() && issues.stream().anyMatch(i -> "error".equals(i.get("severity")))
                ? "error" : diagnostics.foundWarning() ? "warning" : "success");
        } catch (Throwable error) {
            result.put("status", "failure");
            result.put("message", error.toString());
            java.io.StringWriter stack = new java.io.StringWriter();
            error.printStackTrace(new java.io.PrintWriter(stack));
            result.put("details", stack.toString());
        }
        result.put("diagnostics", issues);
        return new Gson().toJson(result);
    }

    private static Map<String, Object> issue(LJDiagnostic issue, String severity) {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("severity", severity);
        result.put("output", issue.toString());
        if (issue.getPosition() != null && issue.getPosition().isValidPosition()) {
            result.put("line", issue.getPosition().getLine());
            result.put("column", issue.getPosition().getColumn());
            SourcePosition position = issue.getPosition();
            // match VS Code: start at the name and span the declaration, excluding its closing delimiter
            if (position instanceof CompoundSourcePosition declaration) {
                result.put("from", declaration.getNameStart());
                result.put("to", position.getSourceEnd());
            } else {
                result.put("from", position.getSourceStart());
                result.put("to", position.getSourceEnd() + 1);
            }
        }
        return result;
    }
}
