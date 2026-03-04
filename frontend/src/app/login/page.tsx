"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useConvex } from "convex/react";
import { api } from "@convex/_generated/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const convex = useConvex();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      // Authenticate against Convex directly
      const user = await convex.query(api.users.login, { email, password });

      if (!user) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Store session and redirect
      login(user as any);
      router.push("/dashboard");
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-ghana-green relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative z-10 max-w-md">
          <div className="w-16 h-16 bg-ghana-gold rounded-2xl flex items-center justify-center mb-8">
            <MapPin size={28} className="text-ghana-black" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 leading-tight">
            Welcome to<br />Mawel P.A
          </h1>
          <p className="text-base text-white/70 mb-10 leading-relaxed">
            Internal portal for Mawel P.A staff. Access your workspace to manage operations across all 16 regions.
          </p>
          <div className="space-y-4">
            {[
              "Access property listings and updates",
              "View and manage your assigned tasks",
              "Stay connected with your team",
              "Secure, role-based access",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-ghana-gold rounded-full" />
                </div>
                <span className="text-sm text-white/85">{item}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Right panel — login form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-11 h-11 bg-ghana-green rounded-xl flex items-center justify-center">
              <MapPin size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-ghana-gray-900">Mawel P.A</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ghana-gray-900 mb-1.5">Sign in to your account</h2>
            <p className="text-sm text-ghana-gray-500">Enter your credentials to access your workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3.5 bg-ghana-red/8 border border-ghana-red/20 rounded-xl">
                <p className="text-sm text-ghana-red">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-ghana-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green transition-all"
                  placeholder="admin@mawelpa.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ghana-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 border border-ghana-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/30 focus:border-ghana-green transition-all"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ghana-gray-400 hover:text-ghana-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ghana-green text-white text-sm font-semibold rounded-xl hover:bg-ghana-green-dark transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>


          <p className="text-center text-xs text-ghana-gray-400 mt-8">
            Mawel P.A &copy; {new Date().getFullYear()} &mdash; Land Sales Management
          </p>
        </div>
      </div>
    </div>
  );
}
