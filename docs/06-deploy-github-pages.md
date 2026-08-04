# 6. Deploy to GitHub Pages

GitHub Pages is free and hosts your site straight from a GitHub repository.
The recommended method is **GitHub Actions**, which rebuilds and publishes your
site automatically every time you push to `master`.

## Step 1 — Set your site URL and base path

Open `astro.config.mjs`. You need two settings:

- **`site`** — your full GitHub Pages URL.
- **`base`** — needed **only** for project sites (see below).

### Are you using a User/Org site or a Project site?

| Type | Repo name | Final URL | `base` |
|------|-----------|-----------|--------|
| User site | `yourname.github.io` | `https://yourname.github.io/` | (omit / `'/'`) |
| Project site | any other repo, e.g. `blog` | `https://yourname.github.io/blog/` | `'/blog/'` |

### Config for a USER site (`yourname.github.io`)

```js
export default defineConfig({
    site: 'https://yourname.github.io',
    // no base needed — served from root
    integrations: [mdx(), sitemap()],
    // …fonts…
});
```

### Config for a PROJECT site (repo named e.g. `blog`)

```js
export default defineConfig({
    site: 'https://yourname.github.io',
    base: '/blog/',
    integrations: [mdx(), sitemap()],
    // …fonts…
});
```

> `base` must start and end with a `/` and match your repo name exactly.
> Without it, all your CSS/JS/assets will 404 because GitHub serves the site
> from a subpath.

## Step 2 — Push your code to GitHub

1. Create a repo on [github.com](https://github.com/new).
   - For a user site, name it `yourname.github.io`.
   - For a project site, name it whatever (e.g. `blog`).
2. From the project root:

```sh
git add -A
git commit -m "Prepare for GitHub Pages deploy"
git branch -M master
git remote add origin https://github.com/yourname/your-repo.git
git push -u origin master
```

(If your default branch is `main`, use `main` everywhere and update the
workflow's `branches` below.)

## Step 3 — Add the GitHub Actions workflow

A ready-to-use workflow file is already included in this project at
`.github/workflows/deploy.yml`. If you don't have it, create it with this
content:

```yaml
name: Deploy to GitHub Pages

on:
  # Run on every push to your default branch
  push:
    branches: [master]
  # Allow manual runs from the Actions tab
  workflow_dispatch:

# GITHUB_TOKEN permissions — required by the Pages deploy actions
permissions:
  contents: read
  pages: write
  id-token: write

# Only one deploy at a time
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build with Astro
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Commit and push it:

```sh
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deploy workflow"
git push
```

## Step 4 — Enable Pages in repo settings

1. On GitHub, go to your repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**
   (not "Deploy from a branch").
3. That's it — the workflow you just pushed handles the rest.

## Step 5 — Watch it deploy

1. Go to your repo → **Actions** tab.
2. You'll see a "Deploy to GitHub Pages" run. Wait for both `build` and
   `deploy` jobs to turn green.
3. Find your live URL in the workflow run summary (or Settings → Pages).

First deploy takes ~1–2 minutes. Subsequent pushes re-run automatically.

## Updating your site later

Just push to `master`:

```sh
git add -A
git commit -m "New post: …"
git push
```

GitHub Actions rebuilds and republishes automatically.

## Troubleshooting

- **Page loads but styles/images are broken** → you're on a project site and
  forgot `base: '/your-repo/'` in `astro.config.mjs`. Add it, rebuild, push.
- **`npm ci` fails in Actions** → make sure `package-lock.json` is committed
  (it is, by default).
- **Build fails with a content error** → run `npm run build` locally; the same
  error will show with a clear file/field reference. Fix the frontmatter, then
  push.
- **Nothing happens on push** → confirm Settings → Pages → Source is set to
  "GitHub Actions" and the workflow file is on your default branch.

## Notes

- GitHub Pages sites are **public** on free accounts (your repo can stay
  private — only the published site is public). For a private *site*, use
  Vercel or Netlify instead.
- It can take a minute for a brand-new site to be reachable after the first
  successful deploy.
