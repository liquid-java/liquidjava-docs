---
title: Warnings
parent: Diagnostics
nav_order: 2
permalink: /diagnostics/warnings/
description: Learn about the different verification warnings LiquidJava can report and what each one means.
---

# Warnings

Warnings do not affect the verification like errors, but they indicate that there is an issue that should probably be addressed.

| Warning | Meaning |
| --- | --- |
| `ExternalClassNotFoundWarning` | A class referenced by an external refinement cannot be found |
| `ExternalMethodNotFoundWarning` | A method referenced by an external refinement cannot be found in the target class |
| `CustomWarning` | Any other warning, such as reporting that Java compilation errors are present in the program |
