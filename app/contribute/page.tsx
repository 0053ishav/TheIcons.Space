import Link from "next/link";

export default function ContributePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Contribute to TheIcons.Space</h1>
      <p className="text-muted-foreground mb-6">
        TheIcons.Space is an open-source project made for developers and creators. We welcome contributions to improve functionality, add new features, fix bugs, and expand our icon catalog.
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🚀 How You Can Help</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Submit bug reports or feature requests via GitHub Issues.</li>
          <li>Add or improve icon metadata (tags, categories, etc.).</li>
          <li>Improve the UI/UX or suggest enhancements.</li>
          <li>Contribute documentation or tutorials.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">🔗 GitHub Repository</h2>
        <p className="text-muted-foreground mb-2">
          The project is hosted on GitHub. Fork the repository, make your changes, and submit a pull request.
        </p>
        <Link
          href="https://github.com/0053ishav/TheIcons.Space"
          className="text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit GitHub Repository →
        </Link>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">❤️ Community Guidelines</h2>
        <p className="text-muted-foreground">
          Please be respectful and constructive in your contributions. We follow standard open-source community best practices.
        </p>
      </section>
    </main>
  );
}