"use client";
import { useState } from "react";
import Link from "next/link";

function CatIcon({ type }) {
  const paths = {
    energy: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></>,
    finance: <><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" /></>,
    sustainability: <><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z" /><path d="M12 12V8" /><path d="M12 12l3 2" /></>,
    technology: <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    healthcare: <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>,
    automotive: <><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M5 17H3v-6l2-5h14l2 5v6h-2" /><path d="M5 17h10" /><path d="M9 6l1 5h4l1-5" /></>,
    agriculture: <><path d="M12 22V8" /><path d="M5 12H2a10 10 0 0020 0h-3" /><path d="M8 5.2C9 4.4 10.4 4 12 4s3 .4 4 1.2" /></>,
    manufacturing: <><path d="M2 20h20" /><path d="M5 20V8l5 4V8l5 4V4l5 4v12" /></>,
  };
  return <svg className="w-4 h-4 text-[#0B6E4F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
}

const reportCategories = [
  {
    heading: "Energy & Power",
    iconType: "energy",
    items: ["Renewable Energy", "Solar PV", "Wind Turbines", "Green Hydrogen", "Energy Storage", "Smart Grid"],
  },
  {
    heading: "Financial Services",
    iconType: "finance",
    items: ["Green Finance", "ESG Funds", "Carbon Credits", "Sustainable Bonds", "Impact Investing"],
  },
  {
    heading: "Sustainability",
    iconType: "sustainability",
    items: ["Carbon Trading", "E-Waste Recycling", "Water Treatment", "Circular Economy", "Waste Management"],
  },
  {
    heading: "Technology",
    iconType: "technology",
    items: ["Industrial Robotics", "AI & ML", "IoT Sensors", "Cleantech", "EV Battery"],
  },
  {
    heading: "Healthcare",
    iconType: "healthcare",
    items: ["Biotechnology", "Medical Devices", "Diagnostics", "Pharmaceuticals", "Digital Health"],
  },
  {
    heading: "Automotive & EV",
    iconType: "automotive",
    items: ["Electric Vehicles", "EV Charging", "Battery Recycling", "Autonomous Driving", "Connected Cars"],
  },
  {
    heading: "Agriculture",
    iconType: "agriculture",
    items: ["Precision Farming", "Organic Food", "Agri-biotech", "Irrigation Systems", "Crop Protection"],
  },
  {
    heading: "Manufacturing",
    iconType: "manufacturing",
    items: ["Green Manufacturing", "Industrial Automation", "3D Printing", "Smart Factory", "Supply Chain"],
  },
];

function SvcIcon({ type }) {
  const paths = {
    research: <><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" /></>,
    strategy: <><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></>,
    compliance: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></>,
    diligence: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M11 8v6M8 11h6" /></>,
    climate: <><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /><circle cx="12" cy="12" r="4" /></>,
    training: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></>,
  };
  return <svg className="w-[18px] h-[18px] text-[#0B6E4F] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">{paths[type]}</svg>;
}

const serviceItems = [
  { label: "ESG Market Research", href: "/services", iconType: "research" },
  { label: "ESG Strategy & Advisory", href: "/services", iconType: "strategy" },
  { label: "BRSR & Regulatory Compliance", href: "/services/brsr", iconType: "compliance" },
  { label: "ESG Due Diligence", href: "/services", iconType: "diligence" },
  { label: "Climate Risk & Carbon Accounting", href: "/services", iconType: "climate" },
  { label: "ESG Training & Capacity Building", href: "/services", iconType: "training" },
];

const links = [
  { label: "Home", href: "/" },
  { label: "Reports", href: "/reports", dropdown: "reports" },
  { label: "Services", href: "/services", dropdown: "services" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  return (
    <>
      {/* Utility bar */}
      <div className="border-b border-brand-border bg-brand-light">
        <div className="max-w-container mx-auto px-6 py-2 flex justify-between items-center text-[11px] text-brand-body">
          <div className="flex gap-5">
            <span>Pune, India | Global Operations</span>
            <span className="hidden sm:inline">hello@mindearth.co</span>
          </div>
          <Link href="/reports" className="text-brand-green font-semibold hover:underline">Free Sample ↓</Link>
        </div>
      </div>

      {/* Main nav */}
      <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-container mx-auto px-6 h-16 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 relative flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Circle */}
                <circle cx="20" cy="20" r="18" stroke="#0B6E4F" strokeWidth="1.8" fill="none" />
                {/* Globe latitude lines */}
                <ellipse cx="20" cy="20" rx="9" ry="18" stroke="#0B6E4F" strokeWidth="1.2" fill="none" />
                <path d="M4 15h32" stroke="#0B6E4F" strokeWidth="1" opacity="0.5" />
                <path d="M4 25h32" stroke="#0B6E4F" strokeWidth="1" opacity="0.5" />
                {/* Leaf accent */}
                <path d="M20 8c6 4 8 12 4 20" stroke="#0B6E4F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                <path d="M20 8c-2 6-1 12 4 20" stroke="#0B6E4F" strokeWidth="1" opacity="0.4" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div className="leading-none">
              <span className="font-heading text-[18px] font-bold text-brand-blue tracking-[-0.02em]">Mind<span className="text-brand-green">Earth</span></span>
              <span className="block text-[8.5px] font-semibold text-brand-muted tracking-[0.2em] uppercase mt-[2px]">Consultancy</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) =>
              l.dropdown ? (
                <div
                  key={l.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(l.dropdown)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link href={l.href} className={`text-[13px] font-medium transition-colors duration-200 flex items-center gap-1 ${activeDropdown === l.dropdown ? "text-brand-green" : "text-brand-body hover:text-brand-green"}`}>
                    {l.label}
                    <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === l.dropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M6 9l6 6 6-6"/></svg>
                  </Link>

                  {/* Reports mega menu */}
                  {activeDropdown === "reports" && l.dropdown === "reports" && (
                    <div className="fixed left-0 right-0 top-[calc(100%)] pt-0">
                      <div className="border-t border-brand-border bg-white shadow-xl shadow-black/8">
                        <div className="max-w-container mx-auto px-6 py-8">
                          <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                            {reportCategories.map((cat) => (
                              <div key={cat.heading}>
                                <Link href="/reports" className="text-[13px] font-bold text-brand-dark hover:text-brand-green transition-colors flex items-center gap-2 mb-3">
                                  <CatIcon type={cat.iconType} />
                                  {cat.heading} <span className="text-brand-green">»</span>
                                </Link>
                                <div className="space-y-2">
                                  {cat.items.map((item) => (
                                    <Link key={item} href="/reports" className="block text-[13px] text-brand-body hover:text-brand-green transition-colors duration-150">
                                      {item}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-brand-border mt-6 pt-4 flex justify-between items-center">
                            <Link href="/reports" className="text-[13px] font-semibold text-brand-green hover:underline">View All 300+ Reports →</Link>
                            <Link href="/contact" className="text-[13px] font-medium text-brand-body hover:text-brand-green transition-colors">Request Custom Research →</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Services dropdown */}
                  {activeDropdown === "services" && l.dropdown === "services" && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="bg-white rounded-xl border border-brand-border shadow-lg shadow-black/8 py-3 w-[300px]">
                        <p className="px-4 pb-2 text-[10px] font-semibold tracking-[0.15em] text-brand-muted uppercase">Our Services</p>
                        {serviceItems.map((s) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-brand-light transition-colors duration-150"
                          >
                            <SvcIcon type={s.iconType} />
                            <span className="text-[13px] font-medium text-brand-dark">{s.label}</span>
                          </Link>
                        ))}
                        <div className="border-t border-brand-border mt-2 pt-2 px-4">
                          <Link href="/services" className="text-[12px] font-semibold text-brand-green hover:underline">View All Services →</Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.label} href={l.href} className="text-[13px] font-medium text-brand-body hover:text-brand-green transition-colors duration-200">{l.label}</Link>
              )
            )}
          </div>

          <div className="hidden md:flex flex-1 max-w-[200px]">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search reports..." className="w-full pl-3 pr-3 py-2 text-xs bg-brand-light border border-brand-border rounded-lg outline-none focus:border-brand-green transition-all placeholder:text-brand-muted" />
          </div>

          <Link href="/portal" className="hidden sm:block bg-brand-green text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 shrink-0">
            Client Portal
          </Link>

          <button className="lg:hidden p-1.5" onClick={() => setOpen(!open)}>
            <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-brand-border bg-white px-6 py-4">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search reports..." className="w-full pl-3 pr-3 py-2.5 mb-4 text-sm bg-brand-light border border-brand-border rounded-lg outline-none focus:border-brand-green transition-all placeholder:text-brand-muted" />
            {links.map((l) =>
              l.dropdown ? (
                <div key={l.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === l.dropdown ? null : l.dropdown)}
                    className="w-full flex justify-between items-center py-3 text-sm text-brand-body border-b border-brand-light font-medium"
                  >
                    {l.label}
                    <svg className={`w-4 h-4 transition-transform ${mobileExpanded === l.dropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {mobileExpanded === l.dropdown && (
                    <div className="bg-brand-light rounded-lg mb-2 py-2">
                      {l.dropdown === "reports"
                        ? reportCategories.map((cat) => (
                            <div key={cat.heading} className="px-4 py-2">
                              <p className="text-[12px] font-bold text-brand-dark mb-1 flex items-center gap-1.5"><CatIcon type={cat.iconType} />{cat.heading}</p>
                              {cat.items.map((item) => (
                                <Link key={item} href="/reports" className="block text-[12px] text-brand-body py-1 hover:text-brand-green" onClick={() => setOpen(false)}>
                                  {item}
                                </Link>
                              ))}
                            </div>
                          ))
                        : serviceItems.map((s) => (
                            <Link key={s.label} href={s.href} className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] text-brand-body hover:text-brand-green" onClick={() => setOpen(false)}>
                              <SvcIcon type={s.iconType} />
                              {s.label}
                            </Link>
                          ))
                      }
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.label} href={l.href} className="block py-3 text-sm text-brand-body border-b border-brand-light font-medium hover:text-brand-green transition-colors" onClick={() => setOpen(false)}>{l.label}</Link>
              )
            )}
          </div>
        )}
      </nav>
    </>
  );
}
