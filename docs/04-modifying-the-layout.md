# 4. Modifying the layout

This guide covers the visual structure: the post page template, global
styles/theme, fonts, and the reusable components. Styling is done with
**Tailwind CSS v4** utility classes (applied directly in the `.astro`
templates), plus a handful of CSS custom properties for theming.

## The post page — `src/layouts/BlogPost.astro`

This layout renders every blog post. It's an Astro component with two parts:

- **Frontmatter (between `---`):** TypeScript that receives the post's data
  (`title`, `description`, `pubDate`, `updatedDate`, `tags`, `headings`) via
  `Astro.props`, and builds a table of contents from the `h2`/`h3` headings.
- **Template (after `---`):** the HTML. Your Markdown content is injected into
  a `<div class="prose prose-lg max-w-none">` where you see `<slot />` — the
  `prose` class is what styles rendered Markdown.

The layout shows: a centered title + published/updated dates + tag pills,
then the content, then a **sticky table of contents** sidebar on wide screens
(hidden on mobile). It also wires up the scroll-spy and code-copy button
scripts at the bottom.

### Common tweaks

**Change the content column / prose styling.** Rendered Markdown is styled by
Tailwind's typography plugin through the `.prose` rules in
`src/styles/global.css` (colors via `--tw-prose-*` variables). Spacing, font
sizes, and link behavior live there.

**Hide the table of contents.** In `BlogPost.astro`, remove (or comment)
`{tocHeadings.length > 0 && ( … )}` — or simply don't add `##` headings to a
post, and the ToC won't render.

**Change the date format.** Dates use
`pubDate.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })`
(and a locale-aware format for the archive/tags). Edit those calls in
`BlogPost.astro`, `[...lang]/archive.astro`, and `[...lang]/tags/[tag].astro`.

## Global styles & theme — `src/styles/global.css`

`global.css` is the single entry file that imports Tailwind and defines the
**theme tokens** — CSS custom properties that everything uses, toggled by
`data-theme` on `<html>`:

```css
/* Dark (default) */
:root, :root[data-theme="dark"] {
    --bg-color: #161a28;
    --accent:   #4a90e2;
    --light:    #6bb0f5;
    --text-color: #c5cee0;
    --heading-color: #f0f4ff;
    --code-bg:  #0d1117;
    /* …borders, muted text, hover tints… */
}

/* Light */
:root[data-theme="light"] {
    --bg-color: #f7f8fb;
    --accent:   #1d4ed8;
    /* … */
}
```

These tokens are **bridged into Tailwind** so you can use e.g. `bg-bg`,
`text-accent`, `border-border`, `text-muted`, `text-heading` anywhere:

```css
@theme inline {
    --color-bg: var(--bg-color);     /* → bg-bg  */
    --color-accent: var(--accent);   /* → text-accent  */
    --color-text: var(--text-color); /* → text-text    */
}
```

When you change a hex value in `:root`, **every Tailwind utility and the
prose content update automatically** — in both light and dark mode.

### Change the dark / light colors

Edit the hex values in the `:root[data-theme="dark"]` and
`:root[data-theme="light"]` blocks. Keep the same variable names.

### Change the site width / content padding

Edit `--site-width` and `--content-padding` in the shared `:root` block
(used by the `w-[var(--site-width)]` classes on the header/main/footer).

## Fonts — self-hosted in `public/fonts/`

The site ships two self-hosted variable fonts (no external requests):

- **Source Sans 3** (Latin) — `public/fonts/source-sans-3/`
- **Vazirmatn** (Persian/Arabic) — `public/fonts/vazirmatn/`

They're declared with `@font-face` and a `unicode-range` in `global.css`, so
Latin text uses Source Sans 3 and Persian text automatically uses Vazirmatn.
The stacks live in `--font-family-body` / `--font-family-heading`.

To swap a font: replace the `.woff2` files (keeping the same names) and update
its `@font-face` `family` + `url`. To add a Google Font, see Astro's
[Fonts guide](https://docs.astro.build/en/guides/fonts/).

## Components — `src/components/`

| File | Role | When you'd edit it |
|------|------|--------------------|
| `Header.astro` | Top nav + language & theme switchers | Add/rename nav links, edit the logo |
| `Footer.astro` | Footer line (copyright + tagline) | Change the name/tagline |
| `Profile.astro` | Author card on the homepage sidebar | Edit avatar, socials, bio |
| `BaseHead.astro` | `<head>`: meta tags, RSS links, no-flicker theme script | Edit SEO defaults |
| `BaseLayout.astro` | The HTML shell (body, main, footer, back-to-top) | Change layout scaffolding |

### Add a new nav link

In `src/components/Header.astro`, inside the links row, add another `<a>` using
`getRelativeLocaleUrl` so it works in both languages:

```astro
<a href={getRelativeLocaleUrl(lang, 'contact')} class="text-[0.95rem] font-medium text-light hover:text-heading">
    {t('nav.contact')}
</a>
```

(You'll also add a `'nav.contact'` string to both `fa` and `en` in
`src/i18n/ui.ts`, and create the page under `src/pages/[...lang]/`.)

## Language & theme switchers

The header includes a **dark/light toggle** and a **language switcher**
(`FA` / `EN`). Their behavior/scripts live in `Header.astro` and
`BaseHead.astro`; the toggle works by setting `data-theme` on `<html>` and
persisting to `localStorage`.

## RTL (right-to-left) note

Because the site supports Persian, layout classes use **logical** Tailwind
utilities (`ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `border-s-*`) so
everything mirrors automatically when `dir="rtl"` is set on `<html>` for
Persian. When you write new markup, prefer logical utilities over physical
ones (`left-*`/`right-*`/`text-left`) so RTL keeps working.

Next: [Modifying the landing page →](./05-modifying-the-landing-page.md)
