"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Code2, Github } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-10 glass-effect">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-primary to-purple-700 p-1.5 rounded-md group-hover:shadow-md group-hover:shadow-primary/30 transition-all">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl group-hover:text-primary transition-colors">TechIcons</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/api-docs" className="text-sm font-medium hover:text-primary transition-colors">
              API
            </Link>
            <Link href="/contribute" className="text-sm font-medium hover:text-primary transition-colors">
              Contribute
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
