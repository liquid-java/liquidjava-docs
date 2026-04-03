---
title: Installation
parent: Getting Started
nav_order: 2
---

# Installation

LiquidJava has two pieces in practice:

- the `liquidjava-api` annotations added to your Java project
- a verifier workflow, either through VS Code or through the command line

## Requirements

- Java 20+
- Maven 3.6+
- Visual Studio Code, if you want the extension workflow

## Add the Annotation API

Use the annotation dependency from Maven Central.

### Maven

```xml
<dependency>
    <groupId>io.github.liquid-java</groupId>
    <artifactId>liquidjava-api</artifactId>
    <version>0.0.4</version>
</dependency>
```

### Gradle

```groovy
repositories {
    mavenCentral()
}

dependencies {
    implementation 'io.github.liquid-java:liquidjava-api:0.0.4'
}
```

## Option 1: VS Code Extension

The easiest setup for most users is:

1. Install the [LiquidJava VS Code extension](https://marketplace.visualstudio.com/items?itemName=AlcidesFonseca.liquid-java).
2. Install [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java).
3. Open a Maven-based Java project that already includes `liquidjava-api`.

The extension then provides live diagnostics, syntax highlighting for refinements, and richer diagnostic views.

## Option 2: Build the Verifier Locally

If you want the command-line verifier directly:

```bash
git clone https://github.com/liquid-java/liquidjava.git
cd liquidjava
./mvnw clean install
```

If you prefer system Maven, `mvn clean install` works as well.

## Verify the Installation

- Open [Quickstart]({{ '/getting-started/quickstart/' | relative_url }}) and run the sample verifier command.
- Or open [Examples]({{ '/examples/' | relative_url }}) and try the example repository in Codespaces or locally.

{: .note }
The VS Code extension still expects the `liquidjava-api` dependency in the project being checked.
