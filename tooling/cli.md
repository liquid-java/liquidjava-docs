---
title: CLI Verifier
parent: Tooling
nav_order: 2
---

# CLI Verifier

LiquidJava ships with a command-line entry point for verifying Java files or projects outside the editor flow.

## Build the Project

```bash
git clone https://github.com/liquid-java/liquidjava.git
cd liquidjava
./mvnw clean install
```

## Run the Wrapper Script

The repository includes a helper script named `liquidjava`:

```bash
./liquidjava /path/to/your/project
```

Internally it runs:

```bash
mvn exec:java -pl liquidjava-verifier \
  -Dexec.mainClass="liquidjava.api.CommandLineLauncher" \
  -Dexec.args="/path/to/your/project"
```

## Example Outcomes

- A correct file should pass verification.
- A file that violates a refinement or typestate should produce an error that points to the failed contract.

## When to Use the CLI

- CI or scripted checks
- quick local experiments
- environments where you do not want to rely on VS Code
- debugging verifier behavior separately from editor integration

For a faster first experience, the [Quickstart]({{ '/getting-started/quickstart/' | relative_url }}) page uses the same command on a tiny example.
