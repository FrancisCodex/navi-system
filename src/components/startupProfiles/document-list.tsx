import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText } from "lucide-react"
import type { Document } from "@/constants/types"

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents = [] }: DocumentListProps) {
  // Ensure documents is an array
  const validDocuments = Array.isArray(documents) ? documents : []

  if (validDocuments.length === 0) {
    return <p className="text-muted-foreground">No Documents Submitted</p>
  }

  const API_URL = import.meta.env.VITE_API_BASE

  const getFileUrl = (filePath: string) => `${API_URL}${filePath}`

  const handleViewFile = (filePath: string) => {
    const url = getFileUrl(filePath)
    window.open(url, '_blank')
  }

  const handleDownloadFile = (filePath: string) => {
    const url = getFileUrl(filePath)
    const link = document.createElement('a')
    link.href = url
    link.download = url.split('/').pop() || 'file'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {validDocuments.map((doc) => (
        doc.files.map((file) => (
          <Card key={file.file_path}>
            <CardHeader className="pb-2">
              <div className="flex items-start gap-4">
                <div className="rounded-md bg-primary/10 p-2">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">{file.file_name}</CardTitle>
                  <CardDescription className="text-xs">
                    Added on {new Date().toLocaleDateString()}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2">{file.file_type}</p>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-muted/50 p-2">
              <Button variant="ghost" size="sm" onClick={() => handleViewFile(file.file_path)}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDownloadFile(file.file_path)}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))
      ))}
    </div>
  )
}