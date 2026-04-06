---
title: Pagination
parent: Examples
nav_order: 2
permalink: /examples/pagination/
description: Plain refinements with aliases for page numbers, page sizes, and computed offsets.
---

# Pagination

This example uses plain refinements and refinement aliases to describe common pagination rules. The aliases keep the contracts readable while still relating results to the input values.

```java
import liquidjava.specification.*;

@RefinementAlias("Page(int p) { p >= 1 }")
@RefinementAlias("PageSize(int s) { 1 <= s && s <= 100 }")
@RefinementAlias("ItemCount(int n) { n >= 0 }")
public class Pagination {
    @Refinement("ItemCount(_) && _ == (page - 1) * size")
    public static int offset(
        @Refinement("Page(_)") int page,
        @Refinement("PageSize(_)") int size
    ) {
        return (page - 1) * size;
    }

    @Refinement("Page(_) && _ == page + 1")
    public static int nextPage(@Refinement("Page(_)") int page) {
        return page + 1;
    }

    @Refinement("Page(_) && _ == (items + size - 1) / size")
    public static int totalPages(
        @Refinement("_ > 0") int items,
        @Refinement("PageSize(_)") int size
    ) {
        return (items + size - 1) / size;
    }
}
```

```java
int size = 20;
int page = 3;
int offset = Pagination.offset(page, size);
int next = Pagination.nextPage(page);
int total = Pagination.totalPages(50, size);
```

```java
Pagination.offset(0, 20); // Refinement Error
```

```java
Pagination.totalPages(50, 200); // Refinement Error
```

The aliases capture the key domain concepts for pagination:

- `Page` says page numbers start at `1`
- `PageSize` constrains the accepted page size range
- `ItemCount` marks non-negative counts such as offsets
