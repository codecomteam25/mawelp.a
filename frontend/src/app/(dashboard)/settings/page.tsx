"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card, { CardHeader } from "@/components/ui/Card";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user: authUser } = useAuth();
  const convexUser = useQuery(
    api.users.getByEmail,
    authUser?.email ? { email: authUser.email } : "skip"
  );
  const updateUser = useMutation(api.users.update);

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    ghanaCardNumber: "",
    address: "",
  });

  useEffect(() => {
    if (convexUser) {
      setForm({
        name: convexUser.name || "",
        email: convexUser.email || "",
        phone: convexUser.phone || "",
        ghanaCardNumber: convexUser.ghanaCardNumber || "",
        address: convexUser.address || "",
      });
    } else if (authUser) {
      setForm({
        name: authUser.name || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        ghanaCardNumber: "",
        address: "",
      });
    }
  }, [convexUser, authUser]);

  const handleSave = async () => {
    if (!convexUser) return;
    setSaving(true);
    try {
      await updateUser({
        id: convexUser._id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        ghanaCardNumber: form.ghanaCardNumber || undefined,
        address: form.address || undefined,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  if (!authUser) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-ghana-green" size={32} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account and application preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Profile Information" subtitle="Update your personal details" />
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Full Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Phone Number</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Ghana Card Number</label>
                  <input type="text" value={form.ghanaCardNumber} onChange={(e) => setForm({ ...form, ghanaCardNumber: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Address</label>
                <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green" />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Regional Settings" subtitle="Customize for your region" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Currency</label>
                <select className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                  <option>GHS - Ghana Cedis</option>
                  <option>USD - US Dollars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Default Region</label>
                <select className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
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
                <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Date Format</label>
                <select className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ghana-gray-700 mb-1.5">Language</label>
                <select className="w-full px-3.5 py-2.5 border border-ghana-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green bg-white">
                  <option>English</option>
                  <option>Twi</option>
                  <option>Ga</option>
                  <option>Ewe</option>
                </select>
              </div>
            </div>
          </Card>

          <div className="flex items-center gap-3">
            <Button icon={<Save size={16} />} onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
            </Button>
            {saved && <span className="text-sm text-ghana-green font-medium">Changes saved successfully</span>}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Notifications" />
            <div className="space-y-4">
              {[
                { label: "Email notifications", desc: "Receive updates via email", defaultChecked: true },
                { label: "SMS alerts", desc: "Get SMS for payments", defaultChecked: true },
                { label: "Transaction updates", desc: "Status change alerts", defaultChecked: false },
                { label: "New listing alerts", desc: "New properties added", defaultChecked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ghana-gray-900">{item.label}</p>
                    <p className="text-xs text-ghana-gray-400">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                    <div className="w-9 h-5 bg-ghana-gray-200 peer-focus:ring-2 peer-focus:ring-ghana-green/30 rounded-full peer peer-checked:bg-ghana-green transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Account" />
            <div className="space-y-3">
              <p className="text-xs text-ghana-gray-500 px-3">
                Role: <span className="font-medium text-ghana-gray-700 capitalize">{convexUser?.role || "—"}</span>
              </p>
              <p className="text-xs text-ghana-gray-500 px-3">
                Email: <span className="font-medium text-ghana-gray-700 text-[11px]">{authUser?.email}</span>
              </p>
              <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-ghana-gray-700 hover:bg-ghana-gray-50 transition-colors cursor-pointer">
                Change Password
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-ghana-gray-700 hover:bg-ghana-gray-50 transition-colors cursor-pointer">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-ghana-red hover:bg-ghana-red/5 transition-colors cursor-pointer">
                Delete Account
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
