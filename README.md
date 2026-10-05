# LiquidJava Docs

Documentation website for LiquidJava, a refinement type checker for Java with support for liquid types and typestates.

**Live documentation:** [liquid-java.github.io/liquidjava-docs](https://liquid-java.github.io/liquidjava-docs/)

The site is built with Jekyll and the `just-the-docs` theme.

## Run Locally

From the repository root:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000/liquidjava-docs/`.

To serve the site at the root path locally instead of `/liquidjava-docs`, run:

```bash
bundle exec jekyll serve --baseurl ""
```

## Build

```bash
bundle exec jekyll build
```

## Publishing

The site is configured as a GitHub Pages project site at [https://liquid-java.github.io/liquidjava-docs/](https://liquid-java.github.io/liquidjava-docs/).

## Browser playground

The `/playground/` page runs LiquidJava in a browser worker with CheerpJ 4.3 and the official Z3 WebAssembly package. Code is checked locally. Stop terminates the worker, including a running solver, and the next check creates a fresh runtime.

Build the runtime before building Jekyll:

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run build:playground
npm run test:playground
bundle exec jekyll build
```

The build requires JDK 17, Python 3, Node.js, and access to Maven Central. It recompiles the published verifier and annotation API sources for Java 17 without changing them, packages their dependencies, and adds the docs-owned runner and Z3 loader. `scripts/playground/pom.xml` is the single source of truth for the Maven artifact versions; the Python build reads it directly, without requiring Maven. The verifier binary and sources always use the same version. The standard-library classpath includes the build JDK's `java.base`, `java.desktop`, `java.datatransfer`, and `java.xml` modules for the gallery's JDK protocols. Generated runtime files are ignored by Git and included in the Pages artifact.

After the configuration is merged into `main`, Dependabot checks the manifest daily and opens update PRs for the LiquidJava verifier and annotation API. Every pull request builds the playground, runs its tests, and builds Jekyll. Review upgrades with browser verification before merging, including successful and failing refinements and typestate transitions. Pages deployment runs only after a push to `main` or a manual workflow run.

The browser package also adapts Spoon 10.4.2's query initialization: when CheerpJ supplies an empty cast-exception stack trace, it selects Spoon's existing exotic-JVM query mode. The pinned source is downloaded and the adaptation checked during the build. This change is limited to the docs' generated dependency; the verifier repository and published sources remain unchanged.

For local testing, after building the runtime:

```bash
npm run serve:playground
```

Open `http://127.0.0.1:8770/playground/`. This uses a static server with HTTP range support, which CheerpJ needs when loading JARs. Ordinary `jekyll serve` does not supply the required range responses.

`playground/isolation.js` is a service worker scoped to `/playground/`. It adds the cross-origin isolation response headers Z3 requires on static hosting, including GitHub Pages. The first visit registers it and reloads once. Other docs pages are outside its scope. CheerpJ loads from its official CDN inside the verification worker; its runtime is not copied into this repository.

The playground checks a single Java file using Java 8 source syntax, bundled annotations and standard-library types from those four JDK modules. External dependencies and other Java modules are not available. Z3 4.16 runs behind the verifier's 4.8.17 Java API; browser integration tests must be repeated when updating either version. Unsupported native operations and unknown solver results fail explicitly instead of reporting success. The shared runtime is maintained in `liquidjava-docs`.

## Shared verifier for the tutorial and website

After `npm run build:playground`, run `node scripts/playground/export.mjs PATH_TO_SITE` to export the generated runtime, compact client, and isolation service worker. Consumers host these files on their own origin; Java code never goes to a verification service. The runtime is maintained here and rebuilt by each consumer’s deployment workflow.

The worker accepts `{ type: 'verify', files: { 'Example.java': source, ... } }`. Each request clears the previous Java files, so specifications cannot leak between examples. The runner returns structured `title` and `message` fields alongside the playground’s full diagnostics. The exported `BrowserVerifier` client exposes only the compact results, handles loading/timeouts/cancellation, and reuses the initialized worker for subsequent checks.

Call `prepareVerifier()` before mounting editable content: it prepares cross-origin isolation and performs the first-visit reload before edits are possible. Exported sites scope `isolation.js` to their site root; the docs playground keeps its own narrower scope. Runtime assets load on the first verification request.
