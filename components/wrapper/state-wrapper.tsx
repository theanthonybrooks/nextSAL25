"use client"
import { api } from "@/convex/_generated/api"
import { useAuth } from "@clerk/nextjs"
import { useMutation, useQuery } from "convex/react"
import { useEffect, useRef } from "react"

export default function StoreUserWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const { isSignedIn } = useAuth()
  const user = useQuery(api.users.getUser)
  const storeUser = useMutation(api.users.store)

  // Refs to store previous values (using JSON for deep comparison)
  const prevUserJSONRef = useRef<string>("")
  const prevIsSignedInRef = useRef<boolean | undefined>(undefined)

  useEffect(() => {
    if (!user || user === "Not authenticated" || !isSignedIn) return

    // Convert user to a string for comparison
    const userJSON = JSON.stringify(user)

    // Check if either the user or signed-in status has actually changed
    if (
      userJSON !== prevUserJSONRef.current ||
      isSignedIn !== prevIsSignedInRef.current
    ) {
      storeUser()

      prevUserJSONRef.current = userJSON
      prevIsSignedInRef.current = isSignedIn
    }
  }, [user, isSignedIn, storeUser])

  return <>{children}</>
}
