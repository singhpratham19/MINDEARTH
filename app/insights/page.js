"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const articles = [
  { tag: "REPORT", title: "Global ESG Market Report 2026", desc: "Comprehensive analysis of the $92T ESG market — trends, regulatory shifts, and investment flows across 40+ countries.", date: "Mar 2026", read: "45 min", featured: true, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { tag: "ANALYSIS", title: "BRSR Compliance Framework for Indian Mid-Caps", desc: "Step-by-step guide for companies navigating SEBI's BRSR mandate with practical implementation templates.", date: "Feb 2026", read: "20 min", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80" },
  { tag: "INSIGHT", title: "Climate Risk as Financial Risk in Emerging Markets", desc: "What TCFD transition means for capital allocation, sovereign risk, and corporate strategy across South Asia and Africa.", date: "Jan 2026", read: "15 min", img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80" },
  { tag: "REPORT", title: "Green Finance in the Middle East: 2025–2030", desc: "Mapping rapid growth of green bonds, sustainability-linked loans, and ESG-focused sovereign wealth fund strategies in GCC.", date: "Dec 2025", read: "35 min", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80" },
  { tag: "ANALYSIS", title: "EU CSRD: Implications for Non-European Multinationals", desc: "How the Corporate Sustainability Reporting Directive affects global supply chains and subsidiary reporting obligations.", date: "Nov 2025", read: "18 min", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
  { tag: "INSIGHT", title: "The Biodiversity–Finance Nexus: Why TNFD Matters", desc: "Connecting nature-related financial disclosures to investment decision-making and portfolio risk management.", date: "Oct 2025", read: "12 min", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80" },
  { tag: "REPORT", title: "Carbon Credit Trading Market Intelligence", desc: "Voluntary carbon credits reached $2.8B in 2025. Deep-dive into pricing dynamics, Article 6, and corporate demand.", date: "Sep 2025", read: "40 min", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80" },
  { tag: "ANALYSIS", title: "Sustainable Supply Chain Benchmarking: APAC 2025", desc: "Benchmarking ESG performance across 500+ supply chain nodes in India, China, Vietnam, and Indonesia.", date: "Aug 2025", read: "22 min", img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=80" },
];

export default function InsightsPage() {
  const [filter, setFilter] = useState("ALL");
  const tabs = ["ALL", "REPORT", "ANALYSIS", "INSIGHT"];
  const feat = articles.find(a => a.featured);
  const rest = (filter === "ALL" ? articles : articles.filter(a => a.tag === filter)).filter(a => !a.featured);

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-12 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <Fade><p className="text-emerald-100 text-xs font-bold tracking-[0.2em] uppercase mb-2">Insights & Research</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-3">Research-Backed ESG Perspectives</h1>
          <p className="text-emerald-100/80 text-sm max-w-lg mx-auto">Reports, analysis, and thought leadership shaping the global ESG conversation.</p></Fade>
        </div>
      </section>
      <div className="bg-white border-b border-gray-100 py-3 px-5"><div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span><span className="text-gray-700 font-medium">Insights</span></div></div>

      {/* Featured */}
      {feat && (
        <section className="bg-white py-10 px-5">
          <div className="max-w-7xl mx-auto">
            <Fade>
              <div className="grid md:grid-cols-2 gap-6 bg-gradient-to-r from-emerald-50 to-sky-50 rounded-2xl overflow-hidden border border-emerald-100">
                <div className="h-56 md:h-auto overflow-hidden"><img src={feat.img} alt={feat.title} className="w-full h-full object-cover" /></div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="inline-block bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full mb-3 tracking-wider uppercase w-fit">Featured {feat.tag}</span>
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-gray-800 mb-3">{feat.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{feat.desc}</p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <button className="bg-emerald-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition">Read Full Report</button>
                    <div className="flex gap-3 text-xs text-gray-400"><span>{feat.date}</span><span>·</span><span>{feat.read} read</span></div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="bg-brand-light py-12 px-5">
        <div className="max-w-7xl mx-auto">
          <Fade><div className="flex gap-1.5 mb-8 flex-wrap">{tabs.map(t => <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-lg text-xs font-semibold border transition ${filter === t ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300"}`}>{t === "ALL" ? "All Insights" : t.charAt(0) + t.slice(1).toLowerCase() + "s"}</button>)}</div></Fade>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((a, i) => (
              <Fade key={a.title} delay={i * 0.04}>
                <article className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-emerald-200 hover:-translate-y-1 hover:shadow-lg transition-all h-full flex flex-col cursor-pointer group">
                  <div className="h-40 overflow-hidden"><img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${a.tag === "REPORT" ? "text-emerald-600" : a.tag === "ANALYSIS" ? "text-sky-600" : "text-amber-600"}`}>{a.tag}</span>
                      <span className="text-[11px] text-gray-400">{a.read}</span>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-brand-dark leading-snug mb-2 group-hover:text-emerald-600 transition-colors">{a.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 flex-1">{a.desc}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
                      <span className="text-[11px] text-gray-400">{a.date}</span>
                      <span className="text-xs text-emerald-600 font-semibold">Read →</span>
                    </div>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-14 px-5">
        <div className="max-w-xl mx-auto text-center">
          <Fade><h2 className="font-heading text-xl font-bold text-brand-dark mb-2">Stay ahead of ESG developments</h2>
          <p className="text-sm text-gray-500 mb-5">Monthly ESG intelligence digest — research, regulatory updates, and market signals.</p>
          <div className="flex gap-2 max-w-sm mx-auto"><input placeholder="Enter your email" className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 placeholder:text-gray-400" /><button className="bg-emerald-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition shrink-0">Subscribe</button></div></Fade>
        </div>
      </section>
      <Footer />
    </>
  );
}
