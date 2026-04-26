# Feature Landscape

**Domain:** Personal Investment Firm / FIRE Finance Blog Website
**Researched:** 2026-04-26
**Confidence:** MEDIUM-HIGH

## Table Stakes

Features users expect. Missing = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Homepage with clear value proposition | Users land here to understand "what is this site about" within 5 seconds | Low | Must communicate FI focus immediately |
| About page / founder story | Personal finance requires trust; users need to know who they're trusting | Low | First-person voice, authentic, credential transparency |
| Blog/article listing with thumbnails | Content discovery is primary user flow | Low | Grid or list view, pagination or infinite scroll |
| Individual article pages | Core content consumption | Low | Clean reading experience, good typography |
| Mobile-responsive design | 60%+ of finance content consumed on mobile | Low | Non-negotiable in 2026 |
| Contact information | Users may need to reach out for inquiries | Low | Professional email or contact form |
| Clear navigation | Users must find content without hunting | Low | Top nav + footer links |
| Fast page load times | Finance readers are busy; 3+ second load = abandon | Medium | Image optimization, CDN, static generation |

## Differentiators

Features that set product apart. Not expected, but valued when present.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Hidden content generator (/gen) | Dramatically reduces content creation friction | High | Proprietary workflow advantage |
| FIRE-specific terminology/calculator | Aligns with audience aspiration, not generic "investing" | Medium | "FIRE number" calculation, compound growth visualizations |
| First-person founder voice | Authentic voice creates connection vs. corporate detachment | Low | Differentiates from institutional finance sites |
| Road/goal visual metaphor | Makes abstract FI concept tangible | Low | Storytelling through design language |
| Value investing principles | Positions firm as principled, long-term thinking | Low | 3-4 clear principles = memorable |
| Actionable content | "What do I do Monday morning?" vs. theory | Medium | Step-by-step guides, not just concepts |
| Original research/data | Credibility signal, SEO value, unique content | High | Portfolio performance, savings rate analysis |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| User authentication/login | Project explicitly out of scope; adds complexity for no value | Keep content public and accessible |
| Email newsletter signup | Requires ongoing content production, list management, deliverability | Focus on blog quality; newsletter is Phase 2+ |
| Public portfolio display | Compliance risk, bragging rights, jealousy, maintenance burden | Keep firm performance private |
| Comments or community features | Troll management, moderation burden, GDPR, spam | Disable or defer; focus on content |
| Intrusive ads | Damages credibility, slows site, user experience | Monetization through quality, not display ads |
| Paywall/premium content | Limits reach, contradicts "helping ordinary people" mission | Free, quality content builds authority |
| Stock ticker or live price data | Implies active trading, not long-term investing philosophy | Show historical performance, not real-time |
| Social media follow buttons | Add tracking bloat, distraction | Link to profiles in footer only if needed |

## Feature Dependencies

```
Homepage ──────────────────┬── About Page (mutual navigation)
                           │
Blog Listing ───────────────┼── Blog Post Page (navigate to individual)
                           │
Hidden /gen ────────────────┼── Markdown Storage (output destination)
                           │
Hero Section ───────────────┴── Value Proposition (must be on homepage)
```

## MVP Recommendation

Prioritize in order:
1. **Homepage** (with hero, value props, about teaser) — credibility + navigation anchor
2. **Blog listing + individual post page** — core content delivery
3. **Markdown storage infrastructure** — enables /gen output
4. **Hidden /gen page** — content creation workflow
5. **About page** — trust building
6. **Footer with contact** — professional completeness

Defer:
- FIRE calculators (Phase 2+): requires content authority first
- Original research pieces (Phase 2+): requires established content base
- Visual road metaphor refinement (can be added to Phase 1 visual design)

## Sources

- FIRE blog ecosystem analysis (Mad Fientist, Mr. Money Mustache, Physician on Fire, FIRE Diary)
- Personal finance website best practices (NerdWallet, The Motley Fool, Investopedia patterns)
- Marketing website conversion patterns (industry standard)
