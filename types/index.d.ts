import Image from "next/image"
import type { Icon } from "lucide-react"

export interface ArticlePageProps {
  params: {
    slug: string
  }
}

export interface LayoutProps {
  children: React.ReactNode
}

export interface MdxProps {
  code: string
  components?: MdxComponentsTypes
}

export interface MdxComponentsTypes {
  Image: typeof Image
  h1: React.FC<{ className?: string }>
  h2: React.FC<{ className?: string }>
  h3: React.FC<{ className?: string }>
  h4: React.FC<{ className?: string }>
  h5: React.FC<{ className?: string }>
  h6: React.FC<{ className?: string }>
  a: React.FC<{ className?: string }>
  p: React.FC<{ className?: string }>
  ul: React.FC<{ className?: string }>
  ol: React.FC<{ className?: string }>
  li: React.FC<{ className?: string }>
  blockquote: React.FC<{ className?: string }>
  hr: React.FC<{ className?: string }>
  table: React.FC<{ className?: string }>
  tr: React.FC<{ className?: string }>
  th: React.FC<{ className?: string }>
  td: React.FC<{ className?: string }>
  pre: React.FC<{ className?: string }>
  code: React.FC<{ className?: string }>
  img: React.FC<{ className?: string }>
}

export interface SideNavItem {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icon
}

export interface TocItem {
  title: string
  url: string
  items?: TocItem[]
}

export interface TocItems {
  items?: TocItem[]
}

export type TableOfContentsProps = TocItems

export interface TreeProps {
  tree: TableOfContentsProps
  level?: number
  activeItem?: string
}
