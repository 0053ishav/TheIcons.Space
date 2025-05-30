import { SearchBar } from "@/components/search-bar";
import { LogoGrid } from "@/components/logo-grid";
import { getAllLogos, searchLogosByQuery } from "@/lib/api";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryFilter } from "@/components/category-filter";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TheIcons.Space - Free Developer Technology Icons",
  description:
    "A curated collection of high-quality developer-focused technology logos.",
  keywords: "developer icons, technology logos, free icons",
};

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; page?: string };
}) {
  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const page = Number.parseInt(searchParams.page || "1", 10);

  const { logos, total, hasMore } = query
    ? await searchLogosByQuery(query, page, 30)
    : await getAllLogos(page, 30);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          TheIcons.Space
        </h1>
        <p className="text-xl text-muted-foreground">
          A curated collection of high-quality developer-focused technology
          logos
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <Suspense fallback={<CategoryFilterSkeleton />}>
          <SearchBar origin="page" />
        </Suspense>
        <div className="mt-3">
          <Suspense fallback={<CategoryFilterSkeleton />}>
            <CategoryFilter selectedCategory={category} />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={<SearchBarSkeleton />}>
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
  );
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
  );
}

export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-full w-20 h-8 bg-muted animate-pulse"
        />
      ))}
    </div>
  );
}

export function SearchBarSkeleton() {
  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="flex-1 h-10 rounded-md bg-muted animate-pulse" />
      <div className="w-24 h-10 rounded-md bg-muted animate-pulse" />
    </div>
  );
}