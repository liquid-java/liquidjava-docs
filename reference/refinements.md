---
title: Refinements
parent: Reference
nav_order: 1
---

# Refinements

In LiquidJava, refinements allow us to express restrictions as logical predicates over basic types. They let us restrict the values a variable, field, parameter, or return value can have, which helps catch bugs before the program runs.

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

The predicates allowed inside a refinement belong to quantifier-free linear integer arithmetic. In practice, this means you can write boolean expressions over integer values using comparisons, logical connectives, arithmetic operators, and conditional expressions. You can also call ghosts and aliases from refinements, which we cover in later sections.

| Form | Syntax | Example |
| --- | --- | --- |
| Comparison | `==` `!=` `>` `>=` `<` `<=` | `@Refinement("x > 0") int x = 1;` |
| Logical operators | `!` `&&` <code>&#124;&#124;</code> `-->` | `@Refinement("0 <= y && y <= 100") int y = 25;` |
| Arithmetic | `+` `-` `*` `/` `%` | `@Refinement("v + 20 < 100") int v = 79;` |
| Conditional | `cond ? e1 : e2` | `@Refinement("a > b ? _ == a : _ == b") int max(int a, int b)` |
| Ghost and alias calls | `a(b)` `A(b)` | `@Refinement("Positive(_)") int c = 10;` |
| Literals | `true` `false` `0` `1.5` | `@Refinement("_ == true") boolean ok = true;` |

LiquidJava currently only supports a small set of types in refinements:
- Primitive types: `int`, `boolean`, `long`, `double`, `float`
- Boxed types: `Boolean`, `Integer`, `Double`
