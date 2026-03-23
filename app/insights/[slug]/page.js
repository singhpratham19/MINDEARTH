"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const articles = {
  "esg-trends-q1-2026": {
    cat: "TRENDS",
    date: "March 15, 2026",
    read: "12 min",
    author: "MindEarth Research Team",
    title: "Regulatory Acceleration Across Emerging Markets",
    subtitle: "MindEarth ESG Trends Q1 2026",
    img: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1800&q=80",
    summary: "A 34% increase in mandatory ESG disclosure requirements across South Asia and the Middle East is reshaping corporate reporting obligations and investor expectations in emerging markets.",
    keyTakeaways: [
      "SEBI expanded BRSR Core to top 250 listed companies",
      "UAE and Saudi Arabia introduced mandatory ESG disclosures",
      "$45B allocated by GCC sovereign wealth funds to ESG mandates",
      "Framework-agnostic data collection approach recommended",
    ],
    sections: [
      { heading: "Regulatory Momentum in South Asia", body: "India's SEBI has expanded the BRSR Core framework to the top 250 listed companies by market capitalization, effective FY 2026-27. This follows the successful implementation for the top 150 companies, with third-party assurance now mandatory for key ESG metrics including greenhouse gas emissions, water consumption, and waste generation.\n\nBangladesh and Sri Lanka have introduced voluntary ESG disclosure guidelines modelled on BRSR, signalling regional convergence toward standardised sustainability reporting." },
      { heading: "Middle East & North Africa Developments", body: "The UAE Securities and Commodities Authority (SCA) has mandated ESG disclosures for all listed entities on ADX and DFM, effective January 2026. Saudi Arabia's Capital Market Authority (CMA) has introduced a phased ESG reporting framework aligned with ISSB standards, covering Tadawul-listed companies with market capitalization above SAR 2 billion.\n\nQatar, Bahrain, and Oman are developing national ESG taxonomies informed by the EU Green Taxonomy but adapted for regional economic structures.", pullQuote: "$18 trillion in institutional AUM now incorporates ESG disclosure quality into proxy voting guidelines." },
      { heading: "Investor Response & Capital Allocation", body: "Institutional investors managing over $18 trillion in combined AUM have updated their proxy voting guidelines to incorporate ESG disclosure quality as a factor in director re-election votes. Sovereign wealth funds in the GCC region have collectively allocated $45 billion toward ESG-aligned investment mandates in 2025, a 62% increase from the prior year.\n\nThe convergence of regulatory push and investor pull is creating a self-reinforcing cycle of improved disclosure quality." },
      { heading: "Implications for Corporates", body: "Companies operating across multiple emerging markets face a complex and evolving compliance landscape. MindEarth recommends a framework-agnostic data collection approach that can serve BRSR, ISSB, GRI, and regional requirements simultaneously.\n\nEarly movers who invest in robust ESG data infrastructure will benefit from lower compliance costs, improved access to ESG-linked financing, and stronger positioning with institutional investors conducting ESG due diligence." },
    ],
    tags: ["BRSR", "SEBI", "Middle East ESG", "Regulatory", "Emerging Markets"],
    related: ["carbon-markets-2025", "green-bond-outlook-2028"],
  },
  "carbon-markets-2025": {
    cat: "DATA",
    date: "February 28, 2026",
    read: "10 min",
    author: "MindEarth Research Team",
    title: "Carbon Markets Grow 22% YoY as Institutional Demand Accelerates",
    subtitle: "MindEarth Market Intelligence",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1800&q=80",
    summary: "Voluntary carbon credit transactions reached $2.8B in 2025, driven by corporate net-zero commitments and the operationalisation of Article 6 of the Paris Agreement.",
    keyTakeaways: [
      "Voluntary carbon market expanded 22% YoY to $2.8B",
      "Premium credits trade at $25-45/tCO2e vs $3-8 for legacy",
      "India's CCTS generated 12M credits in its first year",
      "Market projected to reach $5.2B by 2028",
    ],
    sections: [
      { heading: "Market Size & Growth Trajectory", body: "The voluntary carbon market expanded 22% year-over-year to $2.8 billion in total transaction value during 2025. This growth was driven by a combination of corporate net-zero commitments reaching their first interim milestones, increased institutional participation through carbon credit ETFs and structured products, and the operationalisation of Article 6.4 of the Paris Agreement which established a credible international framework for cross-border credit transfers." },
      { heading: "Quality Premium Emerges", body: "A significant pricing bifurcation has emerged between high-integrity credits (verified under Verra VCS, Gold Standard, or Article 6.4 mechanisms) and legacy credits with questionable additionality. Premium credits from nature-based removal projects now trade at $25-45/tCO2e, while older avoidance credits have declined to $3-8/tCO2e.\n\nThe Integrity Council for the Voluntary Carbon Market (ICVCM) Core Carbon Principles have become the de facto quality benchmark, with 78% of institutional buyers requiring CCP compliance.", pullQuote: "78% of institutional buyers now require ICVCM Core Carbon Principles compliance." },
      { heading: "Regional Hotspots", body: "Sub-Saharan Africa and Southeast Asia have emerged as the fastest-growing credit origination regions, driven by large-scale reforestation, mangrove restoration, and clean cooking projects.\n\nIndia's domestic carbon market, launched in 2025 under the Carbon Credit Trading Scheme (CCTS), has generated 12 million credits in its first year, primarily from renewable energy and energy efficiency projects. China's national ETS expanded to cover the cement and aluminium sectors, adding 800 million tonnes of annual covered emissions." },
      { heading: "Outlook for 2026-2028", body: "MindEarth projects the voluntary carbon market will reach $5.2 billion by 2028, driven by tightening corporate climate commitments, regulatory integration of voluntary credits into compliance frameworks, and the scaling of engineered carbon removal technologies including direct air capture (DAC) and enhanced rock weathering.\n\nKey risks include regulatory fragmentation, greenwashing litigation, and supply constraints for high-integrity removal credits." },
    ],
    tags: ["Carbon Credits", "VCM", "Article 6", "Net Zero", "Climate Finance"],
    related: ["esg-trends-q1-2026", "green-bond-outlook-2028"],
  },
  "green-bond-outlook-2028": {
    cat: "OUTLOOK",
    date: "February 10, 2026",
    read: "15 min",
    author: "MindEarth Research Team",
    title: "Green Bond Issuance to Cross $1T by 2028",
    subtitle: "Sustainable Finance Outlook",
    img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=1800&q=80",
    summary: "Asia-Pacific markets contributing 38% of new issuance volume as sovereign programs scale, with green, social, sustainability, and sustainability-linked bonds collectively surpassing $800B in annual issuance.",
    keyTakeaways: [
      "Global green bond issuance reached $620B in 2025 (+28% YoY)",
      "Asia-Pacific contributed 38% of new issuance, up from 29%",
      "Greenium narrowed to 2-5 bps for investment-grade issuers",
      "Total labelled bond market exceeded $940B in 2025",
    ],
    sections: [
      { heading: "Global Issuance Trends", body: "Global green bond issuance reached $620 billion in 2025, representing a 28% increase from the prior year. When combined with social bonds ($145B), sustainability bonds ($98B), and sustainability-linked bonds ($78B), the total labelled bond market exceeded $940 billion.\n\nMindEarth projects green bond issuance alone will cross $1 trillion annually by 2028, driven by sovereign issuers, multilateral development banks, and corporate refinancing of conventional debt with green instruments.", pullQuote: "The total labelled bond market exceeded $940 billion in 2025 — on track to cross $1.5 trillion by 2028." },
      { heading: "Asia-Pacific Leadership", body: "The Asia-Pacific region contributed 38% of new green bond issuance in 2025, up from 29% in 2023. China's sovereign green bond program issued $85 billion across multiple tranches, while India's sovereign green bonds totalled $12 billion following the successful inaugural issuance in 2023.\n\nJapan, South Korea, and Australia have each established national green bond frameworks aligned with ICMA Green Bond Principles, creating a harmonised regional ecosystem for sustainable debt instruments." },
      { heading: "Use of Proceeds & Impact Reporting", body: "Renewable energy (34%) and green buildings (22%) remain the dominant use-of-proceeds categories. However, emerging categories including biodiversity conservation, circular economy, and climate adaptation are growing rapidly, collectively representing 18% of 2025 issuance compared to 9% in 2023.\n\nImpact reporting quality has improved significantly, with 82% of green bond issuers now publishing annual impact reports aligned with ICMA Harmonised Framework for Impact Reporting." },
      { heading: "Investment Implications", body: "The green bond market offers institutional investors a liquid, scalable avenue for ESG-aligned fixed income allocation with minimal yield concession. The average greenium (yield discount for green bonds versus conventional equivalents) has narrowed to 2-5 basis points across investment-grade issuers.\n\nMindEarth recommends investors focus on sovereign and quasi-sovereign issuers in emerging markets, where greeniums remain wider (8-15 bps) and the ESG impact per dollar invested is demonstrably higher." },
    ],
    tags: ["Green Bonds", "Sustainable Finance", "APAC", "Sovereign Debt", "ESG Investing"],
    related: ["esg-trends-q1-2026", "carbon-markets-2025"],
  },
};

export default function InsightArticle() {
  const { slug } = useParams();
  const article = articles[slug];

  if (!article) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-gray-800 mb-3">Article Not Found</h1>
          <Link href="/insights" className="text-[#0B6E4F] font-semibold hover:underline">Back to Insights</Link>
        </div>
      </div>
      <Footer />
    </>
  );

  const relatedArticles = (article.related || []).map(s => ({ slug: s, ...articles[s] })).filter(a => a.title);

  return (
    <>
      <Navbar />

      {/* ═══ FULL-BLEED HERO ═══ */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden">
        <img src={article.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/70 to-transparent" />
        <div className="relative z-10 w-full">
          <div className="max-w-[860px] mx-auto px-6 pb-16">
            <Fade>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#34D399]">{article.subtitle}</span>
                <span className="w-1 h-1 rounded-full bg-white/40" />
                <span className="text-[11px] text-white/60">{article.date}</span>
              </div>
              <h1 className="font-heading text-[32px] sm:text-[42px] lg:text-[50px] font-bold text-white leading-[1.1] tracking-[-0.025em] mb-6">{article.title}</h1>
              <p className="text-[17px] sm:text-[19px] text-white/80 leading-relaxed max-w-2xl">{article.summary}</p>
            </Fade>
          </div>
        </div>
      </section>

      {/* ═══ META BAR ═══ */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[860px] mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-6 text-[12px] text-gray-500">
            <span className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#0A2540] flex items-center justify-center text-white text-[10px] font-bold">ME</span>
              <span className="font-medium text-gray-800">{article.author}</span>
            </span>
            <span>{article.read} read</span>
            <span className={`font-bold tracking-wider uppercase ${article.cat === "TRENDS" ? "text-emerald-600" : article.cat === "DATA" ? "text-sky-600" : "text-amber-600"}`}>{article.cat}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-[11px] font-semibold text-gray-500 border border-gray-200 px-3.5 py-1.5 rounded-md hover:bg-gray-50 transition">Share</button>
            <button className="text-[11px] font-semibold text-white bg-[#0B6E4F] px-3.5 py-1.5 rounded-md hover:bg-[#095C42] transition">Download PDF</button>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT AREA ═══ */}
      <article className="bg-white py-16">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-16">

            {/* Main Content */}
            <div className="min-w-0">
              {article.sections.map((s, i) => (
                <Fade key={i} delay={i * 0.04}>
                  <section className={`${i > 0 ? "mt-14" : ""}`}>
                    <h2 className="font-heading text-[22px] sm:text-[26px] font-bold text-[#0A2540] leading-snug mb-5 tracking-[-0.01em]">{s.heading}</h2>
                    {s.body.split("\n\n").map((para, pi) => (
                      <p key={pi} className="text-[16px] text-[#374151] leading-[1.85] mb-5 last:mb-0">{para}</p>
                    ))}
                    {s.pullQuote && (
                      <blockquote className="my-8 pl-6 border-l-[3px] border-[#0B6E4F]">
                        <p className="text-[18px] sm:text-[20px] font-heading font-semibold text-[#0A2540] leading-[1.5] italic">&ldquo;{s.pullQuote}&rdquo;</p>
                      </blockquote>
                    )}
                    {i < article.sections.length - 1 && !s.pullQuote && (
                      <div className="w-12 h-[2px] bg-gray-200 mt-10" />
                    )}
                  </section>
                </Fade>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-8">
                {/* Key Takeaways */}
                <div className="bg-[#F8FAFC] rounded-xl p-6 border border-gray-100">
                  <h3 className="font-heading text-[11px] font-bold tracking-[0.2em] text-[#0B6E4F] uppercase mb-4">Key Takeaways</h3>
                  <ul className="space-y-3">
                    {article.keyTakeaways.map((t, i) => (
                      <li key={i} className="flex gap-3 text-[13px] text-gray-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#0B6E4F] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topics */}
                <div>
                  <h3 className="font-heading text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-3">Topics</h3>
                  <div className="flex gap-1.5 flex-wrap">
                    {article.tags.map(t => (
                      <span key={t} className="text-[11px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-[#0A2540] rounded-xl p-6">
                  <h3 className="font-heading text-sm font-bold text-white mb-2">Get the full dataset</h3>
                  <p className="text-[12px] text-white/60 leading-relaxed mb-4">Access methodology notes, Excel models, and granular data behind this research.</p>
                  <Link href="/contact" className="block w-full bg-[#0B6E4F] text-white text-[12px] font-semibold py-2.5 rounded-lg text-center hover:bg-[#095C42] transition-colors">Request Full Report</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ═══ RELATED ARTICLES ═══ */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#F8FAFC] py-16 px-6 border-t border-gray-100">
          <div className="max-w-[860px] mx-auto">
            <Fade>
              <h2 className="font-heading text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-6">Continue Reading</h2>
            </Fade>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map((a, i) => (
                <Fade key={a.slug} delay={i * 0.06}>
                  <Link href={`/insights/${a.slug}`} className="group block">
                    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#0B6E4F]/30 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                      <div className="h-44 overflow-hidden">
                        <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[9px] font-bold tracking-wider uppercase ${a.cat === "TRENDS" ? "text-emerald-600" : a.cat === "DATA" ? "text-sky-600" : "text-amber-600"}`}>{a.cat}</span>
                          <span className="text-[10px] text-gray-400">{a.read} read</span>
                        </div>
                        <h3 className="font-heading text-[15px] font-bold text-[#0A2540] leading-snug group-hover:text-[#0B6E4F] transition-colors duration-200">{a.title}</h3>
                      </div>
                    </div>
                  </Link>
                </Fade>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ NEWSLETTER ═══ */}
      <section className="bg-[#0A2540] py-16 px-6">
        <div className="max-w-[500px] mx-auto text-center">
          <Fade>
            <h2 className="font-heading text-xl font-bold text-white mb-2">Stay ahead of ESG developments</h2>
            <p className="text-sm text-white/50 mb-6">Monthly research digest with proprietary data and analysis.</p>
            <div className="flex gap-2">
              <input placeholder="Enter your email" className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/15 rounded-lg text-white outline-none placeholder:text-white/30 focus:border-[#0B6E4F] focus:ring-1 focus:ring-[#0B6E4F]" />
              <button className="bg-[#0B6E4F] text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#095C42] transition shrink-0">Subscribe</button>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
