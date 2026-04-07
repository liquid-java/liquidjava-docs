---
title: Email
parent: Examples
nav_order: 4
permalink: /examples/email/
description: A typestate protocol for an Email builder API.
---

# Email

This example models a builder-style API where methods must be called in a specific order to create a valid `Email` object.

```java
import java.util.ArrayList;
import java.util.List;
import liquidjava.specification.*;

@StateSet({"empty", "senderSet", "receiverSet", "bodySet"})
public class Email {

    @StateRefinement(to="empty()")
    public Email() {}

    @StateRefinement(from="empty()", to="senderSet()")
    public Email from(String s) {}

    @StateRefinement(from="senderSet() || receiverSet()", to="receiverSet()")
    public Email to(String s) {}

    @StateRefinement(from="receiverSet()")
    public Email subject(String s) {}

    @StateRefinement(from="receiverSet()", to="bodySet()")
    public Email body(String s) {}

    @StateRefinement(from="bodySet()")
    public Email build() {}
}
```

```java
Email email = new Email();
email.from("me")
     .to("bob")
     .to("alice")
     .subject("greetings")
     .body("hello!")
     .build();
```

```java
Email email = new Email();
email.from("me")
     .to("bob")
     .build(); // State Refinement Error
```

LiquidJava enforces the intended protocol:

- The `from` must be set first
- The `to` must be set at least once before setting the `body`
- The `subject` is optional, but if used it must be set before the `body`
- The `build` method can only be called after the body is set
