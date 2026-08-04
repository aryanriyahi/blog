// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://aryan.example.com',
  integrations: [mdx(), icon()],
  markdown: {
    shikiConfig: {
      // `themes` (plural) + `defaultColor: false` makes Shiki emit
      // --shiki-dark / --shiki-light CSS variables on each token so the
      // code blocks follow the page theme toggle (see global.css).
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
      defaultColor: false,
    },
  },
  i18n: {
    defaultLocale: "fa",
    locales: ["fa", "en"],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
