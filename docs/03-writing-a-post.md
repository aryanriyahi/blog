# 3. Writing a blog post

Writing a post = create one Markdown file in the right language folder.
That's the whole workflow.

## Where posts live

Posts live in **`src/content/blog/`**, split by language:

```
src/content/blog/fa/my-post.md  →  /blog/my-post/        (Persian, default)
src/content/blog/en/my-post.md  →  /en/blog/my-post/     (English)
src/content/blog/de/my-post.md  →  /de/blog/my-post/     (German)
```

Use lowercase, hyphenated filenames: `using-docker-volumes.md`, not
`Using Docker Volumes.md`.

## Create a new post

1. Create a file, e.g. `src/content/blog/fa/my-first-real-post.md`.
2. Add the frontmatter (see below).
3. Write your content in Markdown.
4. Save. It's live on your dev server at `/blog/my-first-real-post/`.

For an English version, create the matching file in `src/content/blog/en/` and
link the two with the same `translationKey` (see “Bilingual posts” below).

## Frontmatter (the metadata block)

The top of every post is wrapped in `---` and contains metadata. This is
defined and validated in `src/content.config.ts`:

```yaml
---
title: 'My post title'          # required — string
description: 'One-line summary'  # required — string (used for SEO + RSS)
pubDate: '2026-08-04'           # required — a date string
tags: ['tailwind', 'astro']     # optional — enables tag pages
translationKey: 'my-post'       # optional — links the Persian & English versions
---
```

### Field rules

- **`title`** (required) — the post title.
- **`description`** (required) — a short summary; shows up in the RSS feed and
  search/social previews. Keep it to one sentence.
- **`pubDate`** (required) — publish date. Astro parses many formats, e.g.
  `'2026-08-04'`, `'Aug 04 2026'`. Pick one and be consistent.
- **`tags`** (optional) — a list of tags; each opens a `/tags/<tag>/` page.
- **`translationKey`** (optional) — used to link the Persian, English, and
  German versions of the same post (see below).

> If you forget a required field, `npm run build` will fail with a clear error
> telling you which field is missing from which file.

## Bilingual posts (Persian ↔ English)

To link two versions of one post, give **both files the same**
`translationKey`. The header language switcher then jumps straight to the
translated version (or to the other language's archive if none exists).

`src/content/blog/fa/my-post.md`:

```yaml
---
title: 'عنوان نوشته'
description: 'توضیح کوتاه'
pubDate: '2026-08-04'
tags: ['astro', 'writing']
translationKey: 'my-post'
---
```

`src/content/blog/en/my-post.md`:

```yaml
---
title: 'My post'
description: 'Short summary'
pubDate: '2026-08-04'
tags: ['astro', 'writing']
translationKey: 'my-post'
---
```

The `translationKey` value just needs to match between the two files — use any
string that makes sense to you.

## Markdown features

The layout renders the post `title` as the `<h1>`, so **start your body with
`##`** (an h2), which also feeds the table of contents.

### Headings

```markdown
## A section
### A subsection
```

### Inline formatting

```markdown
**bold**, _italic_, `inline code`, and [a link](https://docs.astro.build).
```

### Code blocks (with syntax highlighting)

Use three backticks + a language name. Astro uses Shiki, with dual dark/light
themes that follow the site toggle:

````markdown
```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
````

Supported languages include `js`, `ts`, `jsx`, `tsx`, `python`, `bash`, `sh`,
`json`, `yaml`, `html`, `css`, `go`, `rust`, `sql`, and more. Use `text` for
plain output.

### Lists, blockquotes, tables

```markdown
- Unordered item
- Another item

1. Ordered step one
2. Ordered step two

> A blockquote.

| Tool    | Use            |
| ------- | -------------- |
| Astro   | Build the site |
| Cloudflare Pages | Host the site |
```

## Adding images

### 1. Image in `public/` (simplest, no optimization)

Drop the file in `public/` (e.g. `public/diagram.png`) and reference it with an
absolute path that starts at `/`:

```markdown
![Alt text describing the image](/diagram.png)
```

### 2. Image in `src/assets/` (optimized, recommended for photos)

Reference a file relative to the post and Astro will optimize/compress it:

```markdown
![Alt text](../../assets/my-photo.jpg)
```

Working example posts already exist in `src/content/blog/{fa,en}/` — copy one
as a starting template.
