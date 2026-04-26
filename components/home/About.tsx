export default function About() {
  return (
    <section id="about" className="py-[var(--spacing-section)] sm:py-28 bg-cream">
      {/* Top divider */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-16">
        <hr className="warm-divider max-w-xs mx-auto" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            About
          </p>
          <h2 className="font-serif text-[var(--text-fluid-h2)] font-semibold text-warm-gray-900 mb-4">
            The Story Behind Road2Fi
          </h2>
          <p className="text-lg text-warm-gray-500 max-w-xl mx-auto" style={{ textWrap: "balance" }}>
            How a personal journey became a mission to help others.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Story text */}
          <div className="lg:col-span-2 space-y-6 text-warm-gray-700 leading-relaxed">
            <p className="text-[var(--text-fluid-body)]">
              I started my investing journey like most people — reading financial news, following tips,
              and watching my portfolio swing with the market. After years of trial and error, I
              discovered the principles of value investing and the FIRE movement. Everything changed.
            </p>
            <p className="text-[var(--text-fluid-body)]">
              Road to Fi was born from a simple belief: financial independence shouldn&apos;t be reserved
              for Wall Street professionals. The same principles that built my portfolio — investing
              in what you understand, buying with a margin of safety, and thinking in decades, not days
              — are available to everyone.
            </p>
            <p className="text-[var(--text-fluid-body)]">
              This site is my way of sharing what I&apos;ve learned. No jargon. No get-rich-quick schemes.
              Just clear, honest insights to help you build the life you want.
            </p>
          </div>

          {/* Belief sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-warm-gray-200 bg-white p-8">
              <h3 className="font-serif text-lg font-semibold text-warm-gray-900 mb-6">
                What We Believe
              </h3>
              <ul className="space-y-5">
                {[
                  "Financial freedom is a journey, not a destination",
                  "Knowledge is the best investment you can make",
                  "Simple strategies beat complex ones every time",
                  "Transparency builds trust, and trust builds wealth",
                ].map((belief, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-serif text-accent font-semibold text-sm mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-warm-gray-700 text-sm leading-snug">{belief}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
