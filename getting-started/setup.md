---
title: Setup
parent: Getting Started
nav_order: 1
description: Set up the dependency, verifier, and VS Code extension to start using LiquidJava.
---

# Setup

## API Dependency

To use the LiquidJava annotations, add the `liquidjava-api` dependency to your Java project:

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

## VS Code Extension

### Requirements

- Visual Studio Code with the [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) extension
- A Java project with the `liquidjava-api` dependency

### Steps

- Install the [LiquidJava VS Code extension](https://marketplace.visualstudio.com/items?itemName=AlcidesFonseca.liquid-java)
- Open a Java project with the `liquidjava-api` dependency

The extension then provides real-time diagnostics, syntax highlighting for refinements, and more.

> You can find more about the extension [here]({{ '/vscode/' | relative_url }}).

## Command-Line Interface

If you prefer to run the verifier directly from the terminal, you can use the command-line interface.

### Requirements
- Java 20+
- Maven 3.6+
- A Java project with the `liquidjava-api` dependency

### Steps

```bash
git clone {{ site.liquidjava_repo_url }}
cd liquidjava
mvn clean install
./liquidjava /path/to/your/project
```

This runs the verifier on your project and prints any errors to the console.

> You can find more about the command-line interface [here]({{ '/cli/' | relative_url }}). 
