# Architecture Patterns

**Project:** Road to Fi Website
**Researched:** 2026-04-26
**Confidence:** HIGH (based on Next.js official documentation via Context7)

## Recommended Architecture

### Directory Structure (App Router)

```
road2fi/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (html, body, fonts, metadata)
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles + Tailwind
│   ├── blog/
│   │   ├── page.tsx              # Blog list view
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post
│   └── gen/
│       └── page.tsx              # Hidden blog generator (/gen)
├── components/                   # Reusable UI components
│   ├── ui/                       # Primitive UI (Button, Card, etc.)
│   ├── layout/                   # Layout components (Header, Footer, Nav)
│   ├── blog/                     # Blog-specific components
│   └── home/                     # Homepage-specific components
├── content/                      # Markdown blog posts
│   └── posts/                    # *.md files with frontmatter
├── lib/                          # Utilities and data access
│   ├── posts.ts                  # Markdown reading/parsing
│   └── utils.ts                  # Helper functions
├── lib/posts.ts                  # Content layer (fs reads, gray-matter, compile)
```

### Component Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│                        app/layout.tsx                           │
│  (Root layout: html/body, fonts, global nav, footer)           │
└─────────────────────────────────────────────────────────────────┘
         │
         ├── app/page.tsx ──────────► components/home/
         │                                  (HeroSection, ValueProps,
         │                                   AboutPreview, FooterCTA)
         │
         ├── app/blog/page.tsx ──────► components/blog/
         │                                  (PostCard, PostList)
         │
         ├── app/blog/[slug]/page.tsx ─► components/blog/
         │                                  (PostContent, TOC, ShareButtons)
         │
         └── app/gen/page.tsx ────────► components/gen/
                                           (GeneratorForm, PreviewPanel)
```

**Component communication rules:**
- `app/page.tsx` (Server Component) fetches data, passes to child components
- Interactive components (`'use client'`) receive data via props, never fetch directly in page
- `/gen` page uses Server Actions for form submission and content generation
- Markdown reading happens in `lib/posts.ts`, called from Server Components

### Data Flow

```
Content Flow (Blog Posts):
─────────────────────────

content/posts/*.md
        │
        ▼ (fs.readFile)
lib/posts.ts (gray-matter + MDX compilation)
        │
        ▼ (parsed frontmatter + compiled MDX)
app/blog/[slug]/page.tsx (Server Component)
        │
        ▼ (props)
components/blog/PostContent.tsx ('use client' if interactive)
```

```
Generation Flow (/gen):
──────────────────────

User Input (URL)
       │
       ▼ (form submission)
app/gen/page.tsx (Server Action)
       │
       ▼ (scraping + LLM generation)
lib/generator.ts (content processing)
       │
       ▼ (write to fs)
content/posts/new-post.md
```

```
Page Data Flow (Homepage):
──────────────────────────

app/page.tsx (Server Component)
       │
       ├── getStaticProps equivalent (none needed - static content)
       │
       ▼ (pass as props)
components/home/HeroSection.tsx
       │
components/home/ValueProps.tsx
       │
       ...
```

## Key Patterns to Follow

### Pattern 1: Static Generation for Blog Posts

**What:** Blog post pages are statically generated at build time using `generateStaticParams`.

**When:** All blog posts known at build time (Markdown files in repo).

**Implementation:**
```typescript
// app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return <PostContent post={post} />;
}
```

### Pattern 2: Server Component Data Fetching

**What:** Data fetching happens in Server Components, passed to Client Components as props.

**When:** Any page that needs data before rendering.

**Implementation:**
```typescript
// app/blog/page.tsx (Server Component)
import { getAllPosts } from '@/lib/posts';
import PostList from '@/components/blog/PostList';

export default async function BlogPage() {
  const posts = await getAllPosts();  // Direct async/await in Server Component
  return <PostList posts={posts} />;
}
```

### Pattern 3: Content Layer Separation

**What:** Markdown reading/parsing isolated in `lib/posts.ts`, not in page components.

**When:** Any content-driven site with Markdown storage.

**Implementation:**
```typescript
// lib/posts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export async function getAllPosts() {
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return { slug, data, content };
  });
  return posts.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}
```

### Pattern 4: Server Actions for Form Mutations

**What:** Use `'use server'` Server Actions for `/gen` form submission instead of API routes.

**When:** Form submissions that write to filesystem or call external APIs.

**Implementation:**
```typescript
// app/actions.ts
'use server';

export async function generateBlogPost(formData: FormData) {
  const url = formData.get('url') as string;
  // Scrape, generate, write to content/posts/
}
```

```typescript
// app/gen/page.tsx
import { generateBlogPost } from '@/app/actions';

export default function GeneratorPage() {
  return <form action={generateBlogPost}>...</form>;
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: Client Component Data Fetching

**What:** Using `useEffect` + `fetch` in Client Components to load blog posts.

**Why bad:** Causes hydration issues, hurts SEO, slower LCP.

**Instead:** Fetch in Server Component, pass as props.

### Anti-Pattern 2: Mixing API Routes with Server Actions

**What:** Creating `/api/generate` route handler for blog generation.

**Why bad:** Server Actions are more idiomatic in App Router, better type safety.

**Instead:** Use `'use server'` functions directly in forms.

### Anti-Pattern 3: Inline Markdown Parsing in Pages

**What:** Parsing Markdown directly in page components.

**Why bad:** Violates separation of concerns, harder to test/cache.

**Instead:** Keep all parsing in `lib/posts.ts`.

## Scalability Considerations

| Concern | At 10 Posts | At 100 Posts | At 1000 Posts |
|---------|-------------|--------------|---------------|
| Build time | ~2s | ~5s | ~30s |
| Strategy | `generateStaticParams` works | Still fine, consider incremental | Consider `dynamic = 'force-dynamic'` + caching |
| Images | Static imports | `next/image` + loader | CDN + proper sizing |

**Note:** For a personal blog with Markdown storage, `generateStaticParams` will scale well past 1000 posts. The filesystem read is fast. Build time may become a concern at extreme scale, but this is unlikely for a personal investment blog.

## Build Order (Dependencies)

```
Phase 1: Foundation
├── Set up Next.js project with App Router + TypeScript + Tailwind
├── Create app/layout.tsx (root layout, fonts, metadata)
├── Create lib/posts.ts (content layer)
└── Create basic app/page.tsx (placeholder)

Phase 2: Core Marketing Pages
├── components/layout/Header.tsx
├── components/layout/Footer.tsx
├── app/page.tsx (full homepage)
└── globals.css (FIRE theme variables)

Phase 3: Blog System
├── content/posts/*.md (initial posts)
├── app/blog/page.tsx (list view)
├── app/blog/[slug]/page.tsx (individual posts)
└── components/blog/* (PostCard, PostContent)

Phase 4: Generator (Hidden /gen)
├── lib/generator.ts (scrape + LLM logic)
├── app/actions.ts (Server Action)
├── app/gen/page.tsx (generator UI)
└── Test full flow: URL → Markdown → saved post

Phase 5: Polish
├── SEO metadata per page
├── OpenGraph images
├── Sitemap generation
└── Performance optimization
```

**Dependency rationale:**
- Content layer (`lib/posts.ts`) must exist before blog pages
- Layout components needed for homepage
- Server Actions depend on content layer writing logic
- Generator UI is last because it depends on everything else working

## Sources

- [Next.js App Router Documentation](https://nextjs.org/docs/app) (Context7 ID: /llmstxt/nextjs_llms_txt)
- [Layouts and Pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Static Generation with generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- [MDX Integration](https://nextjs.org/docs/app/guides/mdx)