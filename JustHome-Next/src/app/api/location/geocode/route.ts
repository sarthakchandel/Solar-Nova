import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address query" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    if (!apiKey) {
      return NextResponse.json({ error: "Google Maps API Key not configured" }, { status: 500 });
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Geocoding API error: ${data.status}`);
    }

    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return NextResponse.json({
        success: true,
        lat: location.lat,
        lng: location.lng,
        results: data.results
      });
    }

    return NextResponse.json({ success: false, error: "No results found" });
  } catch (error: any) {
    console.error("Forward geocoding error:", error);
    return NextResponse.json({ error: error.message || "Failed to geocode address" }, { status: 500 });
  }
}
