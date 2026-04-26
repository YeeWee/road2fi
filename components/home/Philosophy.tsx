export default function Philosophy() {
  const principles = [
    {
      name: "Invest in What You Understand",
      description: "Only buy businesses you can analyze and comprehend. If you can't explain how a company makes money, don't own it.",
    },
    {
      name: "Margin of Safety",
      description: "Always buy assets below their intrinsic value. This buffer protects against mistakes, bad luck, and market volatility.",
    },
    {
      name: "Think Long-Term",
      description: "Patience is the investor's greatest edge. Compound returns accelerate over decades, not months.",
    },
    {
      name: "Let Compounding Work",
      description: "Reinvest earnings and hold quality businesses. Time in the market beats timing the market.",
    },
  ]

  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Our Investment Philosophy
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Time-tested principles that guide every decision we make.
        </p>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{principle.name}</h3>
              <p className="text-gray-600">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
