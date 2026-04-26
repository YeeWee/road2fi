# Road to Fi Website

## What This Is

A marketing website and blog for a personal investment firm helping ordinary people achieve Financial Independence. The site conveys professional credibility while maintaining the warmth and relatability of a personal brand — walking the path to FIRE (Financial Independence, Retire Early) alongside readers.

## Core Value

Help people understand and pursue Financial Independence through clear, actionable investment insights delivered with authenticity and trust.

## Requirements

### Active

- [ ] Homepage with hero section, investment philosophy (3-4 value investing principles), About Us, and footer
- [ ] Blog with list view (thumbnail, title, excerpt, date) and individual article pages
- [ ] Blog posts stored as Markdown files with frontmatter metadata
- [ ] Hidden blog generator page at /gen — accepts YouTube/video or article URL, scrapes content, uses LLM to generate structured article in first-person founder voice, extracts thumbnail, saves as new Markdown post
- [ ] Next.js (App Router) + TypeScript + Tailwind CSS
- [ ] FIRE-themed design: professional minimal + warm + goal-oriented, visual "road" and "goal" storytelling

### Out of Scope

- User authentication/login
- Email newsletters
- Investment portfolio display
- Comments or community features

## Context

- Personal investment firm brand (not institutional)
- Target audience: ordinary people accumulating wealth, not high-net-worth individuals
- Content tone: formal articles for readers, first-person founder voice for generated content
- Hidden admin URL: /gen (no authentication required)

## Constraints

- **Tech Stack**: Next.js (App Router), TypeScript, Tailwind CSS — explicit requirement
- **Content Storage**: Markdown files with frontmatter in repository — explicit requirement
- **No Auth**: /gen admin page accessible without login — explicit requirement
- **AI API**: OpenAI-compatible API for blog generation

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hidden /gen for admin | Convenience over security for personal use | — Pending |
| Markdown storage | Git-based content management, simple, no DB needed | — Pending |
| FIRE theme | Aligns with audience aspiration, differentiates from generic finance sites | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-26 after initialization*