"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const phases = [
  { num: "01", title: "Project & Capital Structure Review", desc: "Assessment of the project's existing structure, equity/debt split, sponsor profile, and identification of the optimal capital stack for the development stage and lender profile.", items: ["Capital stack analysis", "Sponsor profile review", "Debt sizing & structuring", "Equity IRR optimisation"] },
  { num: "02", title: "Green Finance Identification", desc: "Assessment of eligibility and suitability for green bonds, sustainability-linked loans, blended finance instruments, and climate finance from DFIs and bilateral lenders.", items: ["Green bond eligibility", "SLL framework assessment", "Blended finance options", "DFI product matching"] },
  { num: "03", title: "Information Memorandum Preparation", desc: "Preparation of a comprehensive IM covering project overview, technical summary, financial projections, ESG credentials, and sponsor background — structured for lender and investor review.", items: ["Project overview", "Financial model summary", "ESG credentials section", "Risk & mitigants"] },
  { num: "04", title: "Lender Due Diligence Support", desc: "Management of the lender due diligence process including data room preparation, Q&A co-ordination, independent engineer interface, and ESG assessment facilitation.", items: ["Data room setup", "Q&A management", "IE / ESG advisor interface", "Condition precedent tracking"] },
  { num: "05", title: "Term Sheet & ESG Covenant Design", desc: "Review and negotiation support for term sheet conditions, ESG reporting covenants, green finance reporting obligations, and sustainability performance target (SPT) design.", items: ["Term sheet review", "ESG covenant design", "SPT & KPI setting", "Reporting obligation mapping"] },
  { num: "06", title: "Financial Close Support", desc: "End-to-end coordination through to financial close including CP satisfaction, drawdown co-ordination, and establishment of the post-close project monitoring framework.", items: ["CP satisfaction tracking", "Drawdown co-ordination", "Monitoring framework", "Post-close reporting setup"] },
];

const deliverables = [
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, title: "Information Memorandum", desc: "Professionally structured IM covering all technical, financial, and ESG dimensions — ready for DFI and lender submission." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, title: "Integrated Financial Model", desc: "Lender-ready project finance model with capital structure, DSCR waterfalls, debt sculpting, and sensitivity analysis." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, title: "ESG Covenant Framework", desc: "Term sheet and facility agreement ESG covenant structure with sustainability performance targets, KPIs, and reporting obligations." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>, title: "Green Finance Assessment", desc: "Eligibility and framework assessment for green bonds, sustainability-linked loans, and climate finance instruments." },
];

const faqs = [
  ["What types of projects do you advise on?", "We advise on clean energy projects (solar, wind, hydro, biomass, hybrid, green hydrogen), sustainable infrastructure, and ESG-linked industrial capex — typically in the range of ₹50 crore to ₹5,000 crore."],
  ["Can you help identify the right lenders?", "Yes. We map the project against the lending mandates and green finance products of Indian DFIs (IREDA, PFC, REC, SIDBI), commercial banks, and bilateral/multilateral lenders to identify the best financing fit."],
  ["What is a sustainability-linked loan (SLL)?", "An SLL is a loan where the interest rate is linked to the borrower achieving pre-agreed sustainability performance targets (SPTs). We design the SPT framework, KPI structure, and reporting obligations that satisfy lender requirements."],
  ["Do you work alongside legal counsel and other advisors?", "Yes. We act as the financial and ESG advisory layer, working alongside legal counsel, independent engineers, and technical advisors to ensure an integrated and efficient due diligence process."],
];

export default function ProjectFinancePage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span>
          <Link href="/services" className="hover:text-[#0B6E4F]">Services</Link><span>/</span>
          <span className="text-gray-800 font-medium">Project Finance Consultancy</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/96 via-[#0A2540]/90 to-[#0A2540]/72" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Fade>
              <div className="flex gap-2 mb-6">
                <span className="bg-[#0B6E4F]/20 text-[#34D399] text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-[#0B6E4F]/30">Finance Advisory</span>
                <span className="bg-white/10 text-white/80 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-white/15">Green Finance</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
                Project Finance<br />Consultancy
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
                Structured finance advisory for clean energy and infrastructure projects from concept through financial close — covering capital structuring, green finance instruments, lender due diligence, and ESG covenant design.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <div className="flex gap-4 flex-wrap mb-12">
                <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">
                  Get a Proposal
                </Link>
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Talk to a Specialist
                </Link>
              </div>
            </Fade>
            <Fade delay={0.24}>
              <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-6 pt-8 border-t border-white/10">
                {[["₹2,500Cr+", "Projects Advised"], ["6", "Phase Process"], ["Green", "Finance Eligible"], ["IFC / ADB", "DFI Standard"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-heading text-2xl font-bold text-white">{n}</div>
                    <div className="text-[11px] text-white/50 mt-1 font-medium">{l}</div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* INSTRUMENTS BAR */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 flex-wrap">
          <span className="text-[10px] font-semibold text-[#475569] tracking-[0.15em] uppercase">Instruments Covered</span>
          {["Project Finance", "Green Bonds", "Sustainability-Linked Loans", "Blended Finance", "DFI Debt", "Climate Finance"].map(f => (
            <span key={f} className="text-[13px] font-medium text-[#0F172A]">{f}</span>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Fade>
            <div className="text-center mb-16">
              <span className="inline-block bg-[#E6F4EF] text-[#0B6E4F] text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">6-Phase Methodology</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Our Engagement Process</h2>
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">From capital structuring to financial close — a structured advisory process designed to maximise bankability and minimise deal risk.</p>
            </div>
          </Fade>
          <div className="max-w-3xl mx-auto space-y-4">
            {phases.map((p, i) => (
              <Fade key={p.num} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#0B6E4F]/20 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#0A2540] flex items-center justify-center text-white font-heading text-sm font-bold group-hover:bg-[#0B6E4F] transition-colors duration-300">
                        {p.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-[17px] font-bold text-[#0F172A] mb-2">{p.title}</h3>
                      <p className="text-[14px] text-[#475569] leading-relaxed mb-4">{p.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {p.items.map(item => (
                          <div key={item} className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-[#0B6E4F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
                            <span className="text-[12px] text-[#475569] font-medium">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A2540]" />
        <div className="max-w-7xl mx-auto relative">
          <Fade>
            <div className="text-center mb-14">
              <span className="inline-block bg-white/10 text-white/80 text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase border border-white/10">Deliverables</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-white tracking-[-0.01em] mb-3">What You&apos;ll Receive</h2>
              <p className="text-[16px] text-white/50 max-w-lg mx-auto">A complete advisory package designed to take your project from structuring to signed facility agreement.</p>
            </div>
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverables.map((d, i) => (
              <Fade key={d.title} delay={i * 0.06}>
                <div className="bg-white/[0.06] rounded-xl p-6 border border-white/[0.08] hover:bg-white/[0.10] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#0B6E4F]/20 text-[#34D399] flex items-center justify-center mb-4">{d.icon}</div>
                  <h3 className="font-heading text-[15px] font-bold text-white mb-2">{d.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed">{d.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Fade>
            <div className="text-center mb-14">
              <span className="inline-block bg-[#E6F4EF] text-[#0B6E4F] text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">FAQ</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em]">Common Questions</h2>
            </div>
          </Fade>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <Fade key={i} delay={i * 0.04}>
                <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 cursor-pointer hover:border-[#0B6E4F]/20 transition-all duration-200" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex justify-between items-center py-5 px-6">
                    <h3 className="text-[15px] font-semibold text-[#0F172A] flex-1 pr-4">{q}</h3>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${openFaq === i ? "bg-[#0B6E4F] rotate-180" : "bg-gray-200"}`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke={openFaq === i ? "white" : "#475569"} viewBox="0 0 24 24" strokeWidth={2.5}><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-48 pb-5" : "max-h-0"}`}>
                    <p className="text-[14px] text-[#475569] leading-relaxed px-6">{a}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/96 via-[#0A2540]/90 to-[#0A2540]/80" />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-[-0.01em] mb-4">Ready to structure your project for financial close?</h2>
            <p className="text-[16px] text-white/60 mb-10">Share your project details and we&apos;ll provide an advisory scope within 48 hours.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Get a Proposal</Link>
              <Link href="/services" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">View All Services</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
