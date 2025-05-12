export default function LicensePage() {
    return (
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">License</h1>
  
        <p className="text-muted-foreground mb-4">
          All icons provided on <strong>TheIcons.Space</strong> are sourced from the open-source <a href="https://simpleicons.org" className="text-primary underline hover:opacity-80" target="_blank" rel="noopener noreferrer">Simple Icons</a> project and are distributed under the{" "}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-primary underline hover:opacity-80" target="_blank" rel="noopener noreferrer">
            Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
          </a> license.
        </p>
  
        <div className="text-muted-foreground mb-4">
          You are free to:
          <ul className="list-disc ml-6 mt-2">
            <li>Use the icons in personal and commercial projects</li>
            <li>Modify and adapt the icons to your needs</li>
            <li>Distribute your modifications under the same license</li>
          </ul>
        </div>
  
        <p className="text-muted-foreground">
          Please provide attribution when using these icons in your projects and link back to <a href="https://simpleicons.org" className="text-primary underline hover:opacity-80">Simple Icons</a> and <strong>TheIcons.Space</strong> if possible. This helps support the open-source ecosystem.
        </p>
      </main>
    );
  }
  