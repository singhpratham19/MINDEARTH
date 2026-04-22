/**
 * Excel → Report Data Parser
 *
 * Parses a structured Excel workbook into the report data format.
 * Each sheet maps to a section of the report.
 *
 * SHEETS:
 *   1. "Basic Info"       — title, code, price, cagr, etc.
 *   2. "Segments"         — segment lists + segment tables
 *   3. "Companies"        — company names, HQs, capabilities, domains
 *   4. "Regions"          — region table + region list
 *   5. "Drivers"          — market drivers
 *   6. "Restraints"       — market restraints
 *   7. "Key Takeaways"    — bullet points
 *   8. "Analysis Content" — long-form text blocks
 *   9. "FAQs"             — question / answer pairs
 *  10. "Developments"     — date + description
 *  11. "TOC"              — table of contents lines
 *  12. "Scope"            — report scope fields
 *  13. "ESG Content"      — all ESG sub-tables
 */

import * as XLSX from "xlsx";

/* ── helpers ── */
function getSheet(wb, name) {
  // Case-insensitive sheet lookup
  const key = wb.SheetNames.find(s => s.toLowerCase().replace(/[^a-z]/g, "") === name.toLowerCase().replace(/[^a-z]/g, ""));
  return key ? XLSX.utils.sheet_to_json(wb.Sheets[key], { defval: "" }) : [];
}

function getRawSheet(wb, name) {
  const key = wb.SheetNames.find(s => s.toLowerCase().replace(/[^a-z]/g, "") === name.toLowerCase().replace(/[^a-z]/g, ""));
  return key ? XLSX.utils.sheet_to_json(wb.Sheets[key], { header: 1, defval: "" }) : [];
}

function getCell(rows, field) {
  const row = rows.find(r => {
    const key = String(r.Field || r.field || Object.values(r)[0] || "").toLowerCase().trim();
    return key === field.toLowerCase();
  });
  if (!row) return "";
  return String(row.Value || row.value || Object.values(row)[1] || "").trim();
}

function splitList(val) {
  if (!val) return [];
  return String(val).split(/[,;\n]/).map(s => s.trim()).filter(Boolean);
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* ── main parser ── */
export function parseExcelToReport(buffer) {
  const wb = XLSX.read(buffer, { type: "array" });

  // 1. Basic Info (key-value pairs: Field | Value)
  const basic = getSheet(wb, "BasicInfo");
  const title = getCell(basic, "title") || getCell(basic, "report title") || "";
  const report = {
    slug: getCell(basic, "slug") || slugify(title),
    title,
    code: getCell(basic, "code") || getCell(basic, "report code") || "",
    price: Number(getCell(basic, "price")) || 0,
    pages: Number(getCell(basic, "pages")) || 0,
    cagr: getCell(basic, "cagr") || "",
    period: getCell(basic, "period") || getCell(basic, "study period") || "",
    cat: getCell(basic, "category") || getCell(basic, "cat") || "Energy",
    badge: getCell(basic, "badge") || "",
    size: getCell(basic, "market size") || getCell(basic, "size") || "",
    baseYear: getCell(basic, "base year") || getCell(basic, "baseyear") || "",
    img: getCell(basic, "image url") || getCell(basic, "img") || "",
    desc: getCell(basic, "description") || getCell(basic, "desc") || "",
    overview: getCell(basic, "overview") || "",
    marketConcentration: getCell(basic, "market concentration") || "",
    fastestGrowingRegion: getCell(basic, "fastest growing region") || "",
    largestRegion: getCell(basic, "largest region") || "",
    published: (getCell(basic, "published") || "").toLowerCase() === "true" || (getCell(basic, "published") || "").toLowerCase() === "yes",
  };

  // 2. Segments
  const segs = getSheet(wb, "Segments");
  report.segments = [];
  report.segmentsByTech = [];
  report.segmentsByApp = [];
  report.segmentTables = {};

  const segRows = segs.filter(r => r.Type || r.type);
  const segTypes = {};
  segRows.forEach(r => {
    const type = String(r.Type || r.type || "").toLowerCase().trim();
    const name = String(r.Name || r.name || r.Segment || r.segment || "").trim();
    const share = String(r.Share || r.share || "").trim();
    const cagr = String(r.CAGR || r.cagr || "").trim();
    const tag = String(r.Tag || r.tag || "").trim() || null;

    if (type === "primary" || type === "rig type" || type === "segment") {
      report.segments.push(name);
      if (!segTypes.primary) segTypes.primary = [];
      segTypes.primary.push({ name, share, cagr, tag });
    } else if (type === "technology" || type === "tech") {
      report.segmentsByTech.push(name);
      if (!segTypes.technology) segTypes.technology = [];
      segTypes.technology.push({ name, share, cagr, tag });
    } else if (type === "application" || type === "app") {
      report.segmentsByApp.push(name);
      if (!segTypes.application) segTypes.application = [];
      segTypes.application.push({ name, share, cagr, tag });
    }
  });
  // Build segmentTables from types that have share data
  if (segTypes.primary?.some(s => s.share)) report.segmentTables.rigType = segTypes.primary;
  if (segTypes.technology?.some(s => s.share)) report.segmentTables.technology = segTypes.technology;
  if (segTypes.application?.some(s => s.share)) report.segmentTables.application = segTypes.application;

  // 3. Companies
  const comps = getSheet(wb, "Companies");
  report.companies = [];
  report.domains = [];
  report.companyTable = [];
  comps.forEach(r => {
    const name = String(r.Name || r.name || r.Company || r.company || "").trim();
    if (!name) return;
    report.companies.push(name);
    report.domains.push(String(r.Domain || r.domain || r.Website || r.website || "").trim());
    report.companyTable.push({
      name,
      hq: String(r.HQ || r.hq || r.Headquarters || r.headquarters || "").trim(),
      capabilities: String(r.Capabilities || r.capabilities || r.Description || r.description || "").trim(),
    });
  });

  // 4. Regions
  const regs = getSheet(wb, "Regions");
  report.regions = [];
  report.regionTable = [];
  regs.forEach(r => {
    const name = String(r.Name || r.name || r.Region || r.region || "").trim();
    if (!name) return;
    report.regions.push(name);
    report.regionTable.push({
      name,
      share: String(r.Share || r.share || "").trim(),
      cagr: String(r.CAGR || r.cagr || "").trim(),
      factors: String(r.Factors || r.factors || r.Description || r.description || "").trim(),
    });
  });

  // 5. Drivers
  const drivers = getSheet(wb, "Drivers");
  report.drivers = drivers.map(r => ({
    title: String(r.Title || r.title || r.Driver || r.driver || "").trim(),
    impact: String(r.Impact || r.impact || "").trim(),
    geo: String(r.Geo || r.geo || r.Geography || r.geography || "").trim(),
    timeline: String(r.Timeline || r.timeline || "").trim(),
  })).filter(d => d.title);

  // 6. Restraints
  const restraints = getSheet(wb, "Restraints");
  report.restraints = restraints.map(r => ({
    title: String(r.Title || r.title || r.Restraint || r.restraint || "").trim(),
    impact: String(r.Impact || r.impact || "").trim(),
    geo: String(r.Geo || r.geo || r.Geography || r.geography || "").trim(),
    timeline: String(r.Timeline || r.timeline || "").trim(),
  })).filter(d => d.title);

  // 7. Key Takeaways
  const takeaways = getSheet(wb, "KeyTakeaways");
  report.keyTakeaways = takeaways
    .map(r => String(r.Takeaway || r.takeaway || r.Text || r.text || Object.values(r)[0] || "").trim())
    .filter(Boolean);

  // 8. Analysis Content
  const analysis = getSheet(wb, "AnalysisContent");
  report.analysisContent = {};
  analysis.forEach(r => {
    const key = String(r.Key || r.key || r.Section || r.section || Object.values(r)[0] || "").trim();
    const val = String(r.Content || r.content || r.Text || r.text || Object.values(r)[1] || "").trim();
    if (key && val) report.analysisContent[key] = val;
  });

  // 9. FAQs
  const faqs = getSheet(wb, "FAQs");
  if (faqs.length) {
    if (!report.analysisContent) report.analysisContent = {};
    report.analysisContent.faqs = faqs.map(r => ({
      q: String(r.Question || r.question || r.Q || r.q || "").trim(),
      a: String(r.Answer || r.answer || r.A || r.a || "").trim(),
    })).filter(f => f.q && f.a);
  }

  // 10. Developments
  const devs = getSheet(wb, "Developments");
  report.developments = devs.map(r => ({
    date: String(r.Date || r.date || "").trim(),
    text: String(r.Text || r.text || r.Description || r.description || "").trim(),
  })).filter(d => d.text);

  // 11. TOC
  const tocRows = getSheet(wb, "TOC");
  report.toc = tocRows
    .map(r => String(r.Entry || r.entry || r.TOC || r.toc || r.Title || r.title || Object.values(r)[0] || "").trim())
    .filter(Boolean);

  // 12. Scope
  const scopeRows = getSheet(wb, "Scope");
  if (scopeRows.length) {
    report.analysisContent = report.analysisContent || {};
    report.analysisContent.scope = {};
    scopeRows.forEach(r => {
      const key = String(r.Field || r.field || r.Key || r.key || Object.values(r)[0] || "").trim();
      const val = String(r.Value || r.value || Object.values(r)[1] || "").trim();
      if (key && val) {
        // Convert to camelCase key
        const camelKey = key.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+(.)/g, (_, c) => c.toUpperCase()).replace(/^\w/, c => c.toLowerCase());
        report.analysisContent.scope[camelKey] = val;
      }
    });
  }

  // 13. ESG Content
  report.esgContent = parseESGSheets(wb);

  return report;
}

function parseESGSheets(wb) {
  // Check if any ESG sheet exists
  const hasESG = wb.SheetNames.some(s => s.toLowerCase().includes("esg"));
  if (!hasESG) return null;

  const esg = {};

  // ESG Basic
  const esgBasic = getSheet(wb, "ESGContent") || getSheet(wb, "ESG");
  if (esgBasic.length) {
    esg.subtitle = getCell(esgBasic, "subtitle") || "";
  }

  // GRI Framework
  const gri = getSheet(wb, "GRIFramework") || getSheet(wb, "ESGGRIFramework");
  if (gri.length) {
    esg.griFramework = gri.map(r => ({
      series: String(r.Series || r.series || "").trim(),
      covers: String(r.Covers || r.covers || "").trim(),
      stds: String(r.Standards || r.standards || r.Stds || r.stds || "").trim(),
      relevance: String(r.Relevance || r.relevance || "").trim(),
    })).filter(g => g.series);
  }

  // Regulatory Drivers
  const regDrivers = getSheet(wb, "RegulatoryDrivers") || getSheet(wb, "ESGRegulatoryDrivers");
  if (regDrivers.length) {
    esg.regulatoryDrivers = regDrivers.map(r => ({
      tag: String(r.Tag || r.tag || r.Name || r.name || "").trim(),
      color: String(r.Color || r.color || "bg-blue-600").trim(),
      desc: String(r.Description || r.description || r.Desc || r.desc || "").trim(),
    })).filter(g => g.tag);
  }

  // Material Risks
  const risks = getSheet(wb, "MaterialRisks") || getSheet(wb, "ESGMaterialRisks");
  if (risks.length) {
    esg.materialRisks = risks.map(r => ({
      risk: String(r.Risk || r.risk || r.Name || r.name || "").trim(),
      pillar: String(r.Pillar || r.pillar || "").trim(),
      level: String(r.Level || r.level || "").trim(),
      levelColor: String(r.LevelColor || r.levelColor || r["Level Color"] || "bg-red-600").trim(),
      drivers: String(r.Drivers || r.drivers || "").trim(),
      exposure: String(r.Exposure || r.exposure || "").trim(),
      detail: String(r.Detail || r.detail || r.Details || r.details || "").trim(),
    })).filter(g => g.risk);
  }

  // Solutions
  const sols = getSheet(wb, "ESGSolutions") || getSheet(wb, "Solutions");
  if (sols.length) {
    esg.solutions = sols.map(r => ({
      title: String(r.Title || r.title || r.Solution || r.solution || "").trim(),
      gri: String(r.GRI || r.gri || "").trim(),
      desc: String(r.Description || r.description || r.Desc || r.desc || "").trim(),
    })).filter(g => g.title);
  }

  // KPIs
  const kpis = getSheet(wb, "ESGKPIs") || getSheet(wb, "KPIs");
  if (kpis.length) {
    esg.kpis = kpis.map((r, i) => ({
      n: i + 1,
      topic: String(r.Topic || r.topic || "").trim(),
      metrics: String(r.Metrics || r.metrics || "").trim(),
    })).filter(g => g.topic);
  }

  // Investor Landscape
  const inv = getSheet(wb, "InvestorLandscape") || getSheet(wb, "ESGInvestorLandscape");
  if (inv.length) {
    esg.investorLandscape = inv.map(r => ({
      segment: String(r.Segment || r.segment || "").trim(),
      examples: String(r.Examples || r.examples || "").trim(),
      framework: String(r.Framework || r.framework || "").trim(),
      criteria: String(r.Criteria || r.criteria || "").trim(),
      posture: String(r.Posture || r.posture || "").trim(),
      posColor: String(r.PosColor || r.posColor || r["Pos Color"] || "text-blue-600 bg-blue-50").trim(),
    })).filter(g => g.segment);
  }

  // Benchmarks
  const bench = getSheet(wb, "ESGBenchmarks") || getSheet(wb, "Benchmarks");
  if (bench.length) {
    esg.benchmarks = bench.map(r => ({
      label: String(r.Label || r.label || "").trim(),
      value: String(r.Value || r.value || "").trim(),
      unit: String(r.Unit || r.unit || "").trim(),
      sub: String(r.Sub || r.sub || r.Note || r.note || "").trim(),
    })).filter(g => g.label);
  }

  // Return null if no ESG data was found
  const hasData = Object.keys(esg).some(k => k !== "subtitle" && esg[k] && (Array.isArray(esg[k]) ? esg[k].length > 0 : true));
  return hasData ? esg : null;
}

/* ── Template generator ── */
export function generateTemplate() {
  const wb = XLSX.utils.book_new();

  // 1. Basic Info
  const basicData = [
    ["Field", "Value"],
    ["Title", "Global Onshore Drilling Market"],
    ["Slug", "onshore-drilling-market"],
    ["Code", "ME-ENR-058"],
    ["Category", "Energy"],
    ["Badge", "New"],
    ["Price", "5250"],
    ["Pages", "298"],
    ["Market Size", "$85.4B"],
    ["CAGR", "5.70%"],
    ["Period", "2026–2031"],
    ["Base Year", "2025"],
    ["Image URL", "https://images.unsplash.com/photo-example?w=500&q=80"],
    ["Description", "Short description for the report card listing (1-2 sentences)"],
    ["Overview", "Full overview paragraph shown on the report detail page (can be long)"],
    ["Market Concentration", "Moderate"],
    ["Fastest Growing Region", "Middle East & Africa"],
    ["Largest Region", "North America"],
    ["Published", "true"],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(basicData);
  ws1["!cols"] = [{ wch: 25 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, ws1, "Basic Info");

  // 2. Segments
  const segData = [
    ["Type", "Name", "Share", "CAGR", "Tag"],
    ["Primary", "Conventional Land Rigs", "58.3%", "4.8%", "Largest"],
    ["Primary", "Directional / Horizontal", "28.9%", "7.73%", "Fastest"],
    ["Primary", "Slim-Hole / Portable", "12.8%", "5.2%", ""],
    ["Technology", "Top-Drive Systems", "44.6%", "5.1%", "Largest"],
    ["Technology", "Conventional Rotary", "33.1%", "3.8%", ""],
    ["Technology", "Automated & Smart Drilling", "22.3%", "9.40%", "Fastest"],
    ["Application", "Oil Production Drilling", "52.1%", "4.9%", "Largest"],
    ["Application", "Natural Gas Exploration", "31.4%", "6.80%", "Fastest"],
    ["Application", "Geothermal & Minerals", "16.5%", "8.2%", ""],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(segData);
  ws2["!cols"] = [{ wch: 15 }, { wch: 35 }, { wch: 10 }, { wch: 10 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, ws2, "Segments");

  // 3. Companies
  const compData = [
    ["Name", "HQ", "Capabilities", "Domain"],
    ["SLB (Schlumberger)", "Houston, USA / Paris", "MWD/LWD, Rotary Steerable Systems, Autonomous Drilling", "slb.com"],
    ["Halliburton Company", "Houston, TX, USA", "Drill Bits, Completions, AI Optimization", "halliburton.com"],
    ["Baker Hughes", "Houston, TX, USA", "Top-Drive Systems, HPHT Wells", "bakerhughes.com"],
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(compData);
  ws3["!cols"] = [{ wch: 25 }, { wch: 25 }, { wch: 50 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, ws3, "Companies");

  // 4. Regions
  const regData = [
    ["Name", "Share", "CAGR", "Factors"],
    ["North America", "43.2%", "5.1%", "Permian Basin, Eagle Ford. US production record 13.6M bpd."],
    ["Middle East & Africa", "22.1%", "7.9%", "Saudi Aramco Jafurah program, ADNOC expansion."],
    ["Asia-Pacific", "18.4%", "5.8%", "China tight-gas, India infill drilling."],
  ];
  const ws4 = XLSX.utils.aoa_to_sheet(regData);
  ws4["!cols"] = [{ wch: 22 }, { wch: 10 }, { wch: 10 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, ws4, "Regions");

  // 5. Drivers
  const drvData = [
    ["Title", "Impact", "Geo", "Timeline"],
    ["Rising global energy demand", "+2.1%", "Global — strongest in MEA & Asia-Pacific", "Medium term (2-4 years)"],
    ["Unconventional resource development", "+1.8%", "North America; Argentina emerging", "Short term (≤ 2 years)"],
  ];
  const ws5 = XLSX.utils.aoa_to_sheet(drvData);
  ws5["!cols"] = [{ wch: 45 }, { wch: 10 }, { wch: 40 }, { wch: 25 }];
  XLSX.utils.book_append_sheet(wb, ws5, "Drivers");

  // 6. Restraints
  const resData = [
    ["Title", "Impact", "Geo", "Timeline"],
    ["Oil price volatility constraining budgets", "-1.6%", "Global — most acute for marginal producers", "Short term (≤ 2 years)"],
  ];
  const ws6 = XLSX.utils.aoa_to_sheet(resData);
  ws6["!cols"] = [{ wch: 45 }, { wch: 10 }, { wch: 40 }, { wch: 25 }];
  XLSX.utils.book_append_sheet(wb, ws6, "Restraints");

  // 7. Key Takeaways
  const tkData = [
    ["Takeaway"],
    ["By rig type, conventional land rigs commanded the largest share of 58.3% of 2025 revenue."],
    ["By technology, top-drive systems held the largest market share of 44.6% in 2025."],
  ];
  const ws7 = XLSX.utils.aoa_to_sheet(tkData);
  ws7["!cols"] = [{ wch: 100 }];
  XLSX.utils.book_append_sheet(wb, ws7, "Key Takeaways");

  // 8. Analysis Content
  const acData = [
    ["Key", "Content"],
    ["overview2", "Detailed overview paragraph for the analysis section..."],
    ["unconventionalDriver", "Deep-dive text about unconventional resource development..."],
    ["automationDriver", "Deep-dive text about automation and AI-driven drilling..."],
    ["rigTypeAnalysis", "Analysis of rig type segments..."],
    ["applicationAnalysis", "Analysis of applications..."],
    ["northAmericaAnalysis", "North America regional deep-dive..."],
    ["meaAnalysis", "Middle East & Africa regional deep-dive..."],
    ["competitiveLandscape", "Competitive landscape analysis..."],
  ];
  const ws8 = XLSX.utils.aoa_to_sheet(acData);
  ws8["!cols"] = [{ wch: 25 }, { wch: 100 }];
  XLSX.utils.book_append_sheet(wb, ws8, "Analysis Content");

  // 9. FAQs
  const faqData = [
    ["Question", "Answer"],
    ["What is the market size?", "The market is estimated at USD 85.4 billion in 2026..."],
    ["Which region has the highest growth?", "Middle East & Africa at 7.9% CAGR..."],
  ];
  const ws9 = XLSX.utils.aoa_to_sheet(faqData);
  ws9["!cols"] = [{ wch: 50 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, ws9, "FAQs");

  // 10. Developments
  const devData = [
    ["Date", "Text"],
    ["January 2026", "Nabors Industries launched RigCLOUD Gen-5 automated drilling platform..."],
    ["November 2025", "Saudi Aramco awarded USD 3.4 billion onshore drilling contract..."],
  ];
  const ws10 = XLSX.utils.aoa_to_sheet(devData);
  ws10["!cols"] = [{ wch: 18 }, { wch: 90 }];
  XLSX.utils.book_append_sheet(wb, ws10, "Developments");

  // 11. TOC
  const tocData = [
    ["Entry"],
    ["§ SECTION I — RESEARCH FRAMEWORK"],
    ["1. Disclaimer & Copyright Notice"],
    ["2. Research Scope & Definitions"],
    ["2.1. Market Definition"],
    ["3. Research Methodology"],
    ["§ SECTION II — EXECUTIVE SUMMARY"],
    ["4. Executive Summary"],
    ["5. Market Overview"],
    ["6. Market Dynamics"],
  ];
  const ws11 = XLSX.utils.aoa_to_sheet(tocData);
  ws11["!cols"] = [{ wch: 70 }];
  XLSX.utils.book_append_sheet(wb, ws11, "TOC");

  // 12. Scope
  const scopeData = [
    ["Field", "Value"],
    ["Rig Type", "Conventional Land Rigs | Directional / Horizontal | Slim-Hole / Portable"],
    ["Technology", "Top-Drive Systems | Conventional Rotary | Automated & Smart Drilling"],
    ["Application", "Oil Production | Natural Gas Exploration | Geothermal"],
    ["Geography", "North America | MEA | Asia-Pacific | South America | Europe"],
    ["Study Period", "Historical: 2021–2025 | Forecast: 2026–2031"],
    ["Base Year", "2025"],
    ["Currency", "USD (United States Dollar)"],
  ];
  const ws12 = XLSX.utils.aoa_to_sheet(scopeData);
  ws12["!cols"] = [{ wch: 20 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, ws12, "Scope");

  // 13. ESG Content (subtitle)
  const esgBasicData = [
    ["Field", "Value"],
    ["Subtitle", "Global Onshore Drilling Market | MindEarth Research | 2024–2031"],
  ];
  const wsE1 = XLSX.utils.aoa_to_sheet(esgBasicData);
  wsE1["!cols"] = [{ wch: 15 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, wsE1, "ESG Content");

  // 14. GRI Framework
  const griData = [
    ["Series", "Covers", "Standards", "Relevance"],
    ["GRI 200 – Economic", "Economic performance, anti-corruption, tax", "7", "TCFD/ISSB climate financial risk"],
    ["GRI 300 – Environmental", "Emissions, energy, water, biodiversity, waste", "9", "GRI 305 (Scope 1–3, methane); GRI 302 (rig fuel)"],
    ["GRI 400 – Social", "OHS, employment, community, human rights", "16", "GRI 403 OHS; GRI 413 (FPIC, social licence)"],
  ];
  const wsE2 = XLSX.utils.aoa_to_sheet(griData);
  wsE2["!cols"] = [{ wch: 22 }, { wch: 40 }, { wch: 12 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsE2, "GRI Framework");

  // 15. Regulatory Drivers
  const regDrvData = [
    ["Tag", "Color", "Description"],
    ["EU CSRD", "bg-blue-600", "GRI-aligned ESRS disclosures mandatory for large EU entities from 2025."],
    ["ISSB IFRS S1/S2", "bg-indigo-600", "Adopted in 25+ jurisdictions."],
    ["SEC Climate Rule", "bg-amber-600", "Scope 1 and 2 GHG data mandatory for US-listed filers from 2026."],
  ];
  const wsE3 = XLSX.utils.aoa_to_sheet(regDrvData);
  wsE3["!cols"] = [{ wch: 18 }, { wch: 15 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsE3, "Regulatory Drivers");

  // 16. Material Risks
  const riskData = [
    ["Risk", "Pillar", "Level", "Level Color", "Drivers", "Exposure", "Detail"],
    ["GRI 305 Emissions", "Environmental", "CRITICAL", "bg-red-600", "EU ETS; US EPA Methane Fee", "ETS allowance shortfall", "Detailed explanation..."],
  ];
  const wsE4 = XLSX.utils.aoa_to_sheet(riskData);
  wsE4["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 30 }, { wch: 30 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsE4, "Material Risks");

  // 17. ESG Solutions
  const solData = [
    ["Title", "GRI", "Description"],
    ["Electric & Hybrid Rig Conversion", "GRI 302 + GRI 305", "Reduces CBAM exposure, lowers EU ETS allowance shortfall risk."],
  ];
  const wsE5 = XLSX.utils.aoa_to_sheet(solData);
  wsE5["!cols"] = [{ wch: 30 }, { wch: 18 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, wsE5, "ESG Solutions");

  // 18. ESG KPIs
  const kpiData = [
    ["Topic", "Metrics"],
    ["GRI 305 – Emissions", "Scope 1/2/3 GHG (tCO₂e); methane intensity; flaring intensity"],
    ["GRI 302 – Energy", "Energy consumption (GJ); intensity (GJ/unit); renewable share (%)"],
  ];
  const wsE6 = XLSX.utils.aoa_to_sheet(kpiData);
  wsE6["!cols"] = [{ wch: 25 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsE6, "ESG KPIs");

  // 19. Investor Landscape
  const invData = [
    ["Segment", "Examples", "Framework", "Criteria", "Posture", "Pos Color"],
    ["Sovereign Wealth Funds", "Norway GPFG, ADIA, GIC", "UNPRI; Net Zero AM; TCFD", "Methane intensity; Scope 1+3", "CAUTIOUS", "text-amber-600 bg-amber-50"],
  ];
  const wsE7 = XLSX.utils.aoa_to_sheet(invData);
  wsE7["!cols"] = [{ wch: 22 }, { wch: 25 }, { wch: 22 }, { wch: 30 }, { wch: 15 }, { wch: 25 }];
  XLSX.utils.book_append_sheet(wb, wsE7, "Investor Landscape");

  // 20. ESG Benchmarks
  const benchData = [
    ["Label", "Value", "Unit", "Sub"],
    ["GHG Emissions", "85–95 Mt", "CO₂e/yr (Scope 1)", "Methane leakage ~30–40%"],
    ["Energy Intensity", "0.8–1.2", "GJ per BOE drilled", "Rig diesel 50–400 gal/day"],
  ];
  const wsE8 = XLSX.utils.aoa_to_sheet(benchData);
  wsE8["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 22 }, { wch: 35 }];
  XLSX.utils.book_append_sheet(wb, wsE8, "ESG Benchmarks");

  return wb;
}

export function downloadTemplate() {
  const wb = generateTemplate();
  XLSX.writeFile(wb, "MindEarth_Report_Template.xlsx");
}

/* ══════════════════════════════════════════════════════
   INSIGHT PARSER
   ══════════════════════════════════════════════════════ */

/**
 * Parses an Excel workbook into the insight data format.
 *
 * SHEETS:
 *   1. "Basic Info"       — slug, title, subtitle, cat, date, read_time, author, img, summary, pdf_url, published, featured
 *   2. "Sections"         — Heading, Body, Pull Quote (one row per section)
 *   3. "Key Takeaways"    — Takeaway (one per row)
 *   4. "Tags"             — Tag (one per row)
 *   5. "Related"          — Slug (one per row)
 */
export function parseExcelToInsight(buffer) {
  const wb = XLSX.read(buffer, { type: "array" });

  // 1. Basic Info
  const basic = getSheet(wb, "BasicInfo");
  const title = getCell(basic, "title") || "";
  const insight = {
    slug: getCell(basic, "slug") || slugify(title),
    title,
    subtitle: getCell(basic, "subtitle") || "",
    cat: getCell(basic, "cat") || getCell(basic, "category") || "TRENDS",
    date: getCell(basic, "date") || "",
    read_time: getCell(basic, "read time") || getCell(basic, "read_time") || getCell(basic, "readtime") || "",
    author: getCell(basic, "author") || "Saloni Gaikwad",
    img: getCell(basic, "image url") || getCell(basic, "img") || "",
    summary: getCell(basic, "summary") || getCell(basic, "description") || "",
    pdf_url: getCell(basic, "pdf url") || getCell(basic, "pdf_url") || getCell(basic, "pdfurl") || "",
    published: (() => {
      const v = (getCell(basic, "published") || "true").toLowerCase();
      return v === "true" || v === "yes";
    })(),
    featured: (() => {
      const v = (getCell(basic, "featured") || "false").toLowerCase();
      return v === "true" || v === "yes";
    })(),
  };

  // 2. Sections
  const sections = getSheet(wb, "Sections");
  insight.sections = sections.map(r => {
    const heading = String(r.Heading || r.heading || r.Title || r.title || "").trim();
    const body = String(r.Body || r.body || r.Content || r.content || "").trim();
    const pullQuote = String(r["Pull Quote"] || r.pullQuote || r.PullQuote || r.pull_quote || "").trim();
    const section = { heading, body };
    if (pullQuote) section.pullQuote = pullQuote;
    return section;
  }).filter(s => s.heading && s.body);

  // 3. Key Takeaways
  const takeaways = getSheet(wb, "KeyTakeaways");
  insight.key_takeaways = takeaways
    .map(r => String(r.Takeaway || r.takeaway || r.Text || r.text || Object.values(r)[0] || "").trim())
    .filter(Boolean);

  // 4. Tags
  const tags = getSheet(wb, "Tags");
  insight.tags = tags
    .map(r => String(r.Tag || r.tag || r.Name || r.name || Object.values(r)[0] || "").trim())
    .filter(Boolean);

  // 5. Related
  const related = getSheet(wb, "Related");
  insight.related = related
    .map(r => String(r.Slug || r.slug || r.Related || r.related || Object.values(r)[0] || "").trim())
    .filter(Boolean);

  return insight;
}

/* ── Insight Template generator ── */
export function generateInsightTemplate() {
  const wb = XLSX.utils.book_new();

  // 1. Basic Info
  const basicData = [
    ["Field", "Value"],
    ["Title", "Regulatory Acceleration Across Emerging Markets"],
    ["Slug", "esg-trends-q1-2026"],
    ["Subtitle", "MindEarth ESG Trends Q1 2026"],
    ["Cat", "TRENDS"],
    ["Date", "March 15, 2026"],
    ["Read Time", "12 min"],
    ["Author", "Saloni Gaikwad"],
    ["Image URL", "https://images.unsplash.com/photo-example?w=1800&q=80"],
    ["Summary", "Brief summary of the insight article (1-2 sentences)"],
    ["PDF URL", ""],
    ["Published", "true"],
    ["Featured", "false"],
  ];
  const ws1 = XLSX.utils.aoa_to_sheet(basicData);
  ws1["!cols"] = [{ wch: 15 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(wb, ws1, "Basic Info");

  // 2. Sections
  const secData = [
    ["Heading", "Body", "Pull Quote"],
    ["Regulatory Momentum in South Asia", "India's SEBI has expanded the BRSR Core framework to the top 250 listed companies...", ""],
    ["Middle East & North Africa Developments", "The UAE Securities and Commodities Authority has mandated ESG disclosures...", "$18 trillion in institutional AUM now incorporates ESG disclosure quality."],
    ["Investor Response & Capital Allocation", "Institutional investors managing over $18 trillion...", ""],
    ["Implications for Corporates", "Companies operating across multiple emerging markets...", ""],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(secData);
  ws2["!cols"] = [{ wch: 35 }, { wch: 80 }, { wch: 60 }];
  XLSX.utils.book_append_sheet(wb, ws2, "Sections");

  // 3. Key Takeaways
  const tkData = [
    ["Takeaway"],
    ["SEBI expanded BRSR Core to top 250 listed companies"],
    ["UAE and Saudi Arabia introduced mandatory ESG disclosures"],
    ["$45B allocated by GCC sovereign wealth funds to ESG mandates"],
    ["Framework-agnostic data collection approach recommended"],
  ];
  const ws3 = XLSX.utils.aoa_to_sheet(tkData);
  ws3["!cols"] = [{ wch: 80 }];
  XLSX.utils.book_append_sheet(wb, ws3, "Key Takeaways");

  // 4. Tags
  const tagData = [
    ["Tag"],
    ["BRSR"],
    ["SEBI"],
    ["Middle East ESG"],
    ["Regulatory"],
    ["Emerging Markets"],
  ];
  const ws4 = XLSX.utils.aoa_to_sheet(tagData);
  ws4["!cols"] = [{ wch: 30 }];
  XLSX.utils.book_append_sheet(wb, ws4, "Tags");

  // 5. Related
  const relData = [
    ["Slug"],
    ["carbon-markets-2025"],
    ["green-bond-outlook-2028"],
  ];
  const ws5 = XLSX.utils.aoa_to_sheet(relData);
  ws5["!cols"] = [{ wch: 40 }];
  XLSX.utils.book_append_sheet(wb, ws5, "Related");

  return wb;
}

export function downloadInsightTemplate() {
  const wb = generateInsightTemplate();
  XLSX.writeFile(wb, "MindEarth_Insight_Template.xlsx");
}
