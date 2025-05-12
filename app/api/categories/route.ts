import { NextResponse } from "next/server"

export async function GET() {
  const categories = ["frontend", "backend", "database", "devops", "design", "tools"]
  return NextResponse.json(categories)
}
