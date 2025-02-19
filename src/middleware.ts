import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { fetchQuery } from "convex/nextjs"
import { NextResponse } from "next/server"
import { api } from "../convex/_generated/api"

const allowedRoutes: Record<string, string[]> = {
  active: [
    "/dashboard/account",
    "/dashboard/settings",
    "/dashboard/billing",
    "/dashboard",
  ],
  trialing: ["/dashboard(.*)"],
  cancelled: [
    "/dashboard/account",
    "/dashboard/settings",
    "/dashboard/billing",
  ],
  none: ["/pricing", "/"],
}

export default clerkMiddleware(async (auth, req) => {
  const token = await (await auth()).getToken({ template: "convex" })

  // Fetch subscription status from Convex.
  const { hasActiveSubscription, subStatus } = await fetchQuery(
    api.subscriptions.getUserSubscriptionStatus,
    {},
    { token: token! }
  )
  console.log("Sub status: ", subStatus)
  const pathname = req.nextUrl.pathname

  // Use "none" if subStatus is undefined.
  const currentStatus = subStatus ? subStatus : "none"

  // Redirect immediately if the user has no valid sub and is on a dashboard route.
  if (currentStatus === "none" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin))
  }

  const allowedForStatus = allowedRoutes[currentStatus] || []
  const isAllowed = allowedForStatus.some((route) => {
    const regex = new RegExp(`^${route}$`, "i")
    return regex.test(pathname)
  })

  if (pathname.startsWith("/dashboard") && !isAllowed) {
    const referer = req.headers.get("referer")
    const target = referer ? referer : "/"
    const redirectUrl = new URL(target, req.nextUrl.origin)
    return NextResponse.redirect(redirectUrl)
  }

  const matcher = createRouteMatcher([
    "/dashboard(.*)",
    "/thelist(.*)",
    "/settings(.*)",
    "/account(.*)",
    "/account(.*)",
  ])
  if (matcher(req)) await auth.protect()

  // Check if the user is authenticated and redirect if they try to visit /sign-in, /sign-up, or /forgot-password
  // const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"]
  // const isAuthRoute = authRoutes.includes(pathname)

  // if (isAuthRoute) {
  //   if (token) {
  //     return NextResponse.redirect(new URL("/", req.nextUrl.origin))
  //   }
  // }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
