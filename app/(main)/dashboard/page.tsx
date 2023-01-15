import Mdx from "@/components/blog/mdx"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

async function getAllPosts() {
  return await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })
}

export default async function DashboardPage() {
  const user = (await getCurrentUser()) as any
  const posts = await getAllPosts()
  if (!user) redirect("/blog")

  if (posts.length === 0) {
    return (
      <div className="text-center text-3xl min-h-screen">
        <p>No posts from</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-4">
          <h1 className="text-2xl">{post.title}</h1>
          {/* <Mdx code={post.content.article} / */}
        </div>
      ))}
    </div>
  )
}
