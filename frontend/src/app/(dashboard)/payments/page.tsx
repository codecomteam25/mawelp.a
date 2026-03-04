"use client";

import { useState } from "react";
import { Plus, Search, CreditCard, Smartphone, Building, Banknote, Loader2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card, { CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import StatCard from "@/components/ui/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";
import type { LucideIcon } from "lucide-react";

const methodIcons: Record<string, LucideIcon> = {
  mobile_money: Smartphone,
  bank_transfer: Building,
  cash: Banknote,
};

const methodLabels: Record<string, string> = {
  mobile_money: "Mobile Money",
  bank_transfer: "Bank Transfer",
  cash: "Cash",
};

type PayMethod = "mobile_money" | "bank_transfer" | "cash";

export default function PaymentsPage() {
  const { user } = useAuth();
  const payments = useQuery(api.payments.getAll);
  const transactions = useQuery(api.transactions.getAll);
  const recordPayment = useMutation(api.payments.record);

  const [search, setSearch] = useState("");
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    transactionId: "",
    amount: "",
    method: "mobile_money" as PayMethod,
    reference: "",
    note: "",
  });

  if (!payments || !transactions) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalBalance = transactions.reduce((sum, t) => sum + t.balance, 0);
  const openTransactions = transactions.filter((t) => t.status !== "completed" && t.status !== "cancelled");

  const filtered = payments.filter(
    (p) =>
      p.reference.toLowerCase().includes(search.toLowerCase()) ||
      (p.note?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  // Group payments by transaction
  const groupedByTxn = new Map<string, typeof filtered>();
  for (const pay of filtered) {
    const existing = groupedByTxn.get(pay.transactionId) || [];
    existing.push(pay);
    groupedByTxn.set(pay.transactionId, existing);
  }

  return (
    <div>
      <PageHeader
        title="Payments"
        description="Track and record all payment activities"
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setShowRecordModal(true)}>
            Record Payment
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Collected" value={formatCurrency(totalPaid)} icon={CreditCard} variant="green" />
        <StatCard title="Outstanding Balance" value={formatCurrency(totalBalance)} icon={CreditCard} variant="red" />
        <StatCard title="Payments Recorded" value={payments.length.toString()} subtitle="Across all transactions" icon={CreditCard} variant="default" />
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
        <input
          type="text"
          placeholder="Search by reference or note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md pl-9 pr-4 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
        />
      </div>

      {groupedByTxn.size > 0 ? (
        <div className="space-y-6">
          {Array.from(groupedByTxn.entries()).map(([txnId, txnPayments]) => {
            const txn = transactions.find((t) => t._id === txnId);
            if (!txn) return null;
            const progress = txn.totalAmount > 0 ? Math.round((txn.amountPaid / txn.totalAmount) * 100) : 0;

            return (
              <Card key={txnId}>
                <CardHeader
                  title={txn.propertyTitle}
                  subtitle={`${txn.buyerName} \u2022 ${formatCurrency(txn.amountPaid)} of ${formatCurrency(txn.totalAmount)}`}
                  action={<StatusBadge status={txn.status} />}
                />
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-2 bg-ghana-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-ghana-green rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                  <span className="text-xs font-medium text-ghana-gray-500">{progress}%</span>
                </div>
                <div className="space-y-2">
                  {txnPayments.map((pay) => {
                    const MethodIcon = methodIcons[pay.method] || CreditCard;
                    return (
                      <div key={pay._id} className="flex items-center gap-4 p-3 rounded-lg bg-ghana-gray-50 hover:bg-ghana-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-ghana-gray-200 flex-shrink-0">
                          <MethodIcon size={18} className="text-ghana-green" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-semibold text-ghana-gray-900">{formatCurrency(pay.amount)}</span>
                            <span className="text-xs bg-white px-2 py-0.5 rounded border border-ghana-gray-200 text-ghana-gray-600">
                              {methodLabels[pay.method] || pay.method}
                            </span>
                          </div>
                          <p className="text-xs text-ghana-gray-500">
                            Ref: {pay.reference} {pay.note && `\u2022 ${pay.note}`}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs text-ghana-gray-400">{formatDate(pay.date)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-14 h-14 bg-ghana-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <CreditCard size={24} className="text-ghana-gray-400" />
            </div>
            <p className="text-sm text-ghana-gray-500">No payments recorded yet</p>
            <p className="text-xs text-ghana-gray-400 mt-1">Record a payment to get started</p>
          </div>
        </Card>
      )}

      <Modal open={showRecordModal} onClose={() => setShowRecordModal(false)} title="Record Payment">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Transaction</label>
            <select
              value={form.transactionId}
              onChange={(e) => {
                const txn = transactions.find((t) => t._id === e.target.value);
                setForm({
                  ...form,
                  transactionId: e.target.value,
                  amount: txn ? txn.balance.toString() : form.amount,
                });
              }}
              className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
            >
              <option value="">Select transaction...</option>
              {openTransactions.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.propertyTitle} - {t.buyerName} (Balance: {formatCurrency(t.balance)})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Amount (GHS)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
              placeholder="150000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Payment Method</label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value as PayMethod })}
              className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
            >
              <option value="mobile_money">Mobile Money (MTN/Vodafone/AirtelTigo)</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="cash">Cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Reference Number</label>
            <input
              type="text"
              value={form.reference}
              onChange={(e) => setForm({ ...form, reference: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
              placeholder="e.g., MM-2024-007"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Note (Optional)</label>
            <textarea
              rows={2}
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green resize-none"
              placeholder="Payment details..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-ghana-gray-200">
            <Button variant="outline" onClick={() => setShowRecordModal(false)} type="button">Cancel</Button>
            <Button
              type="button"
              disabled={saving}
              onClick={async () => {
                if (!form.transactionId || !form.amount || !form.reference) return;
                setSaving(true);
                try {
                  await recordPayment({
                    transactionId: form.transactionId as any,
                    amount: parseFloat(form.amount),
                    method: form.method,
                    reference: form.reference,
                    note: form.note || undefined,
                    recordedBy: user?._id || "",
                  });
                  setForm({ transactionId: "", amount: "", method: "mobile_money", reference: "", note: "" });
                  setShowRecordModal(false);
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? "Recording..." : "Record Payment"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
