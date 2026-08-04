# 5. Modifying the landing page

This covers the pages visitors see first: the homepage, the About page, the
header/footer, and the global site name/author/socials.

## Site name, author & socials — `src/config.ts`

This is the most important file to personalize. It's imported across the site:

```ts
export const SITE_CONFIG = {
  title: 'Aryan',
  description: 'Worth sharing.',
  url: 'https://your-domain.com',
};

export const AUTHOR = {
  name: 'Aryan',
  role: { fa: 'نویسنده | توسعه‌دهنده', en: 'Writer | Developer' },
  bio:  { fa: '…', en: '…' },
};

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/aryanriyahi', icon: 'mdi:github' },
];
```

- `SITE_CONFIG.title` — shown in the header logo and the browser tab.
- `SITE_CONFIG.url` — powers canonical URLs / RSS; set it to your real domain
  before deploying.
- `AUTHOR.name`, `.role`, `.bio` — both a Persian (`fa`) and English (`en`)
  string, used by the homepage profile sidebar.
- `SOCIALS` — icons rendered in the profile sidebar; pick from the
  [MDI set](https://icon-sets.iconify.design/mdi/).

## Language labels & nav — `src/i18n/ui.ts`

The menu labels are per-language here. Edit the strings, or add another locale:

```ts
export const languages = { fa: 'فارسی', en: 'English' };
export const defaultLang = 'fa';

export const ui = {
  fa: { 'nav.home': 'خانه', 'nav.archive': 'بایگانی', 'nav.tags': 'برچسب‌ها', 'nav.about': 'درباره', … },
  en: { 'nav.home': 'Home', 'nav.archive': 'Archive', 'nav.tags': 'Tags', 'nav.about': 'About', … },
};
```

The header nav is defined in `src/components/Header.astro` and pulls its text
from these labels with `t('nav.home')` etc.

## Homepage — `src/pages/[...lang]/index.astro`

The homepage has a two-column layout on desktop: a **sticky profile sidebar**
(author card) on the left and the **recent posts** list on the right.

- **Profile card** is rendered by `src/components/Profile.astro` (avatar, bio,
  socials) using `AUTHOR` / `SOCIALS` from `config.ts`.
- **Recent posts** come from the `blog` collection for the current language,
  newest first. Remove or change the `max-h-[380px]` clip + “All posts →”
  fade/more-link to show all posts instead.
- The layout and post-list styling are Tailwind utility classes in the file's
  template (there's no `<style>` block).

To change how many posts show or the fallback archive label, edit the
frontmatter (the `posts` array and `archiveLabel` const).

## About page — `src/content/pages/{fa,en}/about.md`

Unlike the starter, the About page is **Markdown content**, not an `.astro`
file. Edit: `src/content/pages/fa/about.md` (Persian) and
`src/content/pages/en/about.md` (English). Each renders via
`src/pages/[...lang]/about.astro` with the `prose` class, so it styles like a
post. Frontmatter: `title` and `description`.

## Header / Footer

- **Header** — `src/components/Header.astro`: the logo (from `SITE_CONFIG.title`)
  and nav links. It also holds the theme toggle and language switcher.
- **Footer** — `src/components/Footer.astro`: copyright with `AUTHOR.name` and
  a per-language tagline. Edit the tagline strings in this file.

## The blog archive & tags — `src/pages/[...lang]/`

- **Archive** — `.../archive.astro`: all posts grouped by year, per language.
- **Tags index** — `.../tags/index.astro`: a grid of tags with post counts.
- **Per-tag pages** — `.../tags/[tag].astro`: posts for one tag.

These are auto-generated from your posts; you rarely need to edit them.

## SEO defaults — `src/components/BaseHead.astro`

Every page passes a `title` and `description` into `<BaseHead>`, which outputs
`<title>`, meta description, Open Graph, and Twitter-card tags, plus the RSS
feed links and the **no-flicker theme script**. You rarely edit this file.

---

Once your homepage and About page feel right, you're ready to deploy. Pick one:

- [Deploy to GitHub Pages →](./06-deploy-github-pages.md) (free, lives in your GitHub repo)
- [Deploy to Vercel →](./07-deploy-vercel.md)
- [Deploy to Netlify →](./08-deploy-netlify.md)
- [Deploy to Cloudflare Pages →](./09-deploy-cloudflare.md) (recommended)
