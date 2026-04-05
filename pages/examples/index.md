---
title: Examples
nav_order: 6  
has_children: true
permalink: /examples/
description: LiquidJava example usages with focused code snippets.
has_toc: false
cards:
  - title: Counter
    url: /examples/counter/
    description: A small refinement example for safely decrementing a counter without going below zero.
  - title: Media Player
    url: /examples/media-player/
    description: A typestate protocol for a simple media player with stopped, playing, and paused states.
  - title: Email
    url: /examples/email/
    description: A typestate protocol for a Email builder API.
  - title: Order
    url: /examples/order/
    description: A typestate protocol for a simple order processing system.
  - title: Downloader
    url: /examples/downloader/
    description: A typestate protocol for a downloader object.
  - title: ReentrantLock
    url: /examples/reentrant-lock/
    description: An external typestate refinement for java.util.concurrent.locks.ReentrantLock.
  - title: ArrayList
    url: /examples/arraylist/
    description: An external refinement for java.util.ArrayList that statically prevents out-of-bounds accesses.
---

# Examples

In this section you can explore various example usages of LiquidJava, with focused code snippets to illustrate specific features and use cases.

{% include card_grid.html cards=page.cards %}
