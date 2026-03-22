"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PortalPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (email.endsWith("@gmail.com") || email.endsWith("@yahoo.com") || email.endsWith("@hotmail.com") || email.endsWith("@outlook.com")) {
      setError("Personal email addresses are not allowed. Please use your company email.");
      return;
    }
    router.push("/portal/dashboard");
  };

  return (
    <>
      <Navbar />

      <section className="min-h-[85vh] bg-brand-light flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[1000px] grid lg:grid-cols-2 gap-0 bg-white rounded-2xl border border-brand-border shadow-sm overflow-hidden">

          {/* Left — Branding panel */}
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

              <h2 className="font-heading text-[28px] font-bold text-white leading-tight mb-4">
                Your ESG Intelligence Hub
              </h2>
              <p className="text-[15px] text-white/55 leading-relaxed mb-8">
                Access your purchased reports, track orders, download data models, and connect with your dedicated research analyst.
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
              <p className="text-[11px] text-white/30">Trusted by 850+ global institutions including Fortune 500 corporations, sovereign wealth funds, and development banks.</p>
            </div>
          </div>

          {/* Right — Login form */}
          <div className="p-10 lg:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="font-heading text-[24px] font-bold text-[#0F172A] mb-2">Sign in to your account</h1>
              <p className="text-[14px] text-[#475569]">Enter your credentials to access the client portal.</p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2.5">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" /><path d="M12 15.75h.007v.008H12v-.008z" /></svg>
                <p className="text-[13px] text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-[#0F172A] mb-1.5">Company email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 text-[14px] bg-brand-light border border-brand-border rounded-lg outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/10 transition-all placeholder:text-brand-muted"
                />
                <p className="text-[11px] text-brand-muted mt-1.5">Only company email addresses are accepted. Personal emails (Gmail, Yahoo, etc.) are not allowed.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[13px] font-semibold text-[#0F172A]">Password</label>
                  <button type="button" className="text-[12px] text-[#0B6E4F] font-medium hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-11 text-[14px] bg-brand-light border border-brand-border rounded-lg outline-none focus:border-[#0B6E4F] focus:ring-2 focus:ring-[#0B6E4F]/10 transition-all placeholder:text-brand-muted"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-body transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      {showPassword ? (
                        <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      ) : (
                        <>
                          <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-4 h-4 rounded border-brand-border text-[#0B6E4F] focus:ring-[#0B6E4F]/20 accent-[#0B6E4F]" />
                <label htmlFor="remember" className="text-[13px] text-[#475569]">Keep me signed in</label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0B6E4F] text-white font-semibold text-[14px] py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-sm"
              >
                Sign In
              </button>
            </form>

            <p className="text-[12px] text-brand-muted text-center mt-8 pt-6 border-t border-brand-border">
              New client? <Link href="/contact" className="text-[#0B6E4F] font-semibold hover:underline">Request access</Link> or contact your account manager.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
