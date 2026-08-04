# Aryan's Blog

A minimalist, fast, bilingual (Persian / English) blog built with **Astro**
and **Tailwind CSS v4**. Persian (Farsi) is the default language with full
**RTL** support; English is available under `/en/`.

- 🌐 Default **Persian (fa)** at `/`, **English (en)** at `/en/`
- 🌗 Dark / light theme toggle (persisted, no flash-of-wrong-theme)
- ↔️ Fully **RTL**-aware layout with logical CSS properties
- ✍️ MDX + Markdown, Shiki syntax highlighting (dual dark/light themes)
- 📖 Auto table of contents (scroll-spy), yearly archive, and tag pages
- ⚡ Zero client-side JS by default — most pages are static HTML

---

## ✨ Features

- **i18n with smart translation mapping** — posts in `fa/` and `en/` are
  linked with a shared `translationKey`; the header language switcher jumps
  straight to the translated post (or the target language's archive).
- **Dark / light theme** — a sun/moon toggle switches `data-theme` on
  `<html>`, driven by CSS custom properties. Light/dark choice is saved in
  `localStorage` and system preference is followed until you choose.
- **Self-hosted variable fonts** — Source Sans 3 (Latin) + Vazirmatn
  (Persian/Arabic) served locally, with `unicode-range` so each script uses
  the right font automatically.
- **Scroll-spy Table of Contents** — the blog post layout scans `h2`/`h3`
  headings and highlights the active section in a sticky sidebar.
- **Year-grouped archive** — posts are grouped by publication year.
- **Tag pages** — auto-generated `/tags` with a post-count grid.
- **One-click code copy** — a hover button over every code block.
- **Back-to-top button** — appears after you scroll.
- **Locale-aware 404 page** — localized error page with contextual actions.

---

## 🛠️ Tech stack

- [Astro](https://astro.build) v7 — content-focused static site generator
- [Tailwind CSS](https://tailwindcss.com) v4 — utility-first styling
  (`@tailwindcss/vite` + `@tailwindcss/typography`)
- MDX — import components & interactive structures in posts
- `astro-icon` — optimized SVG icons (Iconify MDI set)
- Shiki — code syntax highlighting with dark/light themes
- `@astrojs/rss` — RSS feeds for each locale

---

## 🚀 Quick start

Requires **Node.js ≥ 22.12.0**.

```bash
npm install
npm run dev        # http://localhost:4321
```

Build and preview:

```bash
npm run build      # → dist/
npm run preview
npx astro check    # type-check .astro files
```

---

## 📁 Project structure

```text
.
├── astro.config.mjs        # Astro config (site URL, integrations, i18n, shiki)
├── package.json            # deps + npm scripts
├── wrangler.toml           # Cloudflare Pages deploy config (optional)
├── public/                 # static assets copied as-is (fonts, icons)
│   └── fonts/              # self-hosted Source Sans 3 + Vazirmatn
└── src/
    ├── config.ts           # 👤 site title, author bio, social links
    ├── content.config.ts   # content-collection schemas (blog + pages)
    ├── components/         # Header, Footer, Profile, BaseHead
    ├── layouts/            # BaseLayout, BlogPost (with ToC / scroll-spy)
    ├── i18n/               # ui.ts (labels) + utils.ts (route helpers)
    ├── pages/              # file-based routes
    │   └── [...lang]/     # localized routes (home, archive, tags, about, blog)
    ├── styles/
    │   └── global.css      # 🌗 theme tokens + Tailwind v4 entry
    └── content/
        ├── blog/           # ✍️ posts: fa/ and en/ sub-folders
        │   ├── fa/         #   Persian posts (default)
        │   └── en/         #   English posts
        └── pages/          # about page: fa/ and en/
```

---

## ⚙️ Configuration

### Site identity — `src/config.ts`

Set the site title, author bio, avatar, and social links here:

```ts
export const SITE_CONFIG = {
  title: 'Aryan',
  description: 'Worth sharing.',
  url: 'https://your-domain.com',   // ← update before deploying
};

export const AUTHOR = {
  name: 'Aryan',
  role: { fa: 'نویسنده | توسعه‌دهنده', en: 'Writer | Developer' },
  bio:  { fa: '…', en: '…' },
};

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aryanriyahi', icon: 'mdi:github' },
];
```

Icons come from the [Iconify MDI set](https://icon-sets.iconify.design/mdi/).

### Site URL — `astro.config.mjs`

Set `site` to your real domain; it powers the RSS feed and canonical URLs:

```js
export default defineConfig({
  site: 'https://your-domain.com',
  // …
});
```

### Language labels — `src/i18n/ui.ts`

Edit nav/menu strings or add locales:

```ts
export const languages = { fa: 'فارسی', en: 'English' };
export const defaultLang = 'fa';

export const ui = {
  fa: { 'nav.home': 'خانه', 'nav.archive': 'بایگانی', … },
  en: { 'nav.home': 'Home', 'nav.archive': 'Archive', … },
};
```

### Theme colors — `src/styles/global.css`

Color tokens are CSS custom properties toggled by `data-theme` and bridged
into Tailwind via `@theme inline`:

```css
:root, :root[data-theme="dark"]  { --bg-color: #161a28; --accent: #4a90e2; … }
:root[data-theme="light"]       { --bg-color: #f7f8fb; --accent: #1d4ed8; … }

@theme inline {
  --color-bg: var(--bg-color);   /* → bg-bg, text-bg, … */
  --color-accent: var(--accent); /* → bg-accent, text-accent, … */
}
```

Edit the hex values to reskin the whole site (utilities and prose follow
automatically).

---

## ✍️ Writing a post

Posts live in `src/content/blog/<lang>/`. To write a bilingual post, create
one file in each language and link them with the **same** `translationKey`:

`src/content/blog/fa/my-post.md` (frontmatter):

```yaml
---
title: 'عنوان نوشته'
description: 'توضیح کوتاه'
pubDate: '2026-08-04'
tags: ['astro', 'writing']
translationKey: 'my-post'   # must match the English file exactly
---
```

`src/content/blog/en/my-post.md` (frontmatter):

```yaml
---
title: 'My post'
description: 'Short summary'
pubDate: '2026-08-04'
tags: ['astro', 'writing']
translationKey: 'my-post'   # must match the Persian file exactly
---
```

The header language switcher uses `translationKey` to link between versions.
Required frontmatter: `title`, `description`, `pubDate`. `tags` are optional
but enable the tag pages.

---

## 🚢 Deployment

This is a fully static site — deploy the `dist/` output anywhere. Recommended:

| Host | Guide |
|------|-------|
| **Cloudflare Pages** | [`docs/09-deploy-cloudflare.md`](docs/09-deploy-cloudflare.md) |
| Netlify | [`docs/08-deploy-netlify.md`](docs/08-deploy-netlify.md) |
| Vercel | [`docs/07-deploy-vercel.md`](docs/07-deploy-vercel.md) |
| GitHub Pages | [`docs/06-deploy-github-pages.md`](docs/06-deploy-github-pages.md) |

All hosts: build command `npm run build`, publish directory `dist`, Node 22.
Before deploying, set `site` in `astro.config.mjs` to your real domain so the
RSS feed and canonical URLs are correct.

### Cloudflare Pages (quickest)

1. In the Cloudflare dashboard → **Workers & Pages → Create → Pages**.
2. **Connect to Git**, pick this repo, set **Build command** `npm run build`
   and **Build output directory** `dist`.
3. Deploy. You get a free `https://<project>.pages.dev` URL with HTTPS.

Full step-by-step (Git integration + `wrangler` CLI + custom domains):
see [`docs/09-deploy-cloudflare.md`](docs/09-deploy-cloudflare.md).

---

## 📚 Documentation

The full beginner-friendly guide lives in [`docs/`](docs/README.md):
project overview, running locally, writing posts, customizing layout and
landing page, and deploying to GitHub Pages / Vercel / Netlify / Cloudflare.

---

## 🌿 Branches

- `master` — the **vanilla CSS** version of the blog (no Tailwind).
- `feat/tailwind-rewrite` — this **Tailwind v4** version (default working
  branch). Merge into `master` once you're happy with it.

---

## 📄 License

Released under the [MIT License](LICENSE). Built with
[Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).
