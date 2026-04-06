---
title: Refinements
parent: Concepts
nav_order: 1
permalink: /concepts/refinements/
description: Learn about how to use refinements to specify constraints on variables, fields, parameters, and return values.
---

# Refinements

In LiquidJava, refinements allow you to express restrictions as logical predicates over basic types. They let you restrict the values that a variable, field, parameter, or return value can have, which helps catch bugs before the program runs.

These are written as strings in the `@Refinement` annotation. The predicate must be a boolean expression that refers to the refined value either by its declared name or by `_`.

```java
import liquidjava.specification.*;

public class RefinementExamples {
    @Refinement("x > 0") // x must be greater than 0
    int x = 1;

    @Refinement("0 <= _ && _ <= 100") // y must be between 0 and 100
    int y = 50;

    @Refinement("z % 2 == 0 ? z >= 0 : z < 0") // z must be positive if even, negative if odd
    int z = 4;

    @Refinement("_ >= 0") // the return value must be non-negative
    int absDiv(int a, @Refinement("b != 0") int b) { // b must be non-zero
        int res = a / b;
        return res >= 0 ? res : -res;
    }
}
```

## Predicate Syntax

Refinement predicates use a language similar to Java, where you can write boolean expressions using comparisons, logical connectives, arithmetic operators, conditional expressions, and calls to ghosts or aliases, which are covered in later sections.

| Form | Syntax | Example |
| --- | --- | --- |
| Comparison | `==` `!=` `>` `>=` `<` `<=` | `@Refinement("x > 0") int x = 1;` |
| Logical operators | `!` `&&` <code>&#124;&#124;</code> `-->` | `@Refinement("0 <= y && y <= 100") int y = 25;` |
| Arithmetic | `+` `-` `*` `/` `%` | `@Refinement("v + 20 < 100") int v = 79;` |
| Conditional | `cond ? e1 : e2` | `@Refinement("a > b ? _ == a : _ == b") int max(int a, int b)` |
| Ghost and alias calls | `a(b)` `A(b)` | `@Refinement("Positive(_)") int c = 10;` |
| Literals | `true` `false` `0` `1.5` | `@Refinement("_ == true") boolean ok = true;` |

LiquidJava currently only supports a small set of types in refinements:
- The primitive types `int` `boolean` `long` `double` `float`
- The boxed types `Boolean` `Integer` `Double`
