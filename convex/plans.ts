import { query } from "./_generated/server"

export const getPlans = query({
  handler: async (ctx) => {
    const plans = await ctx.db.query("plans").collect()

    return plans
  },
})
export const getUserPlans = query({
  handler: async (ctx) => {
    const plans = await ctx.db.query("userPlans").collect()

    return plans
  },
})
