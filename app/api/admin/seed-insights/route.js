import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

function checkAuth(req) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// Full article data from app/insights/[slug]/page.js
const detailArticles = [
  {
    slug: "esg-trends-q1-2026",
    title: "Regulatory Acceleration Across Emerging Markets",
    subtitle: "MindEarth ESG Trends Q1 2026",
    cat: "TRENDS",
    date: "March 15, 2026",
    read_time: "12 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=1800&q=80",
    summary: "A 34% increase in mandatory ESG disclosure requirements across South Asia and the Middle East is reshaping corporate reporting obligations and investor expectations in emerging markets.",
    key_takeaways: [
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
    published: true,
    featured: false,
  },
  {
    slug: "carbon-markets-2025",
    title: "Carbon Markets Grow 22% YoY as Institutional Demand Accelerates",
    subtitle: "MindEarth Market Intelligence",
    cat: "DATA",
    date: "February 28, 2026",
    read_time: "10 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1800&q=80",
    summary: "Voluntary carbon credit transactions reached $2.8B in 2025, driven by corporate net-zero commitments and the operationalisation of Article 6 of the Paris Agreement.",
    key_takeaways: [
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
    published: true,
    featured: false,
  },
  {
    slug: "green-bond-outlook-2028",
    title: "Green Bond Issuance to Cross $1T by 2028",
    subtitle: "Sustainable Finance Outlook",
    cat: "OUTLOOK",
    date: "February 10, 2026",
    read_time: "15 min",
    author: "Saloni Gaikwad",
    img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?w=1800&q=80",
    summary: "Asia-Pacific markets contributing 38% of new issuance volume as sovereign programs scale, with green, social, sustainability, and sustainability-linked bonds collectively surpassing $800B in annual issuance.",
    key_takeaways: [
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
    published: true,
    featured: false,
  },
];

// Listing articles from app/insights/page.js (generate slugs from titles)
const listingArticles = [
  { tag: "RESEARCH", title: "Global ESG Market Report 2026", desc: "Comprehensive analysis of the $92T ESG market — trends, regulatory shifts, and investment flows across 40+ countries.", date: "Mar 2026", read_time: "45 min", featured: true, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { tag: "CASE_STUDY", title: "BRSR Compliance Framework for Indian Mid-Caps", desc: "Step-by-step guide for companies navigating SEBI's BRSR mandate with practical implementation templates.", date: "Feb 2026", read_time: "20 min", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&q=80" },
  { tag: "WHITE_PAPER", title: "Climate Risk as Financial Risk in Emerging Markets", desc: "What TCFD transition means for capital allocation, sovereign risk, and corporate strategy across South Asia and Africa.", date: "Jan 2026", read_time: "15 min", img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80" },
  { tag: "RESEARCH", title: "Green Finance in the Middle East: 2025-2030", desc: "Mapping rapid growth of green bonds, sustainability-linked loans, and ESG-focused sovereign wealth fund strategies in GCC.", date: "Dec 2025", read_time: "35 min", img: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80" },
  { tag: "CASE_STUDY", title: "EU CSRD: Implications for Non-European Multinationals", desc: "How the Corporate Sustainability Reporting Directive affects global supply chains and subsidiary reporting obligations.", date: "Nov 2025", read_time: "18 min", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
  { tag: "WHITE_PAPER", title: "The Biodiversity-Finance Nexus: Why TNFD Matters", desc: "Connecting nature-related financial disclosures to investment decision-making and portfolio risk management.", date: "Oct 2025", read_time: "12 min", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80" },
  { tag: "RESEARCH", title: "Carbon Credit Trading Market Intelligence", desc: "Voluntary carbon credits reached $2.8B in 2025. Deep-dive into pricing dynamics, Article 6, and corporate demand.", date: "Sep 2025", read_time: "40 min", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80" },
  { tag: "CASE_STUDY", title: "Sustainable Supply Chain Benchmarking: APAC 2025", desc: "Benchmarking ESG performance across 500+ supply chain nodes in India, China, Vietnam, and Indonesia.", date: "Aug 2025", read_time: "22 min", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80" },
];

export async function POST(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  try {
    // Prepare detail articles for upsert
    const detailRows = detailArticles.map(a => ({
      slug: a.slug,
      title: a.title,
      subtitle: a.subtitle,
      cat: a.cat,
      date: a.date,
      read_time: a.read_time,
      author: a.author,
      img: a.img,
      summary: a.summary,
      key_takeaways: a.key_takeaways,
      sections: a.sections,
      tags: a.tags,
      related: a.related,
      published: true,
      featured: false,
    }));

    // Prepare listing articles for upsert (generate slugs)
    const listingRows = listingArticles.map(a => ({
      slug: slugify(a.title),
      title: a.title,
      subtitle: null,
      cat: a.tag,
      date: a.date,
      read_time: a.read_time,
      author: "Saloni Gaikwad",
      img: a.img,
      summary: a.desc,
      key_takeaways: [],
      sections: [],
      tags: [],
      related: [],
      published: true,
      featured: a.featured || false,
    }));

    const allRows = [...detailRows, ...listingRows];

    const { data, error } = await supabase
      .from("insights")
      .upsert(allRows, { onConflict: "slug" })
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${data?.length || allRows.length} insights successfully!`,
      count: data?.length || allRows.length,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
