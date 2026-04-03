---
title: State Refinements
parent: Tutorial
nav_order: 2
description: Learn typestate-style specifications with state sets, state refinements, and protocol exercises.
---

# State Refinements

This part introduces typestate-style specifications with `@StateSet` and `@StateRefinement`.

### Model a Protocol

Open [`src/main/java/com/tutorial/part2/LightBulb.java`]({{ site.liquidjava_tutorial_src_url }}/part2/LightBulb.java).

This object can only be in two states: `on` or `off`. The constructor sets the initial state through `@StateRefinement(to = "off(this)")`, and the methods `turnOn` and `turnOff` describe the legal transitions between states.

The key idea is:

- `from` describes the required incoming state
- `to` describes the resulting outgoing state

Because of that protocol, you cannot call the same transition twice in a row if the object is already in the target state.

The following DFA summarizes the behavior:

![Light Bulb DFA]({{ '/assets/images/tutorial/light_bulb_dfa.png' | relative_url }})

Uncomment line 22 in the tutorial file to observe the verification error.

### Exercise - Refine `MediaPlayer`

Open [`src/main/java/com/tutorial/part2/exercise/MediaPlayer.java`]({{ site.liquidjava_tutorial_src_url }}/part2/exercise/MediaPlayer.java).

Replace each `"true"` refinement with the correct protocol for the `stopped`, `playing`, and `paused` states.

In particular:

- `pause` should only be callable while the player is playing
- `stop` should only be callable when the player is not already stopped
- methods that are legal from multiple states can combine those states with `||`

The expected protocol is shown below:

![Media Player DFA]({{ '/assets/images/tutorial/media_player_dfa.png' | relative_url }})

#### Hints

- Follow each edge in the diagram carefully.
- Identify the source and target state for every method.
- Remember that state names are written with parentheses because they are functions.

With the correct implementation, LiquidJava should report an error on line 30 because the code attempts to resume playback from the stopped state.
