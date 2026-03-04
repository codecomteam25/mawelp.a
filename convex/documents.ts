import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("documents").order("desc").collect();
  },
});

export const getByTransaction = query({
  args: { transactionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_transaction", (q) => q.eq("transactionId", args.transactionId))
      .collect();
  },
});

export const getByProperty = query({
  args: { propertyId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_property", (q) => q.eq("propertyId", args.propertyId))
      .collect();
  },
});

export const getByType = query({
  args: {
    type: v.union(
      v.literal("indenture"),
      v.literal("site_plan"),
      v.literal("allocation_letter"),
      v.literal("receipt"),
      v.literal("agreement"),
      v.literal("other")
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_type", (q) => q.eq("type", args.type))
      .collect();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId as never);
  },
});

export const create = mutation({
  args: {
    transactionId: v.string(),
    propertyId: v.string(),
    name: v.string(),
    type: v.union(
      v.literal("indenture"),
      v.literal("site_plan"),
      v.literal("allocation_letter"),
      v.literal("receipt"),
      v.literal("agreement"),
      v.literal("other")
    ),
    fileUrl: v.string(),
    uploadedBy: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documents", {
      ...args,
      uploadedAt: Date.now(),
      status: "draft",
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("documents"),
    status: v.union(
      v.literal("draft"),
      v.literal("pending_review"),
      v.literal("approved"),
      v.literal("rejected")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
