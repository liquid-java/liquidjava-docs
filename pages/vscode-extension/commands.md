---
title: Commands
parent: VS Code Extension
nav_order: 6
permalink: /vscode-extension/commands/
---

# Commands

The LiquidJava VS Code extension provides commands to control the extension lifecycle and trigger verification manually. These commands make it possible to recover from startup issues, stop background activity, or rerun verification on demand.

## Command Palette

The extension adds a command that opens a palette listing the available LiquidJava commands. This command is executed when the status bar indicator is clicked, giving users a quick way to access extension actions from a single place.

## Available Commands

The following commands available are:

| Command | Description |
| --- | --- |
| `Start` | Starts the LiquidJava language server and client |
| `Stop` | Stops the LiquidJava language server and client |
| `Restart` | Stops and then starts the LiquidJava extension |
| `Verify` | Manually triggers verification |
| `Show Logs` | Opens the output channel with LiquidJava logs |
| `Show View` | Opens the LiquidJava webview |

![Commands Demo]({{ 'assets/vscode-extension/commands.gif' | relative_url }})