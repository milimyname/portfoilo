import { notFound } from "next/navigation"
import { allArticles } from "contentlayer/generated"
import { ArticlePageProps } from "types"
import { getTableOfContents } from "@/lib/table-contents"
import Mdx from "@/components/blog/mdx"
import "@/styles/mdx.css"
import { TableOfContents } from "@/components/blog/table-contents"
import TocBtn from "@/components/blog/tox-btn"

export async function generatedStatisParams(): Promise<
  ArticlePageProps["params"][]
> {
  return allArticles.map((article) => {
    return {
      slug: article.slug,
    }
  })
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params
  const article = allArticles.find((article) => article.slug === slug)

  // If the article is not found, return a 404 page
  if (!article) return notFound()

  // Get the table of contents for the article
  const tableOfContents = await getTableOfContents(article.body.raw)

  return (
    <main className="py-6 lg:flex lg:justify-center lg:gap-12">
      <section className="mx-auto max-w-[calc(100vw-100px)] lg:mx-0 lg:max-w-3xl">
        <Mdx code={article.body.code} />
      </section>
      <aside>
        <TocBtn className="block lg:hidden pointer fixed bottom-6 right-6 z-50" />
        <div className="table-contents hidden fixed min-w-xs bottom-20 right-6 p-6 bg-primary-orange rounded-md  lg:bg-transparent lg:p-0 lg:rounded-none lg:sticky lg:top-16 lg:-mt-10 lg:max-h-[calc(var(--vh)-4rem)] overflow-y-auto lg:pt-10 lg:block">
          <TableOfContents toc={tableOfContents} />
        </div>
      </aside>
    </main>
  )
}
