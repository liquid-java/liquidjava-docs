---
title: Refinements
parent: Tutorial
nav_order: 1
description: Practice local variable, parameter, and return refinements in the first LiquidJava tutorial section.
---

# Refinements

This part introduces the core `@Refinement` annotation and shows how LiquidJava checks variables, parameters, and return values.

### Refine Local Variables

Open [`src/main/java/com/tutorial/part1/RefinementsExample.java`]({{ site.liquidjava_tutorial_src_url }}/part1/RefinementsExample.java).

The file contains four methods, each with a single local variable. The first three variables already include comments that describe the refinement each one should satisfy. Notice that `_` can be used as a placeholder for the refined variable value.

Work through the file in order:

1. Uncomment the `@Refinement` annotations one by one.
2. Observe the errors LiquidJava reports.
3. Change the values to satisfy the corresponding refinements.

Then add a refinement for the `direction` variable so it is always either `-1` or `1`. Use `||` for that final predicate.

### Refine Parameters

Open [`src/main/java/com/tutorial/part1/MethodRefinementExample.java`]({{ site.liquidjava_tutorial_src_url }}/part1/MethodRefinementExample.java).

The method `divide` is refined so that parameter `b` is never zero. Change the second argument in the sample call to `0` and inspect the resulting verification error.

### Refine Return Values

Now introduce a bug:

```java
@Refinement("_ == a / b")
```

Add that return refinement above the method signature, then change the implementation to return `a - b` instead of `a / b`.

LiquidJava should now report that the implementation does not satisfy the declared contract.

## Exercise - Refine `Counter`

Open [`src/main/java/com/tutorial/part1/exercise/Counter.java`]({{ site.liquidjava_tutorial_src_url }}/part1/exercise/Counter.java).

The class models a simple counter with `increment` and `decrement`. Replace each `"true"` refinement with the correct one:

- the `count` parameter of `increment` should be non-negative
- the `count` parameter of `decrement` should be greater than zero
- the return value of `increment` should equal `count + 1`
- the return value of `decrement` should equal `count - 1`

Use `_` or `return` to refer to the return value. With the correct refinements, LiquidJava should reject the second `decrement` call in `main`.
