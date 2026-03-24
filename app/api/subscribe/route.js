import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (supabase) {
      const { error } = await supabase.from("subscribers").upsert(
        { email, subscribed_at: new Date().toISOString() },
        { onConflict: "email" }
      );
      if (error) console.error("Subscribe error:", error);
    }

    return NextResponse.json({ success: true, message: "You're subscribed! You'll receive our latest research updates." });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
