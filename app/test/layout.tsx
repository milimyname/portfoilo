// import { docsConfig } from "@/config/docs"
import { LayoutProps } from "types"

export default function TestLayout({ children }: LayoutProps) {
  return <div className="relative min-h-screen">{children}</div>
}
