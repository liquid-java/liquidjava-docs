---
title: Overview
parent: Getting Started
nav_order: 2
permalink: /getting-started/overview/
description: Learn what LiquidJava adds to Java.
---

# Overview

LiquidJava is an additional type checker for Java. It extends Java with three main features:

- **Liquid types** to restrict the values variables, parameters, and return values can have using logical predicates.
- **Typestates** to describe valid object protocols across method calls.
- **Ghosts** to track extra state when typestates aren't enough.

These make it possible to catch bugs that the standard Java type system cannot, including:

- Division by zero
- Array index out-of-bounds
- Values falling outside valid ranges
- Invalid protocol usages such as reading a file after it is closed

## Example

```java
public class Example {
    public static int divide(int a, @Refinement("b != 0") int b) {
        return a / b;
    }
    public static void main(String[] args) {
        int result = divide(1, 0); // Refinement Error
    }
}
```

The refinement on `b` states that callers must provide a non-zero argument, which is checked at compile time using an [SMT solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories).
The call `divide(1, 0)` violates this contract, so the verifier reports an error without the program even running.
