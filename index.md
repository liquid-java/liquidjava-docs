---
title: LiquidJava Docs
layout: default
nav_exclude: true
has_toc: false
description: Start with installation, runnable examples, and reference material for LiquidJava.
cards:
  - title: VS Code Extension
    url: /tooling/vscode-extension/
    description: Use real-time diagnostics, syntax highlighting, and state-machine visualizations directly in the editor.
  - title: Command Line
    url: /tooling/cli/
    description: Run the verifier directly from the terminal for local checks, debugging, and CI workflows.
  - title: Reference
    url: /reference/
    description: Look up LiquidJava concepts, annotations, and protocol rules in a more formal, detailed format.
  - title: Examples
    url: /examples/
    description: Open runnable demo projects through Codespaces, dev containers, or a local Maven setup.
  - title: Resources
    url: /resources/
    description: Explore related research papers, poster material, and source repositories.
---

<div>
  <h1>Extending Java with Liquid Types</h1>
  <p>LiquidJava is an additional type system with liquid types for Java that allows expressing constraints that the program must follow to catch more bugs before executing the program.</p>

  <div class="home-actions">
    <a class="home-button primary" href="{{ '/getting-started/installation/' | relative_url }}">Install LiquidJava</a>
    <a class="home-button secondary" href="{{ '/getting-started/overview/' | relative_url }}">Learn More</a>
  </div>

  <div class="home-banner">
    <img src="{{ '/assets/images/banner.gif' | relative_url }}" alt="LiquidJava banner">
  </div>
</div>

{% include card_grid.html cards=page.cards %}
