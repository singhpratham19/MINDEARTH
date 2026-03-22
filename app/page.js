"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";
import CountUp from "@/components/CountUp";
import { heroImage, industries, reports, clientLogos } from "@/lib/data";

const press = [
  { date: "Mar 15, 2026", cat: "TRENDS", title: "MindEarth ESG Trends Q1 2026: Regulatory Acceleration Across Emerging Markets", excerpt: "34% increase in mandatory ESG disclosure requirements across South Asia and the Middle East.", img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { date: "Feb 28, 2026", cat: "DATA", title: "Carbon Markets Grow 22% YoY as Institutional Demand Accelerates", excerpt: "Voluntary carbon credit transactions reached $2.8B in 2025, driven by corporate net-zero commitments.", img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80" },
  { date: "Feb 10, 2026", cat: "OUTLOOK", title: "Sustainable Finance Outlook: Green Bond Issuance to Cross $1T by 2028", excerpt: "Asia-Pacific markets contributing 38% of new issuance volume as sovereign programs scale.", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80" },
];

const whyCards = [
  { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80", icon: "✓", title: "Proven ESG Methodology", desc: "Proprietary L1 scoping + L2 segmentation framework with data triangulated from official government and intergovernmental sources. Every number verified." },
  { img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=600&q=80", icon: "🌐", title: "Global Industry Coverage", desc: "25+ industry verticals across 40+ countries with deep on-the-ground expertise in South Asia, Middle East, SE Asia, and Sub-Saharan Africa." },
  { img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80", icon: "📊", title: "Custom Analytics Solutions", desc: "Bespoke market research, Excel data models, and proprietary ESG scoring tailored to your specific investment thesis or strategic question." },
  { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", icon: "👥", title: "Trusted by Leaders", desc: "850+ enterprise clients including Fortune 500 corporations, sovereign wealth funds, development banks, and government regulatory bodies." },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [tab, setTab] = useState("all");
  const tags = ["Green Finance", "BRSR", "Carbon Credits", "Renewable Energy", "EV Battery"];
  const filtered = tab === "all" ? reports : reports.filter(r => r.cat === tab);

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/90 to-[#0A2540]/75" />
        <div className="relative z-10 max-w-container mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <Fade>
              <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                <span className="text-xs font-medium text-white/90 tracking-wide">700+ datasets | 120+ industries | 400+ ESG studies | proprietary insights</span>
              </div>
            </Fade>
            <Fade delay={0.06}>
              <h1 className="font-heading text-[44px] sm:text-[52px] lg:text-[58px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-5">
                Global ESG <span className="text-[#34D399]">Intelligence</span>
              </h1>
            </Fade>
            <Fade delay={0.12}>
              <p className="text-[17px] text-white/85 leading-relaxed mb-2">300+ Sustainability Reports | Data-Driven Insights</p>
              <p className="text-[15px] text-white/60 max-w-lg mb-10 leading-relaxed">Institutional-grade ESG market research across 25+ industries and 40+ countries.</p>
            </Fade>
            <Fade delay={0.18}>
              <div className="relative max-w-xl mb-5">
                <div className={`flex bg-white rounded-xl overflow-hidden transition-all duration-300 ${focused ? "shadow-2xl ring-2 ring-[#0B6E4F]/20" : "shadow-lg"}`}>
                  <div className="flex items-center pl-5 pr-1 text-brand-muted">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeWidth="2"/></svg>
                  </div>
                  <input value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Search ESG reports by industry, topic, or region..." className="flex-1 py-4 px-3 text-[15px] text-brand-dark bg-transparent outline-none placeholder:text-brand-muted" />
                  <button className="bg-[#0B6E4F] text-white text-sm font-semibold px-6 m-2 rounded-lg hover:bg-[#095C42] transition-colors duration-200 whitespace-nowrap">Search Reports</button>
                </div>
              </div>
            </Fade>
            <Fade delay={0.22}>
              <div className="flex gap-2.5 flex-wrap mb-8">
                <span className="text-[11px] text-white/60 leading-6">Trending:</span>
                {tags.map(t => (
                  <span key={t} className="text-[11px] text-white/80 border border-white/30 rounded-full px-3.5 py-1.5 cursor-pointer hover:bg-[#0B6E4F] hover:text-white hover:border-[#0B6E4F] transition-all duration-200 font-medium">{t}</span>
                ))}
              </div>
            </Fade>
            <Fade delay={0.28}>
              <div className="flex gap-4">
                <Link href="/reports" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-sm">Browse Reports</Link>
                <Link href="/contact" className="bg-white/20 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/30 hover:bg-white/30 transition-all duration-200">Request Demo</Link>
              </div>
            </Fade>
          </div>
          <Fade delay={0.34}>
            <div className="flex gap-12 mt-16 pt-8 border-t border-white/10 max-w-2xl">
              {[["300+","ESG Reports"],["25+","Industries"],["40+","Countries"],["850+","Clients"]].map(([n,l])=>(
                <div key={l} className="text-left">
                  <div className="font-heading text-2xl font-bold text-white">{n}</div>
                  <div className="text-[11px] text-white/65 mt-1 font-medium">{l}</div>
                </div>
              ))}
            </div>
          </Fade>
        </div>
        {/* Right-side decorative image overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=80" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540] to-transparent" />
        </div>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-container mx-auto">
          <Fade>
            <div className="text-center mb-16">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0B6E4F] uppercase mb-3">Why MindEarth</p>
              <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-brand-dark tracking-[-0.01em]">Why Choose Us</h2>
            </div>
          </Fade>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyCards.map((c, i) => (
              <Fade key={c.title} delay={i * 0.08}>
                <div className="rounded-xl overflow-hidden bg-white border border-brand-border hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-44 overflow-hidden">
                    <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 to-transparent" />
                    <div className="absolute bottom-0 left-5 translate-y-1/2 w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center text-lg z-10">{c.icon}</div>
                  </div>
                  <div className="p-6 pt-9">
                    <h3 className="font-heading text-[15px] font-bold text-brand-dark mb-2.5">{c.title}</h3>
                    <p className="text-sm text-brand-body leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="bg-brand-light py-24 px-6">
        <div className="max-w-container mx-auto">
          <Fade>
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0B6E4F] uppercase mb-3">Browse by Industry</p>
                <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-brand-dark tracking-[-0.01em]">25+ Industry Verticals</h2>
              </div>
              <span className="text-sm text-[#0B6E4F] font-semibold cursor-pointer hidden sm:block hover:underline">View all →</span>
            </div>
          </Fade>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <Fade key={ind.name} delay={i * 0.03}>
                <div className="rounded-xl overflow-hidden border border-brand-border cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300 group bg-white">
                  <div className="relative h-24 overflow-hidden">
                    <img src={ind.img} alt={ind.name} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/75 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-white text-[13px] font-semibold">{ind.name}</span>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED REPORTS ═══ */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-container mx-auto">
          <Fade>
            <div className="flex justify-between items-end mb-3">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0B6E4F] uppercase mb-3">Latest Publications</p>
                <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-brand-dark tracking-[-0.01em]">Featured ESG Reports</h2>
              </div>
              <Link href="/reports" className="text-sm text-[#0B6E4F] font-semibold hover:underline">View All →</Link>
            </div>
          </Fade>
          <Fade delay={0.04}>
            <div className="flex gap-2 mb-8 mt-4 flex-wrap">
              {[["all","All"],["Energy","Energy"],["Financial","Financial"],["Sustainability","Sustainability"],["Technology","Technology"]].map(([k,l])=>(
                <button key={k} onClick={()=>setTab(k)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${tab===k?"bg-[#0B6E4F] text-white border-[#0B6E4F]":"bg-brand-light text-brand-body border-brand-border hover:border-brand-muted"}`}>{l}</button>
              ))}
            </div>
          </Fade>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => (
              <Fade key={r.code} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-brand-border overflow-hidden hover:border-[#0B6E4F]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-40 overflow-hidden">
                    <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent" />
                  </div>
                  <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[11px] font-medium text-brand-muted">{r.code}</span>
                    <div className="flex gap-2">
                      {r.badge && <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${r.badge==="Bestseller"?"bg-amber-50 text-amber-700":r.badge==="New"?"bg-blue-50 text-[#0A2540]":"bg-[#E6F4EF] text-[#0B6E4F]"}`}>{r.badge}</span>}
                      <span className="bg-[#E6F4EF] text-[#0B6E4F] text-[10px] font-semibold px-2.5 py-1 rounded-md">{r.cat}</span>
                    </div>
                  </div>
                  <Link href={`/reports/${r.slug}`}><h3 className="font-heading text-[16px] font-bold text-brand-dark leading-snug mb-3 group-hover:text-[#0B6E4F] transition-colors duration-200">{r.title}</h3></Link>
                  <p className="text-sm text-brand-body leading-relaxed mb-4">{r.desc}</p>
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-brand-border/60 mb-4">
                    {[["CAGR",r.cagr,true],["Size",r.size,false],["Period",r.period,false]].map(([l,v,g])=>(
                      <div key={l}>
                        <p className="text-[10px] font-semibold text-brand-muted tracking-wide uppercase mb-1">{l}</p>
                        <p className={`text-sm font-bold ${g?"text-[#0B6E4F]":"text-brand-dark"}`}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-brand-muted tracking-wide uppercase mb-2.5">Key Players</p>
                    <div className="flex items-center gap-4">
                      {r.domains.slice(0, 5).map((d, ci) => (
                        <img key={d} src={`https://www.google.com/s2/favicons?domain=${d}&sz=64`} alt={r.companies[ci]} title={r.companies[ci]} className="w-6 h-6 rounded object-contain opacity-60 hover:opacity-100 transition-opacity duration-200" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-1.5"><span className="text-[11px] text-brand-muted">From</span><span className="font-heading text-xl font-bold text-brand-dark">${r.price.toLocaleString()}</span></div>
                    <Link href={`/reports/${r.slug}`} className="bg-[#0B6E4F] text-white text-[11px] font-semibold px-4 py-2 rounded-lg hover:bg-[#095C42] transition-colors duration-200">View Report →</Link>
                  </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
          <Fade delay={0.3}>
            <div className="text-center mt-12">
              <Link href="/reports" className="border-2 border-[#0B6E4F] text-[#0B6E4F] font-semibold text-sm px-8 py-3.5 rounded-lg hover:bg-[#0B6E4F] hover:text-white transition-all duration-200 inline-block">Browse All 300+ Reports</Link>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══ PRESS RELEASES ═══ */}
      <section className="bg-brand-light py-24 px-6">
        <div className="max-w-container mx-auto">
          <Fade>
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-[#0B6E4F] uppercase mb-3">Press & Insights</p>
                <h2 className="font-heading text-[32px] sm:text-[38px] font-bold text-brand-dark tracking-[-0.01em]">Latest Research Releases</h2>
              </div>
              <Link href="/insights" className="text-sm text-[#0B6E4F] font-semibold hidden sm:block hover:underline">All Insights →</Link>
            </div>
          </Fade>
          <div className="grid md:grid-cols-3 gap-6">
            {press.map((p, i) => (
              <Fade key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl overflow-hidden border border-brand-border hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full flex flex-col group">
                  <div className="h-44 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-wider text-[#0B6E4F] uppercase">{p.cat}</span>
                      <span className="text-[11px] text-brand-muted">{p.date}</span>
                    </div>
                    <h3 className="font-heading text-[15px] font-bold text-brand-dark leading-snug mb-3 group-hover:text-[#0B6E4F] transition-colors duration-200">{p.title}</h3>
                    <p className="text-sm text-brand-body leading-relaxed flex-1">{p.excerpt}</p>
                    <span className="text-sm text-[#0B6E4F] font-semibold mt-4 cursor-pointer hover:underline">Read More →</span>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <div className="border-y border-brand-border bg-white py-10 px-6">
        <div className="max-w-container mx-auto text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-brand-muted uppercase mb-5">Global ESG Standards Compliant</p>
          <div className="flex justify-center gap-8 md:gap-10 flex-wrap">
            {["GRI","SASB","TCFD","ISO 14001","UN SDGs","ISSB","BRSR"].map(f=>(
              <div key={f} className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-[#0B6E4F]"/>
                <span className="font-heading text-sm font-semibold text-brand-dark">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ INDIA ESG CTA ═══ */}
      <section className="relative py-28 px-6 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A2540]/95 via-[#0A2540]/90 to-[#0A2540]/70" />
        <div className="relative z-10 max-w-container mx-auto flex items-center justify-center">
          <Fade>
            <div className="text-center max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                <span className="text-[10px] font-semibold text-white/80 tracking-wider uppercase">Free Sample Available</span>
              </div>
              <h2 className="font-heading text-[36px] sm:text-[44px] font-bold text-white mb-5 tracking-[-0.02em] leading-[1.1]">India ESG Overview 2026</h2>
              <p className="text-[16px] text-white/75 leading-relaxed mb-8 mx-auto max-w-lg">Get a complimentary sample of our flagship India ESG landscape report — covering SEBI BRSR regulatory trends, state-level policy mapping, and the $48B renewable energy opportunity.</p>
              <div className="flex gap-4 flex-wrap justify-center">
                <button className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shadow-lg shadow-[#0B6E4F]/25">Free Sample Download</button>
                <Link href="/contact" className="bg-white/10 backdrop-blur-sm text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/25 hover:bg-white/20 transition-all duration-200">Book Consultation</Link>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══ ANIMATED STATS ═══ */}
      <section className="bg-[#0A2540] py-16 px-6">
        <div className="max-w-container mx-auto flex flex-wrap justify-around gap-10 text-center">
          {[[300,"+","ESG Reports"],[850,"+","Enterprise Clients"],[40,"+","Countries"],[98,"%","Client Retention"]].map(([n,s,l])=>(
            <Fade key={l}>
              <div>
                <div className="font-heading text-[36px] font-bold text-white"><CountUp end={n} suffix={s}/></div>
                <div className="text-[13px] text-white/50 font-medium mt-1.5">{l}</div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* ═══ CLIENT LOGOS ═══ */}
      <div className="bg-white border-y border-brand-border py-8 px-6">
        <div className="max-w-container mx-auto flex items-center justify-center gap-10 md:gap-14 flex-wrap opacity-25">
          {clientLogos.map(c => <span key={c} className="text-sm font-semibold text-brand-dark tracking-wide whitespace-nowrap">{c}</span>)}
        </div>
      </div>

      <Footer />
    </>
  );
}
