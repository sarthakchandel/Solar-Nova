import { NextResponse } from "next/server";
import { services } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  // Artificial delay to simulate real network latency (allows testing loading states)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!query) {
    return NextResponse.json({ services: [] });
  }

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(query) ||
      service.categoryName.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query)
  );

  return NextResponse.json({ services: filteredServices.slice(0, 5) }); // return top 5
}
