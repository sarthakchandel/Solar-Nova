import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Missing coordinates" }, { status: 400 });
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  try {
    if (!apiKey) {
      // Fallback to OpenStreetMap Nominatim for Reverse Geocoding
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
      const res = await fetch(url, { headers: { 'User-Agent': 'JustHome-Next-App' }});
      const data = await res.json();
      
      if (data && data.address) {
        const locality = data.address.suburb || data.address.city_district || data.address.city || data.address.town;
        const state = data.address.state;
        const readableLocation = locality && state ? `${locality}, ${state}` : data.display_name.split(',').slice(0, 2).join(',');
        return NextResponse.json({ location: readableLocation });
      }
      return NextResponse.json({ location: "Unknown Location" });
    }

    // Use Google Maps API if key exists
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(`Google Geocoding API error: ${data.status}`);
    }

    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const locality = addressComponents.find((c: any) => c.types.includes("locality"))?.long_name;
      const sublocality = addressComponents.find((c: any) => c.types.includes("sublocality"))?.long_name;
      
      const readableLocation = sublocality ? `${sublocality}, ${locality}` : locality || data.results[0].formatted_address;
      
      return NextResponse.json({ location: readableLocation });
    }

    return NextResponse.json({ location: "Unknown Location" });
  } catch (error) {
    console.error("Reverse geocoding error:", error);
    return NextResponse.json({ error: "Failed to reverse geocode" }, { status: 500 });
  }
}
