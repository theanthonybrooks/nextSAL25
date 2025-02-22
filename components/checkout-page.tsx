"use client"

import { convertToSubcurrency } from "@/lib/utils"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useEffect, useState } from "react"

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
  }, [amount])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    if (!stripe || !clientSecret || !elements) {
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setErrorMessage(submitError.message)
      setLoading(false)
      return
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    })

    if (error) {
      //This point is only reached if there's an immediate error when confirming the payment. Show the error to your customer (for example, payment details incomplete).
      setErrorMessage(error.message)
    } else {
      //The payment UI automatically closes with a success animation. They're redirected to the return_url you provided in the confirmPayment() call.
    }

    setLoading(false)
  }

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className='flex items-center justify-center'>
        <div
          className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface  motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white'
          role='status'>
          <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
            Initializing payment...
          </span>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 bg-white p-6 shadow-md rounded-lg'>
      {clientSecret && <PaymentElement />}

      <button
        disabled={!stripe || loading}
        className='inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
        {!loading ? "Pay $" + amount : "Processing..."}
      </button>
    </form>
  )
}

export default CheckoutForm
