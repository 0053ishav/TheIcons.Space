import { logos } from "./data"
import type { Logo } from "./types"

// Simulate database access with async functions
export async function getAllLogos(): Promise<Logo[]> {
  // In a real app, this would fetch from a database
  return logos
}

export async function getLogoById(id: string): Promise<Logo | undefined> {
  // In a real app, this would fetch from a database
  return logos.find((logo) => logo.id === id)
}

export async function searchLogos(query: string): Promise<Logo[]> {
  const searchQuery = query.toLowerCase()
  return logos.filter(
    (logo) =>
      logo.name.toLowerCase().includes(searchQuery) || logo.tags.some((tag) => tag.toLowerCase().includes(searchQuery)),
  )
}

export async function getLogosByCategory(category: string): Promise<Logo[]> {
  return logos.filter((logo) => logo.category === category)
}
