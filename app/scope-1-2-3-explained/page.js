import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Scope 1, 2 & 3 Emissions Explained | MindEarth Consultancy",
  description:
    "Understand the difference between Scope 1, Scope 2, and Scope 3 greenhouse gas emissions. MindEarth Consultancy explains each scope with examples and reporting requirements for Indian companies.",
  alternates: { canonical: "https://www.mindearthconsultancy.com/scope-1-2-3-explained" },
  openGraph: {
    title: "Scope 1, 2 & 3 Emissions Explained | MindEarth Consultancy",
    description:
      "Clear breakdown of Scope 1, 2, and 3 emissions under the GHG Protocol — with Indian regulatory context from MindEarth Consultancy.",
    url: "https://www.mindearthconsultancy.com/scope-1-2-3-explained",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Scope 1, 2 & 3 Emissions Explained",
  description:
    "Comprehensive guide to understanding Scope 1, 2, and 3 greenhouse gas emissions under the GHG Protocol, with examples and Indian BRSR context.",
  author: { "@type": "Organization", name: "MindEarth Consultancy" },
  publisher: {
    "@type": "Organization",
    name: "MindEarth Consultancy",
    url: "https://www.mindearthconsultancy.com",
  },
  url: "https://www.mindearthconsultancy.com/scope-1-2-3-explained",
};

const scopes = [
  {
    num: "1",
    label: "Scope 1",
    subtitle: "Direct Emissions",
    color: "#C8102E",
    bg: "#FEF2F2",
    desc: "Scope 1 emissions are direct GHG emissions from sources owned or controlled by the reporting company.",
    examples: [
      "Combustion in owned boilers, furnaces, and turbines",
      "Company-owned vehicle fleets (petrol, diesel, CNG)",
      "On-site manufacturing processes and chemical reactions",
      "Fugitive emissions from refrigerants and air conditioning",
      "Emissions from on-site waste incineration",
    ],
    note: "Scope 1 is mandatory under SEBI BRSR for all top 1,000 listed Indian companies.",
  },
  {
    num: "2",
    label: "Scope 2",
    subtitle: "Indirect Energy Emissions",
    color: "#0077C8",
    bg: "#EFF6FF",
    desc: "Scope 2 covers indirect GHG emissions associated with the generation of purchased electricity, heat, steam, or cooling consumed by the company.",
    examples: [
      "Grid electricity purchased from the national/state grid",
      "District heating or cooling purchased from third parties",
      "Steam purchased from external suppliers",
      "Electricity from renewable sources (reported separately as market-based)",
    ],
    note: "India uses the CEA Grid Emission Factor for location-based Scope 2. Companies with RECs or PPAs can also report market-based Scope 2.",
  },
  {
    num: "3",
    label: "Scope 3",
    subtitle: "Value Chain Emissions",
    color: "#0B6E4F",
    bg: "#F0FAF6",
    desc: "Scope 3 captures all other indirect emissions in a company's upstream and downstream value chain — typically the largest share of a company's total carbon footprint.",
    examples: [
      "Category 1: Purchased goods and services",
      "Category 3: Fuel & energy-related activities",
      "Category 4: Upstream transportation and distribution",
      "Category 6: Business travel (flights, hotels)",
      "Category 11: Use of sold products",
      "Category 12: End-of-life treatment of sold products",
    ],
    note: "BRSR Core encourages Scope 3 disclosure for material categories. The GHG Protocol identifies 15 Scope 3 categories in total.",
  },
];

export default function Scope123Page() {
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
              <span className="text-white/70">Scope 1, 2 & 3 Explained</span>
            </div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#34D399] uppercase mb-4">GHG Protocol Guide</p>
            <h1 className="font-heading text-[38px] sm:text-[48px] font-bold text-white leading-[1.1] tracking-[-0.02em] mb-6">
              Scope 1, 2 & 3 Emissions Explained
            </h1>
            <p className="text-[17px] text-white/70 leading-relaxed max-w-2xl">
              A complete breakdown of the three emission scopes under the GHG Protocol Corporate Standard — with examples, calculation methods, and Indian BRSR reporting context from MindEarth Consultancy.
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-6 py-16">

          <p className="text-[16px] text-[#475569] leading-relaxed mb-10">
            The GHG Protocol Corporate Standard — the world's most widely used greenhouse gas accounting framework — organises corporate emissions into three "scopes." Understanding which emissions fall into each scope is essential for accurate carbon accounting, BRSR compliance, and setting credible net-zero targets.
          </p>

          {/* Scope cards */}
          <div className="space-y-10 mb-14">
            {scopes.map((s) => (
              <div key={s.num} className="rounded-2xl border overflow-hidden" style={{ borderColor: s.color + "33" }}>
                <div className="px-8 py-5 flex items-center gap-4" style={{ backgroundColor: s.bg }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0" style={{ backgroundColor: s.color }}>
                    {s.num}
                  </div>
                  <div>
                    <h2 className="font-heading text-[22px] font-bold text-[#0A2540]">{s.label}: {s.subtitle}</h2>
                  </div>
                </div>
                <div className="px-8 py-6 bg-white">
                  <p className="text-[16px] text-[#475569] leading-relaxed mb-5">{s.desc}</p>
                  <h3 className="font-heading text-[14px] font-bold text-[#0A2540] uppercase tracking-wider mb-3">Examples</h3>
                  <ul className="space-y-2 mb-5">
                    {s.examples.map(ex => (
                      <li key={ex} className="flex items-start gap-3 text-[15px] text-[#475569]">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: s.color }} />
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-[#F8FAFC] rounded-lg px-5 py-3 border border-[#E2E8F0]">
                    <p className="text-[13px] text-[#475569] leading-relaxed"><strong className="text-[#0A2540]">India context:</strong> {s.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">Why Scope 3 Matters Most</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-4">
            For most companies, Scope 3 represents 70–90% of their total carbon footprint. Ignoring it means severely understating climate impact and risk exposure. Major institutional investors — including those using TCFD frameworks — now expect companies to quantify and disclose at least the most material Scope 3 categories.
          </p>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-10">
            MindEarth Consultancy's Scope 3 screening service identifies your highest-impact categories and builds a proportionate, audit-ready disclosure. Explore our <Link href="/ghg-emissions-calculation" className="text-[#0B6E4F] font-semibold hover:underline">GHG calculation guide</Link> for the full methodology.
          </p>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">Scope 1, 2 & 3 Under SEBI BRSR</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-4">
            India's SEBI mandates GHG disclosure as part of the Business Responsibility and Sustainability Reporting (BRSR) framework. The requirements are as follows:
          </p>
          <div className="overflow-x-auto mb-10">
            <table className="w-full border-collapse text-[14px]">
              <thead>
                <tr className="bg-[#0A2540] text-white">
                  <th className="text-left px-4 py-3 font-semibold">Scope</th>
                  <th className="text-left px-4 py-3 font-semibold">BRSR (Top 1,000)</th>
                  <th className="text-left px-4 py-3 font-semibold">BRSR Core</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Scope 1", "Mandatory", "Mandatory + Assured"],
                  ["Scope 2", "Mandatory", "Mandatory + Assured"],
                  ["Scope 3", "Encouraged", "Material categories encouraged"],
                ].map(([scope, brsr, core]) => (
                  <tr key={scope} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                    <td className="px-4 py-3 font-semibold text-[#0A2540]">{scope}</td>
                    <td className="px-4 py-3 text-[#475569]">{brsr}</td>
                    <td className="px-4 py-3 text-[#475569]">{core}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-heading text-[28px] font-bold text-[#0A2540] mb-4">How MindEarth Consultancy Helps</h2>
          <p className="text-[16px] text-[#475569] leading-relaxed mb-6">
            MindEarth Consultancy provides end-to-end Scope 1, 2, and 3 emissions accounting services for companies across manufacturing, financial services, technology, and consumer sectors in India and globally. Our deliverables include:
          </p>
          <ul className="space-y-3 mb-10">
            {[
              "Organisational boundary definition and emission source identification",
              "Activity data collection templates and supplier engagement protocols",
              "Emission factor selection (IPCC, CEA, DEFRA, industry-specific)",
              "Full GHG inventory in CO₂e with uncertainty analysis",
              "BRSR-ready disclosure documents and board presentations",
              "Year-on-year comparison and science-based target (SBT) pathway analysis",
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
            <h2 className="font-heading text-[24px] font-bold text-white mb-3">Calculate Your Scope 1, 2 & 3 Emissions</h2>
            <p className="text-[15px] text-white/70 mb-6 max-w-lg mx-auto">
              Get a free scoping call with a MindEarth Consultancy GHG expert and understand what's needed for your first compliant emissions inventory.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-[#0B6E4F] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#095C42] transition-colors">
                Book Free Scoping Call
              </Link>
              <Link href="/services" className="bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                Our Services
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
            <p className="text-[13px] font-semibold text-[#94A3B8] uppercase tracking-wider mb-4">Related Guides</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/ghg-emissions-calculation" className="text-sm text-[#0B6E4F] font-semibold hover:underline">GHG Emissions Calculation Guide →</Link>
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
