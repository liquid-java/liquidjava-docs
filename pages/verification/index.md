---
title: Verification Features
nav_order: 3
has_children: true
has_toc: false
permalink: /verification/
description: Understand how LiquidJava checks assignments, method calls, conditionals, and recursive methods.
---

# Verification Features

The [Annotations]({{ '/annotations/' | relative_url }}) section explains how to write specifications. This section explains how LiquidJava uses them when checking Java code, without running the program.

At a check, the verifier gathers facts about the values in scope and asks an SMT solver whether those facts imply the required refinement. For example, knowing `x == 5` is enough to prove `x > 0`. Knowing only `x >= 0` is not: `x` could be zero.

## Variables and Assignments

A local variable's initializer must satisfy its declared refinement. Later assignments must satisfy that same refinement, even when the value changes.

```java
import liquidjava.specification.Refinement;

public class AssignmentExample {
    public static void example() {
        @Refinement("_ > 0") int count = 1;
        count = 2; // accepted: 2 > 0
        count = 0; // Refinement Error: 0 is not positive
    }
}
```

The verifier also tracks information from expressions and assignments. An unannotated local such as `int count = 1` can therefore carry useful information; it does not declare a requirement that every later value must equal `1`.

## When a Check Fails

A refinement error means the verifier could not establish the required predicate from the available facts. The code may violate the requirement, or the verifier may need a stronger parameter refinement, a branch condition, or a return contract to establish it. See [Understanding Refinement Errors]({{ '/diagnostics/understanding-refinement-errors/' | relative_url }}) for interpreting the diagnostic and its counterexample.
