"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Fade from "@/components/Fade";

const articles = {
  "esg-trends-q1-2026": {
    cat: "TRENDS",
    date: "March 15, 2026",
    read: "12 min",
    author: "Saloni Gaikwad",
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
    author: "Saloni Gaikwad",
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
    author: "Saloni Gaikwad",
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

  "brsr-mid-cap": {
    cat: "ADVISORY",
    date: "January 22, 2026",
    read: "20 min",
    author: "Saloni Gaikwad",
    title: "BRSR Compliance: A Practical Framework for Indian Mid-Caps",
    subtitle: "MindEarth Regulatory Advisory",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1800&q=80",
    summary: "SEBI's Business Responsibility and Sustainability Reporting mandate is expanding rapidly beyond the top 150 listed companies. Mid-cap companies now face a compressed timeline to build compliant reporting systems — this framework shows how.",
    keyTakeaways: [
      "BRSR Core now mandatory for top 250 listed companies from FY 2026-27",
      "Third-party assurance required for 9 key ESG metrics under BRSR Core",
      "Data collection is the primary bottleneck — not disclosure writing",
      "A phased 6-month implementation is achievable for most mid-caps",
    ],
    sections: [
      {
        heading: "Why Mid-Caps Are Under-Prepared",
        body: "When SEBI introduced BRSR for the top 1,000 listed companies, most mid-cap firms — those ranked between 150 and 500 by market capitalisation — treated it as a distant regulatory requirement. The assumption was that the complexity and resource requirements of full BRSR compliance were reserved for large-caps with dedicated sustainability teams.\n\nThat assumption is now proving costly. BRSR Core, which mandates reasonable assurance on 9 key performance indicators covering greenhouse gas emissions, energy consumption, water usage, and gender diversity, has been extended to the top 250 companies effective FY 2026-27. Companies outside that threshold but within the top 1,000 face voluntary disclosure obligations that are rapidly becoming de facto mandatory as lenders and institutional investors incorporate BRSR quality into credit and investment decisions.",
      },
      {
        heading: "The Data Architecture Problem",
        body: "The single most common failure mode in BRSR implementation is not disclosure writing — it is data collection. Most mid-cap companies have environmental and social data scattered across plant operations, HR systems, procurement records, and logistics providers, with no centralised aggregation layer.\n\nBuilding a BRSR-ready data architecture requires three parallel workstreams: first, mapping every BRSR indicator to an internal data owner and system of record; second, designing collection templates that can be completed by non-specialists at the plant or department level; and third, establishing a validation and audit trail that will satisfy a third-party assurance provider.\n\nMindEarth recommends beginning this data architecture work at least 12 months before the first reporting deadline. Companies attempting to collect and disclose BRSR data simultaneously in the same quarter routinely produce disclosures with material gaps or inconsistencies that attract SEBI scrutiny.",
        pullQuote: "Data collection — not disclosure writing — is where most mid-cap BRSR implementations stall.",
      },
      {
        heading: "A Phased Implementation Approach",
        body: "Based on our work with 40+ listed companies across manufacturing, financial services, and consumer goods, MindEarth has developed a six-phase BRSR implementation framework that can be completed in six months for most mid-caps.\n\nPhase 1 (Month 1): Gap analysis across all 140+ BRSR indicators, with RAG status and data availability assessment. Phase 2 (Month 2): Materiality assessment and stakeholder engagement to identify priority disclosure areas. Phase 3 (Month 3): Data architecture design, collection template development, and ownership matrix. Phase 4 (Months 4–5): Data collection, validation, and narrative drafting across all BRSR sections. Phase 5 (Month 5): Internal review, management sign-off, and assurance preparation. Phase 6 (Month 6): Final report, board presentation, and SEBI filing support.\n\nThe critical path runs through Phase 3. Companies that under-invest in data infrastructure design consistently encounter problems during collection that cannot be resolved quickly.",
      },
      {
        heading: "Assurance Readiness: What Auditors Look For",
        body: "For BRSR Core indicators subject to reasonable assurance, third-party auditors focus on three things: completeness of the data collection process, quality of the audit trail connecting reported numbers to source systems, and consistency of methodology year-on-year.\n\nThe most common assurance qualification — a finding that reduces credibility with institutional investors and lenders — arises from GHG emission calculations that cannot be traced to underlying activity data or conversion factors. Companies using inconsistent emission factors across reporting periods, or aggregating data from multiple facilities without documented consolidation rules, consistently receive qualified assurance opinions.\n\nMindEarth recommends establishing a documented GHG accounting methodology in Year 1, even if the data is imperfect, so that Year 2 can demonstrate methodological consistency — which auditors value more highly than absolute accuracy in an early reporting year.",
      },
    ],
    tags: ["BRSR", "SEBI", "Mid-Cap", "ESG Disclosure", "Assurance"],
    related: ["esg-trends-q1-2026", "eu-csrd-multinationals"],
  },

  "climate-risk-emerging-markets": {
    cat: "RESEARCH",
    date: "January 12, 2026",
    read: "15 min",
    author: "Saloni Gaikwad",
    title: "Climate Risk as Financial Risk in Emerging Markets",
    subtitle: "MindEarth Climate Research",
    img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1800&q=80",
    summary: "As TCFD becomes mandatory across major financial centres, the gap between how emerging market companies report climate risk and what institutional investors require is creating measurable financing cost differentials — and in some cases, access constraints.",
    keyTakeaways: [
      "Emerging market companies face a 40-80 bps financing premium for poor climate disclosure",
      "Physical risk exposure is highest in South and Southeast Asia — but transition risk dominates investor concern",
      "TCFD adoption in India, Indonesia, and Brazil remains below 15% of listed companies",
      "Early TCFD reporters access 2.3x more ESG-linked capital than peers",
    ],
    sections: [
      {
        heading: "The Disclosure–Financing Gap",
        body: "Climate risk disclosure has transitioned from a voluntary best practice to a quantifiable financial variable. Institutional investors managing $130 trillion in assets under the Net Zero Asset Managers initiative now screen portfolio companies for TCFD alignment as a precondition for capital deployment in listed equity and private credit markets.\n\nFor companies in emerging markets — where TCFD adoption lags developed markets by 8-10 years — this is creating a measurable financing cost differential. MindEarth analysis of 400+ emerging market bond issuances between 2023 and 2025 shows that companies with TCFD-aligned climate disclosures accessed debt capital at 40-80 basis points lower cost than peers with no or inadequate climate risk reporting, controlling for credit rating and sector.",
      },
      {
        heading: "Physical vs. Transition Risk: What Investors Prioritise",
        body: "South and Southeast Asia carry the highest physical climate risk exposure of any region globally — including acute risks from cyclones, flooding, and heat stress, and chronic risks from sea level rise and rainfall pattern disruption. Indian coastal manufacturing and agricultural supply chains, Bangladeshi garment production, and Indonesian palm oil operations face material physical risk that is increasingly visible in insurance pricing and business continuity planning.\n\nHowever, investor concern in the near term is dominated by transition risk — specifically, the risk that policy, technology, or market changes required to achieve net zero will strand assets or disrupt business models before capital can be redeployed. For heavy industries in India, Indonesia, and Brazil — steel, cement, chemicals, and fossil fuel extraction — the transition risk exposure is material and is being incorporated into lender credit models with increasing sophistication.",
        pullQuote: "Companies with TCFD-aligned disclosures accessed debt capital at 40-80 bps lower cost than peers with inadequate climate reporting.",
      },
      {
        heading: "TCFD Adoption: The Current Landscape",
        body: "TCFD adoption among listed companies in major emerging markets remains structurally low. MindEarth estimates that fewer than 15% of NSE-listed companies in India, fewer than 12% of IDX-listed companies in Indonesia, and fewer than 18% of B3-listed companies in Brazil have published TCFD-aligned climate disclosures as of the 2025 reporting cycle.\n\nThe primary barriers are not strategic resistance but operational — companies lack the internal climate science capability to conduct meaningful scenario analysis, and few have mapped their value chain exposure to physical climate parameters. Engaging consultants to conduct TCFD-aligned assessments is increasingly being treated as a pre-financing step by sophisticated issuers preparing ESG-linked debt transactions.",
      },
      {
        heading: "Strategic Recommendations",
        body: "For corporates in high-risk sectors across emerging markets, MindEarth recommends a three-horizon approach to climate risk management. In the near term (0-18 months): conduct a TCFD gap analysis, commission a physical risk screening across key assets, and publish an initial TCFD-aligned climate disclosure — even if scenario analysis is qualitative rather than quantitative. In the medium term (18-36 months): develop quantitative transition risk models, integrate climate risk into capital allocation decisions, and establish Scope 1 and 2 emissions inventory with reduction targets. In the longer term (36+ months): embed climate risk into enterprise risk management, develop Scope 3 assessment methodology, and consider science-based target setting.\n\nCompanies that reach the medium horizon ahead of their peers will find themselves positioned as preferred counterparties for green and sustainability-linked financing — a structural advantage as capital allocation to ESG-aligned assets continues to accelerate.",
      },
    ],
    tags: ["TCFD", "Climate Risk", "Emerging Markets", "South Asia", "Sustainable Finance"],
    related: ["esg-trends-q1-2026", "green-bond-outlook-2028"],
  },

  "tnfd-biodiversity": {
    cat: "OUTLOOK",
    date: "December 18, 2025",
    read: "12 min",
    author: "Saloni Gaikwad",
    title: "The Biodiversity–Finance Nexus: Why TNFD Matters Now",
    subtitle: "MindEarth Nature Intelligence",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80",
    summary: "The Taskforce on Nature-related Financial Disclosures has moved from framework to adoption phase faster than most anticipated. With 400+ organisations now committed to TNFD-aligned reporting, biodiversity is entering mainstream financial risk analysis — and companies operating in nature-dependent sectors face urgent disclosure expectations.",
    keyTakeaways: [
      "Over 400 organisations committed to TNFD-aligned reporting within 12 months of framework launch",
      "$44 trillion of global GDP is moderately or highly dependent on nature",
      "TNFD adopters concentrated in financial services, food & agriculture, and materials sectors",
      "LEAP methodology requires site-level biodiversity footprinting — a new capability for most companies",
    ],
    sections: [
      {
        heading: "From Framework to Adoption: Faster Than Expected",
        body: "When the Taskforce on Nature-related Financial Disclosures published its final recommendations in September 2023, market observers expected a multi-year adoption curve similar to TCFD — where meaningful corporate uptake took five or more years after framework publication.\n\nThe actual adoption trajectory has been significantly steeper. Within 12 months of the TNFD framework launch, over 400 organisations across 47 countries had formally committed to TNFD-aligned reporting, including 7 of the 10 largest global asset managers and 12 sovereign wealth funds. The Kunming-Montréal Global Biodiversity Framework, adopted at COP15, has provided a policy anchor that TCFD lacked at equivalent maturity — with 23 national governments committing to make nature-related financial risk disclosures mandatory or expected by 2030.",
      },
      {
        heading: "Why $44 Trillion in GDP Depends on Nature",
        body: "The World Economic Forum estimates that $44 trillion of global economic value — more than half of global GDP — is moderately or highly dependent on nature and the ecosystem services it provides. These dependencies are not abstract: they include water purification and supply (on which agriculture, food processing, and beverage production directly depend), pollination (critical for crop yields across a $3 trillion global food system), climate regulation (sequestration by forests and oceans moderates the physical risks that financial institutions are now pricing), and raw material provision from forests, fisheries, and mineral systems.\n\nFor companies in food and agriculture, extractives, construction, pharmaceuticals, and consumer goods, the operational dependency on ecosystem services is direct and material. For financial institutions, the exposure is indirect through lending and investment portfolios — but equally significant.",
        pullQuote: "$44 trillion of global GDP is moderately or highly dependent on nature — more than half of the global economy.",
      },
      {
        heading: "The LEAP Methodology: What It Requires",
        body: "TNFD's recommended disclosure methodology — LEAP (Locate, Evaluate, Assess, Prepare) — introduces a site-level approach to biodiversity risk assessment that is fundamentally different from the sector-level, aggregated approach used in most ESG frameworks.\n\nThe Locate phase requires companies to identify all sites of operation and sites in their upstream supply chain that are located in or near biodiversity-sensitive areas — including protected areas, key biodiversity areas, and areas of high ecosystem integrity. This requires geospatial data capabilities that most companies do not currently have.\n\nThe Evaluate phase requires assessment of the company's dependencies on and impacts on biodiversity at each of those sites — a process that typically requires specialist ecological input. The Assess phase translates those dependencies and impacts into financial risk metrics. The Prepare phase translates the findings into TNFD-aligned disclosures.\n\nFor most companies, building LEAP capability requires a two-to-three year programme of tool development, data collection, and organisational capacity building.",
      },
      {
        heading: "Implications for Investors and Lenders",
        body: "For financial institutions, TNFD creates a new category of portfolio risk that must be assessed alongside climate risk. Nature-related risks are in many ways more complex than climate risks: they are more location-specific, involve a wider range of biological and ecological variables, and are harder to aggregate across a diversified portfolio.\n\nDespite this complexity, leading asset managers are beginning to incorporate nature-related risk screens into due diligence processes. Frameworks such as the Biodiversity Footprint Financial Institutions (BFFI) tool and the Partnership for Biodiversity Accounting Financials (PBAF) are being adopted by European banks and insurers, driven by EU regulatory requirements under the Corporate Sustainability Reporting Directive (CSRD) which includes nature-related disclosure obligations.\n\nMindEarth recommends that financial institutions in emerging markets begin mapping their portfolio exposure to nature-dependent sectors now — before regulatory mandates arrive — to avoid the compressed implementation timelines that characterised TCFD adoption.",
      },
    ],
    tags: ["TNFD", "Biodiversity", "Nature Finance", "ESG Disclosure", "COP15"],
    related: ["climate-risk-emerging-markets", "esg-trends-q1-2026"],
  },

  "eu-csrd-multinationals": {
    cat: "ADVISORY",
    date: "December 5, 2025",
    read: "18 min",
    author: "Saloni Gaikwad",
    title: "EU CSRD: Implications for Non-European Multinationals",
    subtitle: "MindEarth Regulatory Advisory",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=80",
    summary: "The Corporate Sustainability Reporting Directive extends well beyond EU borders. Non-European companies with significant EU revenue or large EU subsidiaries face mandatory sustainability reporting obligations — and most are significantly behind on preparation.",
    keyTakeaways: [
      "Non-EU companies with €150M+ EU turnover and an EU subsidiary face CSRD from FY 2028",
      "CSRD requires double materiality assessment — a fundamentally different analytical approach",
      "Value chain disclosures will require suppliers in India, APAC, and emerging markets to provide ESG data",
      "Early preparation is a financing advantage: CSRD-ready companies access EU sustainable finance markets more easily",
    ],
    sections: [
      {
        heading: "Extraterritorial Reach: Who Is Actually Affected",
        body: "The Corporate Sustainability Reporting Directive (CSRD) is widely understood to apply to large EU companies. What is less well understood — and creating significant compliance risk for non-European multinationals — is its extraterritorial scope.\n\nNon-EU companies are in scope for CSRD if they generate net turnover of €150 million or more within the EU and have at least one large subsidiary (balance sheet total above €20 million, or net turnover above €40 million, or more than 250 employees) or listed securities (including debt securities) in the EU. For these companies, the first reporting obligation falls in FY 2028 — but the preparatory work required to produce compliant disclosures typically takes two to three years.\n\nMindEarth estimates that several hundred Indian companies, and thousands of companies across Asia-Pacific, meet the threshold criteria and are currently unaware of or significantly under-prepared for their CSRD obligations.",
      },
      {
        heading: "Double Materiality: A Different Analytical Standard",
        body: "CSRD requires companies to apply double materiality — assessing both financial materiality (how sustainability issues affect the company's financial performance and condition) and impact materiality (how the company affects society and the environment). This is a fundamentally different analytical approach from the single materiality standard used in BRSR, GRI, and most other frameworks, which focus primarily on issues that are material to the company.\n\nConducting a credible double materiality assessment requires engaging with a broad range of stakeholders — employees, suppliers, local communities, customers, and civil society — and using the outputs to determine which sustainability topics must be covered in the sustainability statement. The European Sustainability Reporting Standards (ESRS) provide 12 topical standards, but the double materiality assessment determines which are relevant to each company.\n\nFor non-European companies unfamiliar with the double materiality concept, the assessment process is often the most resource-intensive element of CSRD preparation.",
        pullQuote: "Double materiality requires companies to assess not just how sustainability affects them — but how they affect the world.",
      },
      {
        heading: "Value Chain Disclosure: The Upstream Impact",
        body: "CSRD's value chain disclosure requirements — embedded in the ESRS — will have significant implications for suppliers in India and across Asia-Pacific. EU-headquartered companies subject to CSRD are required to disclose information about their upstream and downstream value chain, including environmental and social performance data from significant suppliers.\n\nIn practice, this means EU buyers will impose ESG data collection obligations on their suppliers as part of routine procurement processes. Suppliers who cannot provide standardised ESG data — energy consumption, GHG emissions, water usage, labour practices, and supplier due diligence — risk being de-listed in favour of suppliers who can.\n\nFor Indian manufacturers, FMCG producers, textile companies, and IT services providers with significant EU customer exposure, building ESG data collection capability is not merely a regulatory exercise — it is a prerequisite for maintaining market access.",
      },
      {
        heading: "Strategic Response for Non-EU Multinationals",
        body: "Companies facing CSRD obligations should treat the 2028 reporting deadline as a three-year preparation programme, not a two-quarter disclosure exercise. The critical path runs through three foundational capabilities that take time to build: double materiality assessment process, value chain data collection systems, and internal audit-quality data governance.\n\nFor companies that are also navigating BRSR, GRI, or TCFD requirements simultaneously, the most efficient approach is a framework convergence strategy — mapping ESRS requirements against other frameworks to identify overlapping data requirements and building a single data collection architecture that can serve multiple disclosure obligations simultaneously. This approach typically reduces the total compliance cost by 30-40% compared to treating each framework as a separate workstream.\n\nMindEarth recommends beginning with a CSRD scoping and gap analysis in 2025, followed by double materiality assessment in 2026, and data architecture build-out in 2026-2027 — leaving the final year for drafting, assurance, and filing.",
      },
    ],
    tags: ["CSRD", "EU Regulation", "Supply Chain", "Double Materiality", "ESRS"],
    related: ["brsr-mid-cap", "esg-trends-q1-2026"],
  },

  "supply-chain-apac": {
    cat: "RESEARCH",
    date: "November 20, 2025",
    read: "22 min",
    author: "Saloni Gaikwad",
    title: "Sustainable Supply Chain Benchmarking: APAC 2025",
    subtitle: "MindEarth Supply Chain Research",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=80",
    summary: "A benchmarking study of ESG performance across 500+ supply chain nodes in India, China, Vietnam, and Indonesia reveals a widening gap between leading companies and their peers — driven primarily by differential investment in supplier capability building rather than policy differences.",
    keyTakeaways: [
      "Top-quartile APAC supply chains outperform bottom-quartile peers by 3.4x on composite ESG score",
      "Supplier capability building — not auditing — is the primary driver of sustained improvement",
      "Carbon intensity in Indian manufacturing supply chains fell 18% between 2022 and 2025",
      "Labour practice transparency remains the lowest-scoring dimension across all four markets",
    ],
    sections: [
      {
        heading: "Study Methodology & Scope",
        body: "MindEarth conducted a structured ESG benchmarking study across 520 supply chain nodes in India (180 nodes), China (140 nodes), Vietnam (110 nodes), and Indonesia (90 nodes) between Q1 and Q3 2025. Nodes were selected across six manufacturing sectors: textiles and apparel, electronics, automotive components, food processing, chemicals, and building materials.\n\nEach node was assessed across four ESG dimensions: environmental performance (energy intensity, GHG emissions, water consumption, waste generation), social performance (labour practices, health and safety, community impact), governance (supply chain transparency, anti-corruption, data quality), and supply chain management (Tier 2 and Tier 3 supplier engagement, audit processes, capability building programmes).\n\nScores were normalised within each sector to control for inherent differences in environmental intensity across industries. The composite ESG score represents a weighted average across all four dimensions.",
      },
      {
        heading: "The Performance Gap Is Widening",
        body: "The most significant finding of the 2025 benchmarking study is the widening performance gap between top-quartile and bottom-quartile supply chain nodes. The composite ESG score differential between the top and bottom quartiles has increased from 2.1x in 2022 to 3.4x in 2025 — indicating that leading companies are improving faster than laggards.\n\nThis divergence is not primarily driven by capital investment in cleaner technology. Analysis of the performance improvement drivers shows that the single most important factor distinguishing top-quartile performers is systematic supplier capability building — structured programmes that provide training, tools, and technical assistance to Tier 1 and Tier 2 suppliers — rather than increased audit frequency or contractual compliance requirements.\n\nTop-quartile companies in the sample spend on average 1.8% of supply chain procurement value on supplier capability building programmes. Bottom-quartile companies spend 0.3%.",
        pullQuote: "Top-quartile APAC supply chains outperform bottom-quartile peers by 3.4x — a gap that is widening, not narrowing.",
      },
      {
        heading: "Country-Level Findings",
        body: "Indian supply chain nodes showed the most significant improvement in environmental performance, with carbon intensity in manufacturing falling 18% between 2022 and 2025 — driven by rapid renewable energy adoption, increasing energy efficiency in steel and cement production, and expanded solar procurement by large manufacturers.\n\nChinese nodes continued to lead on environmental metrics in absolute terms, benefiting from national carbon market incentives and regulatory pressure under China's dual carbon policy. However, governance and transparency scores for Chinese nodes remain structurally lower than Indian, Vietnamese, and Indonesian peers, reflecting limited third-party disclosure and audit access.\n\nVietnamese nodes showed the most improvement in social performance, driven by government-led minimum wage reforms and increased investment by EU and US buyers following CSRD and supply chain due diligence legislation. Indonesian nodes showed improvement in environmental scores but continue to lag on deforestation-related metrics in the palm oil and rubber supply chains.",
      },
      {
        heading: "Recommendations for Buyers and Suppliers",
        body: "For companies managing APAC supply chains, MindEarth recommends three priority actions based on the benchmarking findings. First, shift investment from audit-centric compliance to capability-building programmes — structured training, technical assistance, and peer learning networks for key Tier 1 suppliers. The data consistently shows that capability building produces more durable performance improvement than audit pressure alone.\n\nSecond, prioritise labour practice transparency as the highest-risk disclosure gap. Labour practice scores are the lowest-performing dimension across all four markets and are the primary target of EU and US supply chain due diligence regulations, including the German Supply Chain Due Diligence Act and the proposed EU Corporate Sustainability Due Diligence Directive.\n\nThird, begin collecting Scope 3 emissions data from key suppliers now. Companies that have already built supplier emissions data collection processes — even if imperfect — will be significantly better positioned to meet the CSRD and SBTi Scope 3 disclosure requirements that will become standard expectations for large buyers within the next two to three years.",
      },
    ],
    tags: ["Supply Chain", "APAC", "ESG Performance", "Benchmarking", "Scope 3"],
    related: ["eu-csrd-multinationals", "climate-risk-emerging-markets"],
  },
  "just-transition-finance-asia": {
    cat: "RESEARCH",
    date: "April 28, 2026",
    read: "16 min",
    author: "Saloni Gaikwad",
    title: "Just Transition Finance: Capital for Coal Phase-Down in Asia",
    subtitle: "MindEarth Climate Finance Research",
    img: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1800&q=80",
    summary: "An estimated $1.4 trillion is needed to fund a socially equitable coal-to-clean transition across India, Indonesia, Vietnam, and the Philippines. Blended finance vehicles — combining concessional capital from DFIs with commercial debt and equity — are emerging as the dominant deployment structure, but execution lags far behind capital commitments.",
    keyTakeaways: [
      "$1.4T transition financing gap identified across four major Asian coal economies",
      "JETP commitments of $47.5B remain 73% undisbursed three years after launch",
      "Indonesia's PT PLN plans early retirement of 6.7GW coal capacity by 2030",
      "Worker reskilling and community transition costs estimated at 8-12% of total capex",
    ],
    sections: [
      {
        heading: "The Scale of the Challenge",
        body: "Asia accounts for 78% of global coal power capacity and over 80% of new coal plant additions in the past five years. A credible 1.5°C-aligned transition pathway requires the early retirement of 540 GW of coal capacity across Asia by 2035 — capacity that currently underpins national grids, employment in mining regions, and tax revenues for sub-sovereign governments.\n\nMindEarth's analysis, drawing on IEA, IRENA, and country-level grid operator data, estimates the total just transition financing requirement across India, Indonesia, Vietnam, and the Philippines at $1.4 trillion through 2040. This includes capital costs for replacement renewable capacity ($820B), grid modernisation and storage ($310B), and just transition components — worker reskilling, community development, and stranded asset compensation ($270B).",
      },
      {
        heading: "Just Energy Transition Partnerships (JETPs)",
        body: "The JETP model, launched at COP26 with the South Africa partnership and subsequently extended to Indonesia, Vietnam, and Senegal, represents the most ambitious multilateral attempt to mobilise just transition finance. Cumulative JETP commitments now total $47.5 billion, with Indonesia ($20B) and Vietnam ($15.5B) representing the largest Asian programmes.\n\nHowever, disbursement has been slow. Three years after the South Africa JETP launch, only 27% of committed funds have been disbursed, and substantial portions have funded studies and technical assistance rather than physical transition activities. Indonesia's JETP Comprehensive Investment and Policy Plan (CIPP) faces delays in finalising the project pipeline and resolving disagreements over the treatment of captive coal plants serving industrial customers.",
        pullQuote: "Three years after the South Africa JETP launch, only 27% of committed funds have been disbursed.",
      },
      {
        heading: "Blended Finance Structures",
        body: "The emerging consensus among DFIs and commercial lenders is that blended finance — combining concessional capital from public sources with commercial debt and equity — is the most viable structure for funding just transition at scale. Concessional capital absorbs first-loss risk, enabling commercial investors to participate at acceptable risk-adjusted returns.\n\nIndonesia's PT PLN early retirement programme for 6.7 GW of coal capacity by 2030 is being structured as a blended vehicle, with ADB and World Bank providing concessional debt at 2.5-3.5% interest rates alongside commercial syndicated loans at 6.5-7.5%. The blended cost of capital of approximately 5.2% makes early retirement economically viable relative to continuing operations.",
      },
      {
        heading: "The Social Dimension",
        body: "Worker reskilling, community transition, and just labour outcomes are not optional ESG accessories — they are the core political precondition for credible transition pathways. MindEarth's case studies of coal community transitions in Germany, Poland, and the UK indicate that successful programmes invest 8-12% of total transition capex in social components, including early retirement packages for older workers, retraining for younger workers, economic diversification grants for affected municipalities, and continued healthcare and education access during transition periods.\n\nAsian transition programmes have historically under-invested in this dimension. The Just Transition Investment Platforms being developed in Indonesia and Vietnam are attempting to address this through dedicated funding windows for social programmes, but design choices around eligibility, governance, and disbursement mechanisms will determine actual impact.",
      },
    ],
    tags: ["Just Transition", "Coal Phase-Down", "JETP", "Blended Finance", "Asia Climate"],
    related: ["green-bond-outlook-2028", "climate-risk-emerging-markets"],
  },
  "scope-3-emissions-accountability": {
    cat: "ADVISORY",
    date: "April 14, 2026",
    read: "14 min",
    author: "Saloni Gaikwad",
    title: "Scope 3 Emissions: From Estimation to Accountability",
    subtitle: "MindEarth Carbon Strategy Advisory",
    img: "https://images.unsplash.com/photo-1565891741441-64926e441838?w=1800&q=80",
    summary: "Most corporates still report Scope 3 emissions using spend-based EEIO methods that are useful for screening but inadequate for credible decarbonisation. The next 24 months will see a decisive shift toward supplier-specific, primary-data approaches — driven by SBTi validation requirements, CSRD assurance obligations, and investor pressure.",
    keyTakeaways: [
      "73% of Scope 3 disclosures still rely on spend-based EEIO factors",
      "SBTi will require activity-based data for Scope 3 targets from FY 2027",
      "CSRD limited assurance triggers a step-change in primary data demands",
      "Supplier engagement programmes deliver 35-60% emissions visibility uplift",
    ],
    sections: [
      {
        heading: "Why Scope 3 Now Matters Financially",
        body: "Scope 3 emissions — those occurring across a company's value chain but outside its operational boundaries — typically represent 70-90% of a company's total carbon footprint. For asset-light sectors including financial services, technology, retail, and pharmaceuticals, the proportion is even higher.\n\nUntil recently, Scope 3 disclosure was treated as a secondary metric, with most companies reporting estimates based on environmentally-extended input-output (EEIO) factors applied to procurement spend. This approach satisfies disclosure obligations but provides limited operational insight and is increasingly recognised as inadequate for credible decarbonisation strategies. CSRD's limited assurance requirements, SBTi's tightening validation criteria, and investor due diligence questionnaires now demand activity-based, supplier-specific data.",
      },
      {
        heading: "The SBTi Transition",
        body: "The Science Based Targets initiative will require companies setting or revalidating Scope 3 targets after FY 2027 to use activity-based emissions factors rather than spend-based EEIO factors for at least 67% of Scope 3 inventory by Category. This represents a significant operational shift for the 5,400+ companies with validated SBTi targets, most of which currently use spend-based methods.\n\nThe transition will require companies to systematically engage their top 200-500 suppliers (typically representing 60-80% of procurement spend) to collect product-level or facility-level emissions data, validated through documented methodologies.",
        pullQuote: "SBTi will require activity-based data for at least 67% of Scope 3 inventory by Category from FY 2027.",
      },
      {
        heading: "Building Supplier Data Programmes",
        body: "MindEarth's experience supporting corporate supplier engagement programmes across India, the EU, and ASEAN identifies four success factors. First, segment suppliers by emissions materiality rather than spend — a high-emissions intensity supplier with $5M annual spend may matter more than a $50M spend low-intensity supplier. Second, integrate data requests into existing procurement and qualification processes rather than running parallel sustainability surveys. Third, provide suppliers with technical assistance — many SMEs lack the carbon accounting capabilities to respond credibly to data requests. Fourth, design data infrastructure for incremental quality improvement rather than perfect-first-attempt completeness.\n\nWell-designed programmes typically deliver 35-60% emissions visibility uplift within 18 months — moving from blanket EEIO factors to a hybrid model where high-materiality suppliers report primary data and low-materiality categories continue with proxy estimates.",
      },
      {
        heading: "Investor and Regulator Expectations",
        body: "Asset managers and proxy advisors have rapidly elevated Scope 3 from a disclosure-only item to a financial materiality factor. ISS and Glass Lewis voting guidelines now consider Scope 3 disclosure quality and target ambition when evaluating director re-election and say-on-climate votes. Major asset managers including Norges Bank, Legal & General, and Aviva have published explicit Scope 3 expectations applied across their portfolio engagement.\n\nOn the regulatory side, CSRD's limited assurance requirements (mandatory from FY 2024 for in-scope companies) trigger a step-change in primary data demands, since assurance providers cannot validate EEIO-based estimates beyond confirming methodology disclosure. Companies anticipating reasonable assurance requirements (currently targeted for FY 2028) need to begin building supplier data infrastructure now.",
      },
    ],
    tags: ["Scope 3", "GHG Protocol", "SBTi", "CSRD", "Value Chain"],
    related: ["carbon-markets-2025", "supply-chain-apac"],
  },
  "india-ccts-year-one": {
    cat: "MARKET INTELLIGENCE",
    date: "April 2, 2026",
    read: "11 min",
    author: "Saloni Gaikwad",
    title: "India's Carbon Credit Trading Scheme: Year One Review",
    subtitle: "MindEarth Carbon Market Intelligence",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1800&q=80",
    summary: "Twelve months into operation, India's CCTS has generated 12M credits, established price discovery in the ₹650-₹2,200/tCO₂e band, and exposed the structural gaps obligated entities must address before Phase II compliance kicks in for nine high-emission sectors.",
    keyTakeaways: [
      "12M credits issued in Year 1, primarily renewable energy and energy efficiency",
      "Price band of ₹650-₹2,200/tCO₂e established across trading sessions",
      "Phase II compliance covers 9 sectors including iron & steel, cement, aluminium",
      "MRV infrastructure remains the binding constraint on credit supply",
    ],
    sections: [
      {
        heading: "Scheme Architecture and Year One Activity",
        body: "India's Carbon Credit Trading Scheme (CCTS), notified under the Energy Conservation (Amendment) Act 2022, became operational in 2025 with the Bureau of Energy Efficiency (BEE) as scheme administrator and the Power Exchange of India (IEX) handling trading infrastructure. The scheme operates a dual mechanism — a compliance market for obligated entities in energy-intensive sectors and a parallel offset mechanism for voluntary participants generating credits from non-obligated activities.\n\nIn its first year of operation, the CCTS issued 12 million credits, the majority sourced from renewable energy generation (61%), industrial energy efficiency improvements (24%), and methane abatement projects (8%). Trading volumes ramped from initial weekly sessions of 50,000-80,000 credits in Q1 to 280,000-340,000 credits per week by Q4, with the registered participant base growing from 87 entities at launch to 412 by year-end.",
      },
      {
        heading: "Price Discovery and Market Behaviour",
        body: "Price discovery during Year 1 established a trading band of ₹650-₹2,200 per tCO₂e (approximately $8-$26), with significant intra-period variation reflecting credit vintage, project type, and verification status. Renewable energy credits with recent vintages traded at the upper end of the range, while older energy efficiency credits from PAT-scheme conversions traded near the floor.\n\nThe price band remains substantially below the implicit carbon prices embedded in EU ETS (€85-€95/tCO₂e) and the UK ETS, reflecting both the early stage of the Indian market and the abundance of low-cost abatement opportunities in renewable energy and industrial efficiency. MindEarth expects prices to firm as Phase II compliance obligations bring nine additional sectors into the demand pool from FY 2027-28.",
        pullQuote: "Phase II compliance obligations will bring nine additional sectors into the demand pool from FY 2027-28.",
      },
      {
        heading: "Phase II Compliance Sectors",
        body: "Phase II of the CCTS, scheduled for activation in FY 2027-28, expands compliance obligations to nine high-emission sectors: iron and steel, cement, aluminium, pulp and paper, chlor-alkali, fertilisers, petrochemicals, refineries, and textiles. Together these sectors account for approximately 40% of India's industrial emissions and 28% of total national emissions.\n\nDraft sectoral emission intensity benchmarks have been issued for consultation, with final targets expected by Q3 2026. Obligated entities exceeding their benchmarks must either reduce emissions, purchase compliance credits, or pay the regulatory penalty (capped at twice the prevailing market price). Early estimates suggest 60-70% of Phase II entities will be net buyers in the initial compliance cycle, creating substantial demand-side pressure.",
      },
      {
        heading: "Structural Constraints and Outlook",
        body: "The binding constraint on CCTS market development in Year 1 was MRV (monitoring, reporting, verification) infrastructure — specifically the limited capacity of accredited verifiers and the time-consuming validation processes for new project methodologies. As of year-end, 23 verification agencies had been accredited, but processing times for new project registrations averaged 8-12 months.\n\nMindEarth projects credit issuance will reach 28-35 million annually by FY 2028 as MRV infrastructure scales and Phase II obligated entities begin participating. Price evolution will depend critically on the calibration of Phase II benchmarks — overly stringent targets risk creating supply shortages and price spikes, while overly lenient targets undermine the scheme's environmental credibility.",
      },
    ],
    tags: ["CCTS", "India", "Carbon Markets", "Compliance", "BEE"],
    related: ["carbon-markets-2025", "esg-trends-q1-2026"],
  },
};

export default function InsightArticle() {
  const { slug } = useParams();
  const [dbArticle, setDbArticle] = useState(null);
  const [pdfTooltip, setPdfTooltip] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/insights/${slug}`)
      .then(r => r.json())
      .then(json => {
        if (json.insight) {
          // Map DB snake_case to component format
          const i = json.insight;
          setDbArticle({
            cat: i.cat,
            date: i.date,
            read: i.read_time,
            author: i.author,
            title: i.title,
            subtitle: i.subtitle,
            img: i.img,
            summary: i.summary,
            keyTakeaways: i.key_takeaways || [],
            sections: i.sections || [],
            tags: i.tags || [],
            related: i.related || [],
            pdf_url: i.pdf_url,
          });
        }
      })
      .catch(() => {});
  }, [slug]);

  // Use DB data if available, fall back to hardcoded
  const article = dbArticle || articles[slug];

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

      {/* ═══ AUTHOR & META BAR (KPMG-style) ═══ */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-[860px] mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Author block */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0A2540] flex items-center justify-center text-white text-sm font-bold tracking-wide shrink-0">SG</div>
              <div>
                <p className="text-[17px] font-semibold text-[#0A2540] leading-tight">{article.author}</p>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                  <span className="text-[13px] text-gray-500">{article.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-[13px] text-gray-500">{article.read} read</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className={`text-[11px] font-bold tracking-[0.15em] uppercase px-2.5 py-0.5 rounded-full ${article.cat === "TRENDS" ? "text-emerald-700 bg-emerald-50" : article.cat === "DATA" ? "text-sky-700 bg-sky-50" : "text-amber-700 bg-amber-50"}`}>{article.cat}</span>
                </div>
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex items-center gap-2.5">
              <button className="text-[12px] font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">Share</button>
              <div className="relative">
                <button
                  onClick={() => {
                    if (article.pdf_url) {
                      window.open(article.pdf_url, "_blank");
                    } else {
                      setPdfTooltip(true);
                      setTimeout(() => setPdfTooltip(false), 2000);
                    }
                  }}
                  className="text-[12px] font-semibold text-white bg-[#0B6E4F] px-4 py-2 rounded-lg hover:bg-[#095C42] transition"
                >
                  Download PDF
                </button>
                {pdfTooltip && (
                  <div className="absolute top-full mt-2 right-0 bg-gray-800 text-white text-[11px] px-3 py-1.5 rounded-md whitespace-nowrap z-50">
                    PDF coming soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT AREA ═══ */}
      <article className="bg-white py-16">
        <div className="max-w-[860px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_280px] gap-16">

            {/* Main Content */}
            <div className="min-w-0">
              {/* Key Takeaways — mobile only (desktop shows in sidebar) */}
              {article.keyTakeaways?.length > 0 && (
                <div className="lg:hidden bg-[#F8FAFC] rounded-xl p-5 border border-gray-100 mb-10">
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
              )}
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
