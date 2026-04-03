---
title: VS Code Extension
nav_order: 6
description: Install the LiquidJava VS Code extension for live verification, syntax highlighting, and protocol visualizations.
---

# VS Code Extension

The VS Code extension is the smoothest way to work with LiquidJava day to day.

## What It Adds

- real-time verification diagnostics
- syntax highlighting for refinement annotations
- richer diagnostic details in a webview
- state-machine visualizations for protocol-oriented specifications

## Install

- Install [LiquidJava on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=AlcidesFonseca.liquid-java) or [Open VSX](https://open-vsx.org/extension/AlcidesFonseca/liquid-java).
- Install [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java).
- Open a Java project that includes the `liquidjava-api` dependency.

## Example Dependency

```xml
<dependency>
    <groupId>io.github.liquid-java</groupId>
    <artifactId>liquidjava-api</artifactId>
    <version>{{ site.liquidjava_api_version }}</version>
</dependency>
```

## Best Way to Try It

The [examples repository]({{ site.liquidjava_examples_url }}) is set up for experimentation and can be opened directly in [GitHub Codespaces]({{ site.liquidjava_examples_codespaces_url }}).

## Source

- [Extension source repository](https://github.com/liquid-java/vscode-liquidjava)
- [Main LiquidJava repository]({{ site.liquidjava_repo_url }})

{: .tip }
If you want to understand the annotation language before installing tooling, start with [Refinements]({{ '/reference/refinements/' | relative_url }}).
