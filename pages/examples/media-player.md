---
title: Media Player
parent: Examples
nav_order: 2
permalink: /examples/media-player/
description: A typestate protocol for a simple media player.
---

# Media Player

This example models a small object protocol with three states and transitions that describe when playback actions are allowed.

```java
import liquidjava.specification.*;

@StateSet({"stopped", "playing", "paused"})
public class MediaPlayer {
    @StateRefinement(to="stopped()")
    public MediaPlayer() {}

    @StateRefinement(from="stopped()", to="playing()")
    public void play() {}

    @StateRefinement(from="playing()", to="paused()")
    public void pause() {}

    @StateRefinement(from="paused()", to="playing()")
    public void resume() {}

    @StateRefinement(from="!stopped()", to="stopped()")
    public void stop() {}
}
```

```java
MediaPlayer player = new MediaPlayer();
player.play();
player.pause();
player.resume();
player.stop();
player.resume(); // State Refinement Error
```

Because `resume` is only valid from `paused()`, the final call is rejected after `stop()` puts the object back in `stopped()`.
