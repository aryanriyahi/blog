# 5. Modifying the landing page

This covers the pages visitors see first: the homepage, the About page, the
header/footer, and the global site name/description.

## Site name & description — `src/consts.ts`

This is the most important file to personalize. It's imported across the site:

```ts
export const SITE_TITLE = "Aryan's Blog";
export const SITE_DESCRIPTION =
    'A software engineer writing about the things I build and learn.';
```

- `SITE_TITLE` — shown in the browser tab, the header, the RSS feed, and the
  sitemap.
- `SITE_DESCRIPTION` — the homepage's meta description (for search engines and
  social previews).

Replace "Aryan" with whatever name/handle you want to display.

## Homepage — `src/pages/index.astro`

The homepage shows a short intro and a list of your 5 most recent posts.

### Change the intro text

Edit the `<h1>` and `<p>` inside `<main>` (around lines 23–28):

```astro
<h1>Hi, I'm Aryan 👋</h1>
<p>
    I'm a software engineer. This is where I write about the things I build
    and the things I learn. Here are my most recent posts — the full
    <a href="/blog">archive</a> has everything.
</p>
```

Rewrite this however you like — add links to your projects, social profiles,
etc.

### Change how many posts show

The list is built in the frontmatter (around lines 9–12):

```ts
const posts = (await getCollection('blog'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 5);   // ← change this number
```

Change `.slice(0, 5)` to `.slice(0, 10)` to show ten, or remove the
`.slice(0, 5)` entirely to show **all** posts on the homepage.

### Restyle the post list

The list styling is in the `<style>` block at the bottom of the file
(`.post-list`, `.post-list li`, `.post-list time`). Tweak paddings, borders,
or colors there.

## About page — `src/pages/about.astro`

A simple standalone page. Edit the `<h1>` and `<p>` content. Don't forget to
update the email:

```astro
<p>
    You can reach me at <a href="mailto:you@example.com">you@example.com</a>.
</p>
```

You could also write the About page **as a Markdown post** if you prefer — but a
dedicated `.astro` page keeps it out of the blog archive and RSS feed, which is
usually what you want.

## Header (nav) — `src/components/Header.astro`

The header shows the site title (linked to `/`) and nav links. To rename or
reorder links, edit the `.internal-links` block:

```astro
<div class="internal-links">
    <HeaderLink href="/">Home</HeaderLink>
    <HeaderLink href="/blog">Blog</HeaderLink>
    <HeaderLink href="/about">About</HeaderLink>
</div>
```

To add a social link (GitHub, Twitter/X, etc.), add an external `<HeaderLink>`:

```astro
<HeaderLink href="https://github.com/yourname" target="_blank" rel="noopener">GitHub</HeaderLink>
```

## Footer — `src/components/Footer.astro`

Currently:

```astro
<footer>
    &copy; {today.getFullYear()} Aryan. All rights reserved.
</footer>
```

Change "Aryan" to your name, or add links:

```astro
<footer>
    &copy; {today.getFullYear()} Aryan.
    <a href="/rss.xml">RSS</a> ·
    <a href="https://github.com/yourname">GitHub</a>
</footer>
```

## The blog archive — `src/pages/blog/index.astro`

This page lists **all** posts as a grid with cover images. You usually don't
need to edit it. If you want a simpler text-only list (matching the homepage
style), you can replace its `<section>` with the same `.post-list` markup used
on the homepage.

## SEO defaults — `src/components/BaseHead.astro`

Every page passes a `title` and `description` into `<BaseHead>`, which outputs
the `<title>`, meta description, Open Graph, and Twitter card tags. You rarely
edit this file. If you want a custom default social-share image, see the
`image` prop in `BaseHead.astro`.

---

Once your homepage and About page feel right, you're ready to deploy. Pick one:

- [Deploy to GitHub Pages →](./06-deploy-github-pages.md) (free, lives in your GitHub repo)
- [Deploy to Vercel →](./07-deploy-vercel.md)
- [Deploy to Netlify →](./08-deploy-netlify.md)
