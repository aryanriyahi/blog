# Blog Documentation

A practical, beginner-friendly guide to running and customizing your Astro blog.
You have zero Astro experience — these docs assume that and explain everything
step by step.

Start with the **Project overview**, then read the rest in any order as you
need each topic.

## Table of contents

| # | Guide | What you'll learn |
|---|-------|-------------------|
| 1 | [Project overview](./01-project-overview.md) | How the project is laid out and how a Markdown file becomes a web page |
| 2 | [Running locally](./02-running-locally.md) | Start the dev server, build the site, preview your build |
| 3 | [Writing a blog post](./03-writing-a-post.md) | Create a post, frontmatter fields, Markdown features, add images |
| 4 | [Modifying the layout](./04-modifying-the-layout.md) | Change the post page, global styles, colors, fonts, components |
| 5 | [Modifying the landing page](./05-modifying-the-landing-page.md) | Edit the homepage, About page, header nav, footer, site name |
| 6 | [Deploy to GitHub Pages](./06-deploy-github-pages.md) | Publish for free on `username.github.io` |
| 7 | [Deploy to Vercel](./07-deploy-vercel.md) | Publish on Vercel (custom domains, instant previews) |
| 8 | [Deploy to Netlify](./08-deploy-netlify.md) | Publish on Netlify (custom domains, instant previews) |

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
| Your posts | `src/content/blog/*.md` |
| Site name & description | `src/consts.ts` |
| Homepage | `src/pages/index.astro` |
| Post page layout | `src/layouts/BlogPost.astro` |
| Global styles & colors | `src/styles/global.css` |
| Astro config (site URL, fonts) | `astro.config.mjs` |

## Tips

- **Edit → save → refresh.** The dev server reloads automatically for most changes.
- **Commit often.** This is a Git repo — commit your posts so you never lose work.
- **Set `site` in `astro.config.mjs`** to your real domain before deploying (it powers the RSS feed and sitemap).
- If something breaks, run `npm run build` — the error messages point at the problem and the file to fix.
