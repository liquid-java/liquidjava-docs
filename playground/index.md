---
title: Playground
nav_order: 1.5
permalink: /playground/
has_toc: false
description: Try LiquidJava refinements and typestates directly in your browser.
---

# Playground

Edit an example and select **Verify** to check it with LiquidJava. Verification runs in your browser; your code is not sent to a server. The first check downloads the verifier and may take a moment.

<link rel="stylesheet" href="{{ '/playground/editor.css' | relative_url }}">
<div id="lj-playground" class="lj-playground" data-runtime="{{ '/playground/runtime/' | relative_url }}">
  <div class="lj-toolbar">
    <label for="lj-example">Example</label>
    <select id="lj-example">
      <option value="positive">Positive numbers</option>
      <option value="bounds">Parameter bounds</option>
      <option value="alias">Refinement aliases</option>
      <option value="state">Object states</option>
    </select>
    <button id="lj-verify" class="btn btn-primary" type="button" disabled>Verify</button>
    <button id="lj-stop" class="btn" type="button" disabled>Stop</button>
    <button id="lj-reset" class="btn" type="button">Reset example</button>
  </div>
  <div id="lj-editor"></div>
  <p id="lj-status" role="status" aria-live="polite">Choose an example or edit the code, then verify. Ctrl+Enter / ⌘+Enter also verifies.</p>
  <div id="lj-results" aria-label="Verification results"></div>
  <noscript>Enable JavaScript to use the playground.</noscript>
</div>

The playground checks one Java file using Java 8 syntax, with the bundled LiquidJava annotations and core Java types. External dependencies are not supported. For projects, use the [VS Code extension]({{ '/vscode-extension/' | relative_url }}).

<script type="module" src="{{ '/playground/runtime/editor.js' | relative_url }}"></script>
