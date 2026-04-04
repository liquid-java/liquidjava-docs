---
title: Syntax Highlighting for Refinements
parent: VS Code Extension
nav_order: 2
permalink: /vscode-extension/syntax-highlighting/
---

# Syntax Highlighting for Refinements

LiquidJava refinements are written inside Java string literals, which makes them easy to confuse with ordinary strings if the editor treats them as plain text. Syntax highlighting helps developers read and write these embedded specifications more confidently.

The extension implements refinement highlighting with an injection grammar. This grammar tokenizes the refinement language inside LiquidJava annotations and lets VS Code color those tokens according to the active theme.

To make refinements visually distinct from regular Java code, the highlighted refinement text is also rendered in italic. This helps separate the specification language from the surrounding Java syntax and reduces the chance of mentally mixing program code with refinement code.

![Syntax Highlighting Demo]({{ 'assets/vscode-extension/syntax-highlighting.gif' | relative_url }})