"use client"

import CheckoutForm from "@/src/components/checkout-page"
import { convertToSubcurrency } from "@/src/lib/utils"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

type Props = {}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not configured")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!)

function checkout({}: Props) {
  const amount = 50
  return (
    <main className='flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 dark:text-white'>
        Checkout
      </h1>
      <p className='mt-6 text-lg text-gray-500 dark:text-gray-400'>
        Basic Plan Signup
      </p>
      <div className='mt-6 flex flex-col gap-4'>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}>
          <CheckoutForm amount={amount} />
        </Elements>
      </div>
    </main>
  )
}

export default checkout
