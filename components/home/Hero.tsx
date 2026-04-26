export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-cream">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Subtle grid texture */}
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

        {/* Large warm glow behind heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[700px] aspect-square rounded-full bg-accent/5 blur-3xl" />

        {/* Left accent arcs */}
        <svg
          className="absolute left-[-60px] bottom-20 w-[200px] h-[200px] opacity-[0.06]"
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="20" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="oklch(0.35 0.10 30)" strokeWidth="0.3" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="oklch(0.35 0.10 30)" strokeWidth="0.3" />
        </svg>

        {/* Right decorative diamond */}
        <svg
          className="absolute right-12 top-1/4 w-32 h-32 opacity-[0.04]"
          viewBox="0 0 120 120"
          fill="none"
        >
          <rect x="20" y="20" width="80" height="80" rx="4" stroke="oklch(0.55 0.15 80)" strokeWidth="0.5" transform="rotate(45 60 60)" />
          <rect x="35" y="35" width="50" height="50" rx="2" stroke="oklch(0.55 0.15 80)" strokeWidth="0.5" transform="rotate(45 60 60)" />
        </svg>

        {/* Bottom-left subtle cross marks */}
        <svg
          className="absolute left-20 bottom-1/4 w-24 h-24 opacity-[0.04]"
          viewBox="0 0 80 80"
          fill="none"
        >
          <path d="M40 0v80M0 40h80" stroke="oklch(0.35 0.10 30)" strokeWidth="0.5" />
          <circle cx="40" cy="40" r="30" stroke="oklch(0.35 0.10 30)" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="animate-fadeInUp text-sm font-semibold uppercase tracking-widest text-accent mb-8 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-accent/40 inline-block" />
          Your Road to Financial Independence
          <span className="w-8 h-px bg-accent/40 inline-block" />
        </p>

        {/* Main heading */}
        <h1
          className="animate-fadeInUp font-serif text-[var(--text-fluid-hero)] font-semibold leading-[1.05] tracking-tight text-warm-gray-900 mb-8"
          style={{ textWrap: "balance" }}
        >
          Build wealth
          <span className="text-accent">,</span> with clarity<span className="text-accent">.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-fadeInUp-delay text-[var(--text-fluid-lead)] text-warm-gray-600 max-w-xl mx-auto mb-10"
          style={{ textWrap: "balance" }}
        >
          Clear, actionable investment insights rooted in value investing —
          helping ordinary people build lasting wealth.
        </p>

        {/* CTA buttons */}
        <div className="animate-fadeInUp-delay-2 flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
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
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-lg border border-warm-gray-300 px-8 py-3.5 text-base font-medium text-warm-gray-700 transition-all hover:bg-warm-gray-50 hover:border-warm-gray-400"
          >
            Our Story
          </a>
        </div>

        {/* Pillars strip */}
        <div className="animate-fadeInUp-delay-2 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 pt-8 border-t border-warm-gray-200/80 max-w-2xl mx-auto">
          {[
            { label: "Value Investing" },
            { label: "Long-Term Focus" },
            { label: "No Jargon" },
          ].map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-warm-gray-500 text-sm font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              {item.label}
            </span>
          ))}
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
