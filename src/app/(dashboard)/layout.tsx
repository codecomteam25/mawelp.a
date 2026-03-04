"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import { useAuth } from "@/context/AuthContext";

const adminOnlyPaths = ["/profiles", "/payments"];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    // Not logged in → go to login
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // Buyers/sellers → go to public site
    if (user?.role === "buyer" || user?.role === "seller") {
      router.replace("/");
      return;
    }

    // Agents → blocked from admin-only paths
    if (user?.role === "agent" && adminOnlyPaths.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, isAuthenticated, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ghana-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={32} className="animate-spin text-ghana-green mx-auto mb-3" />
          <p className="text-sm text-ghana-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role === "buyer" || user?.role === "seller") {
    return null;
  }

  return (
    <div className="min-h-screen bg-ghana-gray-50">
      <Sidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 pt-16 lg:p-8 lg:pt-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
