---
title: Conditionals
parent: Verification Features
nav_order: 2
permalink: /verification/conditionals/
description: Learn how if and else conditions provide facts for refinement checks.
---

# Conditionals

An `if` condition adds information along each branch. The `then` branch is checked assuming the condition is true; the `else` branch is checked assuming it is false.

```java
import liquidjava.specification.Refinement;

public class ConditionalExample {
    public static void requirePositive(
            @Refinement("_ > 0") int value) {}
    public static void requireNonPositive(
            @Refinement("_ <= 0") int value) {}

    public static void guarded(int value) {
        if (value > 0) {
            requirePositive(value); // accepted: value > 0
        } else {
            requireNonPositive(value); // accepted: value <= 0
        }
    }
}
```

Although `guarded` accepts any integer, each call is protected by a condition that establishes the required refinement. No extra refinement on its parameter is needed for these calls.

## The Condition Must Be Strong Enough

Changing the guard to `value >= 0` does not prove strict positivity, because zero remains possible:

```java
import liquidjava.specification.Refinement;

public class WeakGuardExample {
    public static void requirePositive(
            @Refinement("_ > 0") int value) {}

    public static void guarded(int value) {
        if (value >= 0) {
            requirePositive(value); // Refinement Error: value could be 0
        }
    }
}
```

Branch assumptions apply to the paths on which they hold. After an `if`/`else` where both branches continue, code must work for either outcome; it cannot assume that the `then` condition is still true. Nested conditions can provide additional facts inside their branches.
