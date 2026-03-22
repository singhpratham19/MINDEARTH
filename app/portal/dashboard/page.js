"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const purchasedReports = [
  { title: "India Renewable Energy Market 2026", code: "ME-ENR-042", date: "Mar 10, 2026", status: "Ready", format: "PDF + Excel" },
  { title: "Global Carbon Credit Trading Market", code: "ME-ENV-028", date: "Feb 22, 2026", status: "Ready", format: "PDF" },
  { title: "Green Finance Market", code: "ME-FIN-008", date: "Jan 15, 2026", status: "Processing", format: "PDF + Excel" },
];

const recentActivity = [
  { action: "Downloaded", item: "India Renewable Energy Market 2026 (PDF)", time: "2 hours ago" },
  { action: "Viewed", item: "Carbon Credit Trading — Executive Summary", time: "1 day ago" },
  { action: "Requested", item: "Custom ESG Scorecard — Automotive Sector", time: "3 days ago" },
  { action: "Updated", item: "Green Finance Market — Q1 2026 Addendum", time: "1 week ago" },
];

const sidebarLinks = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "My Reports", icon: "file" },
  { label: "Data Models", icon: "database" },
  { label: "Custom Research", icon: "search" },
  { label: "Analyst Chat", icon: "chat" },
  { label: "Billing", icon: "card" },
  { label: "Settings", icon: "settings" },
];

function SidebarIcon({ icon }) {
  const icons = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8M10 9H8" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
    chat: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></>,
    card: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><path d="M1 10h22" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
  };
  return <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>{icons[icon]}</svg>;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)] bg-brand-light">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? "w-60" : "w-16"} bg-white border-r border-brand-border shrink-0 transition-all duration-300 hidden md:block`}>
          <div className="p-4 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0B6E4F] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">JS</span>
              </div>
              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-[#0F172A] truncate">John Smith</p>
                  <p className="text-[11px] text-brand-muted truncate">john@acmecorp.com</p>
                </div>
              )}
            </div>
          </div>

          <nav className="p-3 space-y-0.5">
            {sidebarLinks.map((link) => (
              <button
                key={link.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                  link.active
                    ? "bg-[#E6F4EF] text-[#0B6E4F]"
                    : "text-[#475569] hover:bg-brand-light hover:text-[#0F172A]"
                }`}
              >
                <SidebarIcon icon={link.icon} />
                {sidebarOpen && <span>{link.label}</span>}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 w-60 p-3 border-t border-brand-border">
            <Link href="/portal" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#475569] hover:bg-brand-light hover:text-red-600 transition-colors">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              {sidebarOpen && <span>Sign Out</span>}
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-heading text-[26px] font-bold text-[#0F172A] mb-1">Welcome back, John</h1>
              <p className="text-[14px] text-[#475569]">Here&apos;s an overview of your ESG research activity.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/reports" className="bg-[#0B6E4F] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200">Browse Reports</Link>
              <Link href="/contact" className="border border-brand-border text-[#0F172A] text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-white transition-colors duration-200">Contact Analyst</Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Reports Purchased", value: "3", sub: "2 ready for download", color: "text-[#0B6E4F]" },
              { label: "Data Models", value: "2", sub: "Excel + API access", color: "text-[#0A2540]" },
              { label: "Custom Requests", value: "1", sub: "In progress", color: "text-amber-600" },
              { label: "Analyst Sessions", value: "4", sub: "Next: Mar 25, 2026", color: "text-[#0B6E4F]" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-brand-border p-5">
                <p className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider mb-2">{stat.label}</p>
                <p className={`font-heading text-[28px] font-bold ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-[12px] text-[#475569]">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Purchased Reports */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-brand-border">
              <div className="flex items-center justify-between p-5 border-b border-brand-border">
                <h2 className="font-heading text-[16px] font-bold text-[#0F172A]">Purchased Reports</h2>
                <span className="text-[12px] text-[#0B6E4F] font-semibold cursor-pointer hover:underline">View All</span>
              </div>
              <div className="divide-y divide-brand-border">
                {purchasedReports.map((report) => (
                  <div key={report.code} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-brand-light/50 transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium text-brand-muted">{report.code}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          report.status === "Ready" ? "bg-[#E6F4EF] text-[#0B6E4F]" : "bg-amber-50 text-amber-700"
                        }`}>{report.status}</span>
                      </div>
                      <p className="text-[14px] font-semibold text-[#0F172A] truncate">{report.title}</p>
                      <p className="text-[11px] text-brand-muted mt-0.5">Purchased {report.date} &middot; {report.format}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {report.status === "Ready" && (
                        <button className="bg-[#0B6E4F] text-white text-[11px] font-semibold px-4 py-2 rounded-lg hover:bg-[#095C42] transition-colors duration-200 flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          Download
                        </button>
                      )}
                      <button className="border border-brand-border text-[#475569] text-[11px] font-semibold px-4 py-2 rounded-lg hover:bg-brand-light transition-colors duration-200">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-brand-border">
              <div className="p-5 border-b border-brand-border">
                <h2 className="font-heading text-[16px] font-bold text-[#0F172A]">Recent Activity</h2>
              </div>
              <div className="p-5 space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#0B6E4F] mt-2 shrink-0" />
                    <div>
                      <p className="text-[13px] text-[#0F172A]"><span className="font-semibold">{item.action}</span> {item.item}</p>
                      <p className="text-[11px] text-brand-muted mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[
              { icon: "📊", label: "Request Custom Research", desc: "Get tailored ESG analysis" },
              { icon: "💬", label: "Chat with Analyst", desc: "Connect with your team" },
              { icon: "📥", label: "Download Data Models", desc: "Excel & API exports" },
              { icon: "📅", label: "Schedule Consultation", desc: "Book a strategy session" },
            ].map((action) => (
              <button key={action.label} className="bg-white rounded-xl border border-brand-border p-5 text-left hover:border-[#0B6E4F]/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group">
                <span className="text-xl mb-3 block">{action.icon}</span>
                <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0B6E4F] transition-colors mb-1">{action.label}</p>
                <p className="text-[11px] text-brand-muted">{action.desc}</p>
              </button>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
