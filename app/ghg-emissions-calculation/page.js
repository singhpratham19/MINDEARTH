import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "GHG Emissions Calculation Guide | MindEarth Consultancy",
  description:
    "Learn how to calculate greenhouse gas (GHG) emissions for your organisation. MindEarth Consultancy's step-by-step guide covers Scope 1, 2, and 3 emissions using the GHG Protocol.",
  alternates: { canonical: "https://www.mindearthconsultancy.com/ghg-emissions-calculation" },
  openGraph: {
    title: "GHG Emissions Calculation Guide | MindEarth Consultancy",
    description:
      "Step-by-step guide to calculating Scope 1, 2, and 3 greenhouse gas emissions. Expert guidance from MindEarth Consultancy.",
    url: "https://www.mindearthconsultancy.com/ghg-emissions-calculation",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is GHG emissions calculation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GHG emissions calculation is the process of measuring and quantifying the greenhouse gases (CO2, CH4, N2O, etc.) released by an organisation's activities. It follows the GHG Protocol Corporate Standard and covers Scope 1 (direct), Scope 2 (energy indirect), and Scope 3 (value chain) emissions.",
      },
    },
    {
      "@type": "Question",
      name: "Which framework should I use for GHG calculation in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Indian companies typically use the GHG Protocol Corporate Standard aligned with SEBI's BRSR (Business Responsibility and Sustainability Reporting) requirements. MindEarth Consultancy helps companies implement compliant GHG inventories aligned with both BRSR Core and international frameworks like GRI and TCFD.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a corporate GHG inventory take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full Scope 1, 2, and 3 GHG inventory typically takes 6–12 weeks depending on the complexity of operations and data availability. MindEarth Consultancy's structured 6-phase methodology ensures data accuracy and regulatory compliance within this timeframe.",
      },
    },
  ],
};

export default function GHGEmissionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-[#0A2540] py-20 px-6">
          <div className="max-w-container mx-auto max-w-3xl">
            <div className="flex items-center gap-2 text-[11px] text-white/50 mb-6">
              <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white/70">GHG Emissions Calculation</span>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#34D399] uppercase mb-4">Knowledge Guide</p>
            <h1 className="font-heading text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6">
              GHG Emissions Calculation: A Complete Corporate Guide
            </h1>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-2xl">
              MindEarth Consultancy's comprehensive guide to measuring, calculating, and reporting greenhouse gas emissions for organisations across India and globally.
            </p>
          </div>
        </section>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-6 py-16 prose prose-slate max-w-none">

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">What Is GHG Emissions Calculation?</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            Greenhouse gas (GHG) emissions calculation is the systematic process of identifying, quantifying, and reporting the climate-relevant gases released by an organisation's activities. It is the foundation of any credible corporate climate strategy — whether you are preparing for SEBI BRSR disclosure, setting net-zero targets, or responding to investor ESG due diligence.
          </p>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-8">
            At <strong>MindEarth Consultancy</strong>, we help companies across India and 40+ countries build robust GHG inventories aligned with the <strong>GHG Protocol Corporate Standard</strong>, SEBI BRSR, GRI Standards, and the TCFD framework.
          </p>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">The Three Scopes of GHG Emissions</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-4">
            The GHG Protocol divides corporate emissions into three categories:
          </p>

          <h3 className="font-heading text-[20px] font-bold text-[#0A2540] mb-3">Scope 1: Direct Emissions</h3>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            Scope 1 covers emissions from sources directly owned or controlled by the company — combustion in boilers and furnaces, company-owned vehicles, industrial processes, and fugitive emissions from refrigerants. These are the most straightforward to measure and typically form the starting point of any GHG inventory.
          </p>

          <h3 className="font-heading text-[20px] font-bold text-[#0A2540] mb-3">Scope 2: Indirect Energy Emissions</h3>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            Scope 2 covers emissions from the generation of purchased electricity, heat, steam, or cooling consumed by the company. In India, the grid emission factor published by the Central Electricity Authority (CEA) is used. Companies with renewable energy certificates (RECs) or PPAs can report market-based Scope 2 figures alongside the location-based figure.
          </p>

          <h3 className="font-heading text-[20px] font-bold text-[#0A2540] mb-3">Scope 3: Value Chain Emissions</h3>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-8">
            Scope 3 is typically the largest emissions category, covering 15 categories of upstream and downstream value chain emissions — from raw material extraction and business travel to product use and end-of-life disposal. SEBI's BRSR Core now requires disclosure of at least the most material Scope 3 categories for top-listed Indian companies.
          </p>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">Step-by-Step GHG Calculation Process</h2>

          <div className="space-y-6 mb-10">
            {[
              ["1. Define Organisational Boundary", "Determine which entities and operations are included in your GHG inventory using either the equity share, financial control, or operational control approach."],
              ["2. Identify Emission Sources", "Map all relevant emission sources across Scope 1, 2, and material Scope 3 categories specific to your industry and operations."],
              ["3. Collect Activity Data", "Gather consumption data — fuel volumes, electricity bills, travel records, procurement spend — for the reporting period (typically calendar or financial year)."],
              ["4. Apply Emission Factors", "Multiply activity data by appropriate emission factors. MindEarth Consultancy uses IPCC, IEA, CEA, and DEFRA emission factors depending on geography."],
              ["5. Calculate in CO₂ Equivalent", "Convert all GHGs (CH₄, N₂O, HFCs, etc.) to CO₂ equivalent (CO₂e) using the latest IPCC Global Warming Potential (GWP) values."],
              ["6. Verify and Report", "Third-party verification enhances credibility. MindEarth Consultancy prepares disclosure-ready reports aligned with BRSR, GRI, TCFD, and investor questionnaires like CDP."],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-4 p-5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="flex-1">
                  <h3 className="font-heading text-[16px] font-bold text-[#0A2540] mb-1">{title}</h3>
                  <p className="text-[15px] text-[#475569] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">GHG Calculation for Indian Companies: BRSR Requirements</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-4">
            SEBI's Business Responsibility and Sustainability Reporting (BRSR) framework — mandatory for the top 1,000 listed companies by market cap — requires disclosure of Scope 1 and Scope 2 emissions, with Scope 3 encouraged. The BRSR Core (applicable from FY2023-24) introduces assurance requirements and intensity metrics.
          </p>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-8">
            MindEarth Consultancy has helped 100+ Indian listed companies build BRSR-compliant GHG inventories, from data collection frameworks to board-ready disclosure documents. Our <Link href="/services/brsr" className="text-[#0B6E4F] font-semibold hover:underline">BRSR Advisory service</Link> covers the full engagement lifecycle.
          </p>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">Common Challenges in GHG Calculation</h2>
          <ul className="space-y-3 mb-8">
            {[
              "Data gaps across distributed operations, contract manufacturing, and leased assets",
              "Selecting the right emission factors for India-specific grid, fleet, and process emissions",
              "Boundary-setting decisions for joint ventures and subsidiaries",
              "Scope 3 category prioritisation under materiality constraints",
              "Double-counting risks in supply chain emissions (especially for Scope 3 Category 1 and 11)",
            ].map(c => (
              <li key={c} className="flex items-start gap-3 text-[15px] text-[#475569]">
                <span className="w-5 h-5 rounded-full bg-[#E6F4EF] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#0B6E4F]" />
                </span>
                {c}
              </li>
            ))}
          </ul>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6 mb-10">
            {faqSchema.mainEntity.map(q => (
              <div key={q.name} className="border-b border-[#E2E8F0] pb-6">
                <h3 className="font-heading text-[17px] font-bold text-[#0A2540] mb-2">{q.name}</h3>
                <p className="text-[15px] text-[#475569] leading-relaxed">{q.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#0A2540] rounded-2xl p-8 text-center">
            <h2 className="font-heading text-[24px] font-bold text-white mb-3">Ready to Start Your GHG Inventory?</h2>
            <p className="text-[15px] text-white/70 mb-6 max-w-lg mx-auto">
              MindEarth Consultancy's experts will build a disclosure-ready GHG inventory for your organisation — aligned with BRSR, GRI, and TCFD.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors">
                Book a Consultation
              </Link>
              <Link href="/services" className="bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                View All Services
              </Link>
            </div>
          </div>

          {/* Internal links */}
          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <p className="text-[13px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Related Guides</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/scope-1-2-3-explained" className="text-sm text-[#0B6E4F] font-semibold hover:underline">Scope 1, 2 & 3 Explained →</Link>
              <Link href="/esg-reporting-india" className="text-sm text-[#0B6E4F] font-semibold hover:underline">ESG Reporting in India →</Link>
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
