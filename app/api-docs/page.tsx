import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

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
              <CardDescription>Currently, our API is open and does not require authentication.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We may introduce rate limiting and API keys in the future. Subscribe to our newsletter to stay updated.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="bg-muted px-2 py-1 rounded text-sm">https://techicons.com/api</code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">/icons</code>
                  </div>
                  <p className="text-sm mb-2">Get all icons or filter by query parameters</p>
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
                        <TableCell>Search query to filter icons by name or tags</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>category</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>Filter icons by category</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">/icons/{"{id}"}</code>
                  </div>
                  <p className="text-sm mb-2">Get a specific icon by ID</p>
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
                        <TableCell>id</TableCell>
                        <TableCell>string</TableCell>
                        <TableCell>The unique identifier of the icon</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Response</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-auto text-xs">
                {`{
  "id": "react",
  "name": "React",
  "description": "A JavaScript library for building user interfaces",
  "category": "frontend",
  "svgUrl": "/logos/react.png",
  "tags": ["JavaScript", "Frontend", "Library", "UI"],
  "license": "MIT",
  "created": "2023-05-15T10:30:00Z",
  "updated": "2023-11-20T14:45:00Z"
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
