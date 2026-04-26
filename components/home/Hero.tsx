import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          Your Road to Financial Independence Starts Here
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Clear, actionable investment insights to help ordinary people build lasting wealth.
        </p>
        <Link
          href="/blog"
          className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
        >
          Start Your Journey
        </Link>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
