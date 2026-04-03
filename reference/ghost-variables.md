---
title: Ghost Variables
parent: Reference
nav_order: 4
---

# Ghost Variables

Some protocols need more than a small set of named states. LiquidJava supports ghost variables for tracking extra specification-only state.

The following example refines `java.util.Stack` with a ghost `size` variable:

```java
import liquidjava.specification.ExternalRefinementsFor;
import liquidjava.specification.Ghost;
import liquidjava.specification.StateRefinement;

@ExternalRefinementsFor("java.util.Stack")
@Ghost("int size")
public interface StackRefinements<E> {
    public void Stack();

    @StateRefinement(to = "size(this) == size(old(this)) + 1")
    public E push(E elem);

    @StateRefinement(from = "size(this) > 0",
                     to = "size(this) == size(old(this)) - 1",
                     msg = "cannot pop from an empty stack")
    public E pop();

    @StateRefinement(from = "size(this) > 0", msg = "cannot peek from an empty stack")
    public E peek();
}

Stack<String> s = new Stack<>();
s.push("hello");
s.pop();
s.pop(); // type error: cannot pop from an empty stack
```

## Why Ghost Variables Help

The `size` variable is not a runtime field. It exists only in the specification and is tracked by LiquidJava during verification. That makes ghost variables useful for:

- collection sizes
- lock flags
- resource counters
- derived state that should not exist in production code

Ghost variables are especially helpful when named states alone are too coarse to capture the protocol you want to verify.
