---
title: State Refinements
parent: Reference
nav_order: 3
---

# State Refinements

Beyond basic refinements, LiquidJava supports object state modeling through typestates. This lets you describe when a method can or cannot be called based on the state of the object.

## Example

```java
import liquidjava.specification.StateRefinement;
import liquidjava.specification.StateSet;

@StateSet({"open", "closed"})
public class MyFile {
    @StateRefinement(to = "open(this)")
    public MyFile() {}

    @StateRefinement(from = "open(this)", msg = "file must be open to read")
    public void read() {}

    @StateRefinement(from = "open(this)", to = "closed(this)", msg = "file must be open to close")
    public void close() {}
}

MyFile f = new MyFile();
f.read();
f.close();
f.read(); // type error: file must be open to read
```

This encodes a simple protocol:

- construction produces an open file
- `read` requires the file to be open
- `close` requires the file to be open and transitions it to closed

An illegal call sequence, such as reading after closing, becomes a verification error. As with refinements, you can provide custom error messages to make violations easier to diagnose.

## Why This Matters

Typestates are especially helpful for:

- files and sockets
- locks and synchronization primitives
- lifecycle-driven components
- APIs with strict call ordering rules

Continue with [Ghost Variables]({{ '/reference/ghost-variables/' | relative_url }}) and [External Refinements]({{ '/reference/external-refinements/' | relative_url }}) for protocols that need richer tracking.
