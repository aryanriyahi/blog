# 1. Project overview

This is an [Astro](https://astro.build) static-site blog, bilingual with
**Persian (fa)** as the default language and **English (en)** as secondary.
Astro takes your Markdown posts + page templates and builds plain
HTML/CSS/JS that you can host anywhere for free. No database, no server, no
backend to maintain.

The site is styled with **Tailwind CSS v4**. It supports **RTL** automatically
for Persian and has a built-in **dark / light theme toggle**.

## Folder structure

```
blog/
├── astro.config.mjs       ← Astro config (site URL, integrations, i18n, shiki)
├── wrangler.toml          ← Cloudflare Pages deploy config (optional)
├── public/                ← static files copied as-is (favicons, fonts)
└── src/
    ├── config.ts          ← global data: site title, author bio, socials
    ├── content.config.ts  ← defines the "blog" + "pages" collections & frontmatter rules
    ├── content/
    │   ├── blog/          ← ✍️  YOUR POSTS LIVE HERE
    │   │   ├── fa/            (Persian posts — default language)
    │   │   └── en/            (English posts)
    │   └── pages/         ← standalone pages (e.g. About), per language
    │       ├── fa/            (Persian about page)
    │       └── en/            (English about page)
    ├── components/        ← reusable UI pieces
    │   ├── Header.astro       (top nav + language & theme switchers)
    │   ├── Footer.astro       (bottom footer)
    │   ├── Profile.astro      (author card for the homepage sidebar)
    │   └── BaseHead.astro     (SEO <meta> tags + no-flicker theme script)
    ├── layouts/
    │   ├── BaseLayout.astro   (the HTML shell every page uses)
    │   └── BlogPost.astro     (post page: title, meta, tags, ToC, prose)
    ├── i18n/              ← translation config & helpers
    │   ├── ui.ts            (language labels / nav strings)
    │   └── utils.ts         (route helpers: current lang, translations)
    ├── pages/             ← each file here becomes a URL/route
    │   ├── 404.astro         →  /404
    │   └── [...lang]/        ← localized routes
    │       ├── index.astro      →  / (fa) and /en/
    │       ├── archive.astro    →  /archive and /en/archive
    │       ├── about.astro      →  /about and /en/about
    │       ├── tags/index.astro →  /tags and /en/tags
    │       ├── tags/[tag].astro →  /tags/<tag> and /en/tags/<tag>
    │       ├── blog/[...slug].astro → /blog/<post>/ and /en/blog/<post>/
    │       └── rss.xml.ts       →  /rss.xml and /en/rss.xml
    └── styles/
        └── global.css      ← Tailwind v4 entry + theme color tokens
```

## How a Markdown file becomes a web page

1. You write a post at `src/content/blog/fa/my-post.md` (or `en/`).
2. Astro's **content collection** (`src/content.config.ts`) finds it, reads the
   frontmatter, and checks it against a schema — `title`, `description`, and
   `pubDate` are required.
3. `src/pages/[...lang]/blog/[...slug].astro` is a **dynamic route**. It loops
   over every post in the collection and generates one HTML page per post. The
   post's `id` (its filename + language) becomes the URL: `/blog/my-post/` in
   Persian, `/en/blog/my-post/` in English.
4. Each generated page uses the `src/layouts/BlogPost.astro` layout for the
   header, title, date, tags, table of contents, and styling, then drops your
   Markdown content where it says `<slot />`.

So the mapping is simply:

```
src/content/blog/fa/my-post.md  →  https://yoursite.com/blog/my-post/
src/content/blog/en/my-post.md  →  https://yoursite.com/en/blog/my-post/
```

You never edit the slug route to add a post — just drop a file in
`src/content/blog/` and a page is created automatically.

## What's already set up for you

- ✅ Bilingual routing (Persian default `/`, English under `/en/`)
- ✅ Full **RTL** layout for Persian, **LTR** for English
- ✅ Dark / light **theme toggle** (persisted, no flash on load)
- ✅ Blog post pages (one URL per Markdown file, per language)
- ✅ Year-grouped **archive**, **tags** index + per-tag pages
- ✅ About page per language
- ✅ RSS feeds per language
- ✅ SEO meta tags (Open Graph, Twitter cards) on every page
- ✅ Markdown **and** MDX support
- ✅ Syntax-highlighted code blocks (Shiki, dark/light themes)
- ✅ Responsive layout (works on mobile)

Next: [Running locally →](./02-running-locally.md)
