---
title: Overview
parent: Getting Started
nav_order: 1
description: Learn what LiquidJava adds to Java, which problems it solves, and where to go next in the docs.
---

# Overview

LiquidJava is an additional type checker for Java. It extends Java with three main features:

- **Liquid types** to restrict the values variables, parameters, and return values can have using logical predicates.
- **Typestates** to describe valid object protocols across method calls.
- **Ghost variables** to track extra state when typestates aren't enough.

At a high level, LiquidJava helps catch mistakes that the standard Java type system cannot, including:

- Division by zero
- Array index out-of-bounds
- Values falling outside valid ranges
- Invalid protocol usages such as reading a file after it is closed

## Example

```java
import liquidjava.specification.*;

public class Example {
    public static int divide(int a, @Refinement("b != 0") int b) {
        return a / b;
    }
    public static void main(String[] args) {
        int result = divide(1, 0); // type error!
    }
}
```

The refinement on `b` states that callers must provide a non-zero argument, which is checked at compile time using an [SMT solver](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories).
The call `divide(1, 0)` violates this contract, so the verifier reports an error without the program even running.
