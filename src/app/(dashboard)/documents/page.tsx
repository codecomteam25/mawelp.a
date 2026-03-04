"use client";

import { useState, useRef } from "react";
import { Search, FileText, Upload, Download, Eye, Filter, Loader2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import { formatDate, cn } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";

const typeLabels: Record<string, string> = {
  indenture: "Indenture",
  site_plan: "Site Plan",
  allocation_letter: "Allocation Letter",
  receipt: "Receipt",
  agreement: "Agreement",
  other: "Other",
};

const typeColors: Record<string, string> = {
  indenture: "bg-ghana-green/10 text-ghana-green",
  site_plan: "bg-blue-50 text-blue-700",
  allocation_letter: "bg-ghana-gold/10 text-ghana-gold-dark",
  receipt: "bg-purple-50 text-purple-700",
  agreement: "bg-ghana-gray-100 text-ghana-gray-700",
  other: "bg-ghana-gray-100 text-ghana-gray-500",
};

type DocType = "indenture" | "site_plan" | "allocation_letter" | "receipt" | "agreement" | "other";

export default function DocumentsPage() {
  const { user } = useAuth();
  const documents = useQuery(api.documents.getAll);
  const transactions = useQuery(api.transactions.getAll);
  const generateUploadUrl = useMutation(api.documents.generateUploadUrl);
  const createDocument = useMutation(api.documents.create);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docForm, setDocForm] = useState({
    name: "", type: "indenture" as DocType, transactionId: "",
  });

  if (!documents || !transactions) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const filtered = documents.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || d.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <PageHeader
        title="Documents"
        description="Manage indentures, site plans, and legal documents"
        actions={
          <Button icon={<Upload size={16} />} onClick={() => setShowUploadModal(true)}>
            Upload Document
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
          />
        </div>
        <div className="relative">
          <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="pl-8 pr-8 py-2.5 border border-ghana-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
          >
            <option value="all">All Types</option>
            <option value="indenture">Indentures</option>
            <option value="site_plan">Site Plans</option>
            <option value="allocation_letter">Allocation Letters</option>
            <option value="agreement">Agreements</option>
            <option value="receipt">Receipts</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((doc) => (
          <Card key={doc._id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-ghana-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-ghana-green" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-ghana-gray-900 truncate">{doc.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-medium", typeColors[doc.type])}>
                    {typeLabels[doc.type]}
                  </span>
                  <StatusBadge status={doc.status} />
                </div>
              </div>
            </div>

            <div className="text-xs text-ghana-gray-500 space-y-1 mb-3">
              <p>Transaction: {transactions.find((t) => t._id === doc.transactionId)?.propertyTitle || "—"}</p>
              <p>Uploaded: {formatDate(doc.uploadedAt)}</p>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-ghana-gray-100">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-ghana-green hover:bg-ghana-green/5 transition-colors cursor-pointer">
                <Eye size={13} /> View
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-ghana-gray-600 hover:bg-ghana-gray-50 transition-colors cursor-pointer">
                <Download size={13} /> Download
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showUploadModal} onClose={() => setShowUploadModal(false)} title="Upload Document" maxWidth="max-w-lg">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Document Name</label>
            <input type="text" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="e.g., Indenture - East Legon Plot" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Document Type</label>
            <select value={docForm.type} onChange={(e) => setDocForm({ ...docForm, type: e.target.value as DocType })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
              <option value="indenture">Indenture</option>
              <option value="site_plan">Site Plan</option>
              <option value="allocation_letter">Allocation Letter</option>
              <option value="agreement">Agreement</option>
              <option value="receipt">Receipt</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Transaction</label>
            <select value={docForm.transactionId} onChange={(e) => setDocForm({ ...docForm, transactionId: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
              <option value="">Select transaction...</option>
              {transactions.map((t) => (
                <option key={t._id} value={t._id}>{t.propertyTitle} - {t.buyerName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Upload File</label>
            <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-ghana-gray-300 rounded-lg p-8 text-center hover:border-ghana-green/40 transition-colors cursor-pointer"
            >
              {selectedFile ? (
                <>
                  <FileText size={28} className="mx-auto text-ghana-green mb-2" />
                  <p className="text-sm text-ghana-gray-900 font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-ghana-gray-400 mt-1">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </>
              ) : (
                <>
                  <Upload size={28} className="mx-auto text-ghana-gray-400 mb-2" />
                  <p className="text-sm text-ghana-gray-600">Click to select a file</p>
                  <p className="text-xs text-ghana-gray-400 mt-1">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-ghana-gray-200">
            <Button variant="outline" onClick={() => { setShowUploadModal(false); setSelectedFile(null); }} type="button">Cancel</Button>
            <Button type="button" disabled={saving} onClick={async () => {
              if (!docForm.name || !docForm.transactionId || !selectedFile) return;
              setSaving(true);
              try {
                const uploadUrl = await generateUploadUrl();
                const result = await fetch(uploadUrl, {
                  method: "POST",
                  headers: { "Content-Type": selectedFile.type },
                  body: selectedFile,
                });
                const { storageId } = await result.json();
                const txn = transactions.find((t) => t._id === docForm.transactionId);
                await createDocument({
                  transactionId: docForm.transactionId,
                  propertyId: txn?.propertyId || "",
                  name: docForm.name,
                  type: docForm.type,
                  fileUrl: storageId,
                  uploadedBy: user?._id || "",
                });
                setDocForm({ name: "", type: "indenture", transactionId: "" });
                setSelectedFile(null);
                setShowUploadModal(false);
              } finally {
                setSaving(false);
              }
            }}>{saving ? "Uploading..." : "Upload"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
