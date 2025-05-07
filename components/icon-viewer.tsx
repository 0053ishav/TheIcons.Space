"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Check, Code, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
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

  useEffect(() => {
    // Fetch SVG code
    fetch(logo.svgUrl)
      .then((response) => response.text())
      .then((data) => setSvgCode(data))
      .catch((error) => console.error("Error fetching SVG:", error))
  }, [logo.svgUrl])

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

        toast({
          title: "Downloaded!",
          description: `${logo.name} PNG has been downloaded`,
        })
      }
    }
  }

  const handleDownloadSvg = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${logo.name.toLowerCase().replace(/\s+/g, "-")}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

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
      className="space-y-10"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-3 gradient-heading inline-block">{logo.name}</h1>
        <p className="text-muted-foreground">{logo.description}</p>
      </div>

      <motion.div
        className="mb-8"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Card className="border-2 overflow-hidden border-primary/20">
          <CardContent className="p-12 flex items-center justify-center bg-grid-pattern">
            <motion.div
              className="w-48 h-48 flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img src={logo.svgUrl || "/placeholder.svg"} alt={logo.name} className="max-w-full max-h-full" />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs defaultValue="svg" className="mb-8" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="svg"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Code className="h-4 w-4" />
            <span>SVG</span>
          </TabsTrigger>
          <TabsTrigger
            value="png"
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ImageIcon className="h-4 w-4" />
            <span>PNG</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="svg" className="mt-6 space-y-4">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="bg-muted/50 p-4 rounded-md overflow-auto max-h-64 font-mono text-xs">
                <pre>{svgCode}</pre>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Button className="w-full group" onClick={handleCopySvg} variant={copied ? "outline" : "default"}>
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      Copy SVG Code
                    </>
                  )}
                </Button>
                <Button className="w-full group" variant="outline" onClick={handleDownloadSvg}>
                  <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                  Download SVG
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="png" className="mt-6">
          <Card className="bg-card/60 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">Download the logo as a PNG file (512x512px)</p>
                <p className="text-xs text-muted-foreground">
                  The PNG is generated from the SVG and optimized for web use
                </p>
              </div>
              <Button className="w-full sm:w-auto px-8 group" onClick={handleDownloadPng} size="lg">
                <Download className="mr-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                Download PNG
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div>
          <h2 className="text-xl font-semibold mb-4 gradient-heading inline-block">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/60 backdrop-blur-sm card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <Badge variant="default">{logo.category}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-sm card-hover">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">License</span>
                  <Badge variant="outline">{logo.license}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 gradient-heading inline-block">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {logo.tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-secondary/40 backdrop-blur-sm hover:bg-secondary/60 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
