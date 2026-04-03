---
title: Overview
parent: Getting Started
nav_order: 1
description: Learn what LiquidJava adds to Java, which problems it solves, and where to go next in the docs.
---

# Overview

LiquidJava is an additional type checker for Java. It extends Java with three main specification tools:

- **Refinement types** to restrict the values variables, parameters, and return values may take.
- **Typestates** to describe valid object protocols across method calls.
- **Ghost variables** to track extra state when a protocol depends on counters or flags rather than named states alone.

At a high level, LiquidJava helps catch mistakes that ordinary Java typing does not express well, including:

- division by zero
- values falling outside accepted ranges
- invalid call sequences such as using an object after it is closed
- incorrect use of external library types that have been refined separately

## A Small Example

```java
import liquidjava.specification.Refinement;

public class Example {
    public static int divide(int a, @Refinement("b != 0") int b) {
        return a / b;
    }

    public static void main(String[] args) {
        int ok = divide(8, 2);
        int bad = divide(8, 0); // verification error
    }
}
```

The refinement on `b` states that callers must provide a non-zero argument. Instead of waiting for a runtime exception, LiquidJava rejects the invalid call during verification.

## What You Need

- Java 20 or newer
- Maven 3.6 or newer
- The `liquidjava-api` dependency in the Java project you want to verify

You can work with LiquidJava in two main ways:

- through the [VS Code extension]({{ '/tooling/vscode-extension/' | relative_url }}) for an editor-first workflow
- through the [CLI verifier]({{ '/tooling/cli/' | relative_url }}) for direct command-line verification

## Documentation Map

- Start with [Installation]({{ '/getting-started/installation/' | relative_url }}) to set up the API and tooling.
- Follow [Quickstart]({{ '/getting-started/quickstart/' | relative_url }}) for a concise first run.
- Use the [Reference]({{ '/reference/' | relative_url }}) section to learn the annotation model in more detail.
- Visit [Examples]({{ '/examples/' | relative_url }}) when you want runnable projects.
