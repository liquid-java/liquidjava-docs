---
title: Status Bar Indicator
parent: VS Code Extension
nav_order: 5
permalink: /vscode-extension/status-bar-indicator/
---

# Status Bar Indicator

The extension displays an indicator in the status bar in the bottom-left of the editor that shows the current LiquidJava state inside VS Code, with four possible states:

| Status | Description |
| --- | --- |
| `loading` | The extension is starting up |
| `passed` | Verification succeeded |
| `failed` | Verification reported one or more errors |
| `stopped` | The extension was stopped, failed to connect, or lost connection with the language server |

Clicking on this indicator shows the available LiquidJava commands, which is covered in the next section.
