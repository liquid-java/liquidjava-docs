---
title: State Refinements
parent: Concepts
nav_order: 3
permalink: /concepts/state-refinements/
---

# State Refinements

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
f.read(); // type error!
```

If a class follows an implicit protocol that can be described by a DFA, the protocol can be encoded in LiquidJava so that methods are enforced to be called in the correct order.

## Syntax

Note that states are functions. These take a single parameter, which is the object being refined, in this case the implicit `this`. All of these are equivalent: `open()`, `this.open()`, and `open(this)`.

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

If no `to` transition is declared, LiquidJava defaults the constructor to the first state listed in the corresponding `@StateSet`.

Constructors must always be present for typestate checking to work correctly, because they are the point where the initial state values are assigned. Otherwise, the initial values are not set and the verifier won't be able to track the state of the object across method calls, which can lead to unexpected type errors.

When refining interfaces, which cannot have a constructor, LiquidJava still needs an initialization point. In those cases, the refinement interface must declare a method whose name matches the class we are refining. For example, an interface named `ArrayListRefinements` that is refining `java.util.ArrayList` should declare the method `public void ArrayList()`. This method plays the role of a constructor for the typestate system and ensures the initial values are set correctly.


## Multiple StateSets

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

Each state set is exclusive: at any moment, the object can only be in one state from that specific set. In the example above, the object cannot be both `open` and `closed`, and it cannot be both `clean` and `dirty`.

When using more than one state set, the states must be combined with `&&` in the `from` and `to` annotations, as shown in the example above. This is because the object must always be in exactly one state from each set, so we need to specify the full state of the object in the preconditions and postconditions.
