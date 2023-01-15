"use client"
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"

function UserAuthForm() {
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const { username, password } = e.target.elements

    await signIn("credentials", {
      username: username.value,
      password: password.value,
      callbackUrl: "/dashboard",
    })
  }

  return (
    <form className=" flex flex-col py-4  gap-4" onSubmit={handleSubmit}>
      <label className="flex gap-6">
        <span>Username</span>
        <input type="text" placeholder="username" name="username" />
      </label>
      <label className="flex gap-6">
        Password
        <input type="password" placeholder="password" name="password" />
      </label>
      <button type="submit" className=" bg-primary-green text-white p-4">
        Sign In
      </button>
    </form>
  )
}

export default UserAuthForm
