export default function AboutPage() {
    return (
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">About TheIcons.Space</h1>
  
        <p className="text-muted-foreground mb-4">
          <strong>TheIcons.Space</strong> is a developer-focused platform offering a searchable and filterable collection of technology-related icons. Our goal is to help developers, designers, and makers quickly find, preview, and use icons in their projects without any friction.
        </p>
  
        <p className="text-muted-foreground mb-4">
          This project is proudly powered by the open-source icon library{" "}
          <a
            href="https://simpleicons.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:opacity-80"
          >
            Simple Icons
          </a>, which provides over 2000 SVG icons for popular brands and technologies.
        </p>
  
        <p className="text-muted-foreground mb-4">
          TheIcons.Space is built with modern web technologies like Next.js, Tailwind CSS, Zustand, and Framer Motion. It is optimized for performance, accessibility, and ease of use across all devices.
        </p>
  
        <p className="text-muted-foreground">
          Interested in contributing or suggesting features? Visit our{" "}
          <a
            href="https://github.com/0053ishav/TheIcons.Space"
            className="text-primary underline hover:opacity-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a> and join the community.
        </p>
      </main>
    );
  }
  