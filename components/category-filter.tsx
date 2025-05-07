"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"
import { motion } from "framer-motion"

interface CategoryFilterProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category)

    const params = new URLSearchParams(searchParams.toString())
    const query = params.get("q")

    const newParams = new URLSearchParams()

    if (query) {
      newParams.set("q", query)
    }

    if (category && category !== selectedCategory) {
      newParams.set("category", category)
    }

    router.push(`/?${newParams.toString()}`)
  }

  return (
    <motion.div
      className="flex flex-wrap gap-2 justify-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant={!selectedCategory ? "default" : "outline"}
        size="sm"
        onClick={() => handleCategoryClick("")}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Button
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category.id)}
            className="rounded-full"
          >
            {category.name}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}
