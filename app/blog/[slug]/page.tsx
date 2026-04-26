import { getPostBySlug, getAllPostSlugs } from "@/lib/posts"
import Link from "next/link"
import type { Metadata } from "next"

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: "Post Not Found — Road to Fi" }
  }
  return {
    title: `${post.title} — Road to Fi`,
    description: post.excerpt,
  }
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00")
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/)
    if (boldMatch) {
      parts.push(<strong key={key++} className="font-semibold text-warm-gray-900">{boldMatch[1]}</strong>)
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Italic: *text* or _text_
    const italicMatch = remaining.match(/^\*(.+?)\*/) || remaining.match(/^_(.+?)_/)
    if (italicMatch) {
      parts.push(<em key={key++}>{italicMatch[1]}</em>)
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Inline code: `text`
    const codeMatch = remaining.match(/^`(.+?)`/)
    if (codeMatch) {
      parts.push(
        <code key={key++} className="px-1.5 py-0.5 rounded bg-warm-gray-100 text-brand text-sm font-mono">
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      parts.push(
        <a key={key++} href={linkMatch[2]} className="text-brand underline underline-offset-2 hover:text-brand-hover transition-colors">
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Plain character
    const nextSpecial = remaining.search(/(\*\*|\*|_|`|\[)/)
    if (nextSpecial === -1) {
      parts.push(<span key={key++}>{remaining}</span>)
      remaining = ""
    } else if (nextSpecial === 0) {
      parts.push(<span key={key++}>{remaining[0]}</span>)
      remaining = remaining.slice(1)
    } else {
      parts.push(<span key={key++}>{remaining.slice(0, nextSpecial)}</span>)
      remaining = remaining.slice(nextSpecial)
    }
  }

  return <>{parts}</>
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inList = false
  let listItems: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let codeLanguage = ""

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1.5 text-warm-gray-700 leading-relaxed marker:text-accent/60">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
      listItems = []
    }
    inList = false
  }

  const flushCodeBlock = () => {
    if (codeLines.length > 0) {
      elements.push(
        <div key={`code-${elements.length}`} className="my-6 rounded-xl bg-warm-gray-900 p-5 overflow-x-auto">
          {codeLanguage && (
            <div className="text-xs text-warm-gray-500 mb-2 font-mono">{codeLanguage}</div>
          )}
          <pre className="text-sm text-warm-gray-200 font-mono leading-relaxed">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      )
      codeLines = []
      codeLanguage = ""
    }
    inCodeBlock = false
  }

  for (const line of lines) {
    // Code block toggle
    if (line.trim().startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock()
      } else {
        flushList()
        inCodeBlock = true
        codeLanguage = line.trim().slice(3).trim()
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    const trimmed = line.trim()

    if (trimmed === "") {
      flushList()
      continue
    }

    if (trimmed.startsWith("## ")) {
      flushList()
      elements.push(
        <h2 key={elements.length} className="text-2xl sm:text-[var(--text-fluid-h2)] font-serif font-semibold text-warm-gray-900 mt-10 mb-4">
          {renderInline(trimmed.replace("## ", ""))}
        </h2>
      )
      continue
    }

    if (trimmed.startsWith("### ")) {
      flushList()
      elements.push(
        <h3 key={elements.length} className="text-xl sm:text-[var(--text-fluid-h3)] font-serif font-semibold text-warm-gray-900 mt-8 mb-3">
          {renderInline(trimmed.replace("### ", ""))}
        </h3>
      )
      continue
    }

    if (trimmed.startsWith("> ")) {
      flushList()
      elements.push(
        <blockquote key={elements.length} className="border-l-4 border-accent/40 bg-cream/50 pl-6 py-4 my-6 rounded-r-lg italic text-warm-gray-600 leading-relaxed">
          {renderInline(trimmed.slice(2))}
        </blockquote>
      )
      continue
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true
      listItems.push(renderInline(trimmed.substring(2)))
      continue
    }

    flushList()

    elements.push(
      <p key={elements.length} className="text-warm-gray-700 leading-[1.8] mb-4">
        {renderInline(trimmed)}
      </p>
    )
  }

  flushList()
  flushCodeBlock()
  return <>{elements}</>
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return (
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-serif font-semibold text-warm-gray-900">Post not found</h1>
          <p className="mt-4 text-warm-gray-500">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to blog
          </Link>
        </div>
      </section>
    )
  }

  const readingTime = estimateReadingTime(post.content)

  return (
    <article className="py-12 sm:py-16 bg-cream">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Article header */}
        <header className="mb-12 text-center">
          {/* Category badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">Blog</span>
          </div>

          {/* Title */}
          <h1
            className="font-serif text-[var(--text-fluid-h1)] font-semibold leading-[1.15] tracking-tight text-warm-gray-900 mb-6"
            style={{ textWrap: "balance" }}
          >
            {post.title}
          </h1>

          {/* Meta line */}
          <div className="flex items-center justify-center gap-4 text-sm text-warm-gray-400">
            <time>{formatDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-warm-gray-300" />
            <span>{readingTime} min read</span>
          </div>
        </header>

        {/* Warm divider */}
        <hr className="warm-divider max-w-xs mx-auto mb-12" />

        {/* Article content */}
        <div className="text-[var(--text-fluid-body)]">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-warm-gray-200">
          <hr className="warm-divider max-w-xs mx-auto mb-8" />
          <div className="flex items-center justify-center">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-lg border border-warm-gray-200 bg-white px-6 py-3 text-sm font-medium text-warm-gray-700 transition-all hover:border-warm-gray-300 hover:bg-warm-gray-50 hover:-translate-y-0.5 hover:shadow-sm"
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
