---
title: Semaphore
parent: Examples
nav_order: 9
permalink: /examples/semaphore/
description: An external typestate refinement for a simple semaphore protocol.
---

# Semaphore

This example refines `java.util.concurrent.Semaphore` with a simple two-state protocol that models a binary semaphore being acquired and released.

```java
import liquidjava.specification.*;

@ExternalRefinementsFor("java.util.concurrent.Semaphore")
@StateSet({"available", "acquired"})
public interface SemaphoreRefinements {
    @StateRefinement(to="available()")
    public void Semaphore(@Refinement("_ == 1") int permits);

    @StateRefinement(from="available()", to="acquired()")
    public void acquire();

    @StateRefinement(from="acquired()", to="available()")
    public void release();
}
```

```java
Semaphore semaphore = new Semaphore(1);
semaphore.acquire();
semaphore.release();
semaphore.release(); // State Refinement Error
```

The external refinement enforces the expected protocol: `acquire()` is only allowed when the semaphore is `available()`, and `release()` is only allowed when it is `acquired()`.

{: .note }
This specification models a binary semaphore with one permit. It does not account for semaphores with multiple permits or concurrent access across multiple threads.
