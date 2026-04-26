# Roadmap: Road to Fi Website

## Overview

A marketing website and blog for a personal investment firm helping ordinary people achieve Financial Independence. The journey spans from project foundation through a complete blog system and hidden content generator, ending with a polished, SEO-ready site ready for launch.

## Phases

- [x] **Phase 1: Foundation** — Project setup, layout infrastructure, content layer — *2026-04-26*
- [ ] **Phase 2: Marketing Pages** - Homepage with hero, philosophy, about, header/footer
- [ ] **Phase 3: Blog System** - Blog list page and individual post pages with Markdown rendering
- [ ] **Phase 4: Content Generator** - Hidden /gen page for AI-powered blog post creation

## Phase Details

### Phase 1: Foundation
**Goal**: Complete project scaffolding with Next.js 16, TypeScript, Tailwind v4, and working content layer
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. Running Next.js dev server with hot reload works without errors
  2. Site displays global layout with header and footer on all pages
  3. Markdown files in /content/posts/ are read and parsed correctly (frontmatter extracted)
  4. Typography renders using configured Google Fonts (no external font requests)
  5. No TypeScript errors in the codebase

**Plans**: 5 plans

Plans:
- [x] 01-01: Initialize Next.js 16 project with App Router and TypeScript
- [x] 01-02: Configure Tailwind CSS v4 with CSS-based configuration
- [x] 01-03: Set up global layout with navigation header and footer
- [x] 01-04: Create content layer (lib/posts.ts) for reading Markdown files with frontmatter
- [x] 01-05: Configure next/font for typography with self-hosted Google Fonts

### Phase 2: Marketing Pages
**Goal**: Homepage with hero section, investment philosophy, About Us, and global navigation footer
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04
**Success Criteria** (what must be TRUE):
  1. Homepage displays hero section with headline, subheadline, and call-to-action button
  2. Homepage displays investment philosophy section with 3-4 value investing principles
  3. Homepage displays "About Us" section with founder story and firm background
  4. Navigation header appears on all pages with links to key sections
  5. Footer appears on all pages with contact info, copyright, and essential links

**Plans**: 4 plans

Plans:
- [ ] 02-01: Build homepage hero section with headline, subheadline, and call-to-action
- [ ] 02-02: Build investment philosophy section with 3-4 value investing principles
- [ ] 02-03: Build "About Us" section with founder story and firm background
- [ ] 02-04: Build navigation header and footer with proper links and styling

### Phase 3: Blog System
**Goal**: Blog listing page and individual post pages with full Markdown rendering
**Depends on**: Phase 1 (content layer)
**Requirements**: BLOG-01, BLOG-02, BLOG-03, BLOG-04, BLOG-05, BLOG-06
**Success Criteria** (what must be TRUE):
  1. Blog list page accessible at /blog with posts sorted by date (newest first)
  2. Blog list displays each post with thumbnail image, title, excerpt (first 150 chars), and publish date
  3. Individual blog posts accessible at /blog/[slug] with full article content
  4. Blog posts render with proper typography: headings, paragraphs, lists, code blocks
  5. Blog list and post pages are fully responsive on mobile devices

**Plans**: 6 plans

Plans:
- [ ] 03-01: Build blog list page at /blog with posts sorted by date
- [ ] 03-02: Build PostCard component displaying thumbnail, title, excerpt, and date
- [ ] 03-03: Build individual blog post page at /blog/[slug] with generateStaticParams
- [ ] 03-04: Create sample Markdown posts with proper frontmatter (title, date, excerpt, thumbnail, slug)
- [ ] 03-05: Configure Markdown renderer with proper typography styling
- [ ] 03-06: Ensure responsive design for blog list and post pages

### Phase 4: Content Generator
**Goal**: Hidden /gen page for AI-powered blog post generation from URLs
**Depends on**: Phase 3 (blog system infrastructure, content/posts/ directory)
**Requirements**: GEN-01, GEN-02, GEN-03, GEN-04, GEN-05, GEN-06, GEN-07, GEN-08, GEN-09, GEN-10
**Success Criteria** (what must be TRUE):
  1. Hidden /gen page accessible at /gen (not linked in navigation)
  2. No authentication required to access /gen page
  3. URL input field accepts YouTube video URLs and article URLs
  4. Server-side scraping extracts content from submitted URLs
  5. OpenAI-compatible API generates structured blog article in first-person founder voice
  6. Generated article is saved as new Markdown file in /content/posts/ with frontmatter
  7. Loading state displayed during generation process
  8. Preview of generated content shown before saving

**Plans**: 5 plans

Plans:
- [ ] 04-01: Build hidden /gen page with URL input form (no nav link)
- [ ] 04-02: Implement server-side URL scraping for YouTube and article URLs
- [ ] 04-03: Integrate OpenAI-compatible API for LLM content generation
- [ ] 04-04: Build article generation logic (first-person voice, structured format, thumbnail extraction)
- [ ] 04-05: Build preview panel and save functionality (Markdown file creation)

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 5/5 | Complete | 2026-04-26 |
| 2. Marketing Pages | 0/4 | Not started | - |
| 3. Blog System | 0/6 | Not started | - |
| 4. Content Generator | 0/5 | Not started | - |