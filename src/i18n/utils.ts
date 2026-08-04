import { ui, defaultLang, languages } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  
  const nonDefaultLocales = Object.keys(languages).filter((l) => l !== defaultLang);

  if (parts.length > 1 && nonDefaultLocales.includes(parts[1])) {
    return parts.slice(2).join('/') || undefined;
  }
  
  return pathname.slice(1) || undefined;
}
