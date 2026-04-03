---
title: Installation
parent: Getting Started
nav_order: 2
description: Install the LiquidJava annotation API and choose between the VS Code extension or CLI verifier workflow.
---

# Installation

## Requirements

- Java 17 or newer
- Maven 3.6 or newer
- Visual Studio Code, if you want the extension workflow
- The `liquidjava-api` dependency in the Java project you want to verify

### Maven

```xml
<dependency>
    <groupId>io.github.liquid-java</groupId>
    <artifactId>liquidjava-api</artifactId>
    <version>{{ site.liquidjava_api_version }}</version>
</dependency>
```

### Gradle

```groovy
repositories {
    mavenCentral()
}

dependencies {
    implementation 'io.github.liquid-java:liquidjava-api:{{ site.liquidjava_api_version }}'
}
```

You can work use LiquidJava in two ways:

- Through the [VS Code extension]({{ '/tooling/vscode-extension/' | relative_url }})
- Through the [command-line interface]({{ '/tooling/cli/' | relative_url }})

## VS Code Extension

The easiest setup for most users is:

1. Install the [LiquidJava VS Code extension](https://marketplace.visualstudio.com/items?itemName=AlcidesFonseca.liquid-java)
2. Install [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)
3. Open a Java project with the `liquidjava-api` dependency

The extension then provides real-time diagnostics, syntax highlighting for refinements, and more.

You can find more about the extension [here]({{ '/tooling/vscode-extension/' | relative_url }}).

## Command Line Interface

If you want the command-line verifier directly:

```bash
git clone {{ site.liquidjava_repo_url }}
cd liquidjava
mvn clean install
./liquidjava /path/to/your/project
```

This runs the verifier on your project and prints any errors to the console.

You can find more about the command-line interface [here]({{ '/tooling/cli/' | relative_url }}).