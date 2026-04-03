---
title: VS Code Extension
parent: Tooling
nav_order: 1
---

# VS Code Extension

The VS Code extension is the smoothest way to work with LiquidJava day to day.

## What It Adds

- real-time verification diagnostics
- syntax highlighting for refinement annotations
- richer diagnostic details in a webview
- state-machine visualizations for protocol-oriented specifications

## Install

1. Install [LiquidJava on the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=AlcidesFonseca.liquid-java) or [Open VSX](https://open-vsx.org/extension/AlcidesFonseca/liquid-java).
2. Install [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java).
3. Open a Java project that includes the `liquidjava-api` dependency.

## Example Dependency

```xml
<dependency>
    <groupId>io.github.liquid-java</groupId>
    <artifactId>liquidjava-api</artifactId>
    <version>0.0.4</version>
</dependency>
```

## Best Way to Try It

The [examples repository](https://github.com/liquid-java/liquidjava-examples) is set up for experimentation and can be opened directly in [GitHub Codespaces](https://codespaces.new/liquid-java/liquidjava-examples).

## Source

- [Extension source repository](https://github.com/liquid-java/vscode-liquidjava)
- [Main LiquidJava repository](https://github.com/liquid-java/liquidjava)

{: .tip }
If you want to understand the annotation language before installing tooling, start with [Refinements]({{ '/reference/refinements/' | relative_url }}).
