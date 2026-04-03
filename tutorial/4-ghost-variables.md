---
title: Ghost Variables
parent: Tutorial
nav_order: 4
description: Use ghost variables to model counters and richer protocol state in the final LiquidJava tutorial section.
---

# Ghost Variables

Ghost variables let you track protocol-relevant state such as counters or flags when plain typestates are not expressive enough.

### Refine `ArrayList`

Open [`src/main/java/com/tutorial/part4/ArrayListRefinements.java`]({{ site.liquidjava_tutorial_src_url }}/part4/ArrayListRefinements.java).

This tutorial part refines `java.util.ArrayList` using a ghost variable named `size`.

The model does three important things:

- initializes `size` to `0`
- increments `size` after `add`
- constrains the `get` index so it stays within bounds

The expression `old(this)` refers to the previous state of the object, so `size(old(this))` means "the size before this method call."

Now open [`src/main/java/com/tutorial/part4/ArrayListExample.java`]({{ site.liquidjava_tutorial_src_url }}/part4/ArrayListExample.java). If you uncomment line 11, LiquidJava should reject the out-of-bounds access.

### Exercise - Refine `Stack`

Open [`src/main/java/com/tutorial/part4/exercise/StackRefinements.java`]({{ site.liquidjava_tutorial_src_url }}/part4/exercise/StackRefinements.java).

Replace the `"true"` refinements so the `count` ghost variable tracks the number of elements in the stack and prevents incorrect calls to `pop` and `peek`.

Your refinements should ensure that:

- `push` increases `count`
- `pop` decreases `count`
- `pop` and `peek` require `count(this) > 0`

#### Hints

- Use the previous `ArrayList` example as a guide.
- Use boolean predicates throughout.
- Use `old(this)` when you need the previous state.
- Use the `count` ghost variable in every relevant refinement.

With the correct implementation, LiquidJava should report an error on line 11 of [`src/main/java/com/tutorial/part4/exercise/StackExample.java`]({{ site.liquidjava_tutorial_src_url }}/part4/exercise/StackExample.java) because the code pops from an empty stack.
