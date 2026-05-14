---
title: Command-Line Interface
nav_order: 5
permalink: /command-line-interface/
description: Run the LiquidJava verifier from the command line for local checks, debugging, and CI workflows.
---

# Command-Line Interface

The LiquidJava verifier can be run from the command line with the following options:

| Option | Description |
| --- | --- |
| `<...paths>` | Paths (files or directories) to be verified by LiquidJava |
| `-h`, `--help` | Show the help message with available options |
| `-v`, `--version` | Show the current version of the verifier |
| `-d`, `--debug` | Enable debug logging and skip expression simplification for troubleshooting |
| `-lsp`, `--language-server` | Enable language server mode for editor support |

> To start using the command-line interface, you can follow the setup guide [here]({{ 'getting-started/setup/#command-line-interface' | relative_url }}).