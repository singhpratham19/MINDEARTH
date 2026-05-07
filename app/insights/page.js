"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const articles = [
  {
    slug: "esg-trends-q1-2026",
    tag: "TRENDS",
    tagLabel: "Trends",
    title: "Regulatory Acceleration Across Emerging Markets",
    desc: "A 34% increase in mandatory ESG disclosure requirements across South Asia and the Middle East is reshaping corporate reporting obligations and investor expectations.",
    date: "15 March 2026",
    read: "12 min",
    author: "Saloni Gaikwad",
    featured: true,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    topics: ["BRSR", "Regulatory", "Emerging Markets"],
  },
  {
    slug: "carbon-markets-2025",
    tag: "MARKET INTELLIGENCE",
    tagLabel: "Market Intelligence",
    title: "Carbon Markets Grow 22% YoY as Institutional Demand Accelerates",
    desc: "Voluntary carbon credit transactions reached $2.8B in 2025, driven by corporate net-zero commitments and the operationalisation of Article 6 of the Paris Agreement.",
    date: "28 February 2026",
    read: "10 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    topics: ["Carbon Credits", "Net Zero", "Climate Finance"],
  },
  {
    slug: "green-bond-outlook-2028",
    tag: "OUTLOOK",
    tagLabel: "Outlook",
    title: "Green Bond Issuance to Cross $1 Trillion by 2028",
    desc: "Asia-Pacific markets contribute 38% of new issuance volume as sovereign programmes scale and the greenium narrows for investment-grade issuers.",
    date: "10 February 2026",
    read: "15 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=800&q=80",
    topics: ["Green Bonds", "Sustainable Finance", "APAC"],
  },
  {
    slug: "brsr-mid-cap",
    tag: "ADVISORY",
    tagLabel: "Advisory",
    title: "BRSR Compliance: A Practical Framework for Indian Mid-Caps",
    desc: "Step-by-step guidance for companies navigating SEBI's BRSR mandate — with implementation templates, data architecture recommendations, and common pitfalls to avoid.",
    date: "22 January 2026",
    read: "20 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    topics: ["BRSR", "SEBI", "Disclosure"],
  },
  {
    slug: "climate-risk-emerging-markets",
    tag: "RESEARCH",
    tagLabel: "Research",
    title: "Climate Risk as Financial Risk in Emerging Markets",
    desc: "What TCFD transition means for capital allocation, sovereign risk, and corporate strategy across South Asia and Africa — and why early alignment pays.",
    date: "12 January 2026",
    read: "15 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80",
    topics: ["TCFD", "Climate Risk", "South Asia"],
  },
  {
    slug: "tnfd-biodiversity",
    tag: "OUTLOOK",
    tagLabel: "Outlook",
    title: "The Biodiversity–Finance Nexus: Why TNFD Matters Now",
    desc: "Connecting nature-related financial disclosures to investment decision-making and portfolio risk management — a primer for asset managers and corporate treasurers.",
    date: "18 December 2025",
    read: "12 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    topics: ["TNFD", "Biodiversity", "Nature Finance"],
  },
  {
    slug: "eu-csrd-multinationals",
    tag: "ADVISORY",
    tagLabel: "Advisory",
    title: "EU CSRD: Implications for Non-European Multinationals",
    desc: "How the Corporate Sustainability Reporting Directive affects global supply chains and subsidiary reporting obligations — and how to prepare for extraterritorial reach.",
    date: "5 December 2025",
    read: "18 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    topics: ["CSRD", "EU Regulation", "Supply Chain"],
  },
  {
    slug: "supply-chain-apac",
    tag: "RESEARCH",
    tagLabel: "Research",
    title: "Sustainable Supply Chain Benchmarking: APAC 2025",
    desc: "Benchmarking ESG performance across 500+ supply chain nodes in India, China, Vietnam, and Indonesia — with sector-level scorecards and improvement priorities.",
    date: "20 November 2025",
    read: "22 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    topics: ["Supply Chain", "APAC", "ESG Performance"],
  },
];

const TAG_COLORS = {
  "TRENDS":           { dot: "bg-emerald-500",  text: "text-emerald-700",  bg: "bg-emerald-50"  },
  "MARKET INTELLIGENCE": { dot: "bg-sky-500",   text: "text-sky-700",     bg: "bg-sky-50"      },
  "OUTLOOK":          { dot: "bg-violet-500",   text: "text-violet-700",  bg: "bg-violet-50"   },
  "ADVISORY":         { dot: "bg-amber-500",    text: "text-amber-700",   bg: "bg-amber-50"    },
  "RESEARCH":         { dot: "bg-rose-500",     text: "text-rose-700",    bg: "bg-rose-50"     },
};

const ALL_TAGS = ["All", "Trends", "Market Intelligence", "Outlook", "Advisory", "Research"];

const topics = [
  "BRSR & Disclosure", "Carbon Markets", "Green Finance", "Climate Risk",
  "ESG Strategy", "Sustainable Supply Chain", "Nature & Biodiversity", "Regulatory Updates",
];

export default function InsightsPage() {
  const [filter, setFilter] = useState("All");
  const [allArticles, setAllArticles] = useState(articles);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/insights")
      .then(r => r.json())
      .then(json => {
        if (json.insights && json.insights.length > 0) {
          const dbArticles = json.insights.map(i => ({
            slug: i.slug,
            tag: i.cat,
            tagLabel: i.cat?.replace(/_/g, " ") ?? i.cat,
            title: i.title,
            desc: i.summary || "",
            date: i.date || "",
            read: i.read_time || "",
            author: i.author || "MindEarth Research",
            featured: i.featured || false,
            img: i.img || "",
            topics: i.tags || [],
          }));
          setAllArticles(dbArticles);
        }
      })
      .catch(() => {});
  }, []);

  const featured = allArticles.find(a => a.featured);
  const filtered = filter === "All"
    ? allArticles.filter(a => !a.featured)
    : allArticles.filter(a => !a.featured && a.tagLabel?.toLowerCase() === filter.toLowerCase());

  const getColor = (tag) => TAG_COLORS[tag] || { dot: "bg-gray-400", text: "text-gray-600", bg: "bg-gray-50" };

  return (
    <>
      <Navbar />

      {/* ═══ EDITORIAL HEADER ═══ */}
      <section className="bg-[#0A2540] py-14 px-6 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-[11px] text-white/40 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/70">Insights</span>
          </div>
          <div className="max-w-3xl">
            <Fade>
              <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#34D399] mb-4">MindEarth Intelligence</p>
              <h1 className="font-heading text-[36px] sm:text-[46px] lg:text-[54px] font-bold text-white leading-[1.06] tracking-[-0.025em] mb-5">
                ESG Perspectives<br />& Market Intelligence
              </h1>
              <p className="text-[17px] text-white/55 leading-relaxed max-w-xl">
                Research, analysis, and advisory perspectives from the MindEarth team — covering regulatory developments, market dynamics, and emerging ESG practice across 40+ countries.
              </p>
            </Fade>
          </div>
        </div>
      </section>

      {/* ═══ FEATURED ARTICLE ═══ */}
      {featured && (
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-14">
            <Fade>
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-gray-400 mb-6">Featured Insight</p>
              <Link href={`/insights/${featured.slug}`} className="group grid lg:grid-cols-[1fr_420px] gap-0 rounded-2xl overflow-hidden border border-gray-200 hover:border-[#0A2540]/20 hover:shadow-2xl hover:shadow-black/[0.07] transition-all duration-500">
                {/* Image */}
                <div className="relative h-[320px] lg:h-auto overflow-hidden bg-gray-100 lg:order-2">
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                {/* Content */}
                <div className="p-10 lg:p-12 flex flex-col justify-center lg:order-1 border-r border-gray-100">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-md ${getColor(featured.tag).text} ${getColor(featured.tag).bg}`}>{featured.tagLabel}</span>
                    <span className="text-[12px] text-gray-400">{featured.date}</span>
                    <span className="text-gray-200">·</span>
                    <span className="text-[12px] text-gray-400">{featured.read} read</span>
                  </div>
                  <h2 className="font-heading text-[26px] sm:text-[32px] font-bold text-[#0A2540] leading-[1.15] tracking-[-0.02em] mb-4 group-hover:text-[#0B6E4F] transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-[15px] text-[#475569] leading-relaxed mb-8 max-w-md">{featured.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0A2540] flex items-center justify-center text-white text-[11px] font-bold">SG</div>
                      <span className="text-[13px] font-semibold text-[#0A2540]">{featured.author}</span>
                    </div>
                    <span className="text-[13px] font-semibold text-[#0B6E4F] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200">
                      Read article
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Fade>
          </div>
        </section>
      )}

      {/* ═══ FILTER TABS + ARTICLE GRID ═══ */}
      <section className="bg-[#F8FAFC] py-14 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Topic pills */}
          <Fade>
            <div className="flex items-center gap-2 flex-wrap mb-8 pb-8 border-b border-gray-200">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mr-2">Topics</span>
              {topics.map(t => (
                <span key={t} className="text-[12px] font-medium text-[#0A2540] bg-white border border-gray-200 px-3 py-1 rounded-full hover:border-[#0B6E4F]/40 hover:text-[#0B6E4F] cursor-pointer transition-colors">
                  {t}
                </span>
              ))}
            </div>
          </Fade>

          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-16">
            {/* Left: filter + grid */}
            <div>
              {/* Filter tabs */}
              <Fade>
                <div className="flex items-center gap-1 mb-8 border-b border-gray-200 overflow-x-auto pb-0 -mb-px">
                  {ALL_TAGS.map(t => (
                    <button
                      key={t}
                      onClick={() => setFilter(t)}
                      className={`text-[13px] font-semibold px-4 py-3 whitespace-nowrap border-b-2 transition-all duration-200 ${
                        filter === t
                          ? "border-[#0A2540] text-[#0A2540]"
                          : "border-transparent text-gray-400 hover:text-[#0A2540] hover:border-gray-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Fade>

              {/* Article list — McKinsey list style on desktop, cards on mobile */}
              <div className="mt-8 divide-y divide-gray-100">
                {filtered.map((a, i) => {
                  const c = getColor(a.tag);
                  return (
                    <Fade key={a.slug || a.title} delay={i * 0.04}>
                      <Link href={`/insights/${a.slug}`} className="group flex gap-6 py-7 hover:bg-white hover:-mx-4 hover:px-4 rounded-xl transition-all duration-300">
                        {/* Image */}
                        <div className="shrink-0 w-[140px] sm:w-[180px] h-[100px] sm:h-[120px] rounded-xl overflow-hidden bg-gray-100">
                          <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500" />
                        </div>
                        {/* Text */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2.5">
                              <div className={`flex items-center gap-1.5`}>
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                                <span className={`text-[10px] font-bold tracking-[0.18em] uppercase ${c.text}`}>{a.tagLabel}</span>
                              </div>
                              <span className="text-gray-200">·</span>
                              <span className="text-[11px] text-gray-400">{a.date}</span>
                            </div>
                            <h3 className="font-heading text-[16px] sm:text-[18px] font-bold text-[#0A2540] leading-snug tracking-[-0.01em] mb-2 group-hover:text-[#0B6E4F] transition-colors duration-200">
                              {a.title}
                            </h3>
                            <p className="text-[13px] text-[#475569] leading-relaxed line-clamp-2 hidden sm:block">{a.desc}</p>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#0A2540] flex items-center justify-center text-white text-[9px] font-bold shrink-0">SG</div>
                              <span className="text-[12px] text-gray-500">{a.author}</span>
                              <span className="text-gray-300 text-[11px]">·</span>
                              <span className="text-[12px] text-gray-400">{a.read} read</span>
                            </div>
                            <span className="text-[12px] font-semibold text-[#0B6E4F] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              Read <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Fade>
                  );
                })}
                {filtered.length === 0 && (
                  <div className="py-20 text-center text-gray-400 text-sm">No articles in this category yet.</div>
                )}
              </div>
            </div>

            {/* Right: sidebar */}
            <aside className="hidden lg:block mt-14">
              <div className="sticky top-24 space-y-8">

                {/* About this research */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-3">About This Research</p>
                  <p className="text-[13px] text-[#475569] leading-relaxed">
                    MindEarth Intelligence covers ESG regulatory developments, market dynamics, and advisory perspectives — grounded in primary data and on-the-ground expertise across 40+ countries.
                  </p>
                </div>

                {/* Newsletter */}
                <div className="bg-[#0A2540] rounded-xl p-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#34D399] mb-3">ESG Intelligence Digest</p>
                  <h3 className="font-heading text-[15px] font-bold text-white mb-2 leading-snug">Monthly research — straight to your inbox</h3>
                  <p className="text-[12px] text-white/50 leading-relaxed mb-4">Regulatory updates, market intelligence, and proprietary analysis. No spam.</p>
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2.5 text-[13px] bg-white/10 border border-white/15 rounded-lg text-white mb-2.5 outline-none placeholder:text-white/30 focus:border-[#0B6E4F] transition-colors"
                  />
                  <button className="w-full bg-[#0B6E4F] text-white text-[13px] font-semibold py-2.5 rounded-lg hover:bg-[#095C42] transition-colors">
                    Subscribe
                  </button>
                </div>

                {/* Related services */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">Related Services</p>
                  <div className="space-y-3">
                    {[
                      { label: "ESG & Sustainability Consultancy", href: "/services/esg-consultancy" },
                      { label: "Market Research Reports", href: "/services/market-research" },
                      { label: "BRSR Advisory", href: "/services/brsr" },
                    ].map(s => (
                      <Link key={s.label} href={s.href} className="flex items-center justify-between group">
                        <span className="text-[13px] font-medium text-[#0A2540] group-hover:text-[#0B6E4F] transition-colors">{s.label}</span>
                        <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0B6E4F] transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ FULL-WIDTH NEWSLETTER (MOBILE) ═══ */}
      <section className="lg:hidden bg-[#0A2540] py-14 px-6">
        <div className="max-w-md mx-auto text-center">
          <Fade>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#34D399] mb-3">ESG Intelligence Digest</p>
            <h2 className="font-heading text-[22px] font-bold text-white mb-2">Monthly research — straight to your inbox</h2>
            <p className="text-[14px] text-white/50 mb-6">Regulatory updates, market intelligence, and proprietary analysis. No spam.</p>
            <div className="flex gap-2">
              <input placeholder="Your email address" className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/15 rounded-lg text-white outline-none placeholder:text-white/30 focus:border-[#0B6E4F] transition-colors" />
              <button className="bg-[#0B6E4F] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#095C42] transition shrink-0">Subscribe</button>
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══ */}
      <section className="bg-white border-t border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Fade>
            <div>
              <p className="font-heading text-[18px] font-bold text-[#0A2540] mb-1">Need research for a specific market or sector?</p>
              <p className="text-[14px] text-[#475569]">Commission a custom research report or market study from the MindEarth team.</p>
            </div>
          </Fade>
          <Fade delay={0.08}>
            <div className="flex gap-3 shrink-0">
              <Link href="/contact" className="bg-[#0B6E4F] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#095C42] transition-colors whitespace-nowrap">Commission Research</Link>
              <Link href="/reports" className="border border-gray-300 text-[#0A2540] text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">Browse Reports</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
