---
title: VS Code Extension
nav_order: 4
has_children: true
has_toc: false
permalink: /vscode-extension/
description: Use the LiquidJava VS Code extension for live diagnostics, syntax highlighting, and IDE feedback while editing Java code.
cards:
  - title: Real-Time Diagnostic Feedback
    url: /vscode-extension/real-time-diagnostic-feedback/
    description: Real-time diagnostic reporting directly in the editor as you code.
  - title: Syntax Highlighting for Refinements
    url: /vscode-extension/syntax-highlighting/
    description: Easily read and interpret refinement predicates with syntax highlighting.
  - title: Autocomplete for Refinements
    url: /vscode-extension/autocomplete/
    description: Context-aware auto-completion support for refinement predicates.
  - title: Webview
    url: /vscode-extension/webview/
    description: VS Code webview with interactive diagnostic explorer, context debugger, and state machine visualizer.
  - title: Status Bar Indicator
    url: /vscode-extension/status-bar-indicator/
    description: Indicator to show the current state of LiquidJava.
  - title: Commands
    url: /vscode-extension/commands/
    description: Commands provided by the extension for various interactions.
  - title: Output Channel
    url: /vscode-extension/output-channel/
    description: Output channel for LiquidJava logs.
---

# VS Code Extension

The LiquidJava VS Code extension integrates the verifier into the editor, with real-time diagnostic reporting, syntax highlighting and autocomplete for refinements, and more.  It is built as a VS Code client and a language server that communicate through the Language Server Protocol (LSP).

> To start using the extension, you can follow the setup guide [here]({{ 'getting-started/setup/#vs-code-extension' | relative_url }}).

{% include card_grid.html cards=page.cards %}
