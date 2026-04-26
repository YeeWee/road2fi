# Project Research Summary

**Project:** Road to Fi Website
**Domain:** Marketing website with blog (FIRE finance niche)
**Researched:** 2026-04-26
**Confidence:** HIGH (Stack/Architecture), MEDIUM-HIGH (Features/Pitfalls)

## Executive Summary

Road to Fi is a marketing website for a personal investment firm focused on FIRE (Financial Independence, Retire Early) principles. The site combines a marketing presence (homepage, about page) with a content blog, and includes a proprietary hidden content generator (/gen) for streamlined blog post creation. This is a Next.js 16 project with App Router, TypeScript, Tailwind CSS v4, and MDX for content management.

The recommended approach is a 5-phase build: Foundation (project setup, layout, content layer), Core Marketing (homepage, navigation), Blog System (posts, components), Generator (/gen hidden page), and Polish (SEO, performance). The critical insight is that this is not just a static marketing site -- the hidden /gen page is the proprietary workflow differentiator, but requires strict scope discipline to avoid feature creep.

Key risks identified through research: (1) thin/unoriginal AI-generated content destroying credibility in an niche with established authorities, (2) build time explosion at 100+ posts if architecture is not designed for incremental static generation, and (3) scope creep on the /gen feature turning a simple content generator into a full CMS. Mitigation strategies are documented for each critical pitfall.

## Key Findings

### Recommended Stack

**Core technologies:**
- **Next.js 16.x (App Router)**: Default and recommended. Server Components, streaming, and metadata API are App Router only. Turbopack is now default bundler for faster DX.
- **TypeScript 5.1+**: First-class Next.js support. Minimum v5.1.0 required for async Server Components.
- **Tailwind CSS v4**: CSS-based configuration (`@import "tailwindcss"`) instead of tailwind.config.js. Integrates with `next/font` CSS variables. Requires Node.js 20+.
- **@next/mdx + remark-frontmatter**: Built-in MDX support with frontmatter for blog post metadata (title, date, author).
- **next/font (built-in)**: Automatically self-hosts Google Fonts, eliminates external network requests, prevents layout shift.
- **next/image (built-in)**: Automatic resizing, format conversion (WebP/AVIF), lazy loading. Requires `remotePatterns` config for external images.

### Expected Features

**Must have (table stakes):**
- Homepage with clear value proposition — users understand "what is this site about" within 5 seconds
- About page with founder story — personal finance requires trust; first-person voice, authentic, credential transparency
- Blog/article listing with thumbnails — content discovery is primary user flow
- Individual article pages — core content consumption with clean reading experience, good typography
- Mobile-responsive design — 60%+ of finance content consumed on mobile, non-negotiable in 2026
- Contact information — professional email or contact form
- Clear navigation — users must find content without hunting
- Fast page load times — finance readers are busy; 3+ second load means abandonment

**Should have (competitive differentiators):**
- Hidden /gen page — dramatically reduces content creation friction; proprietary workflow advantage
- FIRE-specific terminology/calculator — aligns with audience aspiration vs. generic "investing"
- First-person founder voice — authentic voice creates connection vs. corporate detachment
- Road/goal visual metaphor — makes abstract FI concept tangible
- Actionable content — "What do I do Monday morning?" vs. theory

**Defer (v2+):**
- FIRE calculators — requires content authority first
- Original research pieces — requires established content base
- Email newsletter — requires ongoing content production, list management, deliverability

**Anti-features (explicitly not building):**
- User authentication/login
- Email newsletter signup
- Public portfolio display (compliance risk, maintenance burden)
- Comments or community features
- Intrusive ads
- Paywall/premium content
- Stock ticker or live price data
- Social media follow buttons

### Architecture Approach

Next.js App Router with clear separation of concerns:

**Major components:**
1. **app/ (Pages/Routes)**: Server Components that fetch data and pass to child components. Route handlers for blog listing, individual posts, and /gen hidden page.
2. **components/**: Reusable UI split by domain (ui/, layout/, blog/, home/). Interactive components use `'use client'` directive.
3. **content/posts/**: Markdown files with YAML frontmatter. Single source of truth for all blog content.
4. **lib/posts.ts**: Content layer isolating fs reads, gray-matter parsing, and MDX compilation. Called only from Server Components.

**Key patterns to follow:**
- Static generation with `generateStaticParams` for blog posts (scales to 1000+ posts)
- Server Component data fetching, pass to Client Components as props
- Server Actions (`'use server'`) for /gen form submission instead of API routes
- Content layer separation: all markdown parsing isolated in lib/posts.ts

**5-Phase Build Order from ARCHITECTURE.md:**
1. Foundation: Project setup, root layout, content layer, placeholder homepage
2. Core Marketing Pages: Header, Footer, full homepage, theme variables
3. Blog System: Initial posts, blog listing, individual posts, blog components
4. Generator (/gen): Generator logic, Server Action, generator UI
5. Polish: SEO metadata, OpenGraph images, sitemap, performance optimization

### Critical Pitfalls

1. **Thin or Unoriginal Content** — AI-generated content without quality controls destroys credibility in a niche with established authorities (Mr. Money Mustache, Mad Fientist). Prevention: Define quality rubric before building /gen; add linting to reject posts under X words; curate source URLs; require human review before publishing.

2. **Build Time Explosion at 100+ Posts** — `generateStaticParams` rebuilds all blog posts at build time. With 100+ Markdown files, builds slow to 30+ seconds. Prevention: At 50+ posts, switch to `dynamic = 'force-dynamic'` for blog listing; use `next.cache` for post fetching; consider on-demand ISR.

3. **Missing Mobile-First Performance** — Finance content consumed heavily on mobile. Slow loads cause high bounce. Prevention: Use `next/image` for ALL images; use `next/font` for all fonts; test with Chrome DevTools Network throttling (Slow 4G); set performance budgets in CI.

4. **Broken Internal Links After Renaming** — Blog post slug renamed causes 404s, lost SEO equity. Prevention: Establish slug discipline (short, descriptive, date-free); create redirect map in `next.config.mjs`; keep date in frontmatter, not URL.

5. **Content/Generator Feature Creep** — /gen page accumulates features (history, favorites, queue, scheduling) becoming a full CMS. Prevention: Write explicit anti-features for /gen before Phase 4; scope freeze to ONE URL in, ONE Markdown file out; log "would be nice" for Phase 2+.

## Implications for Roadmap

Based on combined research, suggested 5-phase structure with clear dependencies:

### Phase 1: Foundation
**Rationale:** Project setup must be correct before anything else. Incorrect stack versions (e.g., Tailwind v3 config format with v4) cause painful rewrites. Node 20+ required for Tailwind v4. The content layer (lib/posts.ts) is the foundation all blog features depend on.

**Delivers:**
- Next.js 16 project with App Router, TypeScript, Tailwind v4
- Root layout (app/layout.tsx) with fonts, global nav placeholder, footer placeholder
- Content layer: lib/posts.ts with gray-matter, MDX compilation, getAllPosts, getPostBySlug
- Placeholder homepage (app/page.tsx)
- .gitignore with .env patterns verified

**Avoids:** Wrong stack version, missing .gitignore, .env credentials in version control

**Research Flags:** LOW — Standard Next.js patterns, well-documented

---

### Phase 2: Core Marketing Pages
**Rationale:** Homepage is the credibility anchor and first impression. Header/Footer provide navigation infrastructure that blog and generator pages need. Accessibility must be designed in, not added later.

**Delivers:**
- components/layout/Header.tsx (navigation)
- components/layout/Footer.tsx (links, contact)
- Full homepage with HeroSection, ValueProps, AboutPreview
- Tailwind theme variables for FIRE aesthetic
- Accessible contrast ratios verified (>4.5:1)
- Semantic HTML, 200% zoom test

**Avoids:** Accessibility ignored in design, visual impairment exclusions

**Research Flags:** LOW — Standard marketing site patterns

---

### Phase 3: Blog System
**Rationale:** Core content delivery is primary user flow. This phase establishes content infrastructure that the generator (Phase 4) will output to. Must establish slug discipline and image policy from first post.

**Delivers:**
- content/posts/ with initial Markdown posts with frontmatter
- app/blog/page.tsx (list view with PostCard grid)
- app/blog/[slug]/page.tsx (individual posts with generateStaticParams)
- components/blog/PostCard, PostContent
- Slug policy: short, descriptive, date-free (date in frontmatter only)
- Image policy: download and commit images, configure remotePatterns
- Meta descriptions per post

**Avoids:** Broken internal links after renaming, wrong image strategy, build time explosion

**Research Flags:** MEDIUM — First blog posts need content strategy validation

---

### Phase 4: Generator (/gen)
**Rationale:** The proprietary /gen page is the key differentiator but ONLY works if content layer (Phase 3) exists. Strict scope discipline is critical to avoid feature creep. Quality gates must be part of design, not afterthought.

**Delivers:**
- lib/generator.ts (URL scraping + LLM generation logic)
- app/actions.ts (Server Action for form submission)
- app/gen/page.tsx (simple form + PreviewPanel)
- Quality rubric: original insight + data + actionable steps
- Linting: reject posts under X words, posts without original thesis
- Curated source list: high-quality FIRE sources only (FF.org, JL Collins, etc.)
- Human review requirement before publishing
- House style guide for voice consistency

**Avoids:** Thin content, feature creep, quality drift over time

**Research Flags:** MEDIUM-HIGH — LLM integration, scraping logic needs API research

---

### Phase 5: Polish
**Rationale:** SEO infrastructure and performance optimization after all features are built. Canonical tags must be verified before sitemap submission.

**Delivers:**
- SEO metadata per page with canonical tags
- OpenGraph images (next/og or static)
- sitemap.ts using metadata API
- app/robots.txt
- Performance verification: LCP < 2.5s, PageSpeed > 50
- Duplicate content prevention (trailing slash consistency)

**Avoids:** Missing sitemap/robots.txt, duplicate content, missing OG images

**Research Flags:** LOW — Standard SEO patterns

---

### Phase Ordering Rationale

- **Phase 1 must come first** — Foundation dependencies (correct stack, content layer) affect everything else
- **Phase 2 builds on Phase 1** — Layout components need working root layout, homepage needs layout components
- **Phase 3 depends on Phase 1** — Blog system needs content layer (lib/posts.ts) before it can function
- **Phase 4 depends on Phase 3** — Generator outputs to content/posts/, which requires blog infrastructure
- **Phase 5 is last** — Polish after all features complete; canonical tags need all pages existing

**Grouping rationale:**
- Phases 1-2 group marketing site infrastructure
- Phase 3 groups all blog content features together
- Phase 4 is isolated because /gen is conceptually separate (creator tool, not reader-facing)
- Phase 5 is polish/grooming that spans all previous work

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Based on Next.js official documentation (Context7) with current version references |
| Features | MEDIUM-HIGH | Based on FIRE blog ecosystem analysis and personal finance website best practices; domain expertise from competitive analysis |
| Architecture | HIGH | Based on Next.js official documentation; build order derived from dependency analysis |
| Pitfalls | MEDIUM-HIGH | Based on MDN common mistakes, Nielsen Norman Group, Wikipedia SEO; some pitfalls are common web dev issues, others are domain-specific |

**Overall confidence:** HIGH

**Gaps to Address:**
- **Content strategy for /gen**: Research identified quality as critical but did not specify exact quality rubric thresholds (word count minimums, what counts as "original thesis"). Need to establish these during Phase 4 planning.
- **LLM API selection**: Research assumes LLM integration but does not specify provider (OpenAI, Anthropic, local). Platform choice affects cost, latency, and output quality. Recommend validation before Phase 4.
- **Analytics/tracking approach**: No research on analytics integration. Performance monitoring (PageSpeed, bounce rate tracking) requires infrastructure decision (Vercel Analytics, Google Analytics, Plausible, etc.).

## Sources

### Primary (HIGH confidence)
- Next.js Documentation (v16.2.4, 2026-04-23) via Context7 — App Router, Server Components, generateStaticParams, MDX integration, next/font, next/image, metadata API
- Tailwind CSS v4 Upgrade Guide (2026-04) — CSS-based configuration, @theme directive
- Nielsen Norman Group: Marketing Web Design — Accessibility, mobile-first, finance content consumption patterns

### Secondary (MEDIUM-HIGH confidence)
- FIRE Blog Ecosystem Analysis (Mad Fientist, Mr. Money Mustache, Physician on Fire, FIRE Diary) — Feature expectations, differentiation strategies
- MDN Common Web Development Mistakes — General pitfall categories
- Wikipedia: SEO Mistakes — Crawl errors, canonical tags, duplicate content

### Tertiary (MEDIUM confidence)
- Personal Finance Website Best Practices (NerdWallet, The Motley Fool, Investopedia) — Patterns from generalist sites (specific FIRE differentiators need validation)

---
*Research completed: 2026-04-26*
*Ready for roadmap: yes*
