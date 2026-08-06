---
title: 'How to Write and Organize Content'
description: "Discover how to create bilingual posts, use content collections, and leverage the blog's smart language switching mechanism."
pubDate: '2026-05-21'
tags: ['guide', 'usage', 'i18n']
translationKey: 'usage'
image: '/og/usage-en.png'
---

One of this blog's most powerful assets is its clean, out-of-the-box support for bilingual content management. This guide will walk you through the folder architecture of your posts, formatting your post metadata (frontmatter), and utilizing the smart language switcher to link Persian and English posts.

---

## 📂 Content Directory Structure

All blog posts reside under the `src/content/blog/` directory. Within this directory, articles are organized into localized subfolders:

- `src/content/blog/fa/` — Holds your Persian articles.
- `src/content/blog/en/` — Holds your English articles.

Astro automatically parses all files ending with `.md` or `.mdx` inside these subfolders thanks to the content collection loader defined in `src/content.config.ts`.

---

## 📋 The Post Frontmatter Schema

Every markdown post must contain a metadata block at the very top, enclosed by triple dashes `---`. The content collection schema enforces the following fields:

```markdown
---
title: 'Your Article Title'
description: 'A brief description of your article.'
pubDate: '2026-05-17'
tags: ['tag1', 'tag2']
translationKey: 'unique-post-identifier'
---
```

### Explaining the Fields:
- **`title` & `description`:** Essential fields rendered at the top of the article and dynamically injected into the HTML `<head>` tag for optimal SEO indexation.
- **`pubDate`:** The publication date. The blog uses this date to sort posts chronologically and group them dynamically by year inside the `/archive/` page.
- **`tags`:** An array of tags used to group related posts on the `/tags/` pages.
- **`translationKey`:** A custom unique text key linking the Persian and English translations of the post together.

---

## 🌐 The Smart i18n Switching Mechanism

The blog implements an advanced routing system inside the header language navigation toggle. When a visitor is reading an English post and clicks **"FA"**, the blog does not simply bounce them to the Persian home page. 

Instead, it searches through your blog collection to find a Persian post that shares the exact same `translationKey` value.

- **If an identical key is found:** It seamlessly redirects the reader directly to the Persian translation page.
- **If no matching key is found:** It gracefully redirects the reader to the `/archive/` page.


### Best Practice Example:

To write a post about minimalist design in both languages:

1. Create `src/content/blog/fa/sadelik.md` containing `translationKey: 'simplicity-post'`.
2. Create `src/content/blog/en/simplicity.md` containing `translationKey: 'simplicity-post'`.

With this configuration, readers can toggle back and forth between English and Persian on the fly without ever losing their place.

---

## Next Steps

Now that you know how to organize and draft posts, you are ready to adjust the design tokens, switch colors, and modify your social link matrices.

Read our final guide: **[Advanced Customization & Colors](/en/blog/customization/)** to learn more.
