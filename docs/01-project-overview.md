# 1. Project overview

This is an [Astro](https://astro.build) static-site blog. Astro takes your
Markdown posts + page templates and builds plain HTML/CSS/JS that you can host
anywhere for free. No database, no server, no backend to maintain.

## Folder structure

```
blog/
├── astro.config.mjs       ← Astro config (site URL, integrations, fonts)
├── package.json           ← dependencies + npm scripts
├── tsconfig.json          ← TypeScript config
├── public/                ← static files copied as-is (favicon, etc.)
└── src/
    ├── consts.ts          ← global data: site title & description
    ├── content.config.ts  ← defines the "blog" collection + post frontmatter rules
    ├── content/
    │   └── blog/          ← ✍️  YOUR POSTS LIVE HERE (one .md/.mdx file per post)
    ├── components/        ← reusable UI pieces
    │   ├── Header.astro       (top nav bar)
    │   ├── Footer.astro       (bottom footer)
    │   ├── BaseHead.astro     (SEO <meta> tags, used by every page)
    │   ├── FormattedDate.astro
    │   └── HeaderLink.astro   (a nav link with active-state styling)
    ├── layouts/
    │   └── BlogPost.astro ← the template each blog post is rendered with
    ├── pages/             ← each file here becomes a URL/route
    │   ├── index.astro        →  /            (homepage)
    │   ├── about.astro        →  /about
    │   └── blog/
    │       ├── index.astro        →  /blog     (post archive)
    │       └── [...slug].astro    →  /blog/<post>/  (one page per post)
    ├── rss.xml.js         →  /rss.xml  (RSS feed)
    └── styles/
        └── global.css     ← site-wide styling + color/spacing variables
```

## How a Markdown file becomes a web page

1. You write a post at `src/content/blog/my-post.md`.
2. Astro's **content collection** (`src/content.config.ts`) finds it, reads the
   frontmatter, and checks it against a schema — `title`, `description`, and
   `pubDate` are required.
3. `src/pages/blog/[...slug].astro` is a **dynamic route**. It loops over every
   post in the collection and generates one HTML page per post. The post's `id`
   (its filename) becomes the URL: `/blog/my-post/`.
4. Each generated page uses the `src/layouts/BlogPost.astro` layout for the
   header, title, date, and styling, then drops your Markdown content where it
   says `<slot />`.

So the mapping is simply:

```
src/content/blog/my-post.md   →   https://yoursite.com/blog/my-post/
src/content/blog/hello.md     →   https://yoursite.com/blog/hello/
```

You never edit `[...slug].astro` to add a post — just drop a file in
`src/content/blog/` and a page is created automatically.

## What's already set up for you

- ✅ Blog post pages (one URL per Markdown file)
- ✅ Post archive at `/blog`
- ✅ Homepage with recent posts
- ✅ About page at `/about`
- ✅ RSS feed at `/rss.xml`
- ✅ Sitemap at `/sitemap-index.xml`
- ✅ SEO meta tags (Open Graph, Twitter cards) on every page
- ✅ Markdown **and** MDX support
- ✅ Syntax-highlighted code blocks (Shiki)
- ✅ Responsive layout (works on mobile)

Next: [Running locally →](./02-running-locally.md)
