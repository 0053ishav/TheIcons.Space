import { loadIcons } from "./load-icons"
import type { Logo } from "./types"

// Get all logos with optional pagination
export async function getAllLogos(
  page = 1,
  limit = 50,
): Promise<{
  logos: Logo[]
  total: number
  hasMore: boolean
}> {
  const allLogos = await loadIcons()
  const start = (page - 1) * limit
  const end = start + limit
  const logos = allLogos.slice(start, end)

  const hasMore = allLogos.length > end

  return {
    logos,
    total: allLogos.length,
    hasMore,
  }
}


// Get a logo by ID (slug)
export async function getLogoById(id: string): Promise<Logo | undefined> {
  const logos = await loadIcons()
  return logos.find((logo) => logo.id === id || logo.slug === id)
}

// Search logos by query with pagination
export async function searchLogosByQuery(
  query: string,
  page = 1,
  limit = 50,
): Promise<{
  logos: Logo[]
  total: number
  hasMore: boolean
}> {
  const allLogos = await loadIcons()
  const searchQuery = query.toLowerCase()

  const filteredLogos = allLogos.filter(
    (logo) =>
      logo.name.toLowerCase().includes(searchQuery) ||
      (logo.tags && logo.tags.some((tag) => tag.toLowerCase().includes(searchQuery))),
  )

  const start = (page - 1) * limit
  const end = start + limit
  const logos = filteredLogos.slice(start, end)

  return {
    logos,
    total: filteredLogos.length,
    hasMore: end < filteredLogos.length,
  }
}

// Get logos by category with pagination
export async function getLogosByCategory(
  category: string,
  page = 1,
  limit = 50,
): Promise<{
  logos: Logo[]
  total: number
  hasMore: boolean
}> {
  const allLogos = await loadIcons()
  const filteredLogos = allLogos.filter((logo) => logo.category === category)

  const start = (page - 1) * limit
  const end = start + limit
  const logos = filteredLogos.slice(start, end)

  return {
    logos,
    total: filteredLogos.length,
    hasMore: end < filteredLogos.length,
  }
}
