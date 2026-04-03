---
title: Refinements
parent: Reference
nav_order: 1
---

# Refinements

Liquid types extend a language with logical predicates over basic types. They let you restrict the values a variable, parameter, field, or return value can have, which helps catch bugs before the program runs.

In LiquidJava, refinements are written with `@Refinement`. The predicate must be a boolean expression that refers to the refined value either by its declared name or by `_`.

These constraints are useful for preventing errors such as array index out-of-bounds or division by zero at compile time.

## Variables, Fields, Parameters, and Returns

```java
import liquidjava.specification.Refinement;

public class RefinementExamples {
    @Refinement("x > 0") // x must be greater than 0
    int x;

    @Refinement("0 <= _ && _ <= 100") // y must be between 0 and 100
    int y;

    @Refinement(value = "z % 2 == 0 ? z >= 0 : z < 0",
                msg = "z must be positive if even, negative if odd")
    int z;

    @Refinement("_ >= 0")
    int absDiv(int a, @Refinement(value = "b != 0", msg = "cannot divide by zero") int b) {
        int res = a / b;
        return res >= 0 ? res : -res;
    }
}
```

A refinement can be attached to:

- local variables and fields
- method parameters
- method return values

## Writing Predicates

Predicates can:

- use the declared variable name directly, such as `x > 0`
- use `_` as a placeholder for the refined value
- combine arithmetic, comparisons, conjunctions, disjunctions, and conditional expressions
- include a custom `msg` to make verification failures easier to understand

## Typical Uses

- Non-zero divisors
- Positive counters
- Bounded percentages
- Numeric relationships between parameters and return values

## What Happens on Failure

When LiquidJava cannot prove a refinement, it reports a verification error at compile time instead of letting the incorrect use reach runtime.

Continue with [Refinement Aliases]({{ '/reference/refinement-aliases/' | relative_url }}) when you want reusable predicate building blocks.
