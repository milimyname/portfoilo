"use client"
import { Montserrat } from "@next/font/google"

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
      <head />
      <body className=" bg-primary-white overflow-x-hidden">{children}</body>
    </html>
  )
}
