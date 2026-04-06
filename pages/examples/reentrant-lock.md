---
title: ReentrantLock
parent: Examples
nav_order: 7
permalink: /examples/reentrant-lock/
description: An external typestate refinement for ReentrantLock.
---

# ReentrantLock

This example refines the `java.util.concurrent.locks.ReentrantLock` standard-library synchronization primitive with a two-state protocol that ensures locks are properly acquired and released. 

```java
import liquidjava.specification.*;

@ExternalRefinementsFor("java.util.concurrent.locks.ReentrantLock")
@StateSet({"unlocked", "locked"})
public interface ReentrantLockRefinements {
    @StateRefinement(to="unlocked()")
    public void ReentrantLock();

    @StateRefinement(from="unlocked()", to="locked()")
    public void lock();

    @StateRefinement(from="locked()", to="unlocked()")
    public void unlock();
}
```

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
lock.unlock();
lock.unlock(); // State Refinement Error
```

The external refinement enforces the expected protocol: `lock()` is only allowed when the object is `unlocked()`, and `unlock()` is only allowed when it is `locked()`.

{: .note }
This refinement models lock state for a single thread only. It does not account for concurrent access across multiple threads, so the protocol should be understood as valid only in single-threaded usage.
