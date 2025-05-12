import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Access our icon database programmatically with our simple REST API
        </p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Authentication</CardTitle>
              <CardDescription>
                Currently, our API is open and does not require authentication.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We may introduce rate limiting and API keys in the future.
                Subscribe to our newsletter to stay updated.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="bg-muted px-2 py-1 rounded text-sm">
                https://theicons.space/api
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get All Icons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">/icons</code>
                  </div>
                  <p className="text-sm mb-2">
                    Get all icons or filter by query parameters
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parameter</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>q</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>
                          Search query to filter icons by name or tags
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>category</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>Filter icons by category</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Icon by Slug</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>GET</Badge>
                  <code className="text-sm">/icons/{"{slug}"}</code>
                </div>
                <p className="text-sm mb-2">Get a specific icon by Slug</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parameter</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>slug</TableCell>
                      <TableCell>string</TableCell>
                      <TableCell>The unique identifier of the icon</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                {`{
    "name": "React",
    "slug": "react",
    "hex": "61DAFB",
    "svgFilePath": "/icons/react.svg",
    "pngFilePath": "/icons/react.png",
    "category": "frontend"
}`}
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get All Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>GET</Badge>
                  <code className="text-sm">/categories</code>
                </div>
                <p className="text-sm mb-2">
                  Get a list of all predefined icon categories
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Response</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>categories</TableCell>
                      <TableCell>string[]</TableCell>
                      <TableCell>
                        Array of predefined category names like "frontend",
                        "backend", etc.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                {`[
    "frontend",
    "backend",
    "database",
    "devops",
    "design",
    "tools"
]`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}