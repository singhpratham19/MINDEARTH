import { getServiceClient, getSupabase } from "./supabase";
import { reports as hardcodedReports } from "./data";

// Map DB snake_case → JS camelCase
function mapFromDB(row) {
  return {
    slug: row.slug,
    title: row.title,
    code: row.code,
    cat: row.cat,
    badge: row.badge,
    img: row.img,
    price: row.price,
    pages: row.pages,
    size: row.size,
    cagr: row.cagr,
    period: row.period,
    baseYear: row.base_year,
    desc: row.description,
    overview: row.overview,
    companies: row.companies || [],
    domains: row.domains || [],
    companyTable: row.company_table || [],
    segments: row.segments || [],
    segmentsByTech: row.segments_by_tech,
    segmentsByApp: row.segments_by_app,
    regions: row.regions || [],
    segmentTables: row.segment_tables,
    marketConcentration: row.market_concentration,
    fastestGrowingRegion: row.fastest_growing_region,
    largestRegion: row.largest_region,
    keyTakeaways: row.key_takeaways,
    drivers: row.drivers,
    restraints: row.restraints,
    regionTable: row.region_table,
    developments: row.developments,
    analysisContent: row.analysis_content,
    toc: row.toc || [],
    esgContent: row.esg_content,
    published: row.published,
  };
}

// Map JS camelCase → DB snake_case
export function mapToDB(report) {
  return {
    slug: report.slug,
    title: report.title,
    code: report.code,
    cat: report.cat,
    badge: report.badge || null,
    img: report.img,
    price: report.price,
    pages: report.pages,
    size: report.size,
    cagr: report.cagr,
    period: report.period,
    base_year: report.baseYear,
    description: report.desc,
    overview: report.overview,
    companies: report.companies || [],
    domains: report.domains || [],
    company_table: report.companyTable || [],
    segments: report.segments || [],
    segments_by_tech: report.segmentsByTech || null,
    segments_by_app: report.segmentsByApp || null,
    regions: report.regions || [],
    segment_tables: report.segmentTables || null,
    market_concentration: report.marketConcentration || null,
    fastest_growing_region: report.fastestGrowingRegion || null,
    largest_region: report.largestRegion || null,
    key_takeaways: report.keyTakeaways || null,
    drivers: report.drivers || null,
    restraints: report.restraints || null,
    region_table: report.regionTable || null,
    developments: report.developments || null,
    analysis_content: report.analysisContent || null,
    toc: report.toc || [],
    esg_content: report.esgContent || null,
    published: report.published !== false,
    updated_at: new Date().toISOString(),
  };
}

export async function getAllReports() {
  try {
    const supabase = getServiceClient() || getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return data.map(mapFromDB);
      }
    }
  } catch (e) {
    console.error("Failed to fetch reports from DB:", e);
  }
  return hardcodedReports;
}

export async function getReportBySlugFromDB(slug) {
  try {
    const supabase = getServiceClient() || getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("slug", slug)
        .single();
      if (!error && data) {
        return mapFromDB(data);
      }
    }
  } catch (e) {
    console.error("Failed to fetch report from DB:", e);
  }
  return hardcodedReports.find(r => r.slug === slug) || null;
}

export async function getAllReportsAdmin() {
  try {
    const supabase = getServiceClient();
    if (supabase) {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        return data.map(mapFromDB);
      }
    }
  } catch (e) {
    console.error("Failed to fetch all reports:", e);
  }
  return hardcodedReports;
}
