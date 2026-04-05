---
title: Refinement Aliases
parent: Concepts
nav_order: 2
permalink: /concepts/refinement-aliases/
description: Learn how to reuse common refinement predicates with aliases to keep contracts shorter and easier to maintain.
---

# Refinement Aliases

When the same refinement appears repeatedly, you can define it once with `@RefinementAlias` and reuse it inside other refinements.

```java
import liquidjava.specification.*;

@RefinementAlias("Percentage(int v) { 0 <= v && v <= 100 }")
public class MyClass {

    @Refinement("Percentage(x)")
    int x = 25;

    @Refinement("Percentage(y)")
    int y = 75;
}
```

This helps keep contracts shorter and easier to maintain by giving common constraints a domain-specific name.
