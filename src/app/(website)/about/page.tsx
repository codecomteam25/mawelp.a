import { MapPin, Shield, Users, Target, Award, CheckCircle, Building2, FileText, Star, ArrowRight, Heart, Eye } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative bg-ghana-green overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
          <p className="text-xs font-bold text-ghana-gold uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            Ghana&apos;s Most Trusted<br />Land Sales Platform
          </h1>
          <p className="text-base text-white/60 max-w-lg">
            Transforming the way Ghanaians buy and sell land — with transparency, security, and excellence at every step.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-ghana-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-ghana-gray-200">
            {[
              { icon: MapPin, value: "16", label: "Regions Covered" },
              { icon: Users, value: "50+", label: "Certified Agents" },
              { icon: Shield, value: "200+", label: "Deals Completed" },
              { icon: Star, value: "98%", label: "Satisfaction Rate" },
            ].map((stat) => (
              <div key={stat.label} className="py-8 px-4 text-center">
                <div className="w-10 h-10 bg-ghana-green/8 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={18} className="text-ghana-green" />
                </div>
                <p className="text-2xl font-extrabold text-ghana-gray-900">{stat.value}</p>
                <p className="text-xs text-ghana-gray-500 mt-0.5 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission section */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ghana-gray-900 mb-6">
                Making Land<br />Ownership Accessible
              </h2>
              <p className="text-ghana-gray-600 leading-relaxed mb-5">
                At Mawel P.A, we are dedicated to transforming the land acquisition process in Ghana. 
                We believe that buying land should be transparent, secure, and accessible to everyone — 
                whether you&apos;re a first-time buyer or an experienced investor.
              </p>
              <p className="text-ghana-gray-600 leading-relaxed mb-5">
                Our platform connects verified sellers and certified agents with buyers, 
                providing end-to-end management of land transactions including documentation, 
                payment tracking, and legal paperwork generation.
              </p>
              <p className="text-ghana-gray-600 leading-relaxed mb-8">
                We operate across all 16 regions of Ghana, with a strong presence in Greater Accra, 
                Ashanti, Central, and Volta regions.
              </p>
              <Link href="/listings" className="inline-flex items-center gap-2 px-6 py-3 bg-ghana-green text-white text-sm font-semibold rounded-xl hover:bg-ghana-green-dark transition-all">
                Explore Listings <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-ghana-green rounded-2xl p-6 text-white">
                  <Building2 size={28} className="text-ghana-gold mb-4" />
                  <p className="text-3xl font-extrabold mb-1">500+</p>
                  <p className="text-sm text-white/60">Properties Listed</p>
                </div>
                <div className="bg-ghana-gray-50 rounded-2xl p-6 border border-ghana-gray-200">
                  <Award size={28} className="text-ghana-green mb-4" />
                  <p className="text-3xl font-extrabold text-ghana-gray-900 mb-1">5+</p>
                  <p className="text-sm text-ghana-gray-500">Years of Service</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-ghana-gray-50 rounded-2xl p-6 border border-ghana-gray-200">
                  <Heart size={28} className="text-ghana-red mb-4" />
                  <p className="text-3xl font-extrabold text-ghana-gray-900 mb-1">1000+</p>
                  <p className="text-sm text-ghana-gray-500">Happy Clients</p>
                </div>
                <div className="bg-ghana-black rounded-2xl p-6 text-white">
                  <FileText size={28} className="text-ghana-gold mb-4" />
                  <p className="text-3xl font-extrabold mb-1">3000+</p>
                  <p className="text-sm text-white/60">Documents Processed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-24 bg-ghana-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">What Drives Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ghana-gray-900 mb-4">Our Core Values</h2>
            <p className="text-ghana-gray-500 max-w-lg mx-auto leading-relaxed">
              These principles guide every transaction, every relationship, and every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Transparency",
                desc: "Every transaction is fully documented and traceable. Buyers and sellers have complete visibility into the process, from listing to closing.",
                color: "bg-ghana-green",
              },
              {
                icon: Shield,
                title: "Integrity",
                desc: "We verify every property listing, validate land ownership documents, and ensure all agents are properly certified before they join our platform.",
                color: "bg-ghana-gold",
              },
              {
                icon: Heart,
                title: "Client First",
                desc: "Our team provides personalized support throughout your land acquisition journey. From site visits to document preparation, we are with you every step.",
                color: "bg-ghana-red",
              },
            ].map((value) => (
              <div key={value.title} className="bg-white p-7 rounded-2xl border border-ghana-gray-200/80 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 ${value.color} rounded-xl flex items-center justify-center mb-5`}>
                  <value.icon size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-ghana-gray-900 mb-2 group-hover:text-ghana-green transition-colors">{value.title}</h3>
                <p className="text-sm text-ghana-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-ghana-gray-900 mb-4">What We Offer</h2>
            <p className="text-ghana-gray-500 max-w-lg mx-auto leading-relaxed">
              A comprehensive suite of services designed for the Ghanaian real estate market.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Verified Listings", desc: "Properties verified with valid plot numbers and site plans across all regions." },
              { title: "Transaction Tracking", desc: "Secure management and tracking of every payment, from deposit to completion." },
              { title: "Legal Documents", desc: "Automated generation of indentures, site plans, allocation letters, and more." },
              { title: "Receipt Generation", desc: "Instant payment receipts and comprehensive financial record keeping." },
              { title: "Agent Network", desc: "Certified and vetted real estate agents who know the local market." },
              { title: "Market Insights", desc: "Property valuation data and market trends across regions." },
              { title: "Document Review", desc: "Legal document verification and review by experienced professionals." },
              { title: "Full Support", desc: "End-to-end buyer and seller support throughout the entire process." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-2xl border border-ghana-gray-200/80 hover:border-ghana-green/20 transition-all hover:shadow-sm">
                <div className="flex items-center gap-2.5 mb-2">
                  <CheckCircle size={16} className="text-ghana-green flex-shrink-0" />
                  <h3 className="text-sm font-bold text-ghana-gray-900">{item.title}</h3>
                </div>
                <p className="text-xs text-ghana-gray-500 leading-relaxed pl-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-ghana-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
            Whether you&apos;re buying, selling, or looking to partner as an agent — we&apos;re here for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/listings" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-ghana-green font-bold text-sm rounded-xl hover:bg-ghana-gray-50 transition-all shadow-lg">
              Browse Listings <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
