"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { parseExcelToReport, downloadTemplate, parseExcelToInsight, downloadInsightTemplate } from "@/lib/excel-parser";

const API = "/api/admin/reports/content";
const INSIGHTS_API = "/api/admin/insights";

export default function ReportsCMS() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", ok: true });
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewTab, setPreviewTab] = useState("overview");
  const [dbMissing, setDbMissing] = useState(false);
  const [setupSql, setSetupSql] = useState("");
  const [cmsTab, setCmsTab] = useState("reports"); // "reports" | "insights"
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
        if (json.warning && json.reports?.length === 0) {
          setDbMissing(true);
        } else {
          setDbMissing(false);
        }
      } else {
        setReports([]);
      }
    } catch { setReports([]); }
  }, [password]);

  const fetchInsights = useCallback(async () => {
    try {
      const res = await fetch(INSIGHTS_API, { headers: { Authorization: `Bearer ${password}` } });
      if (res.ok) {
        const json = await res.json();
        setInsights(json.insights || []);
      } else {
        setInsights([]);
      }
    } catch { setInsights([]); }
  }, [password]);

  useEffect(() => { if (authed) { fetchReports(); fetchInsights(); } }, [authed, fetchReports, fetchInsights]);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) { setPassword(saved); setAuthed(true); }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem("admin_pw", password);
    setAuthed(true);
  };

  // Parse uploaded Excel
  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      const buffer = await file.arrayBuffer();
      const report = parseExcelToReport(new Uint8Array(buffer));
      if (!report.title) throw new Error("No title found. Make sure the 'Basic Info' sheet has a 'Title' row.");
      setPreview(report);
      setPreviewTab("overview");
      setMsg({ text: `Parsed "${report.title}" — review the preview below and click Publish.`, ok: true });
    } catch (err) {
      setMsg({ text: `Error parsing Excel: ${err.message}`, ok: false });
      setPreview(null);
    }
    setLoading(false);
  };

  const onFileChange = (e) => handleFile(e.target.files?.[0]);
  const onDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); };

  // Image upload
  const handleImageUpload = async (file) => {
    if (!file) return;
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setMsg({ text: "Please upload an image file (JPG, PNG, WebP)", ok: false });
      return;
    }
    setLoading(true);
    try {
      // Try Supabase upload first
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload-image", {
        method: "POST",
        headers: authHeader,
        body: formData,
      });
      const json = await res.json();
      if (res.ok && json.url) {
        setPreview(prev => ({ ...prev, img: json.url }));
        setMsg({ text: "Image uploaded successfully!", ok: true });
      } else {
        // Fallback: use local preview URL
        const localUrl = URL.createObjectURL(file);
        setPreview(prev => ({ ...prev, img: localUrl, _localImage: true }));
        setMsg({ text: json.error ? `${json.error} — Using local preview instead. Add image URL in Excel or set up Supabase Storage.` : "Using local image preview.", ok: true });
      }
    } catch {
      // Fallback: use local preview URL
      const localUrl = URL.createObjectURL(file);
      setPreview(prev => ({ ...prev, img: localUrl, _localImage: true }));
      setMsg({ text: "Could not upload to server — using local preview. Add an image URL in the Excel 'Basic Info' sheet.", ok: true });
    }
    setLoading(false);
  };

  // Publish
  const publish = async () => {
    if (!preview) return;
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      if (preview._localImage && !preview.img?.startsWith("http")) {
        setMsg({ text: "Please add an image URL in your Excel file or upload to Supabase Storage before publishing.", ok: false });
        setLoading(false);
        return;
      }
      const existing = reports.find(r => r.slug === preview.slug);
      const method = existing ? "PUT" : "POST";
      const { _localImage, ...body } = { ...preview, published: true };
      const res = await fetch(API, {
        method,
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setMsg({ text: `Report "${preview.title}" ${existing ? "updated" : "created"} successfully!`, ok: true });
      setPreview(null);
      fetchReports();
    } catch (err) {
      setMsg({ text: err.message, ok: false });
    }
    setLoading(false);
  };

  const deleteReport = async (slug) => {
    if (!confirm(`Delete "${slug}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API}?slug=${slug}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error); }
      setMsg({ text: `Deleted "${slug}"`, ok: true });
      fetchReports();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
  };

  const setupDatabase = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/setup-db", { method: "POST", headers: authHeader });
      const json = await res.json();
      if (json.success) {
        setMsg({ text: "Database is already set up!", ok: true });
        setDbMissing(false);
        fetchReports();
      } else if (json.needsManualSetup) {
        setSetupSql(json.sql);
      } else {
        setMsg({ text: json.error || "Setup failed", ok: false });
      }
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    setLoading(false);
  };

  const seedReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST", headers: authHeader });
      const json = await res.json();
      const errMsg = json.error || "";
      if (errMsg.includes("schema cache") || errMsg.includes("not found")) {
        setMsg({ text: "Database table doesn't exist yet. Go to your Supabase Dashboard → SQL Editor and run the migration from supabase-reports-table.sql first.", ok: false });
      } else {
        setMsg({ text: json.message || "Seeded!", ok: !json.error });
      }
      fetchReports();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    setLoading(false);
  };

  // ── INSIGHT HANDLERS ──
  const handleInsightFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      const buffer = await file.arrayBuffer();
      const insight = parseExcelToInsight(new Uint8Array(buffer));
      if (!insight.title) throw new Error("No title found. Make sure the 'Basic Info' sheet has a 'Title' row.");
      setInsightPreview(insight);
      setMsg({ text: `Parsed "${insight.title}" — review below and click Publish.`, ok: true });
    } catch (err) {
      setMsg({ text: `Error parsing Excel: ${err.message}`, ok: false });
      setInsightPreview(null);
    }
    setLoading(false);
  };

  const publishInsight = async () => {
    if (!insightPreview) return;
    setLoading(true);
    setMsg({ text: "", ok: true });
    try {
      const existing = insights.find(i => i.slug === insightPreview.slug);
      const method = existing ? "PUT" : "POST";
      const res = await fetch(INSIGHTS_API, {
        method,
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ ...insightPreview, published: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save");
      setMsg({ text: `Insight "${insightPreview.title}" ${existing ? "updated" : "created"} successfully!`, ok: true });
      setInsightPreview(null);
      fetchInsights();
    } catch (err) {
      setMsg({ text: err.message, ok: false });
    }
    setLoading(false);
  };

  const deleteInsight = async (slug) => {
    if (!confirm(`Delete insight "${slug}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${INSIGHTS_API}?slug=${slug}`, { method: "DELETE", headers: authHeader });
      if (!res.ok) { const j = await res.json(); throw new Error(j.error); }
      setMsg({ text: `Deleted insight "${slug}"`, ok: true });
      fetchInsights();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
  };

  const seedInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed-insights", { method: "POST", headers: authHeader });
      const json = await res.json();
      if (json.error) {
        setMsg({ text: json.error, ok: false });
      } else {
        setMsg({ text: json.message || "Seeded insights!", ok: true });
      }
      fetchInsights();
    } catch (err) { setMsg({ text: err.message, ok: false }); }
    setLoading(false);
  };

  /* ── LOGIN ── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="font-heading text-xl font-bold text-gray-900">Report CMS</h1>
            <p className="text-sm text-gray-500 mt-1">Upload Excel files to publish reports</p>
          </div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin password"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm mb-4 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none" />
          <button type="submit" className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition text-sm">Login</button>
        </form>
      </div>
    );
  }

  /* ── MAIN CMS ── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h1 className="font-heading text-lg font-bold text-gray-900">MindEarth CMS</h1>
          </div>
          <div className="flex items-center gap-3">
            {cmsTab === "reports" && (
              <button onClick={seedReports} disabled={loading} className="text-xs text-gray-500 hover:text-emerald-600 transition px-3 py-2 rounded-lg hover:bg-gray-50">Seed Existing Reports</button>
            )}
            {cmsTab === "insights" && (
              <button onClick={seedInsights} disabled={loading} className="text-xs text-gray-500 hover:text-emerald-600 transition px-3 py-2 rounded-lg hover:bg-gray-50">Seed Existing Insights</button>
            )}
            <button onClick={() => { sessionStorage.removeItem("admin_pw"); setAuthed(false); }} className="text-xs text-gray-400 hover:text-red-500 transition px-3 py-2 rounded-lg hover:bg-gray-50">Logout</button>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-0 border-b-0">
            {[
              { key: "reports", label: "Reports" },
              { key: "insights", label: "Insights" },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => { setCmsTab(tab.key); setMsg({ text: "", ok: true }); }}
                className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition ${cmsTab === tab.key ? "border-emerald-600 text-emerald-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {msg.text && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm font-medium ${msg.ok ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {msg.text}
          </div>
        )}

        {/* ══════ REPORTS TAB ══════ */}
        {cmsTab === "reports" && (<>

        {/* Database Setup Banner */}
        {dbMissing && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-amber-800 mb-1">Database Setup Required</h3>
                <p className="text-sm text-amber-700 mb-3">The reports table hasn&apos;t been created in your Supabase database yet. You need to run a one-time SQL setup.</p>
                {setupSql ? (
                  <div>
                    <p className="text-xs text-amber-600 font-medium mb-2">Copy this SQL and paste it in your Supabase Dashboard → SQL Editor → click &quot;Run&quot;:</p>
                    <pre className="bg-white border border-amber-200 rounded-lg p-4 text-xs text-gray-700 overflow-x-auto max-h-60 overflow-y-auto whitespace-pre-wrap">{setupSql}</pre>
                    <button onClick={() => { navigator.clipboard.writeText(setupSql); setMsg({ text: "SQL copied to clipboard!", ok: true }); }} className="mt-3 text-sm font-medium bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition">
                      Copy SQL to Clipboard
                    </button>
                  </div>
                ) : (
                  <button onClick={setupDatabase} disabled={loading} className="text-sm font-medium bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50">
                    {loading ? "Checking..." : "Get Setup Instructions"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Upload Area */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-lg font-bold text-gray-900">Upload Report</h2>
              <p className="text-sm text-gray-500 mt-1">Upload an Excel file to create or update a report. All formatting is automatic.</p>
            </div>
            <button onClick={downloadTemplate} className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-200 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Template
            </button>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${dragOver ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"}`}
          >
            <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={onFileChange} className="hidden" />
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            {loading ? <p className="text-sm text-gray-500 font-medium">Processing...</p> : (
              <>
                <p className="text-sm font-semibold text-gray-700 mb-1">Drop your Excel file here or click to browse</p>
                <p className="text-xs text-gray-400">Supports .xlsx and .xls files</p>
              </>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[["1. Download Template", "Get the Excel template with all sheets pre-formatted"], ["2. Fill In Data", "Add your report data in each sheet — just fill the cells"], ["3. Upload & Publish", "Upload the filled file and click Publish — done!"]].map(([t, d]) => (
              <div key={t} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-sm font-semibold text-gray-800 mb-1">{t}</p>
                <p className="text-xs text-gray-500">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PREVIEW ── */}
        {preview && (
          <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-sm mb-8 overflow-hidden">
            {/* Preview Header Bar */}
            <div className="bg-emerald-50 border-b border-emerald-200 px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                <h2 className="font-heading text-lg font-bold text-gray-900">Preview</h2>
                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">How your report will look</span>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setPreview(null)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition">Cancel</button>
                <button onClick={publish} disabled={loading} className="text-sm text-white font-semibold bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition disabled:opacity-50">
                  {loading ? "Publishing..." : reports.find(r => r.slug === preview.slug) ? "Update Report" : "Publish Report"}
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Report Header Preview */}
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-semibold text-gray-400">{preview.code}</span>
                    {preview.badge && <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">{preview.badge}</span>}
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded">{preview.cat}</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">{preview.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{preview.overview || preview.desc}</p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[["Market Size", preview.size], ["CAGR", preview.cagr], ["Base Year", preview.baseYear], ["Forecast", preview.period]].map(([l, v]) => (
                      <div key={l} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <p className="text-[9px] font-bold text-gray-400 tracking-wider uppercase mb-1">{l}</p>
                        <p className={`text-base font-bold ${l === "CAGR" ? "text-emerald-600" : "text-gray-800"}`}>{v || "—"}</p>
                      </div>
                    ))}
                  </div>

                  {/* Image Upload / Preview */}
                  <div className="rounded-xl overflow-hidden border border-gray-200 relative group">
                    {preview.img ? (
                      <>
                        <img src={preview.img} alt={preview.title} className="w-full h-48 sm:h-56 object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <button
                            onClick={(e) => { e.stopPropagation(); imgRef.current?.click(); }}
                            className="bg-white text-gray-800 text-sm font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                          >
                            Change Image
                          </button>
                        </div>
                      </>
                    ) : (
                      <div
                        onClick={(e) => { e.stopPropagation(); imgRef.current?.click(); }}
                        className="h-48 sm:h-56 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
                      >
                        <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="text-sm font-medium text-gray-400">Click to upload a cover image</p>
                        <p className="text-xs text-gray-300 mt-1">Or add an image URL in the Excel file</p>
                      </div>
                    )}
                    <input ref={imgRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e.target.files?.[0])} className="hidden" />
                  </div>
                </div>

                {/* Pricing Preview */}
                <div className="bg-white rounded-xl border-2 border-emerald-200 p-5">
                  <h4 className="font-heading text-sm font-bold text-gray-900 mb-4">Pricing Preview</h4>
                  {[["Single User", preview.price, "1 user"], ["Multi User", (preview.price || 0) + 1000, "Up to 5 users"], ["Enterprise", (preview.price || 0) + 2500, "Unlimited + Excel"]].map(([name, price, desc], i) => (
                    <div key={name} className={`p-3 rounded-lg mb-2 border ${i === 0 ? "border-emerald-200 bg-emerald-50" : "border-gray-100"}`}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-800">{name}</span>
                        <span className="text-sm font-bold text-emerald-600">${price?.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tab Preview */}
              <div className="border-t border-gray-100 pt-6">
                <div className="flex gap-1 mb-6 border-b border-gray-100 overflow-x-auto">
                  {[
                    { k: "overview", l: "Overview" },
                    ...(preview.esgContent ? [{ k: "esg", l: "ESG & GRI Analysis" }] : []),
                    { k: "toc", l: "Table of Contents" },
                    { k: "segments", l: "Segmentation" },
                    { k: "companies", l: "Key Companies" },
                    { k: "data", l: "Data Summary" },
                  ].map(tab => (
                    <button key={tab.k} onClick={() => setPreviewTab(tab.k)}
                      className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition ${previewTab === tab.k ? "border-emerald-600 text-emerald-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
                      {tab.l}
                    </button>
                  ))}
                </div>

                {/* Overview Tab */}
                {previewTab === "overview" && (
                  <div className="space-y-6">
                    {preview.overview && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-2">Overview</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{preview.overview}</p>
                      </div>
                    )}
                    {preview.keyTakeaways?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-2">Key Takeaways</h4>
                        <ul className="space-y-2">
                          {preview.keyTakeaways.map((t, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-600"><span className="text-emerald-500 mt-0.5">&#10003;</span>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {preview.drivers?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Market Drivers</h4>
                        <div className="space-y-2">
                          {preview.drivers.map((d, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-800">{d.title}</span>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{d.impact}</span>
                              </div>
                              <p className="text-xs text-gray-400">{d.geo} &middot; {d.timeline}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {preview.restraints?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Market Restraints</h4>
                        <div className="space-y-2">
                          {preview.restraints.map((d, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-800">{d.title}</span>
                                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">{d.impact}</span>
                              </div>
                              <p className="text-xs text-gray-400">{d.geo} &middot; {d.timeline}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {preview.analysisContent?.faqs?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">FAQs</h4>
                        <div className="space-y-2">
                          {preview.analysisContent.faqs.map((f, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                              <p className="text-sm font-medium text-gray-800 mb-1">{f.q}</p>
                              <p className="text-xs text-gray-500">{f.a}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {preview.developments?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Recent Developments</h4>
                        <div className="space-y-2">
                          {preview.developments.map((d, i) => (
                            <div key={i} className="flex gap-3 text-sm">
                              <span className="text-xs font-semibold text-gray-400 whitespace-nowrap min-w-[100px]">{d.date}</span>
                              <span className="text-gray-600">{d.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ESG Tab */}
                {previewTab === "esg" && preview.esgContent && (
                  <div className="space-y-6">
                    {preview.esgContent.subtitle && <p className="text-xs text-gray-400 font-medium">{preview.esgContent.subtitle}</p>}
                    {preview.esgContent.griFramework?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">GRI Framework Alignment</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead><tr className="bg-gray-50"><th className="text-left p-2 font-semibold text-gray-600">Series</th><th className="text-left p-2 font-semibold text-gray-600">Covers</th><th className="text-left p-2 font-semibold text-gray-600">Stds</th><th className="text-left p-2 font-semibold text-gray-600">Relevance</th></tr></thead>
                            <tbody>{preview.esgContent.griFramework.map((g, i) => (
                              <tr key={i} className="border-t border-gray-100"><td className="p-2 font-medium text-gray-800">{g.series}</td><td className="p-2 text-gray-500">{g.covers}</td><td className="p-2 text-gray-500">{g.stds}</td><td className="p-2 text-gray-500">{g.relevance}</td></tr>
                            ))}</tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {preview.esgContent.regulatoryDrivers?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Regulatory Drivers</h4>
                        <div className="flex flex-wrap gap-2">
                          {preview.esgContent.regulatoryDrivers.map((r, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex-1 min-w-[200px]">
                              <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded ${r.color}`}>{r.tag}</span>
                              <p className="text-xs text-gray-500 mt-2">{r.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {preview.esgContent.materialRisks?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Material ESG Risks</h4>
                        <div className="space-y-2">
                          {preview.esgContent.materialRisks.map((r, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-800">{r.risk}</span>
                                <span className={`text-[10px] text-white font-bold px-2 py-0.5 rounded ${r.levelColor}`}>{r.level}</span>
                                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{r.pillar}</span>
                              </div>
                              <p className="text-xs text-gray-500">{r.exposure}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {preview.esgContent.benchmarks?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Industry Benchmarks</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {preview.esgContent.benchmarks.map((b, i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100 text-center">
                              <p className="text-lg font-bold text-emerald-600">{b.value}</p>
                              <p className="text-xs font-medium text-gray-600">{b.label}</p>
                              <p className="text-[10px] text-gray-400 mt-0.5">{b.unit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TOC Tab */}
                {previewTab === "toc" && (
                  <div>
                    {preview.toc?.length > 0 ? (
                      <div className="space-y-1">
                        {preview.toc.map((entry, i) => {
                          const isSection = entry.startsWith("§");
                          const isSubItem = /^\d+\.\d+/.test(entry);
                          return (
                            <div key={i} className={`${isSection ? "mt-4 mb-2" : ""}`}>
                              <p className={`text-sm ${isSection ? "font-bold text-emerald-700 uppercase tracking-wide text-xs" : isSubItem ? "text-gray-500 pl-6" : "font-medium text-gray-800 pl-2"}`}>
                                {entry}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : <p className="text-sm text-gray-400 italic">No TOC entries — add them in the &quot;TOC&quot; sheet</p>}
                  </div>
                )}

                {/* Segments Tab */}
                {previewTab === "segments" && (
                  <div className="space-y-6">
                    {preview.segmentTables && Object.keys(preview.segmentTables).length > 0 ? (
                      Object.entries(preview.segmentTables).map(([key, rows]) => (
                        <div key={key}>
                          <h4 className="text-sm font-bold text-gray-800 mb-3 capitalize">By {key === "rigType" ? "Segment" : key}</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead><tr className="bg-gray-50"><th className="text-left p-3 font-semibold text-gray-600">Segment</th><th className="text-left p-3 font-semibold text-gray-600">Market Share</th><th className="text-left p-3 font-semibold text-gray-600">CAGR</th><th className="text-left p-3 font-semibold text-gray-600">Tag</th></tr></thead>
                              <tbody>{rows.map((row, i) => (
                                <tr key={i} className="border-t border-gray-100">
                                  <td className="p-3 font-medium text-gray-800">{row.name}</td>
                                  <td className="p-3 text-gray-600">{row.share}</td>
                                  <td className="p-3 text-emerald-600 font-medium">{row.cagr}</td>
                                  <td className="p-3">{row.tag && <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${row.tag === "Largest" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}>{row.tag}</span>}</td>
                                </tr>
                              ))}</tbody>
                            </table>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">Segments</h4>
                        <div className="flex flex-wrap gap-2">
                          {(preview.segments || []).map((s, i) => <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">{s}</span>)}
                        </div>
                      </div>
                    )}
                    {preview.regionTable?.length > 0 && (
                      <div>
                        <h4 className="text-sm font-bold text-gray-800 mb-3">By Region</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead><tr className="bg-gray-50"><th className="text-left p-3 font-semibold text-gray-600">Region</th><th className="text-left p-3 font-semibold text-gray-600">Share</th><th className="text-left p-3 font-semibold text-gray-600">CAGR</th><th className="text-left p-3 font-semibold text-gray-600">Key Factors</th></tr></thead>
                            <tbody>{preview.regionTable.map((r, i) => (
                              <tr key={i} className="border-t border-gray-100">
                                <td className="p-3 font-medium text-gray-800">{r.name}</td>
                                <td className="p-3 text-gray-600">{r.share}</td>
                                <td className="p-3 text-emerald-600 font-medium">{r.cagr}</td>
                                <td className="p-3 text-xs text-gray-500">{r.factors}</td>
                              </tr>
                            ))}</tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Companies Tab */}
                {previewTab === "companies" && (
                  <div>
                    {preview.companyTable?.length > 0 ? (
                      <div className="grid gap-3">
                        {preview.companyTable.map((c, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-4">
                            <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-emerald-600">{c.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-bold text-gray-800">{c.name}</h5>
                              <p className="text-xs text-gray-400 mt-0.5">{c.hq}</p>
                              <p className="text-xs text-gray-500 mt-1">{c.capabilities}</p>
                            </div>
                            {preview.domains?.[i] && <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-1 rounded">{preview.domains[i]}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(preview.companies || []).map((c, i) => <span key={i} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">{c}</span>)}
                      </div>
                    )}
                  </div>
                )}

                {/* Data Summary Tab */}
                {previewTab === "data" && (
                  <div className="space-y-3">
                    <PreviewSection title="Description" count={preview.desc ? 1 : 0} />
                    <PreviewSection title="Overview" count={preview.overview ? 1 : 0} />
                    <PreviewSection title="Cover Image" count={preview.img ? 1 : 0} />
                    <PreviewSection title="Segments (Primary)" count={preview.segments?.length || 0} />
                    <PreviewSection title="Segments (Technology)" count={preview.segmentsByTech?.length || 0} />
                    <PreviewSection title="Segments (Application)" count={preview.segmentsByApp?.length || 0} />
                    <PreviewSection title="Segment Tables" count={Object.keys(preview.segmentTables || {}).length} extra="tables" />
                    <PreviewSection title="Companies" count={preview.companies?.length || 0} />
                    <PreviewSection title="Company Profiles" count={preview.companyTable?.length || 0} />
                    <PreviewSection title="Regions" count={preview.regions?.length || 0} />
                    <PreviewSection title="Region Details" count={preview.regionTable?.length || 0} />
                    <PreviewSection title="Drivers" count={preview.drivers?.length || 0} />
                    <PreviewSection title="Restraints" count={preview.restraints?.length || 0} />
                    <PreviewSection title="Key Takeaways" count={preview.keyTakeaways?.length || 0} />
                    <PreviewSection title="Analysis Sections" count={Object.keys(preview.analysisContent || {}).filter(k => k !== "faqs" && k !== "scope").length} />
                    <PreviewSection title="FAQs" count={preview.analysisContent?.faqs?.length || 0} />
                    <PreviewSection title="Scope Fields" count={Object.keys(preview.analysisContent?.scope || {}).length} />
                    <PreviewSection title="Developments" count={preview.developments?.length || 0} />
                    <PreviewSection title="TOC Entries" count={preview.toc?.length || 0} />
                    <PreviewSection title="ESG Content" count={preview.esgContent ? Object.keys(preview.esgContent).length : 0} extra="sections" />
                    {preview.esgContent && (
                      <div className="pl-6 space-y-1">
                        <PreviewSection title="GRI Framework" count={preview.esgContent.griFramework?.length || 0} small />
                        <PreviewSection title="Regulatory Drivers" count={preview.esgContent.regulatoryDrivers?.length || 0} small />
                        <PreviewSection title="Material Risks" count={preview.esgContent.materialRisks?.length || 0} small />
                        <PreviewSection title="Solutions" count={preview.esgContent.solutions?.length || 0} small />
                        <PreviewSection title="KPIs" count={preview.esgContent.kpis?.length || 0} small />
                        <PreviewSection title="Investor Landscape" count={preview.esgContent.investorLandscape?.length || 0} small />
                        <PreviewSection title="Benchmarks" count={preview.esgContent.benchmarks?.length || 0} small />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Existing Reports */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-1">Published Reports</h2>
          <p className="text-sm text-gray-500 mb-6">{reports.length} report{reports.length !== 1 ? "s" : ""} in database</p>

          {reports.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
              <p className="text-sm font-medium">No reports yet</p>
              <p className="text-xs mt-1">Upload an Excel file or seed existing reports to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(r => (
                <div key={r.slug} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{r.title}</h3>
                      {r.badge && <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded">{r.badge}</span>}
                      <span className="text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">{r.cat}</span>
                      {r.published ? (
                        <span className="text-[10px] font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded">Live</span>
                      ) : (
                        <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Draft</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{r.slug} &middot; {r.code} &middot; {r.size} &middot; CAGR {r.cagr}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <a href={`/reports/${r.slug}`} target="_blank" className="text-xs text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition">View</a>
                    <button onClick={() => deleteReport(r.slug)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        </>)}

        {/* ══════ INSIGHTS TAB ══════ */}
        {cmsTab === "insights" && (<>

        {/* Insight Upload Area */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-lg font-bold text-gray-900">Upload Insight</h2>
              <p className="text-sm text-gray-500 mt-1">Upload an Excel file to create or update an insight article.</p>
            </div>
            <button onClick={downloadInsightTemplate} className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-gray-200 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download Insight Template
            </button>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleInsightFile(e.dataTransfer.files?.[0]); }}
            onClick={() => insightFileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${dragOver ? "border-emerald-400 bg-emerald-50" : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"}`}
          >
            <input ref={insightFileRef} type="file" accept=".xlsx,.xls" onChange={(e) => handleInsightFile(e.target.files?.[0])} className="hidden" />
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
            </div>
            {loading ? <p className="text-sm text-gray-500 font-medium">Processing...</p> : (
              <>
                <p className="text-sm font-semibold text-gray-700 mb-1">Drop your Insight Excel file here or click to browse</p>
                <p className="text-xs text-gray-400">Supports .xlsx and .xls files</p>
              </>
            )}
          </div>
        </div>

        {/* Insight Preview */}
        {insightPreview && (
          <div className="bg-white rounded-2xl border-2 border-sky-200 shadow-sm mb-8 overflow-hidden">
            <div className="bg-sky-50 border-b border-sky-200 px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-sky-500 rounded-full animate-pulse" />
                <h2 className="font-heading text-lg font-bold text-gray-900">Insight Preview</h2>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setInsightPreview(null)} className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition">Cancel</button>
                <button onClick={publishInsight} disabled={loading} className="text-sm text-white font-semibold bg-sky-600 hover:bg-sky-700 px-6 py-2 rounded-lg transition disabled:opacity-50">
                  {loading ? "Publishing..." : insights.find(i => i.slug === insightPreview.slug) ? "Update Insight" : "Publish Insight"}
                </button>
              </div>
            </div>
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-[10px] font-bold tracking-wider uppercase ${insightPreview.cat === "TRENDS" ? "text-emerald-600" : insightPreview.cat === "DATA" ? "text-sky-600" : "text-amber-600"}`}>{insightPreview.cat}</span>
                  <span className="text-xs text-gray-400">{insightPreview.date}</span>
                  <span className="text-xs text-gray-400">{insightPreview.read_time} read</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">{insightPreview.title}</h3>
                {insightPreview.subtitle && <p className="text-sm text-gray-500 mb-3">{insightPreview.subtitle}</p>}
                <p className="text-sm text-gray-600 leading-relaxed">{insightPreview.summary}</p>
              </div>
              {insightPreview.img && (
                <div className="rounded-xl overflow-hidden border border-gray-200 mb-6">
                  <img src={insightPreview.img} alt={insightPreview.title} className="w-full h-48 object-cover" />
                </div>
              )}
              {insightPreview.key_takeaways?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-2">Key Takeaways</h4>
                  <ul className="space-y-1">
                    {insightPreview.key_takeaways.map((t, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600"><span className="text-emerald-500 mt-0.5">&#10003;</span>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
              {insightPreview.sections?.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-800 mb-3">Sections ({insightPreview.sections.length})</h4>
                  <div className="space-y-3">
                    {insightPreview.sections.map((s, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <h5 className="text-sm font-semibold text-gray-800 mb-1">{s.heading}</h5>
                        <p className="text-xs text-gray-500 line-clamp-2">{s.body}</p>
                        {s.pullQuote && <p className="text-xs text-sky-600 italic mt-2 border-l-2 border-sky-300 pl-2">&ldquo;{s.pullQuote}&rdquo;</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {insightPreview.tags?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {insightPreview.tags.map(t => <span key={t} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{t}</span>)}
                    </div>
                  </div>
                )}
                {insightPreview.related?.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2">Related Slugs</h4>
                    <div className="flex flex-wrap gap-1">
                      {insightPreview.related.map(s => <span key={s} className="text-[11px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Existing Insights */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <h2 className="font-heading text-lg font-bold text-gray-900 mb-1">Published Insights</h2>
          <p className="text-sm text-gray-500 mb-6">{insights.length} insight{insights.length !== 1 ? "s" : ""} in database</p>

          {insights.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              <p className="text-sm font-medium">No insights yet</p>
              <p className="text-xs mt-1">Upload an Excel file or seed existing insights to get started</p>
            </div>
          ) : (
            <div className="space-y-3">
              {insights.map(i => (
                <div key={i.slug} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition group">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-800 truncate">{i.title}</h3>
                      <span className={`text-[10px] font-bold tracking-wider uppercase ${i.cat === "TRENDS" ? "text-emerald-600" : i.cat === "DATA" ? "text-sky-600" : "text-amber-600"}`}>{i.cat}</span>
                      {i.featured && <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded">Featured</span>}
                      {i.published ? (
                        <span className="text-[10px] font-medium bg-green-50 text-green-600 px-2 py-0.5 rounded">Live</span>
                      ) : (
                        <span className="text-[10px] font-medium bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Draft</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{i.slug} &middot; {i.date} &middot; {i.read_time}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                    <a href={`/insights/${i.slug}`} target="_blank" className="text-xs text-emerald-600 hover:text-emerald-700 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-50 transition">View</a>
                    <button onClick={() => deleteInsight(i.slug)} className="text-xs text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        </>)}

        <p className="text-center text-xs text-gray-400 mt-8 mb-4">MindEarth CMS &middot; Upload Excel &rarr; Auto-format &rarr; Publish</p>
      </div>
    </div>
  );
}

function PreviewSection({ title, count, extra, small }) {
  const ok = count > 0;
  return (
    <div className={`flex items-center gap-2 ${small ? "py-0.5" : "py-1"}`}>
      <span className={`w-5 h-5 rounded-full flex items-center justify-center ${ok ? "bg-emerald-100" : "bg-gray-100"}`}>
        {ok ? (
          <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        ) : (
          <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
        )}
      </span>
      <span className={`${small ? "text-xs" : "text-sm"} ${ok ? "text-gray-700 font-medium" : "text-gray-400"}`}>{title}</span>
      <span className={`text-xs ${ok ? "text-emerald-600" : "text-gray-300"}`}>{count} {extra || "items"}</span>
    </div>
  );
}
