"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getReportBySlug } from "@/lib/data";

export default function CheckoutPage() {
  const { slug } = useParams();
  const report = getReportBySlug(slug);
  const [step, setStep] = useState(1);
  const [license, setLicense] = useState(0);
  const [payMethod, setPayMethod] = useState("stripe");
  const [submitted, setSubmitted] = useState(false);

  if (!report) return <div className="p-20 text-center text-gray-400">Report not found</div>;

  const licenses = [
    ["Single User License", report.price, "1 designated user, PDF only"],
    ["Multi User License", report.price + 1000, "Up to 5 users, PDF + Excel"],
    ["Enterprise License", report.price + 2500, "Unlimited users, PDF + Excel + Analyst support"],
  ];
  const selectedPrice = licenses[license][1];
  const gst = Math.round(selectedPrice * 0.18);
  const total = selectedPrice + gst;

  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center bg-brand-light px-5">
          <div className="max-w-md w-full bg-white rounded-2xl p-10 text-center border border-gray-200 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-5 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="font-heading text-2xl font-bold text-brand-dark mb-2">Order Confirmed!</h1>
            <p className="text-sm text-gray-500 mb-1">Order #ME-{Date.now().toString().slice(-6)}</p>
            <p className="text-sm text-gray-500 mb-6">A confirmation email with your report has been sent.</p>
            <div className="bg-brand-light rounded-xl p-4 border border-gray-200 mb-6 text-left">
              <p className="text-xs font-semibold text-gray-700 mb-1">{report.title}</p>
              <p className="text-[10px] text-gray-400">{licenses[license][0]} · {report.pages} pages · PDF + Excel</p>
              <p className="font-heading text-lg font-bold text-emerald-600 mt-2">${total.toLocaleString()} <span className="text-xs font-normal text-gray-400">(incl. GST)</span></p>
            </div>
            <div className="flex flex-col gap-2">
              <button className="bg-emerald-500 text-white font-semibold text-sm py-3 rounded-lg hover:bg-emerald-600 transition w-full">Download Report (PDF)</button>
              <button className="border border-gray-200 text-gray-600 font-medium text-sm py-3 rounded-lg hover:border-emerald-300 transition w-full">Download Excel Data Model</button>
              <Link href="/contact" className="text-xs text-emerald-600 font-semibold mt-2">Book analyst onboarding call →</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white border-b border-gray-100 py-3 px-5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span>
          <Link href={`/reports/${slug}`} className="hover:text-emerald-600">Report</Link><span>/</span>
          <span className="text-gray-700 font-medium">Checkout</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="bg-brand-light border-b border-gray-200 py-4 px-5">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-0">
          {[["1", "Contact"], ["2", "Billing"], ["3", "Payment"]].map(([n, l], i) => (
            <div key={n} className="flex items-center">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep(i + 1)}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${step >= i + 1 ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-500"}`}>{n}</div>
                <span className={`text-xs font-semibold ${step >= i + 1 ? "text-emerald-700" : "text-gray-400"}`}>{l}</span>
              </div>
              {i < 2 && <div className={`w-12 sm:w-20 h-0.5 mx-3 ${step > i + 1 ? "bg-emerald-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      <section className="bg-brand-light py-10 px-5 min-h-[70vh]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
          {/* Left — Form (3 cols) */}
          <div className="lg:col-span-3">
            {/* Step 1 — Contact */}
            {step === 1 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="font-heading text-lg font-bold text-brand-dark mb-5">Contact Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[["Full Name *", "text", "Your name"], ["Email *", "email", "you@company.com"]].map(([l, t, p]) => <div key={l}><label className="text-xs font-semibold text-gray-600 mb-1.5 block">{l}</label><input type={t} placeholder={p} className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-50 placeholder:text-gray-400" /></div>)}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Phone</label><input placeholder="+91 98765 43210" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Organisation</label><input placeholder="Company name" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Job Title</label><input placeholder="e.g. Research Director" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Country</label><select className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-600"><option>India</option><option>United States</option><option>United Kingdom</option><option>UAE</option><option>Singapore</option><option>Other</option></select></div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="mt-6 bg-emerald-500 text-white font-semibold text-sm px-8 py-3 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto">Continue to Billing →</button>
              </div>
            )}

            {/* Step 2 — Billing */}
            {step === 2 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="font-heading text-lg font-bold text-brand-dark mb-5">Billing Address</h2>
                <div className="space-y-4">
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Address Line 1 *</label><input placeholder="Street address" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Address Line 2</label><input placeholder="Apartment, suite, etc." className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">City *</label><input placeholder="City" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">State *</label><input placeholder="State" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                    <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">PIN Code *</label><input placeholder="411001" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                  </div>
                  <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">GST Number <span className="text-gray-400 font-normal">(optional, for Indian buyers)</span></label><input placeholder="22AAAAA0000A1Z5" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-sky-400 placeholder:text-gray-400" /></div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="border border-gray-200 text-gray-600 font-medium text-sm px-6 py-3 rounded-lg hover:border-gray-300 transition">← Back</button>
                  <button onClick={() => setStep(3)} className="bg-emerald-500 text-white font-semibold text-sm px-8 py-3 rounded-lg hover:bg-emerald-600 transition">Continue to Payment →</button>
                </div>
              </div>
            )}

            {/* Step 3 — Payment */}
            {step === 3 && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h2 className="font-heading text-lg font-bold text-brand-dark mb-5">Payment Method</h2>

                {/* Method tabs */}
                <div className="flex gap-2 mb-6">
                  {[["stripe", "💳 International (Stripe)"], ["razorpay", "🇮🇳 India (Razorpay)"]].map(([k, l]) => (
                    <button key={k} onClick={() => setPayMethod(k)} className={`flex-1 py-3 rounded-lg text-sm font-semibold border-2 transition ${payMethod === k ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>{l}</button>
                  ))}
                </div>

                {/* Stripe mockup */}
                {payMethod === "stripe" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Card Number</label>
                      <div className="flex items-center">
                        <input placeholder="4242 4242 4242 4242" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-50 placeholder:text-gray-400 pr-24" />
                        <div className="absolute right-3 flex gap-1.5">
                          {["Visa", "MC", "Amex"].map(b => <div key={b} className="bg-gray-100 rounded px-1.5 py-0.5 text-[8px] font-bold text-gray-500">{b}</div>)}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">Expiry</label><input placeholder="MM / YY" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 placeholder:text-gray-400" /></div>
                      <div><label className="text-xs font-semibold text-gray-600 mb-1.5 block">CVC</label><input placeholder="123" className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 placeholder:text-gray-400" /></div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 flex items-center gap-2 border border-blue-100">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      <span className="text-xs text-blue-700">Secured by <strong>Stripe</strong> — 256-bit SSL encryption</span>
                    </div>
                  </div>
                )}

                {/* Razorpay mockup */}
                {payMethod === "razorpay" && (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-white rounded flex items-center justify-center"><span className="text-blue-600 font-bold text-xs">R</span></div>
                        <span className="text-sm font-bold">Razorpay</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        {["UPI", "Cards", "Netbanking", "Wallets"].map((m, i) => (
                          <div key={m} className={`text-center py-2 rounded-lg text-xs font-semibold cursor-pointer transition ${i === 0 ? "bg-white text-blue-600" : "bg-white/20 text-white hover:bg-white/30"}`}>{m}</div>
                        ))}
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <label className="text-xs text-blue-100 mb-2 block">UPI ID</label>
                        <div className="flex gap-2">
                          <input placeholder="yourname@upi" className="flex-1 px-3 py-2.5 text-sm bg-white text-gray-800 rounded-lg outline-none placeholder:text-gray-400" />
                          <button className="bg-emerald-400 text-white font-semibold text-sm px-4 rounded-lg">Verify</button>
                        </div>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {["Google Pay", "PhonePe", "Paytm", "BHIM"].map(app => (
                            <div key={app} className="bg-white/20 rounded-md px-3 py-1.5 text-[10px] font-semibold cursor-pointer hover:bg-white/30 transition">{app}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {["UPI", "Visa", "Mastercard", "RuPay", "Netbanking", "Paytm"].map(m => <div key={m} className="bg-gray-50 border border-gray-200 rounded-md px-2.5 py-1 text-[10px] font-semibold text-gray-500">{m}</div>)}
                    </div>
                  </div>
                )}

                {/* Terms + Submit */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-2"><input type="checkbox" className="mt-1 accent-emerald-500" /><span className="text-xs text-gray-500">I agree to MindEarth's <span className="text-emerald-600 cursor-pointer">Terms of Service</span> and <span className="text-emerald-600 cursor-pointer">Refund Policy</span>.</span></div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="border border-gray-200 text-gray-600 font-medium text-sm px-6 py-3 rounded-lg hover:border-gray-300 transition">← Back</button>
                    <button onClick={() => setSubmitted(true)} className="flex-1 bg-emerald-500 text-white font-semibold text-sm py-3 rounded-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      Complete Purchase — ${total.toLocaleString()}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Trust signals */}
            <div className="mt-5 flex flex-wrap gap-4 text-[11px] text-gray-400">
              <span>🔒 256-bit SSL encrypted</span>
              <span>⚡ Instant PDF delivery</span>
              <span>📞 30-day analyst support</span>
              <span>💳 Visa, Mastercard, UPI, Netbanking</span>
            </div>
          </div>

          {/* Right — Order Summary (2 cols) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-20">
              <h3 className="font-heading text-base font-bold text-brand-dark mb-4">Order Summary</h3>
              <div className="flex gap-3 mb-4">
                <img src={report.img} alt={report.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-snug">{report.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{report.code} · {report.pages} pages</p>
                </div>
              </div>

              {/* License selector */}
              <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Select License</p>
              {licenses.map(([tier, price, desc], i) => (
                <div key={tier} onClick={() => setLicense(i)} className={`p-3 rounded-lg mb-1.5 border cursor-pointer transition ${license === i ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-200"}`}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${license === i ? "border-emerald-500" : "border-gray-300"}`}>{license === i && <div className="w-2 h-2 rounded-full bg-emerald-500" />}</div>
                      <div><p className="text-xs font-semibold text-gray-800">{tier}</p><p className="text-[9px] text-gray-400">{desc}</p></div>
                    </div>
                    <p className="text-sm font-bold text-gray-800">${price.toLocaleString()}</p>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="mt-4 mb-4">
                <div className="flex gap-2"><input placeholder="Coupon code" className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-400 placeholder:text-gray-400" /><button className="text-xs font-semibold text-emerald-600 border border-emerald-500 px-3 py-2 rounded-lg hover:bg-emerald-50 transition">Apply</button></div>
              </div>

              {/* Price breakdown */}
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium text-gray-800">${selectedPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">GST (18%)</span><span className="font-medium text-gray-800">${gst.toLocaleString()}</span></div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200"><span className="text-brand-dark">Total</span><span className="text-emerald-600">${total.toLocaleString()}</span></div>
              </div>

              {/* What you get */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">What you'll receive</p>
                {[`${report.pages}-page PDF report`, "Excel data model", "6-year forecasts (2025–2031)", "Company profiles & SWOT", "30-day analyst support"].map(f => <div key={f} className="flex items-center gap-2 mb-1.5"><svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7" /></svg><span className="text-[11px] text-gray-600">{f}</span></div>)}
              </div>

              {/* Secure badges */}
              <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-3 flex-wrap">
                {["🔒 SSL", "Stripe", "Razorpay", "PCI-DSS"].map(b => <span key={b} className="text-[9px] font-semibold text-gray-400 bg-gray-50 border border-gray-200 rounded px-2 py-1">{b}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
