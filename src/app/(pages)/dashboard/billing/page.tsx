"use client"
import { api } from "@/convex/_generated/api"
import { Button } from "@/src/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Skeleton } from "@/src/components/ui/skeleton"
import { useUser } from "@clerk/nextjs"
import { useAction, useQuery } from "convex/react"
import { format } from "date-fns"

import { CreditCard } from "lucide-react"

export default function AccountPage() {
  const { user } = useUser()

  const userData = useQuery(
    api.users.getUserByToken,
    user?.id ? { tokenIdentifier: user.id } : "skip"
  )

  const subscription = useQuery(api.subscriptions.getUserSubscription)
  const getDashboardUrl = useAction(api.subscriptions.getStripeDashboardUrl)
  const currentPeriodEnd = new Date(
    subscription?.currentPeriodEnd ?? Date.now()
  )
  const canceledAt =
    subscription?.canceledAt !== undefined && subscription?.canceledAt

  const isCancelled = subscription?.status === "cancelled"

  let interval: string | undefined
  let nextInterval: string | undefined
  let nextAmount: string | undefined

  if (subscription?.intervalNext !== undefined) {
    // intervalNext exists
    nextInterval = subscription.intervalNext
  }
  if (subscription?.amountNext !== undefined) {
    // amountNext exists
    nextAmount = (subscription.amountNext! / 100).toFixed(0)
    interval = subscription.interval
  }

  const handleManageSubscription = async () => {
    try {
      const result = await getDashboardUrl({
        customerId: subscription?.customerId!,
      })
      if (result?.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error("Error getting dashboard URL:", error)
    }
  }

  return (
    <div className='flex flex-col gap-6 p-6'>
      <div>
        <h1 className='text-3xl font-semibold tracking-tight'>
          Subscription Overview
        </h1>
        <p className='text-muted-foreground mt-2'>
          Track your revenue, expenses, and financial metrics
        </p>
        <Button className='mt-3' onClick={handleManageSubscription}>
          Manage Subscription
        </Button>
      </div>

      {/* Account Information Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {/* Subscription Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CreditCard className='h-5 w-5' />
              Subscription Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!subscription ? (
              <div className='space-y-4'>
                <Skeleton className='h-4 w-[180px]' />
                <Skeleton className='h-4 w-[150px]' />
                <Skeleton className='h-4 w-[200px]' />
                <Skeleton className='h-4 w-[170px]' />
              </div>
            ) : (
              <div className='grid gap-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-muted-foreground'>Status:</span>
                  <span className='font-medium capitalize'>
                    {subscription?.status === "active" ? (
                      <span className='bg-green-100 text-green-700 py-1 px-3 rounded font-medium'>
                        Active
                      </span>
                    ) : subscription?.status === "past_due" ? (
                      <span className='bg-red-100 text-red-700 py-1 px-3 rounded font-medium'>
                        Past Due
                      </span>
                    ) : subscription?.status === "unpaid" ? (
                      <span className='bg-yellow-100 text-yellow-700 py-1 px-3 rounded font-medium'>
                        Unpaid
                      </span>
                    ) : subscription?.status === "trialing" ? (
                      <span className='bg-yellow-100 text-yellow-700 py-1 px-3 rounded font-medium'>
                        2 Week Free Trial
                      </span>
                    ) : (
                      <span className='bg-gray-100 text-gray-700 py-1 px-3 rounded font-medium'>
                        No Plan
                      </span>
                    )}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-muted-foreground'>
                    Account Interval:
                  </span>
                  <span className='font-medium capitalize'>
                    {subscription?.interval + "ly"}
                  </span>
                </div>

                <div className='flex justify-between items-start mt-0'>
                  <span className='whitespace-nowrap text-muted-foreground '>
                    Plan Amount:
                  </span>
                  <span className='font-medium flex  items-end justify-start flex-col'>
                    ${(subscription?.amount! / 100).toFixed(0)}
                    {nextAmount !== undefined && (
                      <>
                        <span className='font-light text-sm italic text-gray-400'>
                          {" "}
                          {/* (${(nextAmount! / 100).toFixed(0)} starting ) */}
                          (${nextAmount}/{interval} starting{" "}
                          {format(currentPeriodEnd, "MMM do yyyy")})
                        </span>
                        <span className='font-light text-sm italic text-gray-400 text-balance mt-1 text-end'>
                          Can be changed before start date via the{" "}
                          <a
                            href='#'
                            className=' font-normal text-gray-300'
                            onClick={handleManageSubscription}>
                            Manage Subscription
                          </a>{" "}
                          page
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-muted-foreground'>Auto Renew:</span>
                  <span className='font-medium'>
                    {isCancelled
                      ? "-"
                      : subscription?.cancelAtPeriodEnd
                        ? "No"
                        : "Yes"}
                  </span>
                </div>

                <div className='flex justify-between items-center'>
                  <span className='text-muted-foreground'>Next Account:</span>
                  <span className='font-medium'>
                    {isCancelled
                      ? "Cancelled"
                      : format(currentPeriodEnd, "eee, MMM do, yyyy")}
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-muted-foreground'>
                    {isCancelled ? "Account Created:" : "Subscribed Since:"}
                  </span>
                  <span className='font-medium'>
                    {format(new Date(subscription?.startedAt!), "MMM do, yyyy")}
                  </span>
                </div>
                {!canceledAt ? (
                  <div className='flex justify-between items-center'>
                    <span className='text-muted-foreground'>Last Updated:</span>
                    <span className='font-medium'>
                      {format(
                        new Date(subscription?.lastEditedAt!),
                        "MMM do, yyyy @ h:mm a"
                      )}
                    </span>
                  </div>
                ) : (
                  <div className='flex justify-between items-center'>
                    <span className='text-muted-foreground'>
                      Cancellation Date:
                    </span>
                    <span className='font-medium text-red-500'>
                      {format(
                        new Date(subscription?.canceledAt!),
                        "MMM do, yyyy @ h:mm a"
                      )}
                    </span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
