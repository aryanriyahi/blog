---
title: 'الگوهای واکشی داده با RSC'
description: 'یادگیری استراتژی‌های پیشرفته واکشی داده با استفاده از کامپوننت‌های سرور React و کامپوننت‌های async.'
pubDate: '2026-08-03'
tags: ['react', 'server-components', 'data-fetching']
series: 'سری کامپوننت‌های سرور React'
episodeNumber: 2
translationKey: 'rsc-series-2'
image: '/og/rsc-2-fa.png'
---

به قسمت دوم سری کامپوننت‌های سرور React خوش آمدید. امروز به بررسی نحوه واکشی کارآمد داده در دنیای RSC می‌پردازیم.

## کامپوننت‌های Async به عنوان واکشی‌گرهای داده

با RSC، کامپوننت‌ها می‌توانند توابع async باشند که به طور مستقیم داده را واکشی می‌کنند:

```typescript
async function BlogPost({ id }: { id: string }) {
  const post = await db.post.findUnique({ where: { id } });
  return <article>{post.content}</article>;
}
```

## واکشی موازی در مقابل ترتیبی

درک اینکه چه زمانی داده را به صورت موازی و چه زمانی به صورت ترتیبی واکشی کنید، برای عملکرد بهینه ضروری است.

## بعد از این

در قسمت پایانی، به ترکیب **RSC با کامپوننت‌های کلاینت** برای الگوهای UI تعاملی می‌پردازیم.
