---
title: External Refinements
parent: Reference
nav_order: 5
---

# External Refinements

External refinements let you attach a LiquidJava model to an existing class that you do not own.

Use `@ExternalRefinementsFor` to describe the behavior of a library type in a separate interface. This lets you keep using the original library API in ordinary Java code while LiquidJava checks the extra specification in the background.

```java
import liquidjava.specification.*;

@ExternalRefinementsFor("java.net.Socket")
@StateSet({"unconnected, bound, connected, closed"})
public interface SocketRefinements {
    @StateRefinement(to = "unconnected(this)")
    public void Socket();

    @StateRefinement(from = "unconnected(this)", to = "bound(this)")
    public void bind(SocketAddress bindpoint);

    @StateRefinement(from = "bound(this)", to = "connected(this)")
    public void connect(SocketAddress endpoint);

    @StateRefinement(from = "!closed(this)", to = "closed(this)")
    public void close();
}
```

This pattern is useful when you want to verify protocols for standard-library classes, third-party dependencies, or shared APIs without modifying their source code.

The [Examples]({{ '/examples/' | relative_url }}) page links to runnable repositories that include this style of modeling.
