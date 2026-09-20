import { languages } from '../i18n/ui';

export function getOGImage(image?: string, lang: string = 'fa'): string {
	if (!image) {
		return '/og.png';
	}
	
	// If the image already carries a language suffix (-fa / -en / -de …),
	// return it untouched.
	const langCodes = Object.keys(languages).join('|');
	if (new RegExp(`-(?:${langCodes})\\.png$`).test(image)) {
		return image;
	}
	
	// Otherwise derive the language-specific variant from the base name.
	return `${image.replace(/\.png$/, '')}-${lang}.png`;
}
