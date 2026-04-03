---
title: External Refinements
parent: Tutorial
nav_order: 3
description: Refine external classes and standard-library types with protocol annotations in the tutorial.
---

# External Refinements

This part shows how LiquidJava can refine classes you do not own, including standard-library types.

### Refine `Socket`

Open [`src/main/java/com/tutorial/part3/SocketRefinements.java`]({{ site.liquidjava_tutorial_src_url }}/part3/SocketRefinements.java).

The tutorial models the `Socket` class with the states `unconnected`, `bound`, `connected`, and `closed`. Each method is given a state transition so LiquidJava can reject incorrect call sequences.

For example, the model ensures that:

- `connect` can only happen after binding
- `close` cannot be called twice

Protocol summary:

![Socket DFA]({{ '/assets/images/tutorial/socket_dfa.png' | relative_url }})

Now open [`src/main/java/com/tutorial/part3/SocketExample.java`]({{ site.liquidjava_tutorial_src_url }}/part3/SocketExample.java). If you comment out the `bind` call on line 9, LiquidJava should reject the later `connect` call because the required protocol has not been satisfied.

### Exercise - Refine `ReentrantLock`

Open [`src/main/java/com/tutorial/part3/exercise/ReentrantLockRefinements.java`]({{ site.liquidjava_tutorial_src_url }}/part3/exercise/ReentrantLockRefinements.java).

Replace the `"true"` refinements so the lock follows this protocol:

- `lock` can only be called in the `unlocked` state
- `unlock` can only be called in the `locked` state

The DFA for that protocol is:

![ReentrantLock DFA]({{ '/assets/images/tutorial/reentrant_lock_dfa.png' | relative_url }})

With the correct implementation, LiquidJava should report an error on line 10 of [`src/main/java/com/tutorial/part3/exercise/ReentrantLockExample.java`]({{ site.liquidjava_tutorial_src_url }}/part3/exercise/ReentrantLockExample.java), where the code tries to unlock a lock that is not currently locked.
