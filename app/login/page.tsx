import UserAuthForm from "@/components/user-auth-form"
import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const user = await getCurrentUser()

  // If the user is already logged in, redirect them to the dashboard
  if (user) redirect("/dashboard")

  return (
    <div className=" border p-12  rounded-sm ">
      <h1 className=" text-center">Sign In</h1>
      <UserAuthForm />
    </div>
  )
}
