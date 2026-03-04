"use client";

import {
  MapPin,
  ArrowLeftRight,
  CreditCard,
  TrendingUp,
  Building2,
  Clock,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import Card, { CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export default function DashboardPage() {
  const stats = useQuery(api.dashboard.getStats);
  const transactions = useQuery(api.transactions.getAll);
  const properties = useQuery(api.properties.getAll);

  if (!stats || !transactions || !properties) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const recentTransactions = transactions.slice(0, 4);
  const recentProperties = properties
    .filter((p) => p.status === "available")
    .slice(0, 3);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Overview of your land sales operations"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Properties"
          value={stats.totalProperties.toString()}
          subtitle={`${stats.availableProperties} available`}
          icon={MapPin}
          variant="green"
        />
        <StatCard
          title="Active Transactions"
          value={stats.activeTransactions.toString()}
          subtitle={`${stats.completedTransactions} completed`}
          icon={ArrowLeftRight}
          variant="gold"
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={TrendingUp}
          variant="green"
        />
        <StatCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={CreditCard}
          variant="default"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Recent Transactions"
              subtitle="Latest property sale activities"
              action={
                <Link
                  href="/transactions"
                  className="text-sm text-ghana-green hover:text-ghana-green-dark font-medium"
                >
                  View all →
                </Link>
              }
            />
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div
                    key={txn._id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-ghana-gray-100 hover:border-ghana-gray-200 transition-colors"
                  >
                    <div className="w-10 h-10 bg-ghana-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 size={18} className="text-ghana-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-ghana-gray-900 truncate">
                        {txn.propertyTitle}
                      </p>
                      <p className="text-xs text-ghana-gray-500">
                        {txn.buyerName} &middot; {formatDate(txn.createdAt)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-ghana-gray-900">
                        {formatCurrency(txn.totalAmount)}
                      </p>
                      <StatusBadge status={txn.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ghana-gray-400 text-center py-8">No transactions yet</p>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader
              title="Available Listings"
              subtitle="Properties ready for sale"
              action={
                <Link
                  href="/properties"
                  className="text-sm text-ghana-green hover:text-ghana-green-dark font-medium"
                >
                  View all →
                </Link>
              }
            />
            {recentProperties.length > 0 ? (
              <div className="space-y-3">
                {recentProperties.map((prop) => (
                  <div
                    key={prop._id}
                    className="p-3 rounded-lg border border-ghana-gray-100 hover:border-ghana-gray-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium text-ghana-gray-900 leading-snug">
                        {prop.title}
                      </p>
                      <StatusBadge status={prop.status} />
                    </div>
                    <p className="text-xs text-ghana-gray-500 mb-2">
                      {prop.location}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-ghana-green">
                        {formatCurrency(prop.price)}
                      </span>
                      <span className="text-xs text-ghana-gray-400">
                        {prop.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-ghana-gray-400 text-center py-8">No listings yet</p>
            )}
          </Card>

          <Card className="mt-6">
            <CardHeader title="Summary" subtitle="Current state" />
            <div className="space-y-3">
              {[
                { label: "Total listings", value: stats.totalProperties.toString(), icon: MapPin },
                { label: "Active deals", value: stats.activeTransactions.toString(), icon: ArrowLeftRight },
                { label: "Completed", value: stats.completedTransactions.toString(), icon: Clock },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ghana-gray-100 rounded-lg flex items-center justify-center">
                    <item.icon size={14} className="text-ghana-gray-500" />
                  </div>
                  <span className="text-sm text-ghana-gray-600 flex-1">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-ghana-gray-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
