import { SearchBar } from "@/components/search-bar"
import { LogoGrid } from "@/components/logo-grid"
import { getAllLogos } from "@/lib/api"

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; category?: string }
}) {
  const logos = await getAllLogos()
  const query = searchParams.q || ""
  const category = searchParams.category || ""

  return (
    <main className="container mx-auto px-4 py-12 relative">
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/30 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-heading leading-tight">TechIcons</h1>
        <p className="text-xl text-muted-foreground">
          A curated collection of high-quality developer-focused technology logos
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-16 animate-in">
        <SearchBar />
      </div>

      <LogoGrid logos={logos} initialQuery={query} initialCategory={category} />
    </main>
  )
}
