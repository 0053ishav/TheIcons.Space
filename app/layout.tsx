import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Icons.Space - Developer Icon Database",
  description:
    "A curated collection of high-quality developer-focused technology logos",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col bg-background hero-pattern">
            <Header />
            <div className="flex-1">{children}</div>
            <footer className="py-8 border-t border-border/30 bg-background">
              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Left Side - Copyright */}
                  <div className="text-sm text-muted-foreground text-center md:text-left">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-semibold">TheIcons.Space</span>. All
                    rights reserved.
                  </div>

                  {/* Right Side - Links */}
                  <div className="flex flex-wrap gap-6 text-center md:text-right">
                    <a
                      href="/about"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label="About TheIcons.Space"
                    >
                      About
                    </a>
                    <a
                      href="/api-docs"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label="API Documentation"
                    >
                      API
                    </a>
                    <a
                      href="/license"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label="License Information"
                    >
                      License
                    </a>
                    <a
                      href="https://simpleicons.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      aria-label="Powered by Simple Icons"
                    >
                      Powered by Simple Icons
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
  );
}