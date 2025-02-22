import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

// Define the types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userId: string
  image?: string
  role: string[]
  tokenIdentifier: string
}
//NOTE: Not really useful as it's only used by AuthCheck, and I'm not actually using that as it basically just does what middleware does. Keeping this here for now in case I just learn that it's a better way to go?
export const onAuthenticatedUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    console.log("has identity", identity)
    if (!identity) return { status: 404 }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique()

    console.log("user-ident", user)

    if (user) {
      // Add additional checks here
      // if (!user.isEmailVerified || user.isSuspended) {
      //   return { status: 403, message: "Account not verified or suspended" }
      // }
      console.log("user", user)
      return {
        status: 200,
        id: user._id,
        image: identity.pictureUrl,
        username: `${user.firstName} ${user.lastName}`,
        role: user.role,
        // Add any other fields you want to return
      }
    }
    return { status: 404 }
  },
})

// ...existing code...
export const onSignUpUser = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    userId: v.string(),
    image: v.optional(v.string()),
    role: v.array(v.string()),
    tokenIdentifier: v.string(),
  },
  handler: async (ctx, args) => {
    // Instead of relying on ctx.auth.getUserIdentity(), just use the form values passed in args.
    // For example, you can check by email or userId:
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique()
    console.log("existingUser: ", existingUser)
    console.log("Args: ", args)
    if (existingUser) {
      if (existingUser.tokenIdentifier !== args.tokenIdentifier) {
        //want to somehow return something to the front end (or wherever, so that clerk will log them out and I can use a toast to say that they have an account and need to sign in)
      }
      return {
        status: 200,
        message: "User already exists, please sign in",
        id: existingUser._id,
      }
    }

    // Insert a new user record using the form data
    try {
      if (args.email === "markcgrad@gmail.com") {
        console.log("Mark's email: ", args.email)
      }
      // const createdUser = await ctx.db.insert("users", {
      //   role: args.role, // e.g., ["guest"]
      //   firstName: args.firstName,
      //   lastName: args.lastName,
      //   image: args.image || "",
      //   email: args.email,
      //   userId: args.userId,
      //   tokenIdentifier: args.tokenIdentifier,
      //   createdAt: new Date().toISOString(),
      // })
      // if (createdUser) {
      //   return {
      //     status: 200,
      //     message: "User created successfully",
      //     id: createdUser,
      //   }
      // } else {
      //   return {
      //     status: 400,
      //     message: "User could not be created! Try again",
      //   }
      // }
    } catch (error) {
      console.error("Error in onSignUpUser:", error)
      return {
        status: 400,
        message: "Oops! Something went wrong, try again",
      }
    }
  },
})
// ...existing code...

// Sign in an existing user
export const onSignInUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    try {
      const loggedInUser = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", args.userId))
        .unique()

      if (loggedInUser) {
        return {
          status: 200,
          message: "User signed in successfully",
          id: loggedInUser._id,
        }
      }

      return {
        status: 400,
        message: "User could not be logged in! Try again",
      }
    } catch (error) {
      console.error("Error in onSignInUser:", error)
      return {
        status: 400,
        message: "Oops! Something went wrong, try again",
      }
    }
  },
})
