import { NextApiRequest, NextApiResponse } from "next"
import { db } from "@/lib/db"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { User } from "types"

// Disable Next.js body parsing
// https://nextjs.org/docs/api-routes/api-middlewares
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) return res.status(401).json({ message: "Not authenticated" })

  // Get user id from session
  const { user } = session as any

  // Get all posts
  if (req.method === "GET") {
    const posts = await db.post.findMany({
      where: {
        authorId: user.id,
      },
    })

    return res.status(200).json(posts)
  }

  // Create a new post
  if (req.method === "POST") {
    const { title, content } = req.body

    const post = await db.post.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
    })

    return res.status(200).json(post)
  }

  // Update a post
  if (req.method === "PUT") {
    const { id, title, content } = req.body

    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    })

    return res.status(200).json(post)
  }

  // Delete a post
  if (req.method === "DELETE") {
    const { id } = req.body

    const post = await db.post.delete({
      where: {
        id,
      },
    })

    return res.status(200).json(post)
  }

  return res.status(405).json({ message: "Method not allowed" })
}
