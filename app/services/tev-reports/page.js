"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const phases = [
  { num: "01", title: "Project Scoping & Data Collection", desc: "Kick-off meeting with the project developer, review of existing project documents, site data, technology specifications, and identification of key stakeholders.", items: ["Site data review", "Technology specification analysis", "Stakeholder mapping", "Data gap identification"] },
  { num: "02", title: "Technical Due Diligence", desc: "On-site or desk-based assessment of technology, equipment, civil works, and grid connectivity — benchmarked against industry standards and IFC Performance Standards.", items: ["Technology benchmarking", "Equipment vendor assessment", "Grid connectivity review", "Civil works evaluation"] },
  { num: "03", title: "Financial Modelling", desc: "Construction of a detailed project financial model covering capex, opex, revenue, debt service, and sensitivity scenarios aligned with lender requirements.", items: ["IRR & NPV analysis", "DSCR calculations", "Sensitivity scenarios", "Capex/opex breakdown"] },
  { num: "04", title: "ESG & Environmental Assessment", desc: "Assessment of environmental compliance, carbon intensity benchmarks, social risk factors, and alignment with IFC Performance Standards and lender ESG requirements.", items: ["Carbon intensity benchmarking", "IFC PS alignment", "Social risk assessment", "Environmental compliance mapping"] },
  { num: "05", title: "Report Preparation & Review", desc: "Preparation of the full TEV report with executive summary, technical findings, financial analysis, risk matrix, and lender-ready recommendation section.", items: ["Draft TEV report", "Risk matrix", "Lender recommendation section", "Client review cycle"] },
];

const deliverables = [
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, title: "Full TEV Report", desc: "Comprehensive lender-grade document covering technical feasibility, financial viability, ESG risk, and project recommendation." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, title: "Project Financial Model", desc: "Excel-based model with IRR, NPV, DSCR, payback period, and multi-scenario sensitivity analysis ready for lender review." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>, title: "Risk Register", desc: "Structured risk matrix covering technical, financial, regulatory, and ESG risks with mitigation measures and residual risk ratings." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>, title: "Executive Summary", desc: "Standalone 4–6 page summary for DFI/lender submission — covering project overview, key findings, and investment recommendation." },
];

const faqs = [
  ["What is a TEV report and who requires it?", "A Technical Economic Viability (TEV) report is a lender-commissioned assessment that verifies a project's technical soundness and financial viability before sanctioning debt. It is required by banks (SBI, PFC, REC), DFIs (IREDA, SIDBI), and bilateral lenders for all capital-intensive renewable energy and infrastructure projects."],
  ["Which project types do you cover?", "We cover solar PV, wind (onshore and offshore), small hydro, biomass, hybrid renewable projects, green hydrogen, transmission infrastructure, and industrial capex projects requiring DFI financing."],
  ["How long does a TEV engagement take?", "Standard TEV engagements are completed in 3–5 weeks from receipt of complete project documents. Timelines depend on project complexity and site visit requirements."],
  ["Does the TEV include ESG assessment?", "Yes. Our TEV reports integrate ESG risk parameters, IFC Performance Standards alignment, carbon intensity benchmarks, and environmental compliance status as standard — not as an optional add-on."],
];

export default function TevReportsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span>
          <Link href="/services" className="hover:text-[#0B6E4F]">Services</Link><span>/</span>
          <span className="text-gray-800 font-medium">TEV Reports</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/88 to-[#0A2540]/70" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Fade>
              <div className="flex gap-2 mb-6">
                <span className="bg-[#0B6E4F]/20 text-[#34D399] text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-[#0B6E4F]/30">Technical Assessment</span>
                <span className="bg-white/10 text-white/80 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-white/15">Lender-Grade</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
                Technical Economic<br />Viability Reports
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
                Lender-grade TEV assessments for renewable energy, infrastructure, and industrial projects — integrating financial modelling, ESG risk, and environmental compliance into a single bankable report.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <div className="flex gap-4 flex-wrap mb-12">
                <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">
                  Request a TEV Report
                </Link>
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Talk to a Specialist
                </Link>
              </div>
            </Fade>
            <Fade delay={0.24}>
              <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-6 pt-8 border-t border-white/10">
                {[["50+", "TEV Reports Delivered"], ["5", "Technology Types"], ["IREDA", "DFI Compliant"], ["IFC PS", "ESG Aligned"]].map(([n, l]) => (
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

      {/* LENDERS BAR */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 flex-wrap">
          <span className="text-[10px] font-semibold text-[#475569] tracking-[0.15em] uppercase">Accepted By</span>
          {["IREDA", "SBI", "PFC", "REC", "SIDBI", "ADB", "IFC", "Bilateral DFIs"].map(f => (
            <span key={f} className="text-[13px] font-medium text-[#0F172A]">{f}</span>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Fade>
            <div className="text-center mb-16">
              <span className="inline-block bg-[#E6F4EF] text-[#0B6E4F] text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">5-Phase Methodology</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Our Engagement Process</h2>
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">A structured assessment process that produces a lender-ready report from project data to final submission.</p>
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
              <p className="text-[16px] text-white/50 max-w-lg mx-auto">Every TEV engagement delivers a complete documentation package ready for lender submission.</p>
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
        <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/90 to-[#0A2540]/80" />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-[-0.01em] mb-4">Need a lender-ready TEV report?</h2>
            <p className="text-[16px] text-white/60 mb-10">Talk to our technical team. We&apos;ll scope your project and confirm timelines within 24 hours.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Request a TEV Report</Link>
              <Link href="/services" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">View All Services</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
