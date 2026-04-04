---
title: Concepts
nav_order: 2
has_children: true
has_toc: false
permalink: /concepts/
description: "Browse LiquidJava concepts: for refinements, aliases, state refinements, ghosts, and external refinements."
cards:
  - title: Refinements
    url: /concepts/refinements/
    description: Learn about how to use refinements to specify constraints on variables, fields, parameters, and return values.
  - title: Refinement Aliases
    url: /concepts/refinement-aliases/
    description: Learn how to reuse common refinement predicates with aliases to keep contracts shorter and easier to maintain.
  - title: State Refinements
    url: /concepts/state-refinements/
    description: Learn how to model protocol-oriented object states and valid method transitions.
  - title: External Refinements
    url: /concepts/external-refinements/
    description: Learn how to refine external libraries that cannot be annotated directly.
  - title: Ghosts
    url: /concepts/ghosts/
    description: Learn how to track logical state that helps express and verify richer object invariants.
---

# Concepts

LiquidJava extends Java with logical predicates and object protocol specifications. This section covers the core concepts and features of the LiquidJava type system.

{% include card_grid.html cards=page.cards %}
