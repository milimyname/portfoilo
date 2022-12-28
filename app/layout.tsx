import { Montserrat } from "@next/font/google"
import Link from "next/link"

import "@/styles/global.css"
import { tw } from "@/lib/utils"

const oswald = Montserrat({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={tw(oswald.className, "sm:text-[100%] xs:text-[200%] ")}
    >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="py-12 bg-primary-white overflow-x-hidden">
        <header className="min-w-full justify-center gap-24 xs:hidden md:flex">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/blog/first-article">First Article</Link>
          <Link href="/">Community</Link>
          <Link href="/test">Test</Link>
        </header>
        {children}
        <footer className="min-w-full flex justify-center gap-24">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </footer>
      </body>
    </html>
  )
}
