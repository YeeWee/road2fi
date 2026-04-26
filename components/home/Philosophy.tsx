export default function Philosophy() {
  const principles = [
    {
      number: "01",
      name: "Invest in What You Understand",
      description: "Only buy businesses you can analyze and comprehend. If you can't explain how a company makes money, don't own it.",
    },
    {
      number: "02",
      name: "Margin of Safety",
      description: "Always buy assets below their intrinsic value. This buffer protects against mistakes, bad luck, and market volatility.",
    },
    {
      number: "03",
      name: "Think Long-Term",
      description: "Patience is the investor's greatest edge. Compound returns accelerate over decades, not months.",
    },
    {
      number: "04",
      name: "Let Compounding Work",
      description: "Reinvest earnings and hold quality businesses. Time in the market beats timing the market.",
    },
  ]

  return (
    <section className="py-[var(--spacing-section)] sm:py-28 bg-warm-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Core Principles
          </p>
          <h2 className="font-serif text-[var(--text-fluid-h2)] font-semibold text-warm-gray-900 mb-4">
            Our Investment Philosophy
          </h2>
          <p className="text-lg text-warm-gray-500 max-w-xl mx-auto" style={{ textWrap: "balance" }}>
            Time-tested principles that guide every decision we make.
          </p>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="group relative rounded-2xl border border-warm-gray-200 bg-white p-8 transition-all duration-300 hover:border-warm-gray-300 card-lift"
            >
              {/* Number badge — subtle, not a solid block */}
              <span className="font-serif text-4xl font-semibold text-accent/20 group-hover:text-accent/40 transition-colors">
                {principle.number}
              </span>

              <h3 className="mt-3 text-xl font-serif font-semibold text-warm-gray-900 mb-2">
                {principle.name}
              </h3>
              <p className="text-warm-gray-600 leading-relaxed">
                {principle.description}
              </p>

              {/* Subtle bottom accent on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-accent/0 via-accent/50 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
