import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Road to Fi
        </Link>
        <div className="flex gap-6 sm:gap-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/blog" className="hover:text-gray-900">
            Blog
          </Link>
          <a href="#about" className="hover:text-gray-900">
            About
          </a>
        </div>
      </nav>
    </header>
  )
}
