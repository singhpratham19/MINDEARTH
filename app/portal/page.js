"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ loading: false, ok: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: false, msg: "" });

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ loading: false, ok: false, msg: "Please enter a valid email address." });
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "portal-waitlist" }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus({ loading: false, ok: true, msg: "You are on the waitlist. We will email you the moment access opens up." });
        setEmail("");
      } else {
        setStatus({ loading: false, ok: false, msg: json.error || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ loading: false, ok: false, msg: "Network error. Please try again." });
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-[85vh] bg-brand-light flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">

          {/* Left, Branding panel */}
          <div className="bg-[#0A2540] p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04]">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="300" cy="50" r="180" fill="#0B6E4F" />
                <circle cx="80" cy="350" r="120" fill="#0B6E4F" />
              </svg>
            </div>

            <div className="relative">
              <div className="flex items-center gap-2.5 mb-10">
                <div className="w-10 h-10 rounded-lg bg-[#0B6E4F] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <span className="font-heading text-lg font-bold text-white">MindEarth</span>
                  <span className="block text-[8px] font-semibold text-white/40 tracking-[0.18em] uppercase">Client Portal</span>
                </div>
              </div>

              <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-emerald-300 uppercase bg-emerald-400/10 ring-1 ring-emerald-400/20 px-2.5 py-1 rounded mb-4">Launching Soon</span>
              <h2 className="font-heading text-[28px] font-bold text-white leading-tight mb-4">
                Your ESG Intelligence Hub
              </h2>
              <p className="text-[15px] text-white/55 leading-relaxed mb-8">
                A dedicated workspace where MindEarth clients will access purchased reports, custom research deliverables, and dedicated analyst support.
              </p>

              <div className="space-y-4">
                {[
                  { icon: "📊", text: "Download purchased ESG reports & datasets" },
                  { icon: "📁", text: "Access custom research deliverables" },
                  { icon: "💬", text: "Direct analyst communication channel" },
                  { icon: "🔔", text: "Real-time alerts on report updates" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-[13px] text-white/65 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-10 pt-6 border-t border-white/10">
              <p className="text-[11px] text-white/30">Currently in private beta with select institutional clients. General availability rolling out shortly.</p>
            </div>
          </div>

          {/* Right, Coming-soon email catcher */}
          <div className="p-10 lg:p-12 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-[0.2em] text-emerald-700 uppercase">Coming Soon</span>
            </div>
            <h1 className="font-heading text-[26px] font-bold text-[#0F172A] mb-2 leading-tight">Client portal is almost ready.</h1>
            <p className="text-[14px] text-[#475569] leading-relaxed mb-8">Leave your email and we will notify you the moment access opens. No spam, just one short email when the portal goes live.</p>

            {status.ok ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 flex items-start gap-3">
                <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[13px] font-semibold text-emerald-800 mb-1">You are on the waitlist</p>
                  <p className="text-[12px] text-emerald-700/80 leading-relaxed">{status.msg}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">Work email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 text-[14px] bg-brand-light border border-brand-border rounded-lg outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/10 transition-all placeholder:text-brand-muted"
                  />
                </div>

                {status.msg && !status.ok && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                      <path d="M12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <p className="text-[13px] text-red-700">{status.msg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-[#0B6E4F] text-white font-semibold text-[14px] py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status.loading ? "Saving..." : "Notify Me When Live"}
                </button>

                <p className="text-[11px] text-brand-muted leading-relaxed pt-1">We will only use this email to send you portal launch and access details.</p>
              </form>
            )}

            <p className="text-[12px] text-brand-muted text-center mt-8 pt-6 border-t border-brand-border">
              Need access urgently? <Link href="/contact" className="text-[#0B6E4F] font-semibold hover:underline">Talk to our team</Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
