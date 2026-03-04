import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("transactions").order("desc").collect();
  },
});

export const getByStatus = query({
  args: {
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getByBuyer = query({
  args: { buyerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("transactions")
      .withIndex("by_buyer", (q) => q.eq("buyerId", args.buyerId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    propertyId: v.string(),
    propertyTitle: v.string(),
    buyerId: v.string(),
    buyerName: v.string(),
    sellerId: v.string(),
    sellerName: v.string(),
    agentId: v.string(),
    agentName: v.string(),
    totalAmount: v.number(),
    initialPayment: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { initialPayment, ...rest } = args;
    const paid = initialPayment ?? 0;
    const now = Date.now();

    const txnId = await ctx.db.insert("transactions", {
      ...rest,
      amountPaid: paid,
      balance: rest.totalAmount - paid,
      status: paid > 0 ? "in_progress" : "pending",
      createdAt: now,
      updatedAt: now,
    });

    // Mark property as reserved
    const properties = await ctx.db
      .query("properties")
      .filter((q) => q.eq(q.field("_id"), args.propertyId as never))
      .first();
    if (properties) {
      await ctx.db.patch(properties._id, { status: "reserved", updatedAt: now });
    }

    return txnId;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("transactions"),
    status: v.union(
      v.literal("pending"),
      v.literal("in_progress"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    const txn = await ctx.db.get(args.id);
    if (!txn) throw new Error("Transaction not found");

    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });

    // If completed, mark property as sold
    if (args.status === "completed") {
      const prop = await ctx.db
        .query("properties")
        .filter((q) => q.eq(q.field("_id"), txn.propertyId as never))
        .first();
      if (prop) {
        await ctx.db.patch(prop._id, { status: "sold", updatedAt: Date.now() });
      }
    }

    // If cancelled, mark property as available again
    if (args.status === "cancelled") {
      const prop = await ctx.db
        .query("properties")
        .filter((q) => q.eq(q.field("_id"), txn.propertyId as never))
        .first();
      if (prop) {
        await ctx.db.patch(prop._id, { status: "available", updatedAt: Date.now() });
      }
    }
  },
});

export const remove = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
