---
title: Diagnostic Explorer
parent: Webview
nav_order: 1
permalink: /vscode-extension/webview/diagnostic-explorer/
description: Explore how you can use the diagnostic explorer to understand failures interactively.
---

# Diagnostic Explorer

The diagnostic explorer provides an interactive view of LiquidJava diagnostics with extra information not available in the [command-line interface]({{ '/command-line-interface/' | relative_url }}).

Clicking a displayed value can expand it into its origin expression, and clicking a variable can jump to its location in the editor. This makes simplification traceable instead of showing only the final reduced expression.

![Diagnostic Explorer]({{ 'assets/images/diagnostic-explorer.gif' | relative_url }})
