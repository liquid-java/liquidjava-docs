---
title: Downloader
parent: Examples
nav_order: 6
permalink: /examples/downloader/
description: A typestate protocol for a downloader object.
---

# Downloader

This example models a simple downloader object that tracks the progress of a download operation by combining typestates and ghost variables.

```java
import liquidjava.specification.*;

@RefinementAlias("Percentage(int p) { 0 <= p && p <= 100 }")
@Ghost("int progress")
@StateSet({"created", "downloading", "completed"})
public class Downloader {
    @StateRefinement(to="created() && progress() == 0")
    public Downloader() {}

    @StateRefinement(from="created() && progress() == 0", to="downloading() && progress() == 0")
    public void start() {}

    @StateRefinement(from="downloading() && percentage > progress()", to="downloading() && progress() == percentage")
    public void update(@Refinement("Percentage(_)") int percentage) {}

    @StateRefinement(from="downloading() && progress() == 100", to="completed()")
    public void finish() {}
}
```

```java
Downloader d = new Downloader();
d.start();
d.update(50);
d.update(100);
d.finish();
```

```java
Downloader d = new Downloader();
d.start();
d.update(50);
d.finish(); // State Refinement Error
```
