---
title: Examples
nav_order: 4    
has_children: false
---

# Examples

The examples repository is most useful when it shows real LiquidJava patterns, not just setup steps. Here are a few representative examples from the demo project.

## Conditional Refinement Reasoning

This example shows LiquidJava refining values across control flow:

```java
@Refinement("_ > 0")
public static int toPositive(@Refinement("a < 0") int a) {
    return -a;
}

@Refinement("_ < 0")
public static int toNegative(@Refinement("a > 0") int a) {
    return -a;
}

@Refinement("_ < 10")
int ex_a = 5;
if (ex_a < 0) {
    @Refinement("_ >= 10")
    int ex_b = toPositive(ex_a) * 10;
} else {
    if (ex_a != 0) {
        @Refinement("_ < 0")
        int ex_d = toNegative(ex_a);
    }
}
```

This is a nice example of path-sensitive checking: LiquidJava narrows what it knows inside each branch and verifies the resulting values against stronger local constraints.

## Failing Numeric Constraints

Some of the most useful examples are the ones that fail in interesting ways. This one highlights how LiquidJava reasons about incompatible numeric constraints:

```java
void test(@Refinement("b >= 100") int b) {
    int a = -b;
    if (b > 0) {
        write(b);
    }
}

void write(@Refinement("b >= -128 && b <= 127") int b) {
    System.out.println(b);
}
```

Here, a value known to be at least `100` is passed into a function that only accepts values in the byte-like range `[-128, 127]`. Examples like this are useful when you want to understand refinement subtyping and solver-generated failures.

### Alias, Ghost, and State Declarations in One Place

This compact example shows several LiquidJava features living together in one class:

```java
@RefinementAlias("Positive(int v) { v >= 0 }")
@Ghost("int size")
@StateSet({"open", "closed"})
public class SimpleExample {
    void example(@Refinement("_ >= 100") int value) {
        @Refinement("-10 <= _ && _ <= 255") int b = 50;
        @Refinement("_ > 0") int a = b;
        if (value > 0) {
            @Refinement("Positive(_)")
            int x = -1;
        }
    }
}
```

It is a useful reference example because it shows how aliases, ghost variables, and state sets fit into the same annotation vocabulary, even before you move into larger protocol-oriented models.

## Collection Protocol Sketches

The repo also contains more experimental collection refinements. For example, there is a sketch for tracking the size of an `ArrayDeque` through a ghost variable:

```java
@Ghost("int size")
public interface ArrayDequeRefinements<E> {
    @StateRefinement(to="size(this) == size(old(this)) + 1")
    public boolean add(E elem);

    @StateRefinement(from="size(this) > 0", to="size(this) == size(old(this)) - 1")
    public E remove();

    @Refinement("_ == size(this)")
    public int size();
}
```

And the companion usage looks like this:

```java
ArrayDeque<Integer> p = new ArrayDeque<>();
p.add(2);
p.remove();
p.offerFirst(6);
p.getLast();
```

This kind of example is helpful when you want to see how LiquidJava can describe the behavior of mutable collections beyond simple scalar predicates.
