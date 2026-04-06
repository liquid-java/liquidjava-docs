---
title: ArrayList
parent: Examples
nav_order: 9
permalink: /examples/arraylist/
description: An external refinement for ArrayList that prevents out-of-bounds access.
---

# ArrayList

This example refines the `java.util.ArrayList` standard-library class without modifying its source code. A ghost variable tracks the size of the list, and a parameter refinement prevents out-of-bounds accesses.

```java
import liquidjava.specification.*;

@ExternalRefinementsFor("java.util.ArrayList")
@Ghost("int size")
public interface ArrayListRefinements<E> {
    public void ArrayList();

    @StateRefinement(to="size() == size(old(this)) + 1")
    public boolean add(E elem);

    public E get(@Refinement("_ < size()") int index);
}
```

```java
ArrayList<Integer> list = new ArrayList<>();
list.add(1);
list.get(0);
list.get(1); // Refinement Error
```

The key idea is that LiquidJava turns the usual runtime condition for `get(i)` into a static precondition over the tracked `size` ghost variable.
