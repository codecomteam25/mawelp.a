"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { MapPin, ArrowRight, Shield, Users, FileText, Building2, Phone, Mail, ChevronRight, Star, CheckCircle2, Menu, X } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { formatCurrency, cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/about", label: "About" },
];

function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
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
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-ghana-gray-600 hover:bg-ghana-gray-50 cursor-pointer">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-ghana-gray-100 py-4 space-y-1 pb-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={cn("block px-4 py-3 rounded-xl text-sm font-medium", pathname === link.href ? "bg-ghana-green/8 text-ghana-green" : "text-ghana-gray-600 hover:bg-ghana-gray-50")}>
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-ghana-gray-100 px-4">
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-2.5 rounded-xl text-sm font-semibold text-center bg-ghana-green text-white">Contact Us</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
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
              Ghana&apos;s most trusted platform for land sales. Connecting buyers, sellers, and agents across all 16 regions.
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
  );
}

export default function HomePage() {
  const featuredProperties = useQuery(api.properties.getAll);
  const available = featuredProperties?.filter((p) => p.status === "available").slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative bg-ghana-green overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 lg:py-36 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <Star size={12} className="text-ghana-gold" />
                <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">Trusted Across All 16 Regions</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.1] mb-6">
                Secure Your <br />
                <span className="text-ghana-gold">Perfect Land</span><br />
                in Ghana
              </h1>
              <p className="text-lg text-white/65 mb-10 max-w-lg leading-relaxed">
                Browse verified land listings, connect with certified agents, and secure your dream property — all on one trusted platform built for Ghanaian real estate.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/listings" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-ghana-green font-bold text-sm rounded-xl hover:bg-ghana-gray-50 transition-all shadow-lg hover:shadow-xl">
                  Explore Listings <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all">
                  Talk to Us
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Building2 size={28} className="text-ghana-gold mb-3" />
                    <p className="text-2xl font-bold text-white">500+</p>
                    <p className="text-xs text-white/50 mt-0.5">Verified Properties</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Users size={28} className="text-ghana-gold mb-3" />
                    <p className="text-2xl font-bold text-white">50+</p>
                    <p className="text-xs text-white/50 mt-0.5">Certified Agents</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Shield size={28} className="text-ghana-gold mb-3" />
                    <p className="text-2xl font-bold text-white">200+</p>
                    <p className="text-xs text-white/50 mt-0.5">Successful Deals</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <Star size={28} className="text-ghana-gold mb-3" />
                    <p className="text-2xl font-bold text-white">98%</p>
                    <p className="text-xs text-white/50 mt-0.5">Client Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile stats */}
      <section className="lg:hidden bg-ghana-green-dark">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: "500+", label: "Properties" },
              { value: "200+", label: "Deals Closed" },
              { value: "50+", label: "Agents" },
              { value: "98%", label: "Satisfaction" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-ghana-gold">{s.value}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ghana-gray-900 mb-4">
              Land Acquisition Made Simple
            </h2>
            <p className="text-ghana-gray-500 max-w-lg mx-auto leading-relaxed">
              From finding your ideal property to closing the deal — we streamline every step.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-ghana-gray-200" />
            {[
              { step: "01", title: "Browse Properties", desc: "Search verified listings across all regions. Filter by location, price, size, and land use type.", icon: Building2 },
              { step: "02", title: "Connect & Negotiate", desc: "Our certified agents facilitate direct communication between buyers and sellers for fair deals.", icon: Users },
              { step: "03", title: "Close Securely", desc: "Track payments, generate legal documents, and transfer ownership with full transparency.", icon: Shield },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="w-14 h-14 bg-ghana-green rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10">
                  <item.icon size={24} className="text-white" />
                </div>
                <span className="text-[11px] font-bold text-ghana-green uppercase tracking-widest">Step {item.step}</span>
                <h3 className="text-lg font-bold text-ghana-gray-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-ghana-gray-500 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {available && available.length > 0 && (
        <section className="py-20 md:py-24 bg-ghana-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">Featured Listings</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-ghana-gray-900">
                  Available Properties
                </h2>
              </div>
              <Link href="/listings" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-ghana-green hover:text-ghana-green-dark transition-colors">
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {available.map((property) => (
                <div key={property._id} className="bg-white rounded-2xl border border-ghana-gray-200/80 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                  <div className="h-52 bg-ghana-green/5 relative overflow-hidden">
                    {property.images && property.images.length > 0 ? (
                      <img 
                        src={property.images[0]} 
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={cn("absolute inset-0 flex items-center justify-center fallback-icon", property.images && property.images.length > 0 ? "hidden" : "")}>
                      <div className="text-center">
                        <MapPin size={36} className="text-ghana-green/20 mx-auto mb-2" />
                        <p className="text-xs text-ghana-gray-400">{property.region}</p>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-ghana-green text-white uppercase tracking-wide shadow-sm">
                        Available
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-ghana-gray-700 border border-ghana-gray-200 shadow-sm">
                        {property.landUse}
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
                        <p className="text-xs text-ghana-gray-400 mb-0.5">Price</p>
                        <p className="text-lg font-extrabold text-ghana-green">{formatCurrency(property.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-ghana-gray-400 mb-0.5">Size</p>
                        <p className="text-sm font-semibold text-ghana-gray-700">{property.size}</p>
                      </div>
                    </div>
                    <Link href="/contact" className="mt-4 block text-center py-2.5 rounded-xl bg-ghana-green text-white text-sm font-semibold hover:bg-ghana-green-dark transition-all">
                      Inquire Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="sm:hidden text-center mt-8">
              <Link href="/listings" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ghana-green">
                View All Listings <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">Why Mawel P.A</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ghana-gray-900 mb-4">
              Built for Ghanaian Real Estate
            </h2>
            <p className="text-ghana-gray-500 max-w-lg mx-auto leading-relaxed">
              A complete platform designed specifically for the way land transactions work in Ghana.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: Building2, title: "Verified Listings", desc: "Every property comes with verified plot numbers, validated site plans, and confirmed ownership documentation.", color: "bg-ghana-green" },
              { icon: Shield, title: "Secure Payments", desc: "Pay safely via Mobile Money, bank transfer, or cash. Get receipts and track your payment progress every step of the way.", color: "bg-ghana-gold" },
              { icon: FileText, title: "Legal Documentation", desc: "Receive proper indentures, site plans, allocation letters, and sale agreements. All your documents in one secure place.", color: "bg-ghana-red" },
              { icon: Users, title: "Certified Agents", desc: "Work with vetted, professional agents who know the local market. Direct communication, no middlemen.", color: "bg-ghana-black" },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-5 p-6 rounded-2xl border border-ghana-gray-200/80 hover:border-ghana-green/20 transition-all hover:shadow-sm group">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", feature.color)}>
                  <feature.icon size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-ghana-gray-900 mb-1.5 group-hover:text-ghana-green transition-colors">{feature.title}</h3>
                  <p className="text-sm text-ghana-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Trust */}
      <section className="py-20 md:py-24 bg-ghana-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-ghana-gold fill-ghana-gold" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
              &ldquo;Mawel P.A made buying my first plot of land in Accra completely stress-free. Every document was transparent, every payment tracked, and my agent was exceptional. I recommend them to anyone looking for land in Ghana.&rdquo;
            </blockquote>
            <div>
              <p className="text-white font-bold">Akosua Mensah</p>
              <p className="text-sm text-white/50">First-time Buyer, Greater Accra</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-ghana-gray-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to Find Your Land?
              </h2>
              <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
                Join hundreds of satisfied buyers and sellers. Browse listings or speak with our team today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-ghana-gold text-ghana-black font-bold text-sm rounded-xl hover:bg-ghana-gold-light transition-all shadow-lg">
                  Browse All Listings <ArrowRight size={16} />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
