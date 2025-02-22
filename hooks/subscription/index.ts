"use client"

import { useUser } from "@clerk/nextjs"
import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useSubscription() {
    const { isSignedIn, user } = useUser()
    const { data, error } = useSWR(
        isSignedIn ? `/api/subscription/status?clerkId=${user?.id}` : null,
        fetcher,
    )

    return {
        subscription: data?.subscription,
        isLoading: !error && !data,
        isError: error,
        user,
    }
}
