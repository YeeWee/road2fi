# Phase 4: Content Generator - Research

**Researched:** 2026-04-26
**Domain:** Next.js 16 App Router Server Actions, web scraping, OpenAI API integration
**Confidence:** HIGH

## Summary

This phase builds a hidden `/gen` page that accepts YouTube and article URLs, scrapes their content server-side, sends the scraped text to an OpenAI-compatible API to generate a blog post in first-person founder voice, previews the result, and saves it as a Markdown file with frontmatter to `content/posts/`.

The entire flow runs through Next.js Server Actions — no separate API routes needed. Server Actions provide the cleanest integration with the client-side form, handle the multi-step async pipeline (scrape → generate → preview → save), and keep all sensitive operations (API keys, file writes) on the server.

Three new dependencies are required: `cheerio` for HTML parsing of article content, `youtube-transcript` for YouTube transcript extraction, and `openai` for the OpenAI-compatible API client. All run server-side only.

**Primary recommendation:** Use Server Actions with `'use server'` directive, `cheerio` for article scraping, `youtube-transcript` for YouTube, `openai` Node.js SDK for LLM calls, and `fs.writeFileSync` for saving Markdown files. Store the OpenAI API key in `.env`.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| URL input form | Browser / Client | — | Client component for interactivity |
| URL content scraping | API / Backend | — | Server Action with `fetch` + `cheerio` |
| YouTube transcript extraction | API / Backend | — | Server Action with `youtube-transcript` |
| LLM content generation | API / Backend | — | Server Action with `openai` SDK |
| Thumbnail extraction | API / Backend | — | Server-side DOM parsing of scraped HTML |
| File system write | API / Backend | — | Server Action with Node.js `fs` module |
| Preview UI | Browser / Client | — | Client component displaying generated content |
| Loading state | Browser / Client | — | Client-side state management during async flow |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `cheerio` | 1.2.0 | HTML parsing for article scraping | Fast, jQuery-like API, no browser needed, works in Node.js server runtime [VERIFIED: npm registry] |
| `youtube-transcript` | 1.3.1 | YouTube transcript extraction | Most popular npm package for this purpose, uses YouTube's unofficial API [VERIFIED: npm registry] |
| `openai` | 6.34.0 | OpenAI-compatible API client | Official SDK, supports any OpenAI-compatible endpoint via `baseURL` option [VERIFIED: npm registry] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `gray-matter` | 4.0.3 (already installed) | Frontmatter parsing for saving posts | Already in project, use for consistency when generating frontmatter [VERIFIED: package.json] |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `cheerio` | `jsdom` | Heavier, browser-like DOM; overkill for simple text extraction |
| `youtube-transcript` | `youtube-transcript-api-node` | Less popular, TypeScript port of Python lib; fewer community reports of breakage |
| `openai` SDK | Direct `fetch` to API | More boilerplate, no typed responses, no retry logic |
| Server Actions | API Routes (`app/api/...`) | More files, separate client-server boundary; Server Actions are simpler for form-driven flows |

**Installation:**
```bash
bun add cheerio youtube-transcript openai
```

**Version verification:** All versions confirmed against npm registry on 2026-04-26.

## Architecture Patterns

### System Architecture Diagram

```
User enters URL at /gen
        │
        ▼
   Client Form (useState)
        │
        ▼  (submit)
   Server Action: generatePost(url)
        │
        ├──► URL type detection (YouTube vs article)
        │         │
        │         ├── YouTube: youtube-transcript.fetchTranscript()
        │         │              → transcript text + video metadata
        │         │
        │         └── Article: fetch(url) → cheerio.load() → extract text + images
        │                          → article text + thumbnail
        │
        ├──► openai.chat.completions.create()
        │         → system prompt: first-person founder voice
        │         → user prompt: source content
        │         → returns: { title, content, excerpt }
        │
        ├──► Generate slug from title
        │
        ├──► Write Markdown file → content/posts/{slug}.md
        │         → frontmatter: title, date, excerpt, thumbnail, slug
        │         → body: generated content
        │
        └──► Return { success, post } to client
                   │
                   ▼
              Preview UI (save/discard)
```

### Recommended Project Structure
```
app/
├── gen/
│   └── page.tsx          # Hidden /gen page (Server + Client components)
lib/
├── scraper.ts            # URL scraping logic (cheerio + youtube-transcript)
├── generator.ts          # OpenAI content generation
├── posts.ts              # Existing + new savePost function
└── url-utils.ts          # URL validation and type detection
```

### Pattern 1: Server Action with Client Form
**What:** A Server Action defined inside a Server Component page, called from a Client Component form via `useActionState` or direct invocation.
**When to use:** Form-driven multi-step server operations (our case).
**Example:**
```tsx
// app/gen/page.tsx
'use server'
import fs from 'fs'
import path from 'path'

export async function generatePost(url: string) {
  // 1. Validate URL
  // 2. Scrape content
  // 3. Call OpenAI
  // 4. Save file
  // 5. Return result
}
```
Source: [Next.js Server Actions docs](https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations)

### Pattern 2: Client Component for Interactive UI
**What:** `'use client'` component managing form state, loading indicators, and preview display.
**When to use:** When the page needs interactive state (loading, preview, save/discard).

```tsx
'use client'
import { useState } from 'react'
import { generatePost } from './actions'

export default function GenPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PostMeta | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const post = await generatePost(url)
    setResult(post)
    setLoading(false)
  }
  // ...
}
```

### Anti-Patterns to Avoid
- **Direct `fetch` in Client Component to external URLs:** Exposes scraping logic and potential SSRF vectors on the client. All URL fetching must happen in Server Actions.
- **Storing OpenAI API key in client code:** Never expose API keys. The `openai` SDK reads from `process.env.OPENAI_API_KEY` automatically on the server.
- **Using API Routes when Server Actions suffice:** API routes require separate client fetch calls, more boilerplate, and separate error handling. Server Actions are the standard for form-driven flows in Next.js 16.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML parsing/scraping | Custom regex/substring extraction | `cheerio` | Handles malformed HTML, nested elements, encoding edge cases |
| YouTube transcript extraction | Custom YouTube API calls | `youtube-transcript` | Handles transcript token parsing, language selection, auto-generated vs manual transcripts |
| OpenAI API calls | Raw `fetch` with manual JSON | `openai` SDK | Typed responses, retry logic, streaming support, handles API versioning |
| Frontmatter generation | Manual string concatenation | `gray-matter.stringify()` | Handles YAML escaping, special characters, consistent output |
| URL validation | Custom regex | `URL` constructor + domain allowlist | Built-in parsing, handles edge cases, prevents SSRF |

**Key insight:** URL scraping and LLM integration are deceptively complex. HTML can be malformed, YouTube's API changes frequently, and LLM prompt engineering requires careful structure to produce consistent output.

## Common Pitfalls

### Pitfall 1: File System Writes in Serverless Deployments
**What goes wrong:** `fs.writeFileSync` works locally but files disappear on Vercel/serverless deployment.
**Why it happens:** Serverless functions are stateless; each invocation runs on a fresh container.
**How to avoid:** For local development, `fs` works fine. For production deployment on Vercel, consider Vercel Blob Storage or a Git-based approach (commit files via API). Given this is an internal tool (GEN-10: no auth), local/standalone deployment is the expected use case.
**Warning signs:** Files appear in `content/posts/` during dev but vanish after `npm run build` + deploy.

### Pitfall 2: YouTube Transcript API Breakage
**What goes wrong:** `youtube-transcript` package stops working after YouTube API changes.
**Why it happens:** Package uses YouTube's unofficial internal API, which is not stable.
**How to avoid:** Pin the package version, monitor for updates, have a fallback error message. The video title and description can still be extracted via `fetch` + `cheerio` even if transcripts fail.
**Warning signs:** `youtube-transcript` throws `Could not retrieve transcript` errors for videos that clearly have captions.

### Pitfall 3: SSRF via User-Controlled URL
**What goes wrong:** User submits `http://localhost:5432` or `http://169.254.169.254/metadata` and the server fetches it.
**Why it happens:** Server Action blindly `fetch()`es the submitted URL without validation.
**How to avoid:** Validate URL format with `new URL()`, enforce `https://` scheme, block private IP ranges and `localhost`.
**Warning signs:** Any `fetch()` that accepts user-controlled URLs without allowlisting or IP blocking.

### Pitfall 4: Stale Cache After File Write
**What goes wrong:** After saving a new post, `/blog` page doesn't show it because Next.js cached the directory listing.
**Why it happens:** Next.js caches filesystem reads for static pages.
**How to avoid:** Call `revalidatePath('/blog')` and `revalidatePath('/blog/[slug]')` after writing the file. [VERIFIED: Next.js docs - `updateTag` / `revalidatePath`]

### Pitfall 5: OpenAI Compatible API Configuration
**What goes wrong:** Using a non-OpenAI provider (e.g., Claude, local LLM) but the SDK defaults to `api.openai.com`.
**Why it happens:** The `openai` SDK defaults to OpenAI's endpoint.
**How to avoid:** Set `OPENAI_BASE_URL` in `.env` for non-OpenAI providers. The SDK supports this natively: `new OpenAI({ baseURL: process.env.OPENAI_BASE_URL })`. [VERIFIED: openai-node SDK docs]

## Code Examples

### URL Type Detection
```typescript
// lib/url-utils.ts
export function detectUrlType(url: string): 'youtube' | 'article' | 'invalid' {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return 'invalid'
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      return 'youtube'
    }
    return 'article'
  } catch {
    return 'invalid'
  }
}
```

### Article Scraping with cheerio
```typescript
// lib/scraper.ts
import * as cheerio from 'cheerio'

export async function scrapeArticle(url: string) {
  const response = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)

  // Remove noise
  $('script, style, nav, header, footer, aside, iframe, noscript').remove()

  // Extract title
  const title = $('title').text() || $('h1').first().text() || ''

  // Extract main content
  const content = $('article, main, .content, .post, #content').text() || $('body').text()

  // Extract thumbnail
  const thumbnail =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('img').first().attr('src') ||
    ''

  return { title, content: content.trim().slice(0, 8000), thumbnail }
}
```

### YouTube Content Extraction
```typescript
// lib/scraper.ts
import { YouTubeTranscript } from 'youtube-transcript'

export async function scrapeYouTube(url: string) {
  const videoId = extractVideoId(url)
  if (!videoId) throw new Error('Invalid YouTube URL')

  const transcript = await YouTubeTranscript.fetchTranscript(videoId)
  const text = transcript.map((entry) => entry.text).join(' ')

  // Video metadata via oEmbed (no API key needed)
  const oembed = await fetch(
    `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
  ).then((r) => r.json())

  return {
    title: oembed.title || '',
    content: text.slice(0, 8000),
    thumbnail: oembed.thumbnail_url || '',
  }
}

function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match?.[1] ?? null
}
```

### OpenAI Content Generation
```typescript
// lib/generator.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL, // optional, for compatible APIs
})

export async function generateBlogPost(sourceContent: string, sourceTitle: string) {
  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL ?? 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are the founder of Road to Fi, a personal investment firm. Write a blog post in first-person voice ("I", "we") based on the provided source content. The post should:
- Be structured with clear headings (## and ###)
- Use a professional, approachable tone
- Translate the source content into actionable investment insights
- Include a compelling introduction and conclusion
- Be written in the same style as value investing education content`,
      },
      {
        role: 'user',
        content: `Source title: ${sourceTitle}\n\nSource content:\n${sourceContent}\n\nWrite a complete blog post based on this source material.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  })

  return completion.choices[0].message.content
}
```

### Save Post to Markdown
```typescript
// lib/posts.ts (add to existing)
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function savePost(params: {
  slug: string
  title: string
  date: string
  excerpt: string
  thumbnail: string
  content: string
}) {
  const filePath = path.join(postsDirectory, `${params.slug}.md`)
  const frontmatter = {
    title: params.title,
    date: params.date,
    excerpt: params.excerpt,
    thumbnail: params.thumbnail,
  }
  const fileContent = matter.stringify(params.content, frontmatter)
  fs.writeFileSync(filePath, fileContent, 'utf8')
  return { slug: params.slug, path: filePath }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API Routes for form handling | Server Actions (`'use server'`) | Next.js 13.4+ | Fewer files, built-in form integration, automatic CSRF protection |
| `getServerSideProps` for dynamic pages | Server Components + Server Actions | Next.js 13+ | Simpler data fetching, no separate API layer |
| Manual `fetch` + JSON parsing for LLMs | `openai` SDK with typed responses | Always recommended | Type safety, retry logic, streaming support |
| Custom HTML regex parsing | `cheerio` with jQuery-like selectors | Long-standing standard | Handles malformed HTML, nested elements reliably |

**Deprecated/outdated:**
- `ytdl-core` for YouTube: Frequently breaks due to YouTube anti-scraping measures. Use `youtube-transcript` instead.
- `next-seo` package: Next.js 13+ has built-in `generateMetadata` API. Not relevant to this phase but worth noting.
- `useFormState` (deprecated): Renamed to `useActionState` in React 19 / Next.js 15+.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | OpenAI-compatible API is accessible via environment variables (`OPENAI_API_KEY`, optional `OPENAI_BASE_URL`) | Code Examples | If the API provider requires a different auth mechanism, the SDK config needs adjustment |
| A2 | The project will be deployed/used in an environment where `fs` writes persist (local server, VPS, not ephemeral serverless) | Pitfall 1 | If deployed to Vercel serverless, written files will disappear after each invocation |
| A3 | `youtube-transcript` package works with current YouTube API as of 2026-04 | Standard Stack | YouTube may have updated their API, causing transcript fetch failures |
| A4 | No authentication on `/gen` means no rate limiting is needed for this phase | Scope | Without rate limiting, the page could be abused for free LLM API calls |

## Open Questions

1. **OpenAI API provider specifics**
   - What we know: CLAUDE.md says "OpenAI-compatible API for content generation"
   - What's unclear: Which specific provider (OpenAI, Claude, local LLM, etc.) and which model
   - Recommendation: Use `OPENAI_API_KEY` and `OPENAI_BASE_URL` env vars; defaults to OpenAI but supports any compatible provider

2. **Production deployment target**
   - What we know: Local `npm run dev` and `npm run build` + `npm start` work
   - What's unclear: Whether this will be deployed to Vercel, a VPS, or used locally only
   - Recommendation: Design for local/VPS deployment where `fs` writes persist. If Vercel is the target, flag this during planning

3. **Rate limiting on `/gen`**
   - What we know: GEN-10 says no authentication required
   - What's unclear: Whether rate limiting is expected to prevent abuse
   - Recommendation: Out of scope for this phase (not in requirements), but note as a production concern

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Server Actions, fs module | ✓ | Verified via project setup | — |
| `cheerio` | Article scraping | ✗ | 1.2.0 | `bun add cheerio` |
| `youtube-transcript` | YouTube extraction | ✗ | 1.3.1 | `bun add youtube-transcript` |
| `openai` | LLM generation | ✗ | 6.34.0 | `bun add openai` |
| `OPENAI_API_KEY` env var | LLM generation | ✗ | — | Must be set in `.env` |
| `OPENAI_BASE_URL` env var | Non-OpenAI providers | ✗ | — | Optional, defaults to api.openai.com |

**Missing dependencies with no fallback:**
- `OPENAI_API_KEY` must be configured before the generator can work — blocks GEN-04, GEN-05

**Missing dependencies with fallback:**
- None identified

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None detected — no test config files, test directories, or test scripts in package.json |
| Config file | none — see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| GEN-01 | /gen page renders without nav links | Manual | — | ❌ Wave 0 |
| GEN-02 | URL input accepts YouTube and article URLs | Manual | — | ❌ Wave 0 |
| GEN-03 | Server-side scraping extracts content | Unit | N/A | ❌ Wave 0 |
| GEN-04 | OpenAI API call succeeds with valid key | Unit | N/A | ❌ Wave 0 |
| GEN-05 | Generated content is in first-person founder voice | Manual | — | ❌ Wave 0 |
| GEN-06 | Thumbnail extracted from source | Unit | N/A | ❌ Wave 0 |
| GEN-07 | Markdown file saved to content/posts/ | Unit | N/A | ❌ Wave 0 |
| GEN-08 | Loading state shown during generation | Manual | — | ❌ Wave 0 |
| GEN-09 | Preview shown before saving | Manual | — | ❌ Wave 0 |
| GEN-10 | /gen accessible without auth | Manual | — | ❌ Wave 0 |

### Sampling Rate
- **Per task commit:** No test framework configured
- **Per wave merge:** No test framework configured
- **Phase gate:** Manual verification only

### Wave 0 Gaps
- [ ] No test framework detected — all requirement verification will be manual
- [ ] `lib/scraper.ts` — test article scraping with known URLs
- [ ] `lib/generator.ts` — test OpenAI call with mock responses
- [ ] `lib/posts.ts` savePost function — test file creation and frontmatter format

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | GEN-10: no auth required |
| V3 Session Management | No | No sessions involved |
| V4 Access Control | No | No access restrictions |
| V5 Input Validation | Yes | URL format validation, SSRF prevention |
| V6 Cryptography | No | HTTPS enforced by URL validation |

### Known Threat Patterns for Next.js + Server Actions

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| SSRF via user URL | Spoofing | URL allowlist (youtube.com + article domains only), block private IPs, enforce https:// |
| API key exposure in client | Information Disclosure | Store in `.env`, never reference in client components |
| Unbounded LLM cost | Tampering | Not in scope for this phase, but consider max_tokens limit and rate limiting |
| Malicious file write path | Tampering | Slug sanitization: only alphanumeric + hyphens, no path traversal characters |
| HTML injection in scraped content | Injection | Cheerio strips scripts by default; generated content from LLM should be trusted |

## Sources

### Primary (HIGH confidence)
- Context7: `/vercel/next.js` - Server Actions, file writing, cache revalidation patterns
- Context7: `/cheeriojs/cheerio` - HTML parsing API
- Context7: `/openai/openai-node` - Chat completions API usage
- [Next.js Server Actions docs](https://nextjs.org/docs/13/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Next.js Data Security Guide](https://nextjs.org/docs/app/guides/data-security)

### Secondary (MEDIUM confidence)
- npm registry: `cheerio@1.2.0`, `youtube-transcript@1.3.1`, `openai@6.34.0`, `next@16.2.4`
- [OWASP SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [YouTube Transcript npm](https://www.npmjs.com/package/youtube-transcript)
- [YouTube oEmbed API](https://www.youtube.com/oembed) — for video metadata without API key

### Tertiary (LOW confidence)
- YouTube transcript extraction via `youtube-transcript` package may break with YouTube API changes — marked for validation during execution

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All packages verified against npm registry, patterns verified against Context7 and official docs
- Architecture: HIGH - Server Actions pattern confirmed via Next.js official docs
- Pitfalls: HIGH - SSRF, serverless filesystem, and YouTube API breakage are well-documented issues

**Research date:** 2026-04-26
**Valid until:** 2026-05-26 (30 days — stable stack, but YouTube API changes may require re-validation of `youtube-transcript`)
