import { getAllPosts } from "@/lib/posts"
import PostCard from "@/components/blog/PostCard"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="py-16 sm:py-24 bg-cream">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Blog
          </p>
          <h1 className="font-serif text-[var(--text-fluid-h1)] font-semibold text-warm-gray-900 mb-4">
            Insights & Lessons
          </h1>
          <p className="text-lg text-warm-gray-500 max-w-lg mx-auto" style={{ textWrap: "balance" }}>
            From our journey toward Financial Independence.
          </p>
          <hr className="warm-divider max-w-xs mx-auto mt-8" />
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <p className="text-center text-warm-gray-400">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
