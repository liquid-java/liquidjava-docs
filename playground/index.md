---
title: Playground
nav_order: 8
permalink: /playground/
has_toc: false
description: Try LiquidJava refinements and typestates directly in your browser.
---

# Playground

Edit an example and select **Verify** to check it with LiquidJava. Verification runs in your browser; your code is not sent to a server. The first check downloads the verifier and may take a moment.

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
        </select>
      </div>
      <button id="lj-reset" type="button">Reset example</button>
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

The playground checks one Java file using Java 8 syntax, with the bundled LiquidJava annotations and core Java types. External dependencies are not supported. For projects, use the [VS Code extension]({{ '/vscode-extension/' | relative_url }}).

<script type="module" src="{{ '/playground/runtime/editor.js' | relative_url }}"></script>
