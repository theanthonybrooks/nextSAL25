// AuthCheck.tsx (Client Component)
"use client"

import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { redirect, usePathname } from "next/navigation"

type Props = {
  children: React.ReactNode
}

const AuthCheck = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const user = useQuery(api.auth.onAuthenticatedUser)
  const pathname = usePathname()

  console.log("user", user)
  console.log("isAuthenticated", isAuthenticated)

  // if (isLoading || user === undefined) {
  //   return <div>Loading...</div>
  // }

  if (isAuthenticated && user?.status === 200) {
    // You can add more checks here based on the user object
    // For example, checking roles or other parameters
    // if (user.someRequiredField) {
    //   redirect("/");
    // }
    console.log("user status: ", user.status)
    redirect("/thelist")
  }

  if (!isAuthenticated && user?.status === 404 && pathname === "/") {
    redirect("/pricing")
  }

  return <>{children}</>
}

export default AuthCheck
