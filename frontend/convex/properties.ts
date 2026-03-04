import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("properties").order("desc").collect();
  },
});

export const getAvailable = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("properties")
      .withIndex("by_status", (q) => q.eq("status", "available"))
      .collect();
  },
});

export const getByStatus = query({
  args: { status: v.union(v.literal("available"), v.literal("reserved"), v.literal("sold")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("properties")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .collect();
  },
});

export const getByAgent = query({
  args: { agentId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("properties")
      .withIndex("by_agent", (q) => q.eq("agentId", args.agentId))
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    location: v.string(),
    region: v.string(),
    size: v.string(),
    price: v.number(),
    description: v.string(),
    plotNumber: v.string(),
    landUse: v.string(),
    agentId: v.string(),
    agentName: v.string(),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("properties", {
      ...args,
      images: args.images ?? [],
      status: "available",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("properties"),
    title: v.optional(v.string()),
    location: v.optional(v.string()),
    region: v.optional(v.string()),
    size: v.optional(v.string()),
    price: v.optional(v.number()),
    status: v.optional(v.union(v.literal("available"), v.literal("reserved"), v.literal("sold"))),
    description: v.optional(v.string()),
    plotNumber: v.optional(v.string()),
    landUse: v.optional(v.string()),
    images: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("properties") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
