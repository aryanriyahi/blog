---
title: 'Understanding React Server Components'
description: 'An introduction to React Server Components and how they change the way we build React applications.'
pubDate: '2026-08-01'
tags: ['react', 'server-components', 'frontend']
series: 'React Server Components Series'
episodeNumber: 1
translationKey: 'rsc-series-1'
image: '/og/rsc-1-en.png'
---

React Server Components (RSC) represent a paradigm shift in how we build React applications. In this first episode of the series, we'll explore the fundamentals of RSC and why they matter.

## What Are React Server Components?

React Server Components allow you to render components exclusively on the server, reducing the JavaScript bundle sent to the client. This means:

- **Zero client-side JavaScript** for server-only components
- **Direct database access** without API routes
- **Automatic code splitting** at the component level

## Key Benefits

Server Components can dramatically improve performance by keeping large dependencies on the server. Your users download less JavaScript, and your app feels faster.

## Looking Ahead

In the next episode, we'll dive deeper into **data fetching patterns** with RSC and how to combine them with Client Components for interactive experiences.
