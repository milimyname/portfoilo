import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        // Check if the user exists
        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        })

        if (!user) throw new Error("User not found")

        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!passwordMatch) throw new Error("Password is incorrect")

        return {
          id: user.id,
          username: user.username,
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
      }
      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          username: token.username,
        },
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      return {
        id: dbUser.id,
        username: dbUser.username,
      }
    },
  },
}
