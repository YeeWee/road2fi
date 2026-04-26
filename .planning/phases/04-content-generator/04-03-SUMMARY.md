---
phase: 04-content-generator
plan: 03
type: execute
wave: 2
requirements_completed:
  - GEN-03
  - GEN-04
  - GEN-05
  - GEN-06
duration: 2 min
completed: 2026-04-26
key-files.created:
  - lib/scraper.ts
  - lib/generator.ts
key-decisions:
  - "YouTube transcript fallback to oEmbed metadata when transcript unavailable"
  - "Content capped at 8000 chars to prevent token overflow in LLM calls"
  - "JSON parse fallback returns raw content when LLM doesn't return valid JSON"
---

# Phase 4 Plan 03: Content scraping and blog post generation

Server-side scraping for YouTube (transcript + oEmbed) and articles (cheerio), plus OpenAI-compatible LLM generation with first-person founder voice.

## Tasks Completed

1. **Create URL scraping module** — `scrapeContent()` handles YouTube URLs (transcript via youtube-transcript, metadata via oEmbed) and article URLs (cheerio with noise removal, og:image thumbnail extraction)
2. **Create blog post generator** — `generateBlogPost()` calls OpenAI-compatible API with first-person founder voice system prompt, returns JSON with title/content/excerpt, includes JSON parse fallback

## Self-Check: PASSED
