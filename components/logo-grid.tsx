"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import type { Logo } from "@/lib/types"

interface LogoGridProps {
  logos: Logo[]
  initialQuery?: string
  initialCategory?: string
}

export function LogoGrid({ logos, initialQuery = "", initialCategory = "" }: LogoGridProps) {
  const [filteredLogos, setFilteredLogos] = useState<Logo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    let filtered = [...logos]

    if (initialQuery) {
      const query = initialQuery.toLowerCase()
      filtered = filtered.filter(
        (logo) => logo.name.toLowerCase().includes(query) || logo.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (initialCategory) {
      filtered = filtered.filter((logo) => logo.category === initialCategory)
    }

    setFilteredLogos(filtered)
    setIsLoading(false)
  }, [logos, initialQuery, initialCategory])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="h-full bg-card/50">
            <CardContent className="p-4 flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 bg-muted rounded-md animate-pulse mb-2"></div>
              <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (filteredLogos.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-3 text-foreground">No icons found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your search or filter criteria, or consider contributing this icon to our database!
        </p>
      </motion.div>
    )
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Showing {filteredLogos.length} {filteredLogos.length === 1 ? "icon" : "icons"}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredLogos.map((logo, index) => (
          <motion.div
            key={logo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
          >
            <Link href={`/icon/${logo.id}`}>
              <Card className="card-hover bg-card/60 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <motion.img
                      src={logo.svgUrl || "/placeholder.svg"}
                      alt={logo.name}
                      className="max-w-full max-h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    />
                  </div>
                  <p className="text-center font-medium text-sm mb-2">{logo.name}</p>
                  <Badge variant="secondary" className="text-xs bg-secondary/40 backdrop-blur-sm">
                    {logo.category}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
