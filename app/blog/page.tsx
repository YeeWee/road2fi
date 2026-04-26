import { getAllPosts } from "@/lib/posts"
import PostCard from "@/components/blog/PostCard"

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Blog
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Insights and lessons from our journey toward Financial Independence.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet. Check back soon!</p>
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
