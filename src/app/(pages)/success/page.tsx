import { api } from "@/convex/_generated/api"
import { Button } from "@/src/components/ui/button"
import NavBar from "@/src/components/wrapper/navbar"
import { getAuthToken } from "@/src/lib/auth"
import { fetchQuery } from "convex/nextjs"
import Link from "next/link"

export default async function SuccessPage() {
  const token = await getAuthToken()

  const { hasActiveSubscription } = await fetchQuery(
    api.subscriptions.getUserSubscriptionStatus,
    {},
    {
      token: token!,
    }
  )

  return (
    <main className='flex min-w-screen flex-col items-center justify-between'>
      <NavBar />
      {hasActiveSubscription ? (
        <h1 className='mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0'>
          Subscription Successful 🎉
        </h1>
      ) : (
        <h1 className='mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0'>
          {/* You Can Subscribe Now */}
          {/* //TODO: Add a follow-up asking users to fill out the form selecting
          what they would like to do (role) and gathering info needed in order
          to apply to projects. */}
          Subscription Successful 🎉
        </h1>
      )}
      <Link
        href={hasActiveSubscription ? "/dashboard" : "/pricing"}
        className='mt-4'>
        <Button>
          {hasActiveSubscription ? "Access Dashboard" : "View Pricing"}
        </Button>
      </Link>
    </main>
  )
}
