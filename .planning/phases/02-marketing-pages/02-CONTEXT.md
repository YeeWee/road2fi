# Phase 2: Marketing Pages - Context

**Gathered:** 2026-04-26
**Status:** Ready for planning

<domain>
## Phase Boundary

Homepage with hero section, investment philosophy section (3-4 value investing principles), About Us section, and global navigation header/footer. Depends on Phase 1 foundation (Next.js 16, Tailwind v4, global layout with Header/Footer, Inter font, max-w-5xl content width).

Blog list and blog post pages are Phase 3. Content generator is Phase 4.

</domain>

<decisions>
## Implementation Decisions

### Hero section
- **D-01:** Bold headline + CTA style — large headline, subheadline, and a prominent CTA button (e.g., "Read the Blog" or "Start Your Journey"). Clean, high-impact marketing site feel.
- **D-02:** Hero is the first section on the homepage, full viewport or near-full viewport height for impact.

### Philosophy layout
- **D-03:** Card grid — 3-4 cards in a grid, each with a principle name, icon/number, and short description. Clean, scannable, professional.
- **D-04:** Cards should align with existing max-w-5xl content width from Phase 1 layout.

### About Us section
- **D-05:** Personal story tone — founder's narrative: why they started, their FIRE journey. First-person or close third-person. Warm, authentic, relatable.
- **D-06:** Section comes after philosophy section (order: Hero → Philosophy → About Us).

### Navigation and Footer
- **D-07:** Enhance existing Header and Footer components from Phase 1 rather than redesign.
- **D-08:** Header should include links to key sections (Home, Blog at minimum — Blog link already exists).
- **D-09:** Footer should include contact info, copyright, and essential links.

### Page structure
- **D-10:** Homepage is a single page with stacked sections: Hero → Philosophy → About Us.
- **D-11:** Replace the current placeholder `app/page.tsx` with the full homepage.

### Claude's Discretion
- Exact hero CTA button text and link target
- Card grid responsive breakpoints (2-col, 1-col)
- Exact spacing between sections
- Whether to use icons or numbers on philosophy cards
- Footer specific link structure beyond Blog

</decisions>

<specifics>
## Specific Ideas

- FIRE theme: professional minimal + warm + goal-oriented with visual "road" and "goal" storytelling
- Colors: Minimal palette, high contrast for credibility
- Typography: Clean, readable, professional (Inter font already configured)
- CTA should guide users toward blog content (primary engagement action)

</specifics>

<canonical_refs>
## Canonical References

### Marketing pages
- `.planning/ROADMAP.md` §Phase 2 — Phase goal, requirements (HOME-01 through HOME-04), success criteria
- `.planning/REQUIREMENTS.md` §Marketing Pages — HOME-01 to HOME-04 detailed requirements
- `.planning/PROJECT.md` — FIRE theme design, tech stack, constraints

### Existing code
- `app/layout.tsx` — Global layout with Header/Footer, Inter font, metadata
- `components/layout/Header.tsx` — Existing header component (enhance, don't replace)
- `components/layout/Footer.tsx` — Existing footer component (enhance, don't replace)
- `app/page.tsx` — Current homepage placeholder (to be replaced)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `Header` component (`components/layout/Header.tsx`): Basic nav with Home/Blog links — extend with additional links or styling
- `Footer` component (`components/layout/Footer.tsx`): Copyright + Blog link — extend with contact info and additional links
- `Inter` font (`app/layout.tsx`): Already configured and self-hosted — use for all typography
- `max-w-5xl`: Content width established in Header/Footer — reuse for homepage sections

### Established Patterns
- Tailwind v4 CSS-based theming via `@theme` in `globals.css`
- Component files use default exports
- Layout uses `@/` path alias for imports

### Integration Points
- Homepage replaces `app/page.tsx` placeholder
- Header/Footer components are enhanced in place (same files)
- No new routes needed — all sections on single `/` page

</code_context>

<deferred>
## Deferred Ideas

- Blog list page (Phase 3)
- Individual blog post pages (Phase 3)
- Content generator /gen page (Phase 4)
- SEO meta tags, sitemap, Open Graph (v2 requirements)
- Reading time estimates, related posts, categories (v2 requirements)

</deferred>

---

*Phase: 02-marketing-pages*
*Context gathered: 2026-04-26*
