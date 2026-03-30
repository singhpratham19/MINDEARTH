import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

function checkAuth(req) {
  const authHeader = req.headers.get("authorization");
  return authHeader === `Bearer ${process.env.ADMIN_PASSWORD}`;
}

function mapInsightToDB(insight) {
  return {
    slug: insight.slug,
    title: insight.title,
    subtitle: insight.subtitle || null,
    cat: insight.cat || "TRENDS",
    date: insight.date || null,
    read_time: insight.read_time || insight.readTime || insight.read || null,
    author: insight.author || "MindEarth Research Team",
    img: insight.img || null,
    summary: insight.summary || null,
    key_takeaways: insight.key_takeaways || insight.keyTakeaways || [],
    sections: insight.sections || [],
    tags: insight.tags || [],
    related: insight.related || [],
    pdf_url: insight.pdf_url || insight.pdfUrl || null,
    published: insight.published !== undefined ? insight.published : true,
    featured: insight.featured !== undefined ? insight.featured : false,
  };
}

// GET all insights (including unpublished) for admin
export async function GET(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ insights: [], warning: "Supabase not configured. Run the SQL migration first." });
  }
  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    return NextResponse.json({ insights: [], warning: error.message });
  }
  return NextResponse.json({ insights: data || [] });
}

// POST create a new insight
export async function POST(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const body = await req.json();
  const dbRow = mapInsightToDB(body);

  const { data, error } = await supabase
    .from("insights")
    .insert(dbRow)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, insight: data });
}

// PUT update an existing insight
export async function PUT(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const body = await req.json();
  const { slug } = body;
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }
  const dbRow = mapInsightToDB(body);

  const { data, error } = await supabase
    .from("insights")
    .update(dbRow)
    .eq("slug", slug)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true, insight: data });
}

// DELETE an insight by slug
export async function DELETE(req) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }
  const { error } = await supabase.from("insights").delete().eq("slug", slug);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
