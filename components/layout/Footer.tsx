import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-sm text-gray-600 sm:flex-row sm:justify-between">
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
