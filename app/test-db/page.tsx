import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

async function Page() {
  const user = await getCurrentUser()

  if (!user) return notFound()

  return (
    <div>
      <h1>Test DB</h1>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
    </div>
  )
}

export default Page
