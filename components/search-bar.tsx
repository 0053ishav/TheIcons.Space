"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"
import { CategoryFilter } from "@/components/category-filter"
import { motion } from "framer-motion"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [category, setCategory] = useState(searchParams.get("category") || "")

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "")
    setCategory(searchParams.get("category") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (searchQuery) {
      params.set("q", searchQuery)
    }

    if (category) {
      params.set("category", category)
    }

    router.push(`/?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchQuery("")
    if (!category) {
      router.push("/")
    } else {
      const params = new URLSearchParams()
      params.set("category", category)
      router.push(`/?${params.toString()}`)
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder="Search icons by name, tag, or category..."
          className="pl-12 pr-12 py-6 text-base rounded-full border-primary/20 focus:border-primary/50 bg-card/50 backdrop-blur-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </form>
      <CategoryFilter selectedCategory={category} onCategoryChange={setCategory} />
    </motion.div>
  )
}
