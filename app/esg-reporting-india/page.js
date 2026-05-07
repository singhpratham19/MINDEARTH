import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "ESG Reporting in India: Complete BRSR Guide 2024 | MindEarth Consultancy",
  description:
    "Complete guide to ESG reporting requirements in India. Learn about SEBI BRSR mandatory disclosure, BRSR Core assurance, GRI alignment, and how MindEarth Consultancy helps Indian companies comply.",
  alternates: { canonical: "https://www.mindearthconsultancy.com/esg-reporting-india" },
  openGraph: {
    title: "ESG Reporting in India: Complete BRSR Guide | MindEarth Consultancy",
    description:
      "Everything Indian companies need to know about ESG disclosure — SEBI BRSR, BRSR Core, GHG reporting, and expert advisory from MindEarth Consultancy.",
    url: "https://www.mindearthconsultancy.com/esg-reporting-india",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "ESG Reporting in India: Complete BRSR Guide",
  description:
    "Comprehensive guide to ESG reporting and BRSR compliance for Indian listed companies, including SEBI requirements, GHG disclosure, and expert advisory.",
  author: { "@type": "Organization", name: "MindEarth Consultancy" },
  publisher: {
    "@type": "Organization",
    name: "MindEarth Consultancy",
    url: "https://www.mindearthconsultancy.com",
  },
  url: "https://www.mindearthconsultancy.com/esg-reporting-india",
};

export default function ESGReportingIndiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-[#0A2540] py-20 px-6">
          <div className="max-w-container mx-auto max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] text-white/50 mb-6">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">ESG Reporting India</span>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#34D399] uppercase mb-4">Regulatory Guide</p>
            <h1 className="font-heading text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6">
              ESG Reporting in India: The Complete BRSR Guide
            </h1>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-2xl">
              Everything Indian listed companies need to know about ESG disclosure obligations — SEBI BRSR, BRSR Core, GHG emissions reporting, and expert advisory from MindEarth Consultancy.
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 py-16">

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">ESG Reporting in India: An Overview</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            India's ESG reporting landscape has undergone a significant transformation since SEBI introduced the Business Responsibility and Sustainability Reporting (BRSR) framework in 2021. What began as voluntary disclosure has evolved into a rigorous, assurance-backed mandatory regime for the country's largest listed companies.
          </p>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-10">
            <strong>MindEarth Consultancy</strong> is one of India's leading ESG advisory firms, helping companies navigate BRSR compliance, GHG inventory development, and stakeholder reporting aligned with global standards like GRI, TCFD, ISSB, and CDP.
          </p>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-6">The BRSR Framework: Key Milestones</h2>
          <div className="relative pl-6 border-l-2 border-[#0B6E4F] space-y-8 mb-14">
            {[
              ["2021", "SEBI introduces BRSR", "SEBI notifies the Business Responsibility and Sustainability Reporting framework, replacing the earlier Business Responsibility Report (BRR). Voluntary for FY2021-22."],
              ["FY2022-23", "BRSR becomes mandatory", "Mandatory ESG reporting for the top 1,000 listed companies by market capitalisation. Covers 9 principles across Environment, Social, and Governance."],
              ["FY2023-24", "BRSR Core introduced", "SEBI introduces BRSR Core — a subset of high-impact KPIs requiring reasonable assurance from accredited third parties for the top 150 listed companies."],
              ["FY2024-25 onwards", "BRSR Core expands", "BRSR Core assurance extends to the top 250, then top 500, and eventually all top 1,000 companies by FY2026-27."],
            ].map(([year, title, desc]) => (
              <div key={year} className="relative">
                <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-[#0B6E4F] border-2 border-white" />
                <p className="text-[11px] font-bold text-[#0B6E4F] uppercase tracking-wider mb-1">{year}</p>
                <h3 className="font-heading text-[17px] font-bold text-[#0A2540] mb-1">{title}</h3>
                <p className="text-[15px] text-[#475569] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">What BRSR Requires: The 9 Principles</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            BRSR is structured around the National Guidelines on Responsible Business Conduct (NGRBC) — nine principles covering ethics, environmental stewardship, employee wellbeing, stakeholder engagement, and more.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              ["P1", "Ethics & Transparency"],
              ["P2", "Sustainable Products"],
              ["P3", "Employee Wellbeing"],
              ["P4", "Stakeholder Engagement"],
              ["P5", "Human Rights"],
              ["P6", "Environment"],
              ["P7", "Policy Advocacy"],
              ["P8", "Inclusive Growth"],
              ["P9", "Consumer Responsibility"],
            ].map(([code, label]) => (
              <div key={code} className="flex items-center gap-3 bg-[#F8FAFC] rounded-lg px-4 py-3 border border-[#E2E8F0]">
                <span className="text-[12px] font-bold text-[#0B6E4F] bg-[#E6F4EF] px-2 py-1 rounded shrink-0">{code}</span>
                <span className="text-[13px] font-semibold text-[#0A2540]">{label}</span>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">GHG Emissions Disclosure Under BRSR</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-4">
            Principle 6 of BRSR covers environmental disclosures, including mandatory GHG emissions reporting. Companies must disclose:
          </p>
          <ul className="space-y-3 mb-6">
            {[
              "Total Scope 1 and Scope 2 emissions (in metric tonnes CO₂e) for the current and previous year",
              "GHG emission intensity metrics (per rupee of turnover and per unit of product)",
              "Total energy consumed — renewable and non-renewable sources",
              "Water withdrawal and consumption by source",
              "Waste generated, recovered, and disposed of",
              "Scope 3 emissions for BRSR Core companies (encouraged)",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-[#475569]">
                <span className="w-5 h-5 rounded-full bg-[#E6F4EF] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B6E4F]" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-10">
            MindEarth Consultancy helps companies build GHG inventories that satisfy these BRSR requirements while also meeting international frameworks. Read our <Link href="/ghg-emissions-calculation" className="text-[#0B6E4F] font-semibold hover:underline">GHG Emissions Calculation Guide</Link> for the full methodology, or our <Link href="/scope-1-2-3-explained" className="text-[#0B6E4F] font-semibold hover:underline">Scope 1, 2 & 3 explainer</Link> for a detailed breakdown.
          </p>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">ESG Consulting in India: Key Challenges</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            Despite the regulatory mandate, many Indian companies face significant challenges in ESG reporting:
          </p>
          <div className="space-y-4 mb-10">
            {[
              ["Data infrastructure gaps", "Most Indian companies lack automated systems to collect energy, water, and emissions data across distributed operations and subsidiaries."],
              ["Supply chain visibility", "Scope 3 reporting requires supplier engagement, which remains nascent in India's largely informal supply chains."],
              ["Assurance readiness", "BRSR Core requires third-party assurance — many companies are not yet prepared for the rigour this demands on data quality and documentation."],
              ["Materiality assessment", "Identifying the most material ESG topics requires structured stakeholder engagement and industry benchmarking, which few internal teams are equipped to conduct."],
              ["Board and leadership buy-in", "ESG reporting is often siloed in sustainability teams without adequate C-suite integration or governance framework."],
            ].map(([title, desc]) => (
              <div key={title} className="p-5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <h3 className="font-heading text-[15px] font-bold text-[#0A2540] mb-1">{title}</h3>
                <p className="text-[14px] text-[#475569] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">How MindEarth Consultancy Supports ESG Reporting in India</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            MindEarth Consultancy offers a full-suite ESG reporting and advisory service designed specifically for the Indian regulatory context, while aligning with global investor expectations:
          </p>
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              { title: "BRSR Compliance", desc: "End-to-end preparation of BRSR and BRSR Core disclosures, including data collection, gap analysis, and board presentation.", href: "/services/brsr" },
              { title: "GHG Inventory", desc: "Scope 1, 2, and 3 emissions calculation using GHG Protocol methodology, with CEA grid factors for Indian operations.", href: "/ghg-emissions-calculation" },
              { title: "ESG Strategy", desc: "Materiality assessment, ESG roadmap development, and KPI target-setting aligned with SEBI, GRI, and ISSB frameworks.", href: "/services" },
              { title: "ESG Research Reports", desc: "300+ published ESG market research reports covering Indian sectors — from renewable energy to carbon markets and green finance.", href: "/reports" },
            ].map(({ title, desc, href }) => (
              <Link key={title} href={href} className="block p-5 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#0B6E4F]/40 hover:shadow-md transition-all group">
                <h3 className="font-heading text-[15px] font-bold text-[#0A2540] mb-2 group-hover:text-[#0B6E4F] transition-colors">{title}</h3>
                <p className="text-[13px] text-[#475569] leading-relaxed">{desc}</p>
                <span className="text-xs text-[#0B6E4F] font-semibold mt-2 inline-block">Learn more →</span>
              </Link>
            ))}
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">ESG Consulting India: Why Choose MindEarth Consultancy</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            With over 400 ESG studies completed and a research team spanning Pune, London, and Singapore, MindEarth Consultancy brings institutional-grade rigour to every engagement. Our proprietary methodology triangulates data from government, regulatory, and private sources to produce disclosures that withstand third-party assurance and investor scrutiny.
          </p>
          <ul className="space-y-3 mb-10">
            {[
              "Deep expertise in SEBI BRSR, GRI Standards, TCFD, ISSB, and CDP frameworks",
              "India-specific knowledge of CEA grid factors, CPCB norms, and MoEFCC regulations",
              "850+ enterprise clients including NSE/BSE-listed companies, MNCs, and PSUs",
              "Proven track record of BRSR Core assurance readiness for top-listed companies",
              "Sector-specific ESG benchmarking across 25+ industries",
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-[#475569]">
                <span className="w-5 h-5 rounded-full bg-[#E6F4EF] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B6E4F]" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="bg-[#0A2540] rounded-2xl p-8 text-center">
            <h2 className="font-heading text-[24px] font-bold text-white mb-3">Start Your BRSR Compliance Journey</h2>
            <p className="text-[15px] text-white/70 mb-6 max-w-lg mx-auto">
              Talk to a MindEarth Consultancy ESG expert about your BRSR obligations and how we can help you achieve compliance with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors">
                Book a Consultation
              </Link>
              <Link href="/services/brsr" className="bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                BRSR Advisory Services
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <p className="text-[13px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Related Guides</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ghg-emissions-calculation" className="text-sm text-[#0B6E4F] font-semibold hover:underline">GHG Emissions Calculation →</Link>
              <Link href="/scope-1-2-3-explained" className="text-sm text-[#0B6E4F] font-semibold hover:underline">Scope 1, 2 & 3 Explained →</Link>
              <Link href="/services/brsr" className="text-sm text-[#0B6E4F] font-semibold hover:underline">BRSR Advisory →</Link>
              <Link href="/reports" className="text-sm text-[#0B6E4F] font-semibold hover:underline">Browse ESG Reports →</Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
