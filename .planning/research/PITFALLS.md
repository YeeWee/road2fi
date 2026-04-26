# Domain Pitfalls

**Project:** Road to Fi Website
**Domain:** Marketing website + blog (FIRE finance niche)
**Researched:** 2026-04-26
**Confidence:** MEDIUM-HIGH

## Critical Pitfalls

Mistakes that cause rewrites, trust loss, or major issues.

---

### Pitfall 1: Thin or Unoriginal Content

**What goes wrong:** Blog posts are shallow summaries of existing FIRE content. No differentiation from established players (Mr. Money Mustache, Mad Fientist). Search engines demote duplicate content. Readers bounce immediately.

**Why it happens:** Building a "content generator" without quality controls. Chasing volume over value. Failing to add original perspective or data.

**Consequences:**
- Zero organic search traffic (SEO penalty for thin content)
- No audience trust or loyalty
- Site becomes invisible in a niche with established authorities
- Wasted effort producing content nobody reads

**Prevention:**
- Before building /gen: Define quality rubric (original insight + data + actionable steps)
- Add linting: reject posts under X words, posts without original thesis
- Curate source URLs: only scrape high-quality sources (FF.org, JL Collins, etc.)
- Human review step before publishing / generated content goes live

**Phase:** Generator (Phase 4) — quality gates must be part of generator design, not afterthought.

---

### Pitfall 2: Build Time Explosion at 100+ Posts

**What goes wrong:** `generateStaticParams` rebuilds all blog posts at build time. With 100+ Markdown files, builds slow to 30+ seconds. Local dev gets sluggish. CI pipelines time out.

**Why it happens:** Not understanding that `generateStaticParams` iterates all posts at build. Treating all content as static when some could be dynamically rendered.

**Consequences:**
- Development speed grinds to halt
- CI/CD pipeline failures
- Team avoids making content changes (workaround: direct filesystem edits)
- Eventually requires architectural rewrite

**Prevention:**
- Design for incremental: At 50+ posts, switch to `dynamic = 'force-dynamic'` for blog listing
- Use `next.cache` for post fetching instead of rebuild-all
- Consider on-demand ISR (Incremental Static Regeneration) for new posts
- Monitor build times; alert if超过 15s

**Phase:** Blog System (Phase 3) — architecture decision at setup time, painful to change later.

**Warning signs:**
- `next build` output showing 20+ seconds for static generation
- `ls content/posts/` showing 50+ files

---

### Pitfall 3: Missing Mobile-First Performance

**What goes wrong:** Finance content consumed heavily on mobile. Site loads slowly on 4G. Hero images not optimized. Fonts loaded from external CDNs. LCP (Largest Contentful Paint) exceeds 3 seconds.

**Why it happens:** "It works on my MacBook" developer mindset. Ignoring `next/image` for local images. Using Google Fonts CDN instead of `next/font`. Not testing on throttled connections.

**Consequences:**
- High bounce rate on mobile
- Google PageSpeed scores below 50 (hurts SEO)
- Users in target demographic (pre-retirees, older) more likely to abandon slow sites
- Lost credibility: slow site = untrustworthy in finance

**Prevention:**
- Use `next/image` for ALL images (local and external with `remotePatterns`)
- Use `next/font` for all fonts (zero external requests)
- Test with Chrome DevTools Network throttling (Slow 4G)
- Run PageSpeed Insights before each release
- Set performance budgets in CI (e.g., LCP < 2.5s)

**Phase:** Polish (Phase 5) — but must install correct tools in Phase 1 (next/image, next/font).

---

### Pitfall 4: Broken Internal Links After Renaming

**What goes wrong:** Blog post slug renamed (e.g., `2024-01-01-investing-basics` -> `investing-basics`). Old links from Google, other posts, or bookmarks return 404. SEO authority lost (404s don't pass PageRank).

**Why it happens:** No redirect strategy. No canonical URL discipline. Renaming posts without automation to handle redirects.

**Consequences:**
- Google search console shows crawl errors
- Lost SEO equity from backlinks
- Poor user experience for readers following old links
- Sitemap shows outdated URLs

**Prevention:**
- Establish slug discipline: short, descriptive, date-free slugs
- Create redirect map (`.htaccess` or `next.config.mjs` redirects)
- Before renaming: check Google Search Console for incoming links
- Use `next.config.mjs` redirect function for permanent 301 redirects
- Keep date in frontmatter, not in URL

**Phase:** Blog System (Phase 3) — establish slug policy from first post.

---

### Pitfall 5: Content/Generator Feature Creep

**What goes wrong:** /gen page accumulates features: history, favorites, queue management, scheduling, multi-author support. The "simple generator" becomes a CMS. Phase 4 never completes.

**Why it happens:** "While we're at it" mentality. Not freezing scope. Adding features that would be useful in a real content business, ignoring that this is a solo blogger with one firm.

**Consequences:**
- Phase 4 balloons from 2 weeks to 2 months
- Generator becomes more complex than the website itself
- Maintenance burden: bugs in generator affect content workflow
- YAGNI: none of the extra features ever get used

**Prevention:**
- Write explicit anti-features for /gen before Phase 4
- Scope freeze: /gen takes ONE URL, outputs ONE Markdown file
- If feature request: "not in Phase 4, logged for Phase 2+"
- Build /gen as a simple form + Server Action, nothing more

**Phase:** Generator (Phase 4) — scope discipline critical.

**Warning signs:**
- Issue tracker adding "would be nice" tickets during Phase 4
- PR scope exceeding 500 lines
- User asking for queue, history, or scheduling

---

## Moderate Pitfalls

---

### Pitfall 6: Wrong Image Strategy

**What goes wrong:** Using external image URLs directly in Markdown. Hotlinking to stock photo sites. Images not optimized (5MB PNGs). `next/image` not configured for external domains.

**Why it happens:** Copy-pasting from source. Not understanding `next/image` requires explicit `remotePatterns` configuration.

**Consequences:**
- Broken images when external site changes URLs
- Legal liability for hotlinking
- Terrible performance (no lazy loading, wrong size)
- Layout shift as images load

**Prevention:**
- Download and commit images to repo (or use /public)
- Configure `remotePatterns` in `next.config.mjs` for any external domain used
- Use `next/image` with `width`, `height`, `alt` props
- Compress images before commit (Squashim, ImageOptim)

**Phase:** Blog System (Phase 3) — establish image policy with first blog post.

---

### Pitfall 7: Duplicate Content Without Canonical Tags

**What goes wrong:** Same article appears at multiple URLs (/blog/post, /blog/post/, /blog/post.html). Google picks wrong canonical. SEO diluted across duplicates.

**Why it happens:** Next.js default behavior + lack of metadata configuration. Trailing slash inconsistencies. Generated content cached multiple ways.

**Consequences:**
- Google crawl budget wasted on duplicates
- Search results show wrong URL variant
- Potential "Google duplicate content penalty" (rare but real concern)

**Prevention:**
- Export `metadata` with `alternates.canonical` in each blog post page
- Force trailing slash or no-trailing-slash consistently (Next.js default: trailing slash optional)
- Add to `next.config.mjs`:
  ```javascript
  trailingSlash: true, // or false, pick one
  ```

**Phase:** Polish (Phase 5) — verify before sitemap submission.

---

### Pitfall 8: Accessible Contrast and Typography

**What goes wrong:** Gray text on white background passes old contrast ratios but fails WCAG AA. Long-form finance content becomes eye-straining. Mobile users zoom and break layouts.

**Why it happens:** Designing visually (dark grays look "modern") without checking contrast. Using `px` for font sizing. Not testing at 200% zoom.

**Consequences:**
- Excludes users with visual impairments (potential legal liability)
- Poor readability = high bounce from long articles
- Finance audience skews older, more likely to need accessibility accommodations

**Prevention:**
- Use Tailwind's `contrast-*` utilities to verify >4.5:1 ratio
- Use `rem` for all font sizes (respects user browser settings)
- Test at 200% zoom in browser devtools
- Add `lang="en"` to `app/layout.tsx`
- Use semantic heading hierarchy (h1 -> h2 -> h3, no skips)

**Phase:** Core Marketing Pages (Phase 2) — visual design must include accessibility check.

---

### Pitfall 9: Generator Output Quality Drift

**What goes wrong:** /gen works well initially. Over months, scraped + LLM-generated content becomes formulaic. All posts follow same structure. Voice becomes generic. Original authority erodes.

**Why it happens:** LLM prompt drift (successive tweaks that accumulate). No human editing. No A/B testing of what resonates. No feedback loop to improve prompts.

**Consequences:**
- Content becomes recognizable as "AI slop"
- Audience disengagement (they've seen this before)
- Lost differentiation from the very tool meant to create it

**Prevention:**
- Establish house style guide: voice, structure, what to avoid
- Set minimum human edit requirement (e.g., "every post requires 15 min of edits")
- Track engagement metrics (bounce rate, time on page) per post
- Periodically audit generator output vs. manual posts for quality

**Phase:** Generator (Phase 4) — design quality feedback loop from start.

---

### Pitfall 10: .env Credentials in Version Control

**What goes wrong:** API keys for LLM, scraping tools, or analytics committed to GitHub. GitHub secrets scanner triggers alert. Keys revoked, site breaks. Attacker uses keys for unauthorized calls.

**Why it happens:** Creating `.env` file after `.gitignore` exists. Not understanding that `git add .env` stages before ignore applies. Copy-paste from template that lacks env pattern.

**Consequences:**
- Credential revocation: site stops working until new key issued
- Financial exposure: unauthorized API calls rack up charges
- Security incident requiring disclosure

**Prevention:**
- Verify `.gitignore` contains `.env`, `.env.local`, `.env.*`
- Use `git status` before `git add` — confirm no .env in staging
- Store credentials in platform-specific secrets (Vercel Env Vars, GitHub Secrets)
- Document: "Never commit .env files" in README

**Phase:** Foundation (Phase 1) — verify .gitignore before first commit.

---

## Minor Pitfalls

---

### Pitfall 11: Missing Sitemap and Robots.txt

**What goes wrong:** Google cannot discover blog posts. New posts never indexed. SEO effort wasted.

**Prevention:** Generate `sitemap.ts` using Next.js `metadata` API. Add `app/robots.txt`. Submit sitemap to Google Search Console.

**Phase:** Polish (Phase 5).

---

### Pitfall 12: Non-Descriptive Meta Descriptions

**What goes wrong:** Default meta description or missing entirely. Google auto-generates from content (often bad). CTR in search results suffers.

**Prevention:** Every blog post page exports `description` in metadata. Auto-generate from frontmatter excerpt if manual writing not done.

**Phase:** Blog System (Phase 3).

---

### Pitfall 13: Open Graph Image Missing

**What goes wrong:** Links shared on social media show blank or ugly placeholder. Reduced click-through on LinkedIn, Twitter, Facebook.

**Prevention:** Use `next/og` or generate OG images per post. At minimum, static OG image for homepage.

**Phase:** Polish (Phase 5).

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Foundation (Phase 1) | Wrong stack version, missing .gitignore | Verify Next.js 16, confirm .gitignore, Node 20+ |
| Core Marketing (Phase 2) | Accessibility ignored in design | Check contrast ratios, semantic HTML, 200% zoom test |
| Blog System (Phase 3) | Build time becomes problematic | Monitor build times, plan incremental approach |
| Generator (Phase 4) | Scope creep, quality drift | Freeze scope, establish style guide, add linting |
| Polish (Phase 5) | SEO basics missed | Verify sitemap, robots.txt, canonical tags, OG images |

---

## Sources

- [MDN Common Web Development Mistakes](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics) (HIGH confidence)
- [Wikipedia: Web Design - Pitfalls](https://en.wikipedia.org/wiki/Web_design) (MEDIUM confidence)
- [Wikipedia: SEO Mistakes](https://en.wikipedia.org/wiki/Search_engine_optimization) (MEDIUM confidence)
- [Nielsen Norman Group: Marketing Web Design](https://www.nngroup.com/articles/marketing-web-design/) (HIGH confidence - industry authority)
- [Project context from ARCHITECTURE.md, FEATURES.md, STACK.md](/Users/hw/workspaces/projects/websites/road2fi/.planning/research/) (local)
