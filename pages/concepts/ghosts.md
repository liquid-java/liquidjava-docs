---
title: Ghosts
parent: Concepts
nav_order: 5
permalink: /concepts/ghosts/
description: Learn how to track logical state that helps express and verify richer object invariants.
---

# Ghosts

Some protocols need more than a small set of named states. LiquidJava supports ghost variables for tracking extra state. They can be used in refinements and state refinements to express richer invariants about the object. Similarly to the states, these are functions that take the object being refined as a parameter.

Ghosts are declared with the `@Ghost` annotation, and they can be updated with `@StateRefinement` annotations on methods.

```java
import liquidjava.specification.*;

@ExternalRefinementsFor("java.util.Stack")
@Ghost("int size")
public interface StackRefinements<E> {
    @StateRefinement(to="size() == 0")
    public void Stack();

    @StateRefinement(to="size() == size(old(this)) + 1")
    public E push(E elem);

    @StateRefinement(from="size() > 0", to="size() == size(old(this)) - 1")
    public E pop();

    @StateRefinement(from="size() > 0")
    public E peek();
}
```

```java
Stack<String> s = new Stack<>();
s.push("hello");
s.pop();
s.pop(); // State Refinement Error
```

In the "constructor" method, the ghost variable `size` is initialized to 0. An equality in a method postcondition is how ghost variables are updated. However, here it is not necessary, since when no postcondition is declared, it is initialized to its default value, similarly to how Java initializes fields to their default values when no explicit initializer is provided (`int --> 0`, `boolean --> false`, etc.). 

In the `push` method, we specify no precondition, since we can always push an element to the stack, but we specify a postcondition that increments the `size` by one. In this case, we tell the typechecker that the new value of `size` after calling `push` is equal to the old value of `size` plus one. This is possible using the `old` function, which takes an object instance and returns its value before the method call.

In the `pop` method, we specify a precondition that the `size` must be greater than zero, since we cannot pop from an empty stack. We also specify a postcondition that decrements the `size` by one, similarly to the `push` method.

In the `peek` method, we specify the same precondition, since we also cannot peek from an empty stack, but we don't specify a postcondition since peeking does not change the size of the stack.
