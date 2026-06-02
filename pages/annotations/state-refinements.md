---
title: "@StateRefinement"
parent: Annotations
nav_order: 3
permalink: /annotations/state-refinement/
description: Learn how to model protocol-oriented object states and valid method transitions.
---

# @StateRefinement

Beyond basic refinements, LiquidJava supports object state modeling through typestates. This lets you describe when a method can or cannot be called based on the state of the object.

The possible states of a class are declared with `@StateSet`, and the state transitions are described with `@StateRefinement(from="...", to="...")`.
- The `from` describes the **precondition** - the object state in which the method can be invoked
- The `to` describes the **postcondition** - the state the object will have after the method is called

```java
import liquidjava.specification.*;

@StateSet({"open", "closed"})
public class File {
    @StateRefinement(to="open()")
    public File() {}

    @StateRefinement(from="open()")
    public void read() {}

    @StateRefinement(from="open()", to="closed()")
    public void close() {}
}
```

```java
File f = new File();
f.read();
f.close();
f.read(); // State Refinement Error
```

If a class follows an implicit protocol that can be described by a DFA, the protocol can be encoded in LiquidJava so that methods are enforced to be called in the correct order.

{: .note }
States are functions. These take a single parameter, which is the object being refined, in this case the implicit `this` receiver. All of these are equivalent: `open(this)`, `this.open()`, and `open()`.

## State Initialization

Constructors can only declare a `to` transition, since they are responsible for establishing the initial state of the object.

```java
import liquidjava.specification.*;

@StateSet({"new", "ready"})
public class Buffer {
    @StateRefinement(to="ready()")
    public Buffer() {}
}
```

If no `to` transition is declared, LiquidJava defaults the constructor to the first state of each state set.
When refining interfaces, which cannot have constructors, a method whose name matches the target class or interface can be used to play the role of a constructor. For example, an interface named `ArrayListRefinements` that is refining the class `java.util.ArrayList` can declare the method `public void ArrayList()` for setting the initial state.

## Multiple State Sets

Classes can declare more than one `@StateSet` annotation. This is useful when the object has independent, orthogonal dimensions of state.

```java
import liquidjava.specification.*;

@StateSet({"open", "closed"})
@StateSet({"clean", "dirty"})
public class Device {
    @StateRefinement(to="open() && clean()")
    public Device() {}

    @StateRefinement(from="open() && clean()", to="open() && dirty()")
    public void use() {}

    @StateRefinement(from="open() && dirty()", to="open() && clean()")
    public void clean() {}

    @StateRefinement(from="open() && clean()", to="closed() && clean()")
    public void close() {}
}
```

Each state set is **mutually exclusive**: at any given moment, the object must be in exactly one state from each state set. To this end, in state transitions, the states must be combined with `&&` to specify the object's complete state. In the example above, the object cannot be both `open` and `closed`, and it cannot be both `clean` and `dirty`.
