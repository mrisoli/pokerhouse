import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { pokerHandValidator } from "./pokerHandValidators";

/**
 * Authenticate a public request by comparing the supplied key against the
 * `POKER_API_KEY` environment variable. Throws when unconfigured or mismatched.
 */
function requireApiKey(apiKey: string): void {
  const expected = process.env.POKER_API_KEY;
  if (!expected) {
    throw new ConvexError("POKER_API_KEY is not configured");
  }
  if (apiKey !== expected) {
    throw new ConvexError("Invalid API key");
  }
}

/** List poker hands, newest hand first, paginated. */
export const list = query({
  args: { apiKey: v.string(), paginationOpts: paginationOptsValidator },
  handler: async (ctx, { apiKey, paginationOpts }) => {
    requireApiKey(apiKey);
    return await ctx.db
      .query("pokerHands")
      .withIndex("by_timestamp")
      .order("desc")
      .paginate(paginationOpts);
  },
});

/** Retrieve a single poker hand by id. */
export const get = query({
  args: { apiKey: v.string(), id: v.id("pokerHands") },
  handler: async (ctx, { apiKey, id }) => {
    requireApiKey(apiKey);
    return await ctx.db.get(id);
  },
});

/** Save a new poker hand. */
export const create = mutation({
  args: { apiKey: v.string(), hand: pokerHandValidator },
  handler: async (ctx, { apiKey, hand }) => {
    requireApiKey(apiKey);
    return await ctx.db.insert("pokerHands", hand);
  },
});

/** Replace an existing poker hand. */
export const update = mutation({
  args: {
    apiKey: v.string(),
    id: v.id("pokerHands"),
    hand: pokerHandValidator,
  },
  handler: async (ctx, { apiKey, id, hand }) => {
    requireApiKey(apiKey);
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new ConvexError("Poker hand not found");
    }
    await ctx.db.replace(id, hand);
  },
});

/** Delete a poker hand by id. */
export const remove = mutation({
  args: { apiKey: v.string(), id: v.id("pokerHands") },
  handler: async (ctx, { apiKey, id }) => {
    requireApiKey(apiKey);
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new ConvexError("Poker hand not found");
    }
    await ctx.db.delete(id);
  },
});
