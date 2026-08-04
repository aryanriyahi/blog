# 7. Deploy to Vercel

Vercel is the easiest host for Astro: it auto-detects the framework, builds on
every push, and gives you a free `*.vercel.app` URL plus free HTTPS and custom
domains.

## Step 1 — Set your site URL

In `astro.config.mjs`, set `site` to the URL you'll use (your Vercel subdomain
or a custom domain). This powers the RSS feed and canonical URLs:

```js
export default defineConfig({
    site: 'https://your-blog.vercel.app',
    integrations: [mdx(), icon()],
    // …
});
```

(You can update this to a custom domain later — Vercel tells you the final URL
right after the first deploy.)

> Vercel serves from the domain root, so you do **not** need a `base` setting.

## Step 2 — Push your code to GitHub

Vercel deploys from a Git repo, so push your project to GitHub/GitLab/Bitbucket
first (see Step 2 in the GitHub Pages guide for the git commands).

## Step 3 — Import the project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your Git provider.
2. Click **Add New… → Project**.
3. Find your blog repo and click **Import**.

Vercel auto-detects Astro and fills in the settings for you:

| Setting | Value (auto-filled) |
|---------|---------------------|
| Framework Preset | Astro |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

You usually don't need to change anything. Click **Deploy**.

## Step 4 — Wait for the build

Vercel builds and deploys in ~30–60 seconds. When it's done you'll see a
"Congratulations" screen with your live URL, e.g.
`https://your-blog.vercel.app`.

## Step 5 — (Optional) Add a custom domain

1. In your Vercel project → **Settings → Domains**.
2. Enter your domain (e.g. `blog.yourname.dev`) and click **Add**.
3. Vercel shows you the DNS records to add at your registrar (an `A` record or
   `CNAME`). Add them, then click "Verify".
4. Update `site` in `astro.config.mjs` to your custom domain and push, so the
   RSS feed/canonical URLs use the right URLs. Vercel redeploys automatically.

## Updating your site later

Just push to your default branch:

```sh
git add -A
git commit -m "New post: …"
git push
```

Vercel builds and publishes a new production deploy automatically. Every push
also creates a preview URL you can share before promoting.

## Notes

- Free tier covers personal blogs comfortably (bandwidth, builds, HTTPS).
- Vercel supports Node 22 by default — matches your `engines` requirement.
- You can also use the Vercel CLI (`vercel`) to deploy from your terminal
  without Git.
