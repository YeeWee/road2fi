import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-cream">
      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid texture */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="oklch(0.55 0.15 80)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Left accent circles */}
        <svg
          className="absolute left-4 bottom-12 w-[12vw] max-w-[150px] opacity-[0.04]"
          viewBox="0 0 250 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="125" cy="100" r="80" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
          <circle cx="125" cy="100" r="50" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
          <circle cx="125" cy="100" r="20" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="animate-fadeInUp text-sm font-semibold uppercase tracking-widest text-accent mb-6">
          Your Road to Financial Independence
        </p>

        {/* Main heading */}
        <h1
          className="animate-fadeInUp font-serif text-[var(--text-fluid-hero)] font-semibold leading-[1.05] tracking-tight text-warm-gray-900 mb-6"
          style={{ textWrap: "balance" }}
        >
          Build wealth with clarity.
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fadeInUp-delay text-[var(--text-fluid-lead)] text-warm-gray-600 max-w-xl mx-auto mb-10"
          style={{ textWrap: "balance" }}
        >
          Clear, actionable investment insights rooted in value investing principles —
          helping ordinary people build lasting wealth.
        </p>

        {/* CTA */}
        <div className="animate-fadeInUp-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-lg bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-hover hover:shadow-xl hover:-translate-y-0.5"
          >
            Start Reading
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-lg border border-warm-gray-300 px-8 py-3.5 text-base font-medium text-warm-gray-700 transition-all hover:bg-warm-gray-50 hover:border-warm-gray-400"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-gentle-bounce">
        <div className="flex flex-col items-center gap-1.5 text-warm-gray-300">
          <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
