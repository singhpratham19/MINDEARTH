"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";
import { reports } from "@/lib/data";

export default function ReportsPage() {
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("relevance");
  const cats = ["all", "Energy", "Financial", "Sustainability", "Technology"];
  const filtered = cat === "all" ? reports : reports.filter(r => r.cat === cat);

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-500 py-12 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <Fade><p className="text-emerald-100 text-xs font-bold tracking-[0.2em] uppercase mb-2">Report Library</p>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mb-3">ESG Market Research Reports</h1>
          <p className="text-emerald-100/80 text-sm max-w-lg mx-auto">300+ institutional-grade reports across 25+ industries and 40+ countries.</p></Fade>
          <Fade delay={0.1}><div className="flex justify-center gap-8 mt-8">{[["300+","Reports"],["25+","Industries"],["6-Year","Forecasts"],["Excel","Data"]].map(([n,l])=><div key={l} className="text-center"><div className="font-heading text-lg font-bold text-white">{n}</div><div className="text-[10px] text-emerald-200">{l}</div></div>)}</div></Fade>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100 py-3 px-5">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span><span className="text-gray-700 font-medium">Reports</span>
        </div>
      </div>

      <section className="bg-brand-light py-10 px-5 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-8 items-center justify-between">
            <div className="flex gap-1.5 flex-wrap">
              {cats.map(c => <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${cat === c ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-gray-500 border-gray-200"}`}>{c === "all" ? "All Reports" : c}</button>)}
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2 outline-none">
              <option value="relevance">Sort: Relevance</option><option value="newest">Newest</option><option value="price-low">Price: Low→High</option><option value="price-high">Price: High→Low</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((r, i) => (
              <Fade key={r.code} delay={i * 0.04}>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all group">
                  <div className="h-1 bg-gradient-to-r from-emerald-500 to-sky-400" />
                  <div className="p-6 flex gap-5">
                    <img src={r.img} alt={r.title} className="w-28 h-28 rounded-lg object-cover shrink-0 hidden sm:block" />
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1.5 mb-2">
                        <span className="text-[10px] font-semibold text-gray-400">{r.code}</span>
                        {r.badge && <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${r.badge==="Bestseller"?"bg-amber-50 text-amber-700":r.badge==="New"?"bg-sky-50 text-sky-700":"bg-emerald-50 text-emerald-700"}`}>{r.badge}</span>}
                        <span className="bg-emerald-50 text-emerald-700 text-[9px] font-semibold px-2 py-0.5 rounded">{r.cat}</span>
                      </div>
                      <Link href={`/reports/${r.slug}`}><h3 className="font-heading text-base font-bold text-brand-dark group-hover:text-emerald-600 transition-colors mb-2">{r.title}</h3></Link>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                      <div className="flex gap-4 text-xs mb-3">
                        <span>Size: <strong className="text-gray-800">{r.size}</strong></span>
                        <span>CAGR: <strong className="text-emerald-600">{r.cagr}</strong></span>
                        <span>Period: <strong className="text-gray-800">{r.period}</strong></span>
                        <span>Pages: <strong className="text-gray-800">{r.pages}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[9px] text-gray-400">Key players:</span>
                        {r.domains.slice(0,5).map(d => <img key={d} src={`https://logo.clearbit.com/${d}`} alt="" className="w-5 h-5 rounded-full border border-white bg-gray-50 object-contain" onError={e=>e.target.style.display="none"} />)}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-baseline gap-1.5"><span className="text-xs text-gray-400">From</span><span className="font-heading text-xl font-bold text-brand-dark">${r.price.toLocaleString()}</span></div>
                        <div className="flex gap-2">
                          <button className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-3 py-1.5 rounded-md hover:bg-emerald-100 transition">Sample</button>
                          <Link href={`/reports/${r.slug}`} className="bg-emerald-500 text-white text-[11px] font-semibold px-4 py-1.5 rounded-md hover:bg-emerald-600 transition">View Report →</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 px-5 border-t border-gray-100 text-center">
        <Fade><h2 className="font-heading text-xl font-bold text-brand-dark mb-3">Need something specific?</h2><p className="text-sm text-gray-500 mb-5">Our analysts build custom research tailored to your market, geography, or investment thesis.</p>
        <Link href="/contact" className="bg-emerald-500 text-white font-semibold text-sm px-7 py-3 rounded-lg hover:bg-emerald-600 transition inline-block">Request Custom Research</Link></Fade>
      </section>
      <Footer />
    </>
  );
}
