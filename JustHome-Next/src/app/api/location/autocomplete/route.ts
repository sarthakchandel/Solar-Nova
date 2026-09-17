import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ predictions: [] });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    if (!apiKey) {
      // Fallback to OpenStreetMap Nominatim API if no Google API key is provided
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=in&limit=5`;
      const res = await fetch(url, { headers: { 'User-Agent': 'JustHome-Next-App' }});
      const data = await res.json();

      const predictions = data.map((p: any) => ({
        placeId: p.place_id.toString(),
        description: p.display_name,
        mainText: p.name || p.display_name.split(',')[0],
        secondaryText: p.display_name.split(',').slice(1).join(',').trim(),
      }));
      return NextResponse.json({ predictions });
    }

    // Use Google Maps API if key exists
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      query
    )}&components=country:IN&key=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    const predictions = (data.predictions || []).map((p: any) => ({
      placeId: p.place_id,
      description: p.description,
      mainText: p.structured_formatting?.main_text || p.description,
      secondaryText: p.structured_formatting?.secondary_text || "",
    }));

    return NextResponse.json({ predictions });
  } catch (error) {
    console.error("Location autocomplete error:", error);
    return NextResponse.json({ error: "Failed to fetch suggestions" }, { status: 500 });
  }
}
