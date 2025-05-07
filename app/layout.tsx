import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechIcons - Developer Icon Database",
  description: "A curated collection of high-quality developer-focused technology logos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="min-h-screen flex flex-col bg-background hero-pattern">
            <Header />
            <div className="flex-1">{children}</div>
            <footer className="py-8 border-t border-border/30">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} TechIcons. All rights reserved.
                  </div>
                  <div className="flex gap-6">
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      About
                    </a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      API
                    </a>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      License
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
