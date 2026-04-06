---
title: Real-Time Diagnostic Feedback
parent: VS Code Extension
nav_order: 1
permalink: /vscode-extension/real-time-diagnostic-feedback/
description: Find out about real-time diagnostic reporting directly in the editor.
---

# Real-Time Diagnostic Feedback

The LiquidJava VS Code extension runs verification from inside the editor and reports problems directly in VS Code, keeping the verification feedback close to the code as you edit. When a document is opened or modified, the language server performs the LiquidJava verification and publishes the diagnostics back to the client.

![Diagnostic Feedback 1]({{ 'assets/images/diagnostic-feedback-1.gif' | relative_url }})