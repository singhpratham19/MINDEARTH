"use client";
import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";
import { reports as fallbackReports, getReportBySlug } from "@/lib/data";

export default function ReportDetail() {
  const { slug } = useParams();
  const [report, setReport] = useState(() => getReportBySlug(slug));
  const [allReports, setAllReports] = useState(fallbackReports);
  const [activeTab, setActiveTab] = useState("overview");

  // Try to load from DB, fall back to hardcoded
  useEffect(() => {
    fetch(`/api/reports/${slug}`).then(r => r.ok ? r.json() : null).then(data => {
      if (data && data.title) setReport(data);
    }).catch(() => {});
    fetch("/api/reports").then(r => r.ok ? r.json() : null).then(data => {
      if (data && data.length) setAllReports(data);
    }).catch(() => {});
  }, [slug]);
  const [license, setLicense] = useState(0);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", company: "", jobTitle: "", phone: "", message: "" });
  const [formStatus, setFormStatus] = useState({ loading: false, msg: "", success: false, downloadUrl: null });

  const submitSampleRequest = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, msg: "", success: false, downloadUrl: null });
    try {
      const res = await fetch("/api/request-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, reportSlug: report.slug, reportTitle: report.title }),
      });
      const json = await res.json();
      setFormStatus({ loading: false, msg: json.message || json.error, success: !!json.success, downloadUrl: json.downloadUrl || null });
    } catch { setFormStatus({ loading: false, msg: "Something went wrong", success: false, downloadUrl: null }); }
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, msg: "", success: false });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, reportSlug: report.slug, reportTitle: report.title, inquiryType: "Report Inquiry" }),
      });
      const json = await res.json();
      setFormStatus({ loading: false, msg: json.message || json.error, success: !!json.success });
    } catch { setFormStatus({ loading: false, msg: "Something went wrong", success: false }); }
  };

  if (!report) return <div className="p-20 text-center text-gray-400">Report not found</div>;

  const baseVal = parseFloat(report.size.replace(/[$BTM,]/g, "")) || 50;
  const cagrNum = parseFloat(report.cagr) / 100 || 0.1;
  const chartData = Array.from({ length: 7 }, (_, i) => ({ year: String(2025 + i) + (i >= 5 ? "F" : ""), value: Math.round(baseVal * Math.pow(1 + cagrNum, i) * 10) / 10 }));
  const licenses = [["Single User", report.price, "1 user"], ["Multi User", report.price + 1000, "Up to 5 users"], ["Enterprise", report.price + 2500, "Unlimited + Excel"]];
  const related = allReports.filter(r => r.slug !== report.slug).slice(0, 2);
  const baseTabs = [{ k: "overview", l: "Overview" }, { k: "toc", l: "Table of Contents" }, { k: "segments", l: "Segmentation" }, { k: "companies", l: "Key Companies" }];
  const tabs = report.esgContent ? [baseTabs[0], { k: "esg", l: "ESG & GRI Analysis" }, ...baseTabs.slice(1)] : baseTabs;

  return (
    <>
      <Navbar />
      <div className="bg-white border-b border-gray-100 py-3 px-5"><div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-400"><Link href="/" className="hover:text-emerald-600">Home</Link><span>/</span><Link href="/reports" className="hover:text-emerald-600">Reports</Link><span>/</span><span className="text-gray-700 font-medium truncate max-w-[250px]">{report.title}</span></div></div>

      {/* Header */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Fade>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold text-gray-400">{report.code}</span>
                {report.badge && <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">{report.badge}</span>}
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded">{report.cat}</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{report.title}</h1>
              <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-2xl">{report.overview}</p>
            </Fade>
            <Fade delay={0.06}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[["Market Size", report.size], ["CAGR", report.cagr], ["Base Year", report.baseYear], ["Forecast", report.period]].map(([l, v]) => (
                  <div key={l} className="bg-gray-50 rounded-lg p-3 border border-gray-100"><p className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mb-1">{l}</p><p className={`text-base font-bold ${l === "CAGR" ? "text-emerald-600" : "text-gray-800"}`}>{v}</p></div>
                ))}
              </div>
            </Fade>
            <Fade delay={0.1}><div className="rounded-xl overflow-hidden border border-gray-100"><img src={report.img} alt={report.title} className="w-full h-48 sm:h-56 object-cover" /></div></Fade>
          </div>
          {/* Pricing */}
          <Fade delay={0.1}>
            <div className="bg-white rounded-xl border-2 border-emerald-200 p-5 sticky top-20">
              <p className="text-[10px] font-bold tracking-[0.2em] text-emerald-600 uppercase mb-4">Pricing & Delivery</p>
              {licenses.map(([tier, price, desc], i) => (
                <div key={tier} onClick={() => setLicense(i)} className={`p-3 rounded-lg mb-2 border cursor-pointer transition-all ${license === i ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-200"}`}>
                  <div className="flex justify-between items-center"><div><p className="text-xs font-semibold text-gray-800">{tier}</p><p className="text-[10px] text-gray-400">{desc}</p></div><p className="font-heading text-lg font-bold text-gray-900">${price.toLocaleString()}</p></div>
                </div>
              ))}
              <Link href={`/checkout/${report.slug}`} className="block w-full bg-emerald-500 text-white font-semibold text-sm py-3 rounded-lg mt-3 hover:bg-emerald-600 transition text-center">Buy Now</Link>
              <button onClick={() => { setShowSampleModal(true); setFormStatus({ loading: false, msg: "", success: false }); }} className="w-full border border-emerald-500 text-emerald-600 font-semibold text-sm py-3 rounded-lg mt-2 hover:bg-emerald-50 transition">Download Free Sample</button>
              <div className="border-t border-gray-100 mt-4 pt-3">
                <p className="text-[10px] text-gray-400 mb-2">Includes:</p>
                {[`${report.pages} page PDF`, "Excel data model", "6-year forecasts", "Company profiles", "30-day analyst support"].map(f => <div key={f} className="flex items-center gap-2 mb-1.5"><svg className="w-3 h-3 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg><span className="text-[11px] text-gray-600">{f}</span></div>)}
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-7xl mx-auto px-5 flex gap-0 overflow-x-auto">
          {tabs.map(t => <button key={t.k} onClick={() => setActiveTab(t.k)} className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition ${activeTab === t.k ? "text-emerald-600 border-emerald-500" : "text-gray-400 border-transparent hover:text-gray-600"}`}>{t.l}</button>)}
        </div>
      </div>

      <section className="bg-brand-light py-10 px-5 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {activeTab === "overview" && (
            <>
              {/* Market Overview + Chart */}
              <div className="grid lg:grid-cols-2 gap-8 mb-10">
                <Fade>
                  <h2 className="font-heading text-xl font-bold text-gray-800 mb-2">Market Overview</h2>
                  <p className="text-[10px] font-semibold text-gray-400 tracking-wider uppercase mb-4">Onshore Drilling Market Analysis</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{report.overview}</p>
                  {report.analysisContent && <p className="text-sm text-gray-500 leading-relaxed mb-5">{report.analysisContent.overview2}</p>}
                </Fade>
                <Fade delay={0.1}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 mb-5">
                    <div className="flex justify-between items-center mb-4"><div><p className="text-sm font-semibold text-gray-800">Forecast</p><p className="text-[11px] text-gray-400">{report.size} → CAGR {report.cagr}</p></div><span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded">{report.cagr}</span></div>
                    <ResponsiveContainer width="100%" height={200}><AreaChart data={chartData}><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" stopOpacity={0.15}/><stop offset="100%" stopColor="#10B981" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false}/><XAxis dataKey="year" tick={{fontSize:10,fill:"#999"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#999"}} axisLine={false} tickLine={false}/><Tooltip contentStyle={{borderRadius:8,border:"1px solid #eee",fontSize:12}}/><Area type="monotone" dataKey="value" stroke="#10B981" fill="url(#rg)" strokeWidth={2} dot={{r:3,fill:"#10B981",stroke:"#fff",strokeWidth:2}}/></AreaChart></ResponsiveContainer>
                  </div>
                  {/* Quick Stats */}
                  {report.marketConcentration && (
                    <div className="grid grid-cols-3 gap-3">
                      {[["Fastest Growing", report.fastestGrowingRegion], ["Largest Market", report.largestRegion], ["Concentration", report.marketConcentration]].map(([l,v]) => (
                        <div key={l} className="bg-white rounded-lg p-3 border border-gray-100 text-center">
                          <p className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mb-1">{l}</p>
                          <p className="text-xs font-bold text-gray-800">{v}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Fade>
              </div>

              {/* Key Report Takeaways */}
              {report.keyTakeaways && (
                <Fade delay={0.15}>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
                    <h3 className="text-xs font-bold tracking-wider text-emerald-600 uppercase mb-4">Key Report Takeaways</h3>
                    {report.keyTakeaways.map((t, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg></div>
                        <span className="text-[13px] text-gray-600 leading-relaxed">{t}</span>
                      </div>
                    ))}
                    <p className="text-[10px] text-gray-400 italic mt-4">Note: Market size and forecast figures in this report are generated using a proprietary estimation framework, updated with the latest available data and insights as of Q1 2026.</p>
                  </div>
                </Fade>
              )}

              {/* Drivers Impact Table */}
              {report.drivers && (
                <Fade delay={0.2}>
                  <div className="mb-10">
                    <h3 className="font-heading text-lg font-bold text-gray-800 mb-2">Market Trends & Insights</h3>
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">Drivers Impact Analysis</p>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="grid grid-cols-12 gap-0 bg-gray-50 border-b border-gray-200 px-4 py-2.5">
                        <span className="col-span-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Driver</span>
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Impact</span>
                        <span className="col-span-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Geography</span>
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Timeline</span>
                      </div>
                      {report.drivers.map((d, i) => (
                        <div key={i} className="grid grid-cols-12 gap-0 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <span className="col-span-5 text-[12px] text-gray-700 pr-3">{d.title}</span>
                          <span className="col-span-2 text-[12px] font-semibold text-emerald-600">{d.impact}</span>
                          <span className="col-span-3 text-[11px] text-gray-500 pr-2">{d.geo}</span>
                          <span className="col-span-2 text-[11px] text-gray-400">{d.timeline}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-gray-400 mt-2">Source: Market Intelligence Research</p>
                  </div>
                </Fade>
              )}

              {/* Restraints Impact Table */}
              {report.restraints && (
                <Fade delay={0.25}>
                  <div className="mb-10">
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-4">Restraints Impact Analysis</p>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="grid grid-cols-12 gap-0 bg-gray-50 border-b border-gray-200 px-4 py-2.5">
                        <span className="col-span-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Restraint</span>
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Impact</span>
                        <span className="col-span-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Geography</span>
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Timeline</span>
                      </div>
                      {report.restraints.map((r, i) => (
                        <div key={i} className="grid grid-cols-12 gap-0 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <span className="col-span-5 text-[12px] text-gray-700 pr-3">{r.title}</span>
                          <span className="col-span-2 text-[12px] font-semibold text-red-500">{r.impact}</span>
                          <span className="col-span-3 text-[11px] text-gray-500 pr-2">{r.geo}</span>
                          <span className="col-span-2 text-[11px] text-gray-400">{r.timeline}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[9px] text-gray-400 mt-2">Source: Market Intelligence Research</p>
                  </div>
                </Fade>
              )}

              {/* Driver Deep-Dives */}
              {report.analysisContent && (
                <Fade delay={0.3}>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                      <h4 className="text-sm font-bold text-gray-800 mb-2">Unconventional Resource Development</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed">{report.analysisContent.unconventionalDriver}</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                      <h4 className="text-sm font-bold text-gray-800 mb-2">Automation and AI-Driven Efficiency</h4>
                      <p className="text-[12px] text-gray-500 leading-relaxed">{report.analysisContent.automationDriver}</p>
                    </div>
                  </div>
                </Fade>
              )}

              {/* Segment Analysis */}
              {report.segmentTables && (
                <Fade delay={0.35}>
                  <div className="mb-10">
                    <h3 className="font-heading text-lg font-bold text-gray-800 mb-5">Segment Analysis</h3>
                    <div className="grid md:grid-cols-3 gap-5">
                      {[
                        { title: "By Rig Type", subtitle: "Land Rigs Retain Volume Leadership", data: report.segmentTables.rigType, detail: report.analysisContent?.rigTypeAnalysis },
                        { title: "By Technology", subtitle: "Smart Drilling Gains Momentum", data: report.segmentTables.technology },
                        { title: "By Application", subtitle: "Natural Gas Racing Ahead", data: report.segmentTables.application, detail: report.analysisContent?.applicationAnalysis }
                      ].map((seg) => (
                        <div key={seg.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                            <p className="text-xs font-bold text-gray-800">{seg.title}</p>
                            <p className="text-[10px] text-gray-400">{seg.subtitle}</p>
                          </div>
                          {seg.data.map((row, ri) => (
                            <div key={ri} className="px-4 py-2.5 border-b border-gray-100 last:border-0 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[12px] text-gray-700">{row.name}</span>
                                {row.tag && <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${row.tag === "Fastest" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{row.tag === "Fastest" ? "↑ Fastest" : "★ Largest"}</span>}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] text-gray-500">{row.share}</span>
                                <span className="text-[11px] font-semibold text-emerald-600">{row.cagr}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    {report.analysisContent?.rigTypeAnalysis && (
                      <div className="grid md:grid-cols-2 gap-5 mt-5">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <h4 className="text-sm font-bold text-gray-800 mb-2">By Rig Type: Land Rigs Retain Volume Leadership</h4>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{report.analysisContent.rigTypeAnalysis}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <h4 className="text-sm font-bold text-gray-800 mb-2">By Application: Natural Gas Racing Ahead</h4>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{report.analysisContent.applicationAnalysis}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Fade>
              )}

              {/* Geography Analysis */}
              {report.regionTable && (
                <Fade delay={0.4}>
                  <div className="mb-10">
                    <h3 className="font-heading text-lg font-bold text-gray-800 mb-5">Geography Analysis</h3>
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="grid grid-cols-12 gap-0 bg-gray-50 border-b border-gray-200 px-4 py-2.5">
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Region</span>
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">2025 Share</span>
                        <span className="col-span-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">CAGR</span>
                        <span className="col-span-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Key Growth Factors</span>
                      </div>
                      {report.regionTable.map((r, i) => (
                        <div key={i} className="grid grid-cols-12 gap-0 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                          <span className="col-span-2 text-[12px] font-semibold text-gray-800">{r.name}</span>
                          <span className="col-span-2 text-[12px] text-gray-600">{r.share}</span>
                          <span className="col-span-2 text-[12px] font-semibold text-emerald-600">{r.cagr}%</span>
                          <span className="col-span-6 text-[11px] text-gray-500">{r.factors}</span>
                        </div>
                      ))}
                    </div>
                    {report.analysisContent && (
                      <div className="grid md:grid-cols-2 gap-5 mt-5">
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <h4 className="text-sm font-bold text-gray-800 mb-1">North America — 43.2% Share, 5.1% CAGR</h4>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{report.analysisContent.northAmericaAnalysis}</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <h4 className="text-sm font-bold text-gray-800 mb-1">Middle East & Africa — Fastest Growing at 7.9% CAGR</h4>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{report.analysisContent.meaAnalysis}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Fade>
              )}

              {/* Competitive Landscape */}
              {report.analysisContent?.competitiveLandscape && (
                <Fade delay={0.45}>
                  <div className="mb-10">
                    <h3 className="font-heading text-lg font-bold text-gray-800 mb-2">Competitive Landscape</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed mb-5">{report.analysisContent.competitiveLandscape}</p>
                    <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Major Players in the Onshore Drilling Industry</p>
                    {report.companyTable && (
                      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="grid grid-cols-12 gap-0 bg-gray-50 border-b border-gray-200 px-4 py-2.5">
                          <span className="col-span-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">#</span>
                          <span className="col-span-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Company</span>
                          <span className="col-span-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Headquarters</span>
                          <span className="col-span-5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Core Capabilities</span>
                        </div>
                        {report.companyTable.map((c, i) => (
                          <div key={i} className="grid grid-cols-12 gap-0 px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <span className="col-span-1 text-[12px] text-gray-400 font-semibold">{i + 1}</span>
                            <span className="col-span-3 text-[12px] font-semibold text-gray-800">{c.name}</span>
                            <span className="col-span-3 text-[11px] text-gray-500">{c.hq}</span>
                            <span className="col-span-5 text-[11px] text-gray-500">{c.capabilities}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-[10px] text-gray-400 italic mt-2">*Disclaimer: Major Players sorted in no particular order</p>
                  </div>
                </Fade>
              )}

              {/* Recent Developments */}
              {report.developments && (
                <Fade delay={0.5}>
                  <div className="mb-10">
                    <h3 className="font-heading text-lg font-bold text-gray-800 mb-4">Recent Industry Developments</h3>
                    <div className="space-y-3">
                      {report.developments.map((d, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 flex gap-4">
                          <div className="shrink-0">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded whitespace-nowrap">{d.date}</span>
                          </div>
                          <p className="text-[12px] text-gray-600 leading-relaxed">{d.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fade>
              )}

              {/* FAQs */}
              {report.analysisContent?.faqs && (
                <Fade delay={0.55}>
                  <div className="mb-10">
                    <h3 className="font-heading text-lg font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                      {report.analysisContent.faqs.map((faq, i) => (
                        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                          <p className="text-sm font-semibold text-gray-800 mb-2">{faq.q}</p>
                          <p className="text-[12px] text-gray-500 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fade>
              )}

              {/* Scope */}
              {report.analysisContent?.scope && (
                <Fade delay={0.6}>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <h3 className="text-xs font-bold tracking-wider text-emerald-600 uppercase mb-4">Scope of the Report</h3>
                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {Object.entries(report.analysisContent.scope).map(([key, val]) => (
                        <div key={key} className="border-b border-gray-100 pb-3">
                          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                          <p className="text-[12px] text-gray-600">{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Fade>
              )}

              {/* Fallback for reports without rich content */}
              {!report.analysisContent && (
                <>
                  <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Key Drivers</h3>
                  {["Increasing regulatory pressure and mandatory ESG disclosures globally", "Growing institutional investor demand for ESG-aligned strategies", "Technological innovation reducing costs and improving accessibility", "Government policy support including subsidies and procurement mandates"].map((d, i) => <div key={i} className="flex items-start gap-2.5 mb-2"><div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5"><svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M5 13l4 4L19 7"/></svg></div><span className="text-xs text-gray-600 leading-relaxed">{d}</span></div>)}
                </>
              )}

            </>
          )}
          {activeTab === "esg" && report.esgContent && (
                <Fade delay={0.1}>
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                      </div>
                      <div>
                        <h2 className="font-heading text-xl font-bold text-gray-800">ESG & GRI Analysis</h2>
                        <p className="text-xs text-gray-400">{report.esgContent.subtitle || `${report.title} | MindEarth Research`}</p>
                      </div>
                    </div>

                    {/* GRI Framework */}
                    {report.esgContent.griFramework && (
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">1</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">GRI Framework: Applicable Standards</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead><tr className="bg-[#0A2540] text-white"><th className="px-3 py-2.5 text-left font-semibold rounded-tl-lg">GRI Series</th><th className="px-3 py-2.5 text-left font-semibold">Covers</th><th className="px-3 py-2.5 text-center font-semibold"># Stds</th><th className="px-3 py-2.5 text-left font-semibold rounded-tr-lg">Relevance</th></tr></thead>
                            <tbody>
                              {report.esgContent.griFramework.map((r, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                  <td className="px-3 py-2.5 font-semibold text-emerald-700">{r.series}</td>
                                  <td className="px-3 py-2.5 text-gray-600">{r.covers}</td>
                                  <td className="px-3 py-2.5 text-center font-bold text-gray-700">{r.stds}</td>
                                  <td className="px-3 py-2.5 text-gray-500">{r.relevance}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Regulatory Drivers */}
                    {report.esgContent.regulatoryDrivers && (
                      <div className="bg-gradient-to-br from-blue-50/50 to-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">Regulatory Convergence</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {report.esgContent.regulatoryDrivers.map((r, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                              <span className={`${r.color} text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider`}>{r.tag}</span>
                              <p className="text-xs text-gray-500 mt-2 leading-relaxed">{r.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Material Risks */}
                    {report.esgContent.materialRisks && (
                      <div className="bg-gradient-to-br from-red-50/30 to-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">3</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">Material GRI Risks</h3>
                        </div>
                        <div className="space-y-3">
                          {report.esgContent.materialRisks.map((r, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-gray-800">{r.risk}</span>
                                  <span className="text-[9px] text-gray-400 font-medium">{r.pillar}</span>
                                </div>
                                <span className={`${r.levelColor} text-white text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wider`}>{r.level}</span>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-2 mb-3">
                                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Key Drivers</p><p className="text-[11px] text-gray-500">{r.drivers}</p></div>
                                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Financial Exposure</p><p className="text-[11px] text-gray-500">{r.exposure}</p></div>
                              </div>
                              <p className="text-[11px] text-gray-400 leading-relaxed">{r.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ESG Solutions */}
                    {report.esgContent.solutions && (
                      <div className="bg-gradient-to-br from-emerald-50/50 to-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">4</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">ESG Solutions: Priority Investment Categories</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {report.esgContent.solutions.map((s, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 hover:border-emerald-200 transition">
                              <p className="text-[9px] font-bold text-emerald-600 tracking-wider mb-1">{s.gri}</p>
                              <p className="text-sm font-semibold text-gray-800 mb-1.5">{s.title}</p>
                              <p className="text-[11px] text-gray-500 leading-relaxed">{s.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* KPIs */}
                    {report.esgContent.kpis && (
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">5</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">GRI KPIs</h3>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead><tr className="bg-[#0A2540] text-white"><th className="px-3 py-2 text-left font-semibold rounded-tl-lg">#</th><th className="px-3 py-2 text-left font-semibold">GRI Topic</th><th className="px-3 py-2 text-left font-semibold rounded-tr-lg">Key Metrics & KPIs</th></tr></thead>
                            <tbody>
                              {report.esgContent.kpis.map((r, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                  <td className="px-3 py-2 font-bold text-emerald-600">{r.n}</td>
                                  <td className="px-3 py-2 font-semibold text-gray-700 whitespace-nowrap">{r.topic}</td>
                                  <td className="px-3 py-2 text-gray-500">{r.metrics}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Investor Landscape */}
                    {report.esgContent.investorLandscape && (
                      <div className="bg-gradient-to-br from-indigo-50/30 to-white rounded-xl border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">6</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">Investor Landscape</h3>
                        </div>
                        <div className="space-y-3">
                          {report.esgContent.investorLandscape.map((r, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-100 p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div><p className="text-sm font-semibold text-gray-800">{r.segment}</p><p className="text-[10px] text-gray-400">{r.examples}</p></div>
                                <span className={`${r.posColor} text-[9px] font-bold px-2.5 py-1 rounded-full`}>{r.posture}</span>
                              </div>
                              <div className="grid sm:grid-cols-2 gap-2">
                                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Framework</p><p className="text-[11px] text-gray-500">{r.framework}</p></div>
                                <div><p className="text-[9px] font-bold text-gray-400 uppercase mb-0.5">Screening Criteria</p><p className="text-[11px] text-gray-500">{r.criteria}</p></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Benchmarks */}
                    {report.esgContent.benchmarks && (
                      <div className="bg-gradient-to-br from-teal-50/30 to-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">7</span>
                          <h3 className="font-heading text-base font-bold text-gray-800">Key ESG Performance Benchmarks</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {report.esgContent.benchmarks.map((b, i) => (
                            <div key={i} className="bg-white rounded-lg border border-gray-100 p-4 text-center">
                              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">{b.label}</p>
                              <p className="text-2xl font-bold text-[#0A2540]">{b.value}</p>
                              <p className="text-[10px] text-gray-500 font-medium">{b.unit}</p>
                              <p className="text-[9px] text-gray-400 mt-1">{b.sub}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-[9px] text-gray-300 mt-4 italic">Source: GRI Standards (globalreporting.org). Regulatory citations per EU ETS Directive, EU CSRD 2022/2464, IRA 2022, ISSB IFRS S1/S2, SEC Final Climate Rule 2024.</p>
                  </div>
                </Fade>
          )}
          {activeTab === "toc" && (
            <Fade><div className="max-w-3xl"><h2 className="font-heading text-xl font-bold text-gray-800 mb-2">Table of Contents</h2><p className="text-xs text-gray-400 mb-5">{report.pages} pages | PDF + Excel</p>
              {(() => {
                const tocItems = report.toc;
                const elements = [];
                let idx = 0;
                while (idx < tocItems.length) {
                  const item = tocItems[idx];
                  const isSectionHeader = item.startsWith("§ SECTION") || item.startsWith("§ESG SECTION");
                  const isEsgSection = item.startsWith("§ESG SECTION");
                  const isEsgItem = item.startsWith("§ESG ") && !isSectionHeader;
                  const displayText = item.replace(/^§ESG\s*/, "").replace(/^§\s*/, "");
                  const isChapter = /^\d+\.\s/.test(displayText) && !/^\d+\.\d+/.test(displayText);
                  const isSubItem = /^\d+\.\d+/.test(displayText);

                  if (isSectionHeader) {
                    elements.push(<div key={idx} className={`mt-8 mb-3 pt-4 border-t-2 ${isEsgSection ? "border-emerald-300" : "border-gray-200"}`}><span className={`text-[11px] font-bold tracking-[0.15em] uppercase ${isEsgSection ? "text-emerald-600" : "text-brand-muted"}`}>{displayText}</span></div>);
                    idx++;
                  } else if (isChapter) {
                    const chapterNum = displayText.match(/^(\d+)\./)?.[1];
                    const isEsgChapter = isEsgItem;
                    const subItems = [];
                    let j = idx + 1;
                    while (j < tocItems.length) {
                      const next = tocItems[j];
                      const nextText = next.replace(/^§ESG\s*/, "").replace(/^§\s*/, "");
                      if (/^\d+\.\d+/.test(nextText) && nextText.startsWith(chapterNum + ".")) {
                        subItems.push({ text: nextText, isEsg: next.startsWith("§ESG ") });
                        j++;
                      } else break;
                    }
                    const isExpanded = expandedChapters[chapterNum];
                    elements.push(
                      <div key={idx}>
                        <div
                          onClick={() => subItems.length > 0 && setExpandedChapters(prev => ({ ...prev, [chapterNum]: !prev[chapterNum] }))}
                          className={`flex items-center justify-between py-3 border-b ${isEsgChapter ? "border-emerald-200" : "border-gray-200"} ${subItems.length > 0 ? "cursor-pointer hover:bg-gray-50" : ""} transition-colors`}
                        >
                          <span className={`text-sm font-semibold ${isEsgChapter ? "text-emerald-700" : "text-gray-800"}`}>{displayText}</span>
                          {subItems.length > 0 && <svg className={`w-4 h-4 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""} ${isEsgChapter ? "text-emerald-400" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7"/></svg>}
                        </div>
                        {isExpanded && subItems.length > 0 && (
                          <div className={`${isEsgChapter ? "bg-emerald-50/40 border-l-2 border-emerald-300" : "bg-gray-50/50 border-l-2 border-gray-200"} ml-2`}>
                            {subItems.map((sub, si) => (
                              <div key={si} className={`flex items-center justify-between py-2 pl-5 pr-3 border-b ${isEsgChapter || sub.isEsg ? "border-emerald-100/60" : "border-gray-100"}`}>
                                <span className={`text-[13px] ${isEsgChapter || sub.isEsg ? "text-emerald-600" : "text-gray-500"}`}>{sub.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                    idx = j;
                  } else if (isSubItem) {
                    idx++;
                  } else {
                    elements.push(
                      <div key={idx} className={`flex items-center justify-between py-2.5 border-b border-gray-100`}>
                        <span className="text-sm text-gray-800 font-medium">{displayText}</span>
                        <svg className="w-3.5 h-3.5 shrink-0 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M9 5l7 7-7 7"/></svg>
                      </div>
                    );
                    idx++;
                  }
                }
                return elements;
              })()}
            </div></Fade>
          )}
          {activeTab === "segments" && (
            <Fade>
              {report.segmentTables ? (
                <div>
                  <h2 className="font-heading text-xl font-bold text-gray-800 mb-5">Market Segmentation</h2>
                  <div className="grid md:grid-cols-3 gap-5 mb-8">
                    {[
                      { title: "By Rig Type", data: report.segmentTables.rigType },
                      { title: "By Technology", data: report.segmentTables.technology },
                      { title: "By Application", data: report.segmentTables.application }
                    ].map((seg) => (
                      <div key={seg.title} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-xs font-bold text-gray-800">{seg.title}</p>
                        </div>
                        {seg.data.map((row, ri) => (
                          <div key={ri} className="px-4 py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[12px] font-medium text-gray-700">{row.name}</span>
                                {row.tag && <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${row.tag === "Fastest" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{row.tag === "Fastest" ? "↑ Fastest" : "★ Largest"}</span>}
                              </div>
                              <span className="text-[11px] font-semibold text-emerald-600">{row.cagr}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: row.share }}></div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1">{row.share} share (2025)</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <h3 className="font-heading text-base font-bold text-gray-800 mb-3">By Region</h3>
                      {report.regions.map(r => <div key={r} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 mb-2"><span className="text-base">📍</span><span className="text-sm text-gray-700 font-medium">{r}</span></div>)}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-gray-800 mb-3">By Power Capacity</h3>
                      {["Up to 1,000 HP", "1,001–1,500 HP", "1,501–2,500 HP", "Beyond 2,500 HP"].map((p, i) => <div key={p} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">{i+1}</div><span className="text-sm text-gray-700 font-medium">{p}</span></div>)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  <div><h2 className="font-heading text-xl font-bold text-gray-800 mb-4">By Segment</h2>{report.segments.map((s,i) => <div key={s} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 mb-2"><div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-xs font-bold text-emerald-700">{i+1}</div><span className="text-sm text-gray-700 font-medium">{s}</span></div>)}</div>
                  <div><h2 className="font-heading text-xl font-bold text-gray-800 mb-4">By Region</h2>{report.regions.map(r => <div key={r} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 mb-2"><span className="text-base">📍</span><span className="text-sm text-gray-700 font-medium">{r}</span></div>)}</div>
                </div>
              )}
            </Fade>
          )}
          {activeTab === "companies" && (
            <Fade><h2 className="font-heading text-xl font-bold text-gray-800 mb-5">Key Companies</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {report.companies.map((co, i) => <div key={co} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-emerald-200 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`https://www.google.com/s2/favicons?domain=${report.domains[i]}&sz=64`} alt={co} className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-1.5 border border-gray-100" />
                    <div><p className="text-sm font-semibold text-gray-800">{co}</p><p className="text-[10px] text-gray-400">{report.domains[i]}</p></div>
                  </div>
                  {report.companyTable && report.companyTable[i] && (
                    <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">{report.companyTable[i].capabilities}</p>
                  )}
                  <div className="flex gap-1.5 flex-wrap">{["Overview","Financials","Strategy","SWOT"].map(t => <span key={t} className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{t}</span>)}</div>
                </div>)}
              </div>
              {report.analysisContent?.competitiveLandscape && <p className="text-[10px] text-gray-400 italic mt-3">*Disclaimer: Major Players sorted in no particular order</p>}
            </Fade>
          )}
        </div>
      </section>

      {/* Related */}
      <section className="bg-white py-10 px-5 border-t border-gray-100">
        <div className="max-w-7xl mx-auto"><Fade><p className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase mb-2">Related Reports</p><h2 className="font-heading text-xl font-bold text-gray-800 mb-5">You might also like</h2></Fade>
          <div className="grid md:grid-cols-2 gap-4">{related.map((r,i) => <Fade key={r.slug} delay={i*0.06}><Link href={`/reports/${r.slug}`} className="block bg-brand-light rounded-xl border border-gray-200 p-5 hover:border-emerald-300 transition group"><div className="flex gap-4"><img src={r.img} alt={r.title} className="w-20 h-20 rounded-lg object-cover shrink-0"/><div><span className="text-[10px] text-gray-400">{r.code}</span><h3 className="font-heading text-sm font-bold text-gray-800 group-hover:text-emerald-600 mt-0.5">{r.title}</h3><div className="flex gap-3 mt-2 text-[11px] text-gray-500"><span>CAGR: <strong className="text-emerald-600">{r.cagr}</strong></span><span>${r.price.toLocaleString()}</span></div></div></div></Link></Fade>)}</div>
        </div>
      </section>
      <Footer />

      {/* Sample Request Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowSampleModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowSampleModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"><svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg></div>
              <div><h3 className="font-bold text-gray-900">Request Free Sample</h3><p className="text-xs text-gray-400">{report.title}</p></div>
            </div>
            {formStatus.success ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"><svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg></div>
                <p className="font-semibold text-gray-900 mb-1">Sample Ready!</p>
                {formStatus.downloadUrl ? (
                  <><a href={formStatus.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0B6E4F] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#095C42] transition mt-3"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>Download Sample PDF</a><p className="text-xs text-gray-400 mt-2">Also sent to your email.</p></>
                ) : (
                  <p className="text-sm text-gray-500">We&apos;ll email you the sample PDF shortly.</p>
                )}
              </div>
            ) : (
              <form onSubmit={submitSampleRequest} className="space-y-3">
                <input required placeholder="Full Name *" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <input required type="email" placeholder="Business Email *" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <input required placeholder="Company *" value={formData.company} onChange={e => setFormData(p => ({...p, company: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Job Title" value={formData.jobTitle} onChange={e => setFormData(p => ({...p, jobTitle: e.target.value}))} className="border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                  <input placeholder="Phone" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} className="border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                </div>
                {formStatus.msg && !formStatus.success && <p className="text-xs text-red-500">{formStatus.msg}</p>}
                <button type="submit" disabled={formStatus.loading} className="w-full bg-[#0B6E4F] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#095C42] transition disabled:opacity-50">
                  {formStatus.loading ? "Submitting..." : "Get Free Sample PDF"}
                </button>
                <p className="text-[10px] text-gray-400 text-center">By submitting, you agree to receive communications from MindEarth.</p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowInquiryModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowInquiryModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">&times;</button>
            <h3 className="font-bold text-gray-900 mb-1">Ask About This Report</h3>
            <p className="text-xs text-gray-400 mb-4">{report.title}</p>
            {formStatus.success ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3"><svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg></div>
                <p className="font-semibold text-gray-900 mb-1">Inquiry Received!</p>
                <p className="text-sm text-gray-500">Our analyst team will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submitInquiry} className="space-y-3">
                <input required placeholder="Full Name *" value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <input required type="email" placeholder="Business Email *" value={formData.email} onChange={e => setFormData(p => ({...p, email: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <input placeholder="Company" value={formData.company} onChange={e => setFormData(p => ({...p, company: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <input placeholder="Phone" value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400" />
                <textarea required placeholder="Your question about this report *" rows={3} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-emerald-400 resize-none" />
                {formStatus.msg && !formStatus.success && <p className="text-xs text-red-500">{formStatus.msg}</p>}
                <button type="submit" disabled={formStatus.loading} className="w-full bg-[#0B6E4F] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#095C42] transition disabled:opacity-50">
                  {formStatus.loading ? "Submitting..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
