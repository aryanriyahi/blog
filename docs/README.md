# Blog Documentation

A practical, beginner-friendly guide to running and customizing this Persian/
English Astro blog. These docs assume zero Astro experience and explain
everything step by step.

Start with the **Project overview**, then read the rest in any order as you
need each topic.

## Table of contents

| # | Guide | What you'll learn |
|---|-------|-------------------|
| 1 | [Project overview](./01-project-overview.md) | How the project is laid out, how a Markdown file becomes a web page, bilingual routes |
| 2 | [Running locally](./02-running-locally.md) | Start the dev server, build the site, preview your build |
| 3 | [Writing a blog post](./03-writing-a-post.md) | Create Persian/English posts, frontmatter, translation keys, images |
| 4 | [Modifying the layout](./04-modifying-the-layout.md) | The post page, Tailwind utilities, theme colors, dark/light toggle |
| 5 | [Modifying the landing page](./05-modifying-the-landing-page.md) | Homepage, About page, header nav, footer, site name |
| 6 | [Deploy to GitHub Pages](./06-deploy-github-pages.md) | Publish free on `username.github.io` |
| 7 | [Deploy to Vercel](./07-deploy-vercel.md) | Publish on Vercel (custom domains, instant previews) |
| 8 | [Deploy to Netlify](./08-deploy-netlify.md) | Publish on Netlify (custom domains, instant previews) |
| 9 | [Deploy to Cloudflare Pages](./09-deploy-cloudflare.md) | Publish on Cloudflare (global CDN, free HTTPS, previews) |

## Quick reference — common commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server at `http://localhost:4321` |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npx astro check` | Type-check your `.astro` files for errors |

## Quick reference — where things live

| What | Where |
|------|-------|
| Persian posts | `src/content/blog/fa/*.md` |
| English posts | `src/content/blog/en/*.md` |
| About pages | `src/content/pages/{fa,en}/about.md` |
| Site name, author & socials | `src/config.ts` |
| Language labels / nav | `src/i18n/ui.ts` |
| Homepage | `src/pages/[...lang]/index.astro` |
| Post page layout | `src/layouts/BlogPost.astro` |
| Theme colors & Tailwind entry | `src/styles/global.css` |
| Astro config (site URL, i18n) | `astro.config.mjs` |
| Cloudflare deploy config | `wrangler.toml` |

## Tips

- **Edit → save → refresh.** The dev server reloads automatically for most
  changes.
- **Commit often.** This is a Git repo — commit your posts so you never lose
  work.
- **Set `site` in `astro.config.mjs`** to your real domain before deploying
  (it powers the RSS feed and canonical URLs).
- If something breaks, run `npm run build` — the error messages point at the
  problem and the file to fix.
