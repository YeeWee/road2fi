import Link from "next/link"

export default function CTASection() {
  return (
    <section className="relative py-[var(--spacing-section)] sm:py-28 bg-brand overflow-hidden">
      {/* Background texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)" />
      </svg>

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -right-10 -top-10 w-48 h-48 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 w-40 h-40 rounded-full border border-white/10" />

      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-6 animate-fadeInUp">
          Your Journey Starts Here
        </p>

        {/* Headline */}
        <h2
          className="font-serif text-[var(--text-fluid-h1)] font-semibold leading-tight text-white mb-6 animate-fadeInUp-delay"
          style={{ textWrap: "balance" }}
        >
          Build the future you deserve.
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg text-white/70 max-w-lg mx-auto mb-10 animate-fadeInUp-delay"
          style={{ textWrap: "balance" }}
        >
          No jargon. No get-rich-quick schemes. Just clear, honest insights
          rooted in value investing to help you achieve financial independence.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp-delay-2">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-3.5 text-base font-semibold text-brand shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl hover:-translate-y-0.5"
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
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 text-base font-medium text-white/90 transition-all hover:bg-white/10 hover:border-white/50"
          >
            Our Story
          </a>
        </div>

        {/* Trust line */}
        <p className="mt-12 text-sm text-white/40 animate-fadeInUp-delay-2">
          Built with patience, not predictions.
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    </section>
  )
}
