---
title: Custom Messages
parent: Diagnostics
nav_order: 3
---

# Custom Messages

A custom message can be provided to any `@Refinement` or `@StateRefinement` annotation using the `msg` parameter. This message will be  included in the diagnostic when a violation of that annotation is reported, to provide a clearer explanation of the API rule that was violated.

```java
import liquidjava.specification.*;

@StateSet({"open", "closed"})
public class MyFile {
    @StateRefinement(to="open()")
    public MyFile() {}

    @StateRefinement(from="open()", msg="file must be open to read")
    public void read(@Refinement(value="_ > 0", msg="bytes must be greater than zero") int bytes) {}

    @StateRefinement(from="open()", to="closed()", msg="file must be open to close")
    public void close() {}
}
```

This is useful to explain the API rule in domain terms for users to quickly understand what went wrong.
