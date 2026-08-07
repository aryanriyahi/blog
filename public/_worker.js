/**
 * Cloudflare Workers static-assets edge worker.
 *
 * Sits in front of the static blog files (dist/) and decides the locale to
 * serve based on:
 *   1. A `preferredLang` cookie (set when the user manually switches) — wins.
 *   2. Otherwise, IP geolocation via `request.cf.country` — Iran ("IR") -> fa,
 *      everyone else -> en.
 *
 * If the resolved locale differs from the URL's current locale, we issue a
 * redirect to the correct locale path; otherwise we serve the static asset
 * untouched via env.ASSETS.fetch().
 *
 * This also means static pages are never built conditionally: both / (fa) and
 * /en/ (en) HTML files exist, and this worker just routes the visitor.
 */

const PREF_COOKIE = 'preferredLang';
const VALID = ['fa', 'en'];
const DEFAULT_FA = 'fa';
const DEFAULT_EN = 'en';

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

/** Returns the locale encoded in the pathname: '' -> fa (default), else 'en'. */
function currentLang(pathname) {
	// "/en/..." -> en ; everything else is the default (fa)
	if (pathname === '/' || pathname === '') return DEFAULT_FA;
	const first = pathname.split('/').filter(Boolean)[0];
	if (first === 'en') return 'en';
	return DEFAULT_FA;
}

/** Rewrite the pathname to the given locale, preserving the rest of the route. */
function toLocalePath(locale, pathname) {
	const segments = pathname.split('/').filter(Boolean);
	// Strip any existing locale prefix
	if (segments[0] === 'en') segments.shift();

	const parts = [];
	if (locale === 'en') parts.push('en');
	parts.push(...segments);

	let result = '/' + parts.join('/');
	// Preserve trailing slash but avoid "//" on locale roots.
	if (pathname.endsWith('/') && result !== '/') result += '/';
	return result;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		const cookieLang = getCookie(request, PREF_COOKIE);
		const saved = VALID.includes(cookieLang) ? cookieLang : null;

		let wanted;
		if (saved) {
			wanted = saved;
		} else {
			const country = (request.cf && request.cf.country) || '';
			wanted = country === 'IR' ? DEFAULT_FA : DEFAULT_EN;
		}

		const cur = currentLang(url.pathname);

		if (wanted !== cur) {
			const target = new URL(toLocalePath(wanted, url.pathname), url.origin);
			target.search = url.search;
			// 302 (temporary) avoids caching a geo-dependent redirect.
			return Response.redirect(target.toString(), 302);
		}

		// Serve the static file (html, assets, etc.).
		return env.ASSETS.fetch(request);
	},
};
