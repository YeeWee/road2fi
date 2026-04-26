import type { Metadata } from "next"
import { Newsreader, Outfit } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Road2Fi.com — Your Road to Financial Independence",
  description: "Helping ordinary people achieve Financial Independence through clear, actionable investment insights.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${outfit.variable} font-sans antialiased bg-cream`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
