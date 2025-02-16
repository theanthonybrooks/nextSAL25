import Stripe from "stripe"
import { mutation } from "../_generated/server"
// import schema from "../schema"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia" as any,
})

export const importUserPlans = mutation({
  handler: async (ctx) => {
    // List all active Stripe products
    const products = await stripe.products.list({
      active: true,
    })

    // For each product, get its prices
    for (const product of products.data) {
      // List prices for the product
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      })

      // Build a pricing object based on interval
      const pricing: { [key: string]: any } = {}
      for (const price of prices.data) {
        if (price.recurring && price.recurring.interval) {
          pricing[price.recurring.interval] = {
            usd: {
              stripePriceId: price.id,
              amount: price.unit_amount, // Stripe amounts are in cents
            },
          }
        }
      }

      // Insert or update the plan in Convex
      // Here, we assume you use the product's metadata or name to determine the plan's key.
      // Adjust as needed.
      await ctx.db.insert("userPlans", {
        key: product.id, // or a custom key, like product.metadata.planKey
        title: product.name,
        description: product.description || "",
        stripeProductId: product.id,
        prices: pricing,
        features: [], // add any features if available
        popular: false, // customize as needed
      })
    }

    return { success: true }
  },
})
