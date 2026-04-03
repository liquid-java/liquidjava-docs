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
    int x;

    @Refinement("0 <= _ && _ <= 100") // y must be between 0 and 100
    int y;

    @Refinement("z % 2 == 0 ? z >= 0 : z < 0") // z must be positive if even, negative if odd
    int z;

    @Refinement("_ >= 0") // the return value must be non-negative
    int absDiv(int a, @Refinement("b != 0") int b) { // b must be non-zero
        int res = a / b;
        return res >= 0 ? res : -res;
    }
}
```

