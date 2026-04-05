---
title: Order
parent: Examples
nav_order: 4
permalink: /examples/order/
description: A typestate protocol for a simple order processing system.
---

# Order

This example shows a more expressive protocol that combines typestates, ghost variables, and value-dependent conditions.

```java
import liquidjava.specification.*;

@StateSet({"ordering", "checkout", "finished"})
@Ghost("int total")
public class Order {
    @StateRefinement(to="ordering() && total() == 0")
    public Order() {}

    @StateRefinement(from="ordering()", to="ordering() && total() == total(old(this)) + price")
    @Refinement("_ == this")
    public Order addItem(String name, @Refinement("_ > 0") int price) {
        return this;
    }

    @StateRefinement(from="ordering() && total() > 0", to="checkout() && total() == total(old(this))")
    @Refinement("_ == this")
    public Order checkout() {
        return this;
    }

    @StateRefinement(from="checkout() && amount == total()", to="finished()")
    @Refinement("_ == this")
    public Order pay(@Refinement("_ > 0") int amount) {
        return this;
    }
}
```

```java
Order order = new Order();
order.addItem("shirt", 60)
     .addItem("shoes", 80)
     .checkout()
     .pay(140);
```

```java
Order order = new Order();
order.addItem("shirt", 60)
     .addItem("shoes", 80)
     .checkout()
     .pay(120); // State Refinement Error
```

This example enforces the intended protocol:
- Items can only be added in the `ordering` state, and the total is updated accordingly
- The `checkout` can only be called after at least one item has been added, and the total must remain the same
- The `pay` can only be called after checkout, and the amount must match the total order value
