import { query } from "../_generated/server"

export const getPlans = query({
  args: {},
  handler: async (ctx, args) => {
    return await ctx.db.query("plans").collect()
  },
})
