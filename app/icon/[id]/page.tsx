import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getLogoById } from "@/lib/api"
import { IconViewer } from "@/components/icon-viewer"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface IconPageProps {
  params: {
    id: string
  }
}

export default async function IconPage({ params }: IconPageProps) {
  const logo = await getLogoById(params.id)

  if (!logo) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all icons
        </Link>
      </Button>

      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<IconViewerSkeleton />}>
          <IconViewer logo={logo} />
        </Suspense>
      </div>
    </div>
  )
}

function IconViewerSkeleton() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <Skeleton className="h-10 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
      </div>

      <div className="border-2 rounded-lg p-8">
        <Skeleton className="h-48 w-48 mx-auto" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}
