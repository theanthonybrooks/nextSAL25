import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      return "Not authenticated";
    }
    return identity;
  },
});

export const getUserByToken = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier),
      )
      .unique();
  },
});

export const getUserRole = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    // console.log("identity: ", identity)
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) {
      return null;
    }

    return user.role;

    // console.log("User: ", user, "Subscription: ", subscription)
  },
});

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Check if we've already stored this identity before
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    // console.log("user: ", user)
    // console.log("identity: ", identity)

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value
      if (user.firstName + " " + user.lastName !== identity.name) {
        await ctx.db.patch(user._id, {
          firstName: identity.givenName,
          lastName: identity.familyName,
          email: identity.email,
        });
        console.log("user name change: ", user);
      }
      return user._id;
    }

    // If it's a new identity, create a new User
    return await ctx.db.insert("users", {
      role: ["guest"],
      firstName: identity.givenName!,
      lastName: identity.familyName!,
      image: identity.pictureUrl,
      email: identity.email!,
      userId: identity.subject,
      tokenIdentifier: identity.subject,
      createdAt: new Date().toISOString(),
    });
  },
});

export const getUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async ({ db }, { email }) => {
    const user = await db
      .query("users")
      .filter((q) => q.eq("email", email))
      .first();
    return user || null;
  },
});
