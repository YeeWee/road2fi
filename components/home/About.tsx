export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            The Story Behind Road to Fi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            How a personal journey became a mission to help others.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                I started my investing journey like most people — reading financial news, following tips,
                and watching my portfolio swing with the market. After years of trial and error, I
                discovered the principles of value investing and the FIRE movement. Everything changed.
              </p>
              <p>
                Road to Fi was born from a simple belief: financial independence shouldn&apos;t be reserved
                for Wall Street professionals. The same principles that built my portfolio — investing
                in what you understand, buying with a margin of safety, and thinking in decades, not days
                — are available to everyone.
              </p>
              <p>
                This site is my way of sharing what I&apos;ve learned. No jargon. No get-rich-quick schemes.
                Just clear, honest insights to help you build the life you want.
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">What We Believe</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">01</span>
                  <span className="text-gray-700">Financial freedom is a journey, not a destination</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">02</span>
                  <span className="text-gray-700">Knowledge is the best investment you can make</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">03</span>
                  <span className="text-gray-700">Simple strategies beat complex ones every time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold text-lg">04</span>
                  <span className="text-gray-700">Transparency builds trust, and trust builds wealth</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
