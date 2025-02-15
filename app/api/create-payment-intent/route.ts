import { NextRequest, NextResponse } from "next/server"

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json()
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      }, //Will detect which payment methods are available for the customer based on their browser/device and automatically attach them to the payment intent.
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Internal Error:", error)
    // Handle other errors (eg network issues, invalid input, etc)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}
