import Link from "next/link"
import type { PostMeta } from "@/lib/posts"

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block rounded-2xl border border-warm-gray-200 bg-white overflow-hidden transition-all duration-300 card-lift">
      {/* Thumbnail */}
      <div className="aspect-[16/9] overflow-hidden bg-warm-gray-100">
        {post.thumbnail ? (
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-3xl text-warm-gray-300">R</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <time className="text-xs font-medium text-warm-gray-400">{post.date}</time>
        <h3 className="mt-2 font-serif text-lg font-semibold text-warm-gray-900 group-hover:text-brand transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-warm-gray-600 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
          Read more
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </Link>
  )
}
