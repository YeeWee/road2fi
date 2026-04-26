# Requirements: Road to Fi Website

**Defined:** 2026-04-26
**Core Value:** Help people understand and pursue Financial Independence through clear, actionable investment insights delivered with authenticity and trust.

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Initialize Next.js 16 project with App Router and TypeScript
- [ ] **FOUND-02**: Configure Tailwind CSS v4 with CSS-based configuration
- [ ] **FOUND-03**: Set up global layout with navigation header and footer
- [ ] **FOUND-04**: Create content layer (lib/posts.ts) for reading Markdown files with frontmatter
- [ ] **FOUND-05**: Configure next/font for typography (self-hosted Google Fonts)

### Marketing Pages

- [ ] **HOME-01**: Homepage hero section with headline, subheadline, and call-to-action
- [ ] **HOME-02**: Investment philosophy section with 3-4 value investing principles
- [ ] **HOME-03**: "About Us" section with founder story and firm background
- [ ] **HOME-04**: Footer with contact info, copyright, and essential links

### Blog System

- [ ] **BLOG-01**: Blog list page at /blog with posts sorted by date (newest first)
- [ ] **BLOG-02**: Blog list displays: thumbnail image, title, excerpt (first 150 chars), publish date
- [ ] **BLOG-03**: Individual blog post page at /blog/[slug] with full article content
- [ ] **BLOG-04**: Blog posts stored as .md files in /content/posts/ with frontmatter (title, date, excerpt, thumbnail, slug)
- [ ] **BLOG-05**: Markdown rendered with proper typography, headings, lists, and code blocks
- [ ] **BLOG-06**: Responsive design for blog list and post pages

### Content Generator

- [ ] **GEN-01**: Hidden blog generator page at /gen (not linked in navigation)
- [ ] **GEN-02**: URL input field accepting YouTube video URLs and article URLs
- [ ] **GEN-03**: Server-side content scraping from submitted URLs
- [ ] **GEN-04**: OpenAI-compatible API integration for LLM content generation
- [ ] **GEN-05**: Generate structured blog article in first-person founder voice
- [ ] **GEN-06**: Extract thumbnail/main image from source URL
- [ ] **GEN-07**: Save generated article as new Markdown file with frontmatter
- [ ] **GEN-08**: Display loading state during generation
- [ ] **GEN-09**: Preview generated content before saving
- [ ] **GEN-10**: No authentication required to access /gen

## v2 Requirements

### SEO & Performance

- **SEO-01**: Sitemap.xml generation
- **SEO-02**: robots.txt configuration
- **SEO-03**: Open Graph meta tags for social sharing
- **SEO-04**: Canonical URL tags on all pages

### Content Enhancement

- **CONT-01**: Reading time estimate on blog posts
- **CONT-02**: Related posts section at bottom of articles
- **CONT-03**: Category/tags system for blog posts

## Out of Scope

| Feature | Reason |
|---------|--------|
| User authentication/login | Personal site, no user accounts needed |
| Email newsletter subscription | Defer until content audience established |
| Investment portfolio display | Compliance and maintenance burden |
| Public comments on blog posts | Spam management, defer to v2+ |
| Analytics/tracking dashboard | Simple page views sufficient for now |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | 1 | Pending |
| FOUND-02 | 1 | Pending |
| FOUND-03 | 1 | Pending |
| FOUND-04 | 1 | Pending |
| FOUND-05 | 1 | Pending |
| HOME-01 | 2 | Pending |
| HOME-02 | 2 | Pending |
| HOME-03 | 2 | Pending |
| HOME-04 | 2 | Pending |
| BLOG-01 | 3 | Pending |
| BLOG-02 | 3 | Pending |
| BLOG-03 | 3 | Pending |
| BLOG-04 | 3 | Pending |
| BLOG-05 | 3 | Pending |
| BLOG-06 | 3 | Pending |
| GEN-01 | 4 | Pending |
| GEN-02 | 4 | Pending |
| GEN-03 | 4 | Pending |
| GEN-04 | 4 | Pending |
| GEN-05 | 4 | Pending |
| GEN-06 | 4 | Pending |
| GEN-07 | 4 | Pending |
| GEN-08 | 4 | Pending |
| GEN-09 | 4 | Pending |
| GEN-10 | 4 | Pending |

**Coverage:**
- v1 requirements: 25 total
- Mapped to phases: 25
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-26*
*Last updated: 2026-04-26 after initial definition*