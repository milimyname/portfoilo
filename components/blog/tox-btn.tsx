"use client"

import { tw } from "@/lib/utils"
import { Icons } from "../icons"
import { useOnClickOutside, useTimeout, useUpdateEffect } from "usehooks-ts"
import { useRef } from "react"

function TocBtn({ className }: React.HTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)
  // Toggle hidden class on table of contents
  const handleClick = () => {
    const tableOfContents = document.querySelector(".table-contents")
    tableOfContents?.classList.toggle("hidden")
  }

  // Close table of contents on click outside but allow to click on the links inside of div
  useOnClickOutside(ref, (e) => {
    const tableOfContents = document.querySelector(".table-contents")
    if (e.target instanceof HTMLAnchorElement) return
    tableOfContents?.classList.add("hidden")
  })

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={tw("p-2 bg-primary-orange rounded-md", className)}
    >
      <Icons.menu color="white" size={32} />
    </button>
  )
}

export default TocBtn
