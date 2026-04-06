---
title: Autocomplete for Refinements
parent: VS Code Extension
nav_order: 3
permalink: /vscode-extension/autocomplete/
description: Explore context-aware auto-completion support for refinement predicates.
---

# Autocomplete for Refinements

The VS Code extension provides context-aware autocomplete for LiquidJava refinements, using suggestions specific to the refinement language and the current context.

Autocomplete suggestions only appear when the cursor is inside a string literal that belongs to a LiquidJava annotation. These suggestions include variables in scope, fields, ghosts, states, aliases, and keywords like `this`, `old`, and `return`.

![Autocomplete]({{ 'assets/images/autocomplete.gif' | relative_url }})
