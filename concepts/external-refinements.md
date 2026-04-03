---
title: External Refinements
parent: Concepts
nav_order: 4
---

# External Refinements

External refinements let you add refinements to an existing class that you cannot modify.

For this, the `@ExternalRefinementsFor` annotation is used to specify the qualified name of the class you want to refine in a separate interface. This makes it possible to refine external classes from the Java standard library, third-party dependencies, or shared APIs without modifying their source code.

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
socket.connect(new InetSocketAddress("example.com", 80)); // type error!
socket.close();
```

