"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Check, Code, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLazyImage } from "@/hooks/use-lazy-image"
import type { Logo } from "@/lib/types"
import { motion } from "framer-motion"

interface IconViewerProps {
  logo: Logo
}

export function IconViewer({ logo }: IconViewerProps) {
  const { toast } = useToast()
  const [svgCode, setSvgCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("svg")

  // Use lazy loading for the SVG image
  const { ref: svgRef, imageSrc: svgSrc, isLoaded: svgLoaded } = useLazyImage(logo.svgFilePath)

  useEffect(() => {
    // Fetch SVG code only when needed (when the SVG tab is active)
    if (activeTab === "svg" && !svgCode) {
      fetch(logo.svgFilePath)
        .then((response) => response.text())
        .then((data) => setSvgCode(data))
        .catch((error) => console.error("Error fetching SVG:", error))
    }
  }, [logo.svgFilePath, activeTab, svgCode])

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgCode)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "SVG code copied to clipboard",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy SVG code",
        variant: "destructive",
      })
    }
  }

  const handleDownloadPng = async () => {
    // Direct download of PNG file
    const link = document.createElement("a")
    link.href = logo.pngFilePath
    link.download = `${logo.name.toLowerCase().replace(/\s+/g, "-")}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Downloaded!",
      description: `${logo.name} PNG has been downloaded`,
    })
  }

  const handleDownloadSvg = () => {
    // Direct download of SVG file
    const link = document.createElement("a")
    link.href = logo.svgFilePath
    link.download = `${logo.name.toLowerCase().replace(/\s+/g, "-")}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Downloaded!",
      description: `${logo.name} SVG has been downloaded`,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{logo.name}</h1>
        <p className="text-muted-foreground">{logo.description || `${logo.name} icon for developers`}</p>
      </div>

      <div className="mb-8">
        <Card className="border-2 overflow-hidden">
          <CardContent
            className="p-12 flex items-center justify-center bg-grid-pattern"
            style={{ backgroundColor: `#${logo.hex}10` }}
          >
            <motion.div
              className="w-48 h-48 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              ref={svgRef}
            >
              {svgLoaded ? (
                <img src={svgSrc || ""} alt={logo.name} className="max-w-full max-h-full" />
              ) : (
                <div className="w-32 h-32 bg-muted rounded-md animate-pulse"></div>
              )}
            </motion.div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="svg" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="svg" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>SVG</span>
          </TabsTrigger>
          <TabsTrigger value="png" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            <span>PNG</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="svg" className="mt-4 space-y-4">
          <Card>
            <CardContent className="p-4">
              {!svgCode ? (
                <div className="h-40 bg-muted animate-pulse rounded-md"></div>
              ) : (
                <div className="bg-muted p-4 rounded-md overflow-auto max-h-64 font-mono text-xs">
                  <pre>{svgCode}</pre>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Button
                  className="w-full"
                  onClick={handleCopySvg}
                  variant={copied ? "outline" : "default"}
                  disabled={!svgCode}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy SVG Code
                    </>
                  )}
                </Button>
                <Button className="w-full" variant="outline" onClick={handleDownloadSvg}>
                  <Download className="mr-2 h-4 w-4" />
                  Download SVG
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="png" className="mt-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Download the logo as a PNG file</p>
                <p className="text-xs text-muted-foreground">High-quality PNG image ready for use in your projects</p>
              </div>
              <Button className="w-full sm:w-auto" onClick={handleDownloadPng}>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-3">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge>{logo.category || "Tools"}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Color</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: `#${logo.hex}` }}></div>
                    <code className="text-xs">#{logo.hex}</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {logo.tags && logo.tags.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {logo.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
