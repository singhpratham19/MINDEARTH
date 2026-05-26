"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { parseExcelToReport, downloadTemplate, parseExcelToInsight, downloadInsightTemplate } from "@/lib/excel-parser";

const API = "/api/admin/reports/content";
const INSIGHTS_API = "/api/admin/insights";

/* ── small helpers ── */
function Badge({ children, color = "gray" }) {
  const map = {
    green:  "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    blue:   "bg-sky-50 text-sky-700 ring-1 ring-sky-200",
    amber:  "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
    red:    "bg-red-50 text-red-600 ring-1 ring-red-200",
    gray:   "bg-gray-100 text-gray-500 ring-1 ring-gray-200",
    navy:   "bg-[#0A2540]/10 text-[#0A2540] ring-1 ring-[#0A2540]/20",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${map[color]}`}>{children}</span>;
}

function SideIcon({ type }) {
  const icons = {
    reports: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    insights: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
    upload:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    logout:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
  };
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">{icons[type]}</svg>;
}

export default function ReportsCMS() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", ok: true });
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [dragOverInsight, setDragOverInsight] = useState(false);
  const [previewTab, setPreviewTab] = useState("overview");
  const [dbMissing, setDbMissing] = useState(false);
  const [setupSql, setSetupSql] = useState("");
  const [cmsTab, setCmsTab] = useState("insights");
  const [insights, setInsights] = useState([]);
  const [insightPreview, setInsightPreview] = useState(null);
  const fileRef = useRef();
  const imgRef = useRef();
  const insightFileRef = useRef();

  const authHeader = { Authorization: `Bearer ${password}` };

  const fetchReports = useCallback(async () => {
    try {
      const res = await fetch(API, { headers: { Authorization: `Bearer ${password}` } });
      if (res.status === 401) { setAuthed(false); return; }
      if (res.ok) {
        const json = await res.json();
        setReports(json.reports || []);
        setDbMissing(json.warning && json.reports?.length === 0);
      } else setReports([]);
    } catch { setReports([]); }
  }, [password]);

  const fetchInsights = useCallback(async () => {
    try {
      const res = await fetch(INSIGHTS_API, { headers: { Authorization: `Bearer ${password}` } });
      if (res.ok) { const json = await res.json(); setInsights(json.insights || []); }
      else setInsights([]);
    } catch { setInsights([]); }
  }, [password]);

  useEffect(() => { if (authed) { fetchReports(); fetchInsights(); } }, [authed, fetchReports, fetchInsights]);
  useEffect(() => { const saved = sessionStorage.getItem("admin_pw"); if (saved) { setPassword(saved); setAuthed(true); } }, []);

  const handleLogin = (e) => { e.preventDefault(); sessionStorage.setItem("admin_pw", password); setAuthed(true); };

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true); setMsg({ text: "", ok: true });
    try {
      const buffer = await file.arrayBuffer();
      const report = parseExcelToReport(new Uint8Array(buffer));
      if (!report.title) throw new Error("No title found. Make sure the 'Basic Info' sheet has a 'Title' row.");
      setPreview(report); setPreviewTab("overview");
      setMsg({ text: `Parsed "${report.title}" — review and publish below.`, ok: true });
    } catch (err) { setMsg({ text: `Error: ${err.message}`, ok: false }); setPreview(null); }
    setLoading(false);
  };

  const handleImageUpload = async (file) => {
    if (!file || !file.type.startsWith("image/")) { setMsg({ text: "Please upload an image file", ok: false }); return; }
    setLoading(true);
    try {
      const formData = new FormData(); formData.append("file", file);
      const res = await fetch("/api/admin/upload-image", { method: "POST", headers: authHeader, body: formData });
      const json = await res.json();
      if (res.ok && json.url) { setPreview(prev => ({ ...prev, img: json.url })); setMsg({ text: "Image uploaded!", ok: true }); }
      else { const localUrl = URL.createObjectURL(file); setPreview(prev => ({ ...prev, img: localUrl, _localImage: true })); }
    } catch { const localUrl = URL.createObjectURL(file); setPreview(prev => ({ ...prev, img: localUrl, _localImage: true })); }
    setLoading(false);
  };

  const publish = async () => {
    if (!preview) return;
    setLoading(true); setMsg({ text: "", ok: true });
    try {
      if (preview._localImage && !preview.img?.startsWith("http")) { setMsg({ text: "Add an image URL in Excel before publishing.", ok: false }); setLoading(false); return; }
      const existing = reports.find(r => r.slug === preview.slug);
      const { _localImage, ...body } = { ...preview, published: true };
      const res = await fetch(API, { method: existing ? "PUT" : "POST", headers: { ...authHeader, "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setMsg({ text: `"${preview.title}" ${existing ? "updated" : "published"}!`, ok: true });
      setPreview(null); fetchReports();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    setLoading(false);
  };

  const deleteReport = async (slug) => {
    if (!confirm(`Delete "${slug}"?`)) return;
    try {
      const res = await fetch(`${API}?slug=${slug}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error); }
      setMsg({ text: `Deleted "${slug}"`, ok: true }); fetchReports();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
  };

  const handleInsightFile = async (file) => {
    if (!file) return;
    setLoading(true); setMsg({ text: "", ok: true });
    try {
      const buffer = await file.arrayBuffer();
      const insight = parseExcelToInsight(new Uint8Array(buffer));
      if (!insight.title) throw new Error("No title found.");
      setInsightPreview(insight);
      setMsg({ text: `Parsed "${insight.title}" — review and publish below.`, ok: true });
    } catch (err) { setMsg({ text: `Error: ${err.message}`, ok: false }); setInsightPreview(null); }
    setLoading(false);
  };

  const publishInsight = async () => {
    if (!insightPreview) return;
    setLoading(true); setMsg({ text: "", ok: true });
    try {
      const existing = insights.find(i => i.slug === insightPreview.slug);
      const res = await fetch(INSIGHTS_API, { method: existing ? "PUT" : "POST", headers: { ...authHeader, "Content-Type": "application/json" }, body: JSON.stringify({ ...insightPreview, published: true }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setMsg({ text: `"${insightPreview.title}" ${existing ? "updated" : "published"}!`, ok: true });
      setInsightPreview(null); fetchInsights();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    setLoading(false);
  };

  const deleteInsight = async (slug) => {
    if (!confirm(`Delete insight "${slug}"?`)) return;
    try {
      const res = await fetch(`${INSIGHTS_API}?slug=${slug}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error); }
      setMsg({ text: `Deleted "${slug}"`, ok: true }); fetchInsights();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
  };

  const seedReports = async () => { setLoading(true); try { const res = await fetch("/api/admin/seed", { method: "POST", headers: authHeader }); const json = await res.json(); setMsg({ text: json.message || "Seeded!", ok: !json.error }); fetchReports(); } catch (err) { setMsg({ text: err.message, ok: false }); } setLoading(false); };
  const seedInsights = async () => { setLoading(true); try { const res = await fetch("/api/admin/seed-insights", { method: "POST", headers: authHeader }); const json = await res.json(); setMsg({ text: json.message || "Seeded!", ok: !json.error }); fetchInsights(); } catch (err) { setMsg({ text: err.message, ok: false }); } setLoading(false); };

  /* ── LOGIN SCREEN ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A2540] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#0A2540] rounded-xl flex items-center justify-center">
              <span className="text-white text-xs font-bold tracking-wider">ME</span>
            </div>
            <div>
              <p className="font-heading text-[15px] font-bold text-[#0A2540] leading-tight">MindEarth</p>
              <p className="text-[10px] text-gray-400 tracking-[0.15em] uppercase">Editorial CMS</p>
            </div>
          </div>
          <h1 className="font-heading text-[22px] font-bold text-[#0A2540] mb-1">Sign in</h1>
          <p className="text-[13px] text-gray-400 mb-7">Enter your admin password to access the CMS.</p>
          <label className="text-[11px] font-semibold text-gray-500 tracking-[0.1em] uppercase block mb-1.5">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm mb-5 focus:outline-none focus:ring-2 focus:ring-[#0A2540]/20 focus:border-[#0A2540] transition" />
          <button type="submit" className="w-full bg-[#0A2540] text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-[#0F172A] transition">Sign in →</button>
        </form>
      </div>
    );
  }

  /* ── MAIN CMS ── */
  const navItems = [
    { key: "insights", label: "Insights", icon: "insights", count: insights.length },
    { key: "reports", label: "Reports", icon: "reports", count: reports.length },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">

      {/* ═══ SIDEBAR ═══ */}
      <aside className="w-[220px] shrink-0 bg-[#0A2540] flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#0B6E4F] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-[10px] font-bold tracking-wider">ME</span>
            </div>
            <div>
              <p className="font-heading text-[13px] font-bold text-white leading-tight">MindEarth</p>
              <p className="text-[9px] text-white/40 tracking-[0.15em] uppercase">Editorial CMS</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 px-2 mb-3">Content</p>
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { setCmsTab(item.key); setMsg({ text: "", ok: true }); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all ${cmsTab === item.key ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/[0.06]"}`}
            >
              <div className="flex items-center gap-2.5">
                <SideIcon type={item.icon} />
                <span className="text-[13px] font-semibold">{item.label}</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${cmsTab === item.key ? "bg-white/20 text-white" : "bg-white/[0.08] text-white/40"}`}>{item.count}</span>
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/30 px-2 mb-3">Tools</p>
            {cmsTab === "reports" && (
              <button onClick={seedReports} disabled={loading} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition text-[13px] font-medium">
                <SideIcon type="upload" />Seed Reports
              </button>
            )}
            {cmsTab === "insights" && (
              <button onClick={seedInsights} disabled={loading} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition text-[13px] font-medium">
                <SideIcon type="upload" />Seed Insights
              </button>
            )}
            <a href="/admin" className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition text-[13px] font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Main Admin
            </a>
          </div>
        </nav>

        {/* User */}
        <div className="px-5 py-4 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#0B6E4F] flex items-center justify-center text-white text-[10px] font-bold">A</div>
              <span className="text-[12px] text-white/60 font-medium">Admin</span>
            </div>
            <button onClick={() => { sessionStorage.removeItem("admin_pw"); setAuthed(false); }} title="Sign out">
              <SideIcon type="logout" />
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="flex-1 overflow-auto">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-[18px] font-bold text-[#0A2540]">
              {cmsTab === "insights" ? "Insights" : "Market Reports"}
            </h1>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {cmsTab === "insights" ? `${insights.length} articles published` : `${reports.length} reports published`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {cmsTab === "insights" && (
              <button onClick={downloadInsightTemplate} className="flex items-center gap-2 text-[13px] font-semibold text-[#0A2540] border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Excel Template
              </button>
            )}
            {cmsTab === "reports" && (
              <button onClick={downloadTemplate} className="flex items-center gap-2 text-[13px] font-semibold text-[#0A2540] border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Excel Template
              </button>
            )}
            <button
              onClick={() => cmsTab === "insights" ? insightFileRef.current?.click() : fileRef.current?.click()}
              className="flex items-center gap-2 text-[13px] font-semibold bg-[#0B6E4F] text-white px-5 py-2 rounded-lg hover:bg-[#095C42] transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 4v16m8-8H4" /></svg>
              New {cmsTab === "insights" ? "Insight" : "Report"}
            </button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={e => handleFile(e.target.files?.[0])} className="hidden" />
            <input ref={insightFileRef} type="file" accept=".xlsx,.xls" onChange={e => handleInsightFile(e.target.files?.[0])} className="hidden" />
          </div>
        </header>

        <div className="px-8 py-6 max-w-5xl">

          {/* Toast */}
          {msg.text && (
            <div className={`mb-5 px-4 py-3 rounded-xl text-[13px] font-medium flex items-center gap-2 ${msg.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
              {msg.ok ? <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M5 13l4 4L19 7"/></svg> : <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
              {msg.text}
              <button onClick={() => setMsg({ text: "", ok: true })} className="ml-auto text-current opacity-50 hover:opacity-100">✕</button>
            </div>
          )}

          {/* DB warning */}
          {dbMissing && cmsTab === "reports" && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-5 text-[13px] text-amber-800">
              <p className="font-bold mb-1">Database setup required</p>
              <p className="text-amber-700 mb-3">The reports table hasn&apos;t been created yet. Run the SQL migration in your Supabase Dashboard.</p>
              {setupSql ? (
                <>
                  <pre className="bg-white border border-amber-200 rounded-lg p-3 text-xs text-gray-700 overflow-x-auto max-h-48 mb-3">{setupSql}</pre>
                  <button onClick={() => { navigator.clipboard.writeText(setupSql); setMsg({ text: "SQL copied!", ok: true }); }} className="text-xs font-semibold bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition">Copy SQL</button>
                </>
              ) : (
                <button onClick={async () => { setLoading(true); const res = await fetch("/api/admin/setup-db", { method: "POST", headers: authHeader }); const j = await res.json(); if (j.needsManualSetup) setSetupSql(j.sql); else setMsg({ text: j.message || "Done", ok: true }); setLoading(false); }} disabled={loading} className="text-xs font-semibold bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition">Get Instructions</button>
              )}
            </div>
          )}

          {/* ══ DROP ZONE ══ */}
          <div
            onDragOver={(e) => { e.preventDefault(); cmsTab === "insights" ? setDragOverInsight(true) : setDragOver(true); }}
            onDragLeave={() => { setDragOver(false); setDragOverInsight(false); }}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); setDragOverInsight(false); const f = e.dataTransfer.files?.[0]; cmsTab === "insights" ? handleInsightFile(f) : handleFile(f); }}
            onClick={() => cmsTab === "insights" ? insightFileRef.current?.click() : fileRef.current?.click()}
            className={`mb-6 border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${(dragOver || dragOverInsight) ? "border-[#0B6E4F] bg-emerald-50/50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"}`}
          >
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-[#0B6E4F] border-t-transparent rounded-full animate-spin" />
                <p className="text-[13px] text-gray-500 font-medium">Processing file…</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                </div>
                <p className="text-[14px] font-semibold text-gray-700">Drop Excel file to import</p>
                <p className="text-[12px] text-gray-400">or click to browse — .xlsx / .xls supported</p>
              </div>
            )}
          </div>

          {/* ══ INSIGHT PREVIEW ══ */}
          {cmsTab === "insights" && insightPreview && (
            <div className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="font-heading text-[15px] font-bold text-[#0A2540]">Preview — {insightPreview.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setInsightPreview(null)} className="text-[12px] font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">Discard</button>
                  <button onClick={publishInsight} disabled={loading} className="text-[12px] font-semibold bg-[#0B6E4F] text-white px-5 py-2 rounded-lg hover:bg-[#095C42] transition disabled:opacity-50">
                    {loading ? "Publishing…" : insights.find(i => i.slug === insightPreview.slug) ? "Update" : "Publish Insight"}
                  </button>
                </div>
              </div>
              <div className="p-6 grid md:grid-cols-2 gap-6">
                <div>
                  {insightPreview.img && <img src={insightPreview.img} alt="" className="w-full h-44 object-cover rounded-xl border border-gray-100 mb-4" />}
                  <div className="flex items-center gap-2 mb-3">
                    <Badge color="blue">{insightPreview.cat}</Badge>
                    <span className="text-[11px] text-gray-400">{insightPreview.date}</span>
                    <span className="text-[11px] text-gray-400">{insightPreview.read_time} read</span>
                  </div>
                  <h3 className="font-heading text-[18px] font-bold text-[#0A2540] mb-2 leading-snug">{insightPreview.title}</h3>
                  {insightPreview.subtitle && <p className="text-[12px] text-gray-400 mb-2">{insightPreview.subtitle}</p>}
                  <p className="text-[13px] text-gray-600 leading-relaxed">{insightPreview.summary}</p>
                </div>
                <div className="space-y-4">
                  {insightPreview.key_takeaways?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2">Key Takeaways</p>
                      <ul className="space-y-1.5">
                        {insightPreview.key_takeaways.map((t, i) => (
                          <li key={i} className="flex gap-2 text-[13px] text-gray-700">
                            <span className="w-4 h-4 rounded-full bg-[#0B6E4F] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">{i+1}</span>{t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {insightPreview.sections?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2">Sections ({insightPreview.sections.length})</p>
                      <div className="space-y-2">
                        {insightPreview.sections.map((s, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                            <p className="text-[13px] font-semibold text-[#0A2540] mb-1">{s.heading}</p>
                            <p className="text-[11px] text-gray-500 line-clamp-2">{s.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {insightPreview.tags?.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2">Tags</p>
                      <div className="flex flex-wrap gap-1.5">{insightPreview.tags.map(t => <Badge key={t} color="gray">{t}</Badge>)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ REPORT PREVIEW ══ */}
          {cmsTab === "reports" && preview && (
            <div className="mb-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="font-heading text-[15px] font-bold text-[#0A2540]">Preview — {preview.title}</h2>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setPreview(null)} className="text-[12px] font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">Discard</button>
                  <button onClick={publish} disabled={loading} className="text-[12px] font-semibold bg-[#0B6E4F] text-white px-5 py-2 rounded-lg hover:bg-[#095C42] transition disabled:opacity-50">
                    {loading ? "Publishing…" : reports.find(r => r.slug === preview.slug) ? "Update" : "Publish Report"}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 group cursor-pointer mb-4" onClick={() => imgRef.current?.click()}>
                      {preview.img ? (
                        <>
                          <img src={preview.img} alt="" className="w-full h-44 object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span className="bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-lg">Change image</span>
                          </div>
                        </>
                      ) : (
                        <div className="h-44 bg-gray-50 flex flex-col items-center justify-center">
                          <svg className="w-8 h-8 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          <p className="text-xs text-gray-400">Click to upload cover image</p>
                        </div>
                      )}
                      <input ref={imgRef} type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files?.[0])} className="hidden" />
                    </div>
                    <div className="flex gap-2 mb-3">
                      <Badge color="green">{preview.cat}</Badge>
                      {preview.badge && <Badge color="amber">{preview.badge}</Badge>}
                      <span className="text-[11px] text-gray-400">{preview.code}</span>
                    </div>
                    <h3 className="font-heading text-[18px] font-bold text-[#0A2540] mb-2">{preview.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed">{preview.overview || preview.desc}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[["Market Size", preview.size], ["CAGR", preview.cagr], ["Base Year", preview.baseYear], ["Forecast", preview.period]].map(([l, v]) => (
                        <div key={l} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <p className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mb-1">{l}</p>
                          <p className={`text-[15px] font-bold ${l === "CAGR" ? "text-[#0B6E4F]" : "text-[#0A2540]"}`}>{v || "—"}</p>
                        </div>
                      ))}
                    </div>
                    {preview.keyTakeaways?.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2">Key Takeaways</p>
                        <ul className="space-y-1.5">
                          {preview.keyTakeaways.map((t, i) => (
                            <li key={i} className="flex gap-2 text-[13px] text-gray-700"><span className="text-[#0B6E4F] shrink-0">✓</span>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* TOC & segments preview tabs */}
                <div className="border-t border-gray-100 pt-5">
                  <div className="flex gap-0 border-b border-gray-100 mb-5 overflow-x-auto">
                    {[{k:"overview",l:"Overview"},{k:"toc",l:"TOC"},{k:"segments",l:"Segments"},{k:"companies",l:"Companies"}].map(t => (
                      <button key={t.k} onClick={() => setPreviewTab(t.k)} className={`px-4 py-2.5 text-[13px] font-semibold border-b-2 whitespace-nowrap transition ${previewTab===t.k?"border-[#0A2540] text-[#0A2540]":"border-transparent text-gray-400 hover:text-gray-600"}`}>{t.l}</button>
                    ))}
                  </div>
                  {previewTab === "toc" && (
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {preview.toc?.length > 0 ? preview.toc.map((e, i) => {
                        const isSec = e.startsWith("§"), isSub = /^\d+\.\d+/.test(e);
                        return <p key={i} className={`text-[13px] ${isSec ? "font-bold text-[#0B6E4F] uppercase text-[10px] tracking-wide mt-3" : isSub ? "text-gray-400 pl-5" : "font-medium text-gray-700 pl-2"}`}>{e}</p>;
                      }) : <p className="text-[13px] text-gray-400 italic">No TOC — add in the TOC sheet</p>}
                    </div>
                  )}
                  {previewTab === "overview" && (
                    <div className="space-y-3">
                      {preview.drivers?.length > 0 && <p className="text-[13px] text-gray-500">{preview.drivers.length} market drivers · {preview.restraints?.length || 0} restraints · {preview.developments?.length || 0} recent developments</p>}
                    </div>
                  )}
                  {previewTab === "segments" && (
                    <div className="flex flex-wrap gap-2">
                      {(preview.segments || []).map(s => <Badge key={s} color="gray">{s}</Badge>)}
                      {(preview.regions || []).map(r => <Badge key={r} color="navy">{r}</Badge>)}
                    </div>
                  )}
                  {previewTab === "companies" && (
                    <div className="flex flex-wrap gap-2">
                      {(preview.companies || []).map(c => <span key={c} className="text-[12px] text-gray-700 bg-gray-100 px-3 py-1 rounded-full">{c}</span>)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ══ PUBLISHED INSIGHTS LIST ══ */}
          {cmsTab === "insights" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-[15px] font-bold text-[#0A2540]">Published Insights</h2>
                <span className="text-[12px] text-gray-400">{insights.length} total</span>
              </div>

              {insights.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SideIcon type="insights" />
                  </div>
                  <p className="text-[15px] font-semibold text-gray-700 mb-1">No insights yet</p>
                  <p className="text-[13px] text-gray-400">Upload an Excel file or click "Seed Insights" to populate from existing data.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {insights.map((item, idx) => (
                    <div key={item.slug} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-5 hover:border-gray-300 transition group">
                      {/* Thumbnail */}
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {item.img ? <img src={item.img} alt="" className="w-full h-full object-cover" /> : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" /></svg>
                          </div>
                        )}
                      </div>
                      {/* Meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge color={item.cat === "TRENDS" ? "green" : item.cat === "DATA" ? "blue" : item.cat === "RESEARCH" ? "navy" : "amber"}>{item.cat}</Badge>
                          {item.featured && <Badge color="amber">Featured</Badge>}
                          <Badge color={item.published ? "green" : "gray"}>{item.published ? "Live" : "Draft"}</Badge>
                        </div>
                        <h3 className="font-heading text-[14px] font-bold text-[#0A2540] truncate">{item.title}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.slug} · {item.date} · {item.read_time}</p>
                      </div>
                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition shrink-0">
                        <a href={`/insights/${item.slug}`} target="_blank" className="text-[12px] font-semibold text-[#0B6E4F] border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition">View ↗</a>
                        <button onClick={() => deleteInsight(item.slug)} className="text-[12px] font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ PUBLISHED REPORTS LIST ══ */}
          {cmsTab === "reports" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-[15px] font-bold text-[#0A2540]">Published Reports</h2>
                <span className="text-[12px] text-gray-400">{reports.length} total</span>
              </div>

              {reports.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
                  <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <SideIcon type="reports" />
                  </div>
                  <p className="text-[15px] font-semibold text-gray-700 mb-1">No reports yet</p>
                  <p className="text-[13px] text-gray-400">Upload an Excel file or click "Seed Reports" to get started.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {reports.map(r => (
                    <div key={r.slug} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-5 hover:border-gray-300 transition group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge color="green">{r.cat}</Badge>
                          {r.badge && <Badge color="amber">{r.badge}</Badge>}
                          <Badge color={r.published ? "green" : "gray"}>{r.published ? "Live" : "Draft"}</Badge>
                          <span className="text-[10px] text-gray-400">{r.code}</span>
                        </div>
                        <h3 className="font-heading text-[14px] font-bold text-[#0A2540] truncate">{r.title}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">{r.slug} · {r.size} · CAGR {r.cagr}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition shrink-0">
                        <a href={`/reports/${r.slug}`} target="_blank" className="text-[12px] font-semibold text-[#0B6E4F] border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition">View ↗</a>
                        <button onClick={() => deleteReport(r.slug)} className="text-[12px] font-semibold text-red-500 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="text-center text-[11px] text-gray-300 mt-10 mb-4">MindEarth CMS · Upload Excel → Auto-format → Publish</p>
        </div>
      </div>
    </div>
  );
}
