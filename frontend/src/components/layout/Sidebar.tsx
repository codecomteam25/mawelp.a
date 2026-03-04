"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  Users,
  CreditCard,
  FileText,
  ArrowLeftRight,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const allNavItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", roles: ["admin", "agent"] },
  { href: "/properties", icon: MapPin, label: "Properties", roles: ["admin", "agent"] },
  { href: "/transactions", icon: ArrowLeftRight, label: "Transactions", roles: ["admin", "agent"] },
  { href: "/payments", icon: CreditCard, label: "Payments", roles: ["admin"] },
  { href: "/profiles", icon: Users, label: "Users & Agents", roles: ["admin"] },
  { href: "/documents", icon: FileText, label: "Documents", roles: ["admin", "agent"] },
  { href: "/settings", icon: Settings, label: "Settings", roles: ["admin", "agent"] },
];

const roleBadge: Record<string, { label: string; color: string }> = {
  admin: { label: "Admin", color: "bg-ghana-red" },
  agent: { label: "Agent", color: "bg-ghana-green-light" },
};

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const role = user?.role;
  const navItems = allNavItems.filter(
    (item) => !role || item.roles.includes(role)
  );

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "";

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-ghana-green text-white p-2 rounded-lg shadow-lg cursor-pointer"
      >
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-ghana-black text-white z-50 flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-ghana-gold rounded-lg flex items-center justify-center">
              <MapPin size={18} className="text-ghana-black" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Mawel P.A</h1>
              <p className="text-[11px] text-white/50 -mt-0.5">
                Land Sales Management
              </p>
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/60 hover:text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-ghana-green text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          {role && roleBadge[role] && (
            <div className="px-3 mb-3">
              <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white", roleBadge[role].color)}>
                <Shield size={10} />
                {roleBadge[role].label}
              </span>
            </div>
          )}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-ghana-green-light flex items-center justify-center text-xs font-bold">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {displayName || "Loading..."}
              </p>
              <p className="text-[11px] text-white/40">
                {displayEmail || ""}
              </p>
            </div>
            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
