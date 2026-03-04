"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, CheckCircle, Building2 } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-ghana-green overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zM10 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0-40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 relative z-10">
          <p className="text-xs font-bold text-ghana-gold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            We&apos;d Love to<br />Hear From You
          </h1>
          <p className="text-base text-white/60 max-w-lg">
            Have a question about a property, need agent support, or want to list your land? Our team responds within 24 hours.
          </p>
        </div>
      </div>

      {/* Contact cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: MapPin, title: "Visit Us", info: "Osu, Oxford Street, Accra", sub: "Ghana" },
            { icon: Phone, title: "Call Us", info: "+233 24 000 0000", sub: "+233 30 000 0000" },
            { icon: Mail, title: "Email Us", info: "info@mawelpa.com", sub: "support@mawelpa.com" },
            { icon: Clock, title: "Working Hours", info: "Mon–Fri: 8AM – 5PM", sub: "Sat: 9AM – 1PM" },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl border border-ghana-gray-200/80 p-5 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-ghana-green/8 rounded-xl flex items-center justify-center mb-3">
                <card.icon size={18} className="text-ghana-green" />
              </div>
              <h3 className="text-sm font-bold text-ghana-gray-900 mb-1">{card.title}</h3>
              <p className="text-sm text-ghana-gray-600">{card.info}</p>
              <p className="text-xs text-ghana-gray-400">{card.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left side — info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-xs font-bold text-ghana-green uppercase tracking-widest mb-3">Contact Us</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-ghana-gray-900 mb-3">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-sm text-ghana-gray-500 leading-relaxed">
                Whether you&apos;re looking to buy your first plot or list properties for sale, our experienced team is here to guide you every step of the way.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Free property consultation",
                "Agent matching based on your region",
                "Document preparation assistance",
                "Payment plan guidance",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-ghana-green flex-shrink-0" />
                  <span className="text-sm text-ghana-gray-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Regional offices */}
            <div className="bg-ghana-gray-50 rounded-2xl p-6 border border-ghana-gray-200/80">
              <h3 className="text-sm font-bold text-ghana-gray-900 mb-4 flex items-center gap-2">
                <Building2 size={16} className="text-ghana-green" /> Regional Offices
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { city: "Kumasi", area: "Adum" },
                  { city: "Takoradi", area: "Market Circle" },
                  { city: "Tamale", area: "Central Business" },
                  { city: "Cape Coast", area: "Kotokuraba" },
                ].map((office) => (
                  <div key={office.city} className="flex items-start gap-2">
                    <MapPin size={12} className="text-ghana-gray-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-ghana-gray-800">{office.city}</p>
                      <p className="text-xs text-ghana-gray-400">{office.area}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side — form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-ghana-gray-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-ghana-gray-900 mb-1">Send a Message</h2>
              <p className="text-sm text-ghana-gray-500 mb-7">Fill out the form and our team will get back to you within 24 hours.</p>

              {sent && (
                <div className="mb-6 p-4 bg-ghana-green/8 rounded-xl border border-ghana-green/15 flex items-center gap-3">
                  <CheckCircle size={18} className="text-ghana-green flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-ghana-green">Message sent successfully!</p>
                    <p className="text-xs text-ghana-green/70">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Full Name <span className="text-ghana-red">*</span></label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 placeholder:text-ghana-gray-400"
                      placeholder="Kwame Asante"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Email <span className="text-ghana-red">*</span></label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 placeholder:text-ghana-gray-400"
                      placeholder="kwame@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 placeholder:text-ghana-gray-400"
                      placeholder="+233 24 000 0000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50"
                    >
                      <option value="">Select subject...</option>
                      <option value="property_inquiry">Property Inquiry</option>
                      <option value="agent_registration">Agent Registration</option>
                      <option value="seller_inquiry">Seller Inquiry</option>
                      <option value="document_request">Document Request</option>
                      <option value="general">General Question</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ghana-gray-700 mb-2">Message <span className="text-ghana-red">*</span></label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-ghana-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ghana-green/20 focus:border-ghana-green bg-ghana-gray-50 resize-none placeholder:text-ghana-gray-400"
                    placeholder="Tell us how we can help you..."
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-ghana-gray-400 hidden sm:block">Fields marked with <span className="text-ghana-red">*</span> are required</p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-2 px-7 py-3 bg-ghana-green text-white text-sm font-semibold rounded-xl hover:bg-ghana-green-dark transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <Send size={14} /> Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-ghana-gray-50 border-t border-ghana-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-ghana-gray-900 mb-3">
            Prefer to Browse First?
          </h2>
          <p className="text-ghana-gray-500 mb-8 max-w-md mx-auto">
            Check out our available properties across Ghana before reaching out.
          </p>
          <Link href="/listings" className="inline-flex items-center gap-2 px-7 py-3.5 bg-ghana-green text-white font-bold text-sm rounded-xl hover:bg-ghana-green-dark transition-all shadow-sm">
            View All Listings <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
