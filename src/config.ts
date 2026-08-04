/**
 * Aryan's Blog - Site Configuration
 * ----------------------------------------
 * Edit this file to personalize your site.
 */

export const SITE_CONFIG = {
  /** Site title */
  title: "Aryan's Blog",

  /** Site description */
  description: 'A raw, flat minimalist blog built on the philosophy that simplicity is depth.',

  /** Site URL */
  url: 'https://blog.aryanriyahi.workers.dev/',
};

export const AUTHOR = {
  /** Your name */
  name: 'Aryan',

  /** Your role */
  role: {
    fa: 'مهندس نرم‌افزار',
    en: 'Software Engineer',
  },

  /** Your short bio */
  bio: {
    fa: 'توسعه‌دهنده‌ای علاقه‌مند به فناوری‌های وب مدرن و مشارکت در پروژه‌های متن‌باز. اینجا پروژه‌ها و نوشته‌هایم را به اشتراک می‌گذارم.',
    en: 'A developer interested in modern web technologies and open source projects. Documenting projects and posts here.',
  },

  /** Profile picture path (from /src/assets folder) */
  avatar: '/profile.jpg',
};

export const SOCIALS = [
  {
    label: 'Mail',
    href: 'mailto:aryanriyahi@gmail.com',
    icon: 'mdi:email',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/aryanriyahi',
    icon: 'mdi:github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aryan-riyahi',
    icon: 'mdi:linkedin',
  },
  {
    label: 'RSS',
    href: '/rss.xml',
    icon: 'mdi:rss',
  }
];
