"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const phases = [
  { num: "01", title: "ESG Baseline & Materiality Assessment", desc: "Comprehensive ESG baseline assessment covering current performance, disclosure gaps, and a stakeholder-informed materiality matrix to identify priority ESG issues.", items: ["Current ESG performance audit", "Disclosure gap analysis", "Stakeholder engagement", "Materiality matrix development"] },
  { num: "02", title: "ESG Strategy & Roadmap Design", desc: "Development of a multi-year ESG strategy aligned to business objectives, regulatory requirements, and investor expectations — with a phased implementation roadmap.", items: ["ESG strategy framework", "Target setting & KPIs", "Regulatory alignment", "Phased roadmap"] },
  { num: "03", title: "Carbon Accounting & Climate Risk", desc: "Scope 1, 2, and 3 GHG emissions inventory, science-based target setting, climate risk assessment (physical and transition), and TCFD-aligned disclosure preparation.", items: ["Scope 1, 2 & 3 inventory", "Science-based targets", "TCFD scenario analysis", "Climate risk register"] },
  { num: "04", title: "Disclosure Preparation", desc: "Preparation of sustainability and ESG disclosures aligned to BRSR, GRI, TCFD, ISSB, and SASB frameworks — with cross-framework mapping to eliminate duplication.", items: ["BRSR preparation", "GRI Standards mapping", "ISSB / IFRS S1 & S2", "TCFD disclosure"] },
  { num: "05", title: "ESG Due Diligence & Risk Advisory", desc: "ESG due diligence for M&A transactions, lending decisions, and investment mandates — covering ESG risk identification, scoring, and integration into deal documentation.", items: ["M&A ESG due diligence", "Lending ESG assessment", "ESG risk scoring", "Deal documentation support"] },
  { num: "06", title: "Implementation & Ongoing Advisory", desc: "Ongoing advisory support through ESG programme implementation, annual reporting cycles, regulatory monitoring, and continuous improvement across ESG performance indicators.", items: ["Implementation support", "Annual reporting cycles", "Regulatory monitoring", "Performance improvement"] },
];

const deliverables = [
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" /></svg>, title: "ESG Strategy Document", desc: "Multi-year ESG strategy with objectives, KPIs, targets, and a phased implementation roadmap aligned to business and regulatory requirements." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>, title: "Sustainability Report", desc: "Board-approved sustainability report prepared to BRSR, GRI, and/or TCFD standards — including data tables, narratives, and assurance-ready evidence." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>, title: "GHG Emissions Inventory", desc: "Verified Scope 1, 2, and 3 emissions inventory with methodology documentation, data quality assessment, and reduction opportunity analysis." },
  { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3" /></svg>, title: "Materiality Matrix", desc: "Stakeholder-informed materiality assessment with visual matrix, priority ESG issues, methodology documentation and recommendations." },
];

const frameworks = ["BRSR", "BRSR Core", "GRI Standards", "TCFD", "ISSB / IFRS S1 & S2", "SASB", "UN SDGs", "CDP", "Science-Based Targets"];

const faqs = [
  ["What types of organisations do you work with?", "We advise listed companies (mandatory BRSR), unlisted corporates building voluntary ESG programmes, banks and NBFCs integrating ESG into lending, private equity funds, and government agencies — across all major industry sectors."],
  ["How does BRSR relate to other global frameworks?", "BRSR is substantially aligned with GRI and incorporates elements of SASB, TCFD, and the SDGs. We map all frameworks simultaneously in a single engagement, eliminating duplication and preparing you for both Indian regulatory requirements and international disclosure expectations."],
  ["Do you cover Scope 3 emissions?", "Yes. We conduct full Scope 1, 2, and 3 GHG inventories using GHG Protocol methodology — including upstream and downstream value chain emissions, supply chain engagement, and science-based target setting aligned with SBTi requirements."],
  ["Can you support ESG due diligence for an acquisition?", "Yes. We conduct ESG due diligence for M&A transactions, covering ESG risk identification and scoring, regulatory compliance assessment, reputational risk analysis, and integration of ESG findings into deal documentation and post-acquisition integration plans."],
];

export default function EsgConsultancyPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span>
          <Link href="/services" className="hover:text-[#0B6E4F]">Services</Link><span>/</span>
          <span className="text-gray-800 font-medium">ESG & Sustainability Consultancy</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/96 via-[#0A2540]/88 to-[#0A2540]/70" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Fade>
              <div className="flex gap-2 mb-6">
                <span className="bg-[#0B6E4F]/20 text-[#34D399] text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-[#0B6E4F]/30">Strategic Advisory</span>
                <span className="bg-white/10 text-white/80 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-white/15">Full-Spectrum ESG</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
                ESG & Sustainability<br />Consultancy
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
                End-to-end ESG advisory for corporates, financial institutions, and government bodies — from materiality assessment and strategy design through carbon accounting, regulatory disclosure, and ongoing implementation support.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <div className="flex gap-4 flex-wrap mb-12">
                <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">
                  Get a Proposal
                </Link>
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Schedule Free Consultation
                </Link>
              </div>
            </Fade>
            <Fade delay={0.24}>
              <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-6 pt-8 border-t border-white/10">
                {[["9", "Frameworks Covered"], ["Scope 1-3", "Carbon Accounting"], ["SEBI", "BRSR Compliant"], ["SBTi", "Targets Aligned"]].map(([n, l]) => (
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

      {/* FRAMEWORKS BAR */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-6 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-6 flex-wrap">
          <span className="text-[10px] font-semibold text-[#475569] tracking-[0.15em] uppercase">Frameworks Covered</span>
          {frameworks.map(f => (
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
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">A structured advisory journey from ESG baseline through strategy, disclosure, and ongoing implementation support.</p>
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
              <p className="text-[16px] text-white/50 max-w-lg mx-auto">A complete ESG documentation package designed for board reporting, regulatory submission, and investor disclosure.</p>
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
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/92 to-[#0A2540]/85" />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-[-0.01em] mb-4">Ready to build a credible ESG programme?</h2>
            <p className="text-[16px] text-white/60 mb-10">Schedule a free 30-minute consultation with one of our ESG specialists.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Book Free Consultation</Link>
              <Link href="/services" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">View All Services</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
