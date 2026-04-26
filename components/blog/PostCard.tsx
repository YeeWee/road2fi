import Link from "next/link"
import type { PostMeta } from "@/lib/posts"

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      {post.thumbnail ? (
        <img
          src={post.thumbnail}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}

      <div className="p-6">
        <time className="text-xs text-gray-500">{post.date}</time>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-gray-700">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </Link>
  )
}
