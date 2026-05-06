import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const services = [
  {
    tag: "TECHNICAL ASSESSMENT", title: "TEV Reports",
    desc: "Technical Economic Viability assessments for renewable energy, infrastructure, and industrial projects — structured to meet lender, DFI, and regulatory appraisal standards. Our TEV reports integrate environmental compliance, carbon intensity benchmarks, and ESG risk parameters into the standard viability framework.",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
    color: "emerald",
    items: [
      "Techno-economic analysis for solar, wind, hydro, biomass, and hybrid projects",
      "Financial modelling with IRR, NPV, DSCR, and sensitivity analysis",
      "Environmental and social risk assessment aligned with IFC Performance Standards",
      "Grid connectivity, capacity utilisation, and technology benchmarking",
      "Lender-ready documentation for IREDA, SBI, PFC, and bilateral DFIs",
    ],
    cta: "/contact",
    ctaLabel: "Request a TEV Report",
  },
  {
    tag: "PROJECT DOCUMENTATION", title: "DPR Reports",
    desc: "End-to-end Detailed Project Report preparation for developers, state agencies, and financial institutions. ESG and sustainability components are built in as standard — ensuring projects are bankable, compliant, and positioned against tightening environmental clearance and climate disclosure requirements.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    color: "sky",
    items: [
      "Site assessment, technology selection, and capacity design",
      "Capital cost estimation, procurement plan, and project schedule",
      "ESG impact assessment and environmental clearance documentation",
      "Revenue model, off-take structure, and financial projections",
      "Compliance mapping against MNRE, state nodal agency, and DFI guidelines",
    ],
    cta: "/contact",
    ctaLabel: "Request a DPR",
  },
  {
    tag: "FINANCE ADVISORY", title: "Project Finance Consultancy",
    desc: "Structured finance advisory for clean energy and infrastructure projects from concept through financial close. We assist developers and sponsors in building bankable project structures, identifying green finance instruments, and satisfying the ESG requirements of lenders and development finance institutions.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    color: "emerald",
    items: [
      "Financial structuring and capital stack optimisation",
      "Green bond, sustainability-linked loan, and blended finance advisory",
      "Lender due diligence support and information memorandum preparation",
      "ESG covenant design for term sheets and facility agreements",
      "Financial close support and project monitoring framework",
    ],
    cta: "/contact",
    ctaLabel: "Get a Proposal",
  },
  {
    tag: "MARKET INTELLIGENCE", title: "Market Research Reports",
    desc: "Sector-specific market research covering clean energy, sustainable infrastructure, and ESG-linked industries. Our reports combine primary data collection, regulatory analysis, and competitive intelligence — calibrated for investors, developers, and policy bodies operating in sustainability-driven markets.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    color: "sky",
    items: [
      "Market sizing, segmentation, and growth forecasting across 25+ sectors",
      "Regulatory landscape analysis — MNRE, SEBI, MoEFCC, and international frameworks",
      "Competitive benchmarking and market entry strategy assessment",
      "Supply chain, technology, and sustainable investment flow analysis",
      "Custom formats: full market study, sector note, or executive brief",
    ],
    cta: "/contact",
    ctaLabel: "Request a Report",
  },
  {
    tag: "STRATEGIC ADVISORY", title: "ESG & Sustainability Consultancy",
    desc: "Advisory services for corporates, financial institutions, and government bodies embedding sustainability into strategy, operations, and reporting. Our consultancy practice covers the full spectrum — from ESG disclosure preparation and carbon accounting to sustainability transformation and regulatory compliance.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    color: "emerald",
    items: [
      "ESG strategy design and sustainability roadmap development",
      "BRSR, GRI, TCFD, and ISSB disclosure preparation and assurance support",
      "Carbon accounting — Scope 1, 2, and 3 emissions inventory and reduction planning",
      "ESG due diligence for M&A, lending, and investment decisions",
      "Materiality assessment, stakeholder engagement, and sustainability reporting",
    ],
    cta: "/contact",
    ctaLabel: "Get a Proposal",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      {/* Header — sticky */}
      <section className="bg-white/95 backdrop-blur-md border-b border-brand-border lg:sticky lg:top-16 z-40 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-brand-muted mb-2">
              <Link href="/" className="hover:text-brand-green transition-colors">Home</Link><span>/</span>
              <span className="text-brand-dark font-medium">Services</span>
            </div>
            <h1 className="font-heading text-[22px] sm:text-[26px] font-bold text-[#0F172A] leading-tight tracking-[-0.01em]">Research-Grade ESG Intelligence Meets Strategic Solutions</h1>
            <p className="text-[14px] text-[#475569] leading-relaxed mt-1">From initial research through strategy design, implementation, and ongoing monitoring — we cover the full ESG journey.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href="#testimonials" className="bg-[#0A2540] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#0F172A] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
              Client Testimonials
            </a>
            <Link href="/contact" className="bg-[#0B6E4F] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Intro with sustainability image */}
      <section className="bg-brand-light py-16 px-6 border-b border-brand-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <Fade>
            <div>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-3">We provide end-to-end ESG intelligence — from market research and strategy advisory to regulatory compliance, climate risk analysis, and capacity building.</p>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-3">Our work spans 25+ industries across 40+ countries, serving Fortune 500 corporations, sovereign wealth funds, development banks, and regulatory bodies.</p>
              <p className="text-[16px] text-[#475569] leading-relaxed">Every engagement is backed by proprietary methodology, verified data from official sources, and deep on-the-ground expertise in emerging markets.</p>
            </div>
          </Fade>
          <Fade delay={0.1}>
            <div className="rounded-xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80" alt="Sustainable energy landscape" className="w-full h-[300px] object-cover rounded-xl" />
            </div>
          </Fade>
        </div>
      </section>

      {/* ═══ SERVICES — Alternating full-width sections ═══ */}
      {services.map((svc, i) => (
        <section key={svc.title} id={`service-${i}`} className={i % 2 === 0 ? "bg-white py-16 px-5" : "bg-brand-light py-16 px-5"}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? "direction-rtl" : ""}`}>
              {/* Text side */}
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <Fade>
                  <span className={`inline-block text-[10px] font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 rounded-md ${
                    svc.color === "emerald" ? "bg-emerald-50 text-emerald-700" : "bg-sky-50 text-sky-700"
                  }`}>
                    {svc.tag}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-dark mb-4">{svc.title}</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-lg">{svc.desc}</p>
                  <div className="flex gap-3 flex-wrap">
                    <Link href={svc.cta} className="bg-[#0B6E4F] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#095C42] transition-colors duration-200">
                      {svc.ctaLabel}
                    </Link>
                    <Link href={svc.cta} className="border-2 border-[#0A2540] text-[#0A2540] text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#0A2540] hover:text-white transition-all duration-200">
                      Learn More →
                    </Link>
                  </div>
                </Fade>
              </div>

              {/* Capabilities card side */}
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <Fade delay={0.15}>
                  <div className="rounded-xl overflow-hidden">
                    {/* Image */}
                    <div className="h-44 overflow-hidden rounded-t-xl">
                      <img src={svc.img} alt={svc.title} className="w-full h-full object-cover" />
                    </div>
                    {/* Capabilities list */}
                    <div className={`rounded-b-xl p-6 border border-t-0 ${
                      svc.color === "emerald" ? "bg-emerald-50/50 border-emerald-100" : "bg-sky-50/50 border-sky-100"
                    }`}>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">Key Capabilities</p>
                      <div className="space-y-3">
                        {svc.items.map((item, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              svc.color === "emerald" ? "bg-emerald-500" : "bg-sky-500"
                            }`}>
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700 leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Stats */}
      <section className="bg-emerald-50 py-12 px-5">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-around gap-8 text-center">
          {[["6", "Service Lines"], ["17+", "Capabilities"], ["850+", "Clients Served"], ["40+", "Countries"], ["98%", "Client Retention"]].map(([n, l]) => (
            <Fade key={l}><div><div className="font-heading text-2xl font-bold text-emerald-600">{n}</div><div className="text-xs text-emerald-700 font-medium mt-1">{l}</div></div></Fade>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-gray-900/80" />
        <div className="relative z-10 max-w-xl mx-auto px-5 text-center">
          <Fade>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-3">Ready to strengthen your ESG strategy?</h2>
            <p className="text-sm text-emerald-100/60 mb-6">Schedule a free 30-minute consultation with one of our ESG specialists.</p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/contact" className="bg-white text-emerald-700 font-semibold text-sm px-7 py-3 rounded-lg hover:bg-emerald-50 transition">Book a Free Consultation</Link>
              <Link href="/reports" className="border border-white/30 text-white font-medium text-sm px-7 py-3 rounded-lg hover:bg-white/10 transition">Browse Reports</Link>
            </div>
          </Fade>
        </div>
      </section>

      <Footer />
    </>
  );
}
