---
title: Reference
nav_order: 2
has_children: true
has_toc: false
permalink: /reference/
description: Browse the LiquidJava reference for refinements, typestates, aliases, ghost variables, and external refinements.
cards:
  - title: Refinements
    url: /reference/refinements/
    description: Review refinement syntax, annotation forms, and the main rules used during verification.
  - title: Refinement Aliases
    url: /reference/refinement-aliases/
    description: Reuse common predicates with aliases to keep contracts shorter and easier to maintain.
  - title: Typestates
    url: /reference/typestates/
    description: Model protocol-oriented object states and valid method transitions.
  - title: Ghost Variables
    url: /reference/ghost-variables/
    description: Track logical state that helps express and verify richer object invariants.
  - title: External Refinements
    url: /reference/external-refinements/
    description: Attach contracts to code you cannot or do not want to annotate directly.
---

# LiquidJava Reference

LiquidJava extends Java with logical refinements and object protocol specifications. This section covers the core annotation model:

{% include card_grid.html cards=page.cards %}
