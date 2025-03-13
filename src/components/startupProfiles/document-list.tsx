import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText } from "lucide-react"

export interface Document {
  id: string
  name: string
  description: string
  category: string
  fileUrl: string
  fileType: string
  fileSize: string
  uploadDate: string
}

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents = [] }: DocumentListProps) {
  // Ensure documents is an array
  const validDocuments = Array.isArray(documents) ? documents : []

  // Group documents by category
  const documentsByCategory = validDocuments.reduce(
    (acc, doc) => {
      if (!acc[doc.category]) {
        acc[doc.category] = []
      }
      acc[doc.category].push(doc)
      return acc
    },
    {} as Record<string, Document[]>,
  )

  if (validDocuments.length === 0) {
    return <p className="text-muted-foreground">No Documents Submitted</p>
  }

  return (
    <div className="space-y-6">
      {Object.entries(documentsByCategory).map(([category, docs]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium">{category}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <Card key={doc.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{doc.name}</CardTitle>
                      <CardDescription className="text-xs">
                        Added on {new Date(doc.uploadDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{doc.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t bg-muted/50 p-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}