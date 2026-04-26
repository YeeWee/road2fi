# Technology Stack

**Project:** Road to Fi Website
**Domain:** Marketing website with blog
**Researched:** 2026-04-26
**Confidence:** HIGH

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 16.x (latest) | Full-stack React framework | App Router is default, built-in TypeScript, image optimization, font optimization, metadata API. Turbopack is now default bundler for faster DX. |
| React | 19.x | UI library | Next.js App Router uses React canary releases built-in. Declare in package.json for ecosystem compatibility. |
| TypeScript | 5.1+ | Type safety | Next.js has first-class TypeScript support with custom plugin for IDE intellisense. Minimum v5.1.0 required for async Server Components. |

### Styling

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | 4.x (latest) | Utility-first CSS | v4 uses CSS-based configuration (`@import "tailwindcss"`) instead of tailwind.config.js. CSS-based theming integrates better with `next/font` CSS variables. Requires Node.js 20+. |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Replaces the v3 `tailwindcss` PostCSS plugin. |
| @tailwindcss/typography | 0.5.x | Prose styling for MDX | Adds `prose` classes for beautiful typographic styles in markdown content. Essential for blog content. |

### Content

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| @next/mdx | 16.x | MDX compilation | Built-in MDX support for Next.js. Allows `.mdx` files as pages/routes with React component embedding. Supports Server Components. |
| @mdx-js/loader | 3.x | MDX webpack loader | Required by @next/mdx for transforming MDX content. |
| @mdx-js/react | 3.x | MDX React integration | Provides `useMDXComponents` hook for global component overrides. |
| remark-frontmatter | 5.x | YAML frontmatter parsing | Add frontmatter support for blog post metadata (title, date, author, etc.). |
| remark-gfm | 4.x | GitHub Flavored Markdown | Tables, strikethrough, task lists support. |

### Performance & SEO

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| next/font | built-in | Optimized font loading | Automatically self-hosts Google Fonts, eliminates external network requests, prevents layout shift. Use with `variable` option for Tailwind integration. |
| next/image | built-in | Image optimization | Automatic resizing, format conversion (WebP/AVIF), lazy loading. Requires `remotePatterns` config for external images. |
| next/metadata | built-in | SEO metadata | Export `Metadata` object or `generateMetadata` function for `<head>` tags, OG images, sitemap generation. |

### Linting

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ESLint | 9.x | Code linting | Next.js default. Use `eslint.config.mjs` for flat config format. Starting Next.js 16, `next build` no longer runs linter automatically. |

## Installation

```bash
# Create Next.js project with defaults (TypeScript, Tailwind, ESLint, App Router, Turbopack)
npx create-next-app@latest road2fi --yes

cd road2fi

# Install MDX dependencies
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx

# Install MDX plugins for frontmatter and GFM
npm install remark-frontmatter remark-gfm

# Install Tailwind CSS v4 (if not already included)
npm install tailwindcss @tailwindcss/postcss postcss

# Install typography plugin for prose styling
npm install @tailwindcss/typography
```

## Configuration Files

### postcss.config.mjs (Tailwind v4)
```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
}
```

### app/globals.css (Tailwind v4)
```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
  --font-mono: var(--font-roboto-mono);
}
```

### next.config.mjs (MDX)
```javascript
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

### mdx-components.tsx (required for App Router)
```typescript
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {}

export function useMDXComponents(): MDXComponents {
  return components
}
```

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| CSS-in-JS | Tailwind CSS | Styled Components, Emotion | Overkill for marketing site. Runtime overhead. Tailwind v4 CSS-based config is competitive with CSS-in-JS DX. |
| Content MDX | @next/mdx | Contentlayer, Velite | @next/mdx is built-in, zero-config with App Router. External content pipeline adds complexity. |
| Font loading | next/font | Google Fonts CDN, @font-face | next/font self-hosts automatically, eliminates external requests, prevents CLS. |
| Image CDN | next/image | Cloudinary, Imgix | next/image is free, built-in, works locally. No third-party dependency for basic optimization. |

## Anti-Patterns to Avoid

1. **Do not use Pages Router** — App Router is the default and recommended. Server Components, streaming, and metadata API are App Router only.

2. **Do not use Tailwind v3 config format with v4** — v4 uses CSS-based `@theme` configuration, not `tailwind.config.js`. The upgrade tool (`npx @tailwindcss/upgrade`) handles migration.

3. **Do not disable TypeScript errors in production** — `ignoreBuildErrors: true` is dangerous. Run `tsc --noEmit` in CI instead.

4. **Do not use external image sources without `remotePatterns`** — next/image will block external URLs unless configured. Add to `next.config.mjs`.

5. **Do not load fonts via Google Fonts CDN** — Use `next/font/google` instead. Browser won't send requests to Google, improves privacy and performance.

## Source References

- [Next.js Installation Guide](https://nextjs.org/docs/app/getting-started/installation) (v16.2.4, 2026-04-23)
- [Tailwind CSS v4 with Next.js](https://tailwindcss.com/docs/upgrade-guide) (2026-04)
- [MDX with Next.js](https://nextjs.org/docs/app/guides/mdx) (v16.2.4, 2026-04-23)
- [next/font API](https://nextjs.org/docs/app/api-reference/components/font) (v16.2.4, 2026-04-23)
- [next/image API](https://nextjs.org/docs/app/api-reference/components/image) (v16.2.4, 2026-04-23)
- [Metadata and OG Images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) (v16.2.4, 2026-04-23)
