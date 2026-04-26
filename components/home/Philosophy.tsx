export default function Philosophy() {
  const principles = [
    {
      number: "01",
      name: "Invest in What You Understand",
      description: "Only buy businesses you can analyze and comprehend. If you can't explain how a company makes money, don't own it.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
          <line x1="28.5" y1="28.5" x2="40" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.2" />
        </svg>
      ),
    },
    {
      number: "02",
      name: "Margin of Safety",
      description: "Always buy assets below their intrinsic value. This buffer protects against mistakes, bad luck, and market volatility.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <path d="M24 4L8 12v12c0 11 7.2 19.2 16 22 8.8-2.8 16-11 16-22V12L24 4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M17 24l5 5 9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: "03",
      name: "Think Long-Term",
      description: "Patience is the investor's greatest edge. Compound returns accelerate over decades, not months.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <path d="M6 38c4-6 8-14 12-14s6 8 10 8 6-6 14-14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="8" cy="38" r="2" fill="currentColor" />
          <circle cx="42" cy="10" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: "04",
      name: "Let Compounding Work",
      description: "Reinvest earnings and hold quality businesses. Time in the market beats timing the market.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <circle cx="24" cy="36" r="6" stroke="currentColor" strokeWidth="2" />
          <path d="M24 30V18" stroke="currentColor" strokeWidth="2" />
          <path d="M18 22l6-10 6 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 28c2-4 5-8 10-8s8 4 10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      ),
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
              className="group relative rounded-2xl border border-warm-gray-200 bg-gradient-to-br from-white to-warm-gray-50/80 p-8 transition-all duration-300 hover:border-accent/30 card-lift overflow-hidden"
            >
              {/* Top-right decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon + Number row */}
              <div className="flex items-center justify-between mb-6">
                {/* Icon */}
                <div className="text-accent transition-transform duration-300 group-hover:scale-110">
                  {principle.icon}
                </div>

                {/* Number badge */}
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/10 text-accent font-serif font-semibold text-sm transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                  {principle.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif font-semibold text-warm-gray-900 mb-2">
                {principle.name}
              </h3>
              <p className="text-warm-gray-600 leading-relaxed">
                {principle.description}
              </p>

              {/* Subtle bottom accent on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-accent/0 via-accent/60 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
