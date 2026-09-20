/**
 * Cloudflare Workers "static assets + worker" entrypoint.
 *
 * Runs on EVERY request (run_worker_first = true), before the static files
 * in dist/ are served. Decides the locale:
 *   1. A `preferredLang` cookie (set when the user manually switches) — wins.
 *   2. Otherwise, IP geolocation via `request.cf.country` — Iran ("IR") -> fa,
 *      German-speaking countries ("DE", "AT", "CH", "LI") -> de, everyone
 *      else -> en.
 *
 * If the resolved locale differs from the URL's locale, we issue a 302
 * redirect to the correct locale path; otherwise we serve the matching static
 * asset via env.ASSETS.fetch().
 *
 * NOTE: ../src/worker.js is bundled by wrangler (see wrangler.toml `main`).
 * It must NOT be copied into dist/ (keep it out of public/).
 */

const PREF_COOKIE = 'preferredLang';
const VALID = ['fa', 'en', 'de'];

/**
 * Country -> locale mapping used when the visitor has no saved preference.
 * Iran -> fa, German-speaking countries -> de, everyone else -> en.
 */
const GEO_MAP = {
	IR: 'fa',
	DE: 'de',
	AT: 'de',
	CH: 'de',
	LI: 'de',
};

/** Read a single cookie value from the Cookie header, or null. */
function getCookie(request, name) {
	const header = request.headers.get('cookie');
	if (!header) return null;
	for (const part of header.split(';')) {
		const idx = part.indexOf('=');
		if (idx === -1) continue;
		const key = part.slice(0, idx).trim();
		const val = part.slice(idx + 1).trim();
		if (key === name) return val;
	}
	return null;
}

/** Locale encoded in the pathname: '' -> fa (default), otherwise the first segment if valid. */
function currentLang(pathname) {
	if (pathname === '/' || pathname === '') return 'fa';
	const first = pathname.split('/').filter(Boolean)[0];
	return VALID.includes(first) ? first : 'fa';
}

/** Rewrite the pathname to the given locale, preserving the rest of the route. */
function toLocalePath(locale, pathname) {
	const segments = pathname.split('/').filter(Boolean);
	if (segments[0] !== 'fa' && VALID.includes(segments[0])) segments.shift();

	const parts = [];
	if (locale !== 'fa') parts.push(locale);
	parts.push(...segments);

	let result = '/' + parts.join('/');
	if (pathname.endsWith('/') && result !== '/') result += '/';
	return result;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const urlKey = url.origin + url.pathname;

		// Never intercept requests for immutable/cacheable static assets other
		// than HTML documents — let those through untouched.
		const ext = (url.pathname.match(/\.[a-z0-9]+$/i) || [])[0];
		const isDocument = !ext || ext === '.html';
		if (!isDocument) {
			return env.ASSETS.fetch(request);
		}

		const cookieLang = getCookie(request, PREF_COOKIE);
		const saved = VALID.includes(cookieLang) ? cookieLang : null;

		const wanted =
			saved ||
			GEO_MAP[request.cf && request.cf.country] ||
			'en';
		const cur = currentLang(url.pathname);

		if (wanted !== cur) {
			const target = new URL(toLocalePath(wanted, url.pathname), url.origin);
			target.search = url.search;
			// 302 (temporary) avoids caching a geo-dependent redirect.
			return Response.redirect(target.toString(), 302);
		}

		// Serve the static file.
		return env.ASSETS.fetch(request);
	},
};
