"use client"

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { Button } from "@/components/ui/button"
import { Code2, Github, Menu } from "lucide-react"
import { SearchBar } from "./search-bar"
import FeedbackModal from "./FeedbackModal"
import { useFeedbackStore } from "@/lib/useFeedbackStore"
import { Suspense, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

export function Header() {
   const { open } = useFeedbackStore();
     const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-10 glass-effect">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-primary to-purple-700 p-1.5 rounded-md group-hover:shadow-md group-hover:shadow-primary/30 transition-all">
            <Code2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl group-hover:text-primary transition-colors">TheIcons.Space</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6">
            <div>
              <Suspense fallback={<SearchBarSkeleton />}>
              <SearchBar 
                origin="header"
                />
                </Suspense>
            </div>
             <button onClick={open} className="text-sm font-medium hover:text-primary transition-colors">
            Request an Icon
          </button>
          <FeedbackModal />
            <Link href="/api-docs" className="text-sm font-medium hover:text-primary transition-colors">
              API
            </Link>
            <Link href="/contribute" className="text-sm font-medium hover:text-primary transition-colors">
              Contribute
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="w-full">
                <SheetHeader>
                  <SheetTitle>TheIcons.Space</SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col gap-4">
                  <Suspense fallback={<SearchBarSkeleton />}>
                    <SearchBar origin="header" onSubmit={() => setIsOpen(false)} />
                  </Suspense>
                  <button onClick={() => { open(); setIsOpen(false); }} className="text-sm font-medium hover:text-primary transition-colors text-left">
                    Request an Icon
                  </button>
                  <Link href="/api-docs" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                    API
                  </Link>
                  <Link href="/contribute" className="text-sm font-medium hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
                    Contribute
                  </Link>
                </div>
              </SheetContent>
            </Sheet>


         
            <Button variant="outline" size="icon" asChild className="rounded-full">
              <a href="https://github.com/0053ishav/TheIcons.Space" target="_blank" rel="noopener noreferrer">
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

export function SearchBarSkeleton() {
  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="flex-1 h-10 rounded-md bg-muted animate-pulse" />
    </div>
  );
}