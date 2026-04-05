---
title: Downloader
parent: Examples
nav_order: 5
permalink: /examples/downloader/
description: A typestate protocol for a downloader object.
---

# Downloader

This example models a simple downloader object that tracks the progress of a download operation by combining typestates and ghost variables.

```java
@Ghost("int progress")
@StateSet({"created", "downloading", "completed"})
public class Downloader {
    @StateRefinement(to="created(this) && progress(this) == 0")
    public Downloader() {}

    @StateRefinement(from="created(this) && progress(this) == 0", to="downloading(this) && progress(this) == 0")
    public void start() {}

    @StateRefinement(from="downloading(this)", to="downloading(this) && progress(this) == percentage")
    public void update(@Refinement("percentage > progress(this)") int percentage) {}

    @StateRefinement(from="downloading(this) && progress(this) == 100", to="completed(this)")
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
d.finish(); // type error!
```