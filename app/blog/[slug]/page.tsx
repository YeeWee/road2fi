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

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let inList = false
  let listItems: string[] = []

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-1">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
      listItems = []
    }
    inList = false
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed === "") {
      flushList()
      continue
    }

    if (trimmed.startsWith("## ")) {
      flushList()
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          {trimmed.replace("## ", "")}
        </h2>
      )
      continue
    }

    if (trimmed.startsWith("### ")) {
      flushList()
      elements.push(
        <h3 key={elements.length} className="text-xl font-semibold text-gray-900 mt-6 mb-3">
          {trimmed.replace("### ", "")}
        </h3>
      )
      continue
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true
      listItems.push(trimmed.substring(2))
      continue
    }

    flushList()

    elements.push(
      <p key={elements.length} className="text-gray-700 leading-relaxed">
        {trimmed}
      </p>
    )
  }

  flushList()
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
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <p className="mt-4 text-gray-600">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/blog" className="mt-6 inline-block text-blue-600 hover:text-blue-700">
            &larr; Back to blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <article className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <time className="text-sm text-gray-500">{post.date}</time>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {post.title}
          </h1>
        </header>

        {post.thumbnail && (
          <div className="mb-10">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full rounded-xl object-cover"
              style={{ maxHeight: "400px" }}
            />
          </div>
        )}

        <div className="prose prose-gray max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">
            &larr; Back to blog
          </Link>
        </div>
      </div>
    </article>
  )
}
