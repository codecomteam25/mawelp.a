"use client";

import { useState } from "react";
import { Plus, Search, Eye, ArrowLeftRight, Loader2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card, { CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";

type TxnDoc = {
  _id: string;
  propertyId: string;
  propertyTitle: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  agentId: string;
  agentName: string;
  totalAmount: number;
  amountPaid: number;
  balance: number;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: number;
  updatedAt: number;
};

export default function TransactionsPage() {
  const { user } = useAuth();
  const transactions = useQuery(api.transactions.getAll);
  const properties = useQuery(api.properties.getAll);
  const users = useQuery(api.users.getAll);
  const createTransaction = useMutation(api.transactions.create);

  const [search, setSearch] = useState("");
  const [selectedTxn, setSelectedTxn] = useState<TxnDoc | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [txnForm, setTxnForm] = useState({
    propertyId: "", buyerId: "", sellerId: "", totalAmount: "", initialPayment: "",
  });

  if (!transactions || !properties || !users) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const filtered = transactions.filter(
    (t) =>
      t.propertyTitle.toLowerCase().includes(search.toLowerCase()) ||
      t.buyerName.toLowerCase().includes(search.toLowerCase())
  );

  const availableProperties = properties.filter((p) => p.status === "available");
  const buyers = users.filter((u) => u.role === "buyer");
  const sellers = users.filter((u) => u.role === "seller");

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Track all property sale transactions"
        actions={
          <Button
            icon={<Plus size={16} />}
            onClick={() => setShowNewModal(true)}
          >
            New Transaction
          </Button>
        }
      />

      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400"
        />
        <input
          type="text"
          placeholder="Search by property or buyer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md pl-9 pr-4 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
        />
      </div>

      <div className="bg-white rounded-xl border border-ghana-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ghana-gray-200 bg-ghana-gray-50">
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Property</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Buyer</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Total</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Paid</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Balance</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Progress</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">Date</th>
                <th className="text-right px-4 py-3 font-medium text-ghana-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => {
                const progress = Math.round((txn.amountPaid / txn.totalAmount) * 100);
                return (
                  <tr key={txn._id} className="border-b border-ghana-gray-100 hover:bg-ghana-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ghana-gray-900">{txn.propertyTitle}</p>
                      <p className="text-xs text-ghana-gray-400">Agent: {txn.agentName}</p>
                    </td>
                    <td className="px-4 py-3 text-ghana-gray-700">{txn.buyerName}</td>
                    <td className="px-4 py-3 font-semibold text-ghana-gray-900">{formatCurrency(txn.totalAmount)}</td>
                    <td className="px-4 py-3 text-ghana-green font-medium">{formatCurrency(txn.amountPaid)}</td>
                    <td className="px-4 py-3 text-ghana-red font-medium">{formatCurrency(txn.balance)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-ghana-gray-100 rounded-full overflow-hidden max-w-[80px]">
                          <div className="h-full bg-ghana-green rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-ghana-gray-500 font-medium">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={txn.status} /></td>
                    <td className="px-4 py-3 text-xs text-ghana-gray-400">{formatDate(txn.createdAt)}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setSelectedTxn(txn)} className="text-ghana-green hover:text-ghana-green-dark transition-colors cursor-pointer">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!selectedTxn} onClose={() => setSelectedTxn(null)} title="Transaction Details" maxWidth="max-w-3xl">
        {selectedTxn && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-ghana-gray-50 rounded-lg p-3">
                <p className="text-xs text-ghana-gray-500">Total</p>
                <p className="text-lg font-bold text-ghana-gray-900">{formatCurrency(selectedTxn.totalAmount)}</p>
              </div>
              <div className="bg-ghana-green/5 rounded-lg p-3">
                <p className="text-xs text-ghana-gray-500">Paid</p>
                <p className="text-lg font-bold text-ghana-green">{formatCurrency(selectedTxn.amountPaid)}</p>
              </div>
              <div className="bg-ghana-red/5 rounded-lg p-3">
                <p className="text-xs text-ghana-gray-500">Balance</p>
                <p className="text-lg font-bold text-ghana-red">{formatCurrency(selectedTxn.balance)}</p>
              </div>
              <div className="bg-ghana-gold/10 rounded-lg p-3">
                <p className="text-xs text-ghana-gray-500">Progress</p>
                <p className="text-lg font-bold text-ghana-gold-dark">
                  {Math.round((selectedTxn.amountPaid / selectedTxn.totalAmount) * 100)}%
                </p>
              </div>
            </div>

            <div className="h-3 bg-ghana-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-ghana-green rounded-full transition-all" style={{ width: `${(selectedTxn.amountPaid / selectedTxn.totalAmount) * 100}%` }} />
            </div>

            <Card>
              <CardHeader title="Transaction Parties" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-ghana-gray-400 mb-1">Buyer</p>
                  <p className="text-sm font-medium text-ghana-gray-900">{selectedTxn.buyerName}</p>
                </div>
                <div>
                  <p className="text-xs text-ghana-gray-400 mb-1">Seller</p>
                  <p className="text-sm font-medium text-ghana-gray-900">{selectedTxn.sellerName}</p>
                </div>
                <div>
                  <p className="text-xs text-ghana-gray-400 mb-1">Agent</p>
                  <p className="text-sm font-medium text-ghana-gray-900">{selectedTxn.agentName}</p>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="Payment History" />
              <p className="text-sm text-ghana-gray-500 text-center py-4">Payment tracking coming soon</p>
            </Card>
          </div>
        )}
      </Modal>

      <Modal open={showNewModal} onClose={() => setShowNewModal(false)} title="New Transaction" maxWidth="max-w-2xl">
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Property</label>
              <select value={txnForm.propertyId} onChange={(e) => {
                const prop = availableProperties.find((p) => p._id === e.target.value);
                setTxnForm({ ...txnForm, propertyId: e.target.value, totalAmount: prop ? prop.price.toString() : txnForm.totalAmount });
              }} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                <option value="">Select a property...</option>
                {availableProperties.map((p) => (
                  <option key={p._id} value={p._id}>{p.title} — {p.location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Buyer</label>
              <select value={txnForm.buyerId} onChange={(e) => setTxnForm({ ...txnForm, buyerId: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                <option value="">Select buyer...</option>
                {buyers.map((b) => (
                  <option key={b._id} value={b._id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Seller</label>
              <select value={txnForm.sellerId} onChange={(e) => setTxnForm({ ...txnForm, sellerId: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                <option value="">Select seller...</option>
                {sellers.map((s) => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Total Amount (GHS)</label>
              <input type="number" value={txnForm.totalAmount} onChange={(e) => setTxnForm({ ...txnForm, totalAmount: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="450000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Initial Payment (GHS)</label>
              <input type="number" value={txnForm.initialPayment} onChange={(e) => setTxnForm({ ...txnForm, initialPayment: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="150000" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-ghana-gray-200">
            <Button variant="outline" onClick={() => setShowNewModal(false)} type="button">Cancel</Button>
            <Button type="button" disabled={saving} onClick={async () => {
              if (!txnForm.propertyId || !txnForm.buyerId || !txnForm.sellerId || !txnForm.totalAmount) return;
              setSaving(true);
              try {
                const prop = properties.find((p) => p._id === txnForm.propertyId);
                const buyer = users.find((u) => u._id === txnForm.buyerId);
                const seller = users.find((u) => u._id === txnForm.sellerId);
                await createTransaction({
                  propertyId: txnForm.propertyId,
                  propertyTitle: prop?.title || "",
                  buyerId: txnForm.buyerId,
                  buyerName: buyer?.name || "",
                  sellerId: txnForm.sellerId,
                  sellerName: seller?.name || "",
                  agentId: user?._id || "",
                  agentName: user?.name || "",
                  totalAmount: parseFloat(txnForm.totalAmount),
                  initialPayment: txnForm.initialPayment ? parseFloat(txnForm.initialPayment) : undefined,
                });
                setTxnForm({ propertyId: "", buyerId: "", sellerId: "", totalAmount: "", initialPayment: "" });
                setShowNewModal(false);
              } finally {
                setSaving(false);
              }
            }}>{saving ? "Creating..." : "Create Transaction"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
