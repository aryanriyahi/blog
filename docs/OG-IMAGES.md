# Open Graph (OG) Images

This blog supports Open Graph images for better social media sharing on Facebook, Twitter, LinkedIn, and other platforms.

## Overview

OG images are automatically generated for all blog posts with:
- **Dimensions**: 1200×630 pixels (standard OG size)
- **Format**: PNG with optimized quality
- **Languages**: Separate images for Persian (fa) and English (en) versions
- **Branding**: Includes logo, site name, and accent colors

## How It Works

### 1. Automatic Generation

All existing blog posts have been automatically assigned OG images in `/public/og/`:

```
public/og/
├── usage-fa.png
├── usage-en.png
├── markdown-guide-fa.png
├── markdown-guide-en.png
├── customization-fa.png
├── customization-en.png
├── installation-fa.png
├── installation-en.png
└── getting-started-fa.png
```

### 2. Frontmatter Configuration

Each blog post can specify a custom OG image in its frontmatter:

```yaml
---
title: 'Your Post Title'
description: 'Your post description'
pubDate: '2026-01-01'
image: '/og/custom-image-fa.png'  # Optional: custom OG image
---
```

**Note**: The `image` field is optional. If not specified, the system will:
1. Try to find a language-specific version (e.g., `post-fa.png` or `post-en.png`)
2. Fall back to the default `/og.png`

### 3. Language-Specific Images

The system automatically selects the correct language version based on the post's language:

- **Persian posts (lang='fa')**: Uses `*-fa.png`
- **English posts (lang='en')**: Uses `*-en.png`

## Meta Tags

The following Open Graph and Twitter Card meta tags are automatically added to every page:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://yourblog.com/post" />
<meta property="og:title" content="Post Title" />
<meta property="og:description" content="Post description" />
<meta property="og:image" content="https://yourblog.com/og/post-fa.png" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="Post Title" />
<meta property="twitter:description" content="Post description" />
<meta property="twitter:image" content="https://yourblog.com/og/post-fa.png" />
```

## Creating Custom OG Images

### Option 1: Use the Generator Script

A Python script is provided at `/tmp/generate_og_images.py` that can generate OG images with your blog's branding.

To regenerate images:
```bash
python3 /tmp/generate_og_images.py
```

### Option 2: Create Manually

Design your OG images with these specifications:
- **Dimensions**: 1200×630 pixels
- **Format**: PNG
- **Background**: Dark theme (#1f2538)
- **Include**: Logo, title, description, site name
- **Save to**: `/public/og/[post-slug]-[lang].png`

### Option 3: Use Online Tools

Tools like [Canva](https://www.canva.com/) or [Figma](https://www.figma.com/) can create OG images:
1. Create a 1200×630 canvas
2. Add your blog's branding
3. Export as PNG
4. Save to `/public/og/`

### Compress

Use this command to compress image and reduce it size

```bash
pngquant --quality=80-90 --ext -compressed.png serverless-1-og-en.png
```

### Resize
Use this command to change picture dimensions

```bash
convert input.jpg -resize 1200x630^ -gravity center -extent 1200x630 output.jpg
```

## Best Practices

1. **Keep text readable**: Use large, clear fonts (minimum 32px)
2. **High contrast**: Ensure text stands out against the background
3. **Brand consistency**: Use the same colors and logo across all images
4. **Test on social platforms**: Preview how images look on Facebook, Twitter, LinkedIn
5. **File size**: Keep images under 8MB for optimal loading

## Testing

To test OG images:

1. **Facebook Debugger**:
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter your post URL
   - Click "Debug" to see how Facebook reads your OG tags

2. **Twitter Card Validator**:
   - Visit: https://cards-dev.twitter.com/validator
   - Enter your post URL
   - Preview how the card appears

3. **LinkedIn Post Inspector**:
   - Visit: https://www.linkedin.com/post-inspector/
   - Enter your URL
   - Check how LinkedIn displays your content

## Troubleshooting

### Image not showing on social media?

1. **Clear cache**: Social platforms cache OG data. Use their debuggers to refresh.
2. **Check file path**: Ensure the image path is correct and starts with `/`
3. **Verify file exists**: Make sure the PNG file exists in `/public/og/`
4. **Check file size**: Images must be under 8MB
5. **Use absolute URLs**: Some platforms prefer `https://yourdomain.com/og/image.png`

### Images look blurry?

- Ensure you're using 1200×630 dimensions
- Use high-quality PNG format
- Avoid heavy compression

## File Structure

```
public/
├── og.png                    # Default OG image (used for homepage)
├── og/
│   ├── [post-slug]-fa.png   # Persian version
│   └── [post-slug]-en.png   # English version
└── ...
```
