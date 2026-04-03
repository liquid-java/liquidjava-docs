---
title: Quickstart
parent: Getting Started
nav_order: 3
description: Add LiquidJava to a Java project, run the verifier on a small example, and see a refinement failure.
---

# Quickstart

This quickstart keeps the setup intentionally small: add the annotation API, build the verifier once, and verify a tiny Java file.

## 1. Create a Minimal File

```java
import liquidjava.specification.Refinement;

public class Example {
    public static int divide(int a, @Refinement("b != 0") int b) {
        return a / b;
    }

    public static void main(String[] args) {
        int ok = divide(12, 3);
        int bad = divide(12, 0);
    }
}
```

The second call violates the refinement on `b`, so the verifier should reject it.

## 2. Build LiquidJava

```bash
git clone {{ site.liquidjava_repo_url }}.git
cd liquidjava
./mvnw clean install
```

## 3. Run the Verifier

From the repository root:

```bash
./liquidjava /path/to/Example.java
```

This wrapper runs:

```bash
mvn exec:java -pl liquidjava-verifier \
  -Dexec.mainClass="liquidjava.api.CommandLineLauncher" \
  -Dexec.args="/path/to/Example.java"
```

## 4. Try a Passing Version

Change the failing call to:

```java
int ok2 = divide(12, 4);
```

Run the verifier again. The file should now pass.

## Next Steps

- Read [Refinements]({{ '/reference/refinements/' | relative_url }}) to see the core annotation model.
- Read [Typestates]({{ '/reference/typestates/' | relative_url }}) for object protocols.
- Read [Refinement Aliases]({{ '/reference/refinement-aliases/' | relative_url }}) for reusable predicates.
- Read [Ghost Variables and External Refinements]({{ '/reference/ghost-variables-and-external-refinements/' | relative_url }}) for more advanced modeling techniques.
- Follow the [Tutorial]({{ '/tutorial/' | relative_url }}) for hands-on exercises that build on these concepts.

{: .tip }
If you prefer an editor-first workflow, the [VS Code extension]({{ '/tooling/vscode-extension/' | relative_url }}) surfaces the same checks with live diagnostics.
