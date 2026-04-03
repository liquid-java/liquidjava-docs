---
title: Refinement Aliases
parent: Reference
nav_order: 2
---

# Refinement Aliases

When the same refinement appears repeatedly, define it once with `@RefinementAlias` and reuse it inside other refinements.

```java
import liquidjava.specification.Refinement;
import liquidjava.specification.RefinementAlias;

@RefinementAlias("Percentage(int v) { 0 <= v && v <= 100 }")
public class MyClass {

    @Refinement("Percentage(x)")
    int x = 25;
}
```

Aliases help by:

- reducing repeated predicate text
- making refinements easier to read
- giving common constraints a domain-specific name

## When to Use Them

Aliases are a good fit for constraints such as:

- percentages
- bounded indexes
- value classes such as positive or non-negative integers
- project-wide concepts that appear in many files

For object protocols, move on to [Typestates]({{ '/reference/typestates/' | relative_url }}).
