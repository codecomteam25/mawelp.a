"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-ghana-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-ghana-green rounded-xl flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-ghana-gray-900 block leading-tight">Mawel P.A</span>
                <span className="text-[10px] text-ghana-gray-400 font-medium uppercase tracking-wider">Land Sales</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname === link.href
                      ? "bg-ghana-green/8 text-ghana-green"
                      : "text-ghana-gray-600 hover:text-ghana-gray-900 hover:bg-ghana-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center">
              <Link href="/contact" className="px-5 py-2.5 bg-ghana-green text-white text-sm font-semibold rounded-xl hover:bg-ghana-green-dark transition-all shadow-sm hover:shadow-md">
                Contact Us
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-ghana-gray-600 hover:bg-ghana-gray-50 cursor-pointer"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {mobileOpen && (
            <div className="md:hidden border-t border-ghana-gray-100 py-4 space-y-1 pb-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium",
                    pathname === link.href
                      ? "bg-ghana-green/8 text-ghana-green"
                      : "text-ghana-gray-600 hover:bg-ghana-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-ghana-gray-100 px-4">
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2.5 rounded-xl text-sm font-semibold text-center bg-ghana-green text-white">
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-ghana-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 bg-ghana-gold rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-ghana-black" />
                </div>
                <div>
                  <span className="text-lg font-bold block leading-tight">Mawel P.A</span>
                  <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Land Sales</span>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                Ghana&apos;s most trusted platform for land sales management. Connecting buyers, sellers, and agents across all 16 regions.
              </p>
              <div className="flex items-center gap-3">
                <a href="tel:+233240000000" className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Phone size={15} className="text-white/60" />
                </a>
                <a href="mailto:info@mawelpa.com" className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                  <Mail size={15} className="text-white/60" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5 text-white/90">Quick Links</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/45 hover:text-white transition-colors flex items-center gap-1.5">
                      <ChevronRight size={12} className="text-white/20" />{link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5 text-white/90">Regions We Serve</h4>
              <ul className="space-y-3">
                {["Greater Accra", "Ashanti Region", "Central Region", "Volta Region", "Eastern Region", "Western Region"].map((r) => (
                  <li key={r}><span className="text-sm text-white/45">{r}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-5 text-white/90">Contact Info</h4>
              <ul className="space-y-3 text-sm text-white/45">
                <li className="flex items-start gap-2"><MapPin size={14} className="text-white/30 mt-0.5 flex-shrink-0" />Osu, Oxford Street<br />Accra, Ghana</li>
                <li className="flex items-center gap-2"><Phone size={14} className="text-white/30 flex-shrink-0" />+233 24 000 0000</li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-white/30 flex-shrink-0" />info@mawelpa.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">&copy; {new Date().getFullYear()} Mawel P.A. All rights reserved.</p>
            <div className="flex gap-6">
              <span className="text-xs text-white/25 hover:text-white/50 transition-colors cursor-pointer">Privacy Policy</span>
              <span className="text-xs text-white/25 hover:text-white/50 transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
