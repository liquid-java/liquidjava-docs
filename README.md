# LiquidJava Docs

Documentation website for LiquidJava, a refinement type checker for Java with support for liquid types and typestates.

The site is built with Jekyll and the `just-the-docs` theme.

## Run Locally

From the repository root:

```bash
bundle install
bundle exec jekyll serve
```

Then open `http://127.0.0.1:4000/docs/`.

To serve the site at the root path locally instead of `/docs`, run:

```bash
bundle exec jekyll serve --baseurl ""
```

## Build

```bash
bundle exec jekyll build
```

## Publishing

The site is configured as a GitHub Pages project site at `https://liquid-java.github.io/docs`.
