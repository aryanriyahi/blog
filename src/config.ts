/**
 * Aryan Riyahi - Site Configuration
 * ----------------------------------------
 * Edit this file to personalize your site.
 */

export const SITE_CONFIG = {
  /** Site title */
  title: "Aryan Riyahi",

  /** Site description */
  description: 'A place where I share my thoughts, projects, and experiences in software development.',

  /** Site URL */
  url: 'https://aryanriyahi.com/',
};

export const AUTHOR = {
  /** Your name */
  name: 'Aryan',

  /** Your role */
  role: {
    fa: 'مهندس نرم‌افزار',
    en: 'Software Engineer',
    de: 'Softwareingenieur',
  },

  /** Your short bio */
  bio: {
    fa: 'یه طرفدار تکنولوژی که عاشق ساختن و یادگیریه!',
    en: 'A tech-savvy who loves building and learning!',
    de: 'Ein Technikbegeisterter, der gerne baut und lernt!',
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
    label: 'Telegram',
    href: 'https://t.me/aryanriyahi',
    icon: 'mdi:telegram',
  },
  {
    label: 'RSS',
    href: '/rss.xml',
    icon: 'mdi:rss',
  }
];

/** Number of posts shown per page on the blog listing (`/blog`). */
export const POSTS_PER_PAGE = 9;
