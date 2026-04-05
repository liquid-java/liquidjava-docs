---
title: Counter
parent: Examples
nav_order: 1
permalink: /examples/counter/
description: A simple refinement example for ensuring a counter never decrements below zero.
---

# Counter

This example uses plain refinements on method parameters and return values to ensure a counter never decrements below zero.

```java
import liquidjava.specification.Refinement;

public class Counter {
    @Refinement("_ == count + 1")
    public static int increment(@Refinement("count >= 0") int count) {
        return count + 1;
    }

    @Refinement("_ == count - 1")
    public static int decrement(@Refinement("count > 0") int count) {
        return count - 1;
    }
}
```

```java
int c = 0;
c = Counter.increment(c);
c = Counter.decrement(c);
c = Counter.decrement(c); // Refinement Error
```

The parameter refinement on `decrement` requires the input to be strictly positive, so LiquidJava rejects the final call when `c` is already `0`.
