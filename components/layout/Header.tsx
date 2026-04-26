"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-warm-gray-200 bg-cream/90 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-cream"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-semibold tracking-tight text-warm-gray-900 hover:text-brand transition-colors"
        >
          Road2Fi<span className="text-accent">.</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-warm-gray-500">
          <Link href="/" className="transition-colors hover:text-warm-gray-900">
            Home
          </Link>
          <Link href="/blog" className="transition-colors hover:text-warm-gray-900">
            Blog
          </Link>
          <a href="#about" className="transition-colors hover:text-warm-gray-900">
            About
          </a>
        </div>
      </nav>
    </header>
  )
}
