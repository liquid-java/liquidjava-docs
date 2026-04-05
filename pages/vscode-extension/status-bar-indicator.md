---
title: Status Bar Indicator
parent: VS Code Extension
nav_order: 5
permalink: /vscode-extension/status-bar-indicator/
description: Check out the indicator that shows the current state of LiquidJava.
---

# Status Bar Indicator

The extension displays an indicator in the status bar in the bottom-left of the editor that shows the current LiquidJava state inside VS Code, with four possible states:

| Status | Description |
| --- | --- |
| `loading` | The verification is in progress |
| `passed` | The verification succeeded |
| `failed` | The verification failed with one or more errors |
| `stopped` | The extension was stopped, failed to connect, or lost connection with the language server |

Clicking on this indicator shows the available LiquidJava commands, which is covered in the next section.

![Status Bar Indicator]({{ 'assets/vscode-extension/status-bar-indicator.gif' | relative_url }})
