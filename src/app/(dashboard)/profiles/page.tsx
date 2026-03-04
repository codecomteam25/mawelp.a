"use client";

import { useState } from "react";
import { Plus, Search, Users, UserCheck, UserPlus, Shield, Loader2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { formatDate, cn } from "@/lib/utils";
import type { UserRole } from "@/types";
import type { LucideIcon } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

const roleIcons: Record<UserRole, LucideIcon> = {
  admin: Shield,
  agent: UserCheck,
  buyer: UserPlus,
  seller: Users,
};

const roleColors: Record<UserRole, string> = {
  admin: "bg-ghana-red/10 text-ghana-red border-ghana-red/20",
  agent: "bg-ghana-green/10 text-ghana-green border-ghana-green/20",
  buyer: "bg-ghana-gold/10 text-ghana-gold-dark border-ghana-gold/20",
  seller: "bg-ghana-gray-100 text-ghana-gray-700 border-ghana-gray-200",
};

export default function ProfilesPage() {
  const allUsers = useQuery(api.users.getAll);
  const createUser = useMutation(api.users.create);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", role: "agent" as UserRole, ghanaCardNumber: "",
  });

  if (!allUsers) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  const filtered = allUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roleCounts: Record<string, number> = {
    all: allUsers.length,
    admin: allUsers.filter((u) => u.role === "admin").length,
    agent: allUsers.filter((u) => u.role === "agent").length,
    buyer: allUsers.filter((u) => u.role === "buyer").length,
    seller: allUsers.filter((u) => u.role === "seller").length,
  };

  return (
    <div>
      <PageHeader
        title="Users & Agents"
        description="Admin only — manage agents and admin users"
        actions={
          <Button icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>
            Add User
          </Button>
        }
      />

      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "agent", "buyer", "seller", "admin"] as const).map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
              roleFilter === role
                ? "bg-ghana-green text-white"
                : "bg-white text-ghana-gray-600 border border-ghana-gray-200 hover:bg-ghana-gray-50"
            )}
          >
            {role === "all" ? "All" : role.charAt(0).toUpperCase() + role.slice(1)}s
            <span className="ml-1.5 text-xs opacity-70">({roleCounts[role]})</span>
          </button>
        ))}
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:max-w-md pl-9 pr-4 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((user) => {
          const RoleIcon = roleIcons[user.role];
          return (
            <Card key={user._id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ghana-green flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    {user.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-ghana-gray-900 truncate">{user.name}</h3>
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border", roleColors[user.role])}>
                      <RoleIcon size={10} />
                      {user.role}
                    </span>
                  </div>
                  <p className="text-xs text-ghana-gray-500 truncate">{user.email}</p>
                  <p className="text-xs text-ghana-gray-400">{user.phone}</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-ghana-gray-100 grid grid-cols-2 gap-3 text-xs">
                {user.ghanaCardNumber && (
                  <div>
                    <p className="text-ghana-gray-400">Ghana Card</p>
                    <p className="font-medium text-ghana-gray-700">{user.ghanaCardNumber}</p>
                  </div>
                )}
                {user.address && (
                  <div>
                    <p className="text-ghana-gray-400">Address</p>
                    <p className="font-medium text-ghana-gray-700">{user.address}</p>
                  </div>
                )}
                <div>
                  <p className="text-ghana-gray-400">Joined</p>
                  <p className="font-medium text-ghana-gray-700">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add New User">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="Kwame Asante" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="kwame@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Phone</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="+233 24 123 4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Password</label>
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="Minimum 8 characters" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Ghana Card Number</label>
            <input type="text" value={form.ghanaCardNumber} onChange={(e) => setForm({ ...form, ghanaCardNumber: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" placeholder="GHA-XXXXXXXXX-X" />
          </div>
          {error && (
            <div className="p-3 bg-ghana-red/10 border border-ghana-red/20 rounded-lg text-sm text-ghana-red">
              {error}
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4 border-t border-ghana-gray-200">
            <Button variant="outline" onClick={() => { setShowAddModal(false); setError(""); }} type="button">Cancel</Button>
            <Button type="button" disabled={saving} onClick={async () => {
              if (!form.name || !form.email || !form.password) {
                setError("Please fill in name, email, and password");
                return;
              }
              if (form.password.length < 8) {
                setError("Password must be at least 8 characters");
                return;
              }
              setSaving(true);
              setError("");
              try {
                await createUser({
                  name: form.name,
                  email: form.email,
                  phone: form.phone || "",
                  password: form.password,
                  role: form.role,
                  ghanaCardNumber: form.ghanaCardNumber || undefined,
                });
                
                setForm({ name: "", email: "", phone: "", password: "", role: "agent", ghanaCardNumber: "" });
                setShowAddModal(false);
              } catch (err: any) {
                setError(err.message || "Failed to create user");
              } finally {
                setSaving(false);
              }
            }}>{saving ? "Creating..." : "Create User"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
