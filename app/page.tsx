import { SearchBar } from "@/components/search-bar"
import { LogoGrid } from "@/components/logo-grid"
import { getAllLogos, searchLogosByQuery } from "@/lib/api"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; page?: string }
}) {
  const query = searchParams.q || ""
  const category = searchParams.category || ""
  const page = Number.parseInt(searchParams.page || "1", 10)

  const { logos, total, hasMore } = query
    ? await searchLogosByQuery(query, page, 30)
    : await getAllLogos(page, 30)

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          TheIcons.Space
        </h1>
        <p className="text-xl text-muted-foreground">
          A curated collection of high-quality developer-focused technology logos
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <SearchBar />
      </div>

      <Suspense fallback={<LogoGridSkeleton />}>
        <LogoGrid
          initialLogos={logos}
          initialQuery={query}
          initialCategory={category}
          currentPage={page}
          totalIcons={total}
          hasMore={hasMore}
        />
      </Suspense>
    </main>
  )
}

function LogoGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center space-y-3">
          <Skeleton className="h-24 w-24 rounded-md" />
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  )
}
