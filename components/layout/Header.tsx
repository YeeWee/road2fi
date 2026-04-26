import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Road to Fi
        </Link>
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            Home
          </Link>
          <Link href="/blog" className="hover:text-gray-900">
            Blog
          </Link>
        </div>
      </nav>
    </header>
  )
}
