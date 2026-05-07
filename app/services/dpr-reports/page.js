"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const phases = [
  { num: "01", title: "Site Assessment & Feasibility", desc: "Primary site evaluation covering land availability, resource assessment, topography, grid proximity, and regulatory pre-clearance status.", items: ["Site survey & land analysis", "Solar/wind resource assessment", "Grid proximity study", "Regulatory pre-screening"] },
  { num: "02", title: "Technology Selection & Design", desc: "Selection and justification of technology, equipment, and system design — benchmarked against available options and project-specific constraints.", items: ["Technology comparison", "Equipment selection rationale", "System design & layout", "Capacity optimisation"] },
  { num: "03", title: "Capital Cost & Procurement Plan", desc: "Detailed cost estimation covering civil works, equipment, electrical balance-of-plant, and contingency — with a structured procurement and delivery schedule.", items: ["Itemised capex estimate", "Procurement plan", "Project schedule (Gantt)", "Contingency analysis"] },
  { num: "04", title: "ESG & Environmental Clearance", desc: "ESG impact assessment, environmental and social baseline study, and preparation of documentation required for environmental clearance and DFI appraisal.", items: ["Environmental baseline study", "ESG impact assessment", "IFC PS alignment", "EC documentation support"] },
  { num: "05", title: "Financial Projections & Revenue Model", desc: "Development of the project's revenue model, tariff structure, off-take arrangements, and 25-year financial projections with debt service analysis.", items: ["Revenue & tariff model", "Off-take structure review", "25-year P&L projections", "DSCR & debt analysis"] },
  { num: "06", title: "DPR Compilation & Submission", desc: "Final DPR compilation, internal review, client approval, and submission support for MNRE, state nodal agencies, and financial institution appraisal.", items: ["Full DPR document", "Executive summary", "Compliance matrix", "Submission support"] },
];

const deliverables = [
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, title: "Complete DPR Document", desc: "Fully compiled Detailed Project Report covering all technical, financial, ESG, and regulatory sections — ready for lender and government submission." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, title: "Project Financial Model", desc: "25-year financial model with capex/opex breakdown, revenue projections, DSCR, and multi-scenario sensitivity analysis." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>, title: "ESG Impact Assessment", desc: "Structured environmental and social impact assessment aligned with IFC Performance Standards and DFI appraisal requirements." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>, title: "Project Schedule", desc: "Gantt chart-based implementation schedule covering procurement, construction, commissioning, and O&M phases with critical path analysis." },
];

const faqs = [
  ["Who typically commissions a DPR?", "DPRs are commissioned by project developers, state renewable energy agencies (SRECs), development banks, and private equity sponsors — typically at the pre-investment or project sanction stage."],
  ["What regulatory guidelines does your DPR follow?", "Our DPRs are structured to comply with MNRE guidelines, state nodal agency requirements, and the due diligence standards of major DFIs including IREDA, PFC, REC, and bilateral lenders."],
  ["Is ESG part of the standard DPR scope?", "Yes. ESG impact assessment, IFC Performance Standards alignment, and environmental clearance documentation are standard components — not optional additions."],
  ["How long does DPR preparation take?", "Typical engagement duration is 4–8 weeks, depending on project scale, data availability, and whether site visits are required. We provide a confirmed timeline at the scoping stage."],
];

export default function DprReportsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span>
          <Link href="/services" className="hover:text-[#0B6E4F]">Services</Link><span>/</span>
          <span className="text-gray-800 font-medium">DPR Reports</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/88 to-[#0A2540]/70" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Fade>
              <div className="flex gap-2 mb-6">
                <span className="bg-sky-500/20 text-sky-300 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-sky-500/30">Project Documentation</span>
                <span className="bg-white/10 text-white/80 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-white/15">Bankable</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
                Detailed Project<br />Report Preparation
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
                End-to-end DPR preparation for developers, state agencies, and financial institutions — with ESG and sustainability components built in as standard, ensuring projects are bankable, compliant, and clearance-ready.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <div className="flex gap-4 flex-wrap mb-12">
                <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">
                  Request a DPR
                </Link>
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Talk to a Specialist
                </Link>
              </div>
            </Fade>
            <Fade delay={0.24}>
              <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-6 pt-8 border-t border-white/10">
                {[["40+", "DPRs Delivered"], ["6", "Phase Process"], ["MNRE", "Guideline Compliant"], ["IFC PS", "ESG Integrated"]].map(([n, l]) => (
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

      {/* GUIDELINES BAR */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 flex-wrap">
          <span className="text-[10px] font-semibold text-[#475569] tracking-[0.15em] uppercase">Compliance Frameworks</span>
          {["MNRE", "IREDA", "PFC / REC", "State Nodal Agencies", "IFC Performance Standards", "ADB Safeguards"].map(f => (
            <span key={f} className="text-[13px] font-medium text-[#0F172A]">{f}</span>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Fade>
            <div className="text-center mb-16">
              <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">6-Phase Methodology</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Our Engagement Process</h2>
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">A structured approach from site assessment to final submission — covering technical, financial, and ESG dimensions in a single integrated report.</p>
            </div>
          </Fade>
          <div className="max-w-3xl mx-auto space-y-4">
            {phases.map((p, i) => (
              <Fade key={p.num} delay={i * 0.06}>
                <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-sky-200 transition-all duration-300 group">
                  <div className="flex gap-5">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-[#0A2540] flex items-center justify-center text-white font-heading text-sm font-bold group-hover:bg-sky-600 transition-colors duration-300">
                        {p.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-[17px] font-bold text-[#0F172A] mb-2">{p.title}</h3>
                      <p className="text-[14px] text-[#475569] leading-relaxed mb-4">{p.desc}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {p.items.map(item => (
                          <div key={item} className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-sky-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
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
              <p className="text-[16px] text-white/50 max-w-lg mx-auto">A complete DPR package structured for government submission, DFI appraisal, and financial close.</p>
            </div>
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {deliverables.map((d, i) => (
              <Fade key={d.title} delay={i * 0.06}>
                <div className="bg-white/[0.06] rounded-xl p-6 border border-white/[0.08] hover:bg-white/[0.10] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center mb-4">{d.icon}</div>
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
              <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">FAQ</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em]">Common Questions</h2>
            </div>
          </Fade>
          <div className="space-y-3">
            {faqs.map(([q, a], i) => (
              <Fade key={i} delay={i * 0.04}>
                <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 cursor-pointer hover:border-sky-200 transition-all duration-200" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="flex justify-between items-center py-5 px-6">
                    <h3 className="text-[15px] font-semibold text-[#0F172A] flex-1 pr-4">{q}</h3>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${openFaq === i ? "bg-sky-600 rotate-180" : "bg-gray-200"}`}>
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
        <img src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/90 to-[#0A2540]/80" />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-[-0.01em] mb-4">Ready to prepare your project for financing?</h2>
            <p className="text-[16px] text-white/60 mb-10">Share your project details and we&apos;ll confirm scope and timelines within 24 hours.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Request a DPR</Link>
              <Link href="/services" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">View All Services</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
