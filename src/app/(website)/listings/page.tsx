"use client";

import { useState } from "react";
import { Search, MapPin, Ruler, Filter, Loader2, SlidersHorizontal, Grid3X3, LayoutList, Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { formatCurrency, cn } from "@/lib/utils";

const regions = ["All Regions", "Greater Accra", "Ashanti", "Central", "Volta", "Eastern", "Western", "Northern"];

const statusColors: Record<string, string> = {
  available: "bg-ghana-green text-white",
  reserved: "bg-ghana-gold text-ghana-black",
  sold: "bg-ghana-gray-300 text-ghana-gray-700",
};

export default function ListingsPage() {
  const properties = useQuery(api.properties.getAll);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [statusFilter, setStatusFilter] = useState("all");

  if (!properties) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === "All Regions" || p.region === region;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesRegion && matchesStatus;
  });

  const available = properties.filter((p) => p.status === "available").length;
  const reserved = properties.filter((p) => p.status === "reserved").length;
  const sold = properties.filter((p) => p.status === "sold").length;

  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-ghana-green overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
          <p className="text-xs font-bold text-ghana-gold uppercase tracking-widest mb-3">Property Listings</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            Find Your Perfect Land
          </h1>
          <p className="text-base text-white/60 max-w-lg mb-8">
            Browse {properties.length} verified properties across Ghana. {available} currently available for purchase.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
              <div className="w-2.5 h-2.5 bg-ghana-green-light rounded-full" />
              <span className="text-sm text-white font-medium">{available} Available</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
              <div className="w-2.5 h-2.5 bg-ghana-gold rounded-full" />
              <span className="text-sm text-white font-medium">{reserved} Reserved</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
              <div className="w-2.5 h-2.5 bg-ghana-gray-400 rounded-full" />
              <span className="text-sm text-white font-medium">{sold} Sold</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {/* Filters bar */}
        <div className="bg-white border border-ghana-gray-200/80 rounded-2xl p-4 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
              <input
                type="text"
                placeholder="Search by title, location, or region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 placeholder:text-ghana-gray-400"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 min-w-[160px]"
              >
                {regions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 min-w-[130px]"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-ghana-gray-500 font-medium">
            Showing <span className="text-ghana-gray-900 font-bold">{filtered.length}</span> {filtered.length === 1 ? "property" : "properties"}
          </p>
          {(search || region !== "All Regions" || statusFilter !== "all") && (
            <button
              onClick={() => { setSearch(""); setRegion("All Regions"); setStatusFilter("all"); }}
              className="text-xs text-ghana-green font-semibold hover:underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-2xl border border-ghana-gray-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
              >
                <div className="h-52 bg-ghana-green/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 size={36} className="text-ghana-green/15 mx-auto mb-2" />
                      <p className="text-xs text-ghana-gray-400">{property.region}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className={cn("px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide", statusColors[property.status])}>
                      {property.status}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-ghana-gray-700 border border-ghana-gray-200 shadow-sm">
                      {property.landUse}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/40 backdrop-blur-sm text-white flex items-center gap-1">
                      <Ruler size={10} /> {property.size}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/40 backdrop-blur-sm text-white">
                      Plot: {property.plotNumber}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-ghana-gray-900 mb-1.5 line-clamp-1 group-hover:text-ghana-green transition-colors">{property.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-ghana-gray-500 mb-3">
                    <MapPin size={12} className="text-ghana-gray-400" />
                    {property.location}, {property.region}
                  </div>
                  <p className="text-sm text-ghana-gray-500 line-clamp-2 mb-4 leading-relaxed">{property.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-ghana-gray-100">
                    <div>
                      <p className="text-[10px] text-ghana-gray-400 uppercase tracking-wider font-semibold mb-0.5">Price</p>
                      <p className="text-lg font-extrabold text-ghana-green">{formatCurrency(property.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-ghana-gray-400 uppercase tracking-wider font-semibold mb-0.5">Agent</p>
                      <p className="text-sm font-medium text-ghana-gray-700">{property.agentName}</p>
                    </div>
                  </div>
                  {property.status === "available" && (
                    <Link
                      href="/contact"
                      className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-ghana-green text-white text-sm font-semibold hover:bg-ghana-green-dark transition-all"
                    >
                      Inquire Now <ArrowRight size={14} />
                    </Link>
                  )}
                  {property.status === "reserved" && (
                    <div className="mt-4 flex items-center justify-center py-3 rounded-xl bg-ghana-gold/10 text-ghana-gold-dark text-sm font-semibold border border-ghana-gold/20">
                      Reserved
                    </div>
                  )}
                  {property.status === "sold" && (
                    <div className="mt-4 flex items-center justify-center py-3 rounded-xl bg-ghana-gray-100 text-ghana-gray-500 text-sm font-semibold">
                      Sold
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-ghana-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Filter size={28} className="text-ghana-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-ghana-gray-900 mb-1">No properties found</h3>
            <p className="text-sm text-ghana-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setRegion("All Regions"); setStatusFilter("all"); }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-ghana-green text-white text-sm font-semibold rounded-xl hover:bg-ghana-green-dark transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
