import React from "react"
import Link from "next/link"

function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="min-w-full justify-center gap-24 xs:hidden md:flex py-6">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/blog/first-article">First Article</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/">Community</Link>
        <Link href="/test">Test</Link>
      </header>
      {children}
      <footer className="min-w-full flex justify-center gap-24">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
      </footer>
    </div>
  )
}

export default BlogLayout
