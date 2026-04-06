---
title: Slice Range
parent: Examples
nav_order: 3
permalink: /examples/slice-range/
description: Plain refinements with aliases for valid index ranges and slice lengths.
---

# Slice Range

This example models a small utility for working with array slices. It uses plain refinements and aliases with multiple parameters to encode reusable range checks.

```java
import liquidjava.specification.*;

@RefinementAlias("Length(int n) { n >= 0 }")
@RefinementAlias("ValidIndex(int i, int size) { 0 <= i && i < size }")
@RefinementAlias("ValidRange(int start, int end, int size) { 0 <= start && start <= end && end <= size }")
public class SliceRange {
    @Refinement("Length(_) && _ == end - start")
    public static int sliceLength(
        @Refinement("Length(size)") int size,
        int start,
        @Refinement("ValidRange(start, end, size)") int end
    ) {
        return end - start;
    }

    @Refinement("ValidIndex(_, size)")
    public static int lastIndex(@Refinement("size > 0") int size) {
        return size - 1;
    }

    @Refinement("Length(_) && _ == index + 1")
    public static int prefixLength(
        @Refinement("Length(size)") int size,
        @Refinement("ValidIndex(index, size)") int index
    ) {
        return index + 1;
    }
}
```

```java
int size = 10;
int part = SliceRange.sliceLength(size, 2, 6);
int last = SliceRange.lastIndex(size);
int prefix = SliceRange.prefixLength(size, 4);
```

```java
SliceRange.sliceLength(10, 7, 3); // Refinement Error
```

```java
SliceRange.prefixLength(10, 10); // Refinement Error
```

The aliases capture the key domain concepts for working with slices:
- `Length` says lengths are non-negative
- `ValidIndex` says an index is valid if it is within the bounds of the size
- `ValidRange` says a range is valid if it starts and ends within the bounds of the size, and the start is not after the end
