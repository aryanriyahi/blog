# Open Graph (OG) Image Implementation

## ✅ Implementation Complete

Open Graph images have been successfully added to your blog for better social media sharing.

## What Was Implemented

### 1. **OG Meta Tags** (BaseHead.astro)
   - Added Open Graph tags for Facebook/LinkedIn
   - Added Twitter Card tags
   - Dynamic `og:image` and `twitter:image` based on page/post

### 2. **Image Support Throughout the Stack**
   - **BaseHead.astro**: Accepts `image` prop and outputs OG meta tags
   - **BaseLayout.astro**: Passes image prop through to BaseHead (defaults to `/og.png`)
   - **BlogPost.astro**: Uses language-specific OG images automatically
   - **content.config.ts**: Added optional `image` field to blog schema

### 3. **Automatic OG Image Generation**
   - Created 10 OG images (1200×630px) for all existing posts
   - Persian versions: `*-fa.png`
   - English versions: `*-en.png`
   - Stored in `/public/og/`

### 4. **Language Detection**
   - Created utility function `getOGImage()` in `src/utils/og.ts`
   - Automatically selects correct language version based on post language
   - Falls back to default `/og.png` if no custom image specified

### 5. **Documentation**
   - Created comprehensive guide: `docs/OG-IMAGES.md`
   - Includes usage, best practices, and troubleshooting

## Generated OG Images

```
public/og/
├── usage-fa.png (44KB)
├── usage-en.png (50KB)
├── markdown-guide-fa.png (52KB)
├── markdown-guide-en.png (51KB)
├── customization-fa.png (44KB)
├── customization-en.png (40KB)
├── installation-fa.png (35KB)
├── installation-en.png (36KB)
├── getting-started-fa.png (37KB)
└── getting-started-en.png (37KB)
```

## Files Modified

1. `src/components/BaseHead.astro` - Added OG/Twitter meta tags
2. `src/layouts/BaseLayout.astro` - Added image prop support
3. `src/layouts/BlogPost.astro` - Added OG image handling with language detection
4. `src/content.config.ts` - Added optional `image` field to schema
5. `src/pages/[...lang]/blog/[...slug].astro` - Pass image prop to layout
6. `src/pages/[...lang]/index.astro` - Set default OG image for homepage
7. `src/utils/og.ts` - Created utility for OG image selection
8. All blog posts - Added image field to frontmatter
9. `docs/OG-IMAGES.md` - Created comprehensive documentation

## How It Works

### For Blog Posts
Each post automatically gets the correct OG image based on its language:
- Persian posts → `post-slug-fa.png`
- English posts → `post-slug-en.png`

### For Other Pages
Homepage and other pages use the default `/og.png`

### Custom OG Images
You can override the automatic selection by adding an `image` field in frontmatter:
```yaml
---
title: 'My Post'
image: '/custom-og-image.png'
---
```

## Testing

Build completed successfully: ✅
- All 39 pages built
- OG meta tags verified in generated HTML
- Persian posts: `/og/usage-fa.png`
- English posts: `/og/usage-en.png`
- Homepage: `/og.png`

## Next Steps

1. **Test on Social Media**:
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/

2. **Customize if needed**:
   - Edit the generator script at `/tmp/generate_og_images.py`
   - Re-run to regenerate with different styling
   - Or create custom images manually in `/public/og/`

3. **For new posts**:
   - Add `image: '/og/post-slug-fa.png'` to Persian posts
   - Add `image: '/og/post-slug-en.png'` to English posts
   - Or leave it out to use the automatic language detection

## Notes

- OG images are 1200×630px (standard Open Graph size)
- PNG format for optimal quality
- Dark theme matching blog branding
- Includes logo, title, description, and site name
- Automatic language detection built-in

---

**Status**: ✅ Complete and tested
**Date**: August 6, 2026
