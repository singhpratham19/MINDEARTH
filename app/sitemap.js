import { getSupabase } from "@/lib/supabase";

const BASE_URL = "https://www.mindearthconsultancy.com";

const staticRoutes = [
  { url: "/", priority: 1.0, changeFrequency: "weekly" },
  { url: "/reports", priority: 0.9, changeFrequency: "daily" },
  { url: "/insights", priority: 0.8, changeFrequency: "weekly" },
  { url: "/services", priority: 0.8, changeFrequency: "monthly" },
  { url: "/services/brsr", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about", priority: 0.6, changeFrequency: "monthly" },
  { url: "/contact", priority: 0.6, changeFrequency: "monthly" },
];

export default async function sitemap() {
  const supabase = getSupabase();

  const staticEntries = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  let reportEntries = [];
  let insightEntries = [];

  if (supabase) {
    const [{ data: reports }, { data: insights }] = await Promise.all([
      supabase.from("reports").select("slug, updated_at").eq("published", true),
      supabase.from("insights").select("slug, updated_at"),
    ]);

    if (reports) {
      reportEntries = reports.map((r) => ({
        url: `${BASE_URL}/reports/${r.slug}`,
        lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }));
    }

    if (insights) {
      insightEntries = insights.map((i) => ({
        url: `${BASE_URL}/insights/${i.slug}`,
        lastModified: i.updated_at ? new Date(i.updated_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      }));
    }
  }

  return [...staticEntries, ...reportEntries, ...insightEntries];
}
