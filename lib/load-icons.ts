import fs from "fs"
import path from "path"
import type { Logo } from "./types"

// Cache the icons data to avoid reading the file on every request
let iconsCache: Logo[] | null = null
let categoriesCache: Set<string> | null = null

export async function loadIcons(): Promise<Logo[]> {
  // Return cached data if available
  if (iconsCache) {
    return iconsCache
  }

  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), "icons.json")
    const fileContents = await fs.promises.readFile(filePath, "utf8")
    const icons = JSON.parse(fileContents) as Logo[]

    // Cache the data
    iconsCache = icons
    return icons
  } catch (error) {
    console.error("Error loading icons:", error)
    return []
  }
}

// Get unique categories from icons
export async function getCategories(): Promise<string[]> {
  if (categoriesCache) {
    return Array.from(categoriesCache)
  }

  const icons = await loadIcons()
  const categories = new Set<string>()

  icons.forEach((icon) => {
    if (icon.category) {
      categories.add(icon.category)
    }
  })

  categoriesCache = categories
  return Array.from(categories)
}

// Get icons by category with pagination for efficient loading
export async function getIconsByCategory(category: string, page = 1, limit = 50): Promise<Logo[]> {
  const icons = await loadIcons()
  const filteredIcons = category ? icons.filter((icon) => icon.category === category) : icons

  const start = (page - 1) * limit
  const end = start + limit

  return filteredIcons.slice(start, end)
}

// Search icons with pagination
export async function searchIcons(query: string, page = 1, limit = 50): Promise<Logo[]> {
  const icons = await loadIcons()
  const searchQuery = query.toLowerCase()

  const filteredIcons = icons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(searchQuery) ||
      (icon.tags && icon.tags.some((tag) => tag.toLowerCase().includes(searchQuery))),
  )

  const start = (page - 1) * limit
  const end = start + limit

  return filteredIcons.slice(start, end)
}
