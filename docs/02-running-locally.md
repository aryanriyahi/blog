# 2. Running locally

## Prerequisites

- **Node.js ≥ 22.12.0** — check with `node --version`. If you need it, install
  from [nodejs.org](https://nodejs.org/) or use a version manager like `nvm` /
  `fnm`.
- **npm** — comes bundled with Node. (You can also use `pnpm` or `yarn`.)

## Install dependencies

If you haven't already (this repo already has `node_modules`):

```sh
npm install
```

## Start the dev server

```sh
npm run dev
```

This starts Astro's dev server at **http://localhost:4321**. Open it in your
browser. As you edit files and save, the page hot-reloads automatically — no
manual refresh needed for most changes.

> **Tip (background mode):** This workspace's `AGENTS.md` recommends running
> `astro dev --background` so the server runs in the background. Manage it with:
> - `astro dev status` — check if it's running
> - `astro dev stop` — stop the server
> - `astro dev logs` — view recent output

## Build for production

```sh
npm run build
```

This generates a fully static site in the **`dist/`** folder. This is exactly
what you'd upload to a host. The build also type-checks your content, so if a
post is missing a required frontmatter field you'll see a clear error here.

## Preview the production build

```sh
npm run preview
```

Serves the contents of `dist/` locally so you can check the production version
before deploying. (Run `npm run build` first.)

## Recommended editing workflow

1. Run `npm run dev` and keep it running.
2. Edit posts in `src/content/blog/` or pages in `src/pages/`.
3. Save — the browser updates instantly.
4. When you're happy, run `npm run build` to make sure nothing errors.
5. Commit to Git.

## All npm scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Dev server at `localhost:4321` with hot reload |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run astro -- --help` | See all Astro CLI commands |
| `npx astro check` | Type-check `.astro` files for errors |

Next: [Writing a blog post →](./03-writing-a-post.md)
