"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { logos } from "@/lib/data"
import type { Logo } from "@/lib/types"
import { ArrowLeft, Copy, Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LogoPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [logo, setLogo] = useState<Logo | null>(null)
  const [svgCode, setSvgCode] = useState<string>("")

  useEffect(() => {
    const id = params.id as string
    const foundLogo = logos.find((l) => l.id === id)

    if (foundLogo) {
      setLogo(foundLogo)
      // Fetch SVG code
      fetch(foundLogo.svgUrl)
        .then((response) => response.text())
        .then((data) => setSvgCode(data))
        .catch((error) => console.error("Error fetching SVG:", error))
    }
  }, [params.id])

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgCode)
      toast({
        title: "Copied!",
        description: "SVG code copied to clipboard",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy SVG code",
        variant: "destructive",
      })
    }
  }

  const handleDownloadPng = async () => {
    if (!logo) return

    // Create an image from the SVG
    const img = new Image()
    img.src = `data:image/svg+xml;base64,${btoa(svgCode)}`
    img.crossOrigin = "anonymous"

    img.onload = () => {
      // Create a canvas to convert SVG to PNG
      const canvas = document.createElement("canvas")
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Draw with white background for transparent SVGs
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw the image centered
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height) * 0.8

        const x = (canvas.width - img.width * scale) / 2
        const y = (canvas.height - img.height * scale) / 2

        ctx.drawImage(img, x, y, img.width * scale, img.height * scale)

        // Create download link
        const link = document.createElement("a")
        link.download = `${logo.name.toLowerCase().replace(/\s+/g, "-")}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
      }
    }
  }

  if (!logo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Logo not found</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all logos
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">{logo.name}</h1>

        <div className="mb-8">
          <Card className="border-2">
            <CardContent className="p-8 flex items-center justify-center">
              <div className="w-48 h-48 flex items-center justify-center">
                <img src={logo.svgUrl || "/placeholder.svg"} alt={logo.name} className="max-w-full max-h-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="svg" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="svg">SVG</TabsTrigger>
            <TabsTrigger value="png">PNG</TabsTrigger>
          </TabsList>
          <TabsContent value="svg" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-64">
                  <pre className="text-xs">{svgCode}</pre>
                </div>
                <Button className="mt-4 w-full" onClick={handleCopySvg}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy SVG Code
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="png" className="mt-4">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="mb-4 text-sm text-muted-foreground">Download the logo as a PNG file (512x512px)</p>
                <Button className="w-full" onClick={handleDownloadPng}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PNG
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {logo.tags.map((tag, index) => (
              <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
