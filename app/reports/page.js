"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";
import { reports as fallbackReports } from "@/lib/data";

const industries = [
  "Energy & Power",
  "Financial Services",
  "ESG & Sustainability",
  "Technology",
  "Healthcare",
  "Automotive",
  "Agriculture",
  "Consumer Goods",
  "Manufacturing",
  "Aerospace & Defense",
  "Chemicals & Materials",
  "Mining & Metals",
];

const regions = ["North America", "Europe", "Asia-Pacific", "Middle East & Africa", "Latin America", "Global"];
const countries = [
  "United States", "Canada", "Mexico", "Brazil", "Argentina", "Colombia", "Chile",
  "United Kingdom", "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden", "Norway", "Denmark", "Finland", "Switzerland", "Belgium", "Austria", "Poland", "Portugal", "Ireland", "Czech Republic", "Romania", "Greece", "Turkey",
  "China", "India", "Japan", "South Korea", "Australia", "Indonesia", "Thailand", "Vietnam", "Malaysia", "Philippines", "Singapore", "Taiwan", "New Zealand", "Bangladesh",
  "UAE", "Saudi Arabia", "Israel", "Qatar", "Kuwait", "Oman", "Bahrain", "South Africa", "Nigeria", "Kenya", "Egypt", "Morocco", "Ethiopia", "Ghana", "Tanzania",
  "Russia",
];

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ReportsPageInner />
    </Suspense>
  );
}

function ReportsPageInner() {
  const searchParams = useSearchParams();
  const [reports, setReports] = useState(fallbackReports);
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [regionOpen, setRegionOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const catMap = { "Energy & Power": "Energy", "Financial Services": "Financial", "ESG & Sustainability": "Sustainability", "Technology": "Technology" };

  useEffect(() => {
    fetch("/api/reports").then(r => r.ok ? r.json() : null).then(data => {
      if (data && data.length) setReports(data);
    }).catch(() => {});
  }, []);

  const filtered = reports.filter(r => {
    const matchCat = cat === "all" || r.cat === catMap[cat];
    const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase());
    const matchRegion = !selectedRegion || (r.regions && r.regions.some(reg => reg.toLowerCase().includes(selectedRegion.toLowerCase())));
    const matchCountry = !selectedCountry || r.title.toLowerCase().includes(selectedCountry.toLowerCase()) || r.desc.toLowerCase().includes(selectedCountry.toLowerCase()) || (r.regions && r.regions.some(reg => reg.toLowerCase().includes(selectedCountry.toLowerCase())));
    return matchCat && matchQuery && matchRegion && matchCountry;
  });

  return (
    <>
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#0B6E4F]">Home</Link><span>/</span><span className="text-gray-700 font-medium">Reports</span>
        </div>
      </div>

      <section className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto flex">

          {/* LEFT SIDEBAR */}
          <aside className="w-72 shrink-0 border-r border-gray-100 py-10 pr-8 hidden lg:block">
            <h2 className="font-heading text-2xl font-extrabold text-brand-dark mb-8">All Reports</h2>

            <h3 className="font-heading text-sm font-bold text-brand-dark mb-4">Industries</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCat("all")}
                  className={`w-full text-left flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm transition-all duration-200 ${cat === "all" ? "bg-[#E6F4EF] text-[#0B6E4F] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-brand-dark"}`}
                >
                  <span className="text-xs">+</span> All Industries
                </button>
              </li>
              {industries.map(ind => (
                <li key={ind}>
                  <button
                    onClick={() => setCat(ind)}
                    className={`w-full text-left flex items-center gap-2.5 py-2.5 px-3 rounded-lg text-sm transition-all duration-200 ${cat === ind ? "bg-[#E6F4EF] text-[#0B6E4F] font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-brand-dark"}`}
                  >
                    <span className="text-xs">+</span> {ind}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="flex-1 py-10 px-6 lg:pl-10">
            {/* Search & Filters */}
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              <div className="flex-1 min-w-[250px]">
                <div className="flex bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-[#0B6E4F] focus-within:ring-2 focus-within:ring-[#0B6E4F]/10 transition-all">
                  <div className="flex items-center pl-4 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35" strokeWidth="2"/></svg>
                  </div>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search reports..."
                    className="flex-1 py-3 px-3 text-sm text-brand-dark bg-transparent outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
              {/* Regions Dropdown */}
              <div className="relative">
                <button onClick={() => { setRegionOpen(!regionOpen); setCountryOpen(false); }} className={`flex items-center gap-2 bg-white border rounded-lg px-4 py-3 text-sm font-medium transition-colors ${selectedRegion ? "border-[#0B6E4F] text-[#0B6E4F]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {selectedRegion || "Regions"} <svg className={`w-3 h-3 transition-transform ${regionOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" strokeWidth="2"/></svg>
                </button>
                {regionOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
                    <button onClick={() => { setSelectedRegion(""); setRegionOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${!selectedRegion ? "text-[#0B6E4F] font-semibold bg-[#E6F4EF]/50" : "text-gray-600"}`}>All Regions</button>
                    {regions.map(r => (
                      <button key={r} onClick={() => { setSelectedRegion(r); setRegionOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${selectedRegion === r ? "text-[#0B6E4F] font-semibold bg-[#E6F4EF]/50" : "text-gray-600"}`}>{r}</button>
                    ))}
                  </div>
                )}
              </div>
              {/* Countries Dropdown */}
              <div className="relative">
                <button onClick={() => { setCountryOpen(!countryOpen); setRegionOpen(false); }} className={`flex items-center gap-2 bg-white border rounded-lg px-4 py-3 text-sm font-medium transition-colors ${selectedCountry ? "border-[#0B6E4F] text-[#0B6E4F]" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                  {selectedCountry || "Countries"} <svg className={`w-3 h-3 transition-transform ${countryOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" strokeWidth="2"/></svg>
                </button>
                {countryOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 max-h-64 overflow-y-auto">
                    <button onClick={() => { setSelectedCountry(""); setCountryOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${!selectedCountry ? "text-[#0B6E4F] font-semibold bg-[#E6F4EF]/50" : "text-gray-600"}`}>All Countries</button>
                    {countries.map(c => (
                      <button key={c} onClick={() => { setSelectedCountry(c); setCountryOpen(false); }} className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition ${selectedCountry === c ? "text-[#0B6E4F] font-semibold bg-[#E6F4EF]/50" : "text-gray-600"}`}>{c}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-400 mb-6">Showing {filtered.length} of {reports.length} results</p>

            {/* Report Cards */}
            <div className="space-y-5">
              {filtered.map((r, i) => (
                <Fade key={r.code} delay={i * 0.03}>
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#0B6E4F]/30 hover:shadow-md transition-all duration-300 group">
                    <div className="p-6 flex gap-6">
                      {/* Report details */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/reports/${r.slug}`}>
                          <h3 className="font-heading text-lg font-bold text-brand-dark group-hover:text-[#0B6E4F] transition-colors duration-200 mb-3">{r.title}</h3>
                        </Link>

                        <div className="flex flex-wrap gap-3 mb-3">
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0B6E4F] bg-[#E6F4EF] px-2.5 py-1 rounded-md">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" strokeWidth="2"/></svg>
                            CAGR: {r.cagr}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            Study Period: {r.period}
                          </span>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed mb-3 flex items-start gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          <span>Regions Covered: {r.regions ? r.regions.join(", ") : "Global"}</span>
                        </p>

                        <p className="text-sm text-gray-500 leading-relaxed flex items-start gap-1.5">
                          <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                          <span>Major Players: {r.companies.join(", ")}</span>
                        </p>
                      </div>

                      {/* Download button */}
                      <div className="shrink-0 hidden sm:flex flex-col items-end justify-between">
                        <div className="flex gap-1.5 mb-3">
                          {r.badge && <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${r.badge==="Bestseller"?"bg-amber-50 text-amber-700":r.badge==="New"?"bg-blue-50 text-[#0A2540]":"bg-[#E6F4EF] text-[#0B6E4F]"}`}>{r.badge}</span>}
                        </div>
                        <Link
                          href={`/reports/${r.slug}`}
                          className="bg-[#0B6E4F] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#095C42] transition-colors duration-200 whitespace-nowrap"
                        >
                          Download PDF
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Research CTA */}
      <section className="bg-brand-light py-14 px-6 border-t border-gray-100 text-center">
        <Fade>
          <h2 className="font-heading text-xl font-bold text-brand-dark mb-3">Need something specific?</h2>
          <p className="text-sm text-gray-500 mb-6">Our analysts build custom research tailored to your market, geography, or investment thesis.</p>
          <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 inline-block">Request Custom Research</Link>
        </Fade>
      </section>
      <Footer />
    </>
  );
}
