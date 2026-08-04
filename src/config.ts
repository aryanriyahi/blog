/**
 * Zahit - Site Configuration
 * ----------------------------------------
 * Temayı kişiselleştirmek için bu dosyayı düzenleyin.
 * Edit this file to personalize your site.
 */

export const SITE_CONFIG = {
  /** Sitenin başlığı / Site title */
  title: "Aryan's Blog",

  /** Sitenin açıklaması / Site description */
  description: 'A raw, flat minimalist blog built on the philosophy that simplicity is depth.',

  /** Sitenin adresi / Site URL */
  url: 'https://aryan.example.com',
};

export const AUTHOR = {
  /** Adınız / Your name */
  name: 'Aryan',

  /** Rolünüz / Your role */
  role: {
    fa: 'توسعه‌دهنده نرم‌افزار',
    en: 'Software Developer',
  },

  /** Kısa biyografiniz / Your short bio */
  bio: {
    fa: 'توسعه‌دهنده‌ای علاقه‌مند به فناوری‌های وب مدرن و مشارکت در پروژه‌های متن‌باز. اینجا پروژه‌ها و نوشته‌هایم را به اشتراک می‌گذارم.',
    en: 'A developer interested in modern web technologies and open source projects. Documenting projects and posts here.',
  },

  /** Profil fotoğrafı yolu / Profile picture path (/src/assets klasöründen / from /src/assets folder) */
  avatar: '/profile.jpg',
};

export const SOCIALS = [
  {
    label: 'Mail',
    href: 'mailto:aryan@example.com',
    icon: 'mdi:email',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aryan',
    icon: 'mdi:github',
  },
  {
    label: 'X',
    href: 'https://x.com/aryan',
    icon: 'mdi:twitter',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aryan',
    icon: 'mdi:linkedin',
  },
  {
    label: 'RSS',
    href: '/rss.xml',
    icon: 'mdi:rss',
  }
];
