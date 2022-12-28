"use client"

import { useMemo, useState, useEffect } from "react"

import { tw } from "@/lib/utils"
import type { TableOfContentsProps, TreeProps } from "types"

export function TableOfContents({ toc }: { toc: TableOfContentsProps }) {
  // Store ids in itemsIds arr so we can use them in the IntersectionObserver
  const itemIds = useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id.split("#")[1])
        : [],
    [toc]
  )

  const activeHeading = useActiveItem(itemIds)

  if (!toc?.items) return null

  return <Tree tree={toc} activeItem={activeHeading} />
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(
        (entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        },
        { treshold: 0.5 }
      )
    })

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [itemIds])

  return activeId
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={tw("m-0 list-none", { "pl-4": level !== 1 })}>
      {tree.items.map((item, index) => {
        return (
          <li key={index} className={tw("mt-0 pt-2")}>
            <a
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(item.url.split("#")[1])
                if (element) element.scrollIntoView({ behavior: "smooth" })
              }}
              className={tw(
                "inline-block no-underline",
                item.url === `#${activeItem}`
                  ? "text-state-900 font-medium"
                  : "text-sm text-slate-600 hover:text-slate-900"
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
