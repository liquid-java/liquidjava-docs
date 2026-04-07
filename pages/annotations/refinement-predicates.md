---
title: "@RefinementPredicate"
parent: Annotations
nav_order: 6
permalink: /annotations/refinement-predicate/
description: Learn how to declare custom ghost functions and how they relate to ghosts and states.
---

# @RefinementPredicate

LiquidJava also supports a more general mechanism for declaring ghost functions, through the `@RefinementPredicate` annotation. This is a more flexible but less user-friendly way to declare ghosts. It allows declaring any ghost function with an explicit signature.

The `@Ghost` and `@StateSet` annotations are sugar for the `@RefinementPredicate` annotation, which create specific kinds of ghost functions with a more concise syntax:

| Syntax Sugar | Refinement Predicate |
| --- | --- |
| `@Ghost("int size")` | `@RefinementPredicate("int size(ArrayList)")` |
| `@Ghost("boolean open")` | `@RefinementPredicate("boolean open(InputStreamReader)")` |
| `@StateSet({"open", "closed"})` | `@RefinementPredicate("int state1(File)")`<br>`state1(this) == 0 <=> open(this)`<br>`state1(this) == 1 <=> closed(this)` |

## Ghost Functions

A ghost function is an uninterpreted function used only during verification. In practice, that means:

- It has a name, parameter types, and a return type
- It has no implementation
- The verifier does not compute it from program code
- The SMT encoding declares it as a function symbol and then reasons only from the constraints that mention it

So a declaration like:

```java
@RefinementPredicate("int size(ArrayList)")
```

Does not say how `size` is computed. It only says that, during verification, there exists a function `size : ArrayList -> int` and the verifier may constrain it with refinements such as:

```java
@StateRefinement(to = "size(this) == 0")
```

or

```java
@StateRefinement(to = "size(this) == size(old(this)) + 1")
```

The meaning comes from those constraints, not from a body.

## Example

You can model any typestate protocol without using the `@StateSet` annotation, by declaring a ghost function that represents the state and then using aliases to give names to the different states, which is kind of like how `@StateSet` works. Under the hood, states are just ghost functions that return an integer representing the current state. For example:

```java
import liquidjava.specification.*;

@RefinementPredicate("int state(File f)")
@RefinementAlias("Open(File f) { state(f) == 0}")
@RefinementAlias("Closed(File f) { state(f) == 1}")
public class File {
    @StateRefinement(to="Open(this)")
    public File() {}

    @StateRefinement(from="Open(this)")
    public void read() {}

    @StateRefinement(from="Open(this)", to="Closed(this)")
    public void close() {}
}
```

In this case, we must pass the explicit `this` as an argument to the alias.