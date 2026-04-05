---
title: Syntax Highlighting for Refinements
parent: VS Code Extension
nav_order: 2
permalink: /vscode-extension/syntax-highlighting/
description: Learn about syntax highlighting for refinements in the VS Code extension.
---

# Syntax Highlighting for Refinements

LiquidJava refinements are written inside Java string literals, which makes them easy to confuse with ordinary strings if the editor treats them as plain text.

The extension implements refinement syntax highlighting which tokenizes the refinement language inside LiquidJava annotations and allows VS Code color those tokens according to the active theme. To make refinements visually distinct from regular Java code, the highlighted refinement text is also rendered in italic.

![Syntax Highlighting]({{ 'assets/vscode-extension/syntax-highlighting.gif' | relative_url }})
