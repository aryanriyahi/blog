# 8. Deploy to Netlify

Netlify is another free, zero-config host for Astro. Like Vercel, it builds on
every push and provides a `*.netlify.app` URL plus free HTTPS and custom
domains.

## Step 1 — Set your site URL

In `astro.config.mjs`, set `site` to your Netlify URL or custom domain:

```js
export default defineConfig({
    site: 'https://your-blog.netlify.app',
    integrations: [mdx(), icon()],
    // …
});
```

Update this to your custom domain later if you add one. Netlify serves from the
domain root, so no `base` setting is needed.

## Step 2 — Push your code to GitHub

Netlify deploys from a Git repo, so push your project to GitHub/GitLab/Bitbucket
first (see Step 2 in the GitHub Pages guide for the git commands).

## Step 3 — Import the project on Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and sign in with your Git
   provider.
2. Click **Add new site → Import an existing project**.
3. Pick your blog repo.

Netlify detects Astro and pre-fills the settings. Confirm they're:

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |

Click **Deploy site**.

## Step 4 — Wait for the build

Netlify builds in ~30–60 seconds and gives you a live URL like
`https://your-blog.netlify.app`. The first deploy is already public.

## Step 5 — (Optional) Add a custom domain

1. In your Netlify site → **Domain management → Add custom domain**.
2. Enter your domain. Netlify shows the DNS records to add at your registrar.
3. Add them, then click **Verify DNS access**. Netlify provisions the HTTPS
   certificate automatically.
4. Update `site` in `astro.config.mjs` to your custom domain and push, so the
   RSS feed/canonical URLs use the right URLs. Netlify redeploys automatically.

## (Alternative) Deploy with a config file

You can commit build settings to the repo with a `netlify.toml` at the project
root so you don't rely on the dashboard:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"
```

This is optional — the dashboard settings work fine on their own.

## Updating your site later

```sh
git add -A
git commit -m "New post: …"
git push
```

Netlify builds and publishes automatically. Each push also creates a deploy
preview URL you can review before publishing.

## Notes

- Free tier covers personal blogs comfortably (bandwidth, build minutes, HTTPS).
- Set `NODE_VERSION = "22"` (via dashboard or `netlify.toml`) to match your
  `engines` requirement.
- You can also use the Netlify CLI (`netlify deploy`) to deploy from your
  terminal without Git.
