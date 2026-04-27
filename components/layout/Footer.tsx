import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-warm-gray-200 bg-warm-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 mb-10">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-warm-gray-900 mb-2">
              Road2Fi<span className="text-accent">.</span>
            </h3>
            <p className="text-sm text-warm-gray-500 leading-relaxed">
              Helping ordinary people achieve Financial Independence through clear, actionable insights.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-warm-gray-900 mb-3 uppercase tracking-wider">
              Navigate
            </h4>
            <ul className="space-y-2 text-sm text-warm-gray-500">
              <li><Link href="/" className="transition-colors hover:text-warm-gray-900">Home</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-warm-gray-900">Blog</Link></li>
              <li><a href="#about" className="transition-colors hover:text-warm-gray-900">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-warm-gray-900 mb-3 uppercase tracking-wider">
              Contact
            </h4>
            <p className="text-sm text-warm-gray-500">
              <a href="mailto:kurt@roadtofi.com" className="transition-colors hover:text-warm-gray-900">
                kurt@roadtofi.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-warm-gray-200 pt-8 text-sm text-warm-gray-400 sm:flex-row sm:justify-between">
          <p>&copy; {year} Road2Fi.com. All rights reserved.</p>
          <p className="text-xs">Built with patience, not predictions.</p>
        </div>
      </div>
    </footer>
  )
}
