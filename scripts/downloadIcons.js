const fs = require("fs-extra")
const path = require("path")
const slugify = require("slugify")
const simpleIcons = require("simple-icons")
const sharp = require("sharp")

const outputDir = path.join(__dirname, "../public/icons")
const metadataFile = path.join(__dirname, "../icons.json")

// Technology-related categories and keywords to filter icons
const techKeywords = [
  "programming",
  "language",
  "framework",
  "database",
  "cloud",
  "hosting",
  "development",
  "code",
  "software",
  "web",
  "api",
  "server",
  "frontend",
  "backend",
  "devops",
  "javascript",
  "python",
  "java",
  "php",
  "ruby",
  "go",
  "rust",
  "typescript",
  "react",
  "vue",
  "angular",
  "node",
  "express",
  "django",
  "flask",
  "laravel",
  "rails",
  "mongodb",
  "mysql",
  "postgresql",
  "redis",
  "aws",
  "azure",
  "google cloud",
  "firebase",
  "docker",
  "kubernetes",
  "git",
  "github",
  "gitlab",
  "bitbucket",
  "npm",
  "yarn",
  "webpack",
  "babel",
  "vite",
  "rollup",
  "eslint",
  "prettier",
  "jest",
  "mocha",
  "cypress",
  "selenium",
  "linux",
  "windows",
  "macos",
  "android",
  "ios",
  "mobile",
  "desktop",
  "terminal",
  "cli",
  "ide",
  "editor",
  "vscode",
  "intellij",
  "eclipse",
  "atom",
  "sublime",
  "vim",
  "emacs",
]

// Function to check if an icon is tech-related
const isTechRelated = (icon) => {
  const title = icon.title.toLowerCase()
  const slug = icon.slug.toLowerCase()

  return techKeywords.some((keyword) =>
    title.includes(keyword.toLowerCase()) || slug.includes(keyword.toLowerCase())
  )
}

const sanitize = (name) => name.replace(/[^a-z0-9-_]/gi, "_")

;(async () => {
  await fs.ensureDir(outputDir)

  const allIcons = Object.values(simpleIcons)
  const techIcons = allIcons.filter(isTechRelated)

  console.log(`Found ${techIcons.length} technology-related icons out of ${allIcons.length} total icons`)

  const iconMetadata = []

  for (const icon of techIcons) {
    const name = icon.title
    const slug = slugify(name, { lower: true })
    const sanitizedSlug = sanitize(slug)

    const svgFilePath = `/icons/${sanitizedSlug}.svg`
    const pngFilePath = `/icons/${sanitizedSlug}.png`

    // Inject color into SVG (replace or add fill attribute in <svg> tag)
    const coloredSvg = icon.svg.replace(
      /<svg([^>]*)>/,
      `<svg$1 fill="#${icon.hex}">`
    )

    // Write the colored SVG to file
    await fs.writeFile(path.join(outputDir, `${sanitizedSlug}.svg`), coloredSvg)

    // Generate colored PNG from the modified SVG
    await sharp(Buffer.from(coloredSvg), { density: 300 })
      .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(path.join(outputDir, `${sanitizedSlug}.png`))
      .catch((err) => console.error(`Error generating PNG for ${name}:`, err))

    const category = determineTechCategory(name)

    iconMetadata.push({
      name,
      slug: sanitizedSlug,
      hex: icon.hex,
      svgFilePath,
      pngFilePath,
      category,
    })
  }

  await fs.writeJson(metadataFile, iconMetadata, { spaces: 2 })

  console.log(`✅ ${techIcons.length} technology icons saved to /public/icons`)
  console.log(`📝 Metadata written to icons.json`)
})()


// Function to determine tech category
function determineTechCategory(name) {
  const lowerName = name.toLowerCase()

  if (
    lowerName.includes("js") ||
    lowerName.includes("javascript") ||
    lowerName.includes("html") ||
    lowerName.includes("css") ||
    lowerName.includes("react") ||
    lowerName.includes("vue") ||
    lowerName.includes("angular") ||
    lowerName.includes("svelte") ||
    lowerName.includes("web")
  ) {
    return "frontend"
  }

  if (
    lowerName.includes("node") ||
    lowerName.includes("express") ||
    lowerName.includes("php") ||
    lowerName.includes("ruby") ||
    lowerName.includes("python") ||
    lowerName.includes("java") ||
    lowerName.includes("go") ||
    lowerName.includes("rust") ||
    lowerName.includes("api") ||
    lowerName.includes("server")
  ) {
    return "backend"
  }

  if (
    lowerName.includes("sql") ||
    lowerName.includes("mongo") ||
    lowerName.includes("postgres") ||
    lowerName.includes("mysql") ||
    lowerName.includes("redis") ||
    lowerName.includes("db") ||
    lowerName.includes("database") ||
    lowerName.includes("storage")
  ) {
    return "database"
  }

  if (
    lowerName.includes("docker") ||
    lowerName.includes("kubernetes") ||
    lowerName.includes("aws") ||
    lowerName.includes("azure") ||
    lowerName.includes("cloud") ||
    lowerName.includes("deploy") ||
    lowerName.includes("ci") ||
    lowerName.includes("cd") ||
    lowerName.includes("jenkins") ||
    lowerName.includes("git")
  ) {
    return "devops"
  }

  if (
    lowerName.includes("figma") ||
    lowerName.includes("sketch") ||
    lowerName.includes("xd") ||
    lowerName.includes("design") ||
    lowerName.includes("illustrator") ||
    lowerName.includes("photoshop")
  ) {
    return "design"
  }

  return "tools"
}
