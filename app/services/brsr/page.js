"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const phases = [
  { num: "01", title: "Discovery & Scoping", desc: "Kick-off meeting, stakeholder mapping, current disclosure review, data landscape assessment and project plan definition.", items: ["Stakeholder interviews", "Current reporting audit", "Data source inventory", "Project plan & timelines"] },
  { num: "02", title: "Gap Analysis & Materiality", desc: "Comprehensive gap assessment against all 9 NGRBC principles. Stakeholder-informed materiality matrix development.", items: ["BRSR indicator mapping", "RAG status assessment", "Materiality workshop", "Priority action plan"] },
  { num: "03", title: "Data Architecture", desc: "Design collection templates, assign departmental ownership, establish validation workflows and governance protocols.", items: ["Collection templates", "Ownership matrix", "Validation protocols", "Data governance setup"] },
  { num: "04", title: "Framework Population", desc: "Populate BRSR framework with validated data. Draft narrative disclosures. Cross-reference with GRI/SASB for consistency.", items: ["Data population", "Narrative drafting", "Cross-framework mapping", "Consistency checks"] },
  { num: "05", title: "Review & Assurance Prep", desc: "Internal review cycles, management sign-off, evidence trail compilation and assurance documentation.", items: ["Management review", "Evidence documentation", "Assurance preparation", "Quality assurance"] },
  { num: "06", title: "Delivery & Handoff", desc: "Final BRSR report delivery, board presentation support, SEBI filing guidance and monitoring setup.", items: ["Final report", "Board deck", "Filing support", "Monitoring setup"] },
];

const deliverables = [
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, title: "Complete BRSR Report", desc: "Fully populated disclosure document covering all mandatory and leadership indicators, ready for SEBI filing." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375" /></svg>, title: "Data Collection Framework", desc: "Reusable templates with automated validation and departmental ownership matrix for annual reuse." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>, title: "Gap Analysis Report", desc: "RAG status across all 9 NGRBC principles with prioritized remediation roadmap and timelines." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>, title: "Materiality Matrix", desc: "Stakeholder-informed assessment with visual matrix, methodology documentation and recommendations." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>, title: "Peer Benchmarking", desc: "Comparative analysis against 10+ industry peers with scoring, best practices and improvement areas." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3" /></svg>, title: "Board Presentation", desc: "Executive-ready deck summarizing findings, performance highlights, risk areas and ESG roadmap." },
];

const faqs = [
  ["Who needs to comply with BRSR?", "Top 1,000 listed companies by market cap. BRSR Core (with reasonable assurance) is mandatory for top 150, expanding to top 1,000 by FY 2026-27."],
  ["How long does a typical engagement take?", "Standard engagements run 6 phases from kickoff to delivery. Timelines are customised based on your data maturity and scope."],
  ["Can you help with BRSR Core assurance?", "Yes — we prepare all documentation, evidence trails and data governance for third-party reasonable assurance on BRSR Core indicators."],
  ["How does BRSR relate to GRI and SASB?", "BRSR is substantially aligned with GRI and incorporates SASB, TCFD, SDG elements. We map all frameworks simultaneously to eliminate duplication."],
];

export default function BRSRPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span>
          <Link href="/services" className="hover:text-[#0B6E4F]">Services</Link><span>/</span>
          <span className="text-gray-800 font-medium">BRSR Advisory</span>
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/90 to-[#0A2540]/75" />

        <div className="relative max-w-container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Fade>
              <div className="flex gap-2 mb-6">
                <span className="bg-[#0B6E4F]/20 text-[#34D399] text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-[#0B6E4F]/30">Advisory Service</span>
                <span className="bg-white/10 text-white/80 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-white/15">SEBI Mandated</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[56px] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
                BRSR & Regulatory<br />Compliance Advisory
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
                End-to-end advisory for Indian listed companies navigating SEBI&apos;s Business Responsibility and Sustainability Reporting mandate. From gap analysis to assurance-ready filing.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <div className="flex gap-4 flex-wrap mb-12">
                <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">
                  Schedule Free Consultation
                </Link>
                <button className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Download BRSR Guide
                </button>
              </div>
            </Fade>
            <Fade delay={0.24}>
              <div className="flex gap-12 pt-8 border-t border-white/10">
                {[["140+", "BRSR Indicators"], ["9", "NGRBC Principles"], ["6", "Phase Process"], ["100%", "Filing Success"]].map(([n, l]) => (
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

      {/* ═══ FRAMEWORKS BAR ═══ */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-6 px-6">
        <div className="max-w-container mx-auto flex items-center justify-center gap-8 flex-wrap">
          <span className="text-[10px] font-semibold text-[#475569] tracking-[0.15em] uppercase">Frameworks Covered</span>
          {["BRSR", "BRSR Core", "GRI", "SASB", "TCFD", "UN SDGs", "ISSB"].map(f => (
            <span key={f} className="text-[13px] font-medium text-[#0F172A]">{f}</span>
          ))}
        </div>
      </section>

      {/* ═══ ENGAGEMENT PROCESS ═══ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-container mx-auto">
          <Fade>
            <div className="text-center mb-16">
              <span className="inline-block bg-[#E6F4EF] text-[#0B6E4F] text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">6-Phase Methodology</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Our Engagement Process</h2>
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">A structured process designed to take you from current state to assurance-ready BRSR filing.</p>
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

      {/* ═══ DELIVERABLES ═══ */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A2540]" />
        <div className="max-w-container mx-auto relative">
          <Fade>
            <div className="text-center mb-14">
              <span className="inline-block bg-white/10 text-white/80 text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase border border-white/10">Deliverables</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-white tracking-[-0.01em] mb-3">What You&apos;ll Receive</h2>
              <p className="text-[16px] text-white/50 max-w-lg mx-auto">Every engagement includes a comprehensive set of deliverables designed for immediate use and annual reuse.</p>
            </div>
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* ═══ PRICING ═══ */}
      <section className="bg-[#F8FAFC] py-24 px-6">
        <div className="max-w-container mx-auto">
          <Fade>
            <div className="text-center mb-14">
              <span className="inline-block bg-[#E6F4EF] text-[#0B6E4F] text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Engagement Models</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Flexible Options</h2>
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">Choose the engagement model that matches your company&apos;s BRSR maturity and compliance timeline.</p>
            </div>
          </Fade>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { tier: "BRSR Essentials", price: "₹3.5L", period: "one-time", featured: false, desc: "For companies filing BRSR for the first time or needing a structured gap analysis.", items: ["Gap analysis (all 9 principles)", "Data collection templates", "BRSR framework population", "1 review cycle", "Filing guidance"] },
              { tier: "BRSR Professional", price: "₹6.5L", period: "one-time", featured: true, desc: "Full-service BRSR advisory with materiality assessment, benchmarking and assurance prep.", items: ["Everything in Essentials", "Materiality assessment", "Peer benchmarking (10+ peers)", "Assurance-ready documentation", "Board presentation deck", "Training workshops"] },
              { tier: "BRSR Enterprise", price: "Custom", period: "annual retainer", featured: false, desc: "Ongoing BRSR compliance partnership with continuous improvement and dedicated analyst.", items: ["Everything in Professional", "Annual BRSR filing support", "Quarterly data reviews", "Regulatory monitoring", "Year-on-year benchmarking", "Dedicated analyst", "Unlimited revisions"] },
            ].map((p, i) => (
              <Fade key={p.tier} delay={i * 0.08}>
                <div className={`rounded-2xl overflow-hidden h-full flex flex-col ${p.featured ? "border-2 border-[#0B6E4F] shadow-xl bg-white" : "border border-gray-200 bg-white"}`}>
                  {p.featured && <div className="bg-[#0B6E4F] text-center py-2 text-[10px] font-bold text-white tracking-wider uppercase">Most Popular</div>}
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="font-heading text-[17px] font-bold text-[#0F172A] mb-1">{p.tier}</h3>
                    <div className="flex items-baseline gap-1.5 mb-4">
                      <span className="font-heading text-[28px] font-bold text-[#0F172A]">{p.price}</span>
                      <span className="text-[13px] text-[#475569]">{p.period}</span>
                    </div>
                    <p className="text-[13px] text-[#475569] mb-6 leading-relaxed">{p.desc}</p>
                    <div className="flex-1 space-y-3">
                      {p.items.map(it => (
                        <div key={it} className="flex items-center gap-2.5">
                          <svg className="w-4 h-4 text-[#0B6E4F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7" /></svg>
                          <span className="text-[13px] text-[#0F172A]">{it}</span>
                        </div>
                      ))}
                    </div>
                    <Link href="/contact" className={`block text-center font-semibold text-sm py-3.5 rounded-lg mt-8 transition-all duration-200 ${p.featured ? "bg-[#0B6E4F] text-white hover:bg-[#095C42] shadow-lg shadow-[#0B6E4F]/20" : "border-2 border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white"}`}>
                      {p.price === "Custom" ? "Contact Us" : "Get Started"}
                    </Link>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
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
                <div
                  className="bg-[#F8FAFC] rounded-xl border border-gray-200 cursor-pointer hover:border-[#0B6E4F]/20 transition-all duration-200"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="flex justify-between items-center py-5 px-6">
                    <h3 className="text-[15px] font-semibold text-[#0F172A] flex-1 pr-4">{q}</h3>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${openFaq === i ? "bg-[#0B6E4F] rotate-180" : "bg-gray-200"}`}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke={openFaq === i ? "white" : "#475569"} viewBox="0 0 24 24" strokeWidth={2.5}><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                    <p className="text-[14px] text-[#475569] leading-relaxed px-6">{a}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/90 to-[#0A2540]/80" />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-[-0.01em] mb-4">Ready to make BRSR compliance effortless?</h2>
            <p className="text-[16px] text-white/60 mb-10">Schedule a free 30-minute BRSR readiness assessment with our regulatory specialists.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Book Free Assessment</Link>
              <button className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">Download BRSR Checklist</button>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
