import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("payments").order("desc").collect();
  },
});

export const getByTransaction = query({
  args: { transactionId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("payments")
      .withIndex("by_transaction", (q) => q.eq("transactionId", args.transactionId))
      .collect();
  },
});

export const record = mutation({
  args: {
    transactionId: v.id("transactions"),
    amount: v.number(),
    method: v.union(v.literal("mobile_money"), v.literal("bank_transfer"), v.literal("cash")),
    reference: v.string(),
    note: v.optional(v.string()),
    recordedBy: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert the payment record
    const paymentId = await ctx.db.insert("payments", {
      transactionId: args.transactionId,
      amount: args.amount,
      method: args.method,
      reference: args.reference,
      date: Date.now(),
      note: args.note,
      recordedBy: args.recordedBy,
    });

    // Update the transaction's amountPaid and balance
    const transaction = await ctx.db.get(args.transactionId);
    if (transaction) {
      const newAmountPaid = transaction.amountPaid + args.amount;
      const newBalance = transaction.totalAmount - newAmountPaid;
      const newStatus = newBalance <= 0 ? "completed" : "in_progress";

      await ctx.db.patch(args.transactionId, {
        amountPaid: newAmountPaid,
        balance: Math.max(0, newBalance),
        status: newStatus as "pending" | "in_progress" | "completed" | "cancelled",
        updatedAt: Date.now(),
      });

      // If fully paid, mark the property as sold
      if (newBalance <= 0) {
        const properties = await ctx.db
          .query("properties")
          .withIndex("by_status")
          .collect();
        const property = properties.find((p) => p._id.toString() === transaction.propertyId);
        if (property) {
          await ctx.db.patch(property._id, {
            status: "sold" as const,
            updatedAt: Date.now(),
          });
        }
      }
    }

    return paymentId;
  },
});

export const remove = mutation({
  args: { id: v.id("payments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
