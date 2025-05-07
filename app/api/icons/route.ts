import { NextResponse } from "next/server"
import { getAllLogos } from "@/lib/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const category = searchParams.get("category")

  let logos = await getAllLogos()

  if (query) {
    const searchQuery = query.toLowerCase()
    logos = logos.filter(
      (logo) =>
        logo.name.toLowerCase().includes(searchQuery) ||
        logo.tags.some((tag) => tag.toLowerCase().includes(searchQuery)),
    )
  }

  if (category) {
    logos = logos.filter((logo) => logo.category === category)
  }

  return NextResponse.json(logos)
}
