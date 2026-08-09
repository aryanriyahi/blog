---
title: 'Combining Server and Client Components'
description: 'Master the art of mixing Server and Client Components for the best of both worlds.'
pubDate: '2026-08-05'
tags: ['react', 'server-components', 'client-components']
series: 'React Server Components Series'
episodeNumber: 3
translationKey: 'rsc-series-3'
image: '/og/rsc-3-en.png'
---

This is the final episode in our React Server Components series. We'll learn how to effectively combine server and client components.

## The "use client" Directive

To create a Client Component, add the `'use client'` directive at the top:

```typescript
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## Composition Patterns

Server Components can import and render Client Components, but not vice versa. This creates a natural boundary.

## Conclusion

You've now completed the React Server Components series! You should have a solid understanding of:

- ✅ What RSC are and why they matter
- ✅ Data fetching patterns
- ✅ Mixing server and client components

Keep experimenting with these patterns in your next project!
