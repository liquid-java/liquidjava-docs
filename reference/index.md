---
title: Reference
nav_order: 2
has_children: true
has_toc: false
permalink: /reference/
description: Browse the LiquidJava reference for refinements, aliases, state refinements, ghosts, and external refinements.
cards:
  - title: Refinements
    url: /reference/refinements/
    description: Learn about how to use refinements to specify constraints on variables, fields, parameters, and return values.
  - title: Refinement Aliases
    url: /reference/refinement-aliases/
    description: Learn how to reuse common refinement predicates with aliases to keep contracts shorter and easier to maintain.
  - title: State Refinements
    url: /reference/state-refinements/
    description: Learn how to model protocol-oriented object states and valid method transitions.
  - title: Ghosts
    url: /reference/ghosts/
    description: Learn how to track logical state that helps express and verify richer object invariants.
  - title: External Refinements
    url: /reference/external-refinements/
    description: Learn how to refine external libraries that cannot be annotated directly.
---

# LiquidJava Reference

LiquidJava extends Java with logical predicates and object protocol specifications. This section covers the core concepts and features of the LiquidJava type system.

{% include card_grid.html cards=page.cards %}
