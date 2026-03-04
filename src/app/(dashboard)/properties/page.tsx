"use client";

import { useState } from "react";
import { Plus, Search, MapPin, Filter, Grid3X3, List, Loader2, Upload, X } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useAuth } from "@/context/AuthContext";

export default function PropertiesPage() {
  const { user } = useAuth();
  const properties = useQuery(api.properties.getAll);
  const createProperty = useMutation(api.properties.create);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: "", location: "", region: "Greater Accra", plotNumber: "",
    landUse: "Residential", size: "", price: "", description: "",
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  if (!properties) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <PageHeader
        title="Properties"
        description="Manage your land and property listings"
        actions={
          <Button
            icon={<Plus size={16} />}
            onClick={() => setShowAddModal(true)}
          >
            Add Property
          </Button>
        }
      />

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400"
          />
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-8 pr-8 py-2.5 border border-ghana-gray-300 rounded-lg text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="reserved">Reserved</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div className="flex border border-ghana-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 transition-colors cursor-pointer",
                viewMode === "grid"
                  ? "bg-ghana-green text-white"
                  : "bg-white text-ghana-gray-500 hover:bg-ghana-gray-50"
              )}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 transition-colors cursor-pointer",
                viewMode === "list"
                  ? "bg-ghana-green text-white"
                  : "bg-white text-ghana-gray-500 hover:bg-ghana-gray-50"
              )}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-xl border border-ghana-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className="h-44 bg-ghana-green/5 relative flex items-center justify-center">
                <MapPin size={32} className="text-ghana-green/30" />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={property.status} />
                </div>
                <div className="absolute bottom-3 left-3 bg-white rounded-md px-2 py-1 border border-ghana-gray-200">
                  <span className="text-xs font-medium text-ghana-gray-700">
                    {property.plotNumber}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-ghana-gray-900 mb-1 group-hover:text-ghana-green transition-colors">
                  {property.title}
                </h3>
                <p className="text-xs text-ghana-gray-500 mb-3 flex items-center gap-1">
                  <MapPin size={12} /> {property.location}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-ghana-green">
                    {formatCurrency(property.price)}
                  </span>
                  <span className="text-xs text-ghana-gray-400 bg-ghana-gray-50 px-2 py-1 rounded">
                    {property.size}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-ghana-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-ghana-green/10 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-ghana-green">
                        {property.agentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <span className="text-xs text-ghana-gray-500">
                      {property.agentName}
                    </span>
                  </div>
                  <span className="text-xs text-ghana-gray-400">
                    {property.landUse}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-ghana-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ghana-gray-200 bg-ghana-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Property
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Location
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Size
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Agent
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-ghana-gray-500">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((property) => (
                  <tr
                    key={property._id}
                    className="border-b border-ghana-gray-100 hover:bg-ghana-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-ghana-gray-900">
                        {property.title}
                      </p>
                      <p className="text-xs text-ghana-gray-400">
                        {property.plotNumber}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-ghana-gray-600">
                      {property.location}
                    </td>
                    <td className="px-4 py-3 font-semibold text-ghana-green">
                      {formatCurrency(property.price)}
                    </td>
                    <td className="px-4 py-3 text-ghana-gray-600">
                      {property.size}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={property.status} />
                    </td>
                    <td className="px-4 py-3 text-ghana-gray-600">
                      {property.agentName}
                    </td>
                    <td className="px-4 py-3 text-ghana-gray-400 text-xs">
                      {formatDate(property.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Property"
        maxWidth="max-w-2xl"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Property Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
                placeholder="e.g., Prime Residential Plot - East Legon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
                placeholder="East Legon, Accra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Region
              </label>
              <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                <option>Greater Accra</option>
                <option>Ashanti</option>
                <option>Central</option>
                <option>Volta</option>
                <option>Eastern</option>
                <option>Western</option>
                <option>Northern</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Plot Number
              </label>
              <input
                type="text"
                value={form.plotNumber}
                onChange={(e) => setForm({ ...form, plotNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
                placeholder="EL-2024-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Land Use
              </label>
              <select value={form.landUse} onChange={(e) => setForm({ ...form, landUse: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Agricultural</option>
                <option>Mixed Use</option>
                <option>Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Size
              </label>
              <input
                type="text"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
                placeholder="0.5 Acres"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Price (GHS)
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green"
                placeholder="450000"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green resize-none"
                placeholder="Describe the property..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">
                Property Images
              </label>
              <div className="border-2 border-dashed border-ghana-gray-300 rounded-lg p-6 text-center hover:border-ghana-green transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setSelectedImages(prev => [...prev, ...files]);
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="mx-auto mb-2 text-ghana-gray-400" size={32} />
                  <p className="text-sm font-medium text-ghana-gray-700 mb-1">Click to upload images</p>
                  <p className="text-xs text-ghana-gray-500">PNG, JPG, WEBP up to 10MB each</p>
                </label>
              </div>
              {selectedImages.length > 0 && (
                <div className="mt-3 space-y-2">
                  {selectedImages.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-ghana-gray-50 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <span className="text-sm text-ghana-gray-700 truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== idx))}
                        className="text-ghana-red hover:text-ghana-red-dark p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-ghana-gray-200">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={saving}
              onClick={async () => {
                if (!form.title || !form.location || !form.price) return;
                setSaving(true);
                setUploadingImages(true);
                try {
                  // Upload images to Convex storage
                  const imageUrls: string[] = [];
                  for (const file of selectedImages) {
                    const uploadUrl = await generateUploadUrl();
                    const result = await fetch(uploadUrl, {
                      method: "POST",
                      headers: { "Content-Type": file.type },
                      body: file,
                    });
                    const { storageId } = await result.json();
                    // Construct the Convex storage URL
                    const convexUrl = `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${storageId}`;
                    imageUrls.push(convexUrl);
                  }
                  
                  await createProperty({
                    title: form.title,
                    location: form.location,
                    region: form.region,
                    plotNumber: form.plotNumber,
                    landUse: form.landUse,
                    size: form.size,
                    price: parseFloat(form.price),
                    description: form.description,
                    images: imageUrls,
                    agentId: user?._id || "",
                    agentName: user?.name || "Unknown",
                  });
                  setForm({ title: "", location: "", region: "Greater Accra", plotNumber: "", landUse: "Residential", size: "", price: "", description: "" });
                  setSelectedImages([]);
                  setShowAddModal(false);
                } finally {
                  setSaving(false);
                  setUploadingImages(false);
                }
              }}
            >
              {uploadingImages ? "Uploading Images..." : saving ? "Saving..." : "Save Property"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
