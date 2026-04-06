---
title: Diagnostic Explorer
parent: Webview
nav_order: 1
permalink: /vscode-extension/webview/diagnostic-explorer/
description: Explore how you can use the diagnostic explorer to understand failures interactively.
---

# Diagnostic Explorer

The diagnostic explorer provides an interactive view of LiquidJava diagnostics with extra information not available in the [command-line interface]({{ '/command-line-interface/' | relative_url }}).

For refinement errors, LiquidJava performs expression simplification with traceable simplification steps. This makes it possible to progressively expand simplifications. Clicking a value can expand it into its origin expression, and clicking a variable can jump to its location in the editor. This makes simplification traceable instead of showing only the final reduced expression.

![Diagnostic Explorer]({{ 'assets/images/diagnostic-explorer.gif' | relative_url }})

In refinement and state refinement errors, an expandable section displays the context variables (also called translation table). This table maps the internal variable names created during the typechecking to the original source code variables and placement in the code. When clicked, each entry highlights the corresponding part of the source code that corresponds to that variable.