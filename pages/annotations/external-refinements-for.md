---
title: "@ExternalRefinementsFor"
parent: Annotations
nav_order: 4
permalink: /annotations/external-refinements-for/
description: Learn how to refine external libraries that cannot be annotated directly.
---

# @ExternalRefinementsFor

External refinements let you add refinements to existing classes and interfaces that you cannot directly annotate, such as ones from the Java standard library, third-party dependencies, or shared APIs, without actually modifying their source code.
For this, the `@ExternalRefinementsFor` annotation is used to specify the qualified name of the class or interface you want to refine in a separate interface.

```java
import liquidjava.specification.*;
import java.net.*;

@ExternalRefinementsFor("java.net.Socket")
@StateSet({"unconnected", "bound", "connected", "closed"})
public interface SocketRefinements {
    @StateRefinement(to="unconnected()")
    public void Socket();

    @StateRefinement(from="unconnected()", to="bound()")
    public void bind(SocketAddress add);

    @StateRefinement(from="bound()", to="connected()")
    public void connect(SocketAddress add);

    @StateRefinement(from="connected()")
    public void sendUrgentData(int n);

    @StateRefinement(from="!closed()", to="closed()")
    public void close();
}
```

```java
Socket socket = new Socket();
socket.connect(new InetSocketAddress("example.com", 80)); // State Refinement Error
socket.close();
```
