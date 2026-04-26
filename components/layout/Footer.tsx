import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-8">
          {/* Brand column */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Road to Fi</h3>
            <p className="text-sm text-gray-600">Helping ordinary people achieve Financial Independence.</p>
          </div>
          {/* Navigation column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Navigate</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
              <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
              <li><a href="#about" className="hover:text-gray-900">About</a></li>
            </ul>
          </div>
          {/* Contact column */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Contact</h4>
            <p className="text-sm text-gray-600">hello@roadtofi.com</p>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-4 border-t border-gray-200 pt-8 text-sm text-gray-600 sm:flex-row sm:justify-between">
          <p>&copy; {year} Road to Fi. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/blog" className="hover:text-gray-900">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
