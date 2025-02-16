import { v } from "convex/values"
import Stripe from "stripe"
import { api, internal } from "./_generated/api" // import internal as well as api
import {
  action,
  httpAction,
  internalQuery,
  mutation,
} from "./_generated/server"
import schema from "./schema"

// Initialize the Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia" as any,
})

// INTERNAL QUERY: Fetch a plan by key from the "userPlans" table.
export const getPlanByKey = internalQuery({
  args: {
    key: schema.tables.userPlans.validator.fields.key,
  },
  handler: async (ctx, args) => {
    return ctx.db
      .query("userPlans")
      .withIndex("key", (q) => q.eq("key", args.key))
      .unique()
  },
})

// ACTION: Create a Stripe Checkout Session.
export const createStripeCheckoutSession = action({
  args: {
    planKey: schema.tables.userPlans.validator.fields.key,
    interval: v.optional(v.string()),
  },
  handler: async (
    ctx,
    args: { planKey: string; interval?: string }
  ): Promise<{ url: string }> => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    // Fetch user using an existing query.
    const user: any = await ctx.runQuery(api.users.getUserByToken, {
      tokenIdentifier: identity.subject,
    })
    if (!user || !user.email) throw new Error("User not found or missing email")

    // Use an internal query to fetch the plan details by key.
    const plan: any = await ctx.runQuery(
      internal.stripeSubscriptions.getPlanByKey,
      {
        key: args.planKey,
      }
    )

    if (!plan || !plan.prices || !plan.prices.month) {
      throw new Error("Plan not found or missing pricing info")
    }

    // Choose the price ID based on the provided interval, defaulting to "month"
    console.log("interval: ", args.interval)
    console.log("plan: ", plan)

    const priceId =
      (args.interval && plan.prices[args.interval]?.usd?.stripeId) ||
      plan.prices.month.usd.stripeId
    if (!priceId) throw new Error("Stripe price ID not found in plan pricing")
    const metadata: Record<string, string> = {
      userId: user.tokenIdentifier,
      userEmail: user.email,
      tokenIdentifier: identity.subject,
      plan: args.planKey,
      interval: args.interval || "month",
    }
    // console.log("metadata: ", metadata)
    // Create a Stripe Checkout Session.
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription", // or "payment" for one-time payments
        success_url: `${process.env.FRONTEND_URL}/success`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        customer_email: user.email,
        metadata: metadata,
        client_reference_id: metadata.userId,
      })

    console.log("session: ", session)

    // Ensure session.url is not null.
    if (!session.url) throw new Error("Stripe session URL is null")

    return { url: session.url }
  },
})

/**
 * Mutation: Store or update a Stripe subscription based on a Stripe webhook event.
 * This function assumes the event's data.object is a Stripe.Subscription.
 */
export const storeStripeSubscriptionWebhook = mutation({
  args: {
    body: v.any(), // Stripe event data object
    eventType: v.string(), // e.g., "customer.subscription.created"
  },
  handler: async (ctx: any, { body, eventType }) => {
    // Store the raw event if desired.
    const webhookEvent = {
      type: eventType,
      stripeEventId: body.id,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      data: body,
    }
    console.log("Inserting webhook event:", webhookEvent)
    await ctx.db.insert("stripeWebhookEvents", webhookEvent)

    // Update your userSubscriptions table based on the event type.
    switch (eventType) {
      case "customer.subscription.created": {
        await ctx.db.insert("userSubscriptions", {
          stripeSubscriptionId: body.id,
          status: body.status,
          currentPeriodStart: body.current_period_start * 1000,
          currentPeriodEnd: body.current_period_end * 1000,
          cancelAtPeriodEnd: body.cancel_at_period_end,
          customerId: body.customer,
          metadata: body.metadata,
        })
        break
      }
      case "customer.subscription.updated": {
        const existing = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeSubscriptionId", (q: any) =>
            q.eq("stripeSubscriptionId", body.id)
          )
          .first()
        if (existing) {
          await ctx.db.patch(existing._id, {
            status: body.status,
            currentPeriodStart: body.current_period_start * 1000,
            currentPeriodEnd: body.current_period_end * 1000,
            cancelAtPeriodEnd: body.cancel_at_period_end,
            metadata: body.metadata,
          })
        }
        break
      }
      case "customer.subscription.deleted": {
        const existing = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeSubscriptionId", (q: any) =>
            q.eq("stripeSubscriptionId", body.id)
          )
          .first()
        if (existing) {
          await ctx.db.patch(existing._id, {
            status: "canceled",
            endedAt: Date.now(),
          })
        }
        break
      }
      default:
        console.log(`Unhandled event type: ${eventType}`)
    }
  },
})

/**
 * HTTP Action: Stripe Webhook Handler.
 * Receives and verifies Stripe webhook events, then processes them.
 */
export const stripeWebhookHandler = httpAction(async (ctx: any, request) => {
  // Stripe requires the raw request body for signature verification.
  const rawBody = await request.text()
  const sig = request.headers.get("stripe-signature")
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  try {
    const event = stripe.webhooks.constructEvent(rawBody, sig!, endpointSecret)
    // Handle various event types:
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      if (session.mode === "subscription" && session.subscription) {
        // Retrieve full subscription details if needed:
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        )
        await ctx.runMutation(
          api.stripeSubscriptions.storeStripeSubscriptionWebhook,
          {
            body: subscription,
            eventType: "customer.subscription.created",
          },
          console.log("subscription: ", subscription)
        )
      }
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      await ctx.runMutation(
        api.stripeSubscriptions.storeStripeSubscriptionWebhook,
        {
          body: event.data.object,
          eventType: event.type,
        }
      )
    } else {
      console.log(`Received unhandled event type: ${event.type}`)
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    console.error("Stripe webhook error:", err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})

/**
 * Action: Create a billing portal session for the user to manage subscriptions.
 */
export const getUserBillingPortalUrl = action({
  handler: async (ctx: any) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Not authenticated")

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q: any) =>
        q.eq("tokenIdentifier", identity.subject)
      )
      .unique()
    if (!user || !user.stripeCustomerId) {
      throw new Error("User not found or missing Stripe customer ID")
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/account`,
    })

    return { url: portalSession.url }
  },
})

export const subscriptionStoreWebhook = mutation({
  args: {
    body: v.any(),
  },
  handler: async (ctx, args) => {
    // Extract event type from webhook payload
    let eventType = args.body.type
    console.log("Event type:", eventType)
    // Store webhook event
    await ctx.db.insert("stripeWebhookEvents", {
      type: eventType,
      stripeEventId: args.body.data.object.id,
      createdAt: new Date(args.body.data.object.created * 1000).toISOString(),
      modifiedAt: args.body.data.modified_at
        ? new Date(args.body.data.modified_at * 1000).toISOString()
        : new Date(args.body.data.object.created * 1000).toISOString(),
      data: args.body.data,
    })

    console.log("args.body.data:", args.body.data)
    if (eventType === "checkout.session.completed") {
      eventType = "customer.subscription.created"
    }
    console.log("eventType once more: ", eventType)
    const userId = args.body.data.object.metadata?.userId ?? null
    console.log("userId: ", userId)

    switch (eventType) {
      case "customer.subscription.created":
        console.log("customer.subscription.created:", args.body)
        // Insert new subscription
        const subscription = args.body.data.object // The actual subscription object

        await ctx.db.insert("userSubscriptions", {
          stripeId: subscription.id,
          // Assuming you want the plan id as the stripePriceId:
          stripePriceId: subscription.plan?.id,
          currency: subscription.currency,
          // The interval is on the plan object:
          interval: subscription.plan?.interval,
          // Assuming metadata was set on the checkout session:
          userId: subscription.metadata?.userId,
          //   status: subscription.status,
          status: "active", // Assume active by default for now TODO: update this
          // Stripe timestamps are in seconds; convert them to milliseconds:
          currentPeriodStart: subscription.current_period_start
            ? new Date(subscription.current_period_start * 1000).getTime()
            : undefined,
          currentPeriodEnd: subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).getTime()
            : undefined,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          // The amount might be on the plan:
          amount: subscription.plan?.amount,
          // Use the start_date field for startedAt (if that's your intention)
          startedAt: subscription.start_date
            ? new Date(subscription.start_date * 1000).getTime()
            : undefined,
          endedAt: subscription.ended_at
            ? new Date(subscription.ended_at * 1000).getTime()
            : undefined,
          canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000).getTime()
            : undefined,
          customerCancellationReason:
            subscription.customer_cancellation_reason || undefined,
          customerCancellationComment:
            subscription.customer_cancellation_comment || undefined,
          metadata: subscription.metadata || {},
          customFieldData: subscription.custom_field_data || {},
          customerId: subscription.customer,
        })

        const existingUser = await ctx.db
          .query("users")
          .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
          .first()

        if (existingUser) {
          const metadata = args.body.data.object.metadata
          await ctx.db.patch(existingUser._id, {
            subscription: `${metadata.interval}ly-${metadata.plan}`,
          })
        }

        break

      case "customer.subscription.updated":
        // Find existing subscription
        const existingSub = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeId", (q) => q.eq("stripeId", args.body.data.id))
          .first()

        if (existingSub) {
          await ctx.db.patch(existingSub._id, {
            amount: args.body.data.amount,
            status: args.body.data.status,
            currentPeriodStart: new Date(
              args.body.data.current_period_start
            ).getTime(),
            currentPeriodEnd: new Date(
              args.body.data.current_period_end
            ).getTime(),
            cancelAtPeriodEnd: args.body.data.cancel_at_period_end,
            metadata: args.body.data.metadata || {},
            customFieldData: args.body.data.custom_field_data || {},
          })
        }
        break

      case "subscription.active":
        // Find and update subscription
        const activeSub = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeId", (q) => q.eq("stripeId", args.body.data.id))
          .first()

        if (activeSub) {
          await ctx.db.patch(activeSub._id, {
            status: args.body.data.status,
            startedAt: new Date(args.body.data.started_at).getTime(),
          })
        }
        break

      case "subscription.canceled":
        // Find and update subscription
        const canceledSub = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeId", (q) => q.eq("stripeId", args.body.data.id))
          .first()

        if (canceledSub) {
          await ctx.db.patch(canceledSub._id, {
            status: args.body.data.status,
            canceledAt: args.body.data.canceled_at
              ? new Date(args.body.data.canceled_at).getTime()
              : undefined,
            customerCancellationReason:
              args.body.data.customer_cancellation_reason || undefined,
            customerCancellationComment:
              args.body.data.customer_cancellation_comment || undefined,
          })
        }
        break

      case "subscription.uncanceled":
        // Find and update subscription
        const uncanceledSub = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeId", (q) => q.eq("stripeId", args.body.data.id))
          .first()

        if (uncanceledSub) {
          await ctx.db.patch(uncanceledSub._id, {
            status: args.body.data.status,
            cancelAtPeriodEnd: false,
            canceledAt: undefined,
            customerCancellationReason: undefined,
            customerCancellationComment: undefined,
          })
        }
        break

      case "subscription.revoked":
        // Find and update subscription
        const revokedSub = await ctx.db
          .query("userSubscriptions")
          .withIndex("stripeId", (q) => q.eq("stripeId", args.body.data.id))
          .first()

        if (revokedSub) {
          await ctx.db.patch(revokedSub._id, {
            status: "revoked",
            endedAt: args.body.data.ended_at
              ? new Date(args.body.data.ended_at).getTime()
              : undefined,
          })
        }
        break

      case "order.created":
        console.log("order.created:", args.body)
        // Orders are handled through the subscription events
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
        break
    }
  },
})

export const paymentWebhook = httpAction(async (ctx, request) => {
  console.log("Webhook received!", {
    method: request.method,
    url: request.url,
    headers: request.headers,
  })

  try {
    const body = await request.json()

    console.log("Webhook body:", body)

    // track events and based on events store data
    await ctx.runMutation(api.stripeSubscriptions.subscriptionStoreWebhook, {
      body,
    })

    console.log("Webhook body:", body)
    return new Response(JSON.stringify({ message: "Webhook received!" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error: any) {
    console.error("JSON parsing failed:", error.message, error.stack)
    return new Response(
      JSON.stringify({ error: "Invalid request body", details: error.message }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
})

// ... the rest of your file remains unchanged.

/**
 * Query: Get the current user's Stripe subscription status.
 */
// export const getUserStripeSubscriptionStatus = query({
//   handler: async (ctx: any) => {
//     const identity = await ctx.auth.getUserIdentity()
//     if (!identity) return { hasActiveSubscription: false }

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q: any) =>
//         q.eq("tokenIdentifier", identity.subject)
//       )
//       .unique()
//     if (!user) return { hasActiveSubscription: false }

//     const subscription = await ctx.db
//       .query("userSubscriptions")
//       .withIndex("userId", (q: any) => q.eq("userId", user.tokenIdentifier))
//       .first()
//     const isActive = subscription?.status === "active"
//     return { hasActiveSubscription: isActive }
//   },
// })

/**
 * Query: Get detailed Stripe subscription info for the current user.
 */
// export const getUserStripeSubscription = query({
//   handler: async (ctx: any) => {
//     const identity = await ctx.auth.getUserIdentity()
//     if (!identity) return null

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q: any) =>
//         q.eq("tokenIdentifier", identity.subject)
//       )
//       .unique()
//     if (!user) return null

//     const subscription = await ctx.db
//       .query("userSubscriptions")
//       .withIndex("userId", (q: any) => q.eq("userId", user.tokenIdentifier))
//       .first()
//     return subscription
//   },
// })
