"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const phases = [
  { num: "01", title: "Scope Definition & Research Design", desc: "Collaborative scoping session to define research objectives, geographies, segments, key questions, and output format — aligned to the client's specific decision-making need.", items: ["Research brief alignment", "Sector & geography scoping", "Key question mapping", "Output format selection"] },
  { num: "02", title: "Primary Data Collection", desc: "Structured primary research through expert interviews, industry stakeholder surveys, and regulatory body engagement — providing ground-level market intelligence unavailable from secondary sources.", items: ["Expert interviews", "Industry surveys", "Regulatory engagement", "Primary data validation"] },
  { num: "03", title: "Secondary Research & Data Synthesis", desc: "Systematic review of regulatory filings, government datasets, industry publications, ESG disclosures, investment reports, and proprietary MindEarth databases.", items: ["Regulatory filings review", "Government dataset analysis", "Investment flow mapping", "ESG disclosure analysis"] },
  { num: "04", title: "Market Sizing & Forecasting", desc: "Bottom-up and top-down market sizing with 5–10 year demand and growth projections, segmented by technology, end-use, geography, and investment type.", items: ["Bottom-up sizing model", "Growth forecasting", "Segment breakdown", "Scenario analysis"] },
  { num: "05", title: "Competitive & Regulatory Analysis", desc: "Benchmarking of key market participants, analysis of the regulatory landscape across MNRE, SEBI, MoEFCC, and international frameworks, and market entry assessment.", items: ["Competitive benchmarking", "Regulatory landscape mapping", "Market entry assessment", "Policy risk analysis"] },
  { num: "06", title: "Report Preparation & Delivery", desc: "Preparation of the research output in the agreed format — full market study, sector note, or executive brief — with supporting data appendix and presentation deck.", items: ["Full report preparation", "Executive summary", "Data appendix", "Presentation deck"] },
];

const formats = [
  { title: "Full Market Study", desc: "Comprehensive 80–120 page research report covering all dimensions: market sizing, competitive landscape, regulatory analysis, technology trends, and 5-year outlook.", tag: "Most Comprehensive" },
  { title: "Sector Note", desc: "Focused 20–35 page deep-dive into a specific segment, technology, or regulatory development — structured for investment decision support.", tag: "Targeted" },
  { title: "Executive Brief", desc: "Concise 8–12 page summary of market findings for senior leadership — key data, strategic implications, and immediate action points.", tag: "Decision-Ready" },
];

const sectors = ["Renewable Energy", "Green Hydrogen", "Energy Storage", "Carbon Markets", "EV & Mobility", "Waste Management", "Water & Sanitation", "Green Buildings", "Sustainable Agriculture", "ESG Funds & Impact Investing", "Climate Finance", "Industrial Decarbonisation"];

const faqs = [
  ["What sectors do your market research reports cover?", "We cover 25+ sectors with a primary focus on clean energy, sustainable infrastructure, ESG-linked industries, and emerging climate economy segments — including solar, wind, green hydrogen, carbon markets, EV, water, waste, and sustainable agriculture."],
  ["Do you provide custom research or only off-the-shelf reports?", "Both. We have a library of pre-published sector reports available for immediate download, and we also undertake bespoke research engagements tailored to specific geographies, segments, and client questions."],
  ["How long does a custom research engagement take?", "Timelines depend on scope. A sector note typically takes 2–3 weeks; a full market study runs 4–8 weeks. We provide a confirmed timeline and milestone schedule at the start of each engagement."],
  ["What data sources do you use?", "We combine primary research (expert interviews, surveys, regulatory engagement) with secondary sources including MNRE, SEBI, MoEFCC, RBI, IEA, BloombergNEF, and our proprietary ESG and clean energy databases."],
];

export default function MarketResearchPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      <Navbar />

      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span>
          <Link href="/services" className="hover:text-[#0B6E4F]">Services</Link><span>/</span>
          <span className="text-gray-800 font-medium">Market Research Reports</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/96 via-[#0A2540]/90 to-[#0A2540]/72" />
        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <Fade>
              <div className="flex gap-2 mb-6">
                <span className="bg-sky-500/20 text-sky-300 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-sky-500/30">Market Intelligence</span>
                <span className="bg-white/10 text-white/80 text-[10px] font-semibold px-3.5 py-1.5 rounded-full tracking-wider uppercase border border-white/15">25+ Sectors</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[40px] sm:text-[48px] lg:text-[54px] font-bold text-white leading-[1.08] tracking-[-0.02em] mb-6">
                Market Research<br />Reports
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/70 leading-relaxed max-w-lg mb-10">
                Sector-specific market research covering clean energy, sustainable infrastructure, and ESG-linked industries — combining primary data, regulatory analysis, and competitive intelligence for investors, developers, and policy bodies.
              </p>
            </Fade>
            <Fade delay={0.18}>
              <div className="flex gap-4 flex-wrap mb-12">
                <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">
                  Request a Report
                </Link>
                <Link href="/reports" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">
                  Browse Report Library
                </Link>
              </div>
            </Fade>
            <Fade delay={0.24}>
              <div className="grid grid-cols-2 sm:flex sm:gap-12 gap-6 pt-8 border-t border-white/10">
                {[["300+", "Reports Published"], ["25+", "Sectors Covered"], ["40+", "Countries"], ["Primary", "Data Driven"]].map(([n, l]) => (
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

      {/* SECTORS BAR */}
      <section className="bg-[#F8FAFC] border-b border-gray-100 py-6 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="text-[10px] font-semibold text-[#475569] tracking-[0.15em] uppercase shrink-0">Key Sectors</span>
            {sectors.map(s => (
              <span key={s} className="text-[12px] font-medium text-[#0F172A] bg-white border border-gray-200 px-3 py-1 rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* REPORT FORMATS */}
      <section className="bg-white py-16 px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Fade>
            <div className="text-center mb-10">
              <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Output Formats</span>
              <h2 className="font-heading text-[28px] font-bold text-[#0F172A] tracking-[-0.01em] mb-2">Choose Your Format</h2>
              <p className="text-[15px] text-[#475569] max-w-md mx-auto">Research outputs tailored to your use case — from comprehensive studies to decision-ready briefs.</p>
            </div>
          </Fade>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {formats.map((f, i) => (
              <Fade key={f.title} delay={i * 0.07}>
                <div className="bg-[#F8FAFC] rounded-xl border border-gray-200 p-6 hover:border-sky-200 hover:shadow-md transition-all duration-300">
                  <span className="inline-block text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md tracking-wider uppercase mb-3">{f.tag}</span>
                  <h3 className="font-heading text-[16px] font-bold text-[#0F172A] mb-2">{f.title}</h3>
                  <p className="text-[13px] text-[#475569] leading-relaxed">{f.desc}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <Fade>
            <div className="text-center mb-16">
              <span className="inline-block bg-sky-50 text-sky-700 text-[10px] font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">Research Methodology</span>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-[#0F172A] tracking-[-0.01em] mb-3">Our Research Process</h2>
              <p className="text-[16px] text-[#475569] max-w-lg mx-auto">A rigorous 6-phase process combining primary intelligence with verified secondary data to deliver research you can act on.</p>
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

      {/* FAQ */}
      <section className="bg-[#F8FAFC] py-24 px-6">
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
                <div className="bg-white rounded-xl border border-gray-200 cursor-pointer hover:border-sky-200 transition-all duration-200" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/96 via-[#0A2540]/90 to-[#0A2540]/80" />
        <div className="relative max-w-xl mx-auto px-6 text-center">
          <Fade>
            <h2 className="font-heading text-[28px] sm:text-[36px] font-bold text-white tracking-[-0.01em] mb-4">Need intelligence you can act on?</h2>
            <p className="text-[16px] text-white/60 mb-10">Tell us your sector and research question — we&apos;ll confirm scope and availability within 24 hours.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Request a Report</Link>
              <Link href="/reports" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200">Browse Report Library</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
