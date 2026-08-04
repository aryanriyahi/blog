# 3. Writing a blog post

Writing a post = create one Markdown file. That's the whole workflow.

## Where posts live

All posts go in **`src/content/blog/`**. Each `.md` (or `.mdx`) file becomes a
page at `/blog/<filename>/`.

```
src/content/blog/my-post.md   →   /blog/my-post/
```

Use lowercase, hyphenated filenames: `using-docker-volumes.md`, not
`Using Docker Volumes.md`.

## Create a new post

1. Create a file, e.g. `src/content/blog/my-first-real-post.md`.
2. Add the frontmatter (see below).
3. Write your content in Markdown.
4. Save. It's live on your dev server at `/blog/my-first-real-post/`.

A working example already exists at `src/content/blog/getting-started.md` —
copy it as a starting template.

## Frontmatter (the metadata block)

The top of every post is wrapped in `---` and contains metadata. This is
defined and validated in `src/content.config.ts`:

```yaml
---
title: 'My post title'            # required — string
description: 'One-line summary'    # required — string (used for SEO + RSS)
pubDate: 'Aug 03 2026'            # required — a date string
updatedDate: 'Aug 10 2026'        # optional — only if you edited a live post
heroImage: '../../assets/x.jpg'   # optional — cover image (see "Images" below)
---
```

### Field rules

- **`title`** (required) — the post title.
- **`description`** (required) — a short summary; shows up in the RSS feed and
  search/social previews. Keep it to one sentence.
- **`pubDate`** (required) — publish date. Astro parses many formats, e.g.
  `'Aug 03 2026'`, `'2026-08-03'`, `'2026-08-03 12:00:00'`. Pick one and be
  consistent.
- **`updatedDate`** (optional) — add it only when you revise a published post;
  the page then shows "Last updated on …".
- **`heroImage`** (optional) — path to a cover image **relative to the post
  file**. Omit it for text-only posts (great for technical write-ups).

> If you forget a required field, `npm run build` will fail with a clear error
> telling you which field is missing from which file.

## Markdown features

The title is already rendered as an `<h1>` by the layout, so **start your body
with `##`** (an h2).

### Headings

```markdown
## A section
### A subsection
#### A sub-subsection
```

### Inline formatting

```markdown
**bold**, _italic_, `inline code`, and [a link](https://docs.astro.build).
```

### Code blocks (with syntax highlighting)

Use three backticks + a language name. Astro uses Shiki for syntax
highlighting, with zero configuration:

````markdown
```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
````

Supported languages include `js`, `ts`, `jsx`, `tsx`, `python`, `bash`, `sh`,
`json`, `yaml`, `html`, `css`, `go`, `rust`, `sql`, `dockerfile`, and many
more. Use `text` for plain, unhighlighted output.

### Lists

```markdown
- Unordered item
- Another item
  - Nested item

1. Ordered step one
2. Ordered step two
```

### Blockquotes

```markdown
> Simplicity is the soul of efficiency.
```

### Tables

```markdown
| Tool    | Use            |
| ------- | -------------- |
| Astro   | Build the site |
| Vercel  | Host the site  |
```

### Horizontal rule

Three dashes on their own line: `---`. Use it sparingly — the layout already
adds one under the title.

## Adding images

There are two ways.

### 1. Image in `public/` (simplest, no optimization)

Drop the file in `public/` (e.g. `public/diagram.png`) and reference it with an
absolute path that starts at `/`:

```markdown
![Alt text describing the image](/diagram.png)
```

These files are copied to the site as-is. For most technical posts (diagrams,
screenshots) this is the easiest option and gives you full control.

### 2. Image in `src/assets/` (optimized, recommended for photos)

Reference a file relative to the post and Astro will optimize/compress it:

```markdown
![Alt text](../../assets/my-photo.jpg)
```

You can set a `heroImage` in frontmatter the same way:

```yaml
heroImage: '../../assets/my-photo.jpg'
```

## Organizing posts into folders

You can group posts into subfolders — `src/content/blog/2026/my-post.md` — and
the loader picks them up. The URL then includes the path:
`/blog/2026/my-post/`. For a small blog, keep them flat in `src/content/blog/`.

## MDX (optional)

If you ever need to embed interactive components in a post, rename the file to
`.mdx` and you can import and use Astro/React/Vue components. For plain
technical writing, `.md` is all you need. MDX support is already installed
(`@astrojs/mdx`).

Next: [Modifying the layout →](./04-modifying-the-layout.md)
