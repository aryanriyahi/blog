---
title: 'Getting started with this blog'
description: 'A quick tour of how this blog works and how to write your first post.'
pubDate: '2026-08-03'
tags: ['guide', 'getting-started']
translationKey: 'getting-started'
image: '/og/getting-started-en.png'
---

Welcome! This post is a working example you can copy when writing your own. It shows the frontmatter fields and the Markdown features you'll use most often for technical posts.

## The frontmatter

Every post starts with metadata between `---` lines at the top of the file:

```yaml
---
title: 'Getting started with this blog'
description: 'A quick tour of how this blog works and how to write your first post.'
pubDate: '2026-08-03'
updatedDate: '2026-08-04' # optional
tags: ['guide', 'getting-started'] # optional, defaults to []
translationKey: 'getting-started' # optional, links translations together
---
```

- `title` — the post title (required)
- `description` — a short summary, used for SEO and the RSS feed (required)
- `pubDate` — the publish date (required)
- `updatedDate` — add this only if you edit a published post (optional)
- `tags` — an array of tags for categorization (optional, defaults to `[]`)
- `translationKey` — a unique key linking this post to its translations in other languages (optional)

## Headings

Use `#` for an `<h1>` down to `######` for an `<h6>`. The post title is already rendered as an `<h1>`, so start the body of your post with `##`.

## Inline formatting

You can write **bold**, _italic_, and `inline code`. Links look like [Astro's documentation](https://docs.astro.build).

## Code blocks

Use three backticks followed by a language name for syntax highlighting:

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet('world'));
```

## Lists

Unordered:

- First item
- Second item
  - A nested item

Ordered:

1. Step one
2. Step two
3. Step three

## Blockquotes

> Simplicity is the soul of efficiency.

## Tables

| Feature  | Supported |
| -------- | --------- |
| Markdown | Yes       |
| MDX      | Yes       |
| RSS feed | Yes       |

## Adding a new post

1. Create a file in `src/content/blog/en/` (for English) or `src/content/blog/fa/` (for Persian) — for example, `my-post.md`.
2. Copy the frontmatter block above and fill in your title, description, and date.
3. If you want the post available in both languages, create a matching file in the other language's folder with the same `translationKey`.
4. Write your post in Markdown below the frontmatter.
5. Save the file. The post appears at `/blog/my-post/` (Persian, default) or `/en/blog/my-post/` (English) automatically.

That's it — happy writing!