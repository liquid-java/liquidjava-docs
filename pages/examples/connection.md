---
title: Connection
parent: Examples
nav_order: 8
permalink: /examples/connection/
description: A typestate protocol with a value-dependent conditional transition.
---

# Connection

This example models a small object protocol where the target state of `connect` depends on a boolean parameter. Because the transition is value-dependent, this protocol does not encode to a DFA based only on the current state and method call.

```java
import liquidjava.specification.*;

@StateSet({"disconnected", "guest", "authenticated"})
public class Connection {
    @StateRefinement(to="disconnected()")
    public Connection() {}

    @StateRefinement(from="disconnected()", to="hasToken ? authenticated() : guest()")
    public void connect(boolean hasToken) {}

    @StateRefinement(from="guest() && hasToken", to="authenticated()")
    public void authenticate(boolean hasToken) {}

    @StateRefinement(from="authenticated()")
    public void sendData() {}

    @StateRefinement(from="guest() || authenticated()", to="disconnected()")
    public void disconnect() {}
}
```

```java
Connection conn = new Connection();
conn.connect(true);
conn.sendData();
conn.disconnect();
```

```java
Connection conn = new Connection();
conn.connect(false);
conn.sendData(); // State Refinement Error
```

LiquidJava enforces the intended protocol:

- The `connect` method can be called from `disconnected()`, and the target state depends on the value of `hasToken`
- The `authenticate` method can only be called from `guest()`, and only transitions to `authenticated()` if `hasToken` is true
- The `sendData` method can only be called from `authenticated()`
- The `disconnect` method can be called from either `guest()` or `authenticated()`, and always transitions back to `disconnected()`
