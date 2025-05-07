import { NextResponse } from "next/server"
import { getLogoById } from "@/lib/api"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const logo = await getLogoById(params.id)

  if (!logo) {
    return NextResponse.json({ error: "Logo not found" }, { status: 404 })
  }

  return NextResponse.json(logo)
}
