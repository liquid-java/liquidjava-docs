---
title: Playground
nav_order: 8
permalink: /playground/
has_toc: false
description: Try LiquidJava refinements and typestates directly in your browser.
---

# Playground

Run the LiquidJava verification directly in your browser. Edit an example and select **Verify**.

<link rel="stylesheet" href="{{ '/playground/editor.css' | relative_url }}">
<div id="lj-playground" class="lj-playground" data-runtime="{{ '/playground/runtime/' | relative_url }}">
  <div class="lj-toolbar">
    <div class="lj-examples">
      <div class="lj-example-picker">
        <label for="lj-example">Example</label>
        <select id="lj-example">
          <option value="positive">Positive numbers</option>
          <option value="bounds">Parameter bounds</option>
          <option value="alias">Refinement aliases</option>
          <option value="state">Object states</option>
          <option value="ghost">Ghost state tracking</option>
        </select>
      </div>
      <button id="lj-reset" type="button">Reset</button>
    </div>
    <button id="lj-verify" type="button" disabled>Verify</button>
  </div>
  <div id="lj-editor"></div>
  <div class="lj-output" aria-label="Verification output" hidden>
    <p id="lj-status" role="status" aria-live="polite"></p>
    <div id="lj-results" aria-label="Verification results"></div>
  </div>
  <noscript>Enable JavaScript to use the playground.</noscript>
</div>

<script type="module" src="{{ '/playground/runtime/editor.js' | relative_url }}"></script>
