# Episode-Based Content Navigation

## Overview

This blog now supports episode-based content navigation, allowing you to create long-form series where readers can easily navigate between chapters using "Previous Chapter" and "Next Chapter" links at the end of each post.

## How It Works

The episode navigation system automatically:
- Groups posts by `series` name
- Orders them by `episodeNumber` (or publication date as fallback)
- Shows navigation only when a post belongs to a series with multiple episodes
- Respects language boundaries (only shows episodes in the same language)

## Creating a Series

To create a series, add two optional fields to your post's frontmatter:

```markdown
---
title: 'Your Post Title'
description: 'Post description'
pubDate: '2026-08-09'
series: 'Your Series Name'           # Optional: groups posts together
episodeNumber: 1                     # Optional: orders episodes (1, 2, 3...)
tags: ['tag1', 'tag2']
translationKey: 'unique-identifier'
---
```

### Example Series Structure

**Episode 1:**
```markdown
---
title: 'Getting Started with React'
series: 'React Fundamentals Series'
episodeNumber: 1
---
```

**Episode 2:**
```markdown
---
title: 'Understanding Components'
series: 'React Fundamentals Series'
episodeNumber: 2
---
```

**Episode 3:**
```markdown
---
title: 'State and Props'
series: 'React Fundamentals Series'
episodeNumber: 3
---
```

## Navigation Behavior

The navigation component automatically handles these scenarios:

| Scenario | Behavior |
|----------|----------|
| Post has no `series` field | No navigation shown |
| Series has only 1 episode | No navigation shown |
| First episode in series | Shows only "Next Chapter" link |
| Last episode in series | Shows only "Previous Chapter" link |
| Middle episode | Shows both "Previous" and "Next" links |
| Missing `episodeNumber` | Falls back to publication date for ordering |

## Bilingual Support

Series work independently in each language:

- Persian series (`fa/`) won't mix with English series (`en/`)
- Each language maintains its own episode ordering
- Navigation links stay within the same language

## Example Series

This blog includes a complete example series: **"React Server Components Series"** (English and Persian versions):

### English Episodes
1. [Understanding React Server Components](/en/blog/react-series-1/)
2. [Data Fetching Patterns with RSC](/en/blog/react-series-2/)
3. [Combining Server and Client Components](/en/blog/react-series-3/)

### Persian Episodes
1. [درک کامپوننت‌های سرور React](/blog/react-series-1/)
2. [الگوهای واکشی داده با RSC](/blog/react-series-2/)
3. [ترکیب کامپوننت‌های سرور و کلاینت](/blog/react-series-3/)

## Design Details

### Visual Layout

The navigation appears at the bottom of each post, between the content and the footer:

```
┌──────────────────────────────────────────┐
│  ← Previous Chapter        Next Chapter →│
│                                          │
│  [Episode badge]  Post title             │
│  #2                   Understanding...   │
└──────────────────────────────────────────┘
```

### Features

- **Responsive**: Stacks vertically on mobile, side-by-side on desktop
- **RTL-aware**: Proper alignment for Persian (right-to-left) layout
- **Episode badges**: Shows episode number (e.g., #1, #2, #3)
- **Hover effects**: Smooth transitions with accent color highlighting
- **Accessible**: Semantic HTML with ARIA labels

### Styling

The navigation uses existing design tokens:
- Accent colors for badges and hover states
- Border and background colors matching the blog theme
- Logical CSS properties for RTL/LTR support
- Consistent spacing and typography

## Technical Implementation

### Schema Changes

Two new optional fields added to `src/content.config.ts`:
- `series: z.string().optional()`
- `episodeNumber: z.number().optional()`

### Component Architecture

1. **EpisodeNavigation.astro** (`src/components/EpisodeNavigation.astro`)
   - Receives the current post as a prop
   - Queries all posts in the same series and language
   - Sorts by episode number or publication date
   - Returns navigation cards or null

2. **BlogPost.astro** (`src/layouts/BlogPost.astro`)
   - Imports and renders `EpisodeNavigation` after post content
   - Passes the full post object to the component

3. **Translation keys** added to `src/i18n/ui.ts`:
   - `episode.previous` / `episode.next` (both languages)
   - `episode.series` (both languages)

## Tips for Writing Series

1. **Consistent naming**: Use the exact same `series` name across all episodes
2. **Sequential numbering**: Use whole numbers (1, 2, 3) for clear ordering
3. **Update dates**: Publish episodes in order for best results
4. **Cross-reference**: Link to other episodes in your content when relevant
5. **Cover images**: Add `image` field to each episode for social sharing

## Backward Compatibility

- All existing posts without `series` or `episodeNumber` fields continue to work normally
- No breaking changes to existing content
- Feature is completely opt-in
