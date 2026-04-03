---
title: Tutorial
nav_order: 3
has_children: true
permalink: /tutorial/
description: Work through the LiquidJava tutorial step by step with linked exercises for refinements, typestates, external refinements, and ghost variables.
---

# LiquidJava Tutorial

Made by [Ricardo Costa](https://github.com/rcosta358) and [Catarina Gamboa](https://catarinagamboa.github.io).

This section adapts the guided LiquidJava tutorial into the docs site and organizes it by part so you can move through the material progressively.

## Setup

To follow along comfortably, install:

- Visual Studio Code
- [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
- [LiquidJava Extension](https://marketplace.visualstudio.com/items?itemName=AlcidesFonseca.liquid-java)

### Clone the tutorial repository

The exercises live in [liquidjava-tutorial]({{ site.liquidjava_tutorial_url }}). Clone it locally with:

```bash
git clone {{ site.liquidjava_tutorial_url }}.git
cd liquidjava-tutorial
```

Then open the folder in VS Code:

```bash
code .
```

### Open the tutorial files

Once the repository is open, each tutorial page in this docs site points you to the exact GitHub file to inspect and the matching local path under `src/main/java/com/tutorial/...`.

## Tutorial Parts

- [Refinements]({{ '/tutorial/1-refinements/' | relative_url }})
- [State Refinements]({{ '/tutorial/2-state-refinements/' | relative_url }})
- [External Refinements]({{ '/tutorial/3-external-refinements/' | relative_url }})
- [Ghost Variables]({{ '/tutorial/4-ghost-variables/' | relative_url }})

## What Are Liquid Types?

Programs go wrong. Developers make mistakes. Traditional type systems already prevent many errors, but they do not express richer value-level guarantees such as "this integer must be positive" or "this divisor must be non-zero."

Liquid types extend traditional types with logical predicates. In LiquidJava, those predicates become Java annotations that help catch errors earlier, including division by zero, array out-of-bounds access, and protocol violations.

```java
public class Example {
    public static int divide(int a, int b) {
        return a / b;
    }

    public static void example() {
        int result = divide(2, 0); // runtime failure
    }
}
```

With LiquidJava:

```java
public class Example {
    public static int divide(int a, @Refinement("b != 0") int b) {
        return a / b;
    }

    public static void example() {
        int result = divide(2, 0); // compile-time error
    }
}
```

## Quiz

Test your knowledge with the quiz at [liquid-java.github.io/liquidjava-tutorial](https://liquid-java.github.io/liquidjava-tutorial/).
