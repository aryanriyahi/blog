# 4. Modifying the layout

This guide covers the visual structure: the post page template, global styles,
colors, fonts, and the reusable components.

## The post page template — `src/layouts/BlogPost.astro`

This file controls how every blog post looks. It's an Astro component with two
parts:

- **Frontmatter (between `---`):** TypeScript that receives the post's data
  (`title`, `description`, `pubDate`, `updatedDate`, `heroImage`) via
  `Astro.props`.
- **Template (after `---`):** the HTML. Your Markdown content is injected where
  you see `<slot />`.

The layout renders, in order: `<Header />`, the hero image (if any), the title
+ date, an `<hr />`, then `<slot />` (your content), then `<Footer />`.

### Common tweaks

**Widen the reading column.** Posts are constrained to 720px. Find the
`.prose` rule (around line 32) and change `width`:

```css
.prose {
    width: 820px;   /* was 720px */
    max-width: calc(100% - 2em);
    margin: auto;
    padding: 1em;
    color: rgb(var(--gray-dark));
}
```

**Remove the horizontal rule under the title.** Delete or comment out the line
that says `<hr />` (around line 78).

**Hide the hero image area entirely** (if you never use cover images): delete
the `.hero-image` block (the lines with `{heroImage && ...}`).

**Change the date format.** The date is rendered by
`src/components/FormattedDate.astro`, which uses
`date.toLocaleDateString('en-us', { year: 'numeric', month: 'short', day: 'numeric' })`.
Edit that file to change the format or locale (e.g. `'en-gb'`).

## Global styles — `src/styles/global.css`

This single file styles the whole site. It defines **CSS custom properties
(variables)** in `:root` that everything else uses:

```css
:root {
    --accent: #2337ff;          /* link color, active nav, blockquote border */
    --accent-dark: #000d8a;
    --black: 15, 18, 25;        /* headings color (R,G,B — used via rgb()) */
    --gray: 96, 115, 159;       /* secondary text */
    --gray-light: 229, 233, 240;/* light backgrounds, borders */
    --gray-dark: 34, 41, 57;    /* body text color */
    --gray-gradient: rgba(var(--gray-light), 50%), #fff;
    --box-shadow: 0 2px 6px rgba(var(--gray), 25%), /* … */;
}
```

> Note the color variables come in two shapes: `--accent` is a normal hex
> color, while `--black` / `--gray*` are **raw R,G,B triplets** used as
> `rgb(var(--black))`. Keep that pattern when editing them.

### Change the accent (link) color

Edit `--accent` and `--accent-dark`:

```css
--accent: #0a7d5b;       /* e.g. a green */
--accent-dark: #064f3a;
```

### Change the base font size / line height

In the `body` rule:

```css
body {
    font-size: 18px;   /* was 20px */
    line-height: 1.6;  /* was 1.7 */
}
```

### Change the content width (non-post pages)

The `main` rule sets the column width for the homepage, About, and blog
archive:

```css
main {
    width: 720px;          /* change me */
    max-width: calc(100% - 2em);
    margin: auto;
    padding: 3em 1em;
}
```

### Style code blocks

Code blocks are styled with the `pre` / `code` rules near the bottom of
`global.css`. Shiki outputs highlighted code as inline-styled spans, so the
`pre` rule mostly controls padding + border radius. To add a dark background:

```css
pre {
    padding: 1.5em;
    border-radius: 8px;
    background: #1e1e2e;      /* dark background */
    overflow-x: auto;
}
```

To switch the syntax-highlighting *theme*, see Astro's
[Shiki config docs](https://docs.astro.build/en/guides/markdown-syntax-highlighting/).

## Fonts — `astro.config.mjs`

The site uses a local font ("Atkinson") bundled in `src/assets/fonts/`. It's
configured in `astro.config.mjs` under `fonts` and exposed as the CSS variable
`--font-atkinson` (used in `global.css`'s `body { font-family: var(--font-atkinson) }`).

**To use a system font instead** (simplest, no files to manage), open
`global.css` and change the body font-family:

```css
body {
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}
```

You can leave the font config in `astro.config.mjs` — it just won't be used.

**To use a Google Font**, see Astro's
[Fonts guide](https://docs.astro.build/en/guides/fonts/). The easiest path is
the `fontProviders.google()` provider in `astro.config.mjs`.

## Components — `src/components/`

| File | Role | When you'd edit it |
|------|------|--------------------|
| `Header.astro` | Top nav (site name + Home/Blog/About) | Add/rename nav links |
| `Footer.astro` | Bottom footer (copyright) | Change the name, add links |
| `BaseHead.astro` | `<head>` contents: meta tags, favicon, RSS link | Edit SEO defaults |
| `FormattedDate.astro` | Renders a `<time>` element | Change date format/locale |
| `HeaderLink.astro` | A nav `<a>` with active-state styling | Rarely |

### Add a new nav link

In `src/components/Header.astro`, add another `<HeaderLink>` inside
`.internal-links`:

```astro
<div class="internal-links">
    <HeaderLink href="/">Home</HeaderLink>
    <HeaderLink href="/blog">Blog</HeaderLink>
    <HeaderLink href="/about">About</HeaderLink>
    <HeaderLink href="https://github.com/yourname">GitHub</HeaderLink>
</div>
```

External links work too — `HeaderLink` just renders an `<a>`.

## Add a brand-new page

Drop a `.astro` file in `src/pages/`. The filename becomes the URL:

- `src/pages/uses.astro` → `/uses`
- `src/pages/projects/index.astro` → `/projects`

Use this structure as a starting point (every page needs `<BaseHead>`,
`<Header>`, `<Footer>`):

```astro
---
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
import Header from '../components/Header.astro';
import { SITE_TITLE } from '../consts';
---

<!doctype html>
<html lang="en">
    <head>
        <BaseHead title={`Page title — ${SITE_TITLE}`} description="..." />
    </head>
    <body>
        <Header />
        <main>
            <h1>Page title</h1>
            <p>Your content here.</p>
        </main>
        <Footer />
    </body>
</html>
```

Next: [Modifying the landing page →](./05-modifying-the-landing-page.md)
