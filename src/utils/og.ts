export function getOGImage(image?: string, lang: string = 'fa'): string {
	if (!image) {
		return '/og.png';
	}
	
	// If image already has language suffix, return as is
	if (image.endsWith('-fa.png') || image.endsWith('-en.png')) {
		return image;
	}
	
	// Try to find language-specific version
	const basePath = image.replace('.png', '');
	const langSuffix = lang === 'fa' ? '-fa' : '-en';
	const langSpecificPath = `${basePath}${langSuffix}.png`;
	
	return langSpecificPath;
}
