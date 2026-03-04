import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    // Strip passwords from results
    return users.map(({ password, ...user }) => user);
  },
});

export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user) return null;
    const { password, ...safeUser } = user;
    return safeUser;
  },
});

export const getByRole = query({
  args: { role: v.union(v.literal("admin"), v.literal("agent"), v.literal("buyer"), v.literal("seller")) },
  handler: async (ctx, args) => {
    const users = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", args.role))
      .collect();
    return users.map(({ password, ...user }) => user);
  },
});

// Login: check email + password, return user (without password) or null
export const login = query({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || user.password !== args.password) {
      return null;
    }

    const { password, ...safeUser } = user;
    return safeUser;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    password: v.string(),
    role: v.union(v.literal("admin"), v.literal("agent"), v.literal("buyer"), v.literal("seller")),
    ghanaCardNumber: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) throw new Error("User with this email already exists");

    return await ctx.db.insert("users", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.optional(v.string()),
    role: v.optional(v.union(v.literal("admin"), v.literal("agent"), v.literal("buyer"), v.literal("seller"))),
    ghanaCardNumber: v.optional(v.string()),
    address: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates: Record<string, any> = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        updates[key] = value;
      }
    }
    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Seed the initial admin account if no admin exists
export const seedAdmin = mutation({
  args: {},
  handler: async (ctx) => {
    const existingAdmin = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", "admin@mawelpa.com"))
      .first();

    if (existingAdmin) return { status: "exists", id: existingAdmin._id };

    const id = await ctx.db.insert("users", {
      name: "Admin",
      email: "admin@mawelpa.com",
      phone: "+233 00 000 0000",
      password: "MawelAdmin2026",
      role: "admin",
      createdAt: Date.now(),
    });

    return { status: "created", id };
  },
});
