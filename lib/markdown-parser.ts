import matter from 'gray-matter'

interface ParsedMarkdown {
  title: string
  content: string
}

/**
 * Parse uploaded markdown file to extract title and content.
 *
 * Priority for title:
 * 1. Frontmatter `title` field
 * 2. First H1 heading (# Title)
 * 3. First non-empty line (truncated)
 * 4. Filename without extension
 */
export function parseMarkdownFile(rawContent: string, filename: string): ParsedMarkdown {
  const { data, content: body } = matter(rawContent)

  let title = ''

  // 1. Check frontmatter title
  if (data.title && typeof data.title === 'string') {
    title = data.title.trim()
  }

  // 2. Check for H1 heading
  if (!title) {
    const h1Match = body.match(/^#\s+(.+)$/m)
    if (h1Match) {
      title = h1Match[1].trim()
    }
  }

  // 3. Use first non-empty line (truncated)
  if (!title) {
    const firstLine = body.split('\n').find((line) => line.trim().length > 0)
    if (firstLine) {
      title = firstLine.trim().slice(0, 100)
    }
  }

  // 4. Fallback to filename
  if (!title) {
    title = filename
      .replace(/\.(md|markdown|txt)$/i, '')
      .replace(/[-_]/g, ' ')
  }

  const content = body.trim()

  return { title, content }
}