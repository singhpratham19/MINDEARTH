"use client";
import { useState, useEffect } from "react";
import { reports } from "@/lib/data";

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedReport, setSelectedReport] = useState(reports[0]?.slug || "");
  const [fileType, setFileType] = useState("sample_pdf");
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    e.preventDefault();
    setAuthed(true);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reports", {
        headers: { Authorization: `Bearer ${password}` },
      });
      const json = await res.json();
      if (json.error) { setAuthed(false); return; }
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput?.files?.[0];
    if (!file) { setUploadMsg("Please select a file"); return; }

    setUploading(true);
    setUploadMsg("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("reportSlug", selectedReport);
    formData.append("fileType", fileType);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${password}` },
        body: formData,
      });
      const json = await res.json();
      setUploadMsg(json.error || json.message);
      if (json.success) {
        fileInput.value = "";
        fetchData();
      }
    } catch (err) {
      setUploadMsg("Upload failed");
    }
    setUploading(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
        <form onSubmit={login} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border border-gray-200">
          <div className="w-12 h-12 rounded-xl bg-[#0B6E4F] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h1 className="text-lg font-bold text-center text-gray-900 mb-1">Admin Panel</h1>
          <p className="text-xs text-gray-400 text-center mb-6">MindEarth Content Management</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Admin password" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm mb-3 focus:outline-none focus:border-emerald-400" />
          <button type="submit" className="w-full bg-[#0B6E4F] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#095C42] transition">Login</button>
        </form>
      </div>
    );
  }

  const tabs = [
    { k: "upload", l: "Upload Files", icon: "↑" },
    { k: "leads", l: "Sample Requests", icon: "📋" },
    { k: "inquiries", l: "Inquiries", icon: "💬" },
    { k: "contacts", l: "Contacts", icon: "📧" },
    { k: "subscribers", l: "Subscribers", icon: "📰" },
    { k: "files", l: "Report Files", icon: "📁" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0A2540] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0B6E4F] flex items-center justify-center text-xs font-bold">ME</div>
          <span className="font-semibold text-sm">MindEarth Admin</span>
        </div>
        <button onClick={() => { setAuthed(false); setPassword(""); }} className="text-xs text-white/60 hover:text-white">Logout</button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-0 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.k} onClick={() => setActiveTab(t.k)} className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition ${activeTab === t.k ? "text-emerald-600 border-emerald-500" : "text-gray-400 border-transparent hover:text-gray-600"}`}>
            <span className="mr-1.5">{t.icon}</span>{t.l}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* Upload Tab */}
        {activeTab === "upload" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-1">Upload Report Files</h2>
            <p className="text-xs text-gray-400 mb-6">Upload PDFs, sample reports, Excel data models, and white papers</p>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Select Report</label>
                <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400">
                  {reports.map(r => <option key={r.slug} value={r.slug}>{r.title} ({r.code})</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">File Type</label>
                <select value={fileType} onChange={(e) => setFileType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-400">
                  <option value="sample_pdf">Sample PDF (free download)</option>
                  <option value="full_pdf">Full Report PDF (paid)</option>
                  <option value="excel">Excel Data Model</option>
                  <option value="white_paper">White Paper</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Choose File</label>
                <input type="file" accept=".pdf,.xlsx,.xls,.csv" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:bg-emerald-50 file:text-emerald-700 file:text-xs file:font-semibold" />
              </div>

              <button type="submit" disabled={uploading} className="bg-[#0B6E4F] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#095C42] transition disabled:opacity-50">
                {uploading ? "Uploading..." : "Upload File"}
              </button>

              {uploadMsg && <p className={`text-sm ${uploadMsg.includes("success") ? "text-emerald-600" : "text-red-500"}`}>{uploadMsg}</p>}
            </form>
          </div>
        )}

        {/* Sample Requests */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Sample PDF Requests</h2>
              <p className="text-xs text-gray-400">{data?.sampleRequests?.length || 0} total requests</p>
            </div>
            {loading ? <p className="p-6 text-gray-400 text-sm">Loading...</p> : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500">
                    <tr><th className="px-4 py-2.5 text-left">Name</th><th className="px-4 py-2.5 text-left">Email</th><th className="px-4 py-2.5 text-left">Company</th><th className="px-4 py-2.5 text-left">Report</th><th className="px-4 py-2.5 text-left">Date</th></tr>
                  </thead>
                  <tbody>
                    {(data?.sampleRequests || []).map((r, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-2.5 font-medium text-gray-800">{r.name}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.email}</td>
                        <td className="px-4 py-2.5 text-gray-600">{r.company}</td>
                        <td className="px-4 py-2.5 text-gray-600 max-w-[200px] truncate">{r.report_title}</td>
                        <td className="px-4 py-2.5 text-gray-400 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                    {(!data?.sampleRequests?.length) && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No sample requests yet</td></tr>}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Inquiries */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Report Inquiries</h2>
              <p className="text-xs text-gray-400">{data?.inquiries?.length || 0} total inquiries</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="px-4 py-2.5 text-left">Name</th><th className="px-4 py-2.5 text-left">Email</th><th className="px-4 py-2.5 text-left">Type</th><th className="px-4 py-2.5 text-left">Report</th><th className="px-4 py-2.5 text-left">Message</th></tr>
                </thead>
                <tbody>
                  {(data?.inquiries || []).map((r, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-medium text-gray-800">{r.name}</td>
                      <td className="px-4 py-2.5 text-gray-600">{r.email}</td>
                      <td className="px-4 py-2.5"><span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{r.inquiry_type}</span></td>
                      <td className="px-4 py-2.5 text-gray-600 max-w-[180px] truncate">{r.report_title}</td>
                      <td className="px-4 py-2.5 text-gray-500 max-w-[200px] truncate">{r.message}</td>
                    </tr>
                  ))}
                  {(!data?.inquiries?.length) && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No inquiries yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contacts */}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Contact Form Submissions</h2>
              <p className="text-xs text-gray-400">{data?.contacts?.length || 0} total messages</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="px-4 py-2.5 text-left">Name</th><th className="px-4 py-2.5 text-left">Email</th><th className="px-4 py-2.5 text-left">Company</th><th className="px-4 py-2.5 text-left">Subject</th><th className="px-4 py-2.5 text-left">Message</th></tr>
                </thead>
                <tbody>
                  {(data?.contacts || []).map((r, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2.5 font-medium text-gray-800">{r.name}</td>
                      <td className="px-4 py-2.5 text-gray-600">{r.email}</td>
                      <td className="px-4 py-2.5 text-gray-600">{r.company}</td>
                      <td className="px-4 py-2.5 text-gray-600">{r.subject}</td>
                      <td className="px-4 py-2.5 text-gray-500 max-w-[250px] truncate">{r.message}</td>
                    </tr>
                  ))}
                  {(!data?.contacts?.length) && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No contact submissions yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Subscribers */}
        {activeTab === "subscribers" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Newsletter Subscribers</h2>
              <p className="text-xs text-gray-400">{data?.subscribers?.length || 0} subscribers</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="px-4 py-2.5 text-left">Email</th><th className="px-4 py-2.5 text-left">Subscribed</th></tr>
                </thead>
                <tbody>
                  {(data?.subscribers || []).map((r, i) => (
                    <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-800">{r.email}</td>
                      <td className="px-4 py-2.5 text-gray-400 text-xs">{new Date(r.subscribed_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {(!data?.subscribers?.length) && <tr><td colSpan={2} className="px-4 py-8 text-center text-gray-400">No subscribers yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Report Files Status */}
        {activeTab === "files" && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Report File Status</h2>
              <p className="text-xs text-gray-400">Track which reports have files uploaded</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs text-gray-500">
                  <tr><th className="px-4 py-2.5 text-left">Report</th><th className="px-4 py-2.5 text-center">Sample PDF</th><th className="px-4 py-2.5 text-center">Full PDF</th><th className="px-4 py-2.5 text-center">Excel</th><th className="px-4 py-2.5 text-center">White Paper</th></tr>
                </thead>
                <tbody>
                  {reports.map((r) => {
                    const f = data?.reportFiles?.find(rf => rf.report_slug === r.slug);
                    const check = (url) => url ? <span className="text-emerald-500">✓</span> : <span className="text-gray-300">—</span>;
                    return (
                      <tr key={r.slug} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-2.5"><p className="font-medium text-gray-800 text-xs">{r.title}</p><p className="text-[10px] text-gray-400">{r.code}</p></td>
                        <td className="px-4 py-2.5 text-center">{check(f?.sample_pdf_url)}</td>
                        <td className="px-4 py-2.5 text-center">{check(f?.full_pdf_url)}</td>
                        <td className="px-4 py-2.5 text-center">{check(f?.excel_url)}</td>
                        <td className="px-4 py-2.5 text-center">{check(f?.white_paper_url)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
