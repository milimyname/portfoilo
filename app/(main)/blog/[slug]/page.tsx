import { notFound } from "next/navigation"
import { allArticles } from "contentlayer/generated"
import { ArticlePageProps } from "types"
import { getTableOfContents } from "@/lib/table-contents"
import Mdx from "@/components/blog/mdx"
import "@/styles/mdx.css"
import { TableOfContents } from "@/components/blog/table-contents"
import TocBtn from "@/components/blog/tox-btn"
import { db } from "@/lib/db"

export async function generatedStatisParams(): Promise<
  ArticlePageProps["params"][]
> {
  return allArticles.map((article) => {
    return {
      slug: article.slug,
    }
  })
}

// Create a post in db
// export async function createPost(input: {
//   title: any
//   content: any
//   published: any
//   id: any
// }) {
//   return await db.post.create({
//     data: {
//       title: input.title,
//       content: input.content,
//       published: input.published,
//       authorId: input.id,
//     },
//   })
// }

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params
  const article = allArticles.find((article) => article.slug === slug)

  // If the article is not found, return a 404 page
  if (!article) return notFound()

  // Get the table of contents for the article
  const tableOfContents = await getTableOfContents(article.body.raw)

  // Create Post
  // if (article) {
  //   await createPost({
  //     title: article.title,
  //     // Content is a JSON object of mdx content
  //     content: {
  //       article: article.body.code,
  //     },
  //     published: true,
  //     id: "clcarc90u0000v6xy8l8z8wg8",
  //   })
  // }

  return (
    <main className="py-6 lg:flex lg:justify-center lg:gap-12">
      <section className="mx-auto max-w-[calc(100vw-100px)] lg:mx-0 lg:max-w-3xl">
        <h1 className="text-4xl font-bold">{article.title}</h1>
        <p className="text-sm text-gray-500">
          {article.publishedAt} • {article.readingTime.text}
        </p>
        {/* Render the article tags string */}
        <div className="flex flex-wrap gap-2 mt-4">
          {article.tags.split(",").map((tag) => (
            <span className="text-sm text-gray-500" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <hr className="my-6" />
        {/* Render the author */}
        <div className="flex items-center gap-4">
          <img
            src={article.author.image}
            alt={article.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-bold">{article.author.name}</p>
            <p className="text-sm text-gray-500">{article.author.type}</p>
          </div>
        </div>

        {/* Render the article image */}
        {article.image && (
          <img
            src={article.image}
            alt={article.title}
            className="my-6 rounded-md"
          />
        )}

        <Mdx code={article.body.code} />
      </section>
      <aside className="lg:w-52">
        <TocBtn className="block lg:hidden pointer fixed bottom-6 right-6 z-50" />
        <div className="table-contents hidden fixed min-w-xs bottom-20 right-6 p-6 bg-primary-orange rounded-md  lg:bg-transparent lg:p-0 lg:rounded-none lg:sticky lg:top-16 lg:-mt-10 lg:max-h-[calc(var(--vh)-4rem)] overflow-y-auto lg:pt-10 lg:block">
          <TableOfContents toc={tableOfContents} />
        </div>
      </aside>
    </main>
  )
}
