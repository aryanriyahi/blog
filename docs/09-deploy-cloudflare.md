# 9. Deploy to Cloudflare Pages

Cloudflare Pages is free, fast, and globally distributed (anycast CDN). This
site is fully static, so Cloudflare Pages — which also gets you **automatic
HTTPS**, **custom domains**, and **preview deployments** — is the ideal host.

There are two ways to deploy: the **dashboard + Git integration** (recommended,
zero terminal steps) or the **`wrangler` CLI**. Both produce a free
`https://<project>.pages.dev` URL.

---

## Before you start

1. **Want previews & auto-deploys?** Use the Git-integration method below — it
   rebuilds on every push to GitHub.
2. **Set your site URL.** Open `astro.config.mjs` and set `site` to the URL you
   expect to use (your `.pages.dev` URL or a custom domain). This powers the
   RSS feed and canonical URLs:

   ```js
   export default defineConfig({
     site: 'https://your-blog.pages.dev',  // ← update to your real URL
     // …
   });
   ```

   (You can change this later and push again.)

---

## Method 1 — Dashboard + Git integration (recommended)

### Step 1 — Push your code to GitHub

Push the project to GitHub: create a repo on your provider, then from the
project root run `git init`, `git add -A`, `git commit -m "Initial commit"`,
`git remote add origin <repo-url>`, and `git push -u origin main`. The repo
already has the `dist/` output ignored, so only source is committed.

### Step 2 — Create a Pages project

1. Sign in to [dash.cloudflare.com](https://dash.cloudflare.com).
2. Go to **Workers & Pages** → **Create** → **Pages**.
3. Under **Connect to Git**, pick your blog repo.

### Step 3 — Configure the build

After connecting the repo, Cloudflare shows a build configuration form:

| Setting | Value |
|---------|-------|
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | **22** |
| Production branch | `master` (or the branch you deploy from) |

If the preset dropdown doesn't list Astro, that's fine — leave it on
**None** and just enter the build command and output directory manually.

Click **Save and Deploy**.

### Step 4 — Wait for the first build

The first deploy builds in ~30–60 seconds. When it's green you'll get a live
URL like:

```
https://your-blog.pages.dev
```

The static `404.html` Astro generates is served automatically for missing
routes, and the `/en/…` and `/fa/…` paths work out of the box.

---

## Method 2 — `wrangler` CLI

Prefer deploying from your terminal (no Git connection)? Use the official
CLI. It uploads the `dist/` folder directly — just build first.

```bash
npm run build                  # produce dist/
npx wrangler pages deploy dist --project-name=your-blog
```

The first run prompts you to log in to Cloudflare and creates the project if
it doesn't exist. A ready `wrangler.toml` (project name + `dist` output dir)
is included in this repo to simplify repeat deploys:

```bash
npx wrangler pages deploy
```

> `wrangler.toml` is only needed for the CLI path. If you use the dashboard
> Git integration, it's ignored — you can delete it or keep it for later.

---

## Step 5 — (Optional) Add a custom domain

1. In **Workers & Pages → your project → Custom domains** → **Add custom
   domain**.
2. Enter your domain (e.g. `blog.yourname.dev`). Cloudflare shows the DNS
   record to add at your registrar (a `CNAME` to `<project>.pages.dev`, or
   `A` records if you use Cloudflare DNS).
3. Cloudflare provisions the **HTTPS certificate automatically**.
4. Update `site` in `astro.config.mjs` to your custom domain and push so the
   RSS feed/canonical URLs use it.

---

## Updating your site later

With the **Git integration**, just push (on any branch with a preview, or on
the production branch):

```sh
git add -A
git commit -m "New post: …"
git push
```

Cloudflare rebuilds and publishes. Each pull request / non-production branch
gets its own **preview URL** you can review before merging.

With the **CLI**, re-run `npx wrangler pages deploy`. Always build first:
`npm run build`.

---

## Troubleshooting

- **Build fails importing `sharp`/native deps** → Cloudflare handles the
  install; make sure Node version is **22** (it matches the repo's `engines`).
- **Styles/404 broken** → confirm **Build output directory** is `dist`
  (not `public` or `build`).
- **404 on `/blog/…`** → make sure the production branch matches the branch
  you configured, and that the `dist` output contains `blog/…` files.
- **RSS URLs look wrong** → update `site` in `astro.config.mjs` to the real
  URL and push again.

---

## Notes

- The free tier covers personal blogs comfortably (unlimited bandwidth on
  static assets, free HTTPS, global CDN).
- Cloudflare Pages is **stateless** — your blog is plain static HTML/CSS/JS,
  so there's no server to maintain or scale.
