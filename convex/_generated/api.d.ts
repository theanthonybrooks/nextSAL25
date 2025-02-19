/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as api_plans from "../api/plans.js";
import type * as auth from "../auth.js";
import type * as functions_stripePlans from "../functions/stripePlans.js";
import type * as functions_updateTableColumn from "../functions/updateTableColumn.js";
import type * as http from "../http.js";
import type * as plans from "../plans.js";
import type * as stripeSubscriptions from "../stripeSubscriptions.js";
import type * as subscriptions from "../subscriptions.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "api/plans": typeof api_plans;
  auth: typeof auth;
  "functions/stripePlans": typeof functions_stripePlans;
  "functions/updateTableColumn": typeof functions_updateTableColumn;
  http: typeof http;
  plans: typeof plans;
  stripeSubscriptions: typeof stripeSubscriptions;
  subscriptions: typeof subscriptions;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
