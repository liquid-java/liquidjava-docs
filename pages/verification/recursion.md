---
title: Recursion
parent: Verification Features
nav_order: 3
permalink: /verification/recursion/
description: Learn how LiquidJava checks recursive calls using parameter and return refinements.
---

# Recursion

A recursive call is checked using the same parameter and return refinements as any other method call. LiquidJava uses the declared contract instead of repeatedly expanding the method body.

```java
import liquidjava.specification.Refinement;

public class RecursionExample {
    @Refinement("_ == 0")
    public static int untilZero(
            @Refinement("k >= 0") int k) {
        if (k == 0) {
            return 0;
        } else {
            return untilZero(k - 1);
        }
    }
}
```

The verifier checks both branches:

1. In the base case, returning `0` satisfies `_ == 0`.
2. In the other branch, `k >= 0` and `k != 0` imply `k > 0`, since `k` is an integer. Therefore `k - 1 >= 0`, so the recursive call satisfies the parameter contract.
3. The recursive call's return contract says its result equals `0`, which satisfies the enclosing method's return contract.

## An Incorrect Base Case

If the base case tests `k == 1`, the other branch can include `k == 0`. Subtracting one then violates the recursive call's parameter refinement:

```java
import liquidjava.specification.Refinement;

public class IncorrectRecursionExample {
    @Refinement("_ == 0")
    public static int untilZero(
            @Refinement("k >= 0") int k) {
        if (k == 1) {
            return 0;
        } else {
            // k could be 0, so k - 1 could be negative
            return untilZero(k - 1); // Refinement Error
        }
    }
}
```

{: .note }
Checking recursive contracts does not prove termination or bound recursion depth. An accepted recursive method can still recurse forever or exhaust the Java stack. The return refinement describes the value if the method returns.
