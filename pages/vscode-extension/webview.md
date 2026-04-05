---
title: Webview
parent: VS Code Extension
nav_order: 4
permalink: /vscode-extension/webview/
description: Delve into the VS Code webview with interactive diagnostic explorer, context debugger, and state machine visualizer.
---

# Webview

The extension includes a dedicated webview with three different panels: the **diagnostic explorer**, the **context debugger**, and the **state machine visualizer**.

## Diagnostic Explorer

The diagnostic explorer provides an interactive view over LiquidJava diagnostics, providing extra information.

Clicking a displayed value can expand it into its origin expression, and clicking a variable can jump to its location in the editor. This makes simplification traceable instead of showing only the final reduced expression.

![Diagnostic Explorer]({{ 'assets/vscode-extension/diagnostic-explorer.gif' | relative_url }})

## Context Debugger

The context debugger exposes the verification context based on the current cursor position. Its goal is to make the invisible environment behind a refinement more explicit, so developers can see which names and assumptions are in the verification context.

The context debugger displays:
- Refinement aliases (globally)
- Ghosts and states (by file)
- Variables (by file and scope)

![Context Debugger]({{ 'assets/vscode-extension/context-debugger.gif' | relative_url }})

### Cursor-Aware Behavior

The context debugger reacts to the current editor selection:

- With a single point cursor, it shows all variables in scope up to the cursor position
- With a selection, it shows all variables in scope within the selected range

This makes it easier to inspect the relevant context for a particular code region. 

### Variable Highlighting

Clicking a variable in the context debugger highlights that variable in the editor, which helps connect the displayed context with internal variables back to the ones in the source code.

### Failed Refinements

When a refinement or state refinement fails, the context debugger also shows the expected type in red after the turnstile (`⊢`). Hovering that expected type reveals the corresponding error message and clicking on it highlights the failure in the editor.

## State Machine Visualizer

State refinements encode object protocols, but those protocols can be difficult to understand when read only as annotations spread across methods. The state machine visualizer turns this information into a visual state machine, making it easier to understand the protocol with a DFA representation. The diagram updates in real time and is rendered using [Mermaid](https://mermaid.ai).

![State Machine Visualizer]({{ 'assets/vscode-extension/state-machine-visualizer.png' | relative_url }})
