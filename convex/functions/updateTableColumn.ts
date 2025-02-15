import { mutation } from "../_generated/server"

export default mutation(async ({ db }) => {
  // Query all plan documents
  const plans = await db.query("plans").collect()

  for (const plan of plans) {
    // if (plan.name !== undefined && plan.name !== null) {
    //   const updatedPlan = {
    //     ...plan,
    //     title: plan.name, // copy the value to the new column
    //     name: null,       // set the original column to null
    //   }
    //   // Cast as any to bypass the schema type check during migration.
    //   await db.replace(plan._id, updatedPlan as any)
    // }
  }
})
