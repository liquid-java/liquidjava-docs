---
title: Email
parent: Examples
nav_order: 3
permalink: /examples/email/
description: A typestate protocol for a Email builder API.
---

# Email

This example models a builder-style API where methods must be called in a specific order to create a valid `Email` object.

```java
import java.util.ArrayList;
import java.util.List;
import liquidjava.specification.*;

@StateSet({"empty", "senderSet", "receiverSet", "bodySet"})
public class Email {
    private String sender;
    private List<String> receiver;
    private String subject;
    private String body;

    @StateRefinement(to="empty()")
    public Email() {
        receiver = new ArrayList<>();
    }

    @StateRefinement(from="empty()", to="senderSet()")
    public void from(String s) {
        sender = s;
    }

    @StateRefinement(from="senderSet() || receiverSet()", to="receiverSet()")
    public void to(String s) {
        receiver.add(s);
    }

    @StateRefinement(from="receiverSet()", to="receiverSet()")
    public void subject(String s) {
        subject = s;
    }

    @StateRefinement(from="receiverSet()", to="bodySet()")
    public void body(String s) {
        body = s;
    }

    @StateRefinement(from="bodySet()", to="bodySet()")
    public String build() {
        StringBuilder sb = new StringBuilder();
        sb.append("From: " + sender + "\n");
        sb.append("To: " + String.join(", ", receiver) + "\n");
        sb.append("Subject: " + subject + "\n");
        sb.append("\n");
        sb.append(body);
        return sb.toString();
    }
}
```

```java
Email email = new Email();
email.from("me");
     .to("bob");
     .to("alice");
     .subject("greetings");
     .body("hello!");
     .build();
```

```java
Email email = new Email();
email.from("me");
     .to("bob");
     .build(); // type error!
```

LiquidJava enforces the intended protocol:

- The `from` must be set first
- The `to` must be set at least once before setting the `body`
- The `subject` is optional
- The `build` is only allowed to be set after the body
