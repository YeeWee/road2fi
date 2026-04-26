---
plan: 01-04
phase: 01-foundation
status: complete
---

## Plan 01-04: Create content layer (lib/posts.ts)

**Objective:** Create the content layer for reading Markdown files with YAML frontmatter from /content/posts/.

### What was built

- `lib/posts.ts` — Content layer with `getAllPosts()`, `getPostBySlug()`, `getAllPostSlugs()` functions
- Posts sorted by date descending (newest first)
- TypeScript interfaces: `PostMeta` (list display) and `Post` (full content)
- `gray-matter` installed for frontmatter parsing
- Sample blog post `content/posts/welcome-to-road-to-fi.md` created for testing
- `content/posts/.gitkeep` to ensure directory tracked by git

### Key files created/modified

- `lib/posts.ts` — new, exports getAllPosts, getPostBySlug, getAllPostSlugs
- `content/posts/welcome-to-road-to-fi.md` — new, sample post with frontmatter
- `content/posts/.gitkeep` — new, empty
- `package.json` — added gray-matter dependency

### Self-Check: PASSED
