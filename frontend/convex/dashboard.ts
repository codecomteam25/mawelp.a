import { query } from "./_generated/server";

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const properties = await ctx.db.query("properties").collect();
    const transactions = await ctx.db.query("transactions").collect();

    const totalProperties = properties.length;
    const availableProperties = properties.filter((p) => p.status === "available").length;
    const activeTransactions = transactions.filter(
      (t) => t.status === "pending" || t.status === "in_progress"
    ).length;
    const completedTransactions = transactions.filter(
      (t) => t.status === "completed"
    ).length;

    const totalRevenue = transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amountPaid, 0);

    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const monthlyRevenue = transactions
      .filter((t) => t.updatedAt > thirtyDaysAgo && t.status === "completed")
      .reduce((sum, t) => sum + t.amountPaid, 0);

    return {
      totalProperties,
      availableProperties,
      activeTransactions,
      completedTransactions,
      totalRevenue,
      monthlyRevenue,
    };
  },
});
