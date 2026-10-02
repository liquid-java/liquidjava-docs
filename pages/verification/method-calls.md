---
title: Method Calls and Returns
parent: Verification Features
nav_order: 1
permalink: /verification/method-calls/
description: Learn how parameter and return refinements connect a method's implementation to its callers.
---

# Method Calls and Returns

A method contract has two sides:

- **Parameters:** callers must establish each parameter's refinement. The method body can assume those refinements.
- **Return value:** each return must satisfy the method's declared refinement. Callers can use that refinement for the result.

```java
import liquidjava.specification.Refinement;

public class MethodExample {
    @Refinement("_ == value")
    public static int positiveIdentity(
            @Refinement("value > 0") int value) {
        return value;
    }

    public static void example() {
        @Refinement("_ == 3") int result = positiveIdentity(3);
        positiveIdentity(0); // Refinement Error: 0 is not positive
    }
}
```

For `positiveIdentity(3)`, the verifier checks `3 > 0`. It then substitutes the argument into the return contract `_ == value`, so the result is known to equal `3`. The call with `0` fails the parameter check.

The body is checked separately using its parameter contract. Returning a value that contradicts its return contract also produces an error:

```java
import liquidjava.specification.Refinement;

public class ReturnExample {
    @Refinement("_ > 0")
    public static int positive() {
        return 0; // Refinement Error: 0 is not positive
    }
}
```

Write the return properties callers need explicitly. For example, without a return refinement on `positiveIdentity`, callers should not rely on the verifier inspecting its body to discover that the result equals the argument.

## Object State at a Call

For a method with [state refinements]({{ '/annotations/state-refinement/' | relative_url }}), the verifier also checks that the receiver satisfies `from` before the call and uses `to` to describe its state afterward. A constructor's `to` establishes the initial state. This is how a protocol can reject a `read()` call after `close()`.

For library methods whose source is outside the checked code, use [external refinements]({{ '/annotations/external-refinements-for/' | relative_url }}) to supply contracts. Those contracts describe the library behavior the verifier relies on; they do not verify the library's implementation.
