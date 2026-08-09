// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Pagefind only runs after `astro build` (see package.json) and writes its
// index to `dist/pagefind/`. `astro dev` has no way to serve those files, so
// search would 404 in development. This small Vite dev-server plugin serves
// `/pagefind/*` straight from `dist/pagefind/` while the dev server is running,
// making search work locally after one `npm run build`. It falls through to
// Vite (404) when the index hasn't been generated yet.
const PAGEORIGIN = fileURLToPath(new URL('./dist/pagefind', import.meta.url));
const DEV_MIME_TYPES = {
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.wasm': 'application/wasm',
	'.html': 'text/html; charset=utf-8',
};

function pagefindDevServer() {
	return {
		name: 'astro-pagefind-dev-assets',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				try {
					// NOTE: match on the raw pathname ourselves — connect's
					// path-prefixed `use()` strips the prefix from req.url, which
					// breaks nested paths like /pagefind/pagefind.js.
					const pathname = decodeURIComponent(
						new URL(req.url, 'http://localhost').pathname,
					);
					const match = /^\/pagefind\/([^?]*)$/.exec(pathname);
					if (!match) return next();

					// Resolve inside dist/pagefind only (prevents path traversal).
					const filePath = join(PAGEORIGIN, match[1]);
					if (
						!filePath.startsWith(PAGEORIGIN + sep) ||
						!existsSync(filePath) ||
						!statSync(filePath).isFile()
					) {
						return next();
					}

					res.setHeader(
						'Content-Type',
						DEV_MIME_TYPES[extname(filePath)] ?? 'application/octet-stream',
					);
					res.setHeader('Cache-Control', 'no-cache');
					createReadStream(filePath).pipe(res);
				} catch {
					next();
				}
			});
		},
	};
}

// https://astro.build/config
export default defineConfig({
  site: 'https://aryan.example.com',
  integrations: [mdx(), icon()],
  vite: {
    plugins: [tailwindcss(), pagefindDevServer()],
  },
  markdown: {
    shikiConfig: {
      // `themes` (plural) + `defaultColor: false` makes Shiki emit
      // --shiki-dark / --shiki-light CSS variables on each token so the
      // code blocks follow the page theme toggle (see global.css).
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      defaultColor: false,
    },
  },
  i18n: {
    defaultLocale: "fa",
    locales: ["fa", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  // The old /archive pages moved to the paginated blog listing.
  // These generate static redirect pages (301) in the build output.
  redirects: {
    '/archive': '/blog/',
    '/en/archive': '/en/blog/',
  },
});
