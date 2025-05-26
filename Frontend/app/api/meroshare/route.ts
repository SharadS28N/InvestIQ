import { NextRequest, NextResponse } from "next/server";
import { fetchMeroShareData } from "@/services/meroshare-service";

export async function POST(req: NextRequest) {
  try {
    const { boid, password, dpId } = await req.json();
    if (!boid || !password || !dpId) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }
    const data = await fetchMeroShareData({ boid, password, dpId });
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("MeroShare API error:", error);
    return NextResponse.json({ error: "Failed to fetch MeroShare data" }, { status: 500 });
  }
}