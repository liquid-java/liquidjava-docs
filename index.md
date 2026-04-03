---
title: LiquidJava Docs
layout: default
nav_exclude: true
has_toc: false
description: Documentation for LiquidJava, a lightweight verification system for Java using liquid types.
cards:
  - title: Getting Started
    url: /getting-started/
    description: Learn the basics, set up your environment, and run your first LiquidJava verification.
  - title: Concepts
    url: /concepts/
    description: Look up LiquidJava concepts, annotations, and protocol rules in a more formal, detailed format.
  - title: VS Code Extension
    url: /vscode/
    description: Find out about real-time diagnostics, syntax highlighting, and more in the editor.
  - title: Command Line
    url: /cli/
    description: Run the verifier directly from the terminal for local checks, debugging, and CI workflows.
  - title: Examples
    url: /examples/
    description: Explore focused code snippets that demonstrate how to use LiquidJava.
  - title: Resources
    url: /resources/
    description: Find related research papers, poster material, and source repositories.
---

<div>
  <h1>Extending Java with Liquid Types</h1>
  <p>LiquidJava is an additional type system with liquid types for Java that allows expressing constraints that the program must follow to catch more bugs before executing the program.</p>

  <div class="home-banner">
    <img src="{{ '/assets/images/banner.gif' | relative_url }}" alt="LiquidJava banner">
  </div>
</div>

{% include card_grid.html cards=page.cards %}
