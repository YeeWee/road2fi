# Road to Fi Website

## Project Overview

A marketing website and blog for a personal investment firm helping ordinary people achieve Financial Independence.

**Core Value:** Help people understand and pursue Financial Independence through clear, actionable investment insights delivered with authenticity and trust.

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (CSS-based configuration)
- Markdown files with frontmatter for blog content
- OpenAI-compatible API for content generation

## Planning Artifacts

| Artifact | Location |
|----------|----------|
| Project | `.planning/PROJECT.md` |
| Config | `.planning/config.json` |
| Research | `.planning/research/` |
| Requirements | `.planning/REQUIREMENTS.md` |
| Roadmap | `.planning/ROADMAP.md` |

## Phase Structure

1. **Foundation** — Project setup, layout, content layer
2. **Marketing Pages** — Homepage with hero, philosophy, About
3. **Blog System** — Blog list and individual post pages
4. **Content Generator** — Hidden /gen page for AI-powered blog creation

## Workflow Settings

- Mode: YOLO (auto-approve plans)
- Granularity: Standard
- Execution: Parallel
- Workflow agents: Research, Plan Check, Verifier enabled

## Key URLs

- Homepage: `/`
- Blog: `/blog`
- Generator (hidden): `/gen`
- Blog posts: `/blog/[slug]`

## FIRE Theme Design

- Professional minimal + warm亲和 + goal-oriented
- Visual "road" and "goal" storytelling
- Colors: Minimal palette, high contrast for credibility
- Typography: Clean, readable, professional

## Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Content Structure

```
content/
└── posts/
    └── [slug].md  # Blog posts with frontmatter
```

## Out of Scope

- User authentication
- Email newsletters
- Investment portfolio display
- Public comments

---
*Generated: 2026-04-26*