import { NextResponse } from "next/server"
import { getAllLogos, searchLogosByQuery, getLogosByCategory } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category") || ""
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "50", 10)

  let logos
  let total
  let hasMore

  if (query) {
    // Search logos by query
    const result = await searchLogosByQuery(query, page, limit)
    logos = result.logos
    total = result.total
    hasMore = result.hasMore
  } else if (category) {
    // Get logos by category
    const result = await getLogosByCategory(category, page, limit)
    logos = result.logos
    total = result.total
    hasMore = result.hasMore
  } else {
    // Get all logos with pagination
    const result = await getAllLogos(page, limit)
    logos = result.logos
    total = result.total
    hasMore = result.hasMore
  }

  return NextResponse.json({
    logos,
    total,
    hasMore,
  })
}
