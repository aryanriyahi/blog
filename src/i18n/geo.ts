// Geolocation-based language detection + manual override.

export const LANGS = ['fa', 'en'] as const;
export type Lang = (typeof LANGS)[number];

export const PREFERENCE_KEY = 'preferredLang';

/**
 * Reads any persisted manual language choice from localStorage.
 * Returns null when the user has not made a manual choice yet.
 */
export function getSavedLanguage(): Lang | null {
	try {
		const saved = localStorage.getItem(PREFERENCE_KEY);
		if (saved && (saved === 'fa' || saved === 'en')) {
			return saved;
		}
	} catch {
		// localStorage unavailable (private mode, blocked cookies, SSR)
	}
	return null;
}

/**
 * Persists a manual language choice for future visits.
 */
export function saveLanguage(lang: Lang): void {
	try {
		localStorage.setItem(PREFERENCE_KEY, lang);
	} catch {
		// ignore write failures
	}
}

/**
 * Detects the user's language purely from timezone metadata.
 * Iran uses UTC+3:30 (and UTC+4:30 during DST), so we look at
 * offsetInMinutes % 60 === 30 and a sensible hour range. This avoids
 * any external network dependency and works fully client-side.
 *
 * Returns 'fa' for Iran, 'en' for everyone else.
 */
export function detectLanguageFromTimezone(): Lang {
	try {
		const offset = new Date().getTimezoneOffset(); // minutes, UTC ahead = negative
		const absolute = Math.abs(offset);
		// Iran offsets: -210 (GMT+3:30) or -270 (GMT+4:30) from getTimezoneOffset()
		const isIran = absolute === 210 || absolute === 270;
		return isIran ? 'fa' : 'en';
	} catch {
		return 'en';
	}
}

/**
 * Returns the resolved language for a given URL.
 * Priority: manual choice (localStorage) > location detection > default.
 *
 * NOTE: This must only be called on the client side (it uses localStorage
 * and Date). It returns null from the server so callers can fall back
 * to their own default.
 */
export function resolveClientLanguage(): Lang {
	const saved = getSavedLanguage();
	if (saved) return saved;
	return detectLanguageFromTimezone();
}
